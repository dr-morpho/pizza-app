import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
// Type:
export type ItemsProperty = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  allPrice: number;
  type: string;
  size: number;
  count: number;
};

interface CartStateType {
  totalPrice: number;
  items: ItemsProperty[];
}
// Slice:
const cartState: CartStateType = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartState,
  reducers: {
    addItem(state, action: PayloadAction<ItemsProperty>) {
      const findItem = state.items.find(
        (elem) =>
          elem.id === action.payload.id &&
          elem.title === action.payload.title &&
          elem.size === action.payload.size &&
          elem.type === action.payload.type,
      );

      if (findItem) {
        findItem.count++;
        findItem.allPrice += findItem.price;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((acc, elem) => acc + elem.allPrice, 0);
    },
    minusItem(state, action: PayloadAction<ItemsProperty>) {
      const findItem = state.items.find(
        (elem) =>
          elem.id === action.payload.id &&
          elem.title === action.payload.title &&
          elem.size === action.payload.size &&
          elem.type === action.payload.type,
      );
      if (findItem) {
        findItem.count--;
        findItem.allPrice -= findItem.price;
        state.totalPrice -= findItem.price;
      }
      if (findItem!.count < 1) {
        state.items = state.items.filter((elem) => elem.count >= 1);
      }
    },
    removeItem(state, action: PayloadAction<ItemsProperty>) {
      const findItem = state.items.find(
        (elem) =>
          elem.id === action.payload.id &&
          elem.title === action.payload.title &&
          elem.size === action.payload.size &&
          elem.type === action.payload.type,
      );
      if (findItem) {
        state.totalPrice -= findItem.allPrice;
        findItem.allPrice = 0;
        findItem.count = 0;
        state.items = state.items.filter((elem) => elem.count >= 1);
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// Selector's:
export const selectCartTotalCount = (state: RootState) =>
  state.cartSlice.items.reduce((acc, elem) => acc + elem.count, 0);
export const selectCartItems = (state: RootState) => state.cartSlice.items;
export const selectCartTotalPrice = (state: RootState) => state.cartSlice.totalPrice;
// Action's:
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
