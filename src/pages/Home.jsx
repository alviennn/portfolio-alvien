import { useEffect, useRef } from 'react';
import PublicLayout from './PublicLayout';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';


export default function Home() {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      page.querySelectorAll('[data-reveal]').forEach((element) => element.classList.add('is-visible'));
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

    const observeElement = (element) => {
      if (
        !element.matches?.('[data-reveal]') ||
        element.classList.contains('is-visible') ||
        element.classList.contains('is-reveal-pending')
      ) {
        return;
      }

      element.classList.add('is-reveal-pending');
      observer.observe(element);
    };

    page.querySelectorAll('[data-reveal]').forEach(observeElement);

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;

          observeElement(node);
          node.querySelectorAll?.('[data-reveal]').forEach(observeElement);
        });
      });
    });

    mutationObserver.observe(page, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
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
