import { INote } from '../../interfaces/note.interface';

export interface UpdateNoteProps {
  close: () => void;
  note: INote;
}