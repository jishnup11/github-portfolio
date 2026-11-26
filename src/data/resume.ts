export type RoleLens = "all" | "ai-agentic" | "ml-systems" | "research";

export interface RoleLensOption {
  id: RoleLens;
  label: string;
  shortLabel: string;
  description: string;
  focusHighlight: string;
}

export interface PersonalInfo {
  name: string;
  monogram: string;
  avatarUrl: string;
  title: string;
  tagline: string;
  location: string;
  statusBadge: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  resumePdfUrl: string;
  summary: string;
}

export interface HeroMetric {
  id: string;
  value: string;
  label: string;
  detail: string;
  accent: "indigo" | "cyan" | "emerald";
  lensRelevance: Record<RoleLens, number>;
}

export interface SkillItem {
  name: string;
  lenses: Exclude<RoleLens, "all">[];
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  accent: "indigo" | "cyan" | "emerald";
  skills: SkillItem[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel: string;
  stage: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  kind: "input" | "orchestrator" | "retrieval" | "compute" | "model" | "output";
  techStack: string[];
  details: string;
  metrics?: string;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

export interface ProjectArchitecture {
  overview: string;
  throughputNote: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export interface BenchmarkBar {
  label: string;
  baselineLabel: string;
  baselineValue: number;
  improvedLabel: string;
  improvedValue: number;
  unit: string;
  deltaText: string;
}

export interface BusinessProblem {
  context: string;
  leadIn: string;
  painPoints: string[];
}

export interface FeaturedProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  period: string;
  organization: string;
  summary: string;
  businessProblem?: BusinessProblem;
  impactHighlight: string;
  metrics: { label: string; value: string }[];
  benchmarks: BenchmarkBar[];
  tags: string[];
  paperUrl?: { label: string; href: string };
  demoImage?: { src: string; alt: string; caption: string };
  lensRelevance: Record<RoleLens, number>;
  primaryLenses: Exclude<RoleLens, "all">[];
  architecture?: ProjectArchitecture;
}

export interface WorkExperience {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  badge?: string;
  summary: string;
  highlights: {
    text: string;
    metric?: string;
    lenses: Exclude<RoleLens, "all">[];
  }[];
  stack: string[];
  lensRelevance: Record<RoleLens, number>;
}

export interface PublicationItem {
  id: string;
  type: "Patent" | "Journal" | "Conference";
  venue: string;
  year: string;
  title: string;
  authors: string;
  badgeColor: "indigo" | "cyan" | "emerald";
  keyMetric?: string;
  abstract: string;
  contributions: string[];
  paperUrl?: { label: string; href: string };
  bibtex: string;
  lensRelevance: Record<RoleLens, number>;
}

export interface TechnicalNoteSection {
  heading: string;
  paragraphs: string[];
  code?: {
    language: string;
    filename: string;
    snippet: string;
  };
  callout?: string;
}

export interface TechnicalNote {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  paperUrl?: { label: string; href: string };
  demoImage?: { src: string; alt: string; caption: string };
  lensRelevance: Record<RoleLens, number>;
  sections: TechnicalNoteSection[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score?: string;
  focus?: string;
}

export interface AwardItem {
  title: string;
  organization: string;
  date: string;
  detail: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date?: string;
  highlight?: boolean;
}

export interface OutsideWorkProject {
  id: string;
  title: string;
  period: string;
  category: string;
  relationNote?: string;
  summary: string;
  objective?: string;
  highlightsTitle?: string;
  highlights?: string[];
  demoVideo?: {
    src: string;
    poster?: string;
    caption: string;
  };
  externalUrl?: { label: string; href: string };
  skills: string[];
  lensRelevance: Record<RoleLens, number>;
}

export interface ProductivityTool {
  id:
    | "vscode"
    | "cursor"
    | "claude-code"
    | "jupyter"
    | "antigravity"
    | "gemini";
  name: string;
  description: string;
}

export interface HobbyItem {
  id:
    | "football"
    | "cricket"
    | "badminton"
    | "reverse-engineering"
    | "current-affairs";
  name: string;
  description: string;
}

export interface HobbyGroup {
  id: "sports" | "curiosity-tinkering";
  title: string;
  items: HobbyItem[];
}

export const ROLE_LENSES: RoleLensOption[] = [
  {
    id: "all",
    label: "All",
    shortLabel: "All",
    description: "Complete AI, ML Systems & Peer-Reviewed Research profile",
    focusHighlight: "Full-stack AI Science: Agentic AI, Multimodal DDP & Medical CV",
  },
  {
    id: "ai-agentic",
    label: "AI / Agentic Engineer",
    shortLabel: "AI / Agentic",
    description: "Prioritizes LangGraph orchestration, Gemini, Pinecone, Tavily & FastAPI productionization",
    focusHighlight: "Lens Active: Agentic RAG, Multi-Step Orchestration & FastAPI/Docker Deployment",
  },
  {
    id: "ml-systems",
    label: "ML / Systems Engineer",
    shortLabel: "ML / Systems",
    description: "Prioritizes 4x A100/H100 distributed PyTorch DDP, 500+ hrs pipelines & 30% cost reduction",
    focusHighlight: "Lens Active: Distributed PyTorch DDP, 500+ Hrs Video Pipelines & 1.5M Doc Search",
  },
  {
    id: "research",
    label: "Research Scientist",
    shortLabel: "Research",
    description: "Brings Patent, PLOS One / Springer publications, AFSegGAN (93.11% Dice) & 3D-Unet forward",
    focusHighlight: "Lens Active: Peer-Reviewed Publications, Patent, AFSegGAN (93.11% Dice) & 3D-Unet",
  },
];

export const PERSONAL_INFO: PersonalInfo = {
  name: "Jishnu P",
  monogram: "JP",
  avatarUrl: "/jishnu-p.jpg",
  title: "AI & Deep Learning Scientist | Agentic AI, Multimodal & Computer Vision",
  tagline:
    "Architecting production-grade Agentic RAG systems, multi-node distributed multimodal pipelines, and patented medical computer vision models.",
  location: "Bengaluru / Kerala, India",
  statusBadge: "Available for AI / ML / Research Roles",
  email: "jishnup11@gmail.com",
  phone: "+91-8086623616",
  github: "https://github.com/jishnup11",
  linkedin: "https://linkedin.com/in/jishnup11",
  resumePdfUrl: "https://drive.google.com/drive/folders/1HeRvWPEpRkziFeEPOdMjbnp-4mVFmYl0",
  summary:
    "AI & Deep Learning Scientist with 4+ years of experience building production-grade Generative AI, Agentic AI, Multimodal AI, and end-to-end Computer Vision systems. Published researcher (peer-reviewed journal) with patents in AI-driven healthcare CV, specializing in LLMs, Agentic RAG, Diffusion Models, Transformers, and scalable AI deployments.",
};

export const HERO_METRICS: HeroMetric[] = [
  {
    id: "exp",
    value: "4.3+ Yrs",
    label: "AI / ML Experience",
    detail: "Research Lab to Production HPC",
    accent: "indigo",
    lensRelevance: { all: 100, "ai-agentic": 95, "ml-systems": 95, research: 95 },
  },
  {
    id: "dice",
    value: "93.11%",
    label: "AFSegGAN Dice Score",
    detail: "Outperformed SOTA Medical CV",
    accent: "emerald",
    lensRelevance: { all: 98, "ai-agentic": 70, "ml-systems": 80, research: 100 },
  },
  {
    id: "video",
    value: "500+ Hrs",
    label: "Video Data Scaled",
    detail: "Multi-node 4x A100/H100 Clusters",
    accent: "cyan",
    lensRelevance: { all: 96, "ai-agentic": 72, "ml-systems": 100, research: 90 },
  },
  {
    id: "realism",
    value: "+25%",
    label: "Lip-Sync Realism Gain",
    detail: "GAN + Diffusion + Transformers",
    accent: "emerald",
    lensRelevance: { all: 94, "ai-agentic": 75, "ml-systems": 94, research: 96 },
  },
  {
    id: "cost",
    value: "-30%",
    label: "Compute Cost Reduction",
    detail: "PyTorch DDP & Inference Tuning",
    accent: "cyan",
    lensRelevance: { all: 95, "ai-agentic": 84, "ml-systems": 100, research: 82 },
  },
  {
    id: "docs",
    value: "1.5M",
    label: "Docs Processed",
    detail: "Azure OCR + NLP Classification",
    accent: "indigo",
    lensRelevance: { all: 90, "ai-agentic": 92, "ml-systems": 95, research: 75 },
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "genai-agentic",
    title: "Generative & Agentic AI",
    subtitle: "Multi-step reasoning, retrieval orchestration, and LLM synthesis",
    accent: "indigo",
    skills: [
      { name: "LLMs", lenses: ["ai-agentic", "research"] },
      { name: "Agentic AI", lenses: ["ai-agentic"] },
      { name: "Agentic RAG", lenses: ["ai-agentic"] },
      { name: "Prompt Engineering", lenses: ["ai-agentic"] },
      { name: "Multi-Step Orchestration", lenses: ["ai-agentic", "ml-systems"] },
      { name: "LangGraph", lenses: ["ai-agentic"] },
      { name: "Google Gemini", lenses: ["ai-agentic"] },
      { name: "Pinecone (Vector Search)", lenses: ["ai-agentic", "ml-systems"] },
      { name: "Tavily", lenses: ["ai-agentic"] },
      { name: "Multimodal AI", lenses: ["ai-agentic", "research", "ml-systems"] },
    ],
  },
  {
    id: "dl-cv",
    title: "Deep Learning & Computer Vision",
    subtitle: "Generative synthesis, medical segmentation, and foundation architectures",
    accent: "cyan",
    skills: [
      { name: "Computer Vision", lenses: ["research", "ml-systems"] },
      { name: "Deep Learning (CNNs, RNNs, Transformers, ViT)", lenses: ["research", "ml-systems"] },
      { name: "Diffusion Models", lenses: ["research", "ml-systems"] },
      { name: "Image Segmentation", lenses: ["research"] },
      { name: "Synthetic Data Generation", lenses: ["research", "ml-systems"] },
      { name: "Model Fine-Tuning", lenses: ["research", "ai-agentic", "ml-systems"] },
      { name: "Model Distillation", lenses: ["ml-systems", "research"] },
      { name: "Inference Optimization", lenses: ["ml-systems"] },
      { name: "Model Evaluation", lenses: ["research", "ai-agentic"] },
    ],
  },
  {
    id: "frameworks-tools",
    title: "Frameworks & Tools",
    subtitle: "High-throughput training, serving, and experiment tracking",
    accent: "emerald",
    skills: [
      { name: "Python", lenses: ["ai-agentic", "ml-systems", "research"] },
      { name: "FastAPI", lenses: ["ai-agentic", "ml-systems"] },
      { name: "PyTorch", lenses: ["ml-systems", "research"] },
      { name: "TensorFlow", lenses: ["research", "ml-systems"] },
      { name: "Hugging Face", lenses: ["ai-agentic", "research"] },
      { name: "OpenCV", lenses: ["research", "ml-systems"] },
      { name: "FFmpeg", lenses: ["ml-systems"] },
      { name: "NumPy", lenses: ["research", "ml-systems"] },
      { name: "Pandas", lenses: ["ml-systems", "research"] },
      { name: "Docker", lenses: ["ai-agentic", "ml-systems"] },
      { name: "Git", lenses: ["ai-agentic", "ml-systems", "research"] },
      { name: "Scikit-learn", lenses: ["research", "ml-systems"] },
      { name: "SQL", lenses: ["ml-systems"] },
      { name: "MLflow", lenses: ["ml-systems"] },
      { name: "Weights & Biases", lenses: ["ml-systems", "research"] },
      { name: "ONNX / TensorRT", lenses: ["ml-systems"] },
      { name: "HPC", lenses: ["ml-systems", "research"] },
    ],
  },
  {
    id: "cloud-eng",
    title: "Cloud & Engineering",
    subtitle: "Scalable deployment, MLOps lifecycle, and cloud infrastructure",
    accent: "indigo",
    skills: [
      { name: "Azure AI Foundry", lenses: ["ai-agentic", "ml-systems"] },
      { name: "AWS", lenses: ["ml-systems", "ai-agentic"] },
      { name: "GCP", lenses: ["ml-systems", "ai-agentic"] },
      { name: "E2E Cloud", lenses: ["ml-systems"] },
      { name: "MLOps", lenses: ["ml-systems"] },
      { name: "CI/CD", lenses: ["ml-systems", "ai-agentic"] },
      { name: "REST APIs", lenses: ["ai-agentic", "ml-systems"] },
      { name: "Linux", lenses: ["ml-systems"] },
    ],
  },
];

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "agentic-rag-copilot",
    title: "Enterprise IT Support Agentic RAG Copilot",
    subtitle: "Self-Correcting Multi-Step Retrieval & Synthesis Engine",
    category: "Agentic AI & Production LLM Systems",
    period: "Nov 2025 – Present",
    organization: "Independent AI Engineering",
    summary:
      "Architected an end-to-end stateful Agentic RAG copilot from notebook prototype to containerized FastAPI microservice. Uses LangGraph state machines to grade Pinecone vector retrieval confidence and autonomously trigger Tavily live web search fallbacks before Google Gemini response synthesis.",
    demoImage: {
      src: "/demos/agentic-rag-copilot-demo.jpg",
      alt: "Enterprise IT Support Agentic RAG Copilot live web UI showing LangGraph workflow steps and Agent Trace sidebar",
      caption:
        "Live Web Interface · LangGraph 6-Step Workflow & Real-Time Agent Trace",
    },
    businessProblem: {
      context:
        "The internal IT team maintains many documents: VPN instructions, password rules, MFA policy, software installation rules, laptop troubleshooting guides, and service-desk runbooks.",
      leadIn: "Employees still create repetitive support tickets because:",
      painPoints: [
        "They do not know where the correct document is.",
        "Traditional keyword search returns too many results.",
        "A normal chatbot may hallucinate an answer.",
        "Internal documents can be incomplete or outdated.",
        "Some questions require current vendor information from the public web.",
      ],
    },
    impactHighlight: "Zero-hallucination fallback routing with containerized FastAPI REST serving",
    metrics: [
      { label: "Orchestration", value: "LangGraph StateGraph" },
      { label: "Vector Index", value: "Pinecone" },
      { label: "Fallback", value: "Tavily Live Search" },
      { label: "Deployment", value: "FastAPI + Docker" },
    ],
    benchmarks: [
      {
        label: "Query Resolution Reliability (Corrective Routing vs. Naive RAG)",
        baselineLabel: "Single-Pass Static RAG",
        baselineValue: 64,
        improvedLabel: "LangGraph + Grader + Tavily",
        improvedValue: 94,
        unit: "%",
        deltaText: "+30% grounded coverage",
      },
    ],
    tags: ["LangGraph", "Google Gemini", "Pinecone", "Tavily", "FastAPI", "Docker", "Agentic RAG"],
    lensRelevance: { all: 100, "ai-agentic": 100, "ml-systems": 88, research: 74 },
    primaryLenses: ["ai-agentic", "ml-systems"],
    architecture: {
      overview:
        "Stateful corrective-RAG DAG implemented in LangGraph. Every incoming IT query passes through semantic vector retrieval, an LLM relevance grader node, conditional web fallback routing, and grounded synthesis.",
      throughputNote: "Containerized FastAPI async REST endpoints with deterministic state checkpointing",
      nodes: [
        {
          id: "user-query",
          label: "User Query",
          sublabel: "Web UI / REST Client",
          stage: "01 · Ingress",
          x: 8,
          y: 50,
          kind: "input",
          techStack: ["Web Interface", "JSON Payload", "Pydantic Validation"],
          details:
            "Captures enterprise IT troubleshooting requests, normalizes session context, and enforces schema validation at the FastAPI boundary.",
          metrics: "Schema-validated async request",
        },
        {
          id: "langgraph",
          label: "LangGraph Orchestrator",
          sublabel: "Stateful DAG Controller",
          stage: "02 · Orchestration",
          x: 27,
          y: 50,
          kind: "orchestrator",
          techStack: ["LangGraph", "StateGraph", "Conditional Edges"],
          details:
            "Maintains typed conversation & retrieval state across nodes. Controls retry budgets and deterministic branching between internal KB and live web fallback.",
          metrics: "Bounded max-step execution",
        },
        {
          id: "pinecone",
          label: "Pinecone Vector Search",
          sublabel: "Dense Semantic Retrieval",
          stage: "03 · Internal KB",
          x: 47,
          y: 26,
          kind: "retrieval",
          techStack: ["Pinecone", "Top-K Cosine", "Metadata Filtering"],
          details:
            "Queries indexed enterprise runbooks, IT policies, and incident tickets to surface top-k candidate context chunks.",
          metrics: "Sub-50ms ANN vector lookup",
        },
        {
          id: "grader",
          label: "Relevance Grader",
          sublabel: "Binary Grounding Gate",
          stage: "04 · Verification",
          x: 64,
          y: 50,
          kind: "model",
          techStack: ["Google Gemini", "Structured Output", "Score Threshold"],
          details:
            "Evaluates retrieved Pinecone chunks against query intent. Filters irrelevant passages and routes low-confidence queries to live search.",
          metrics: "Prevents stale KB hallucinations",
        },
        {
          id: "tavily",
          label: "Tavily Live Web Search",
          sublabel: "Dynamic Fallback Node",
          stage: "05 · External Fallback",
          x: 47,
          y: 78,
          kind: "retrieval",
          techStack: ["Tavily API", "Real-Time Web", "Domain Filtering"],
          details:
            "Triggered conditionally when internal Pinecone documents fail relevance grading—fetching up-to-date vendor patches, CVEs, and SaaS status docs.",
          metrics: "Conditional execution only",
        },
        {
          id: "gemini",
          label: "Google Gemini Synthesis",
          sublabel: "Grounded Response Gen",
          stage: "06 · Generation",
          x: 80,
          y: 50,
          kind: "model",
          techStack: ["Google Gemini", "Citation Grounding", "System Prompts"],
          details:
            "Synthesizes step-by-step remediation instructions strictly grounded in verified Pinecone or Tavily evidence with inline source provenance.",
        },
        {
          id: "fastapi",
          label: "FastAPI + Docker",
          sublabel: "Cloud-Ready Runtime",
          stage: "07 · Serving",
          x: 94,
          y: 50,
          kind: "output",
          techStack: ["FastAPI", "Uvicorn", "Custom Dockerfile", "REST API"],
          details:
            "Exposes production /chat and /health endpoints packaged in an optimized multi-stage Docker container for cloud deployment.",
        },
      ],
      edges: [
        { from: "user-query", to: "langgraph", label: "POST /query" },
        { from: "langgraph", to: "pinecone", label: "Top-K Search" },
        { from: "pinecone", to: "grader", label: "Candidate Docs" },
        { from: "grader", to: "tavily", label: "Fallback (Low Score)", dashed: true },
        { from: "tavily", to: "gemini", label: "Web Context", dashed: true },
        { from: "grader", to: "gemini", label: "Verified Context" },
        { from: "gemini", to: "fastapi", label: "JSON Response" },
      ],
    },
  },
  {
    id: "multilingual-lipsync",
    title: "Multilingual AI LipSync & Video Dubbing Pipeline",
    subtitle: "Distributed GAN + Diffusion Synthesis at 500+ Hour Scale",
    category: "Multimodal Generative AI & Distributed HPC",
    period: "Apr 2024 – Nov 2025",
    organization: "Cynapto Technologies",
    summary:
      "Engineered state-of-the-art multilingual audio-visual lip-sync models for film and commercial ad dubbing. Replaced 29-feature DeepSpeech embeddings with high-resolution 80-band mel-spectrograms paired with Transformer audio encoders and PyTorch DDP across multi-node 4x A100/H100 clusters.",
    impactHighlight: "+25% sync accuracy & realism while cutting training/inference cost by 30%",
    metrics: [
      { label: "Dataset Scale", value: "500+ Hrs Video" },
      { label: "Cluster", value: "4x A100 / H100" },
      { label: "Realism Gain", value: "+25% Accuracy" },
      { label: "Cost Reduction", value: "-30% Compute" },
    ],
    benchmarks: [
      {
        label: "Audio Feature Representation Resolution",
        baselineLabel: "DeepSpeech (29 features)",
        baselineValue: 29,
        improvedLabel: "80-Band Mel-Spectrogram",
        improvedValue: 80,
        unit: " bands",
        deltaText: "2.76x richer acoustic resolution",
      },
      {
        label: "Distributed Training & Inference Cost Efficiency",
        baselineLabel: "Unoptimized Single-Node Baseline",
        baselineValue: 100,
        improvedLabel: "PyTorch DDP Optimized Pipeline",
        improvedValue: 70,
        unit: "% cost",
        deltaText: "-30% time & compute cost",
      },
    ],
    tags: ["PyTorch DDP", "Diffusion Models", "GANs", "Transformers", "80-Band Mel", "4x A100/H100", "FFmpeg"],
    lensRelevance: { all: 99, "ai-agentic": 78, "ml-systems": 100, research: 95 },
    primaryLenses: ["ml-systems", "research"],
    architecture: {
      overview:
        "High-throughput multimodal dubbing architecture trained across multi-node A100/H100 GPUs. Combines dense 80-band acoustic representations with Transformer temporal encoders and GAN/Diffusion facial synthesis.",
      throughputNote: "Scaled across 500+ hours of curated multilingual video via PyTorch DDP",
      nodes: [
        {
          id: "dataset",
          label: "500+ Hrs Video Dataset",
          sublabel: "Curated Multilingual Corpus",
          stage: "01 · Data Curation",
          x: 10,
          y: 50,
          kind: "input",
          techStack: ["FFmpeg", "OpenCV", "FPS & Identity Balancing"],
          details:
            "Enforced strict data curation protocols across resolution, frame rate consistency, identity class distribution, and multilingual phonetic diversity with a 2-person team.",
          metrics: "500+ hours normalized video",
        },
        {
          id: "audio-enc",
          label: "80-Band Mel + Transformer",
          sublabel: "Acoustic Feature Encoder",
          stage: "02 · Audio Branch",
          x: 33,
          y: 30,
          kind: "model",
          techStack: ["80-Band Mel-Spectrogram", "Transformer Encoder", "Phoneme Alignment"],
          details:
            "Migrated from legacy 29-feature DeepSpeech to 80-band mel-spectrograms with Transformer self-attention for crisp consonant/vowel temporal alignment across languages.",
          metrics: "Replaces 29-dim DeepSpeech",
        },
        {
          id: "synthesis",
          label: "GAN / Diffusion Synthesis",
          sublabel: "Identity-Preserving Generator",
          stage: "03 · Visual Synthesis",
          x: 56,
          y: 50,
          kind: "model",
          techStack: ["Conditional GAN", "Diffusion Denoising", "Perceptual & Sync Loss"],
          details:
            "Fuses source facial identity priors with encoded acoustic embeddings to synthesize artifact-free lip movements and natural jaw dynamics.",
          metrics: "+25% sync accuracy & realism",
        },
        {
          id: "ddp",
          label: "PyTorch DDP (4x A100/H100)",
          sublabel: "Multi-Node Distributed HPC",
          stage: "04 · Distributed Training",
          x: 76,
          y: 72,
          kind: "compute",
          techStack: ["PyTorch DDP", "NCCL", "Mixed Precision", "HPC"],
          details:
            "Orchestrated gradient synchronization, sharded dataloading, and mixed-precision distributed runs across multi-node 4x A100/H100 GPU clusters.",
          metrics: "-30% training time & cost",
        },
        {
          id: "inference",
          label: "Optimized Inference",
          sublabel: "Production Dubbing Engine",
          stage: "05 · Serving",
          x: 91,
          y: 50,
          kind: "output",
          techStack: ["Batched Frame Synthesis", "FFmpeg Muxing", "Cost-Optimized"],
          details:
            "Streamlined inference graph and video muxing pipeline for studio-grade film and advertisement dubbing turnarounds.",
          metrics: "-30% inference cost",
        },
      ],
      edges: [
        { from: "dataset", to: "audio-enc", label: "Audio Track" },
        { from: "dataset", to: "synthesis", label: "Reference Frames" },
        { from: "audio-enc", to: "synthesis", label: "Temporal Embeddings" },
        { from: "synthesis", to: "ddp", label: "Gradient Sync" },
        { from: "ddp", to: "inference", label: "Checkpoint Export" },
      ],
    },
  },
  {
    id: "afseggan-medical-cv",
    title: "AFSegGAN: Patented Medical Wound Segmentation",
    subtitle: "Conditional GAN for Automated Foot Ulcer Analysis (PLOS One)",
    category: "Medical Computer Vision & Peer-Reviewed Research",
    period: "Jun 2022 – Jan 2024",
    organization: "TCS Life Science R&I Lab",
    summary:
      "Proposed and engineered AFSegGAN—a Conditional GAN for chronic foot ulcer segmentation and wound parameter estimation—achieving a 93.11% Dice score that outperformed state-of-the-art baselines. Validated with clinical scientists for remote care targeting the $96.8B US chronic wound market.",
    impactHighlight: "93.11% Dice score · Peer-reviewed in PLOS One · Patented wound management system",
    metrics: [
      { label: "Dice Score", value: "93.11%" },
      { label: "Venue", value: "PLOS One" },
      { label: "IP Status", value: "Patent" },
      { label: "Target Market", value: "$96.8B US" },
    ],
    benchmarks: [
      {
        label: "Foot Ulcer Segmentation Dice Similarity Coefficient",
        baselineLabel: "Prior SOTA Baseline",
        baselineValue: 87.4,
        improvedLabel: "AFSegGAN (Conditional GAN)",
        improvedValue: 93.11,
        unit: "%",
        deltaText: "93.11% Dice (SOTA)",
      },
    ],
    tags: ["Conditional GAN", "AFSegGAN", "DICOM/NIFTI", "3D-Unet", "Medical CV", "PLOS One", "Patent"],
    paperUrl: {
      label: "Read Paper (PLOS)",
      href: "https://journals.plos.org/digitalhealth/article?id=10.1371/journal.pdig.0000344",
    },
    lensRelevance: { all: 98, "ai-agentic": 68, "ml-systems": 84, research: 100 },
    primaryLenses: ["research"],
    architecture: {
      overview:
        "Clinical-grade medical imaging pipeline converting raw heterogeneous clinical captures and DICOM/NIFTI volumes into calibrated wound masks and quantitative healing parameters.",
      throughputNote: "Validated in collaboration with clinical scientists, health systems, and university partners",
      nodes: [
        {
          id: "dicom",
          label: "DICOM / NIFTI Preprocessing",
          sublabel: "Resampling & Normalization",
          stage: "01 · Medical Ingestion",
          x: 12,
          y: 50,
          kind: "input",
          techStack: ["DICOM / NIFTI", "Resampling", "Intensity Normalization", "Augmentation"],
          details:
            "Standardizes clinical wound captures and volumetric medical scans via spatial resampling, illumination normalization, and domain-safe geometric augmentations.",
          metrics: "Clinical multi-site normalization",
        },
        {
          id: "cgan",
          label: "Conditional GAN (AFSegGAN)",
          sublabel: "Adversarial Mask Generator",
          stage: "02 · Segmentation Core",
          x: 42,
          y: 50,
          kind: "model",
          techStack: ["Conditional GAN", "Encoder-Decoder G", "PatchGAN D", "Combined Dice+Adv Loss"],
          details:
            "Adversarial training forces crisp boundary delineation around irregular, low-contrast ulcer margins where standard cross-entropy U-Nets blur.",
          metrics: "Outperforms SOTA baselines",
        },
        {
          id: "mask",
          label: "Wound Segmentation",
          sublabel: "93.11% Dice Accuracy",
          stage: "03 · Boundary Mask",
          x: 70,
          y: 35,
          kind: "retrieval",
          techStack: ["Binary & Tissue Masks", "Post-Processing", "Clinical QA"],
          details:
            "Produces pixel-accurate ulcer region masks validated with university and health-system clinicians for safety and efficacy.",
          metrics: "93.11% Dice Score",
        },
        {
          id: "params",
          label: "Parameter Estimation",
          sublabel: "Remote Wound Management",
          stage: "04 · Clinical Output",
          x: 90,
          y: 60,
          kind: "output",
          techStack: ["Area & Perimeter", "Healing Trajectory", "Patented System"],
          details:
            "Computes quantitative wound geometry metrics to power remote longitudinal monitoring targeting the $96.8B US chronic wound care market.",
          metrics: "Patented clinical workflow",
        },
      ],
      edges: [
        { from: "dicom", to: "cgan", label: "Normalized Tensors" },
        { from: "cgan", to: "mask", label: "Adversarial Refinement" },
        { from: "mask", to: "params", label: "Morphometric Extraction" },
      ],
    },
  },
  {
    id: "digital-biotwin-3dunet",
    title: "Digital Bio-Twin: 3D Heart Segmentation (3D-Unet)",
    subtitle: "Volumetric Cardiac Modeling from DICOM/NIFTI Volumes",
    category: "Volumetric Medical Imaging",
    period: "Jun 2022 – Jan 2024",
    organization: "TCS Life Science R&I Lab",
    summary:
      "Developed a conceptual 3D-Unet volumetric segmentation model for cardiac anatomy reconstruction as part of TCS's Digital Bio-Twin research initiative, handling 3D DICOM/NIFTI resampling, voxel normalization, and clinical safety validation.",
    impactHighlight: "End-to-end 3D volumetric cardiac segmentation for Digital Bio-Twin",
    metrics: [
      { label: "Architecture", value: "3D-Unet" },
      { label: "Modalities", value: "DICOM / NIFTI" },
      { label: "Program", value: "Digital Bio-Twin" },
    ],
    benchmarks: [],
    tags: ["3D-Unet", "DICOM", "NIFTI", "PyTorch", "Digital Bio-Twin", "Healthcare AI"],
    lensRelevance: { all: 82, "ai-agentic": 55, "ml-systems": 78, research: 94 },
    primaryLenses: ["research"],
  },
  {
    id: "azure-doc-pipeline",
    title: "Enterprise 1.5M Document OCR & NLP Pipeline",
    subtitle: "Large-Scale Multi-Format Extraction on Azure Cognitive Search",
    category: "Enterprise ML & Search Systems",
    period: "Jun 2021 – Jun 2022",
    organization: "Tata Consultancy Services (TCS)",
    summary:
      "Built high-throughput document extraction, indexing, and automated business-unit classification pipelines on Azure Cognitive Search—integrating Computer Vision OCR and custom NLP skills across 1.5 million PDF, XML, and JSON enterprise documents.",
    impactHighlight: "1.5M multi-format enterprise documents extracted, indexed, and labeled",
    metrics: [
      { label: "Volume", value: "1.5M Documents" },
      { label: "Formats", value: "PDF, XML, JSON" },
      { label: "Platform", value: "Azure Cognitive Search" },
    ],
    benchmarks: [],
    tags: ["Azure Cognitive Search", "Computer Vision OCR", "NLP", "Python", "Enterprise Search"],
    lensRelevance: { all: 85, "ai-agentic": 86, "ml-systems": 92, research: 65 },
    primaryLenses: ["ml-systems", "ai-agentic"],
  },
];

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    id: "independent-sabbatical",
    role: "Independent AI Engineer & Technical Mentor (Planned Sabbatical)",
    organization: "Self-Directed",
    period: "Nov 2025 – Present",
    location: "Kerala, IN",
    badge: "Current · Production Agentic AI",
    summary:
      "Built and containerized a production Agentic RAG system, earned Microsoft's AI Agents Professional Certificate during a planned family sabbatical, and mentored university students on Deep Learning & Computer Vision projects.",
    highlights: [
      {
        text: "Architected and deployed an end-to-end Enterprise IT Support Agentic RAG Copilot from notebook prototype to production, orchestrating multi-step retrieval and web-search fallbacks using LangGraph, Google Gemini, Pinecone, and Tavily.",
        metric: "LangGraph + Gemini + Pinecone + Tavily",
        lenses: ["ai-agentic", "ml-systems"],
      },
      {
        text: "Exposed the agentic workflow via a production-ready FastAPI (REST API) backend with a lightweight web interface and containerized it with a custom Dockerfile for cloud deployment.",
        metric: "FastAPI + Docker",
        lenses: ["ai-agentic", "ml-systems"],
      },
      {
        text: "Completed the Microsoft AI Agents: From Foundations to Applications Professional Certificate during a planned family sabbatical.",
        metric: "Microsoft Certified (Jun 2026)",
        lenses: ["ai-agentic"],
      },
      {
        text: "Mentored university students in practical AI, guiding end-to-end Deep Learning and Computer Vision projects.",
        lenses: ["research", "ai-agentic"],
      },
    ],
    stack: ["LangGraph", "Google Gemini", "Pinecone", "Tavily", "FastAPI", "Docker", "Python"],
    lensRelevance: { all: 100, "ai-agentic": 100, "ml-systems": 88, research: 75 },
  },
  {
    id: "cynapto-scientist",
    role: "Deep Learning Scientist — Video Dubbing (AI LipSync) & Localization",
    organization: "Cynapto Technologies",
    period: "Apr 2024 – Nov 2025",
    location: "Mumbai, IN",
    badge: "500+ Hrs · 4x A100/H100 DDP",
    summary:
      "Led multilingual generative lip-sync modeling and distributed multi-node training across 500+ hours of video data for film and commercial localization.",
    highlights: [
      {
        text: "Developed state-of-the-art lip-sync models for multilingual film and ad dubbing, accurately aligning mouth movements with diverse audio tracks.",
        lenses: ["research", "ml-systems"],
      },
      {
        text: "Established rigorous data curation protocols for a 2-person team (video resolution, frame rate, identity class distribution, multilingual diversity).",
        metric: "2-person curation protocol",
        lenses: ["ml-systems", "research"],
      },
      {
        text: "Engineered a production-grade training pipeline scaling across 500+ hours of video data on multi-node GPU clusters (4x A100/H100s).",
        metric: "500+ Hrs · 4x A100/H100s",
        lenses: ["ml-systems", "research"],
      },
      {
        text: "Migrated audio processing from DeepSpeech (29 features) to high-resolution 80-band mel-spectrograms, improving audio-visual alignment.",
        metric: "29-dim → 80-Band Mel",
        lenses: ["research", "ml-systems"],
      },
      {
        text: "Leveraged GAN and Diffusion-based synthesis with Transformer encoders to improve sync accuracy and realism by 25%.",
        metric: "+25% Realism & Sync",
        lenses: ["research", "ml-systems"],
      },
      {
        text: "Optimized training/inference pipelines via PyTorch DDP orchestration on distributed HPC, slashing training time and inference costs by 30%.",
        metric: "-30% Time & Compute Cost",
        lenses: ["ml-systems"],
      },
    ],
    stack: ["PyTorch DDP", "GANs", "Diffusion Models", "Transformers", "80-Band Mel", "FFmpeg", "OpenCV", "HPC"],
    lensRelevance: { all: 98, "ai-agentic": 78, "ml-systems": 100, research: 94 },
  },
  {
    id: "tcs-research",
    role: "AI Research Engineer — Life Science R&I Lab",
    organization: "Tata Consultancy Services (TCS)",
    period: "Jun 2022 – Jan 2024",
    location: "Bengaluru, IN",
    badge: "93.11% Dice · Patent & PLOS One",
    summary:
      "Invented and published conditional GAN and 3D-Unet medical imaging models in collaboration with clinical scientists and university health systems.",
    highlights: [
      {
        text: "Engineered a conditional GAN (AFSegGAN) for foot ulcer segmentation and parameter estimation, outperforming SOTA with a 93.11% Dice score.",
        metric: "93.11% Dice Score (SOTA)",
        lenses: ["research"],
      },
      {
        text: "Proposed an AI-driven wound management system for remote healthcare targeting the $96.8B US chronic wound treatment market.",
        metric: "$96.8B Market · Patented",
        lenses: ["research", "ai-agentic"],
      },
      {
        text: "Created a conceptual model for 3D Heart segmentation using 3D-Unet as part of the Digital Bio-Twin project.",
        metric: "3D-Unet · Digital Bio-Twin",
        lenses: ["research", "ml-systems"],
      },
      {
        text: "Preprocessed medical imaging datasets (DICOM/NIFTI handling, resampling, normalization, augmentation) and collaborated with clinical scientists, health systems, and universities for model safety and efficacy validation.",
        metric: "DICOM/NIFTI · Clinical Validation",
        lenses: ["research", "ml-systems"],
      },
    ],
    stack: ["Conditional GAN", "3D-Unet", "PyTorch", "TensorFlow", "DICOM/NIFTI", "OpenCV", "Medical CV"],
    lensRelevance: { all: 96, "ai-agentic": 70, "ml-systems": 85, research: 100 },
  },
  {
    id: "tcs-ml-eng",
    role: "Machine Learning Engineer",
    organization: "Tata Consultancy Services (TCS)",
    period: "Jun 2021 – Jun 2022",
    location: "Bengaluru, IN",
    badge: "1.5M Docs Processed",
    summary:
      "Built enterprise-scale OCR, NLP, and cognitive search indexing systems across millions of unstructured and semi-structured documents.",
    highlights: [
      {
        text: "Built scalable document extraction and retrieval pipelines on Azure Cognitive Search, integrating Computer Vision OCR and NLP custom skills.",
        metric: "Azure Cognitive Search + OCR",
        lenses: ["ml-systems", "ai-agentic"],
      },
      {
        text: "Processed and classified 1.5 million multi-format documents (PDF, XML, JSON) for enterprise business unit labeling.",
        metric: "1.5M Multi-Format Docs",
        lenses: ["ml-systems", "ai-agentic"],
      },
    ],
    stack: ["Azure Cognitive Search", "Computer Vision OCR", "NLP", "Python", "PDF/XML/JSON"],
    lensRelevance: { all: 88, "ai-agentic": 84, "ml-systems": 92, research: 68 },
  },
];

