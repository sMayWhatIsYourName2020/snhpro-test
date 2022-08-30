import { INote } from '../../interfaces/note.interface';

export interface UpdateNoteProps {
  close: (modal: 'transfer' | 'update') => void;
  note: INote;
}