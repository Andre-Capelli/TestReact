import React, { forwardRef, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, selectItems } from '../store/itemsSlice';
import Item from './Item';

const List = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    <div>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
});

export default memo(List);
