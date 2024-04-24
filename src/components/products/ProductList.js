import React, { useState, useEffect } from 'react';
import ItemProduct from './ItemProducts'; 

const ProductsList = ({ data, count, setCount, btnMore, setBtnMore }) => {
  let titleBtn = btnMore? "Ver más": "Ver menos";
  if (data.length === 0) {
    return <p className="empty-message">No hay productos por mostrar.</p>;
  }

  const moreLess = () => {
    setCount(prevCount => btnMore? prevCount + 5: prevCount = 5);
    if(!btnMore) setBtnMore(true);
  } 

  return (
    <div className="products-list">
      {data.slice(0, count).map((product, index) => (
        <ItemProduct key={product.id} product={product} />
      ))}
      {data.length > 0 && (
        <button className='btn-load-more' onClick={() => moreLess()}>{titleBtn}</button>
      )}
    </div>
  );
};

export default ProductsList;
