import { Ring } from '@uiball/loaders'

import { Folder } from '../Folder/Folder';
import styles from './FolderList.module.css';
import { useGetFoldersQuery } from '../../services/FolderService';
import { getToken } from '../../helpers/helpers';

export const FolderList = () => {
  const token = getToken();
  const { data: folders, isLoading } = useGetFoldersQuery(token.accessToken);
  return (
    <div className={styles.folderList}>
      {
        isLoading || folders === undefined
          ?
          <Ring size={35} color="#231F20" />
          :

          <ul className={styles.list}>
            {folders.map((folder) => (
              <Folder key={folder.id} {...folder} />
            ))}
          </ul>
      }
    </div>
  );
};