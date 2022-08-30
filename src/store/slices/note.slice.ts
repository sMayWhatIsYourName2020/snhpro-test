import axios from 'axios';
import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import routes from '../../routes';
import { INote } from '../../interfaces/note.interface';
import { getToken } from '../../helpers/helpers';
import { folderAPI } from '../../services/FolderService';
import { IFolder } from '../../interfaces/folder.interface';

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
    const response = await axios.get(routes.getOrCreateNotes(id), {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      }
    });
    const notes: INote[] = response.data;
    return {
      notes,
      folderId: id,
    };
  },
);

export const createNote = createAsyncThunk(
  'note/create',
  async ({ id, ...data }: IResponse) => {
    try {
      const token = getToken()
      const response = await axios.post(routes.getOrCreateNotes(id), data,
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        });
      const note = response.data;
      return {
        note,
        folderId: id,
      };
    } catch(e) {
      throw e;
    }
  },
);

export const deleteNote = createAsyncThunk(
  'note/delete',
  async (id: string) => {
    try {
      const token = getToken();
      await axios.delete(routes.updateOrDeleteNote(id), {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        }
      });
      return id;
    } catch (e) {
      throw e;
    }
  },
);

export const updateNote = createAsyncThunk(
  'note/update',
  async ({ id, ...data }: IResponse) => {
    try {
      const token = getToken();
      const response = await axios.put(routes.updateOrDeleteNote(id), data, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        }
      });
      const note: INote = response.data;
      return note;
    } catch(e) {
      throw e;
    }
  },
);

export const transferNote = createAsyncThunk(
  'note/transfer',
  async ({ folderId, noteId }: {
    noteId: string;
    folderId: string;
  }) => {
    try {
      const token = getToken();
      await axios.post(routes.transferNote(noteId, folderId), {}, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        }
      });
      return {
        noteId,
        folderId,
      };
    } catch (e) {
      throw e;
    }
  }
);

const initialState: {
  notes: INote[],
  folderIds: string[],
  currentFolder: string,
  folders: IFolder[]
} = {
  notes: [],
  folderIds: [],
  currentFolder: '',
  folders: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setCurrentFolder: (state, { payload }) => {
      state.currentFolder = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.fulfilled, (state, { payload: { notes, folderId } }) => {
        const newNotes = notes.map((note) => {
          return {
            ...note,
            folderId,
          };
        });
        state.folderIds.push(folderId);
        state.notes.push(...newNotes);
        state.currentFolder = folderId;
      })
      .addCase(createNote.fulfilled, (state, { payload: { note, folderId } }) => {
        const newNote = {
          ...note,
          folderId,
        };
        state.notes.push(newNote);
      })
      .addCase(deleteNote.fulfilled, (state, { payload }) => {
        state.notes = state.notes.filter((note) => note.id !== payload);
      })
      .addCase(updateNote.fulfilled, (state, { payload }) => {
        state.notes = state.notes.map((note) => {
          if (payload.id === note.id) {
            return payload;
          }
          return note;
        });
      })
      .addCase(transferNote.fulfilled, (state, { payload: { folderId, noteId } }) => {
        if (state.folderIds.includes(folderId)) {
          state.notes = state.notes.map((note) => {
            if (note.id === noteId) {
              note.folderId = folderId;
            }
            return note;
          });
        } else {
          state.notes = state.notes.filter((note) => note.id !== noteId);
        }
      })
      .addMatcher(folderAPI.endpoints.deleteFolder.matchFulfilled, (state, { meta }) => {
        const folderId = meta.arg.originalArgs;
        state.folderIds = state.folderIds.filter((folder) => folderId !== folder);
        state.notes = state.notes.filter((note) => note.folderId !== folderId);
      })
      .addMatcher(folderAPI.endpoints.getFolders.matchFulfilled, (state, { payload }) => {
        state.folders = payload;
      });
  }
});

export const notesActions = notesSlice.actions;
export const notesAsyncThunks = {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
};
export default notesSlice.reducer;