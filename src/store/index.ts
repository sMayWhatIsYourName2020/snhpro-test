import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { folderAPI } from '../services/FolderService';
import { userAPI } from '../services/UserService';
import noteReducer from './slices/note.slice';

const rootReducer = combineReducers({
  [folderAPI.reducerPath]: folderAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  noteReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(folderAPI.middleware, userAPI.middleware),
});
// export type AppStore = ReturnType<typeof setupStore>;
// export type AppDispatch = AppStore['dispatch'];
export type AppDispatch = typeof store.dispatch;
export type TypeRootState = ReturnType<typeof store.getState>;

