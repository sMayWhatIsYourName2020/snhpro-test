import { IFolder } from '../../interfaces/folder.interface';

export interface UpdateFolderProps {
  close: () => void;
  folder: Omit<IFolder, 'notesCount'>;
}