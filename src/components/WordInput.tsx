import React from 'react';
import { ErrorTooltip } from './ErrorTooltip';
import { RewardOverlay } from './RewardOverlay';

type Props = {
  letters: string;
  center: string;
};

type WordInputRefHandler = {
  addLetter: (letter: string) => void;
  deleteLetter: () => void;
  getWord: () => string;
  clearWord: () => void;
};

const WordInput = React.forwardRef<WordInputRefHandler, Props>(({ letters, center }, ref) => {
  const [word, setWord] = React.useState('');
  const isCenterLetter = (letter: string) => letter === center;

  React.useImperativeHandle(ref, () => ({
    addLetter: (letter: string) => setWord((w) => w + letter),
    deleteLetter: () => setWord((w) => w.slice(0, -1)),
    clearWord: () => setWord(''),
    getWord: () => word,
  }));

  return (
    <div className="relative text-center my-4 h-8 w-full">
      <RewardOverlay />
      <div className="relative uppercase text-2xl font-semibold">
        {word.split('').map((l) => (
          <span className={isCenterLetter(l) ? 'text-amber-500' : 'text-black'}>{l}</span>
        ))}
        <span className="absolute bg-amber-500 dummy-caret"></span>
      </div>
      <ErrorTooltip />
    </div>
  );
});

export { WordInput };
export type { WordInputRefHandler };
