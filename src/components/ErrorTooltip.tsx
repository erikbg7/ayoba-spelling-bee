import React from 'react';
import { atom, useAtom } from 'jotai';

const errorMessageAtom = atom('');

const ErrorTooltip = () => {
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);

  React.useEffect(() => {
    if (!errorMessage) return;
    const removeError = () => setErrorMessage('');
    const timeoutId = setTimeout(removeError, 2000);
    return () => clearTimeout(timeoutId);
  }, [errorMessage]);

  return (
    <div className="absolute right-0 left-0">
      {errorMessage && (
        <div className="bg-gray-600 rounded-xl text-lg text-gray-200 w-fit mx-auto px-3 py-1 fade-in-out">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export { ErrorTooltip };
