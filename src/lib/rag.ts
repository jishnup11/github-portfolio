import {
  AWARDS,
  BUILT_OUTSIDE_WORK,
  CERTIFICATIONS,
  EDUCATION,
  FEATURED_PROJECTS,
  HOBBY_GROUPS,
  PERSONAL_INFO,
  PRODUCTIVITY_TOOLS,
  PUBLICATIONS_AND_PATENTS,
  SKILL_CATEGORIES,
  WORK_EXPERIENCE,
} from "@/data/resume";

export interface RagChunk {
  id: string;
  source: string;
  sectionHref: string;
  keywords: string[];
  content: string;
}

export interface RagResponse {
  answer: string;
  sources: { label: string; href: string }[];
  mode: "deterministic-rag" | "gemini";
}

function buildKnowledgeBase(): RagChunk[] {
  const chunks: RagChunk[] = [
    {
      id: "profile",
      source: "Profile & Overview",
      sectionHref: "#top",
      keywords: [
        "jishnu",
        "summary",
        "experience",
        "years",
        "4.3",
        "location",
        "bengaluru",
        "kerala",
        "contact",
        "email",
        "role",
        "fit",
        "available",
      ],
      content: `${PERSONAL_INFO.name} is an ${PERSONAL_INFO.title} based in ${PERSONAL_INFO.location}. ${PERSONAL_INFO.summary} Contact: ${PERSONAL_INFO.email}, ${PERSONAL_INFO.phone}.`,
    },
    {
      id: "distributed-training",
      source: "Cynapto Technologies (AI LipSync)",
      sectionHref: "#experience",
      keywords: [
        "distributed",
        "training",
        "ddp",
        "pytorch",
        "a100",
        "h100",
        "gpu",
        "cluster",
        "hpc",
        "500",
        "hours",
        "video",
        "cost",
        "30%",
        "lipsync",
        "mel",
        "spectrogram",
        "deepspeech",
        "diffusion",
        "gan",
        "transformer",
        "25%",
        "realism",
      ],
      content:
        "At Cynapto Technologies (Apr 2024 – Nov 2025), Jishnu engineered a production-grade AI LipSync training pipeline scaling across 500+ hours of multilingual video data on multi-node GPU clusters (4x A100/H100s). He optimized training and inference pipelines via PyTorch DDP orchestration on distributed HPC, slashing training time and inference costs by 30%. He also migrated audio processing from 29-feature DeepSpeech to 80-band mel-spectrograms and leveraged GAN + Diffusion synthesis with Transformer encoders for a 25% gain in sync accuracy and realism.",
    },
    {
      id: "agentic-rag",
      source: "Enterprise IT Support Agentic RAG Copilot",
      sectionHref: "#projects",
      keywords: [
        "agentic",
        "rag",
        "langgraph",
        "gemini",
        "pinecone",
        "tavily",
        "fastapi",
        "docker",
        "copilot",
        "orchestration",
        "vector",
        "search",
        "fallback",
        "sabbatical",
        "microsoft",
      ],
      content:
        "As an Independent AI Engineer (Nov 2025 – Present), Jishnu architected an end-to-end Enterprise IT Support Agentic RAG Copilot from prototype to production. It orchestrates multi-step retrieval using LangGraph, queries Pinecone for vector search, applies relevance grading, triggers conditional live web search fallbacks via Tavily, and synthesizes grounded answers with Google Gemini—served via a FastAPI REST backend with a web UI and custom Dockerfile. He also completed the Microsoft AI Agents Professional Certificate (Jun 2026) and mentored university students.",
    },
    {
      id: "patent-research",
      source: "Patent & PLOS One Research (TCS R&I Lab)",
      sectionHref: "#research",
      keywords: [
        "patent",
        "wound",
        "afseggan",
        "dice",
        "93.11",
        "plos",
        "springer",
        "publication",
        "paper",
        "research",
        "scientist",
        "medical",
        "cv",
        "ulcer",
        "3d-unet",
        "heart",
        "dicom",
        "nifti",
        "tcs",
        "96.8b",
        "shadow",
      ],
      content:
        "Jishnu holds a Patent ('Method and System for wound management system') and peer-reviewed publications in PLOS One ('Automatic Foot Ulcer Segmentation Using Conditional GAN (AFSegGAN)', achieving a SOTA 93.11% Dice score) and Springer ('Enhanced Shadow Removal for Surveillance Systems using GAN'). At TCS Life Science R&I Lab (Jun 2022 – Jan 2024), he targeted the $96.8B US chronic wound treatment market, created a 3D-Unet 3D Heart segmentation conceptual model for Digital Bio-Twin, preprocessed DICOM/NIFTI volumes, and collaborated with clinical scientists and universities for model validation.",
    },
    {
      id: "azure-docs",
      source: "TCS ML Engineer (Azure Cognitive Search)",
      sectionHref: "#experience",
      keywords: [
        "azure",
        "cognitive",
        "search",
        "1.5m",
        "million",
        "documents",
        "ocr",
        "nlp",
        "pdf",
        "xml",
        "json",
        "classification",
        "extraction",
      ],
      content:
        "As a Machine Learning Engineer at TCS (Jun 2021 – Jun 2022), Jishnu built scalable document extraction and retrieval pipelines on Azure Cognitive Search integrating Computer Vision OCR and custom NLP skills, processing and classifying 1.5 million multi-format documents (PDF, XML, JSON) for enterprise business unit labeling.",
    },
    {
      id: "education-awards",
      source: "Education, Awards & Certifications",
      sectionHref: "#credentials",
      keywords: [
        "education",
        "m.tech",
        "b.tech",
        "amrita",
        "gpa",
        "9.16",
        "8.15",
        "award",
        "innovista",
        "xcelerate",
        "iit",
        "madras",
        "certification",
        "microsoft",
        "andrew ng",
        "stanford",
        "deeplearning.ai",
        "sslc",
        "higher secondary",
        "vattamkulam",
        "mite",
        "gate",
      ],
      content:
        "Education: M.Tech in AI & Data Science from Amrita Vishwa Vidyapeetham (9.16 GPA), GATE Coaching in Computer Science at MITE (Manifold Institute of Technical Education, 2017–2019), B.Tech in CSE from Vidya Academy of Science & Technology (8.15 GPA), Higher Secondary from THSS Vattamkulam (IHRD), Malappuram, Kerala (90.82%, 2011–2013), and SSLC from Kerala State Board, MVM School, Valayamkulam, Malappuram, Kerala (100%, 2010–2011). Honors: Special Achievement Award (TCS Innovista 2023 BTG Champion for DMMT Unit), TCS Xcelerate Warrior, and IIT Madras RBCDSAI International Summit on Data Science and AI. Certifications include Microsoft AI Agents Professional Certificate (Jun 2026), Generative AI with LLMs, MLOps, GANs, Deep Learning (DeepLearning.AI), and Machine Learning by Andrew Ng.",
    },
    {
      id: "skills",
      source: "Technical Skills Matrix",
      sectionHref: "#skills",
      keywords: [
        "skills",
        "stack",
        "python",
        "pytorch",
        "tensorflow",
        "onnx",
        "tensorrt",
        "mlflow",
        "wandb",
        "weights",
        "biases",
        "aws",
        "gcp",
        "azure",
        "e2e",
        "docker",
        "fastapi",
        "huggingface",
      ],
      content: SKILL_CATEGORIES.map(
        (cat) => `${cat.title}: ${cat.skills.map((s) => s.name).join(", ")}`
      ).join(" | "),
    },
    {
      id: "outside-work",
      source: "Built Outside Work",
      sectionHref: "#outside-work",
      keywords: [
        "yolov5",
        "traffic",
        "vehicle",
        "tensorrt",
        "onnx",
        "cctv",
        "number plate",
        "agenticjobhunt",
        "jobhunt",
        "deepagents",
        "litellm",
        "qdrant",
        "super-resolution",
        "ssim",
        "psnr",
        "shadow",
        "genetic",
        "algorithm",
        "cnn",
        "aisa",
        "vader",
        "lstm",
        "sentiment",
        "keras",
        "augmentation",
        "iceberg",
        "statoil",
        "kaggle",
        "satellite",
        "gsm",
        "raspberry",
        "robot",
        "automation",
        "outside",
      ],
      content: BUILT_OUTSIDE_WORK.map(
        (p) => `${p.title} (${p.period}): ${p.summary} Skills: ${p.skills.join(", ")}.`
      ).join(" "),
    },
    {
      id: "beyond-work",
      source: "Beyond Work: Tools & Interests",
      sectionHref: "#beyond-work",
      keywords: [
        "tools",
        "vscode",
        "cursor",
        "claude",
        "jupyter",
        "antigravity",
        "ai studio",
        "hobbies",
        "football",
        "cricket",
        "badminton",
        "reverse engineering",
        "newspaper",
        "interests",
      ],
      content: `Productivity Tools: ${PRODUCTIVITY_TOOLS.map((t) => `${t.name} (${t.description})`).join(" ")} Hobbies: ${HOBBY_GROUPS.map((g) => `${g.title}: ${g.items.map((i) => `${i.name} — ${i.description}`).join(" ")}`).join(" ")}`,
    },
  ];

  return chunks;
}