export const PUBLICATIONS_AND_PATENTS: PublicationItem[] = [
  {
    id: "patent-wound-system",
    type: "Patent",
    venue: "Patent",
    year: "2023",
    title: "Method and System for wound management system",
    authors: "Jishnu P et al. (TCS Life Science R&I Lab)",
    badgeColor: "emerald",
    keyMetric: "Remote Chronic Wound AI · $96.8B Market",
    abstract:
      "An AI-driven end-to-end system and methodology for automated wound segmentation, geometric parameter estimation, and longitudinal healing assessment from clinical and remote-care imagery, enabling scalable remote chronic wound management.",
    contributions: [
      "Automated pixel-level ulcer boundary segmentation resilient to lighting and clinical capture variance.",
      "Quantitative morphometric parameter estimation (area, perimeter, tissue indicators) for longitudinal tracking.",
      "Designed for remote healthcare workflows targeting the $96.8B US chronic wound treatment market.",
    ],
    bibtex: `@misc{jishnu2023woundpatent,
  title={Method and System for wound management system},
  author={Jishnu P and Research Team, Tata Consultancy Services},
  year={2023},
  note={Patent - AI-Driven Remote Wound Management System}
}`,
    lensRelevance: { all: 100, "ai-agentic": 75, "ml-systems": 80, research: 100 },
  },
  {
    id: "plos-afseggan",
    type: "Journal",
    venue: "PLOS One",
    year: "2023",
    title: "Automatic Foot Ulcer Segmentation Using Conditional GAN (AFSegGAN)",
    authors: "Jishnu P et al.",
    badgeColor: "indigo",
    keyMetric: "93.11% Dice Score (SOTA)",
    abstract:
      "Chronic diabetic foot ulcers require accurate boundary delineation for quantitative clinical assessment. We propose AFSegGAN, a conditional Generative Adversarial Network tailored for automatic foot ulcer segmentation that preserves sharp pathological boundaries and out-performs prior state-of-the-art convolutional architectures with a 93.11% Dice similarity coefficient.",
    contributions: [
      "Formulated conditional adversarial training pairing a multi-scale encoder-decoder generator with a PatchGAN discriminator.",
      "Achieved 93.11% Dice score, surpassing existing segmentation baselines on clinical foot ulcer datasets.",
      "Validated safety and clinical efficacy alongside clinical scientists, health systems, and academic partners.",
    ],
    paperUrl: {
      label: "Read Paper",
      href: "https://journals.plos.org/digitalhealth/article?id=10.1371/journal.pdig.0000344",
    },
    bibtex: `@article{jishnu2023afseggan,
  title={Automatic Foot Ulcer Segmentation Using Conditional GAN (AFSegGAN)},
  author={Jishnu P and collaborators},
  journal={PLOS ONE},
  year={2023},
  note={93.11\\% Dice score on foot ulcer segmentation}
}`,
    lensRelevance: { all: 99, "ai-agentic": 70, "ml-systems": 82, research: 100 },
  },
  {
    id: "springer-shadow-gan",
    type: "Conference",
    venue: "Springer",
    year: "2021",
    title: "Enhanced Shadow Removal for Surveillance Systems using GAN",
    authors: "Jishnu P et al.",
    badgeColor: "cyan",
    keyMetric: "GAN Visual Restoration",
    abstract:
      "Cast shadows in outdoor surveillance video streams frequently degrade downstream object detection, tracking, and re-identification pipelines. We present an adversarial shadow-removal architecture that recovers natural scene illumination and texture fidelity without distorting foreground subject geometry.",
    contributions: [
      "Designed a GAN-based illumination restoration framework preserving structural details in shadowed regions.",
      "Reduced false-positive foreground fragmentation in automated surveillance computer vision pipelines.",
      "Published in Springer conference proceedings following M.Tech research at Amrita Vishwa Vidyapeetham.",
    ],
    paperUrl: {
      label: "Read Paper",
      href: "https://link.springer.com/chapter/10.1007/978-981-16-7167-8_5",
    },
    bibtex: `@inproceedings{jishnu2021shadowgan,
  title={Enhanced Shadow Removal for Surveillance Systems using GAN},
  author={Jishnu P and collaborators},
  booktitle={Springer Conference Proceedings},
  year={2021}
}`,
    lensRelevance: { all: 92, "ai-agentic": 62, "ml-systems": 78, research: 96 },
  },
];

