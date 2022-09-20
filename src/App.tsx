import React from 'react';
import { HoneyComb } from './components/HoneyComb';
import { getDailyChallenge, getRandomChallenge } from './api';
import { WordInput } from './components/WordInput';

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
  const [word, setWord] = React.useState('');
  const [validWords, setValidWords] = React.useState<string[]>([]);
  const [challenge, setChallenge] = React.useState<Challenge>(INITIAL_CHALLENGE_STATE);

  const isLoading = !challenge.letters || !challenge.center;

  React.useEffect(() => {
    (async function () {
      const challenge = await getDailyChallenge();
      console.log({ challenge });
      setChallenge(challenge);
    })();
  }, []);

  const handleCellClick = (letter: string) => setWord((w) => w + letter);
  const handleDeleteLetter = () => setWord((w) => w.slice(0, -1));
  const handleWordSubmit = () => {
    if (word.length <= 3) {
      alert('The word is to short!');
    } else {
      if (validWords.includes(word)) {
        alert('You already found this word!');
        return;
      }
      if (challenge.wordlist.includes(word)) {
        alert('Nice! You have found a word!');
        setValidWords((words) => [...words, word]);
        setWord('');
      } else {
        alert('Sorry, this word does not exist!');
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/*<div className="caret-amber-500 dummy-caret">d</div>*/}
      <WordInput word={word} letters={challenge.letters} center={challenge.center} />
      <HoneyComb
        letters={challenge.letters}
        center={challenge.center}
        onCellClick={handleCellClick}
      />
      <div className="inline-flex my-6">
        <button
          onClick={handleDeleteLetter}
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
