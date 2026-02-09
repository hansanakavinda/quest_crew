import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <Hero />
      <BentoGrid />
    </main>
  );
}
