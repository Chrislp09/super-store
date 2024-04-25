import React, { useState } from 'react';
import defaultImage from '../../assets/images/no-image.png';

const ItemProduct = ({ product }) => {
    const [data, setProduct] = useState({
        title: product?.title || "",
        image: product?.image || "",
        description: product?.description || "",
        price: product?.price || "",
        category: product?.category || "",
        rating: product?.rating?.rate || "",
        count: product?.rating?.count || "",
    })
    const truncatedTitle = data.title.length > 60
    ? `${data.title.slice(0, 60)}...`
    : data.title;
    const truncatedDescription = data.description.length > 130
    ? `${data.description.slice(0, 130)}...`
    : data.description;

  return (
    <div className="product-card">
      <img src={data.image || defaultImage} alt={data.title} onError={(e) => { e.target.onerror = null; e.target.src = defaultImage }} />
      <h3>{truncatedTitle}</h3>
      {/* <p className="description">{truncatedDescription}</p> */}
      <div className="product-details">
        <div className="category-container">
          <p><strong>Categoría:</strong> {data.category}</p>
        </div>
        <div className="price-rating-container">
          <p><strong>Precio:</strong> {process.env.REACT_APP_CURRENCY}{data.price}</p>
          <p><strong>Rating:</strong> {data.rating}</p>
        </div>
        <div className="stock-container">
          <p><strong>Stock:</strong> {data.count}</p>
          <button>Agregar</button>
        </div>
      </div>
    </div>
  );
};

export default ItemProduct;
