import { FolderList } from '../../components/FolderList/FolderList';
import { NoteList } from '../../components/NoteList/NoteList';
import { getToken} from '../../helpers/helpers';
import { useGetUserInfoQuery,  useRefreshTokenQuery } from '../../services/UserService';
import styles from './AppPage.module.css';

export const AppPage = () => {
  const token = getToken();
  const postData: { refreshToken: string } = {
    refreshToken: token.refreshToken,
  };
  const { data: tokenData, isSuccess: isSuccessToken } = useRefreshTokenQuery(postData, {
    pollingInterval: 900000,
  });
  const { data} = useGetUserInfoQuery();
  if (isSuccessToken) {
    localStorage.setItem('token', JSON.stringify(tokenData));
  }
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