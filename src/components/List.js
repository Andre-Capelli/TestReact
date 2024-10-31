import React, { forwardRef, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getItems } from "../store/itemsSlice";

const List = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, []);

  return null;
});

export default memo(List);
