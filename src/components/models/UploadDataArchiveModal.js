import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import * as XLSX from 'xlsx';
import Loader from '../Loader';
import { postUploadXlxs } from '../../action';
import api from '../../utils/api';
import config from '../../utils/config';

const UploadDataArchiveModal = ({ title, isModalOpen, setIsModalOpen, setIsUpload, showToast }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);  

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.name.endsWith('.xlsx')) {
            setSelectedFile(file);
            setErrorMessage('');
            setErrors([]);
        } else {
            setSelectedFile(null);
            setErrorMessage('Solo se permiten archivos con extensión .xlsx');
            setErrors([]);
        }
    };

    const validateData = (data) => {
        const validationErrors = [];
        data.forEach((row, index) => {
            if (index === 0) {
                const [edad, genero, estado, nombre, apellido] = row;
                if (edad !== 'edad_cumplida' || genero !== 'genero' || estado !== 'estado_marital' ||
                    (nombre && nombre !== 'nombre') || (apellido && apellido !== 'apellido')) {
                    validationErrors.push({ row: 1, column: 'Headers', message: 'Los encabezados no son correctos' });
                }
            } else {
                const [edad, genero, estado, nombre, apellido] = row;
    
                if (isNaN(edad) || edad < 18) {
                    validationErrors.push({ row: index + 1, column: 'edad_cumplida', message: 'La edad debe ser un número mayor o igual a 18' });
                }
    
                if (genero && genero !== 'Male' && genero !== 'Female' && genero !== 'Unspecified') {
                    validationErrors.push({ row: index + 1, column: 'genero', message: 'El género debe ser "Male" o "Female"' });
                }
    
                const validStates = ['Married', 'Single', 'In_Relationship'];
                if (estado && !validStates.includes(estado)) {
                    validationErrors.push({ row: index + 1, column: 'estado_marital', message: 'El estado marital no es válido' });
                }
    
                if (nombre && typeof nombre !== 'string') {
                    validationErrors.push({ row: index + 1, column: 'Nombre', message: 'El nombre debe ser un texto' });
                }
    
                if (apellido && typeof apellido !== 'string') {
                    validationErrors.push({ row: index + 1, column: 'Apellido', message: 'El apellido debe ser un texto' });
                }
            }
        });
        return validationErrors;
    };

    const handleUpload = async () => {
        if (selectedFile) {
            setIsLoading(true);
            const reader = new FileReader();
            reader.onload = async (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                const sheetName = 'Carga_Masiva_Datos';
                const worksheet = workbook.Sheets[sheetName];

                if (!worksheet) {
                    setErrorMessage(`La hoja "${sheetName}" no se encuentra en el archivo`);
                    setIsLoading(false);
                    return;
                }

                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                const validationErrors = validateData(jsonData);

                if (validationErrors.length === 0) {
                    const res = await postUploadXlxs(selectedFile)
                    if (res.code === 200) {
                        showToast(res.message||"Archivo subido exitosamente", 'success', 3000);
                        setErrors([]);
                        setSelectedFile(null);
                        setIsModalOpen(false);
                        setIsUpload(true);
                    } else {
                        showToast(res.message || "Hubo un error al subir el archivo", 'error', 3000);
                    }
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    setErrors(validationErrors);
                }
            };
            reader.readAsArrayBuffer(selectedFile);
        } else {
            setErrorMessage('Por favor, selecciona un archivo antes de subir');
        }
    };

  return (
    <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
            setIsModalOpen(false); 
            setSelectedFile(null);
            setErrorMessage("");
            setErrors([]);
        }} 
        titleAction={"Subir"} 
        onAction={handleUpload}
    >
      <h2>{title}</h2>
      <div className="product-modal-content-form">
            <h3>Información sobre el archivo xls:</h3>
            <p>
                El archivo XLSX que se a cargará debe cumplir con ciertas especificaciones para que los datos se guarden correctamente en la base de datos. A continuación se detallan las condiciones que debe cumplir el archivo:
            </p>
            <ul>
                <li>El archivo debe ser un archivo de Excel (.xls) con el formato adecuado.</li>
                <li>El nombre de la hoja del archivo debe ser "Carga_Masiva_Datos".</li>
                <li>Las columnas del archivo deben tener los siguientes nombres:</li>
                <ul>
                    <li>Columna A: edad_cumplida</li>
                    <li>Columna B: genero</li>
                    <li>Columna C: estado_marital</li>
                    <li>Columna D: Nombre (opcional)</li>
                    <li>Columna E: Apellido (opcional)</li>
                </ul>
            </ul>
            <p>
                Asegúrate de que tu archivo cumpla con estos requisitos antes de cargarlo. Si el archivo no cumple con estas especificaciones, es posible que los datos no se guarden correctamente en la base de datos.
            </p>
            <p>
                Puedes descargar un archivo de ejemplo <a href="/xlsx/CARGA_MASIVA_PLANTILLA.xlsx" download>CARGA_MASIVA_PLANTILLA.xlsx</a>.
            </p>
        </div>
      <div className="">
        <div className='file-upload-container'>
            <label htmlFor="csvFile" className='file-upload-label'>
                Elegir archivo .xlsx
                <input
                    type="file"
                    id="csvFile"
                    accept=".xlsx"
                    name="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </label>
            {isLoading && <Loader />}
            {selectedFile && (
                <div className='selected-file'>Archivo seleccionado: {selectedFile.name}</div>
            )}
            {errorMessage && (
                <div className='error-message'>{errorMessage}</div>
            )}
        </div>
        {errors.length > 0 && (
            <div className='error-container'>
                <h3>Errores en el archivo XLSX:</h3>
                <ul>
                    {errors.map((error, index) => (
                        <li key={index} className='error-item'>
                            Error: {error.message} en fila {error.row} y columna {error.column}
                        </li>
                    ))}
                </ul>
            </div>
        )}
      </div>
    </Modal>
  );
};

export default UploadDataArchiveModal;
