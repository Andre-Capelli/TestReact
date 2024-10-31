import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post } from "../core/axios";

const initialState = {};

export const createItem = createAsyncThunk(
  "form/createItem",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await post("/item", data);

      return fulfillWithValue(res.result);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {},
  extraReducers: (b) => {},
});

export default formSlice.reducer;
