import React, { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  as?: 'article' | 'div';
}

export function TiltCard({
  children,
  className = '',
  as = 'article',
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    'rotateX(0deg) rotateY(0deg) translateY(0px)',
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) translateY(-4px)`,
    );
  };

  const handlePointerLeave = () => {
    setTransform('rotateX(0deg) rotateY(0deg) translateY(0px)');
  };

  const Tag = as;

  return (
    <Tag
      ref={cardRef as React.RefObject<HTMLDivElement>}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ transform }}
      className={`tilt-card transition-transform duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] ${className}`}
    >
      {children}
    </Tag>
  );
}
