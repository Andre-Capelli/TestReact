import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post } from '../core/axios';

const initialState = {
  item: null,
};

export const createItem = createAsyncThunk(
  'form/createItem',
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await post('/item', data);
      console.log(res);
      if (res.status !== 'success') throw new Error('');

      return fulfillWithValue({ ...data, id: res.result.last_id });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const editItem = createAsyncThunk(
  'form/editItem',
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await post(`/item/${data.id}`, data);
      console.log(res);
      if (res.status !== 'success') throw new Error('');

      return fulfillWithValue({ ...data });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setItem: (state, action) => {
      state.item = action.payload;
    },
  },
  extraReducers: (b) => {},
});

export const selectItem = (state) => state.form.item;
export const { setItem } = formSlice.actions;

export default formSlice.reducer;
