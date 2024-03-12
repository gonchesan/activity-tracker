import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import useMountTransition from '@/hooks/useMountTransition';

import { createPortalRoot } from '@/services/utils';
import Button from '@/components/ui/Button';

type DrawerProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  className?: string;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  footer?: null;
  confirmButton?: null;
  cancelButton?: null;
};

const Drawer: React.FC<DrawerProps> = ({
  children,
  isOpen,
  onClose,
  onCancel,
  onConfirm,
  className,
  title,
  confirmText = 'OK',
  cancelText = 'Cancel',
  footer,
  cancelButton,
  confirmButton,
}) => {
  const bodyRef = React.useRef(document.querySelector('body'));
  const portalRootRef = React.useRef(document.getElementById('portal-root') || createPortalRoot());
  const isTransitioning = useMountTransition(isOpen, 300);

  // Append portal root on mount
  React.useEffect(() => {
    bodyRef.current!.appendChild(portalRootRef.current);
    const portal = portalRootRef.current;
    portal.classList.add('flex');
    const bodyEl = bodyRef.current;

    return () => {
      portal.remove();

      bodyEl!.style.overflow = '';
    };
  }, []);

  // Prevent page scrolling when the drawer is open
  React.useEffect(() => {
    const updatePageScroll = () => {
      if (isOpen) {
        bodyRef.current!.style.overflow = 'hidden';
      } else {
        bodyRef.current!.style.overflow = '';
      }
    };

    updatePageScroll();
  }, [isOpen]);

  React.useEffect(() => {
    function onKeyPress(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      window.addEventListener('keypress', onKeyPress);
    }

    return () => {
      window.removeEventListener('keypress', onKeyPress);
    };
  }, [isOpen, onClose]);

  if (!isTransitioning && !isOpen) {
    return null;
  }

  return createPortal(
    <React.Fragment>
      {/* //? modal wrapper/mask */}
      <div className="fixed inset-0 flex  transition-opacity z-40">
        <div className="absolute inset-0 bg-black opacity-40" />
        {/* //? modal card */}
        <div
          className={`relative opacity-0 rounded-2xl rounded-b-none inline-block mx-1 mt-auto ${
            isOpen && isTransitioning ? 'translate-y-0 opacity-100' : 'translate-y-[100%]'
          } 
                ${isTransitioning && 'translate-y-0 '} 
                transition-[transform, opacity] duration-300 motion-reduce:transition-none bg-slate-50 pt-8  ${
                  className && className
                }`}
        >
          <Button
            className="absolute after:content-['\00d7'] text-slate-600 size-8 right-5 top-2 bg-transparent hover:bg-gray-200 hover:text-slate-600 transition duration-150"
            appearance="text"
            shape="circle"
            size="large"
            onClick={onClose}
          />
          {/* //? modal header */}
          {title ? (
            <div className="px-6">
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            </div>
          ) : null}
          {/* //? modal body */}
          <div className="mb-6 px-6">{children}</div>
          {/* //? modal footer */}
          {footer === null ? null : (
            <div className="flex gap-4 pt-2 pb-3 px-6 border-solid border-t-2 border-gray-100">
              {cancelButton === null ? null : (
                <Button onClick={onCancel} appearance="secondary" shape="round" block>
                  {cancelText}
                </Button>
              )}
              {confirmButton === null ? null : (
                <Button onClick={onConfirm} appearance="primary" shape="round" block>
                  {confirmText}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>,
    portalRootRef.current
  );
};

export default Drawer;
