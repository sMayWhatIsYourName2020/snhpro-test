import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { folderAPI } from '../services/FolderService';
import { userAPI } from '../services/UserService';
import userReducer from './slices/user.slice';
import noteReducer from './slices/user.slice';

const rootReducer = combineReducers({
  [folderAPI.reducerPath]: folderAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  userReducer,
  noteReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(folderAPI.middleware),
});
// export type AppStore = ReturnType<typeof setupStore>;
// export type AppDispatch = AppStore['dispatch'];
export type TypeRootState = ReturnType<typeof store.getState>;

