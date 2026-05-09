import React from 'react';

export default function ProgramasCard({ nombre, semestres, clase, img }) {
    return (
        <a href={`/${nombre}.html`} className={clase}>
            <div className="program">
                <img
                    src={`/src/assets/Imagenes/${img}`}
                    alt={nombre}
                />
                <p>{nombre}</p>
                <span>{semestres}</span>
            </div>
        </a>
    );
}