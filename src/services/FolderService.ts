import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IFolder } from '../interfaces/folder.interface'
import { INote } from '../interfaces/note.interface';
import { base } from '../routes';

// const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNWJlOTc1NC1kMTljLTQzMTMtYjJlMC00ODU1MTRiOGZmOWYiLCJuYW1lIjoiYWxiZXJ0IiwiZXhwIjoxNjYxNTk0MjQyLCJpc3MiOiJodHRwczovL3Rlc3QtYXBpLm1pc2FrYS5uZXQucnUiLCJhdWQiOiJ0ZXN0LWFwaS5taXNha2EubmV0LnJ1In0.IzTJuH3-b4SFEylmqgqUFMnf8qvTtNdl2bQwRTj-5-E';

export const folderAPI = createApi({
  reducerPath: 'folderApi',
  baseQuery: fetchBaseQuery({ baseUrl: base }),
  endpoints: (builder) => ({
    getFolders: builder.query<IFolder[], string>({
      query: (token) => ({
        url: 'Folders/',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }),
    }),
    // getNotes: builder.query<INote[], string>({
    //   query: (id) => ({
    //     url: `Folders/${id}/notes`,
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     }
    //   }),
    // }),
  }),
})
export const { useGetFoldersQuery } = folderAPI;
