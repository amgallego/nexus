import React from 'react';
import ProgramasCard from '../components/Card';

const programas = [
    { nombre: 'Desarrollo de Software', semestres: '10 semestres', clase: 'blue', img: 'Desarrollo de Software.png' },
    { nombre: 'Arte Culinario', semestres: '10 semestres', clase: 'green', img: 'Arte Culinario.png' },
    { nombre: 'Comercio Internacional', semestres: '10 semestres', clase: 'magenta', img: 'Comercio Internacional.png' },
    { nombre: 'Seguridad Laboral', semestres: '10 semestres', clase: 'purple', img: 'Seguridad Laboral.png' },
    { nombre: 'Sistemas Informáticos', semestres: '10 semestres', clase: 'cyan', img: 'Sistemas Informáticos.png' },
    { nombre: 'Producción de Eventos', semestres: '10 semestres', clase: 'yellow', img: 'Producción de Eventos.png' }
];

export default function Services() {
    return (
        <main>
            <h1>¡Bienvenido!</h1>
            <p className="subtitle">Conoce nuestros programas</p>

            {/* Usamos tu clase original de CSS */}
            <section className="program-grid">
                {programas.map((prog, index) => (
                    <ProgramasCard
                        key={index}
                        nombre={prog.nombre}
                        semestres={prog.semestres}
                        clase={prog.clase}
                        img={prog.img}
                    />
                ))}
            </section>
        </main>
    );
}