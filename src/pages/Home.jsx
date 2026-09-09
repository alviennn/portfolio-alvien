import { useEffect, useRef } from 'react';
import PublicLayout from './PublicLayout';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';


export default function Home() {
  const pageRef = useRef(null);

  useEffect(() => {
    const elements = pageRef.current?.querySelectorAll('[data-reveal]');
    if (!elements?.length) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <PublicLayout>
      <main ref={pageRef}>
      <Hero />
      <About />
      <Projects />
      <Contact />
      </main>
    </PublicLayout>
  );
}
