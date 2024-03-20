import React from 'react';

const SkeletonCards: React.FC = () => {
  return (
    <ul className="w-full pt-3 pl-8 relative before:h-full before:border-solid before:border before:border-gray-300 before:absolute before:left-4">
      {[...Array(4)].map((_, index) => (
        <li key={index} className="relative">
          <span className="w-8 h-8 bg-gray-200 before:w-2/4 before:h-2/4 before:rounded-full before:absolute before:ring-2 before:ring-inset before:ring-gray-400 absolute z-10 rounded-full left-[-32px] before:left-2 before:top-2 top-0"></span>
          <div className="bg-gray-300 animate-pulse rounded-xl shadow-sm py-2 px-4 md:max-w-72 mb-2 relative h-24" />
        </li>
      ))}
    </ul>
  );
};

export default SkeletonCards;
