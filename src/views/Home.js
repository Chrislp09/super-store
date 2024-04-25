import React, { useEffect, useState } from 'react';
import { getAll } from '../action/index';
import Header from '../components/Header';
import ProductsList from '../components/products/ProductList';
import api from '../utils/api';
import config from '../utils/config';

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
        title={"Bienvenido a Super Store"}
        description={"La mejor calidad en productos."}
      />
      <div>
        <ProductsList 
          data={data}
          count={count}
          setCount={setCount}
          btnMore={btnMore}
          setBtnMore={setBtnMore}
          getProducts={viewData}
          cantidadMore={cantidadMore}
        />
      </div>
    </>
  )
};

export default Home;