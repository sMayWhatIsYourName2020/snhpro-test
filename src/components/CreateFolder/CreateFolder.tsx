import styles from './CreateFolder.module.css';
import { useCreateFolderMutation } from '../../services/FolderService';
import { useState, FC, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Ring } from '@uiball/loaders';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import cn from 'classnames';

export const createFolderSchema = object({
  name: string().required('Поле обязательно к заполнению').trim().max(32, 'Максимальная длина названия: 32 символа'),
});

export const CreateFolder: FC<{ close: () => void }> = ({ close }) => {
  const [createFolder] = useCreateFolderMutation();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { register, setFocus, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      color: 'White',
    },
    resolver: yupResolver(createFolderSchema),
  });
  useEffect(() => {
    setFocus('name');
  });
  const onSubmit: SubmitHandler<{
    name: string;
    color: string;
  }> = (data) => {
    setIsSubmitting(true);
    createFolder(data)
      .unwrap()
      .then(() => {
        toast.success('Папка была создана успешно.');
        close();
      })
      .catch(() => {
        toast.error('Создать папку не удалось!');
      });
  };
  return (
    <div className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <form className={styles.form}>
        <h2 className={styles.headling}>Создание папки</h2>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">Название</label>
          <input className={cn(styles.input, {
            'border-red': errors.name
          })} type="name" id="name" {...register('name', {
            required: true,
            maxLength: 32,
          })} />
          {
            errors.name
              ?
              <p className='error'>{errors.name.message}</p>
              :
              null
          }
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="username">Цвет</label>
          <select id="color" className={styles.select} {...register('color')}>
            <option value="White">White</option>
            <option value="Blue">Blue</option>
            <option value="Orange">Orange</option>
            <option value="Red">Red</option>
            <option value="Yellow">Yellow</option>
            <option value="Purple">Purple</option>
            <option value="Pink">Pink</option>
            <option value="Green">Green</option>
            <option value="Lime">Lime</option>
            <option value="LightGray">LightGray</option>
          </select>
        </div>
        {
          isSubmitting
          ?
            <div className='createSubmit'>
              <Ring size={35} color="#231F20" />
            </div>
          :
            <button className={styles.submit}>Создать</button>
        }
      </form>
      <button className={styles.close} onClick={() => close()}>X</button>
    </div>
  );
};