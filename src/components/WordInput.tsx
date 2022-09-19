import React from 'react';

type Props = {
  word: string;
  letters: string;
  center: string;
};

const getLetterColor = (letters: string, center: string) => (testLetter: string) => {
  if (center.includes(testLetter)) {
    return 'text-amber-500';
  }
  if (letters.includes(testLetter)) {
    return 'text-black';
  }
  return 'text-gray-500';
};

const WordInput: React.FC<Props> = ({ letters, center, word }) => {
  const wordLetters = word.split('');
  const letterColorGetter = getLetterColor(letters, center);

  return (
    <div className="text-center my-12 h-8">
      {!!wordLetters.length ? (
        <div className="uppercase text-2xl font-semibold">
          {wordLetters.map((l) => (
            <span className={letterColorGetter(l)}>{l}</span>
          ))}
        </div>
      ) : (
        <div>Use the honeycomb to write a word</div>
      )}
    </div>
  );
};

export { WordInput };
