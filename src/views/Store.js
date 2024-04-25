import React, { useEffect, useState } from 'react';
import { deleteProduct, getAll } from '../action';
import Header from '../components/Header';
import Table from '../components/TableData';

const Store = ({showLoader}) => {
  const [product, setProduct] = useState([]);

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
    { class:"action-btn ver", label: 'Ver', onClick: (item) => {console.log(`Ver ${item.name}`)} },
    { class:"action-btn edit", label: 'Editar', onClick: (item) => {console.log(`Editar ${item.name}`)} },
    { class:"action-btn delete", label: 'Eliminar', onClick: (item) => {deleteUniqueProduct(item.id); console.log(`Eliminar ${item.name}`)} },
  ];

  const getAllProduct = async () => {
    showLoader(true);
    let data = await getAll();
    if(data.code === 200) {
      if(data.data.length > 0) {
        const newArray = data.data.map((item) => {
          let currencyprice = process.env.REACT_APP_CURRENCY + (item?.price? item?.price: "0.00");
          const nuevoObjeto = {
            id: item?.id || "",
            name: item?.title || "",
            category: item?.category || "",
            price: currencyprice || "",
            stock: item?.rating.count || ""
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
      const deleteProduct = product.filter(item => item.id !== data.data.id);
      setProduct(deleteProduct);
    } else {
      alert(data.message || "No se pudo borrar este elemento")
    }
    showLoader(false);
  }

  return (
    <>
      <Header 
          title={"Mantenimiento"}
          description={"Administra el inventario de la bodega. Puedes crear, editar o eliminar productos según sea necesario."}
        />
      <div style={{marginTop: '5%', marginBottom: '5%'}}>
        <Table headers={headers} data={product} actions={actions} />
      </div>
    </>
  )
};

export default Store;