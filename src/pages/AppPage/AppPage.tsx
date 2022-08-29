import Ring from '@uiball/loaders/dist/components/Ring';
import { useEffect } from 'react';
import { FolderList } from '../../components/FolderList/FolderList';
import { NoteList } from '../../components/NoteList/NoteList';
import { getToken, getUser } from '../../helpers/helpers';
import { useGetUserInfoQuery, useLoginMutation, useRefreshTokenQuery } from '../../services/UserService';
import styles from './AppPage.module.css';

export const AppPage = () => {
  const token = getToken();
  const user = getUser();
  const postData: { refreshToken: string } = {
    refreshToken: token.refreshToken,
  };
  const [loginUser] = useLoginMutation();
  const { data: tokenData, isSuccess: isSuccessToken } = useRefreshTokenQuery(postData, {
    pollingInterval: 900000,
  });
  const { data, isLoading } = useGetUserInfoQuery();
  useEffect(() => {
    loginUser(user)
      .unwrap()
      .then((result) => {
        localStorage.setItem('token', JSON.stringify(result));
      });
  }, [])
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