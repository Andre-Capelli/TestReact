import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteItems } from '../store/itemsSlice';
import { setItem } from '../store/formSlice';

const Item = ({ item }) => {
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(deleteItems(item.id));
  };

  const editItem = () => {
    dispatch(setItem(item));
  };

  return (
    <div>
      <p>ID: {item.id}</p>
      <p>Nome: {item.name}</p>
      <p>Email: {item.email}</p>
      <p>{item.phone_number?.phone ? 'common.has_phonenumber' : ''}</p>
      <button onClick={deleteItem}>Delete</button>
      <button onClick={editItem}>Edit</button>
    </div>
  );
};

export default Item;
