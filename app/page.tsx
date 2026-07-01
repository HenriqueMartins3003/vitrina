import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Plans from "@/components/Plans";
import Guarantee from "@/components/Guarantee";
import ForWho from "@/components/ForWho";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="landing">
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Plans />
      <Guarantee />
      <ForWho />
      <FAQ />
      <FinalCTA />
      <Footer />
      <ScrollReveal />
    </main>
  );
}
