'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';

export default function Home() {
  const [name, setName] = useState('');
  const [initParty, setInitParty] = useState(false);
  const [message, setMessage] = useState('');
  const isPartyTime = message === 'PARTY!!!';

  useEffect(() => {
    if (!initParty) return;

    const message = [
      `${name}`,
      'you have been chosen',
      'Pay close attention',
      'and you might find yourself',
      'in a crabtastic place',
      'turn your volume up',
      'are you ready...',
      '3...',
      '2...',
      '1...',
      '...',
      '...?',
    ];
    const interval = 1200;
    let index = 0;

    const timer = setInterval(() => {
      setMessage(message[index]);
      if (index === message.length - 1) {
        setMessage('PARTY!!!');
        clearInterval(timer);
      }
      index = (index + 1) % message.length;
    }, interval);

    return () => clearInterval(timer);
  }, [initParty, name]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current === null) return;
    if (isPartyTime) {
      audioRef.current.play();
      const intervalId = setInterval(() => {
        // launch a few confetti from the left edge
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        // and launch a few from the right edge
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 333);
      setTimeout(() => {
        clearInterval(intervalId);
      }, 4000);

      const body = document.body;
      if (isPartyTime) {
        body.classList.add('party');
      } else {
        body.classList.remove('party');
      }
      return () => clearInterval(intervalId);
    } else {
      audioRef.current.pause();
    }
  }, [isPartyTime]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name.length < 1) {
      alert('Name must be at least 1 character long');
      return;
    }

    setInitParty(true);
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {!initParty && (
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="rounded p-2 text-black"
          />
          <button type="submit" className="bg-blue-400 px-2 rounded">
            GO
          </button>
        </form>
      )}
      <h1 className="font-bold glitch">
        <span aria-hidden="true">{message}</span>
        {message}
        <span aria-hidden="true">{message}</span>
      </h1>
      {isPartyTime && (
        <div className="relative aspect-video w-screen">
          <Image
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmY3bGZsaHQyYXltZHJrNmFrbnY4dm52eDNrZnUwOW1hdGhhcmV3ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2dK0W3oUksQk0Xz8OK/giphy.gif"
            alt="crab rave"
            fill
          />
        </div>
      )}
      <audio ref={audioRef} src="/crabbypatty.mp3" />
    </main>
  );
}
