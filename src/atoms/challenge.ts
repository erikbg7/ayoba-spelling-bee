import { atom } from 'jotai';
import { focusAtom } from 'jotai/optics';

interface Challenge {
  letters: string;
  center: string;
  wordlist: string[];
}

const challengeAtom = atom<Challenge>({
  letters: '',
  center: '',
  wordlist: [],
});

const lettersAtom = focusAtom(challengeAtom, (optic) => optic.prop('letters'));
const centerLetterAtom = focusAtom(challengeAtom, (optic) => optic.prop('center'));
const wordListAtom = focusAtom(challengeAtom, (optic) => optic.prop('wordlist'));

export { challengeAtom, lettersAtom, centerLetterAtom, wordListAtom };
