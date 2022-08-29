import { FC } from 'react';
import { createPortal } from 'react-dom';

export const Modal: FC<{ children: JSX.Element }> = ({ children }) => {
  const height = window.outerHeight;
  return createPortal(
    <div style={{
      'minHeight': `${height}px`,
      'backgroundColor': '#fff',
      'width': '1000px',
    }}>
      {children}
    </div>,
    document.getElementById("modal")!
  );
};