import React, { useState, useEffect } from 'react';
import ItemProduct from './ItemProducts'; 

const ProductsList = ({ data, count, setCount, btnMore, setBtnMore, getProducts, cantidadMore }) => {
  let titleBtn = btnMore? "Ver más": "Ver menos";
  if (data.length === 0) {
    return <div className='products-list'>
      <p className="empty-message">No hay productos por mostrar.</p>
      <button className='btn-load-more' onClick={() => getProducts()}>Volver a cargar</button>
    </div>;
  }

  const moreLess = () => {
    setCount(prevCount => btnMore? prevCount + cantidadMore: prevCount = cantidadMore);
    if(!btnMore) setBtnMore(true);
  } 

  return (
    <div className="products-list">
      {data.slice(0, count).map((product, index) => (
        <ItemProduct key={product.id || index} product={product} />
      ))}
      {data.length > 0 && data.length >= cantidadMore && (
        <button className='btn-load-more' onClick={() => moreLess()}>{titleBtn}</button>
      )}
    </div>
  );
};

export default ProductsList;
