import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken } from '../helpers/helpers';
import { IFolder } from '../interfaces/folder.interface'
import { INote } from '../interfaces/note.interface';
import { base } from '../routes';

// const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNWJlOTc1NC1kMTljLTQzMTMtYjJlMC00ODU1MTRiOGZmOWYiLCJuYW1lIjoiYWxiZXJ0IiwiZXhwIjoxNjYxNTk0MjQyLCJpc3MiOiJodHRwczovL3Rlc3QtYXBpLm1pc2FrYS5uZXQucnUiLCJhdWQiOiJ0ZXN0LWFwaS5taXNha2EubmV0LnJ1In0.IzTJuH3-b4SFEylmqgqUFMnf8qvTtNdl2bQwRTj-5-E';

export const folderAPI = createApi({
  reducerPath: 'folderApi',
  baseQuery: fetchBaseQuery({ baseUrl: base }),
  tagTypes: ['Folder'],
  endpoints: (builder) => ({
    getFolders: builder.query<IFolder[], void>({
      query: () => ({
        url: 'Folders/',
        headers: {
          Authorization: `Bearer ${getToken().accessToken}`,
        }
      }),
      providesTags: ['Folder']
    }),
    deleteFolder: builder.mutation<void, string>({
      query: (id) => ({
        url: `Folders/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken().accessToken}`,
        }
      }),
      invalidatesTags: ['Folder']
    }),
    createFolder: builder.mutation<IFolder, Omit<IFolder, 'id' | 'notesCount'>>({
      query: (data) => ({
        url: `Folders/`,
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${getToken().accessToken}`,
        }
      }),
      invalidatesTags: ['Folder']
    }),
    updateFolder: builder.mutation<IFolder, {
      data: Omit<IFolder, 'id' | 'notesCount'>,
      id: string,
    }>({
      query: ({ data, id }) => ({
        url: `Folders/${id}`,
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${getToken().accessToken}`,
        }
      }),
      invalidatesTags: ['Folder']
      // invalidatesTags: (result) => {
      //   console.log(result);
      //   return [{ type: 'Folder', id: result?.id }];
      // }
    }),
  }),
})
export const { useGetFoldersQuery, useDeleteFolderMutation, useCreateFolderMutation, useUpdateFolderMutation } = folderAPI;
