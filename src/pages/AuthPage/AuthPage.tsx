import styles from './AuthPage.module.css';
import { useState } from 'react';
import { Login } from '../../components/Login/Login';
import { Register } from '../../components/Register/Register';


export const AuthPage = () => {
  const [currentForm, setCurrentForm] = useState<'login' | 'register'>('login');
  return (
    <div className={styles.wrapper}>
      <div className={styles.toggleWrapper}>
        <button className={styles.toggle} onClick={() => setCurrentForm('login')}>Войти</button>
        <button className={styles.toggle} onClick={() => setCurrentForm('register')}>Зарегистрироваться</button>
      </div>
      {
        currentForm === 'login'
          ?
          <Login />
          :
          <Register />
      }
    </div>
  );
};