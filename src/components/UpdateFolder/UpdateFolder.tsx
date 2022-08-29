import createFolderStyles from '../CreateFolder/CreateFolder.module.css';
import { useUpdateFolderMutation } from '../../services/FolderService';
import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UpdateFolderProps } from './UpdateFolder.props';
import { toast } from 'react-toastify';
import { Ring } from '@uiball/loaders';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import { createFolderSchema } from '../CreateFolder/CreateFolder';

export const UpdateFolder: FC<UpdateFolderProps> = ({ close, folder: { color, id, name } }) => {
  const [updateFolder] = useUpdateFolderMutation();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { register, setFocus, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name,
      color,
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
    const newData = {
      data,
      id
    };
    updateFolder(newData)
      .unwrap()
      .then(() => {
        toast.success('Папка была отредактирована успешно.');
        close();
      })
      .catch(() => {
        toast.error('Отредактировать папку не удалось!');
      });
  };
  return (
    <div className={createFolderStyles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <form className={createFolderStyles.form}>
        <h2 className={createFolderStyles.headling}>Изменение папки</h2>
        <div className={createFolderStyles.field}>
          <label className={createFolderStyles.label} htmlFor="name">Название</label>
          <input className={cn(createFolderStyles.input, {
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
        <div className={createFolderStyles.field}>
          <label className={createFolderStyles.label} htmlFor="username">Цвет</label>
          <select id="color" className={createFolderStyles.select} {...register('color')}>
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
            <button className={createFolderStyles.submit} disabled={isSubmitting}>Изменить</button>

        }
      </form>
      <button className={createFolderStyles.close} onClick={() => close()}>X</button>
    </div>
  );
};