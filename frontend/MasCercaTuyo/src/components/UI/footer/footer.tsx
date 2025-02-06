function footer() {
    return (

            <footer className="py-8 px-20 bg-[#D2DCDB] rounded p-10 text-black text-sm">
                <nav>
                    <ul className="grid grid-cols-4 gap-8">
                        <li className="text-left">
                            <h4 className="uppercase ">Medios de Pago</h4>
                            <section className="mt-4 flex gap-2">
                                <svg className="w-8 h-8 fill-current stroke-black" viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg"><path d="M32 512a480 480 0 1 0 960 0 480 480 0 1 0-960 0Z" fill="#FFE8CD"/><path d="M224 364.8c0-25.6 19.2-44.8 51.2-44.8h480c25.6 0 51.2 19.2 51.2 44.8v288c0 25.6-19.2 44.8-51.2 44.8h-480c-25.6 0-51.2-19.2-51.2-44.8v-288z" fill="#FF9D1C"/><path d="M224 390.4h576v70.4H224z" fill="#FFCA83"/><path d="M633.6 608c0-12.8 12.8-25.6 25.6-25.6h70.4c12.8 0 25.6 12.8 25.6 25.6v25.6c0 12.8-12.8 25.6-25.6 25.6h-70.4c-12.8 0-25.6-12.8-25.6-25.6V608z" /></svg>
                                <svg className="w-8 h-8 fill-none stroke-black" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" xmlSpace="preserve"><path d="M9.7 4.3 5.5 23c-.3 1 .5 2 1.5 2h5l1.6-6.4c.2-.9 1.1-1.6 2.1-1.6h3.2c3.6 0 6.7-2.5 7.5-6h0c.9-4.1-2.2-8-6.4-8h-8.6c-.9 0-1.5.5-1.7 1.3z"/><path  d="m11.6 25-.6 2.2c-.2.9.5 1.7 1.4 1.7H17l1.4-5.5c.2-.8 1-1.4 1.9-1.4h2.9c3.3 0 6.1-2.2 6.8-5.2h0c.6-2.8-1-5.4-3.5-6.4"/></svg>
                            </section>
                        </li>
                        <li className=" text-left">
                            <h4 className="uppercase">Nosotros</h4>
                            <ul className="mt-4 ">
                                <li>
                                    <a className="hover:underline cursor-pointer">Sobre Mas Cerca Tuyo</a>
                                </li>
                                <li>
                                    <a className="hover:underline cursor-pointer">Contacto</a>
                                </li>
                            </ul>
                        </li>
                        <li className="text-left">
                            <h4 className="uppercase">Centro de Ayuda</h4>
                            <a href="mailto:mascercatuyo@gmail.com" className="block mt-4 hover:underline cursor-pointer">mascercatuyo@gmail.com</a>
                        </li>
                        <li className="text-left">
                            <h4 className="uppercase ">Condiciones y Politica</h4>
                            <ul className="mt-4 text-sm">
                                <li>
                                    <a className="hover:underline cursor-pointer">Centro de la Iniciativa de la plataforma</a>
                                </li>
                                <li>
                                    <a className="hover:underline cursor-pointer">Condiciones de la plataforma</a>

                                </li>
                                <li>
                                    <a className="hover:underline cursor-pointer">Poliica para Desarrolladores</a>

                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                
                <p className="text-sm mt-24">Copyright © {new Date().getFullYear()} - Todos los derechos reservados. Conoce nuestra Política de privacidad.</p>
                <p  className="text-sm">XXXXX Chile SPA.- RUT: XX.XXX.XXX-X. Lorem ipsum dolor sit amet  590, Las Condes, Santiago de Chile.</p>
                <p  className="mt-8 text-sm">Cambiar a la versión mobile</p>
                    
                
            </footer>
        
    )
}

export default footer