import React, { useEffect, useState } from 'react';
import { createProduct, deleteProduct, getAll, getUniqueProduct, updateProduct } from '../action';
import Header from '../components/Header';
import AddEditProductModal from '../components/models/AddEditProductModal';
import ViewProductModal from '../components/models/ViewProductoModal';
import Table from '../components/TableData';
import config from '../utils/config';

const Store = ({showLoader}) => {
  const [product, setProduct] = useState([]);
  const [dataProduct, setDataProduct] = useState(null);
  const [isModalOpenProduct, setIsModalOpenProduct] = useState(false);
  const [isModalAddOpenProduct, setIsModalAddOpenProduct] = useState(false);
  const [isModalEditOpenProduct, setIsModalEditOpenProduct] = useState(false);

  useEffect(() => {
    getAllProduct();
  }, [])
  
  const headers = [
    { key: 'id', label: 'Id' },
    { key: 'name', label: 'Nombre' },
    { key: 'category', label: 'Categoria' },
    { key: 'price', label: 'Precio' },
    { key: 'stock', label: 'Stock' },
    { key: 'actions', label: 'Acciones' },
  ];
  
  const actions = [
    { class:"action-btn ver", label: 'Ver', onClick: (item) => {getProduct(item.id); } },
    { class:"action-btn edit", label: 'Editar', onClick: (item) => {getProduct(item.id, true);} },
    { class:"action-btn delete", label: 'Eliminar', onClick: (item) => {deleteUniqueProduct(item.id); } },
  ];

  const getAllProduct = async () => {
    showLoader(true);
    let data = await getAll();
    if(data.code === 200) {
      if(data.data.length > 0) {
        const newArray = data.data.map((item, index) => {
          let currencyprice = process.env.REACT_APP_CURRENCY + (item?.price? item?.price: "0.00");
          const nuevoObjeto = {
            id: (config.env === 'dev'? item?.id : item?._id) || index+1,
            name: item?.title || "",
            category: item?.category || "",
            price: currencyprice || "",
            stock: item?.rating.count || 0
          }
          return nuevoObjeto
        })
        setProduct(newArray);
      }
    } else {
      alert(data.message)
    }
    showLoader(false);
  }

  const deleteUniqueProduct = async(id) => {
    showLoader(true);
    let data = await deleteProduct(id.toString());
    if(data.code === 200) {
      alert(`Se elimino correctamente el producto ${data.data.title}`);
      if(config.env === 'dev') {
        const deleteProduct = product.filter(item => item.id !== data.data.id);
        setProduct(deleteProduct);
      } else {
        getAllProduct();
      }
    } else {
      alert(data.message || "No se pudo borrar este elemento")
    }
    showLoader(false);
  }

  const getProduct = async(id, edit) => {
    showLoader(true);
    let data = await getUniqueProduct(id.toString());
    if(data.code === 200) {
      setDataProduct(data.data);
      if(edit) {
        setIsModalEditOpenProduct(true);
      } else {
        setIsModalOpenProduct(true);
      }
    } else {
      alert(data.message || "No se pudo obtener datos del producto")
    }
    showLoader(false);
  }

  const updateDataProduct = async(form, id) => {
    showLoader(true);
    let data = await updateProduct(id.toString(), form);
    if(data.code === 200) {
      setDataProduct(null);
      setIsModalEditOpenProduct(false);
      alert(`Se actualizaron los datos del producto "${form.title || ""}"`);
      getAllProduct();
    } else {
      alert(data.message || "No se pudo actualizar los datos del producto");
    }
    showLoader(false);
  }

  const createDataProduct = async(form) => {
    showLoader(true);
    let data = await createProduct(form);
    if(data.code === 200 || 201) {
      setIsModalAddOpenProduct(false);
      alert(`Se creo el producto "${form.title || ""}"`);
      getAllProduct();
    } else {
      alert(data.message || "No se pudo crear el producto");
    }
    showLoader(false);
  }

  return (
    <>
      <Header 
          title={"Mantenimiento"}
          description={"Administra el inventario de la bodega. Puedes crear, editar o eliminar productos según sea necesario."}
        />
      <div className='btn-add-container'>
        <button onClick={() => {setIsModalAddOpenProduct(true)}} className='btn-add'>Agregar</button>
      </div>
      <div style={{marginTop: '2%', marginBottom: '5%'}}>
        <Table headers={headers} data={product} actions={actions} />
      </div>
      <ViewProductModal 
        title="Detalle del Producto"
        action2={(e) => {setIsModalOpenProduct(false); setDataProduct(null)}}
        setIsModalOpen={setIsModalOpenProduct}
        isModalOpen={isModalOpenProduct}
        product={dataProduct}
      />
      <AddEditProductModal 
        title="Crear Producto"
        action1={createDataProduct}
        action2={(e) => {setIsModalAddOpenProduct(false); setDataProduct(null)}}
        setIsModalOpen={setIsModalAddOpenProduct}
        isModalOpen={isModalAddOpenProduct}
      />
      <AddEditProductModal 
        title={"Editar Producto - "+(config.env === 'dev'? dataProduct?.id : dataProduct?._id )}
        action1={updateDataProduct}
        action2={(e) => {setIsModalEditOpenProduct(false); setDataProduct(null)}}
        setIsModalOpen={setIsModalEditOpenProduct}
        isModalOpen={isModalEditOpenProduct}
        product={dataProduct}
      />
    </>
  )
};

export default Store;