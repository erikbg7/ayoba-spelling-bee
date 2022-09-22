import React from 'react';

type Props = {
  word: string;
  letters: string;
  center: string;
};

const WordInput: React.FC<Props> = ({ letters, center, word }) => {
  const wordLetters = word.split('');
  const isCenterLetter = (letter: string) => letter === center;

  return (
    <div className="relative text-center my-4 h-8 w-full">
      <div
        id="points-reward"
        className="absolute right-0 left-0 text-amber-300 text-4xl font-bold"
      />
      <div className="relative uppercase text-2xl font-semibold">
        {wordLetters.map((l) => (
          <span className={isCenterLetter(l) ? 'text-amber-500' : 'text-black'}>{l}</span>
        ))}
        <span className="absolute bg-amber-500 dummy-caret"></span>
      </div>
      <div className="absolute right-0 left-0">
        <div id="error-toast" />
      </div>
    </div>
  );
};

export { WordInput };
