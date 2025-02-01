/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import Likes from "../likes/likes";
import Notifications from "../notifications/notifications";
import Profile from "../profile/profile";

function menu() {

    const [location, setLocation] = useState('');

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
        <div style={{ display: "flex", gap: "1rem", width: "100%", padding: "1rem" }}>
            <img src="svg/logo.svg" alt="logo" width={40} />
            <input type="search" placeholder="Search" style={{ backgroundColor: 'white', border: 'solid 1px black', borderRadius: '1rem', padding: '0.5rem', width: '40%' }} />
            <Profile />
            <Likes />
            <Notifications />
            <div id="location" style={{ display: "flex", flexDirection: "column" }}>
                {location}
            </div>
        </div>
    )
}

export default menu;