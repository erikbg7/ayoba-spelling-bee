import React from 'react';
import { useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { userAtom, userWordsAtom } from '../atoms/user';
import { centerLetterAtom, wordListAtom } from '../atoms/challenge';
import { errorMessageAtom, ErrorTooltip } from './ErrorTooltip';
import { RewardOverlay } from './RewardOverlay';

type WordInputRefHandler = {
  addLetter: (letter: string) => void;
  deleteLetter: () => void;
  validateWord: () => void;
};

const WordInput = React.forwardRef<WordInputRefHandler, {}>(({}, ref) => {
  const [word, setWord] = React.useState('');

  const setUser = useUpdateAtom(userAtom);
  const setErrorMessage = useUpdateAtom(errorMessageAtom);

  const userWords = useAtomValue(userWordsAtom);
  const challengeWords = useAtomValue(wordListAtom);
  const centerLetter = useAtomValue(centerLetterAtom);

  const isCenterLetter = (letter: string) => letter === centerLetter;
  const handleWordValidation = () => {
    if (word.length <= 3) return setErrorMessage('The word is to short!');
    if (userWords.includes(word)) return setErrorMessage('You already found this word!');
    if (!challengeWords.includes(word)) return setErrorMessage('This word does not exist!');

    setWord('');
    setUser((prevUser) => ({
      reward: word.length,
      totalPoints: prevUser.totalPoints + word.length,
      userWords: [...prevUser.userWords, word],
    }));
  };

  React.useImperativeHandle(ref, () => ({
    addLetter: (letter: string) => setWord((w) => w + letter),
    deleteLetter: () => setWord((w) => w.slice(0, -1)),
    validateWord: () => handleWordValidation(),
  }));

  return (
    <div className="relative text-center my-4 h-8 w-full">
      <RewardOverlay />
      <div className="relative uppercase text-2xl font-semibold">
        {word.split('').map((l, i) => (
          <span key={i} className={isCenterLetter(l) ? 'text-amber-500' : 'text-black'}>
            {l}
          </span>
        ))}
        <span className="absolute bg-amber-500 dummy-caret"></span>
      </div>
      <ErrorTooltip />
    </div>
  );
});

export { WordInput };
export type { WordInputRefHandler };
