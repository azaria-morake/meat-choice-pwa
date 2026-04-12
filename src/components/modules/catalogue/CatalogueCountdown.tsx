'use client';

import { useEffect, useState } from 'react';

export function CatalogueCountdown({ validTo }: { validTo: string }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(validTo).getTime();
      const distance = end - now;

      if (distance < 0) {
        setTimeLeft('EXPIRED');
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    }, 1000);

    return () => clearInterval(timer);
  }, [validTo]);

  if (!timeLeft) return null;

  return (
    <div className="bg-[#E11D48] text-white px-4 py-1.5 rounded-full flex items-center gap-2 w-fit">
      <span className="text-[10px] font-black uppercase tracking-widest">⏳ Expires in:</span>
      <span className="text-sm font-mono font-bold">{timeLeft}</span>
    </div>
  );
}
