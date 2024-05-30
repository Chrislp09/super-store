import './App.css';
import Navigation from './navigation/navigation';
import AppRoutes from './navigation/routes';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import Loader from './components/Loader';
import Footer from './components/Footer';
import Toast from './components/Toast';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ text: '', type: '', time: 0, visible: false });

  const showLoader = (val) => {
    setIsLoading(val);
  }

  const showToast = (text, type, time) => {
    console.log('se esta haciendo el toast en Datamangement =====================================')
    setToast({ text, type, time, visible: true });
  }

  const hideToast = () => {
    setToast({ ...toast, visible: false });
  }

  return (
    <BrowserRouter>
        <Navigation />
        <div className='container'>
          {isLoading && <Loader />}
          {toast.visible && <Toast text={toast.text} type={toast.type} time={toast.time} onClose={hideToast} />}
          <AppRoutes showLoader={showLoader} showToast={showToast}/>
          <Footer />
        </div>
    </BrowserRouter>
  );
}

export default App;
