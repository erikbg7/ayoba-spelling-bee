import React from 'react';
import { Cell } from './Cell';

type Props = {
  letters: string;
  center: string;
};

const HoneyComb: React.FC<Props> = ({ letters, center }) => {
  const lettersList = letters.split('');

  if (lettersList.length !== 6) {
    return <> Could not load a proper honeycomb </>;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col">
        <Cell letter={lettersList[0]} />
        <Cell letter={lettersList[1]} />
      </div>
      <div className="flex flex-col -mx-4">
        <Cell letter={lettersList[2]} />
        <Cell center letter={center} />
        <Cell letter={lettersList[3]} />
      </div>
      <div className="flex flex-col">
        <Cell letter={lettersList[4]} />
        <Cell letter={lettersList[5]} />
      </div>
    </div>
  );
};

export { HoneyComb };
