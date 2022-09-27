import React from 'react';
import { HoneyComb } from './components/HoneyComb';
import { UserActions } from './components/UserActions';
import { UserPoints } from './components/UserPoints';
import { useUpdateAtom } from 'jotai/utils';
import { userWordsAtom } from './atoms/user';

type Challenge = {
  letters: string;
  center: string;
  wordlist: string[];
};

const INITIAL_CHALLENGE_STATE = {
  letters: '',
  center: '',
  wordlist: [],
};

function App() {
  const wordInputRef = React.useRef<WordInputRefHandler>(null);

  const setUserWords = useUpdateAtom(userWordsAtom);

  const [validWords, setValidWords] = React.useState<string[]>([]);
  const [challenge, setChallenge] = React.useState<Challenge>(INITIAL_CHALLENGE_STATE);

  React.useEffect(() => {
    (async function () {
      const challenge = await getDailyChallenge();
      console.log({ challenge });
      setChallenge(challenge);
    })();
  }, []);

  const handleWordSubmit = () => {
    const word = wordInputRef.current?.getWord() || '';

    if (word.length <= 3) {
      return setErrorMessage('The word is to short!');
    }
    if (validWords.includes(word)) {
      return setErrorMessage('You already found this word!');
    }
    if (!challenge.wordlist.includes(word)) {
      return setErrorMessage('This word does not exist!');
    }

    setReward(word.length);
    setUserWords((words) => [...words, word]);
    wordInputRef.current?.clearWord();
  };

  return (
    <div className="flex flex-col items-center">
      <UserWords centerLetter={challenge.center} />
      <WordInput ref={wordInputRef} letters={challenge.letters} center={challenge.center} />
      <HoneyComb
        letters={challenge.letters}
        center={challenge.center}
        onCellClick={wordInputRef.current?.addLetter!}
      />
      <UserPoints />
      <UserActions onDelete={handleDeleteLetter} onSubmit={handleWordSubmit} />
    </div>
  );
}

export default App;
