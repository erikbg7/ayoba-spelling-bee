import React from 'react';

interface Props {
  onDelete: () => void;
  onSubmit: () => void;
}

const UserActions: React.FC<Props> = ({ onDelete, onSubmit }) => {
  return (
    <div className="inline-flex my-6">
      <button
        onClick={onDelete}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-l cursor-none sm:cursor-pointer"
      >
        Delete
      </button>
      <button
        onClick={onSubmit}
        className="bg-amber-300 hover:bg-amber-400 text-gray-800 font-bold py-2 px-6 rounded-r cursor-none sm:cursor-pointer"
      >
        Submit
      </button>
    </div>
  );
};

export { UserActions };
