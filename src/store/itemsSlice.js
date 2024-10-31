import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { get } from "../core/axios";
import { createItem } from "./formSlice";

const itemsAdapter = createEntityAdapter({
  selectId: (d) => d.id,
});

const initialState = itemsAdapter.getInitialState({});

export const getItems = createAsyncThunk(
  "items/getItems",
  async (__, { fulfillWithValue }) => {
    try {
      const res = await get("/items");

      if (res.status === "error") return fulfillWithValue([]);

      return fulfillWithValue(res.result);
    } catch (error) {
      return fulfillWithValue([]);
    }
  }
);

export const { selectAll: selectItems } = itemsAdapter.getSelectors(
  (state) => state.items
);

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(getItems.fulfilled, (state, action) => {
      itemsAdapter.setAll(state, action.payload);
    });
    b.addCase(createItem.fulfilled, (state, action) => {
      itemsAdapter.addOne(state, action.payload);
    });
  },
});

export default itemsSlice.reducer;
