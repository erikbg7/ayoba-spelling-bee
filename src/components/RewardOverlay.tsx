import React from 'react';
import { atom, useAtom } from 'jotai';

const rewardAtom = atom(0);

const RewardOverlay = () => {
  const [reward, setReward] = useAtom(rewardAtom);

  React.useEffect(() => {
    if (reward !== 0) {
      const clearReward = () => setReward(0);
      const timeoutId = setTimeout(clearReward, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [reward]);

  return (
    <div className="absolute right-0 left-0 -top-6">
      {!!reward && <span className="text-amber-300 text-6xl font-bold fade-in-out">+{reward}</span>}
    </div>
  );
};
export { RewardOverlay, rewardAtom };
