import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IFolder } from '../../interfaces/folder.interface';

type FolderProps = Omit<IFolder, 'id'>;
