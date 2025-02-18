import React, { forwardRef, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems, selectItems } from "../store/itemsSlice";
import { del } from "../core/axios";
import Item from "./Item";

const List = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await del(`/item/${id}`);
      if (response.status === 'success') {
        dispatch(getItems());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return items.map((item) => (
    <Item key={item.id} item={item} onDelete={handleDelete} />
  ));
});

export default memo(List);