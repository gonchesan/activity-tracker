import { getAbbreviationDay, pad2Number } from '@/services/date';
import React from 'react';
import Button from './Button';
import './css/react-datepicker.css';
// https://reactdatepicker.com/
import ChevronLeftIcon from '@/assets/icons/chevrons-left.svg?react';
import ChevronRigthIcon from '@/assets/icons/chevrons-right.svg?react';

import useDatePicker from '@/hooks/useDatePicker';
import Calendar from './Calendar';

const DatePicker = ({ openCreateModal }: { openCreateModal: () => void }) => {
  const { setCurrentDate, currentDate, surroundingDates } = useDatePicker();

  // Deberia de tener:
  /**
   * - [X] Si el dia seleccionado es el actual, mostrar "Today"
   * - [X] Si el dia seleccionado NO es el actual, mostrar un boton Go today =>
   *  - [X] En el selector de dia, poder tener un slider
   *    - [X] Mostrar 5 dias y dos botones en los costados
   *  - [X] En el selecor del mes, mostrar January, 2021 ˅
   *    - [X] Mostrar opciones para seleccionar el calendario
   *  - [X] A la misma altura del dropdown mostrar boton [+] para agregar una tarea nueva
   *
   *
   *  Referencias:
   * https://i.pinimg.com/originals/7f/5b/f8/7f5bf89718e199a8c54477181d03b2a0.jpg
   * https://cdn.dribbble.com/users/1828625/screenshots/14991069/media/72390d6312ed9eaa3d12f23bfaa4cdbc.png?resize=1000x750&vertical=center
   */

  function shiftCurrentDate(direction: 'forward' | 'backward') {
    const daysToAdd = direction === 'forward' ? 1 : -1;
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + daysToAdd)));
  }

  return (
    <div className="bg-white inline-block rounded-xl ring-1 ring-slate-300 shadow-sm">
      <aside className="flex items-start justify-between border-b border-b-gray-200 border-solid px-4 pt-3 pb-1">
        <div className="flex flex-col items-start">
          <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} />
        </div>
        <Button appearance="primary" shape="round" size="middle" onClick={openCreateModal}>
          + Add task
        </Button>
      </aside>
      <div>
        <div className="flex items-center">
          <Button
            onClick={() => shiftCurrentDate('backward')}
            shape="round"
            appearance="link"
            icon={<ChevronLeftIcon />}
          />

          {surroundingDates
            ? surroundingDates.map(date =>
                currentDate?.getDate() === date.getDate() ? (
                  <div
                    key={pad2Number(date.getTime())}
                    className="inline-flex items-center gap-x-1.5 px-3 py-2 transition duration-200 flex-col"
                  >
                    <span className="text-gray-900 font-medium text-xs">{getAbbreviationDay(date.getDay())}</span>
                    <span className="w-8 h-8 grid place-content-center rounded-full font-medium bg-teal-600 text-gray-100 ring-gray-300">
                      {date.getDate()}
                    </span>
                  </div>
                ) : (
                  <Button
                    key={pad2Number(date.getTime())}
                    className="flex-col"
                    appearance="text"
                    onClick={() => setCurrentDate(date)}
                  >
                    <span className="text-gray-400 font-medium text-xs">{getAbbreviationDay(date.getDay())}</span>
                    <span className="w-8 h-8 bg-slate-300 grid place-content-center rounded-full font-medium">
                      {date.getDate()}
                    </span>
                  </Button>
                )
              )
            : null}
          <Button
            onClick={() => shiftCurrentDate('forward')}
            shape="round"
            appearance="link"
            icon={<ChevronRigthIcon />}
          />
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
