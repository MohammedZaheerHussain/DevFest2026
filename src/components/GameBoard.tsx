import React from 'react';
import type { CardState } from '../types/game';
import { Card } from './Card';

interface GameBoardProps {
  cards: CardState[];
  onCardClick: (card: CardState, event: React.MouseEvent<HTMLDivElement>) => void;
  isLocked: boolean;
  focusedIndex?: number;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  cards,
  onCardClick,
  isLocked,
  focusedIndex = -1,
}) => {
  const isHard = cards.length === 32;

  return (
    <div className="game-board-wrapper" data-ui="game-board">
      <div
        className={`board ${isHard ? 'board-hard' : 'board-easy'}`}
        role="region"
        aria-label={`DevFest Memory Match ${isHard ? '8x4 Hard Grid' : '4x4 Easy Grid'}`}
      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            onClick={onCardClick}
            disabled={isLocked || card.isMatched || card.isFlipped}
            isFocused={focusedIndex === index}
          />
        ))}
      </div>
    </div>
  );
};
