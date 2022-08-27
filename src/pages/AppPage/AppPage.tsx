import Ring from '@uiball/loaders/dist/components/Ring';
import { FolderList } from '../../components/FolderList/FolderList';
import { NoteList } from '../../components/NoteList/NoteList';
import { getToken } from '../../helpers/helpers';
import { useGetUserInfoQuery } from '../../services/UserService';
import styles from './AppPage.module.css';

export const AppPage = () => {
  const token = getToken();
  const { data, isLoading } = useGetUserInfoQuery(token.accessToken);
  return (
    <main className={styles.wrapper}>
      <div className={styles.userInfo}>
        <p className={styles.info}>Email: {data?.email}</p>
        <p className={styles.info}>Username: {data?.username}</p>
      </div>
      <div className={styles.inner}>
        <FolderList />
        <NoteList />
      </div>
    </main>
  );
};