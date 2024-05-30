import React, { useEffect } from 'react';
import '../styles/index.css';

const Toast = ({ text, type, time, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, time);
        return () => clearTimeout(timer);
    }, [time, onClose]);

    return (
        <div className={`toast ${type} show`}>
            <p>{text}</p>
        </div>
    );
};

export default Toast;

