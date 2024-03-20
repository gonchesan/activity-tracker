import React from 'react';
import Button, { ButtonType } from './Button';

import ChevronIcon from '@/assets/icons/chevron.svg?react';
import { isChildOf } from '@/services/utils';

export type ItemMenu = {
  key?: React.Key;
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type DropdownType = {
  button?: ButtonType;
  menu: ItemMenu[];
};

const Dropdown: React.FC<DropdownType> = ({ button, menu }) => {
  const [openDropdown, setOpenDropdown] = React.useState(false);

  const buttonId = React.useId();

  const dialogRef = React.useRef<null | HTMLDialogElement>(null);

  React.useEffect(() => {
    /**
     * check if the element is outside of the zone clicked
     *
     * @param {MouseEvent} event
     * @return boolean
     */
    function isOutside(event: MouseEvent) {
      const { target } = event;
      const button = document.getElementById(buttonId);

      return target !== button && !isChildOf(target as HTMLElement, button as HTMLElement);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && event.target instanceof Node) {
        if (isOutside(event)) {
          setOpenDropdown(false);
        }
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [openDropdown]);

  return (
    <div className="relative inline-block text-left">
      <div>
        <Button
          type="button"
          className={button?.className}
          appearance={button?.appearance}
          shape={button?.shape}
          id={buttonId}
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          {button?.icon ? (
            button?.icon
          ) : (
            <>
              Options
              <ChevronIcon />
            </>
          )}
        </Button>
      </div>

      <dialog
        ref={dialogRef}
        className="absolute left-[-9rem] z-40 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        open={openDropdown}
      >
        <ul className="py-1 inline-flex flex-col w-full divide-y divide-gray-100">
          {menu.map((item, index) => {
            const { key, label, onClick } = item;
            return (
              <li key={key || index}>
                <Button
                  fontWeigth="normal"
                  alignItems="start"
                  appearance="text"
                  block
                  className="hover:bg-gray-100"
                  onClick={onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>}
                >
                  {label}
                </Button>
              </li>
            );
          })}
        </ul>
      </dialog>
    </div>
  );
};

export default Dropdown;
