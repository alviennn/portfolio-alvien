import { useEffect, useState } from 'react';

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

const CHARACTER_DURATION = 130;
const READING_PAUSE = 500;

export default function HelloScreen({ onComplete }) {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [reduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const characters = Array.from(GREETINGS[greetingIndex]);
    const timers = reduceMotion ? [] : characters.map((_, index) =>
      window.setTimeout(() => setVisibleCharacters(index + 1), (index + 1) * CHARACTER_DURATION),
    );
    timers.push(window.setTimeout(() => {
      if (greetingIndex === GREETINGS.length - 1) {
        setIsLeaving(true);
      } else {
        setVisibleCharacters(0);
        setGreetingIndex(greetingIndex + 1);
      }
    }, (reduceMotion ? 0 : characters.length * CHARACTER_DURATION) + READING_PAUSE));

    return () => timers.forEach(window.clearTimeout);
  }, [greetingIndex, reduceMotion]);

  useEffect(() => {
    if (!isLeaving) return undefined;
    const timer = window.setTimeout(onComplete, 520);
    return () => window.clearTimeout(timer);
  }, [isLeaving, onComplete]);

  const greeting = GREETINGS[greetingIndex];
  const typedGreeting = reduceMotion ? greeting : Array.from(greeting).slice(0, visibleCharacters).join('');
  const isRtlGreeting = GREETINGS[greetingIndex] === 'مرحبا';

  return (
    <section
      className={`hello-screen ${isLeaving ? 'hello-screen--leaving' : ''}`}
      aria-label="Welcome screen"
    >
      <div className="hello-screen__content">
        <div className="hello-screen__word-wrap">
          <p
            className={`hello-screen__word ${isRtlGreeting ? 'hello-screen__word--rtl' : ''}`}
            dir={isRtlGreeting ? 'rtl' : undefined}
            key={greetingIndex}
            aria-label={greeting}
          >
            <span className="hello-screen__word--ghost" aria-hidden="true">{greeting}</span>
            <span className="hello-screen__typed" aria-hidden="true">{typedGreeting}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
