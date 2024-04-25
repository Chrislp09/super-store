import React, { useEffect, useState } from 'react';
import Modal from './Modal';

const AddEditProductModal = ({ title, isModalOpen, setIsModalOpen, action1, action2, onCreateOrUpdate, product }) => {
    const [formData, setFormData] = useState({
        title: product?.title || '',
        description: product?.description || '',
        price: (product?.price || '').toString(),
        category: product?.category || '',
        count: (product?.rating?.count || '').toString() 
    });
      
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        count: ''
    });

  useEffect(() => {
    setFormData({
        title: product?.title || '',
        description: product?.description || '',
        price: (product?.price || '').toString(),
        category: product?.category || '',
        count: (product?.rating?.count || '').toString() 
    });
    setErrors({
      title: '',
      description: '',
      price: '',
      category: '',
      count: ''
    });
  }, [isModalOpen, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'price') {
      if (/^\d+(\.\d{0,2})?$/.test(value)) {
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
      } else {
        setErrors({ ...errors, [name]: 'El precio debe ser un número válido' });
      }
    } else if (name === 'count') {
      if (/^[1-9]\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
      } else {
        setErrors({ ...errors, [name]: 'El stock debe ser un número entero mayor a 0' });
      }
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
    }
  };
  

  const handleSubmit = () => {
    let formValid = true;
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key].trim()) {
        newErrors[key] = `El campo ${key.charAt(0).toUpperCase() + key.slice(1)} es requerido`;
        formValid = false;
      }
    });
    if (!formValid) {
      setErrors(newErrors);
      return;
    }
    if(product) {
        action1(formData, product?.id || product._id)
    } else {
        action1(formData)
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={action2} titleAction={product? "Actualizar" : "Guardar"} onAction={handleSubmit}>
      <h2>{title}</h2>
      <div className="product-modal-content-form">
        <label>
          Título:
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </label>
        <label>
          Descripción:
          <textarea name="description" value={formData.description} onChange={handleChange} />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </label>
        <label>
          Precio:
          <input type="text" name="price" value={formData.price} onChange={handleChange} />
          {errors.price && <span className="error-message">{errors.price}</span>}
        </label>
        <label>
          Categoría:
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
          {errors.category && <span className="error-message">{errors.category}</span>}
        </label>
        <label>
          Cantidad:
          <input type="text" name="count" value={formData.count} onChange={handleChange} />
          {errors.count && <span className="error-message">{errors.count}</span>}
        </label>
      </div>
    </Modal>
  );
};

export default AddEditProductModal;
