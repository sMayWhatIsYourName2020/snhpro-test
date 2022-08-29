import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IRegisterForm } from '../../interfaces/form.interface';

import styles from '../Login/Login.module.css';
import { useEffect, useState } from 'react';
import { useRegisterMutation } from '../../services/UserService';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import cn from 'classnames';
import { Ring } from '@uiball/loaders';

const registerSchema = object({
  username: string().required('Поле обязательно к заполнению').trim().max(32, 'Максимальная длина имени: 32 символа'),
  email: string().email('Введите Email').trim().required('Поле обязательно к заполнению').trim(),
  password: string().required('Поле обязательно к заполнению').trim().min(6, 'Не менее 6 символов').max(32, 'Максимальная длина пароля: 32 символа'),
});

export const Register = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { register, setFocus, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },
    resolver: yupResolver(registerSchema),
  });
  console.log(errors);
  useEffect(() => {
    setFocus('email');
  });
  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    setIsSubmitting(true);
    registerUser(data)
      .unwrap()
      .then((token) => {
        navigate('/');
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(data));
        toast.success('Успешная регистрация пользователя.');
      })
      .catch(() => {
        toast.success('Зарегистрироваться в системе не удалось!');
      });
  };
  return (
    <form noValidate className={styles.loginWrapper} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.headling}>Register</h2>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">Email</label>
        <input className={cn(styles.input, {
          'border-red': errors.email
        })} type="email" id="email" {...register('email', {
          required: true,
        })} />
        {
          errors.email
            ?
            <p className='error'>{errors.email.message}</p>
            :
            null
        }
      </div>
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
        <div className={styles.submitInner}>
            <Ring size={35} color="#231F20" />
          </div>
          :
          <button className={styles.btnReg}>Зарегистрироваться</button>
      }
    </form>
  );
};