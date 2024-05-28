import React, { useEffect, useState } from 'react';
import { getAll } from '../action/index';
import Header from '../components/Header';
import ProductsList from '../components/products/ProductList';
import api from '../utils/api';
import config from '../utils/config';
import iconImage from '../assets/images/pulpey-logo.png'

const Home = ({ title, showLoader }) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(5);
  const [btnMore, setBtnMore] = useState(true);
  const cantidadMore = 5;

  const viewData = async() => {
    showLoader(true);
    let getLimit = count > 0? {limit: count.toString()}: {};
    let res = await getAll(getLimit);
    if(res.code === 200) {
      if(count > res.data.length && data.length >= res.data.length) {
        alert('Ya no hay mas productos por ver')
        setCount(res.data.length); 
        setBtnMore(false); 
      } else {
        setData(res.data);
      }
    }
    showLoader(false);
  }

  useEffect(() => {
    viewData();
  }, [count])
  return (
    <>
      <Header 
        title={"¡Bienvenido al Gestor de Datos Pulpey!"}
        description={`
          Este sistema es tu destino para gestionar datos de forma eficiente y efectiva. 
          Explora una variedad de herramientas y funcionalidades diseñadas para simplificar l
          a gestión de tus datos. Descubre cómo puedes organizar, filtrar y analizar 
          tus conjuntos de datos con facilidad. Desde la carga inicial de datos hasta
          la generación de informes detallados, estamos aquí para ayudarte en cada paso 
          del camino. ¡Empieza a explorar y descubre un mundo de posibilidades para gestionar 
          tus datos hoy mismo!
        `}
      />
      {/* <div>
        <ProductsList 
          data={data}
          count={count}
          setCount={setCount}
          btnMore={btnMore}
          setBtnMore={setBtnMore}
          getProducts={viewData}
          cantidadMore={cantidadMore}
        />
      </div> */}
      <div className="home-container">
        <div className="image-column">
          <img src={iconImage} alt="Imagen-logo" style={{ maxWidth: '100%' }} />
        </div>
        <div className="text-column">
          <h1>📦 Pulpeybox, ¡Una experiencia en caja!</h1>
          <p>
          pulpeybox es una comunidad que te da una caja de productos y experiencias gratis, con a cambio de que pruebes y des tu opinión de los productos y servicios que van dentro de ella.
          </p>
        </div>
      </div>
    </>
  )
};

export default Home;