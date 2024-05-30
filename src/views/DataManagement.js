import React, { useEffect, useState } from 'react';
import { createProduct, createRegister, deleteProduct, deleteRegister, getAllDatos, getCatalog, getUniqueProduct, getUniqueRegister, update, updateRegister, updateRegisterRegister } from '../action';
import Header from '../components/Header';
import AddEditGestorModal from '../components/models/AddEditGestorModal';
import UploadDataArchiveModal from '../components/models/UploadDataArchiveModal';
import ViewProductModal from '../components/models/ViewProductoModal';
import ViewRegisterModal from '../components/models/ViewRegisterModal';
import Table from '../components/TableData';
import config from '../utils/config';

const DataManagement = ({ showLoader, showToast }) => {
  const [data, setData] = useState([]);
  const [dataRegister, setDataRegister] = useState(null);
  const [isModalOpenRegister, setIsModalOpenRegister] = useState(false);
  const [isModalAddOpenRegister, setIsModalAddOpenRegister] = useState(false);
  const [isModalEditOpenRegister, setIsModalEditOpenRegister] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [isModalUpload, setIsModalUpload] = useState(false);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRegister, setTotalRegister] = useState(0);
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [validationType, setValidationType] = useState('');
  const [age, setAge] = useState('');
  const [catalogoGenero, setCatalogoGenero] = useState([
    {value: "Male", text:"Masculino"},
    {value: "Female", text:"Femenino"},
    {value: "Unspecified", text:"No especificado"}
  ]);
  const [catalogoEstadoMarital, setCatalogoEstadoMarital] = useState([
    {value: "Single", text:"Soltero"},
    {value: "Married", text:"Casado"},
    {value: "In_Relationship", text:"En una relación"},
  ]);
  const [catalogoValidacion, setCatalogoValidacion] = useState([
    {text: "Mayor o igual", value:"mayor_igual"},
    {text: "Menor o igual", value:"menor_igual"},
    {text: "Igual", value:"igual"},
  ]);

  useEffect(() => {
    getCatalogos("estado_marital");
    getCatalogos("genero");
    getCatalogos("validacion_edad");
    getAllDatosList(limit, currentPage);
    if(isUpload) {
      setIsUpload(false)
    }
  }, [limit, currentPage, isUpload]);

  const headers = [
    { key: 'num', label: '' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'apellido', label: 'Apellido' },
    { key: 'genero', label: 'Género' },
    { key: 'edad_cumplida', label: 'Edad Cumplida' },
    { key: 'estado_marital', label: 'Estado Civil' },
    { key: 'actions', label: 'Acciones' },
  ];

  const actions = [
    { class: "action-btn ver", label: 'Ver', onClick: (item) => { getRegister(item._id); } },
    { class: "action-btn edit", label: 'Editar', onClick: (item) => { getRegister(item._id, true); } },
    { class: "action-btn delete", label: 'Eliminar', onClick: (item) => { deleteUniqueProduct(item._id); } },
  ];

  const getCatalogos = async(params) => {
    let res = await getCatalog({
        "field":params
    });

    switch (params) {
      case 'genero':
        setCatalogoGenero(res?.length > 0? res: []);
        break;
      case 'estado_marital':
        setCatalogoEstadoMarital(res?.length > 0? res: []);
          break;
      case 'validacion_edad':
        setCatalogoValidacion(res?.length > 0? res: []);
        break;
      default:
          return;
    }
}

  const getAllDatosList = async (limit, page, type) => {
    showLoader(true);
    let data = await getAllDatos({
      limit: limit?.toString() || "0", 
      page: page?.toString() || "0",
      nombre: "",
      apellido: "",
      genero: gender || "",
      estado_marital: maritalStatus || "",
      edad_min: "", 
      edad_max: "",
      validar_edad: validationType || "",
      edad_cumplida: age || "",
    });
    if (data.code === 200 && data.data.data.length > 0) {
      const startNumber = (page - 1) * limit + 1;
      const newDataList = data.data.data.map((v, i) => {
        let number = startNumber + i;
        const nuevoObjeto = {
          ...v,
          num: number
        };
        return nuevoObjeto;
      });
      if(type) {
        showLoader(false);
        return newDataList;
      } else {
        setData(newDataList);
        setTotalPages(data.data.totalPages);
        setTotalRegister(data.data.total);
      }
    } else {
      setData([]);
      console.log(data.message);
    }
    showLoader(false);
  };

  const deleteUniqueProduct = async (id) => {
    showLoader(true);
    let data = await deleteRegister(id.toString());
    if (data.code === 200) {
      showToast(`Se eliminó correctamente el registro`, 'success', 3000);
      getAllDatosList(limit, currentPage);
    } else {
      showToast(data.message || "No se pudo borrar este elemento", 'error', 3000);
    }
    showLoader(false);
  };

  const getRegister = async (id, edit) => {
    showLoader(true);
    let data = await getUniqueRegister(id.toString());
    if (data.code === 200) {
      setDataRegister(data.data);
      if (edit) {
        setIsModalEditOpenRegister(true);
      } else {
        setIsModalOpenRegister(true);
      }
    } else {
      showToast(data.message || "No se pudo obtener datos del producto", 'error', 3000);
    }
    showLoader(false);
  };

  const updateDataGestor = async (form, id) => {
    showLoader(true);
    let data = await updateRegister(id.toString(), form);
    if (data.code === 200) {
      setDataRegister(null);
      setIsModalEditOpenRegister(false);
      showToast(`Se actualizo el registro ${form.nombre || ""} ${form.apellido || ""}`, 'success', 3000);
      getAllDatosList(limit, currentPage);
    } else {
      showToast(data.message || "No se pudo actualizar los datos del producto", 'error', 3000);
    }
    showLoader(false);
  };

  const createDataRegister = async (form) => {
    showLoader(true);
    let data = await createRegister(form);
    if (data.code === 200 || data.code === 201) {
      setIsModalAddOpenRegister(false);
      showToast(`Se guardo el registro ${form.nombre || ""} ${form.apellido || ""}`, 'success', 3000);
      getAllDatosList(limit, currentPage);
    } else {
      showToast(data.message || "No se pudo crear el producto", 'error', 3000);
    }
    showLoader(false);
  };

  const generateCSV = async() => {
    if(data?.length > 0) {
      try {
        let dataGenerate = await getAllDatosList(0, 0, 'csv');
        const headers = ['Nombre', 'Apellido', 'Género', 'Edad_Cumplida', 'Estado'];
        const rows = dataGenerate.map(item => [
          item.nombre || "N",
          item.apellido || "N",
          item.genero || "N",
          item.edad_cumplida || "N",
          item.estado_marital || "N"
        ]);
      
        let csvContent = '\uFEFF'; 
        csvContent += headers.join(',') + '\n';
        rows.forEach(row => {
          csvContent += row.join(',') + '\n';
        });
      
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 19).replace('T', '_').replace(/:/g, '-');
        const fileName = `REPORTE_DATOS_GESTOR_${formattedDate}.csv`;
      
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast(`El reporte ${fileName} se genero correctamente`, 'success', 5000);
      }catch(e) {
        showToast(`Hubo un error al tratar de generar el reporte`, 'error', 3000);
      }
    } else {
      showToast("No hay datos para generar el reporte", 'error', 3000);
    }
  };

  const aplicarFiltros = () => {
    setTotalPages(1);
    setCurrentPage(1);
    setTotalRegister(0);
    getAllDatosList(limit, 1);
  }

  const limpiarFiltros = async() => {
    if(gender || age || validationType || maritalStatus) {
      setGender('');
      setMaritalStatus('');
      setValidationType('');
      setAge('');
      showLoader(true);
      let data = await getAllDatos({
        limit: limit?.toString() || "0", 
        page: "1",
        nombre: "",
        apellido: "",
        genero: "",
        estado_marital: "",
        edad_min: "", 
        edad_max: "",
        validar_edad: "",
        edad_cumplida: "",
      });
      if (data.code === 200 && data.data.data.length > 0) {
        const startNumber = (1 - 1) * limit + 1;
        const newDataList = data.data.data.map((v, i) => {
          let number = startNumber + i;
          const nuevoObjeto = {
            ...v,
            num: number
          };
          return nuevoObjeto;
        });
        setData(newDataList);
        setTotalPages(data.data.totalPages);
        setTotalRegister(data.data.total);
      } else {
        setData([]);
        console.log(data.message);
      }
      showLoader(false);
    }
  }

  return (
    <>
      <Header
        title={"Gestión de Datos"}
        description={
          `Este apartado es una herramienta que te ayuda a trabajar con tus 
            archivos de datos de una manera fácil y rápida. Puedes cargar archivos CSV, 
            que son archivos de datos comunes, y luego filtrarlos para encontrar 
            la información que necesitas. Una vez que encuentres 
            los datos que buscas, se mostrarán en una tabla para que los puedas ver y 
            entender fácilmente.`
        }
      />
      <div className='btn-add-container'>
        <button onClick={() => { setIsModalAddOpenRegister(true) }} className='btn-add'>Agregar</button>
        <button onClick={() => { setIsModalUpload(true) }} className='btn-add'>Carga masiva</button>
        <button onClick={generateCSV} className='btn-add-csv'>Generar CSV</button>
      </div>
      <div style={{ marginTop: '2%', marginBottom: '5%' }}>
        <div className='filter-container'>
          <label htmlFor="genderSelect">Género:</label>
          <select id="genderSelect" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Seleccione...</option>
            {catalogoGenero.length > 0 && catalogoGenero.map((gender, index) => (
                <option key={index} value={gender.value}>{gender.text}</option>
            ))}
          </select>
          <label htmlFor="maritalStatusSelect">Estado Civil:</label>
          <select id="maritalStatusSelect" value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)}>
            <option value="">Seleccione...</option>
            {catalogoEstadoMarital.length > 0 && catalogoEstadoMarital.map((status, index) => (
                <option key={index} value={status.value}>{status.text}</option>
            ))}
          </select>
          <label htmlFor="ageInput">Edad:</label>
          <input id="ageInput" type="number" min="19" value={age} onChange={(e) => setAge(e.target.value)} />
          <label htmlFor="validationTypeSelect">Tipo de Validación:</label>
          <select id="validationTypeSelect" value={validationType} onChange={(e) => setValidationType(e.target.value)}>
            <option value="">Seleccione...</option>
            {catalogoValidacion.length > 0 && catalogoValidacion.map((count, index) => (
                <option key={index} value={count.value}>{count.text}</option>
            ))}
          </select>
          <button onClick={aplicarFiltros} className='btn-add-csv'>Aplicar Filtros</button>
          <button onClick={limpiarFiltros} className='btn-add-csv'>Limpiar</button>
        </div>
        <Table
          key="tbl-gestor"
          headers={headers}
          data={data}
          actions={actions}
          limit={limit}
          setLimit={setLimit}
          getAllDatosList={getAllDatosList}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalRegister={totalRegister}
        />
      </div>
      <ViewRegisterModal
        title="Detalle del Registro"
        action2={() => { setIsModalOpenRegister(false); setDataRegister(null) }}
        setIsModalOpen={setIsModalOpenRegister}
        isModalOpen={isModalOpenRegister}
        register={dataRegister}
      />
      <UploadDataArchiveModal
        title="Carga masiva de datos"
        setIsModalOpen={setIsModalUpload}
        isModalOpen={isModalUpload}
        setIsUpload={setIsUpload}
        showToast={showToast}
      />
      <AddEditGestorModal
        title="Añadir Registro"
        action1={createDataRegister}
        action2={() => { setIsModalAddOpenRegister(false); setDataRegister(null) }}
        setIsModalOpen={setIsModalAddOpenRegister}
        isModalOpen={isModalAddOpenRegister}
        catalogoEstadoMarital={catalogoEstadoMarital}
        catalogoGeneros={catalogoGenero}
      />
      <AddEditGestorModal
        title={"Editar Registro - " +  dataRegister?._id}
        action1={updateDataGestor}
        action2={() => { setIsModalEditOpenRegister(false); setDataRegister(null) }}
        setIsModalOpen={setIsModalEditOpenRegister}
        isModalOpen={isModalEditOpenRegister}
        gestor={dataRegister}
        catalogoEstadoMarital={catalogoEstadoMarital}
        catalogoGeneros={catalogoGenero}
      />
    </>
  )
};

export default DataManagement;
