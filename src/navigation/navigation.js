import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from './routes.json';
import iconLogo from '../assets/images/pulpeybox-white.svg'

const Navigation = () => (
  <nav className="navigation">
    <ul className="navigation__list">
      {routes.map((route, index) => (
        <li key={index} className="navigation__item">
          {route.path == 'icon'? 
              <img
                src={iconLogo}  // Reemplaza "route.imageUrl" con la ruta de tu imagen
                alt={route.title}     // Usa el título de la ruta como texto alternativo
                className="navigation__image"
              />
            :
              <NavLink
                to={route.path}
                activeclassname="navigation__link--active"
                className={({ isActive }) =>
                  isActive
                    ? 'navigation__link navigation__link--active'
                    : 'navigation__link'
                }
              >
                {route.title}
              </NavLink>
          }
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;