import { Ring } from '@uiball/loaders';
import { useLoginMutation } from '../../services/UserService';
import { useEffect } from 'react';
import { getUser } from '../../helpers/helpers';
import { AppPage } from '../../pages/AppPage/AppPage';

export const Wrapper = () => {
  const user = getUser();
  const [loginUser, { isSuccess, data }] = useLoginMutation();
  useEffect(() => {
    loginUser(user);
  }, []);
  if (isSuccess) {
    localStorage.setItem('token', JSON.stringify(data));
  }
  return (
    isSuccess
      ?
      <AppPage />
      :
      <div className="wrapper">
        <Ring size={75} color="#231F20" />
      </div>
  );
};