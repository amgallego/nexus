import React from 'react';
import { Link } from 'react-router-dom';

function Detalle ({ career }) {
  return (
    <div className="career-container">

      <h1 className="career-title">
        {career.title}
      </h1>

      <div className="career-image-container">
        <img
          src={career.image}
          alt={career.title}
          className="career-image"
        />
      </div>

      <h2 className="section-title">
        Título Otorgado
      </h2>

      <p className="career-text">
        {career.degree}
      </p>

      <h2 className="section-title">
        Presentación del programa
      </h2>

      <p className="career-description">
        {career.description}
      </p>

      <ul className="career-info">
        <li>
          <strong>Duración:</strong> {career.duration}
        </li>

        <li>
          <strong>Modalidad:</strong> {career.modality}
        </li>

        <li>
          <strong>Jornada:</strong> {career.schedule}
        </li>
      </ul>

      <h2 className="section-title">
        Requisitos
      </h2>

      <ul className="requirements-list">
        {career.requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>

      <div className="buttons-container">

        <button className="btn">
          Regresar al Menú Principal
        </button>

        <button className="btn">
          Formulario de Inscripción
        </button>

      </div>

    </div>
  );
}

export default Detalle;