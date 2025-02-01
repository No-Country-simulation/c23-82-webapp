import { useEffect, useRef, useState } from "react";
import Menufrotante from "../menufrotante/menufrotante";

const Profile = () => {
    const [nombre, setNombre] = useState('');
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

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
    }, []);

    return (
        <div className="border p-2 rounded-xl flex justify-between items-center gap-4 lg:gap-2">
            <img src="img/usuario.png" alt="Usuario" className="w-10 h-10 lg:w-6 lg:h-6" />
            <div className="flex flex-col items-center">
                <h3 className="text-base lg:text-sm">¡Hola!</h3>
                <p className="text-base lg:text-sm">{nombre}</p>
            </div>
            <button
                id="btn-opciones-perfil"
                onClick={toggleMenu}
                ref={buttonRef}
                className="cursor-pointer p-2 z-10"
            >
                <img
                    src="img/flecha-hacia-abajo-para-navegar.png"
                    alt="Menu"
                    className="w-24 h-16 lg:w-12 lg:h-8"
                />
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
    );
};

export default Profile;
