function footer() {
    return (
        <div style={{
            width: '100%',
        }}>
            <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
                <nav className="grid grid-flow-col gap-40">
                    <nav className="grid grid-flow-row">
                        <h6 className="footer-title">Medios de Pago</h6>
                    </nav>
                    <nav className="grid grid-flow-row">
                        <h6 className="footer-title">Nosotros</h6>
                        <a className="link link-hover">Acerca de Mas Cerca Tuyo</a>
                        <a className="link link-hover">Contacto</a>
                    </nav>
                    <nav className="grid grid-flow-row">
                        <h6 className="footer-title">Centro de Ayuda</h6>
                        <a href="mailto:mascercatuyo@gmail.com" className="link link-hover">mascercatuyo@gmail.com</a>
                    </nav>
                    <nav className="grid grid-flow-row">
                        <h6 className="footer-title">Condiciones y Politica</h6>
                        <a className="link link-hover">Centro de la Iniciativa de la plataforma</a>
                        <a className="link link-hover">Condiciones de la plataforma</a>
                        <a className="link link-hover">Poliica para Desarrolladores</a>
                    </nav>
                </nav>
                <aside>
                    <p>C
                        Copyright © {new Date().getFullYear()} - Todos los derechos reservados.
                        <br />
                        Conoce nuestra Política de privacidad.
                        <br />
                        XXXXX Chile SPA.- RUT: XX.XXX.XXX-X.
                        <br />
                        Lorem ipsum dolor sit amet  590, Las Condes, Santiago de Chile.
                        <br />
                        Cambiar a la versión mobile
                        <br />
                    </p>
                </aside>
            </footer>
        </div>
    )
}

export default footer