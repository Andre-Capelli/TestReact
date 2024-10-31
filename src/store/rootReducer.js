import { combineReducers } from "@reduxjs/toolkit";
import form from "./formSlice";
import items from "./itemsSlice";

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    form,
    items,
    ...asyncReducers,
  });

  return combinedReducer(state, action);
};

export default createReducer;
