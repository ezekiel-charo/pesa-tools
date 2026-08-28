import { type ReactElement, type ReactNode } from 'react';

interface DropdownProps {
  opened: boolean;
  children: ReactNode;
  content?: ReactElement;
  onClose: (f: false) => void;
}

export default function Dropdown({
  opened,
  onClose,
  children,
  content,
}: DropdownProps) {
  if (opened) {
    return (
      <>
        <div className="relative">
          {children}
          <div className="fixed left-2 right-2 lg:absolute lg:left-[unset] lg:right-0 bg-white shadow rounded-md z-50">
            {content}
          </div>
        </div>
        <div
          onClick={() => onClose(false)}
          className="fixed bg-black opacity-10 top-0 bottom-0 left-0 right-0"
        />
      </>
    );
  }

  return children;
}
