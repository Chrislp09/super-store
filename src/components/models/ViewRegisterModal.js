import React, { useEffect, useState } from 'react';
import Modal from './Modal';

const ViewRegisterModal = ({ title, action1, action2, register, isModalOpen, setIsModalOpen }) => {
  const [data, setData] = useState({
    genero: register?.genero || "",
    edad_cumplida: register?.edad_cumplida || "",
    estado_marital: register?.estado_marital || "",
    nombre: register?.nombre || "",
    apellido: register?.apellido || ""
  });

  useEffect(() => {
    setData({
      genero: register?.genero || "",
      edad_cumplida: register?.edad_cumplida || "",
      estado_marital: register?.estado_marital || "",
      nombre: register?.nombre || "",
      apellido: register?.apellido || ""
    });
  }, [isModalOpen]);

  return (
    <Modal isOpen={isModalOpen} onClose={action2}>
      <h2>{title}</h2>
      <div className="register-modal-content">
        <div className="register-details-card">
          <p><strong>Nombre:</strong> {data.nombre}</p>
          <p><strong>Apellido:</strong> {data.apellido}</p>
          <p><strong>Género:</strong> {data.genero}</p>
          <p><strong>Edad Cumplida:</strong> {data.edad_cumplida}</p>
          <p><strong>Estado Civil:</strong> {data.estado_marital}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ViewRegisterModal;
