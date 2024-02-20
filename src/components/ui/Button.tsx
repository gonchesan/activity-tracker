import React from 'react';
import classnames from 'classnames';

import Spinner from '@/assets/icons/spinner.svg?react';

export type ButtonShape = 'default' | 'circle' | 'round';
export type ButtonAppearance = 'primary' | 'secondary' | 'link' | 'text' | 'default';
type ButtonSize = 'large' | 'middle' | 'small';
type ButtonWeigth = 'bold' | 'default' | 'normal';
type ButtonAlign = 'center' | 'start' | 'end';
export interface ButtonType extends React.ComponentProps<'button'> {
  icon?: React.ReactNode;
  shape?: ButtonShape;
  block?: boolean;
  appearance?: ButtonAppearance;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
  size?: ButtonSize;
  fontWeigth?: ButtonWeigth;
  alignItems?: ButtonAlign;
}

const Button: React.FC<ButtonType> = ({
  children,
  block,
  shape = 'default',
  onClick,
  className,
  disabled,
  icon,
  appearance = 'default',
  loading,
  size = 'middle',
  fontWeigth = 'default',
  alignItems = 'center',
  ...props
}) => {
  function handleClick(event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(event);
  }

  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={buttonRef}
      {...props}
      className={classnames(
        'inline-flex  items-center gap-x-1.5 ring-1 ring-inset transition duration-200',
        { 'w-full': block },
        //@ shapes
        { 'rounded-none': shape === 'default' },
        { 'rounded-md': shape === 'round' },
        { 'rounded-full': shape === 'circle' },
        //@ className by hand
        [className].join(' '),
        //@ disabled
        { 'disabled:bg-gray-300': disabled || loading },
        { 'disabled:text-gray-400': disabled || loading },
        { 'disabled:cursor-not-allowed': disabled || loading },
        //@ appearance
        { 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50 shadow-sm': appearance === 'default' },
        { 'bg-teal-600 text-gray-100 ring-gray-300 hover:bg-teal-500 shadow-sm': appearance === 'primary' },
        { 'bg-gray-900 text-gray-100 ring-transparent hover:bg-gray-800 shadow-sm': appearance === 'secondary' },
        { 'bg-transparent text-teal-600 ring-transparent hover:text-teal-500': appearance === 'link' },
        { 'bg-transparent text-gray-900 ring-transparent': appearance === 'text' },
        //@ sizes
        { 'px-2 py-1.5 text-xs': size === 'small' && shape !== 'circle' },
        { 'px-3 py-2 text-sm': size === 'middle' && shape !== 'circle' },
        { 'px-4 py-2 text-lg': size === 'large' && shape !== 'circle' },
        //@ fontWeigth
        { 'font-semibold': fontWeigth == 'default' },
        { 'font-normal': fontWeigth == 'normal' },
        { 'font-bold': fontWeigth == 'bold' },
        { 'justify-center': alignItems == 'center' },
        { 'justify-start': alignItems == 'start' },
        { 'justify-end': alignItems == 'end' }
      )}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {loading ? <Spinner /> : null}
      {icon && !loading ? icon : null}
      {children}
    </button>
  );
};

export default Button;
