import { Folder } from '../Folder/Folder';
import styles from './FolderList.module.css';
import { useGetFoldersQuery } from '../../services/FolderService';
import { useState } from 'react';
import { CreateFolder } from '../CreateFolder/CreateFolder';
import { Modal } from '../Modal/Modal';

export const FolderList = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleModal = () => {
    setIsOpen((state) => !state);
  }
  const { data: folders } = useGetFoldersQuery();
  return (
    <div className={styles.folderList}>
      <ul className={styles.list}>
        {folders !== undefined
        ?
        folders.map((folder) => (
          <Folder key={folder.id} {...folder} />
        ))
        :
        null
      }
      </ul>
      <button className={styles.create} onClick={toggleModal} >
        <span className={styles.text}>Создать папку</span>
      </button>
      {
        isOpen
          ?
          <Modal>
            <CreateFolder close={toggleModal} />
          </Modal>
          :
          null
      }
    </div>
  );
};