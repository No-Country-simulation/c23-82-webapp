import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { categories } from "../PublishServiceOffer/ServicesData";
import { fetchAllServicesByCategory, fetchAllServicesByCategoryAndProximity } from "../../../services/api.service";
import useGeoLocation from "../../CustomHooks/UseGeoLocation/useGeoLocation";

const ServicesCatalogue: React.FC = () => 
{
    const { category } = useParams();
    const navigate = useNavigate();
    const [services, setServices] = useState<any[]>([]);
    const [categoryExists, setCategoryExists] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingCategory, setIsCheckingCategory] = useState(true);
    const [visibleCount, setVisibleCount] = useState(8);

    const [userLat, setUserLat] = useState<number | null>(null);
    const [userLon, setUserLon] = useState<number | null>(null);
    const [showNearServices, setShowNearServices] = useState(false); 

    const { location, error  } = useGeoLocation();

    const [darkMode, setDarkMode]=useState(false);  


    const categoryLabel = categories.find(cat => cat.value === category)?.label || ''; 

    const toggleDarkMode = useCallback(() => 
    {
        setDarkMode((prevMode) => !prevMode);
    }, []);

    const handleShowMore = () => 
    {
        setVisibleCount((prevCount) => prevCount + 8);
    }

    useEffect(() => 
    {
        const checkCategory = () => 
        {
            const foundCategory = categories.find(cat => cat.value === category);

            setCategoryExists(!!foundCategory?.value);
            
            if(!foundCategory)
            {
                navigate('/404');
            }

            setIsCheckingCategory(false);
        }

        checkCategory();
    }, [category, navigate]);

    useEffect(() => 
    {
        if (location) {
            setUserLat(location.lat);
            setUserLon(location.lng);
        }
    }, [location]);
   

    useEffect(() => {
        const fetchServices = async () => {
            setIsLoading(true);
    
            if (!category) {
                console.error('Category is undefined');
                return;
            }
    
            try 
            {
                let fetchedservices = [];

                if(showNearServices && userLat !== null && userLon !== null)
                {   
                    fetchedservices = await fetchAllServicesByCategoryAndProximity(category, userLat, userLon, 100);   
                }
                else 
                {                   
                    fetchedservices = await fetchAllServicesByCategory(category);
                }
                setServices(fetchedservices);
            } 
            catch(error)
            {
                console.error('Error fetching services:', error);
                setServices([]);
            }
            finally 
            {
                setIsLoading(false); 
            }
        };
    
        if (categoryExists) 
        { 
            fetchServices();
        }
    }, [category, categoryExists, showNearServices, userLat, userLon]); 
    

    if (isCheckingCategory)
    {
        return <p>Checking category...</p>
    }

    if (isLoading)
    {
        return <p>Loading results...</p>
    }

    return (
        <div className={`${darkMode && "dark"} bg-white dark:bg-neutral-900 `} data-theme={`${darkMode? "dark": "light"}`}>
        <main className="px-4 sm:px-48 bg-white dark:bg-neutral-900">
            <h1 className="uppercase pt-8 font-bold text-2xl text-black dark:text-white">{categoryLabel}</h1>            
            <h2 className="w-5/6 inline-flex bg-red-500 border-t bg-gradient-to-b from-gray-50 to-gray-50 py-2 px-2 text-left text-xl text-black">{services.length} resultados</h2>
                
            <button type="button" className=" sticky top-[4.5rem] bg-orange-400 p-3 rounded-full">
                <Link
                to="/"
                className=""
                >                
                    <svg className=" h-8 w-8 stroke-white stroke-2 bg-transparent cursor-pointer " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.391 4.262a1 1 0 0 0-1.46.035l-6.177 6.919a1 1 0 0 0-.254.666V19.5a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V16a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3.5a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7.591a1 1 0 0 0-.287-.7l-6.822-6.947Z"/></svg>
                </Link>  
            </button>
            <div className="flex justify-center space-x-4 mt-4">
                <button
                    type="button"
                    className={`p-3 rounded-full ${!showNearServices ? 'bg-orange-400' : 'bg-gray-300'}`}
                    onClick={() => setShowNearServices(false)}
                >
                    Todos los prestadores
                </button>
                <button
                    type="button"
                    className={`p-3 rounded-full ${showNearServices ? 'bg-orange-400' : 'bg-gray-300'}`}
                    onClick={() => setShowNearServices(true)}
                >
                    Prestadores cercanos
                </button>
            </div>
            <ul className="mt-4 pt-14 pb-28 sm:px-10 grid grid-cols-2 sm:grid-cols-4 gap-y-2 ">
                {isLoading ? (
                    <p>Loading...</p>
                ) : services.length > 0 ?
                (services.slice(0, visibleCount).map((service, index) => (
                    <li key={index}>
                        <div className="w-44 h-56 border rounded-md text-black dark:text-white dark:bg-stone-800">
                            <figure className="h-36">
                                <img
                                src="https://media.istockphoto.com/id/1428071835/photo/man-an-electrical-technician-working-in-a-switchboard-with-fuses.jpg?s=1024x1024&w=is&k=20&c=siUQWIxuONfYjICMMHoeYIhzgpEf3ky8GJeKqnZa1BE="
                                alt="Shoes"
                                className="rounded-t-md w-full h-full " />
                            </figure >
                                <span className="block mt-1 p-1 uppercase text-xs sm:text-[0.5rem] text-left truncate">
                                    
                                    {categories.find(category => category.value === service.categoria)?.label || '' }
                                </span>
                                
                                <h2 className="text-center px-1"><Link to={`/servicios/${category}/${service.servicioId}`} className="mt-4 text-lg underline font-semibold sm:text-md"> {service.nombrePrestador} </Link></h2>
                                <span className="text-md sm:text-xs">Comuna, región</span>
                        </div>
                    </li>
                ))) : (
                    <p>No services yet for this category.</p>
                )}
                {services.length > visibleCount && (
                    <div className="flex justify-center mt-4">
                    <button
                      onClick={handleShowMore}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Show More
                    </button>
                  </div>
                )}
               
            </ul>

            <button onClick={toggleDarkMode}
            className='absolute w-16 h-16 top-16 right-16 bg-neutral-900 rounded-full text-white 
            dark:bg-white dark:text-black font-bold'>
                {darkMode? "Light": "Dark"}
            </button>
        </main>
        </div>
    )
}

export default ServicesCatalogue;