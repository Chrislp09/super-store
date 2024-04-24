import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from './routes.json';

const Navigation = () => (
  <nav className="navigation">
    <ul className="navigation__list">
      {routes.map((route, index) => (
        <li key={index} className="navigation__item">
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
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;