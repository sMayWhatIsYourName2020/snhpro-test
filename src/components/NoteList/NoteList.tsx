import folderListStyles from '../FolderList/FolderList.module.css';
import styles from './NoteList.module.css';
import { useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import cn from 'classnames';
import { Note } from '../Note/Note';
import { Modal } from '../Modal/Modal';
import { CreateNote } from '../CreateNote/CreateNote';

export const NoteList = () => {
  const { currentFolder, notes } = useTypedSelector((state) => state.noteReducer);
  const filteredNotes = notes.filter((note) => note.folderId === currentFolder);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleModal = () => {
    setIsOpen((state) => !state);
  }
  return (
    <div className={cn(folderListStyles.folderList, styles.notes)}>
      <ul className={folderListStyles.list}>
        {filteredNotes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </ul>
      {
        currentFolder === ''
        ?
        null
        :
          <button className={cn(folderListStyles.create)} onClick={toggleModal} >
            <span className={folderListStyles.text}>Создать заметку</span>
          </button>
      }
      {
        isOpen
          ?
          <Modal>
            <CreateNote close={toggleModal} />
          </Modal>
          :
          null
      }
    </div>
  );
};