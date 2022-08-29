import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { notesAsyncThunks, notesActions } from '../store/slices/note.slice';

const allActions = {
  ...notesAsyncThunks,
  ...notesActions,
}

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};