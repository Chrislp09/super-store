import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import routes from './routes.json';
import Home from '../views/Home';
import Contact from '../views/Contact';
import About from '../views/About';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Store from '../views/Store';
import DataManagement from '../views/DataManagement';

const AppRoutes = ({showLoader}) => {
  const location = useLocation();

  const getComponent = (componentName, title) => {
    switch (componentName) {
      case 'Home':
        return <Home title={title} showLoader={showLoader} />;
      /* case 'Store':
        return <Store title={title} showLoader={showLoader} />; */
      case 'DataManagement':
        return <DataManagement title={title} showLoader={showLoader} />;
      case 'About':
        return <About title={title} showLoader={showLoader} />;
      case 'Contact':
        return <Contact title={title} showLoader={showLoader} />;
      default:
        return null;
    }
  };

  return(
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="slide" timeout={300}>
        <Routes location={location}>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              element={getComponent(route.component, route.title)}
            />
          ))}
      </Routes>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default AppRoutes;