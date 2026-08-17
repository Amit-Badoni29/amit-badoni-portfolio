import { CustomCursor } from '@/components/CustomCursor';
import { Preloader } from '@/components/Preloader';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Education } from '@/components/Education';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { SpaceBackground } from '@/components/SpaceBackground';
import { useLenis } from '@/hooks/useLenis';
import { useReveal } from '@/hooks/useReveal';

function App() {
  useLenis();
  useReveal();

  return (
    <div className="noise-overlay min-h-screen bg-base text-primary relative">
      <SpaceBackground />
      <Preloader />
      <CustomCursor />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
