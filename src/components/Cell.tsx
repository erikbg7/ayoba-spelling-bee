import React from 'react';
import clsx from 'clsx';

type Props = {
  center?: boolean;
  letter: string;
};

const Cell: React.FC<Props> = ({ center = false, letter }) => {
  return (
    <div className="h-fit w-20">
      <svg className="hive-cell outer" viewBox="0 0 120 103.92304845413263">
        <polygon
          className={clsx('cell-fill fill-yellow-500', center && 'fill-black')}
          points="0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263"
          stroke="white"
          strokeWidth="7.5"
        ></polygon>
        <text
          className={clsx('anchor-middle text-lg uppercase font-bold', center && 'fill-white')}
          x="50%"
          y="50%"
          dy="0.35em"
        >
          {letter}
        </text>
      </svg>
    </div>
  );
};

export { Cell };
