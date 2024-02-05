import React from 'react';

type ButtonShape = ['default', 'circle', 'round'];

type ButtonProps = {
    // type?: ButtonType; // primary | dashed | link | text | default
    icon?: React.ReactNode;
    shape?: ButtonShape;
    // size?: SizeType; large | middle | small
    disabled?: boolean;
    loading?: boolean | { delay?: number };
    className?: string;
    rootClassName?: string;
    ghost?: boolean;
    danger?: boolean;
    block?: boolean;
    children?: React.ReactNode;
    [key: `data-${string}`]: string;
    classNames?: { icon: string };
    styles?: { icon: React.CSSProperties };
};

const Button: React.FC<ButtonProps> = ({ children }) => {
    function handleClick(event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) {
        //@ts-ignore
        const { onClick } = props;
        //@ts-ignore
        if (innerLoading || mergedDisabled) {
            event.preventDefault();
            return;
        }
        (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(event);
    }

    return (
        <button
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

export default Button;
