import React from 'react';
import '../../../index.css';

interface MenuOption {
    texto: string;
    liga: string;
    icono?: React.ReactNode;
}

interface MenuFlotanteProps 
{
    opciones: MenuOption[];
    background?: string;
    onClose?:() => void;
}

function MenuFlotante({ opciones, background, onClose }: MenuFlotanteProps) 
{
    
    return (
        <div className={` w-2/12 fixed left-1/2 -translate-x-1/2 top-16 flex flex-col flex-start z-50 gap-4 rounded-md shadow-lg p-4 bg-white border`}>
            <button type='button' className="w-full flex justify-end ">
                <svg
                    className="h-5 w-5 stroke-black stroke-2 bg-transparent cursor-pointer fill-none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={onClose} 
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m14.5 9.5-5 5m0-5 5 5" strokeLinecap="round" />
                </svg>
            </button>

            <hr className='border w-full'/>

            {opciones.map((opcion, index) => (
                <a key={index} href={opcion.liga} className={`py-2 w-full rounded-md text-sm ${background}`}  >
                    {opcion.icono && <span className="">{opcion.icono}</span>}
                    {opcion.texto}
                </a>
            ))}
        </div>
    )
}

export default MenuFlotante;