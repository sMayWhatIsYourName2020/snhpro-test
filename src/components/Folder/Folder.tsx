import { FC, useState } from 'react';
import cn from 'classnames';
import { IFolder } from '../../interfaces/folder.interface';
import styles from './Folder.module.css';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDeleteFolderMutation } from '../../services/FolderService';
import { Modal } from '../Modal/Modal';
import { UpdateFolder } from '../UpdateFolder/UpdateFolder';
import { toast } from 'react-toastify';
import { Waveform } from '@uiball/loaders';

export const Folder: FC<IFolder> = ({ name, color, id }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleModal = () => {
    setIsOpen((state) => !state);
  };
  const { getNotes, setCurrentFolder } = useActions();
  const [deleteFolder] = useDeleteFolderMutation();
  const folders = useTypedSelector((state) => state.noteReducer.folderIds);
  return (
    <li className={cn(styles.folder, {
      [color]: true,
    })}>
      <div className={styles.content} onClick={() => {
        if (folders.includes(id)) {
          setCurrentFolder(id);
        } else {
          getNotes(id);
        }
      }}>
        <p className={styles.name}>{name}</p>
      </div>
      <div className={styles.inner}>
        <button className={cn(styles.btn, styles.update)} onClick={(e) => {
          e.stopPropagation();
          toggleModal();
        }}>Редактировать</button>
        <button className={cn(styles.btn, styles.delete)} onClick={(e) => {
          setIsSubmitting(true);
          e.stopPropagation();
          deleteFolder(id)
            .unwrap()
            .then(() => {
              toast.success('Папка была удалена успешно.');
            })
            .catch(() => {
              toast.error('Удалить папку не удалось!');
            });
        }}>
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
            <UpdateFolder folder={{
              color,
              name,
              id
            }} close={toggleModal} />
          </Modal>
          :
          null
      }
    </li>
  );
};