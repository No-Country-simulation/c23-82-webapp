/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";

function profile() {
    const [nombre, setNombre] = useState('Usuario');
    const getUsuario = () => {
        setNombre('Usuario');
    }
    return (
        <div className="border" style={{ padding: '.2rem 1.5rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <img src="img/usuario.png" alt="" style={{
                width: '2rem'
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <h3>¡Hola!</h3>
                <p>{nombre}</p>
            </div>
        </div>
    )
}

export default profile