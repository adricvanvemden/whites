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

  function crabParty() {
    const defaults = {
      scalar: 2,
      spread: 180,
      particleCount: 30,
      origin: { y: -0.1 },
      startVelocity: -35,
    };

    const crab = confetti.shapeFromPath({
      path: 'M189.788,121.935c0.979-1.54,1.826-3.122,2.508-4.746l30.203-5.299L254,127.64l-31.501-31.501l-28.472,5.695  c-0.274-1.494-0.678-2.963-1.198-4.405l23.765-9.164l18.511-24.954l-0.021,0c7.837-10.608,0.296-30.923-17.343-46.089  c-11.36-9.775-24.236-15.081-34.424-15.11l23.429,46.906l-39.819-20.17c2.943,8.604,9.401,17.926,18.615,25.84  c7.401,6.366,15.434,10.835,22.954,13.19l-5.683,12.513l-15.617,7.321c-7.561-9.231-20.471-16.465-36.19-20.089  c0.996-1.225,1.594-2.786,1.594-4.487c0-3.933-3.189-7.122-7.122-7.122c-3.933,0-7.122,3.189-7.122,7.122  c0,0.876,0.166,1.71,0.455,2.485c-3.518-0.36-7.125-0.555-10.806-0.555c-3.681,0-7.288,0.195-10.806,0.555  c0.289-0.775,0.455-1.61,0.455-2.485c0-3.933-3.189-7.122-7.122-7.122s-7.122,3.189-7.122,7.122c0,1.702,0.598,3.262,1.594,4.487  c-15.72,3.624-28.63,10.859-36.192,20.091l-15.621-7.322L47.51,67.885c7.518-2.354,15.548-6.819,22.945-13.179  c9.214-7.915,15.672-17.247,18.625-25.86l-39.829,20.17L72.67,2.119C62.471,2.159,49.615,7.455,38.245,17.24  c-17.639,15.164-25.177,35.492-17.33,46.095l18.492,24.929l23.769,9.166c-0.521,1.442-0.924,2.91-1.198,4.405l-28.477-5.695  L2,127.64l31.501-15.75l30.209,5.3c0.682,1.624,1.529,3.205,2.507,4.745l-32.716,5.706l-15.75,25.594l26.616-16.913l31.468-2.725  l4.25,4.809l-13.114,3.016L49.251,159.14l19.651,15.72c0.002,0.003,0.005,0.007,0.008,0.01c0-0.001,0.001-0.002,0.001-0.003  l0.028,0.023l-0.013-0.053c0.945-1.698,1.49-3.649,1.49-5.73c0-4.158-2.153-7.807-5.4-9.912l-0.014-0.055l8.86-7.875h17.588  l2.255,2.552c1.622,1.836,3.954,2.887,6.405,2.887h55.445c2.45,0,4.782-1.051,6.404-2.887l2.255-2.552h17.927l8.86,7.875  l-0.014,0.055c-3.247,2.105-5.4,5.754-5.4,9.912c0,2.081,0.545,4.032,1.49,5.73l-0.013,0.053l0.028-0.023  c0.001,0.001,0.001,0.002,0.001,0.003c0.003-0.003,0.005-0.007,0.008-0.01l19.65-15.72l-17.719-17.719l-13.395-3.081l4.217-4.771  l31.782,2.752l26.616,16.913l-15.75-25.594L189.788,121.935z',
      // @ts-ignore
      matrix: [0.020491803278688523, 0, 0, 0.020491803278688523, 0.172131147540983, 5.9016393442622945],
    });

    confetti({
      ...defaults,
      shapes: [crab],
      colors: ['#ff0000', '#ff3333', '#ff6666'],
      scalar: 12,
    });
  }

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

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      const currentTime = audio?.currentTime;

      // Trigger events based on the current time
      if (currentTime && currentTime > 30 && currentTime < 33) {
        crabParty();
      }
    };

    audio?.addEventListener('timeupdate', handleTimeUpdate);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      audio?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

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
        <div className="relative aspect-video w-screen max-w-2xl mt-12">
          <Image
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmY3bGZsaHQyYXltZHJrNmFrbnY4dm52eDNrZnUwOW1hdGhhcmV3ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2dK0W3oUksQk0Xz8OK/giphy.gif"
            alt="crab rave"
            fill
            className="rounded drop-shadow-lg"
          />
        </div>
      )}
      <audio ref={audioRef} src="/crabbypatty.mp3" />
    </main>
  );
}
