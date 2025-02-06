import React, { useCallback, useEffect, useState } from 'react'
import Carousel from './Carousel';
import { useForm } from 'react-hook-form';
import { createServiceRequest } from '../../../services/api.service';
import SelectField from '../../UI/SelectField/SelectField';
import { plazos, categories, ClientRequestService } from '../PublishServiceOffer/ServicesData'
import TextAreaField from '../../UI/TextAreaField/TextAreaField ';
import { Link, useNavigate } from 'react-router';
import UserProfileInfo from '../../UI/UserProfileInfo/UserProfileInfo';
import LocationFormSection from '../../UI/LocationFormSection/LocationFormSection';
import useGeoLocation from '../../CustomHooks/UseGeoLocation/useGeoLocation';


const PublishServiceRequest: React.FC = () => 
{  
  const [darkMode, setDarkMode] = useState(false);
  const { control, handleSubmit, reset, formState: { errors } } = useForm<ClientRequestService>();
  const [formData, setFormData] = useState<ClientRequestService | null>(null); 
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const { location, error } = useGeoLocation();

  const toggleDarkMode = useCallback(() => 
  {
    setDarkMode((prevMode) => !prevMode);
  }, []);

  const onSubmit = (data: ClientRequestService) => 
  {
    if(location?.lat && location?.lng)
    {
      data.latitude = location.lat;
      data.longitude = location.lng;
        
    }
      
    setFormData(data); 
    setShowModal(true);
  };
  
  const handleConfirmation = useCallback(async (confirmed: boolean) => 
  {
    setShowModal(false); 

    if (confirmed && formData) 
    {
      try 
      {        
        const clientId = localStorage.getItem("userId");

        if(clientId !== null)
        {
          formData.solicitanteId = parseInt(clientId);          
        }
        else
        {
          return;
        }

        console.log(location);

       
        const response = await createServiceRequest(formData); 
        console.log('Registro exitoso:', response);
        
        setShowSuccessModal(true);
        reset();
        
        const searchedCategory = formData.categoria;

        setTimeout(() => 
        {
          navigate(`/servicios/${searchedCategory}`);
        }, 2000)
      } 
      catch (error) 
      {
        console.error('Error en el registro:', error);
        alert('Hubo un error al enviar la solicitud'); 
      }
    }
  }, [formData, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowSuccessModal(false);
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSuccessModal]);

  return (
    <div className={`${darkMode && "dark"}`} data-theme={`${darkMode? "dark": "light"}`}>
      
    <main className="px-4 sm:px-24 bg-white text-black dark:bg-neutral-800 dark:text-white">
      <header className='pt-4 space-y-2 sm:px-52'>
        <section className='flex justify-between items-center'>
          <Link
            to="/"
            className=""
          >
            <svg className='h-7 w-7 fill-current text-white stroke-black stroke-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>        
          <h1 className='font-bold text-xl sm:text-md'>¡Atención!</h1> 
          <p> </p>
        </section>
        <p className='px-10 text-lg font-medium sm:px-0 sm:text-sm sm:tracking-wide font-semibold'>Usuario necesita el siguiente servicio en su hogar</p>
      </header>             
        <form onSubmit={handleSubmit(onSubmit)} className='mt-6 gap-8 '>
          <SelectField 
            name='categoria'
            showLabel={false}
            control={control}
            defaultValue=''
            rules={{ required: 'Categoría es requerida' }}
            options={categories}
            firstOption='Selecciona la categoria'
            error={errors.categoria}
          />  
                        
          <section className='sm:flex gap-8 sm:px-48 mt-4 text-sm '>
          
            <section className='basis-2/4 flex flex-col justify-between'>
              <section className='basis-3/4 '>
                <Carousel/>
              </section>
              <section  className='basis-1/4'>
                <UserProfileInfo userName={'Pepito Perez'} rating={4} showContactButtons={false}/>
              </section>
            </section>

            <section className='basis-2/4  px-4 space-y-2'>
              <TextAreaField
                name='descripcion'
                control={control}
                defaultValue=''
                rules={{ required: 'Descripción es requerida' }}
                label='Descripción del Servicio'
                error={errors.descripcion}
              />
              <LocationFormSection locationInfo={location}/>
              {/* {location && <Map location={location} />} */}
              <SelectField 
                name='plazos'
                showLabel={true}
                label='Estado'
                control={control}
                defaultValue=''
                rules={{ required: 'Estado es requerido' }}
                options={plazos}
                firstOption='Urgente/3 días de espera/1 semana de espera/Sin plazo de espera'
                error={errors.plazos}
              />         
            </section>

          </section> 

          <button type='submit' 
          className='mt-8 p-2 flex items-center gap-6 mx-auto text-xs text-black 
          bg-orange-100 rounded-lg border border-emerald-950
          dark:text-white text-sm sm:text-xs' 
          >
            <svg className='h-3 w-3 fill-current text-emerald-950' viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" ><path d="m14.83 9.5-2.14-3.12a.82.82 0 0 0-1.38 0L9.17 9.5a1 1 0 0 0 .69 1.5H11v10a1 1 0 0 0 2 0V11h1.14a1 1 0 0 0 .69-1.5Z"/><path d="M20 8a1 1 0 0 1-1-1V4H5v3a1 1 0 0 1-2 0V4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1Z" /></svg>
            <span className='uppercase'>publicar y buscar</span>
            <svg className=" w-3 h-3 text-emerald-950 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </button>

          <a href="" className='mt-8 mb-6 p-2 inline-flex justify-center items-center gap-1 uppercase text-center 
          bg-stone-300 rounded-lg border border-emerald-950 text-sm sm:text-xs
          '>
            <svg className='h-4 w-4 fill-current stroke-black text-transparent' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m3 5.5 2-2m16 2-2-2m-7 5v4l2 2m6-2a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}/></svg>  
            <span>continuar después</span>
          </a>
        </form>
        

        <button onClick={toggleDarkMode}
         className='absolute w-16 h-16 bottom-16 right-16 bg-neutral-900 rounded-full text-white 
         dark:bg-white dark:text-black font-bold'>
          {darkMode? "Light": "Dark"}
        </button>

        {showModal && (
          <dialog className="modal modal-open">
            <div className="modal-box max-w-xs">
              
              <svg className="float-right h-7 w-7 stroke-black bg-transparent cursor-pointer " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleConfirmation(false)}><circle cx="12" cy="12" r="10" /><path d="m14.5 9.5-5 5m0-5 5 5" strokeLinecap="round"/></svg>
              
              <h3 className="mt-8 font-bold text-lg">Publicar tu solicitud</h3>
              <p className="py-4">¿Estás seguro(a)?</p>
              <div className="modal-action flex justify-center">
                <button className="btn bg-orange-100 rounded-lg border border-emerald-950" onClick={() => handleConfirmation(true)}>
                  Sí, Enviar
                </button>
                <button className="btn bg-stone-300 rounded-lg border border-emerald-950" onClick={() => handleConfirmation(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </dialog>
        )}

        {showSuccessModal && (
          <dialog id="my_modal_2" className="modal modal-open">
            <div className="modal-box flex justify-between" onClick={(e) => e.stopPropagation()}>
              <h2>Se ha publicado con éxito. A continuación se presentan resultados de tu busqueda</h2>
              <svg className=" h-7 w-7 stroke-black bg-transparent cursor-pointer " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              ><circle cx="12" cy="12" r="10" /><path d="m14.5 9.5-5 5m0-5 5 5" strokeLinecap="round"/></svg>
            </div> 
            <button type='button' className='absolute top-0 h-screen w-full' onClick={() => setShowSuccessModal(false)}>
            </button>
          </dialog>
        )}
    </main>

    </div>
  )
}

export default PublishServiceRequest