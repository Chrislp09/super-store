import React from 'react';

const Modal = ({ btn, isOpen, onClose, children, onAction, titleAction }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {children}
        <div className='modal-btn-container'>
            {<button className="modal-close-btn mdl-two" onClick={onClose}>Cerrar</button>}
            {onAction && <button className="modal-close-btn mdl-one" onClick={onAction}>{titleAction || "Aceptar"}</button>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
