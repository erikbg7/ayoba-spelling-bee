import React from 'react';
import { useAtomValue } from 'jotai';
import { totalPointsAtom } from '../atoms/user';

const UserPoints = () => {
  const userPoints = useAtomValue(totalPointsAtom);

  return (
    <div>
      <span>{userPoints}</span> / 50 points
    </div>
  );
};

export { UserPoints };
