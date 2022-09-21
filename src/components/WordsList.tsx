import React from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

type Props = { words: string[]; centerLetter: string };

const WordsList: React.FC<Props> = ({ words, centerLetter }) => {
  const [animationParent] = useAutoAnimate<HTMLUListElement>();
  const isCenterLetter = (letter: string) => letter === centerLetter;

  return (
    <ul
      ref={animationParent}
      className="flex flex-wrap justify-center items-center w-full my-4 h-24"
    >
      {!words.length && (
        <div className="text-center text-lg text-gray-400">
          <div>Use the honeycomb</div>
          <div>to write a word</div>
        </div>
      )}
      {words.map((w) => (
        <div className="px-4 py-1 m-1 bg-gray-800 rounded-md">
          {w.split('').map((l) => (
            <span className={isCenterLetter(l) ? 'text-amber-500' : 'text-white'}>{l}</span>
          ))}
        </div>
      ))}
    </ul>
  );
};

export { WordsList };
