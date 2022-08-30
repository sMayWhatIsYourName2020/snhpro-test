import createFolderStyles from '../CreateFolder/CreateFolder.module.css';
import styles from './UpdateNote.module.css';
import { getToken } from '../../helpers/helpers';
import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UpdateNoteProps } from './UpdateNote.props';
import { toast } from 'react-toastify';
import { updateNote } from '../../store/slices/note.slice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import cn from 'classnames';
import { Ring } from '@uiball/loaders';
import { yupResolver } from '@hookform/resolvers/yup';
import { createNoteSchema } from '../CreateNote/CreateNote';

export const UpdateNote: FC<UpdateNoteProps> = ({ close, note: { color, id, title, content } }) => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const token = getToken();
  const { register, setFocus, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title,
      content,
      color,
    },
    resolver: yupResolver(createNoteSchema),
  });
  useEffect(() => {
    setFocus('title');
  });
  const onSubmit: SubmitHandler<{
    title: string;
    content: string;
    color: string;
  }> = (data) => {
    setIsSubmitting(true);
    const newData = {
      ...data,
      token: token.accessToken,
      id
    };
    dispatch(updateNote(newData))
      .unwrap()
      .then(() => {
        toast.success('Заметка была отредактирована успешно.');
        close('update');
      })
      .catch(() => {
        toast.error('Отредактировать заметку не удалось!');
      });
  };
  return (
    <div className={cn(createFolderStyles.wrapper, styles.wrapper)} onSubmit={handleSubmit(onSubmit)}>
      <form className={cn(createFolderStyles.form, styles.form)}>
        <h2 className={createFolderStyles.headling}>Изменение заметки</h2>
        <div className={createFolderStyles.field}>
          <label className={createFolderStyles.label} htmlFor="name">Заголовок</label>
          <input className={createFolderStyles.input} type="name" id="name" {...register('title', {
            required: true,
            maxLength: 32,
          })} />
          {
            errors.title
              ?
              <p className='error'>{errors.title.message}</p>
              :
              null
          }
        </div>
        <div className={createFolderStyles.field}>
          <label className={createFolderStyles.label} htmlFor="name">Контент</label>
          <textarea spellCheck={false} className={cn(styles.textArea, {
            'border-red': errors.content
          })} {...register('content', {
            required: true,
            maxLength: 256
          })} />
        </div>
        {
          errors.content
            ?
            <p className='error'>{errors.content.message}</p>
            :
            null
        }
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
      <button className={createFolderStyles.close} onClick={() => close('transfer')}>X</button>
    </div>
  );
};