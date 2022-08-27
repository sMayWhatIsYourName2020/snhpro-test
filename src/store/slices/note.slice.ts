import axios from 'axios';
import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import routes from '../../routes';
import { INote } from '../../interfaces/note.interface';
import { getToken } from '../../helpers/helpers';

interface IResponse {
  id: string;
  title: string;
  content: string;
  color: string;
}

export const getNotes = createAsyncThunk(
  'note/fetch',
  async (id: string) => {
    const token = getToken();
    const notes = await axios.get(routes.getOrCreateNotes(id), {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      }
    });
    return notes.data;
  },
);

export const createNote = createAsyncThunk(
  'note/create',
  async ({ id, ...data }: IResponse) => {
    const token = getToken()
    const notes = await axios.post(routes.getOrCreateNotes(id), data,
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      });
    return notes.data;
  },
);

export const deleteNote = createAsyncThunk(
  'note/delete',
  async (id: string) => {
    const token = getToken();
    const notes = await axios.delete(routes.updateOrDeleteNote(id), {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      }
    });
    return notes.data;
  },
);

export const updateNote = createAsyncThunk(
  'note/update',
  async ({ id, ...data }: IResponse) => {
    const token = getToken();
    const notes = await axios.put(routes.updateOrDeleteNote(id), data, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      }
    });
    return notes.data;
  },
);

const initialState: INote[] = [];

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      
  }
});

export const noteActions = notesSlice.actions;
export default notesSlice.reducer;