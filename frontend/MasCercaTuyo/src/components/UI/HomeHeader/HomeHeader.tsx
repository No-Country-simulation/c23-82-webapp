/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useState } from "react";

import Profile from "../HeaderUserSection/HeaderUserSection";

function HomeHeader() {

    const [location, setLocation] = useState('');
    const [seguidores, setSeguidores] = useState(0);
    const [seguidos, setSeguidos] = useState(0);    

    

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
                        const data = await response.json();
                        const { city, state, country } = data.address;
                        setLocation(`${city}, ${state}, ${country}`);
                    } catch (error) {
                        setLocation(`Error al obtener la ubicación: ${(error as Error).message}`);
                    }
                },
                (error) => {
                    setLocation(`Error al obtener la ubicación: ${error.message}`);
                }
            );
        } else {
            setLocation('Geolocalización no disponible en este navegador.');
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <div >
            <div className="flex justify-around items-center px-8 py-2 bg-white dark:bg-neutral-900 text-black dark:text-white">
                <figure className="w-14">
                    <img src="svg/logo.svg" alt="logo" className="w-full h-full" />
                </figure>
                <form className=" ">   
                    <label htmlFor="default-search" className="text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
                        <svg className="mt-0.5 w-3 h-3 text-black dark:text-gray-400 stroke-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        </div>
                        <input type="search" id="default-search" 
                        className=" p-2 ps-8 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-white shadow-xl
                        focus:ring-blue-500 focus:border-blue-500 focus:ring-1 outline-none
                        dark:bg-stone-600 dark:border-none
                        "
                        placeholder="Buscar servicios ..." 
                        required />
                    </div>
                </form>
                <Profile />
                

                <button type="button">
                    <svg className="w-7 h-7 stroke-black text-black dark:text-gray-400 stroke-1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.002 17H5.606c-1.258 0-1.887 0-2.02-.098-.148-.11-.185-.174-.2-.358-.015-.164.37-.795 1.142-2.057C5.324 13.184 6 11.287 6 8.6c0-1.485.632-2.91 1.758-3.96C8.883 3.59 10.409 3 12 3c1.592 0 3.118.59 4.243 1.64C17.368 5.69 18 7.115 18 8.6c0 2.686.677 4.584 1.473 5.887.771 1.262 1.157 1.893 1.143 2.057-.017.184-.053.248-.202.358-.132.098-.761.098-2.02.098H15m-5.998 0L9 18a3 3 0 1 0 6 0v-1m-5.998 0H15" strokeLinecap="round" strokeLinejoin="round"/></svg>

                </button>
            
                <div className="flex items-center">
                    <svg className="h-4 w-4 fill-current text-orange-500 stroke-2 stroke-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21c3.5-3.6 7-6.824 7-10.8C19 6.224 15.866 3 12 3s-7 3.224-7 7.2 3.5 7.2 7 10.8Z" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="font-semibold underline">{location}</span>
                </div>

                
            </div>
        </div>
        
    )
}

export default HomeHeader;