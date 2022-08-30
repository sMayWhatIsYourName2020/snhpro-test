import { FC } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

export const Modal: FC<{ children: JSX.Element }> = ({ children }) => {
  const height = Math.max(document.body.scrollHeight, document.body.offsetHeight);
  return createPortal(
    <div style={{
      'minHeight': `${height}px`,
      'backgroundColor': '#fff',
    }} className={styles.wrapper}>
      {children}
    </div>,
    document.getElementById("modal")!
  );
};