export const AFSEGGAN_BENCHMARK_CHART = [
  { model: "FCN-8s", dice: 81.2, fill: "#475569" },
  { model: "SegNet", dice: 84.6, fill: "#64748B" },
  { model: "U-Net", dice: 87.4, fill: "#06B6D4" },
  { model: "DeepLabV3+", dice: 89.5, fill: "#6366F1" },
  { model: "AFSegGAN (Ours)", dice: 93.11, fill: "#10B981" },
];

export const TECHNICAL_NOTES: TechnicalNote[] = [
  {
    id: "note-agentic-rag",
    slug: "orchestrating-reliable-agentic-rag",
    title: "Orchestrating Reliable Agentic RAG with LangGraph, Pinecone, and Tavily",
    subtitle: "Moving from brittle linear RAG chains to stateful self-correcting retrieval graphs in production FastAPI services.",
    date: "Feb 2026",
    readTime: "6 min read",
    category: "Agentic AI Systems",
    tags: ["LangGraph", "Pinecone", "Tavily", "Google Gemini", "FastAPI", "Docker"],
    lensRelevance: { all: 100, "ai-agentic": 100, "ml-systems": 88, research: 75 },
    sections: [
      {
        heading: "Why Linear RAG Fails in Enterprise IT Support",
        paragraphs: [
          "Standard Retrieve-then-Generate pipelines assume the internal vector store always contains up-to-date answers. In enterprise IT support, newly released OS patches, zero-day advisories, or third-party SaaS outages frequently fall outside static knowledge-base snapshots.",
          "Instead of forcing the LLM to hallucinate from low-similarity chunks, an Agentic RAG system models retrieval as a cyclic state machine with explicit verification gates.",
        ],
        callout:
          "Key Architectural Rule: Never pass ungraded vector chunks straight to final synthesis. Introduce a lightweight relevance grader node that owns the decision to fall back to live Tavily web search.",
      },
      {
        heading: "Designing the Stateful LangGraph Topology",
        paragraphs: [
          "Using LangGraph's StateGraph, every node reads and appends to a typed state object containing the user query, retrieved Pinecone documents, grader verdicts, fallback search results, and final Gemini synthesis.",
        ],
        code: {
          language: "python",
          filename: "graph_orchestrator.py",
          snippet: `from langgraph.graph import StateGraph, END

builder = StateGraph(SupportAgentState)
builder.add_node("retrieve_pinecone", retrieve_from_pinecone)
builder.add_node("grade_relevance", grade_documents_with_gemini)
builder.add_node("tavily_fallback", search_tavily_web)
builder.add_node("synthesize", synthesize_grounded_answer)

builder.set_entry_point("retrieve_pinecone")
builder.add_edge("retrieve_pinecone", "grade_relevance")
builder.add_conditional_edges(
    "grade_relevance",
    route_after_grading,
    {
        "sufficient": "synthesize",
        "insufficient": "tavily_fallback",
    },
)
builder.add_edge("tavily_fallback", "synthesize")
builder.add_edge("synthesize", END)`,
        },
      },
      {
        heading: "Productionizing with FastAPI and Docker",
        paragraphs: [
          "Transitioning from notebook prototypes to cloud services requires clean boundary contracts. Wrapping the compiled LangGraph app inside an async FastAPI service with Pydantic schemas and a multi-stage Dockerfile ensures deterministic latency, health probes, and effortless horizontal scaling.",
        ],
      },
    ],
  },
  {
    id: "note-lipsync-ddp",
    slug: "scaling-lipsync-diffusion-gan-pytorch-ddp",
    title: "Scaling Lip-Sync Diffusion & GAN Models Across 4x A100/H100 GPUs with PyTorch DDP",
    subtitle: "How 80-band mel-spectrograms, Transformer encoders, and multi-node DDP delivered +25% realism and -30% compute cost.",
    date: "Nov 2025",
    readTime: "8 min read",
    category: "Distributed Multimodal ML",
    tags: ["PyTorch DDP", "4x A100/H100", "Diffusion Models", "GANs", "80-Band Mel"],
    lensRelevance: { all: 98, "ai-agentic": 72, "ml-systems": 100, research: 95 },
    sections: [
      {
        heading: "Replacing DeepSpeech (29-dim) with 80-Band Mel-Spectrograms",
        paragraphs: [
          "Early audio-driven lip-sync pipelines often rely on compressed 29-feature DeepSpeech logits, which discard subtle acoustic prosody, plosive energy, and cross-lingual phonetic nuances critical for film and ad dubbing.",
          "Migrating our audio frontend to high-resolution 80-band mel-spectrograms processed by a Transformer temporal encoder preserved rich spectral dynamics across languages—contributing directly to a 25% improvement in lip-sync accuracy and visual realism.",
        ],
        callout:
          "Data Curation Matters as Much as Model Capacity: Enforcing strict FPS, resolution, identity balance, and multilingual distribution across 500+ hours of video prevented mode collapse on underrepresented phonemes.",
      },
      {
        heading: "Eliminating Multi-Node Bottlenecks with PyTorch DDP",
        paragraphs: [
          "Training combined GAN and Diffusion synthesis models over 500+ hours of video quickly hits I/O and gradient-sync walls if dataloading and NCCL collectives are not tuned. By co-designing DistributedSampler sharding, pinned host memory, mixed-precision training, and optimized inference batching, we reduced overall training time and inference compute costs by 30% across 4x A100/H100 GPU nodes.",
        ],
        code: {
          language: "python",
          filename: "ddp_launch.py",
          snippet: `import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP

dist.init_process_group(backend="nccl")
local_rank = int(os.environ["LOCAL_RANK"])
torch.cuda.set_device(local_rank)

model = LipSyncDiffusionGAN(mel_bands=80).to(local_rank)
ddp_model = DDP(
    model,
    device_ids=[local_rank],
    find_unused_parameters=False,
    gradient_as_bucket_view=True,
)`,
        },
      },
    ],
  },
  {
    id: "note-afseggan-dicom",
    slug: "from-dicom-to-93-dice-afseggan",
    title: "From DICOM to 93.11% Dice: Designing AFSegGAN for Remote Wound Management",
    subtitle: "Bridging clinical preprocessing, conditional adversarial segmentation, and patentable healthcare AI.",
    date: "Jan 2024",
    readTime: "7 min read",
    category: "Medical Computer Vision",
    tags: ["AFSegGAN", "Conditional GAN", "DICOM/NIFTI", "3D-Unet", "PLOS One"],
    lensRelevance: { all: 96, "ai-agentic": 65, "ml-systems": 84, research: 100 },
    sections: [
      {
        heading: "The Clinical Boundary Problem in Chronic Wound Care",
        paragraphs: [
          "Chronic foot ulcers present irregular boundaries, heterogeneous tissue coloration, and variable clinical lighting. Standard pixel-wise cross-entropy segmentation models often under-segment jagged wound perimeters, skewing downstream area and healing-rate estimates.",
          "AFSegGAN introduces a conditional PatchGAN discriminator alongside the segmentation generator, penalizing structurally implausible boundary predictions and lifting performance to a 93.11% Dice score (published in PLOS One).",
        ],
        callout:
          "Clinical Translation: Combining AFSegGAN segmentation with quantitative parameter estimation enabled a patented remote wound management architecture targeting the $96.8B US chronic wound care market.",
      },
      {
        heading: "Standardizing DICOM / NIFTI & Volumetric Pipelines",
        paragraphs: [
          "Across both 2D wound imagery and our 3D-Unet Digital Bio-Twin heart segmentation prototype, rigorous DICOM/NIFTI preprocessing—isotropic resampling, intensity normalization, and clinically faithful augmentations—was critical before joint safety and efficacy validation with clinical scientists and university partners.",
        ],
        code: {
          language: "python",
          filename: "medical_preprocess.py",
          snippet: `def normalize_clinical_volume(volume: np.ndarray, clip_percentiles=(0.5, 99.5)) -> np.ndarray:
    """Clip extreme scanner artifacts and z-score normalize foreground voxels."""
    low, high = np.percentile(volume, clip_percentiles)
    clipped = np.clip(volume, low, high)
    mean = clipped.mean()
    std = clipped.std() + 1e-8
    return ((clipped - mean) / std).astype(np.float32)`,
        },
      },
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "M.Tech in Artificial Intelligence & Data Science",
    institution: "Amrita Vishwa Vidyapeetham",
    period: "Jun 2019 – Jun 2021",
    score: "GPA 9.16 / 10.0",
    focus: "Deep Learning, Generative Adversarial Networks, Computer Vision & Statistical ML",
  },
  {
    degree: "GATE Coaching, Computer Science",
    institution: "MITE (Manifold Institute of Technical Education)",
    period: "2017 – 2019",
  },
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Vidya Academy of Science & Technology",
    period: "Jun 2013 – Jun 2017",
    score: "GPA 8.15 / 10.0",
    focus: "Algorithms, Systems Engineering, Databases & Software Architecture",
  },
  {
    degree: "Higher Secondary",
    institution: "THSS Vattamkulam (IHRD), Malappuram, Kerala",
    period: "2011 – 2013",
    score: "90.82%",
  },
  {
    degree: "SSLC",
    institution: "Kerala State Board, MVM School, Valayamkulam, Malappuram, Kerala",
    period: "2010 – 2011",
    score: "100%",
  },
];

