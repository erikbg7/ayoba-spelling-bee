import React from 'react';
import { Cell } from './Cell';

type Props = {
  letters: string;
  center: string;
  onCellClick: (letter: string) => void;
};

const HoneyComb: React.FC<Props> = ({ letters, center, onCellClick }) => {
  const lettersList = letters.split('');

  if (lettersList.length !== 6) {
    return <> Could not load a proper honeycomb </>;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col">
        <Cell letter={lettersList[0]} onClick={onCellClick} />
        <Cell letter={lettersList[1]} onClick={onCellClick} />
      </div>
      <div className="flex flex-col -mx-4">
        <Cell letter={lettersList[2]} onClick={onCellClick} />
        <Cell center letter={center} onClick={onCellClick} />
        <Cell letter={lettersList[3]} onClick={onCellClick} />
      </div>
      <div className="flex flex-col">
        <Cell letter={lettersList[4]} onClick={onCellClick} />
        <Cell letter={lettersList[5]} onClick={onCellClick} />
      </div>
    </div>
  );
};

export { HoneyComb };
