import { Ring } from '@uiball/loaders'

import styles from './NoteList.module.css';
import { folderAPI } from '../../services/FolderService';
import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../../store';
import { useEffect, useState } from 'react';
import { INote } from '../../interfaces/note.interface';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export const NoteList = () => {
  const data = useTypedSelector((state) => state.folderApi);
  return (
    <div className={styles.folderList}>
      <ul className={styles.list}>
        {/* {notes.map(({ id, ...props }) => (
          <div></div>
        ))} */}
      </ul>
    </div>
  );
};