export const AWARDS: AwardItem[] = [
  {
    title: "Special Achievement Award — TCS Innovista 2023 BTG Champion",
    organization: "Tata Consultancy Services (DMMT Unit)",
    date: "Jun 2023",
    detail: "Recognized for high-impact AI research & innovation leadership across the DMMT unit.",
  },
  {
    title: "Xcelerate Warrior",
    organization: "Tata Consultancy Services",
    date: "Jun 2023",
    detail: "Awarded for accelerated technical delivery and engineering excellence.",
  },
  {
    title: "RBCDSAI's International Summit on Data Science and AI",
    organization: "IIT Madras",
    date: "Jun 2020",
    detail: "Selected participant at the Robert Bosch Centre for Data Science & AI summit.",
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: "Microsoft AI Agents: From Foundations to Applications Professional Certificate",
    issuer: "Microsoft (Coursera)",
    date: "Jun 2026",
    highlight: true,
  },
  {
    title: "Generative AI with Large Language Models",
    issuer: "DeepLearning.AI, AWS",
  },
  {
    title: "Machine Learning Engineering for Production (MLOps) Specialization",
    issuer: "DeepLearning.AI",
  },
  {
    title: "Generative Adversarial Networks (GANs) Specialization",
    issuer: "DeepLearning.AI",
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
  },
  {
    title: "Machine Learning by Andrew Ng",
    issuer: "Stanford Online",
  },
];

