import { create } from 'zustand';
import {bookmarkInfo} from './interface';

export const bookmarkStore = create<bookmarkInfo>((set) => ({
  bookmarkIds: [],
  setBookmarkIds: (bookmarkIds) => set({ bookmarkIds: bookmarkIds }),
}));
