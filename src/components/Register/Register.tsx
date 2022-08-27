import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IRegisterForm } from '../../interfaces/form.interface';

import styles from '../Login/Login.module.css';
import { useEffect } from 'react';
import { useRegisterMutation } from '../../services/UserService';

export const Register = () => {
  const navigate = useNavigate();
  const [registerUser, { isSuccess: isRegisterSuccess, isError, error, data }] = useRegisterMutation();
  const { register, setFocus, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
    }
  });
  useEffect(() => {
    setFocus('email');
  });
  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    registerUser(data)
      .unwrap()
      .then((data) => {
        navigate('/');
        localStorage.setItem('token', JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
      })
  };
  return (
    <form className={styles.loginWrapper} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.headling}>Register</h2>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">Email</label>
        <input className={styles.input} type="email" id="email" {...register('email', {
          required: true,
        })} />
      </div>
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
      <button className={styles.btnReg}>Зарегистрироваться</button>
    </form>
  );
};