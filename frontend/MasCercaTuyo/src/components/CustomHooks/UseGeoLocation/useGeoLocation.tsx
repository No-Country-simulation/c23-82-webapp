import { useEffect, useState } from "react"


const useGeoLocation = () => 
{
    const [location, setLocation] = useState<{ lat: number; lng: number} | null>(null);
    const [error, setError] = useState<string | null>(null);
    

    useEffect(() => 
    {
        if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(
                (position) => 
                {
                    setLocation(
                    {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => 
                {
                    setError(error.message);
                }
            );
        }
        else
        {
            setError('Geolocation is not supported by this browser.');
        }
    }, [])

    return { location, error }
}
export default useGeoLocation;