import { atom } from 'jotai';
import { focusAtom } from 'jotai/optics';

interface User {
  reward: number;
  totalPoints: number;
  userWords: string[];
}

const userAtom = atom<User>({
  reward: 0,
  totalPoints: 0,
  userWords: [],
});

const rewardAtom = focusAtom(userAtom, (optic) => optic.prop('reward'));
const totalPointsAtom = focusAtom(userAtom, (optic) => optic.prop('totalPoints'));
const userWordsAtom = focusAtom(userAtom, (optic) => optic.prop('userWords'));

export { userAtom, rewardAtom, userWordsAtom, totalPointsAtom };