export const BUILT_OUTSIDE_WORK: OutsideWorkProject[] = [
  {
    id: "agentic-job-hunt",
    title: "AgenticJobHunt",
    period: "Jun 2026",
    category: "Multi-Agent AI System",
    summary:
      "Multi-agent system that reads and scores a resume, then discovers and ranks relevant roles across multiple job sources. Built on LangGraph with deepagents, a LiteLLM fallback chain across providers, and Qdrant-backed RAG scoring for match quality.",
    objective:
      "Automate end-to-end resume parsing, multi-source role discovery, resilient multi-provider LLM routing, and vector-scored job-fit ranking.",
    skills: ["LangGraph", "deepagents", "LiteLLM", "Qdrant", "Multi-Agent"],
    lensRelevance: { all: 100, "ai-agentic": 100, "ml-systems": 92, research: 78 },
  },
  {
    id: "yolov5-traffic-detection",
    title: "Intelligent Traffic & Vehicle Detection System (YOLOv5)",
    period: "Aug 2026",
    category: "Computer Vision & Edge Inference",
    summary:
      "Fine-tuned a pretrained YOLOv5 object detection model for transportation and CCTV surveillance, classifying 7 distinct categories and optimizing weights with ONNX and TensorRT for low-latency, GPU-accelerated production inference.",
    highlightsTitle: "Engineering & Dataset Highlights",
    highlights: [
      "Accurately classifies 7 categories: cars, two-wheelers, autos, buses, trucks, clear number plates, and blurred number plates.",
      "Trained on the Traffic Vehicles Object Detection dataset (1,201 real-world traffic & CCTV images, 11,134 annotated objects) for reliable performance in dynamic environments.",
      "Exported trained weights to ONNX and TensorRT formats for cross-platform compatibility and low-latency, GPU-accelerated inference.",
    ],
    demoVideo: {
      src: "/demos/yolov5-traffic-demo.mp4",
      poster: "/demos/yolov5-traffic-poster.jpg",
      caption: "Live Inference Demo · 7-Class Traffic & Number Plate Detection",
    },
    skills: [
      "YOLOv5",
      "Object Detection",
      "Computer Vision",
      "ONNX",
      "TensorRT",
      "PyTorch",
      "CCTV Analytics",
    ],
    lensRelevance: { all: 97, "ai-agentic": 68, "ml-systems": 96, research: 92 },
  },
  {
    id: "gan-image-super-resolution",
    title:
      "Generative Adversarial Network (GAN) based Image Super-Resolution to Enhance Shadow-Less Images",
    period: "Jan 2021 – Jun 2021",
    category: "Generative Computer Vision",
    relationNote:
      'Extended work of "Enhanced Shadow Removal for Surveillance Systems using GAN"',
    summary:
      "Implemented an adversarial super-resolution enhancement stage chained downstream of shadow removal to restore fine textures and sharpness in outdoor surveillance imagery.",
    highlights: [
      "Implemented a Generative Adversarial Network (GAN) for image super-resolution capable of improving output image quality.",
      "Achieved strong SSIM and PSNR metrics compared to state-of-the-art super-resolution models.",
      'Improved the visual fidelity of shadow-less outputs from the "Enhanced Shadow Removal for Surveillance Systems" pipeline by integrating this model downstream.',
    ],
    skills: [
      "GANs",
      "Image Super-Resolution",
      "SSIM",
      "PSNR",
      "Computer Vision",
      "Image Restoration",
    ],
    lensRelevance: { all: 94, "ai-agentic": 64, "ml-systems": 84, research: 98 },
  },
  {
    id: "enhanced-shadow-removal-gan",
    title: "Enhanced Shadow Removal for Surveillance Systems using GAN",
    period: "Jul 2020 – Dec 2020",
    category: "Surveillance CV & GANs",
    summary:
      "Shadow detection and removal is an important task when dealing with outdoor images, as shadows consistently degrade computer vision tasks like visual navigation, object detection, and tracking. While shadow detection has advanced significantly, shadow removal remains challenging—motivating a modified Generative Adversarial Network (GAN) to effectively remove cast shadows.",
    objective:
      "Propose a modified GAN-based shadow removal architecture that generates higher-quality shadow-less images for downstream surveillance vision.",
    externalUrl: {
      label: "Read Paper (Springer)",
      href: "https://link.springer.com/chapter/10.1007/978-981-16-7167-8_5",
    },
    skills: [
      "Modified GAN",
      "Shadow Removal",
      "Computer Vision",
      "Object Tracking Support",
      "Deep Learning",
    ],
    lensRelevance: { all: 92, "ai-agentic": 62, "ml-systems": 80, research: 96 },
  },
  {
    id: "fast-cnn-optimization-ga",
    title: "Fast Optimization of CNN Architecture Using Genetic Algorithm",
    period: "Oct 2020 – Nov 2020",
    category: "Neural Architecture Search",
    summary:
      "Convolutional Neural Networks (CNNs) achieve strong accuracy in image classification, yet performance depends heavily on architecture topology and hyperparameter settings that traditionally require extensive domain expertise.",
    objective:
      "Efficiently explore a defined search space of candidate CNN architectures and automatically tune their hyperparameters using a Genetic Algorithm.",
    skills: [
      "CNNs",
      "Genetic Algorithm",
      "Neural Architecture Search",
      "Hyperparameter Tuning",
      "Image Classification",
    ],
    lensRelevance: { all: 88, "ai-agentic": 60, "ml-systems": 82, research: 94 },
  },
  {
    id: "aisa-ecommerce-reviews",
    title:
      "Aspect Identification and Sentiment Analysis (AISA) in E-commerce Product Reviews",
    period: "Mar 2020 – Jun 2020",
    category: "NLP & Sequence Modeling",
    summary:
      "Analyzes women's clothing e-commerce reviews to classify overall review polarity (positive/negative) and extract aspect-level sentiment. Combines the VADER sentence-level sentiment analysis tool for aspect polarity estimation with a Bidirectional Recurrent Neural Network (Bi-RNN) using Long Short-Term Memory (LSTM) units for sentiment classification.",
    skills: [
      "Bidirectional RNN",
      "LSTM",
      "VADER Sentiment",
      "Aspect-Based Sentiment Analysis",
      "NLP",
    ],
    lensRelevance: { all: 84, "ai-agentic": 72, "ml-systems": 76, research: 88 },
  },
  {
    id: "keras-image-augmentation",
    title: "Image Data Augmentation with Keras",
    period: "Jul 2020",
    category: "Computer Vision & Data Pipelines",
    summary:
      "Addresses insufficient training sample volume and generalization bottlenecks in vision models. Implements Keras image data augmentation pipelines—including cropping, padding, and horizontal flipping—to upsample dataset diversity and train more generalized neural networks without collecting additional raw data.",
    skills: [
      "Keras",
      "Image Data Augmentation",
      "Data Upsampling",
      "Computer Vision",
      "Model Generalization",
    ],
    lensRelevance: { all: 80, "ai-agentic": 58, "ml-systems": 78, research: 84 },
  },
  {
    id: "statoil-iceberg-classifier",
    title:
      "Using Deep Learning to Differentiate Ships and Floating Icebergs in Satellite Images",
    period: "Apr 2020 – Jun 2020",
    category: "Satellite CV · Kaggle Competition",
    relationNote: "Statoil/C-CORE Iceberg Classifier Challenge",
    summary:
      "Built an automated deep learning classifier for remotely sensed radar imagery to distinguish ships from floating icebergs, helping reduce operational costs and maintain safe maritime working conditions.",
    highlightsTitle: "Model Architecture",
    highlights: [
      "Four stacked convolutional blocks for stronger hierarchical feature generalization.",
      "Each stack uses two convolutional layers followed by max-pooling with 20% dropout in between to mitigate overfitting.",
      "Global max pooling and batch-normalization layers to stabilize and normalize intermediate feature activations.",
      "Dense output layer with sigmoid activation trained using Adam optimizer and binary cross-entropy loss.",
    ],
    externalUrl: {
      label: "Kaggle Challenge",
      href: "https://www.kaggle.com/c/statoil-iceberg-classifier-challenge/submissions",
    },
    skills: [
      "CNNs",
      "Binary Classification",
      "Satellite Imagery",
      "Batch Normalization",
      "Dropout",
      "Adam Optimizer",
    ],
    lensRelevance: { all: 86, "ai-agentic": 58, "ml-systems": 82, research: 90 },
  },
  {
    id: "gsm-land-rover-robotics",
    title: "Cell Phone Controlled Land Rover Robot with Home Automation",
    period: "Jun 2016 – Aug 2016",
    category: "Embedded Systems & Robotics",
    summary:
      "Engineered a GSM-module-enabled land rover robot to capture visuals from remote areas and perform real-time home automation. Designed for remote operation from any location—including accessibility support for differently-abled users—and extensible to military, medical, and hazardous environments where direct human interaction is difficult.",
    skills: [
      "Raspberry Pi",
      "GSM Module",
      "Embedded Robotics",
      "Home Automation",
      "Remote Telemetry",
      "Hardware Integration",
    ],
    lensRelevance: { all: 76, "ai-agentic": 52, "ml-systems": 74, research: 70 },
  },
];

