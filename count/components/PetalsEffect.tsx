
import React, { useEffect, useState } from 'react';

const PetalsEffect: React.FC = () => {
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; size: number; opacity: number }>>([]);

  useEffect(() => {
    const count = 25;
    const newPetals = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      size: 5 + Math.random() * 15,
      opacity: 0.1 + Math.random() * 0.4,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal bg-blue-100/40 rounded-full blur-[2px]"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.2}px`,
            opacity: petal.opacity,
            boxShadow: '0 0 10px rgba(147, 197, 253, 0.3)',
            borderRadius: '100% 10% 100% 10%', // 像花瓣的形狀
          }}
        />
      ))}
      
      {/* 額外的閃爍星光 */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
    </div>
  );
};

export default PetalsEffect;
