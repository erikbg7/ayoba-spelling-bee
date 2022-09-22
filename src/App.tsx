import React from 'react';
import { HoneyComb } from './components/HoneyComb';
import { getDailyChallenge, getRandomChallenge } from './api';
import { WordInput } from './components/WordInput';
import { WordsList } from './components/WordsList';

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

const addPointsReward = (reward: number) => {
  const pointsSection = document.getElementById('points-reward');
  const userPoints = document.getElementById('user-points');
  if (pointsSection) {
    const rewardSection = document.createElement('span');
    rewardSection.classList.add('fade-in-1');
    rewardSection.innerText = `+${reward}`;
    pointsSection.replaceChildren(rewardSection);
  }
  if (userPoints) {
    const currentPoints = parseInt(userPoints.innerText);
    userPoints.innerText = (currentPoints + reward).toString();
  }
};

const addErrorToast = (error: string) => {
  const errorToast = document.getElementById('error-toast');
  if (errorToast) {
    const toast = document.createElement('span');
    toast.classList.add('fade-in-2', 'toast');
    toast.innerText = error;
    errorToast.replaceChildren(toast);
  }
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
      return addErrorToast('The word is to short!');
    }
    if (validWords.includes(word)) {
      return addErrorToast('You already found this word!');
    }
    if (!challenge.wordlist.includes(word)) {
      return addErrorToast('This word does not exist!');
    }
    addPointsReward(word.length);
    setTimeout(() => {
      setValidWords((words) => [...words, word]);
      setWord('');
    }, 200);
  };

  return (
    <div className="flex flex-col items-center">
      {/*<div className="caret-amber-500 dummy-caret">d</div>*/}
      <WordsList words={validWords} centerLetter={challenge.center} />
      <WordInput word={word} letters={challenge.letters} center={challenge.center} />
      <HoneyComb
        letters={challenge.letters}
        center={challenge.center}
        onCellClick={handleCellClick}
      />
      <div>
        <span id="user-points">0</span> / 50 points
      </div>
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
