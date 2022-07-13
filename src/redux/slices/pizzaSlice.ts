import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Types:
type AxiosItems = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

type PizzaItemType = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

type ApiStateType = {
  search: string;
  page: number;
  category: number | string;
  sort: string;
};

interface PizzaStateType {
  items: PizzaItemType[];
  status: Status;
}

export enum Status {
  LOADING = 'loading',
  RESOLVE = 'resolve',
  REJECT = 'reject',
}

//Асинхронный экшн - бизнес логика/ запрос на бэкенд:
export const fetchPizza = createAsyncThunk<AxiosItems[], ApiStateType>(
  'pizza/fetchPizzaCall',
  async ({ search, category, sort, page }) => {
    const response = await axios.get<AxiosItems[]>(
      `https://62add2beb735b6d16a3a7f43.mockapi.io/items?page=${page}&search=${search}&limit=4${category}&sortBy=${sort}&order=desc`,
    );
    return response.data;
  },
);

// SLice:
const pizzaState: PizzaStateType = {
  items: [],
  status: Status.LOADING, // loading | resolve | reject
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: pizzaState,
  reducers: {
    setPizza(state, action) {
      state.items = action.payload;
    },
  },
  //экстра редьюсер для асинхронных экшенов, сохраняет данные бэка в редаксе: при использовании - try/ catch не нужен:
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.status = Status.RESOLVE;
      state.items = action.payload;
    });
    builder.addCase(fetchPizza.rejected, (state) => {
      state.status = Status.REJECT;
      state.items = [];
    });
  },
});

export const { setPizza } = pizzaSlice.actions;
export default pizzaSlice.reducer;
