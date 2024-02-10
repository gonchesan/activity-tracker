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
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        open={openDropdown}
      >
        <div className="py-1 inline-flex flex-col w-full" role="none">
          {menu.map((item, index) => {
            const { key, label, onClick } = item;
            return (
              <Button
                key={key || index}
                fontWeigth="normal"
                alignItems="start"
                onClick={onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>}
              >
                {label}
              </Button>
            );
          })}
        </div>
      </dialog>
    </div>
  );
};

export default Dropdown;
