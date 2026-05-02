import Hero from "@/components/Hero";
import MarqueeBar from "@/components/MarqueeBar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBar />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}
