import React from 'react';
import ActivityCard from '@/components/activities/ActivityCard';
import { Activity } from '@/models/activity';

type TimeLineType = {
  bulletPoints: Activity[];
};

const TimeLine: React.FC<TimeLineType> = ({ bulletPoints }) => {
  return (
    <ul className="w-full pt-3 pl-8 relative before:h-full before:border-solid before:border before:border-gray-300 before:absolute before:left-4">
      {bulletPoints.map(activity => (
        <li key={activity.id} className="relative">
          <span className="w-8 h-8 bg-gray-200 before:w-2/4 before:h-2/4 before:rounded-full before:absolute before:ring-2 before:ring-inset before:ring-gray-400 absolute z-10 rounded-full left-[-32px] before:left-2 before:top-2 top-0"></span>
          <ActivityCard activity={activity} />
        </li>
      ))}
    </ul>
  );
};

export default TimeLine;
