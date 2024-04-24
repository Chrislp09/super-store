import React from 'react';

const Footer = () => (
    <footer className="footer">
        <div className="footer__copyright">
            <p>&copy; {new Date().getFullYear()} Chris López. Todos los derechos reservados.</p>
        </div>
    </footer>
);

export default Footer;