import { createContext } from 'react';

interface IChosenCategory {
  setCategory: (name: string) => void;
  category: string;
}

export const CategoryContext = createContext<IChosenCategory>({
  setCategory: () => { },
  category: 'All items',
});