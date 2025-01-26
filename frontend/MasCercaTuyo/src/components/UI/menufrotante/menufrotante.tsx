import React from 'react';
import '../../../index.css';

interface MenuOption {
    texto: string;
    liga: string;
    icono?: React.ReactNode;
}

interface MenuFrotanteProps {
    posicion: 
        | 'arriba centro' 
        | 'arriba izquierda' 
        | 'arriba derecha' 
        | 'abajo izquierda' 
        | 'abajo centro' 
        | 'abajo derecha';
    opciones: MenuOption[];
}

function menufrotante({ posicion, opciones }: MenuFrotanteProps) {
    return (
        <div className={`menu-frotante ${posicion}`}>
            {opciones.map((opcion, index) => (
                <a key={index} href={opcion.liga} className="menu-opcion">
                    {opcion.icono && <span className="icono">{opcion.icono}</span>}
                    {opcion.texto}
                </a>
            ))}
        </div>
    )
}

export default menufrotante