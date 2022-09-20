import React from 'react';
import clsx from 'clsx';

type Props = {
  center?: boolean;
  letter: string;
  onClick: (letter: string) => void;
  className?: string;
};

const Cell: React.FC<Props> = ({ center = false, letter, onClick, className }) => {
  const [animate, setAnimate] = React.useState<boolean>(false);

  const handleCellClick = () => {
    onClick(letter);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  return (
    <div className={clsx('h-fit w-20 transition-opacity', className)} onClick={handleCellClick}>
      <svg
        className={clsx('hive-cell outer cursor-pointer', animate && 'cell-pulse')}
        viewBox="0 0 120 103.92304845413263"
      >
        <polygon
          className={clsx(center ? 'fill-black' : 'fill-yellow-400')}
          points="0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263"
          stroke="white"
          strokeWidth="7.5"
        ></polygon>
        <text
          className={clsx('anchor-middle text-2xl uppercase font-bold', center && 'fill-white')}
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
