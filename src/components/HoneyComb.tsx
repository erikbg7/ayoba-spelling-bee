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
    <div className="flex items-center justify-center m-3">
      <div className="flex flex-col">
        <Cell className="show-200" letter={lettersList[0]} onClick={onCellClick} />
        <Cell className="show-150" letter={lettersList[1]} onClick={onCellClick} />
      </div>
      <div className="flex flex-col -mx-4">
        <Cell className="show-250" letter={lettersList[2]} onClick={onCellClick} />
        <Cell className="show-100" center letter={center} onClick={onCellClick} />
        <Cell className="show-400" letter={lettersList[3]} onClick={onCellClick} />
      </div>
      <div className="flex flex-col">
        <Cell className="show-300" letter={lettersList[4]} onClick={onCellClick} />
        <Cell className="show-350" letter={lettersList[5]} onClick={onCellClick} />
      </div>
    </div>
  );
};

export { HoneyComb };
