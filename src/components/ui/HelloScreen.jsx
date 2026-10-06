import { useCallback, useEffect, useState } from 'react';

const GREETINGS = [
  'Hello',
  'Halo',
  'Bonjour',
  'Hola',
  'Ciao',
  'Hallo',
  'こんにちは',
  '안녕하세요',
  '你好',
  'مرحبا',
];

const GREETING_DURATION = 430;

export default function HelloScreen({ onComplete }) {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  const finish = useCallback(() => setIsLeaving((current) => current || true), []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduceMotion ? 180 : GREETING_DURATION;
    const timer = window.setInterval(() => {
      setGreetingIndex((current) => {
        if (current >= GREETINGS.length - 1) {
          window.clearInterval(timer);
          window.setTimeout(finish, duration);
          return current;
        }
        return current + 1;
      });
    }, duration);

    return () => window.clearInterval(timer);
  }, [finish]);

  useEffect(() => {
    if (!isLeaving) return undefined;
    const timer = window.setTimeout(onComplete, 520);
    return () => window.clearTimeout(timer);
  }, [isLeaving, onComplete]);

  const nextGreeting = GREETINGS[(greetingIndex + 1) % GREETINGS.length];

  return (
    <section
      className={`hello-screen ${isLeaving ? 'hello-screen--leaving' : ''}`}
      aria-label="Welcome screen"
    >
      <div className="hello-screen__content" aria-live="polite">
        <div className="hello-screen__word-wrap">
          <p className="hello-screen__word" key={greetingIndex}>{GREETINGS[greetingIndex]}</p>
          <p className="hello-screen__word hello-screen__word--ghost" aria-hidden="true">{nextGreeting}</p>
        </div>
      </div>
    </section>
  );
}
