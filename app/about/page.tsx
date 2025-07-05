import HeroSection from "./components/HeroSection";
import MissionSection from "./components/MissionSection";
import OurStory from "./components/OurStory";
import StatsSection from "./components/StatsSection";
import TeamSection from "./components/TeamSection";
import ValuesSection from "./components/ValuesSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <OurStory />
      <MissionSection />
      <StatsSection />
      <TeamSection />
      <ValuesSection />
    </div>
  );
}
