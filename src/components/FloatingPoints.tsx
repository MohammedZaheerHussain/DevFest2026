import React from 'react';

export interface FloatingPointItem {
  id: number;
  text: string;
  x: number;
  y: number;
}

interface FloatingPointsProps {
  items: FloatingPointItem[];
}

export const FloatingPoints: React.FC<FloatingPointsProps> = ({ items }) => {
  return (
    <div className="floating-points-layer" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item.id}
          className="floating-score-bubble"
          style={{ left: `${item.x}px`, top: `${item.y}px` }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
};
