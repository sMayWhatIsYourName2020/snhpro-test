import { FC } from 'react';
import { IFolder } from '../../interfaces/folder.interface';
// import { useGetNotesQuery } from '../../services/FolderService';
import styles from './Folder.module.css';

export const Folder: FC<IFolder> = ({ name, notesCount, color, id }) => {
  
  return (
    // <li className={styles.folder} onClick={() => useGetNotesQuery(id)}>
    <li className={styles.folder} onClick={() => console.log(id)}>
      {name}
      {notesCount}
      {color}
    </li>
  );
};