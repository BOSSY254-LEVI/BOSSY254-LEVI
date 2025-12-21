import { AnimatedBackground } from '@/components/AnimatedBackground';
import { StarCursor } from '@/components/StarCursor';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ImpactDashboard } from '@/components/ImpactDashboard';
import { ExperienceSection } from '@/components/ExperienceSection';
import { CertificationsSection } from '@/components/CertificationsSection';
import { BlogSection } from '@/components/BlogSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

export default function Index() {
  return (
    <>
      <StarCursor />
      <AnimatedBackground />
      <Navigation />
      
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ImpactDashboard />
        <ExperienceSection />
        <CertificationsSection />
        <BlogSection />
        <ContactSection />
      </main>

      <Footer />
      <Toaster />
    </>
  );
}
