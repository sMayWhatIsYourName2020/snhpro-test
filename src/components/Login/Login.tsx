import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import cn from 'classnames';
import { Ring } from '@uiball/loaders'
import { ILoginForm } from '../../interfaces/form.interface';
import styles from './Login.module.css';
import { useEffect, useState } from 'react';
import { useLoginMutation } from '../../services/UserService';

const loginSchema = object({
  username: string().required('Поле обязательно к заполнению').trim().max(32, 'Максимальная длина имени: 32 символа'),
  password: string().required('Поле обязательно к заполнению').trim().min(6, 'Не менее 6 символов').max(32, 'Максимальная длина пароля: 32 символа'),
});

export const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loginUser] = useLoginMutation();
  const { register, setFocus, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });
  useEffect(() => {
    setFocus('username');
  });
  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    setIsSubmitting(true);
    loginUser(data)
      .unwrap()
      .then((result) => {
        navigate('/');
        localStorage.setItem('token', JSON.stringify(result));
        localStorage.setItem('user', JSON.stringify(data));
        toast.success('Успешный вход в систему.');
      })
      .catch(() => {
        toast.error('Войти в систему не удалось!');
        setIsSubmitting(false);
      })
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.headling}>Login</h2>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="username">Username</label>
        <input className={cn(styles.input, {
          'border-red': errors.username
        })} type="text" id="username" {...register('username', {
          required: true,
          maxLength: 32,
        })} />
        {
          errors.username
            ?
            <p className='error'>{errors.username.message}</p>
            :
            null
        }
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">Password</label>
        <input className={cn(styles.input, {
          'border-red': errors.password
        })} type="password" id="password" {...register('password', {
          required: true,
          maxLength: 32,
          minLength: 6,
        })} />
        {
          errors.password
            ?
            <p className='error'>{errors.password.message}</p>
            :
            null
        }
      </div>
      {
        isSubmitting
          ?
          <div className='submitInner'>
            <Ring size={35} color="#231F20" />
          </div>
          :
          <button className={styles.btn}>Войти</button>
      }
    </form>
  );
};