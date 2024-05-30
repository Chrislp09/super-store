import React, { useEffect, useState } from 'react';
import Modal from './Modal';

const AddEditGestorModal = ({ title, isModalOpen, setIsModalOpen, action1, action2, gestor, catalogoEstadoMarital, catalogoGeneros }) => {
    const [formData, setFormData] = useState({
        nombre: gestor?.nombre || '',
        apellido: gestor?.apellido || '',
        edad_cumplida: (gestor?.edad_cumplida || '').toString(),
        estado_marital: gestor?.estado_marital || '',
        genero: gestor?.genero || ''
    });

    const [errors, setErrors] = useState({
        nombre: '',
        apellido: '',
        edad_cumplida: '',
        estado_marital: '',
        genero: ''
    });

    useEffect(() => {
        setFormData({
            nombre: gestor?.nombre || '',
            apellido: gestor?.apellido || '',
            edad_cumplida: (gestor?.edad_cumplida || '').toString(),
            estado_marital: gestor?.estado_marital || '',
            genero: gestor?.genero || ''
        });
        setErrors({
            nombre: '',
            apellido: '',
            edad_cumplida: '',
            estado_marital: '',
            genero: ''
        });
    }, [isModalOpen, gestor]);

    

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = () => {
        let formValid = true;
        const newErrors = {};
    
        if (!/^[1-9]\d*$/.test(formData.edad_cumplida) || parseInt(formData.edad_cumplida) < 18) {
            newErrors['edad_cumplida'] = 'Para completar el registro la edad tiene que ser mayor o igual que 18';
            formValid = false;
        }
    
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
    
        if(gestor) {
            action1(formData, gestor._id);
        } else {
            action1(formData);
        }
    };
    

    return (
        <Modal isOpen={isModalOpen} onClose={action2} titleAction={gestor ? "Actualizar" : "Guardar"} onAction={handleSubmit}>
            <h2>{title}</h2>
            <div className="product-modal-content-form">
                <label>
                    Nombre:
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                    {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                </label>
                <label>
                    Apellido:
                    <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
                    {errors.apellido && <span className="error-message">{errors.apellido}</span>}
                </label>
                <label>
                    Edad Cumplida:
                    <input type="text" name="edad_cumplida" value={formData.edad_cumplida} onChange={handleChange} />
                    {errors.edad_cumplida && <span className="error-message">{errors.edad_cumplida}</span>}
                </label>
                <label>
                    Estado Civil:
                    <select name="estado_marital" value={formData.estado_marital} onChange={handleChange}>
                        <option value="0">Seleccione...</option>
                        {catalogoEstadoMarital?.length > 0  && catalogoEstadoMarital.map((status, index) => (
                            <option key={index} value={status.value}>{status.text}</option>
                        ))}
                    </select>
                    {errors.estado_marital && <span className="error-message">{errors.estado_marital}</span>}
                </label>
                <label>
                    Género:
                    <select name="genero" value={formData.genero} onChange={handleChange}>
                        <option value="">Seleccione...</option>
                        {catalogoGeneros?.length > 0 && catalogoGeneros.map((gender, index) => (
                            <option key={index} value={gender.value}>{gender.text}</option>
                        ))}
                    </select>
                    {errors.genero && <span className="error-message">{errors.genero}</span>}
                </label>
            </div>
        </Modal>
    );
};

export default AddEditGestorModal;
