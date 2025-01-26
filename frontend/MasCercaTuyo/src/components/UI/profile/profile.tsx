/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import Menufrotante from "../menufrotante/menufrotante";

function profile() {
    const [nombre, setNombre] = useState('');
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    }

    const opcionesMenu = [
        { texto: 'Registro', liga: '/register' },
        { texto: 'Acceder', liga: '/login' },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsMenuVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef, buttonRef]);

    return (
        <div className="border" style={{ padding: '.2rem 1.5rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <img src="img/usuario.png" alt="" style={{
                width: '2rem'
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <h3>¡Hola!</h3>
                <p>{nombre}</p>
            </div>
            <button
                id="btn-opciones-perfil"
                onClick={toggleMenu}
                ref={buttonRef}
                style={{
                    cursor: 'pointer',
                    padding: '10%',
                }}
            >
                <img src="img/flecha-hacia-abajo-para-navegar.png" alt="Menu" style={{ width: '2rem', height: '2rem' }} />
            </button>
            {isMenuVisible && (
                <div ref={menuRef}>
                    <Menufrotante
                        posicion="arriba centro"
                        opciones={opcionesMenu}
                    />
                </div>
            )}
        </div>
    )
}

export default profile