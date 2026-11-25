import { BeyondWorkSection } from "@/components/BeyondWorkSection";
import { BuiltOutsideWork } from "@/components/BuiltOutsideWork";
import { CommandPaletteAI } from "@/components/CommandPaletteAI";
import {
  ContactSection,
  CredentialsSection,
} from "@/components/CredentialsAndContact";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ResearchVault } from "@/components/ResearchVault";
import { SkillsMatrix } from "@/components/SkillsMatrix";
import { TechnicalNotes } from "@/components/TechnicalNotes";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProjectsSection />
        <ExperienceTimeline />
        <ResearchVault />
        <SkillsMatrix />
        <BuiltOutsideWork />
        <TechnicalNotes />
        <CredentialsSection />
        <BeyondWorkSection />
        <ContactSection />
      </main>
      <CommandPaletteAI />
    </div>
  );
}
