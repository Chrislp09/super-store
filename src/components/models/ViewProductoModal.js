import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import defaultImage from '../../assets/images/no-image.png';

const ViewProductModal = ({title, action1, action2, product, isModalOpen, setIsModalOpen}) => {
  const [data, setData] = useState({
      title: product?.title || "",
      image: product?.image || "",
      description: product?.description || "",
      price: product?.price || "0.00",
      category: product?.category || "",
      rating: product?.rating?.rate || "0.0",
      count: product?.rating?.count || "0",
  });

  useEffect(() => {
    setData({
      title: product?.title || "",
      image: product?.image || "",
      description: product?.description || "",
      price: product?.price || "0.00",
      category: product?.category || "",
      rating: product?.rating?.rate || "0.0",
      count: product?.rating?.count || "0",
    })
  }, [isModalOpen])

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultImage;
  };

  return (
    <Modal isOpen={isModalOpen} onClose={action2}>
      <h2>{title}</h2>
      <div className="product-modal-content">
        <div className="product-image">
            <img 
              src={data.image || defaultImage} 
              alt={data.title} 
              onError={handleImageError} 
            />
        </div>
        <div className="product-details-card">
          <h2>{data.title}</h2>
          <p>{data.description}</p>
          <p><strong>Precio:</strong> {process.env.REACT_APP_CURRENCY}{data.price}</p>
          <p><strong>Categoria:</strong> {data.category}</p>
          <p><strong>Rating:</strong> {data.rating} ({data.count} reviews)</p>
          <p><strong>Stock:</strong> {data.count}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ViewProductModal;
