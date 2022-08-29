import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { userAsyncThunks } from '../store/slices/user.slice';
import { notesAsyncThunks, notesActions } from '../store/slices/note.slice';

const allActions = {
  ...notesAsyncThunks,
  ...userAsyncThunks,
  ...notesActions,
}

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};