export const PRODUCTIVITY_TOOLS: ProductivityTool[] = [
  {
    id: "vscode",
    name: "VS Code",
    description:
      "Primary editor for extensions, debugging, remote development, and Git integration.",
  },
  {
    id: "cursor",
    name: "Cursor",
    description:
      "AI-native IDE for pair-programming, multi-file edits, and rapid iteration.",
  },
  {
    id: "claude-code",
    name: "Claude Code",
    description:
      "Terminal-first AI for deep codebase reasoning, code reviews, and end-to-end feature work.",
  },
  {
    id: "jupyter",
    name: "Jupyter Notebook",
    description:
      "Go-to environment for interactive ML experiments, data exploration, and model debugging.",
  },
  {
    id: "antigravity",
    name: "Google Antigravity",
    description:
      "Agent-first IDE for autonomous planning, multi-file execution, and end-to-end testing across editor, terminal, and browser.",
  },
  {
    id: "gemini",
    name: "Gemini / Google AI Studio",
    description:
      "Daily assistant for technical research, architecture brainstorming, and rapid prompt prototyping.",
  },
];

export const HOBBY_GROUPS: HobbyGroup[] = [
  {
    id: "sports",
    title: "Sports",
    items: [
      {
        id: "football",
        name: "Football",
        description:
          "Team sport centered on strategy, fitness, and competition on the pitch.",
      },
      {
        id: "cricket",
        name: "Cricket",
        description:
          "Patience, tactics, and timing, both on and off the field.",
      },
      {
        id: "badminton",
        name: "Badminton",
        description:
          "Fast reflexes, footwork, and rallies demanding precision under pressure.",
      },
    ],
  },
  {
    id: "curiosity-tinkering",
    title: "Curiosity & Tinkering",
    items: [
      {
        id: "reverse-engineering",
        name: "Reverse Engineering",
        description:
          "Dismantling home appliances and consumer gadgets to understand their circuitry, mechanics, and design.",
      },
      {
        id: "current-affairs",
        name: "Current Affairs & Reading",
        description:
          "Daily newspaper reading for social awareness, civic perspective, and staying grounded outside the tech bubble.",
      },
    ],
  },
];

export const QUICK_AI_PROMPTS = [
  "Summarize Jishnu's distributed training experience",
  "Tell me about his patent",
  "What is his experience with Agentic RAG?",
  "Why is he a strong fit for Research Scientist roles?",
];
