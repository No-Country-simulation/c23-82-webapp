import { GoogleMap, Libraries, useLoadScript } from "@react-google-maps/api";
import { useEffect, useRef, useState } from 'react';
const GOOGLE_API_MAPS_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GOOGLE_MAPS_ID = import.meta.env.VITE_GOOGLE_MAPS_ID;

interface MapProps 
{
    location: { lat: number; lng: number } | null;
}

const mapContainerStyle = {
    width: '100%',
    height: '210px',
    borderRadius: ".5rem"
};

const center = 
{
    lat: 37.7749,
    lng: -122.4194,

};
const libraries: ("marker")[] = ["marker"];


const Map = ({ location }: MapProps) => 
{
    const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
  
    const { isLoaded, loadError } = useLoadScript(
    {
        googleMapsApiKey: GOOGLE_API_MAPS_KEY,
        libraries: libraries
    });

    const mapOptions = 
    {
        disableDefaultUI: true,
        mapId: GOOGLE_MAPS_ID
    }

    const createRectangleMarkerContent = () => 
    {
        const markerDiv = document.createElement("div");
    
        markerDiv.innerHTML = `
        <div class="mt-16 relative h-14 w-16 mx-auto transform translate-x-1/2 translate-y-1/2">
            <div class="z-10 absolute -top-4 -left-6 h-14 w-14 rounded-full bg-orange-900 opacity-30"></div>
            <div class="z-50 py-1 relative flex justify-center items-center gap-1 w-20 rounded-3xl bg-white">
                <svg class="h-4 w-4 fill-none text-black stroke-2 stroke-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21c3.5-3.6 7-6.824 7-10.8C19 6.224 15.866 3 12 3s-7 3.224-7 7.2 3.5 7.2 7 10.8Z" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Ubicación</span>
            </div>
        </div>
        
        `;

        return markerDiv;
    };

      const markerContent = createRectangleMarkerContent();

   
    useEffect(() => 
    {
        const initializeMarker = async () => 
        {            
            // if (location && mapRef.current) 
            if(location && map)
            {
                // remove existing markers
                if (markerRef.current) 
                {
                    markerRef.current.map = null;
                }
    
                try 
                {
                    // Import the marker library
                    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

                    const pinElement = new PinElement(
                    {
                        background: "#FBBC04",
                        borderColor: "#B29323",
                        glyphColor: "#000",
                    });
                    
                    // Create new marker
                    markerRef.current = new AdvancedMarkerElement(
                    {
                        map,
                        position: location,
                        content: markerContent,
                        title: "Custom Marker",
                        // content: pinElement.element,
                        // title: "Location"
                    });
                } 
                catch (error) 
                {
                    console.error("Error creating marker:", error);
                }
            }
        };
    
        if (isLoaded && location && map) 
        {
          initializeMarker();
        }
    }, [location, map, isLoaded]);

    useEffect(() => 
    {
        return () => 
        {
            if (markerRef.current) 
            {
                markerRef.current.map = null;
            }
        }; 
    }, []);
    
    // console.log(location)

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;


    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={location || center}
            options={mapOptions}
            onLoad={(mapInstance) => 
            {
                setMap(mapInstance);
            }}
        >            
        </GoogleMap>
        
    )
}

export default Map;
