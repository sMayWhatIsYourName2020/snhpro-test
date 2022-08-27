import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ILoginForm } from '../../interfaces/form.interface';

import styles from './Login.module.css';
import { ErrorInfo, useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useLoginMutation } from '../../services/UserService';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useLocalStorage('token', {});
  const [loginUser, { isSuccess: isLoginSuccess, isError, error, data }] = useLoginMutation();
  const { register, setFocus, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
    }
  });
  useEffect(() => {
    setFocus('username');
  });
  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    loginUser(data)
      .unwrap()
      .then((data) => {
        navigate('/');
        console.log(data);
        localStorage.setItem('token', JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
      })
  };
  if (isError && error) {
    console.log(error);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.headling}>Login</h2>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="username">Username</label>
        <input className={styles.input} type="text" id="username" {...register('username', {
          required: true,
          maxLength: 32,
        })} />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">Password</label>
        <input className={styles.input} type="password" id="password" {...register('password', {
          required: true,
          maxLength: 32,
          minLength: 6,
        })} />
      </div>
      <button className={styles.btn}>Войти</button>
    </form>
  );
};