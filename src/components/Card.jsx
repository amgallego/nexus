import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ nombre, semestres, clase, img }) {
    return (
        <Link to={`/programa/${nombre.toLowerCase().replace(/\s+/g, '-')}`} className={clase}>
            <div className="program">
                <img
                    src={`/src/assets/Imagenes/${img}`}
                    alt={nombre}
                />
                <p>{nombre}</p>
                <span>{semestres}</span>
            </div>
        </Link>
    );
}