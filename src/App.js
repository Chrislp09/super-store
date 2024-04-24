import './App.css';
import Navigation from './navigation/navigation';
import AppRoutes from './navigation/routes';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import Loader from './components/Loader';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  
  const showLoader = (val) => {
    setIsLoading(val);
  }
  return (
    <BrowserRouter>
        <Navigation />
        <div className='container'>
          {isLoading && <Loader />}
          <AppRoutes showLoader={showLoader} />
          <Footer />
        </div>
    </BrowserRouter>
  );
}

export default App;
