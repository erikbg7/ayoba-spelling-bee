import React from 'react';
import { atom, useAtom } from 'jotai';

const userPointsAtom = atom(0);

const UserPoints = () => {
  const [userPoints] = useAtom(userPointsAtom);

  return (
    <div>
      <span>{userPoints}</span> / 50 points
    </div>
  );
};

export { UserPoints, userPointsAtom };
