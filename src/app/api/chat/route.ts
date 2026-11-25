import { NextRequest, NextResponse } from "next/server";
import { buildSystemResumeContext, runDeterministicRag } from "@/lib/rag";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { query?: string };
    const query = (body.query ?? "").trim();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required." },
        { status: 400 }
      );
    }

    const deterministic = runDeterministicRag(query);
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(deterministic);
    }

    // Upgrade seamlessly to Google Gemini synthesis when GEMINI_API_KEY is set
    const systemPrompt = [
      "You are Jishnu P's concise, technically authoritative AI portfolio assistant.",
      "Answer strictly using the verified resume facts below. Do not invent metrics, dates, or employers.",
      "Keep answers crisp (3-5 sentences or bullet points) and tailored for AI/ML recruiters and hiring managers.",
      "",
      "VERIFIED RESUME DATA:",
      buildSystemResumeContext(),
    ].join("\n");

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
        apiKey
      )}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: query }],
            },
          ],
          generationConfig: {
            temperature: 0.25,
            maxOutputTokens: 420,
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      // Graceful fallback to deterministic RAG on quota/API errors
      return NextResponse.json(deterministic);
    }

    const data = (await geminiRes.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    };

    const geminiText =
      data.candidates?.[0]?.content?.parts
        ?.map((p) => p.text ?? "")
        .join("")
        .trim() ?? "";

    if (!geminiText) {
      return NextResponse.json(deterministic);
    }

    return NextResponse.json({
      answer: geminiText,
      sources: deterministic.sources,
      mode: "gemini" as const,
    });
  } catch {
    return NextResponse.json(
      runDeterministicRag(""),
      { status: 200 }
    );
  }
}
