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
    <div className="text-center my-4 h-8">
      <div className="relative uppercase text-2xl font-semibold">
        {wordLetters.map((l) => (
          <span className={isCenterLetter(l) ? 'text-amber-500' : 'text-black'}>{l}</span>
        ))}
        <span className="absolute bg-amber-500 dummy-caret"></span>
      </div>
    </div>
  );
};

export { WordInput };
