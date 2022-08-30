import createFolderStyles from '../CreateFolder/CreateFolder.module.css';
import updateNoteStyles from '../UpdateNote/UpdateNote.module.css';
import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { toast } from 'react-toastify';
import { transferNote } from '../../store/slices/note.slice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import cn from 'classnames';
import { Ring } from '@uiball/loaders';

export const TransferNote: FC<{ close: (modal: 'transfer' | 'update') => void, id: string }> = ({ close, id }) => {
  const { currentFolder: folderId, folders } = useTypedSelector((state) => state.noteReducer);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const currentFolder = folders.find((folder) => folder.id === folderId);
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      folderId: currentFolder === undefined ? '' : currentFolder.name,
    },
  });
  const onSubmit: SubmitHandler<{
    folderId: string;
  }> = ({ folderId }) => {
    setIsSubmitting(true);
    const newData = {
      folderId,
      noteId: id,
    };
    dispatch(transferNote(newData))
      .unwrap()
      .then(() => {
        toast.success('Заметка была перемещена успешно.');
        close('transfer');
      })
      .catch(() => {
        toast.error('Переместить заметку не удалось!');
      });
  };
  return (
    <div className={cn(createFolderStyles.wrapper, updateNoteStyles.wrapper)} onSubmit={handleSubmit(onSubmit)}>
      <form className={cn(createFolderStyles.form, updateNoteStyles.form)}>
        <h2 className={createFolderStyles.headling}>Перемещение заметки</h2>
        <div className={createFolderStyles.field}>
          <label className={createFolderStyles.label} htmlFor="folderId">Папка</label>
          <select id="folderId" className={createFolderStyles.select} {...register('folderId')}>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>{folder.name}</option>
            ))}
          </select>
        </div>
        {
          isSubmitting
            ?
            <div className='createSubmit'>
              <Ring size={35} color="#231F20" />
            </div>
            :
            <button className={createFolderStyles.submit}>Переместить</button>
        }
      </form>
      <button className={createFolderStyles.close} onClick={() => close('transfer')}>X</button>
    </div>
  );
};