import { useCallback, useEffect, useState } from "react";
import LocationFormSection from "../../UI/LocationFormSection/LocationFormSection";
import UserProfileInfo from "../../UI/UserProfileInfo/UserProfileInfo";
import Carousel from "../PublishServiceOffer/Carousel";
import { useNavigate, useParams } from "react-router";
import { categories, statusClasses } from "../PublishServiceOffer/ServicesData";
import { fetchServiceById, hireServiceRequest } from "../../../services/api.service";
import ConfirmationModal from "../../UI/ConfirmationModal/ConfirmationModal";
import useGeoLocation from "../../CustomHooks/UseGeoLocation/useGeoLocation";


export interface RequestedService 
{
  
  idUsuario: number | null;
  idServicio: number;
  status: string;
  fecha: string;
}

interface Location {
  lat: number;
  lng: number;
}

const ServiceDetails: React.FC = () => 
{
    const { category, servicioId } = useParams();
    const [categoryExists, setCategoryExists] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingCategory, setIsCheckingCategory] = useState(true);
    const [service, setService] = useState<any>();
    const [confirmHireModal, setConfirmHireModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [userLocation, setUserLocation] = useState<Location>({ lat: 0, lng: 0 });
    //const { location, error } = useGeoLocation();

    
    const toggleDarkMode = useCallback(() => 
    {
      setDarkMode((prevMode) => !prevMode);
    }, []);
  
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
      if(categoryExists)
      {
        const fetchServices = async () => 
        {
          setIsLoading(true);
                    
          if (!category || !servicioId) 
          {
              console.error('Category or servicioId is undefined');
              return;
          }                
          
          const servicioIdInt = parseInt(servicioId);
    
          try
          {
            const service = await fetchServiceById(servicioIdInt);            

            setUserLocation({ lat: service.latitude, lng: service.longitude });

            setService(service);        

            
            console.log("\n\n \n", service.idServicio)
          }
          catch (error)
          {
              console.error('Error fetching services', error);
          }
          finally
          {
              setIsLoading(false);
          }
        };
    
        fetchServices();
      }
    }, [category, categoryExists, navigate]);
    
    if (isLoading || isCheckingCategory) 
    {
        return <div>Loading...</div>;
    }
  
    if (!service) 
    {
      return <div>No service data found.</div>;
    }

    const stars = Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < 4 ? 'text-orange-600' : 'text-orange-600 font-semibold'}>
          { index < 4 ? '★' : '☆'}
      </span>
    ));

    const handleConfirmation = (confirmed: boolean) => 
    {
      if(confirmed)
      {
        handleHire();
      }
      else 
      {
        handleCancel();
      }
    }

    const handleHire = async () =>
    {
      const storedUserId = localStorage.getItem("userId");
      console.log('Service hired!');

      let clientId: number | null = null;


      if (storedUserId !== null) 
      { 
        const parsedUserId = parseInt(storedUserId, 10); 
      
        if (!isNaN(parsedUserId)) 
        { 
          clientId = parsedUserId; 
        } 
        else 
        {
          console.error("Stored userId is not a valid number:", storedUserId);
        }
      }
      else 
      {
        console.error("userId not found in localStorage");
      }   
             
      const idServicio: number = service.idServicio;
      const status: string = service.estado;
      const fecha: string = new Date().toISOString();

      
      const requestedService: RequestedService = {
        idUsuario: clientId,
        idServicio: idServicio,
        status: status,
        fecha: fecha,
      };

      try 
      {
        console.log(requestedService);
        
        const response = await hireServiceRequest(requestedService);
        console.log('Hired service successfully:', response);
        setConfirmHireModal(false);
        
      } 
      catch (error) 
      {
        console.error('Failed to create hiring request:', error);
      }      
    }

    const handleCancel = () => 
    {
      console.log('Action canceled.');
      setConfirmHireModal(false)
    }

    return(
      <div  className={`${darkMode && "dark"}`} data-theme={`${darkMode? "dark": "light"}`}>
        <div className="fixed inset-0 bg-white text-black  bg-white flex justify-center items-center z-50 overflow-y-auto dark:bg-stone-800">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg h-screen w-full">
            <h2 className="font-bold text-xl tracking-wider">Prestación de Servicio</h2>
            <h3 className="font-bold text-md uppercase">{categories.find(cat => cat.value === service?.categoria)?.label || ''}</h3>               
            <section className='sm:flex sm:gap-8 sm:px-64 mt-4 text-sm '>
              <section className='basis-2/4 flex flex-col justify-between space-y-4'>
                <section className=''>
                  <Carousel/> 
                </section>
                
                <UserProfileInfo userName={'Pepito Perez'} rating={4} showContactButtons={true}/>

                <section className='w-full flex justify-between'>
                  <p className={`capitalize text-sm ${statusClasses[service?.estado] || ''}`}> {service?.estado}</p>
                  <p className='capitalize text-sm'>Tiempo estimado: {service?.tiempoEstimado} {parseInt(service?.tiempoEstimado) > 1 ? 'horas': 'hora' }</p>
                </section>

                <section className=''>
                  <section className='flex items-center gap-2'>
                    <p className=''>Valor</p>
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10ZM12 7.75c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 1-1.5 0 2.625 2.625 0 1 1 4.508 1.829c-.092.095-.18.183-.264.267-.216.215-.405.404-.571.617-.22.282-.298.489-.298.662V13a.75.75 0 0 1-1.5 0v-.75c0-.655.305-1.186.614-1.583.229-.294.516-.58.75-.814.07-.07.136-.135.193-.194A1.125 1.125 0 0 0 12 7.75ZM12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></svg>
                  </section>
                  <p className='ml-4 mt-2 text-left capitalize font-bold tracking-wide'>${service.costo}</p>
                </section>
              </section>


              <section className='basis-2/4 px-4 sm:space-y-2'>             
                <section className='flex flex-col gap-2'>
                  <section className='flex gap-2'>
                    <p className='text-sm'>Descripción del servicio</p>
                    <svg className="mt-1 h-4 w-4 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10ZM12 7.75c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 1-1.5 0 2.625 2.625 0 1 1 4.508 1.829c-.092.095-.18.183-.264.267-.216.215-.405.404-.571.617-.22.282-.298.489-.298.662V13a.75.75 0 0 1-1.5 0v-.75c0-.655.305-1.186.614-1.583.229-.294.516-.58.75-.814.07-.07.136-.135.193-.194A1.125 1.125 0 0 0 12 7.75ZM12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></svg>
                  </section>
                  <p className='py-3 px-2 w-80 h-44 text-left break-words whitespace-normal overflow-y-auto '>{service.descripcion}</p>
                </section>


                <LocationFormSection userLatitude={service.latitude} userLongitude={service.longitude} locationInfo={userLocation}/>
              </section>
            </section>

            <section className="mt-10">
              <h1 className="uppercase text-left sm:pl-72">otras publicaciones destacadas</h1>
              <section className="pt-4 sm:max-w-3xl mx-auto sm:flex sm:gap-1 sm:flex-nowrap  ">
                <section className="mt-2 sm:mt-0 sm:w-1/3 flex gap-1">
                  <figure className="w-1/3 rounded-md">
                    <img src="/img/ubicacion.png" alt="" className="h-full w-full rounded-md object-cover"/>
                  </figure>
                  <section className="w-2/3">
                    <section className="ml-2 text-left sm:ml-0 sm:text-center">
                      {stars}
                    </section>
                    <h2 className="ml-2 text-left font-bold sm:ml-0 sm:font-bold sm:text-center">Reseña</h2>                   
                    <p className="ml-2 text-left sm:ml-0 h-14 break-words text-sm overflow-hidden text-ellipsis">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt repellendus temporibus alias laborum. Aspernatur harum repellat, excepturi numquam quia deserunt blanditiis voluptate vel voluptatibus? Quia recusandae ducimus repellat reprehenderit magni!</p>

                  </section>

                </section>

                <section className="mt-2 sm:mt-0 sm:w-1/3 flex gap-1">
                  <figure className="w-1/3 rounded-md">
                    <img src="/img/ubicacion.png" alt="" className="h-full w-full rounded-md object-cover"/>
                  </figure>
                  <section className="w-2/3">
                    <section className="ml-2 text-left sm:ml-0 sm:text-center">
                      {stars}
                    </section>
                    <h2 className="ml-2 text-left font-bold sm:ml-0 sm:font-bold sm:text-center">Reseña</h2>                   
                    <p className="ml-2 text-left sm:ml-0 h-14 break-words text-sm overflow-hidden text-ellipsis">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt repellendus temporibus alias laborum. Aspernatur harum repellat, excepturi numquam quia deserunt blanditiis voluptate vel voluptatibus? Quia recusandae ducimus repellat reprehenderit magni!</p>

                  </section>

                </section>

                <section className="mt-2 sm:mt-0 sm:w-1/3 flex gap-1">
                  <figure className="w-1/3 rounded-md">
                    <img src="/img/ubicacion.png" alt="" className="h-full w-full rounded-md object-cover"/>
                  </figure>
                  <section className="w-2/3">
                    <section className="ml-2 text-left sm:ml-0 sm:text-center">
                      {stars}
                    </section>
                    <h2 className="ml-2 text-left font-bold sm:ml-0 sm:font-bold sm:text-center">Reseña</h2>                   
                    <p className="ml-2 text-left sm:ml-0 h-14 break-words text-sm overflow-hidden text-ellipsis">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt repellendus temporibus alias laborum. Aspernatur harum repellat, excepturi numquam quia deserunt blanditiis voluptate vel voluptatibus? Quia recusandae ducimus repellat reprehenderit magni!</p>

                  </section>

                </section>

                

              </section>
            </section>

            <section className="mt-4 sm:mt-14 py-8 flex justify-center gap-8 ">
              <button type='button' className='py-2 px-3 flex justify-between items-center gap-2  bg-stone-300 rounded-lg border border-emerald-950 '
              onClick={() => setConfirmHireModal(false)}
              >
                <svg className='h-3 w-3 fill-current stroke-black stroke-2 text-transparent' viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m3 21.32 18-18M3 3.32l18 18" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>Cancelar</span>
              </button>

              <button type='submit' 
              className='py-2 px-4 flex justify-between items-center gap-2 bg-orange-100 rounded-lg border border-emerald-950'
              onClick={() => setConfirmHireModal(true)}
              >
                <svg className='h-4 w-4 fill-current stroke-black stroke-2 text-transparent' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 15.255a7.001 7.001 0 0 0-10.955 4.947c-.028.246-.042.37.007.49.04.097.128.194.22.245.113.063.251.063.528.063h5.145M14 19.286 15.8 21l4.2-4M15 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className='uppercase text-sm'>Contratar</span>
              </button>
            </section>

            <button onClick={toggleDarkMode}
            className='absolute w-16 h-16 bottom-16 right-16 bg-neutral-900 rounded-full text-white 
            dark:bg-white dark:text-black font-bold'>
              {darkMode? "Light": "Dark"}
            </button>

            {confirmHireModal && (          
              <ConfirmationModal
                show={confirmHireModal}
                onConfirm={() => {handleConfirmation(true); setShowSuccessModal(true)}}
                onClickXSvg={() => handleConfirmation(false)}
                onCancel={() => handleConfirmation(false)}
                title="Contratar servicio" 
                message="¿Estás seguro(a)?"
                acceptText="Sí, Enviar"
                declineText="Cancelar"
              />
            )} 
            {showSuccessModal && (
              <dialog id="my_modal_2" className="modal modal-open">
                <div className="modal-box flex justify-between" onClick={(e) => e.stopPropagation()}>
                  <h2>Se ha contratado el servicio con éxito</h2>
                  <svg className=" h-7 w-7 stroke-black bg-transparent cursor-pointer " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  ><circle cx="12" cy="12" r="10" /><path d="m14.5 9.5-5 5m0-5 5 5" strokeLinecap="round"/></svg>
                </div> 
                <button type='button' className='absolute top-0 h-screen w-full' onClick={() => {setShowSuccessModal(false); navigate("/");}}>
                </button>
              </dialog>
            )}
          </div>
        </div>
      </div>
    )
}

export default ServiceDetails;