const KNOWLEDGE_BASE = buildKnowledgeBase();

export function runDeterministicRag(query: string): RagResponse {
  const normalized = query.toLowerCase().trim();
  if (!normalized) {
    return {
      answer:
        "Ask anything about Jishnu's Agentic RAG systems, distributed PyTorch DDP training on 4x A100/H100s, his healthcare CV patent, PLOS One paper (AFSegGAN, 93.11% Dice), or career timeline.",
      sources: [{ label: "Profile & Overview", href: "#top" }],
      mode: "deterministic-rag",
    };
  }

  const tokens = normalized
    .replace(/[^a-z0-9.+%-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);

  const scored = KNOWLEDGE_BASE.map((chunk) => {
    let score = 0;
    const textLower = chunk.content.toLowerCase();

    for (const kw of chunk.keywords) {
      if (normalized.includes(kw)) {
        score += kw.length > 4 ? 5 : 3;
      }
    }
    for (const token of tokens) {
      if (textLower.includes(token)) {
        score += 2;
      }
    }
    return { chunk, score };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return {
      answer:
        "Jishnu P is an AI & Deep Learning Scientist (4.3+ years) specializing in Agentic AI (LangGraph, Gemini, Pinecone, Tavily), Distributed Multimodal Training (PyTorch DDP across 4x A100/H100s, 500+ hrs video, -30% compute cost), and Medical Computer Vision (Patented wound management system, AFSegGAN 93.11% Dice in PLOS One).",
      sources: [
        { label: "Flagship Systems", href: "#projects" },
        { label: "Research Vault", href: "#research" },
      ],
      mode: "deterministic-rag",
    };
  }

  const topChunks = scored.slice(0, 2).map((s) => s.chunk);
  const answer = topChunks.map((c) => c.content).join("\n\n");
  const sources = topChunks.map((c) => ({
    label: c.source,
    href: c.sectionHref,
  }));

  return {
    answer,
    sources,
    mode: "deterministic-rag",
  };
}

export function buildSystemResumeContext(): string {
  return JSON.stringify(
    {
      personalInfo: PERSONAL_INFO,
      projects: FEATURED_PROJECTS.map((p) => ({
        title: p.title,
        impact: p.impactHighlight,
        summary: p.summary,
        businessProblem: p.businessProblem,
        tags: p.tags,
      })),
      builtOutsideWork: BUILT_OUTSIDE_WORK.map((p) => ({
        title: p.title,
        period: p.period,
        summary: p.summary,
        objective: p.objective,
        highlights: p.highlights,
        skills: p.skills,
      })),
      experience: WORK_EXPERIENCE,
      publicationsAndPatents: PUBLICATIONS_AND_PATENTS.map((p) => ({
        type: p.type,
        venue: p.venue,
        title: p.title,
        keyMetric: p.keyMetric,
        abstract: p.abstract,
      })),
      education: EDUCATION,
      awards: AWARDS,
      certifications: CERTIFICATIONS,
    },
    null,
    2
  );
}
