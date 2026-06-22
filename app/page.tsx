import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Plans from "@/components/Plans";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="grain">
      <Navbar />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <Plans />
      <FAQ />
      <Footer />
    </main>
  );
}
