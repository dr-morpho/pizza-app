import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type FilterStateType = {
  search: string;
  page: number;
  category: number | string;
  index: number;
  sort: string;
};
// Slice:
const filterState: FilterStateType = {
  search: '',
  page: 1,
  category: 0,
  index: 0,
  sort: 'rating',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.category = action.payload;
    },
    setSortState(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    setIndexState(state, action: PayloadAction<number>) {
      state.index = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCountPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterStateType>) {
      state.sort = action.payload.sort;
      state.category = Number(action.payload.category);
      state.page = Number(action.payload.page);
    },
  },
});
// Selektor's:
export const sortSelector = (state: RootState) => state.filterSlice.sort;
export const indexSelector = (state: RootState) => state.filterSlice.index;

// Action's:
export const { setCategoryId, setSortState, setSearch, setCountPage, setFilters, setIndexState } =
  filterSlice.actions;
export default filterSlice.reducer;
