import React, { useEffect, useRef } from 'react';
import { useUpdateAtom } from 'jotai/utils';
import { getDailyChallenge } from './api';
import { challengeAtom } from './atoms/challenge';
import { HoneyComb } from './components/HoneyComb';
import { UserActions } from './components/UserActions';
import { UserPoints } from './components/UserPoints';
import { UserWords } from './components/UserWords';
import { WordInput } from './components/WordInput';
import type { WordInputRefHandler } from './components/WordInput';

function App() {
  const setChallenge = useUpdateAtom(challengeAtom);
  const wordInputRef = useRef<WordInputRefHandler>(null);

  useEffect(() => {
    (async function () {
      const challenge = await getDailyChallenge();
      console.log({ challenge });
      setChallenge(challenge);
    })();
  }, []);

  const handleAddLetter = (l: string) => wordInputRef.current?.addLetter?.(l);
  const handleDeleteLetter = () => wordInputRef.current?.deleteLetter?.();
  const handleWordSubmit = () => wordInputRef.current?.validateWord?.();

  return (
    <div className="flex flex-col items-center">
      <UserWords />
      <WordInput ref={wordInputRef} />
      <HoneyComb onCellClick={handleAddLetter} />
      <UserPoints />
      <UserActions onDelete={handleDeleteLetter} onSubmit={handleWordSubmit} />
    </div>
  );
}

export default App;
