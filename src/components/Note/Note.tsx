import { FC, memo, useState } from 'react';
import cn from 'classnames';
import { marked } from 'marked';
import folderStyles from '../Folder/Folder.module.css';
import styles from './Note.module.css';
import { Modal } from '../Modal/Modal';
import { UpdateNote } from '../UpdateNote/UpdateNote';
import { INote } from '../../interfaces/note.interface';
import { toast } from 'react-toastify';
import { deleteNote } from '../../store/slices/note.slice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Waveform } from '@uiball/loaders';

export const Note: FC<INote> = memo(({ color, content, id, title, created, folderId, updated }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const toggleModal = () => {
    setIsOpen((state) => !state);
  };
  return (
    <li className={cn(folderStyles.folder, {
      [color]: true,
    })}>
      <div className={cn(folderStyles.content, styles.content)}>
        <p className={folderStyles.name}>{title}</p>
        <p className={folderStyles.name} dangerouslySetInnerHTML={{
          __html: marked.parse(content),
        }
        }></p>
      </div>
      <div className={folderStyles.inner}>
        <button className={cn(folderStyles.btn, folderStyles.update)} onClick={(e) => {
          e.stopPropagation();
          toggleModal();
        }}>Редактировать</button>
        <button className={cn(folderStyles.btn, folderStyles.delete)} onClick={(e) => {
          setIsSubmitting(true);
          e.stopPropagation();
          dispatch(deleteNote(id))
            .unwrap()
            .then(() => {
              toast.success('Заметка была удалена успешно.');
            })
            .catch(() => {
              toast.error('Удалить заметку не удалось!');
            })
        }} disabled={isSubmitting}>
          {
            isSubmitting
              ?
              <Waveform size={35} color="#fff" />
              :
              'Удалить'

          }
        </button>
      </div>
      {
        isOpen
          ?
          <Modal>
            <UpdateNote close={toggleModal} note={{
              color, content, id, title, created, folderId, updated
            }} />
          </Modal>
          :
          null
      }
    </li>
  );
});