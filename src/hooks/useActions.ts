import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { userAsyncThunks } from '../store/slices/user.slice';
import { noteActions } from '../store/slices/note.slice';

const allActions = {
  ...noteActions,
  ...userAsyncThunks,
}

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};