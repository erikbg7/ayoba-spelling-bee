import React from 'react';
import { HoneyComb } from './components/HoneyComb';
import { getDailyChallenge, getRandomChallenge } from './api';
import { WordInput, WordInputRefHandler } from './components/WordInput';
import { WordsList } from './components/WordsList';
import { useAtom } from 'jotai';
import { rewardAtom } from './components/RewardOverlay';
import { errorMessageAtom } from './components/ErrorTooltip';

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

  const [reward, setReward] = useAtom(rewardAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);

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

    setTimeout(() => {
      setValidWords((words) => [...words, word]);
      wordInputRef.current?.clearWord();
    }, 200);
  };

  return (
    <div className="flex flex-col items-center">
      <WordsList words={validWords} centerLetter={challenge.center} />
      <WordInput ref={wordInputRef} letters={challenge.letters} center={challenge.center} />
      <HoneyComb
        letters={challenge.letters}
        center={challenge.center}
        onCellClick={wordInputRef.current?.addLetter!}
      />
      <div>
        <span id="user-points">{reward}</span> / 50 points
      </div>
      <div className="inline-flex my-6">
        <button
          onClick={wordInputRef.current?.deleteLetter!}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-l"
        >
          Delete
        </button>
        <button
          onClick={handleWordSubmit}
          className="bg-amber-300 hover:bg-amber-400 text-gray-800 font-bold py-2 px-6 rounded-r"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
