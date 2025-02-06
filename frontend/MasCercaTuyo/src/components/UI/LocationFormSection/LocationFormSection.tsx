import { useEffect, useState } from "react";
import Map from "../../CustomHooks/Map/Map";
import InfoIcon from "../InfoIcon/InfoIcon";


interface LocationFormSectionProps
{
    locationInfo: { lat: number; lng: number } | null; // Define the prop type
    userLatitude?: number | null;
    userLongitude?: number | null
}

const LocationFormSection: React.FC<LocationFormSectionProps> = ({ locationInfo, userLatitude, userLongitude }) => 
{
    const [userLocation, setuserLocation] = useState('');

    const getLocation = () => {
        if (navigator.geolocation) 
        {
            navigator.geolocation.getCurrentPosition(
                async (position) => 
                {
                    const { latitude, longitude } = position.coords;

                    const lat = userLatitude ?? latitude;
                    const lng = userLongitude ?? longitude;

                    try 
                    {
                        
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
                        const data = await response.json();
                        const { city, state, country } = data.address;
                        setuserLocation(`${city}, ${state}, ${country}`);
                    }
                    catch (error) 
                    {
                        setuserLocation(`Error al obtener la ubicación: ${(error as Error).message}`);
                    }
                },
                (error) => 
                {
                    setuserLocation(`Error al obtener la ubicación: ${error.message}`);
                }
            );
        } 
        else 
        {
            setuserLocation('Geolocalización no disponible en este navegador.');
        }
    };

    useEffect(() =>
    {
        getLocation();
    }, []);

    return (

    <div>
        <div className="flex items-center gap-2">
            <p className="text-lg sm:text-md">Ubicación</p>
            <InfoIcon />
        </div>
        <p className="block text-left text-gray-600 font-extralight">{userLocation}</p>
        {locationInfo && <Map location={locationInfo} />}
    </div>
    )
}

export default LocationFormSection;



{/* <img src="/img/ubicacion.png" alt="Mapa de ubicación" className="rounded-lg cursor-pointer" /> */}