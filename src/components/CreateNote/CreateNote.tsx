import createFolderStyles from '../CreateFolder/CreateFolder.module.css';
import updateNoteStyles from '../UpdateNote/UpdateNote.module.css';
import { getToken } from '../../helpers/helpers';
import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { toast } from 'react-toastify';
import { createNote } from '../../store/slices/note.slice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import cn from 'classnames';
import { Ring } from '@uiball/loaders';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

export const createNoteSchema = object({
  title: string().required('Поле обязательно к заполнению').trim().max(32, 'Максимальная длина названия: 32 символа'),
  content: string().required('Поле обязательно к заполнению').trim().max(256, 'Максимальная длина контента 256 символов'),
});

export const CreateNote: FC<{ close: () => void }> = ({ close }) => {
  const { currentFolder: folderId } = useTypedSelector((state) => state.noteReducer);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const token = getToken();
  const { register, setFocus, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      content: '',
      color: 'White',
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
      id: folderId,
      token: token.accessToken,
    };
    dispatch(createNote(newData))
      .unwrap()
      .then(() => {
        toast.success('Заметка была создана успешно.');
        close();
      })
      .catch(() => {
        toast.error('Создать заметку не удалось!');
      });
  };
  return (
    <div className={cn(createFolderStyles.wrapper, updateNoteStyles.wrapper)} onSubmit={handleSubmit(onSubmit)}>
      <form className={cn(createFolderStyles.form, updateNoteStyles.form)}>
        <h2 className={createFolderStyles.headling}>Создание заметки</h2>
        <div className={createFolderStyles.field}>
          <label className={createFolderStyles.label} htmlFor="name">Заголовок</label>
          <input className={cn(createFolderStyles.input, {
            'border-red': errors.title
          })} type="name" id="name" {...register('title', {
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
          <textarea spellCheck={false} className={cn(updateNoteStyles.textArea, {
            'border-red': errors.content
          })} {...register('content', {
            required: true,
            maxLength: 256
          })} />
          {
            errors.content
              ?
              <p className='error'>{errors.content.message}</p>
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
            <button className={createFolderStyles.submit}>Создать</button>

        }
      </form>
      <button className={createFolderStyles.close} onClick={() => close()}>X</button>
    </div>
  );
};