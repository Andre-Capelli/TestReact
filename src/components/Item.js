import React from "react";

const Item = ({ item }) => {
  const { id, name, email, phone_number } = item;
  return (
    <div className="w-full h-20 flex flex-row items-center justify-between border-b border-gray-200">
      <div className="w-1/3 h-full flex items-center justify-center">{id}</div>
      <div className="w-1/3 h-full flex items-center justify-center">
        {name}
      </div>
      <div className="w-1/3 h-full flex items-center justify-center">
        {email}
      </div>
      <div className="w-1/3 h-full flex items-center justify-center">
        {phone_number?.prefix && phone_number?.number && (
          <span>common.has_phonenumber</span>
        )}
      </div>
    </div>
  );
};

export default Item;
