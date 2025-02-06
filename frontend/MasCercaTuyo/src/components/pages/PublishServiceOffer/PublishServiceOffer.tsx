import React, { useCallback, useEffect, useState } from 'react'
import Carousel from './Carousel';
import { Controller, useForm } from 'react-hook-form';
import { createServiceOffer } from '../../../services/api.service';
import SelectField from '../../UI/SelectField/SelectField';
import { tiempos, estados, statusClasses, categories, ProviderOffer } from './ServicesData'
import ConfirmationModal from '../../UI/ConfirmationModal/ConfirmationModal';
import TextAreaField from '../../UI/TextAreaField/TextAreaField ';
import UserProfileInfo from '../../UI/UserProfileInfo/UserProfileInfo';
import LocationFormSection from '../../UI/LocationFormSection/LocationFormSection';
import { Link } from 'react-router';
import useGeoLocation from '../../CustomHooks/UseGeoLocation/useGeoLocation';



const PublishServiceOffer: React.FC = () => 
{  
  const [darkMode, setDarkMode]=useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { control, handleSubmit, reset, formState: { errors } } = useForm<ProviderOffer>();
  const [formData, setFormData] = useState<ProviderOffer | null>(null); 
  const [showEditReviewModal, setShowEditReviewModal] = useState(false);
  const [showFinalOffer, setShowFinalOffer] = useState(false);
  const { location, error } = useGeoLocation();

  
  const toggleDarkMode = useCallback(() => 
  {
    setDarkMode((prevMode) => !prevMode);
  }, []);

  const onSubmit = (data: ProviderOffer) => 
  {
    setFormData(data); 

    if(location?.lat && location?.lng)
    {
      data.latitude = location.lat;
      data.longitude = location.lng;
    }

    setShowEditReviewModal(true); console.log('\nooooooo');
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
          formData.idUsuario = parseInt(clientId);          
        }
        else
        {
          return;
        }

        const response = await createServiceOffer(formData); 
        console.log('Registro exitoso:', response);
       
        setShowFinalOffer(false);
        setShowSuccessModal(true);
        reset();
        
      } 
      catch (error) 
      {
        console.error('Error en el registro:', error);
        alert('Hubo un error al enviar la solicitud'); 
      }
    }
  }, [formData]);
  
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
    <div className={`${darkMode && "dark"} `} data-theme={`${darkMode? "dark": "light"}`}>
    <main className={`px-4 sm:px-24 bg-white text-black dark:bg-neutral-800 dark:text-white ${showFinalOffer? 'h-screen overflow-hidden': ''} `}>
        <section className='flex justify-between items-center'>
          <Link
            to="/"
            className=""
          >
            <svg className='h-7 w-7 mt-4 sm:mt-0 fill-current text-white stroke-black stroke-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>        
          <h1 className='pt-4 font-bold text-md'>Publicar Prestación de Servicio</h1>          
          <p> </p>
        </section>
      
      <form onSubmit={handleSubmit(onSubmit)} className='mt-6 sm:gap-8 '>
        <SelectField 
          name={'categoria'}
          showLabel={false}
          control={control}
          defaultValue=''
          rules={{ required: 'Categoría es requerida' }}
          options={categories}
          firstOption='Selecciona la categoria'
          error={errors.categoria}
        />          
          <section className='sm:flex gap-8 sm:px-48 mt-4 text-sm '>
            <section className='basis-2/4 flex flex-col justify-between space-y-4'>
              <Carousel/>
              <UserProfileInfo userName={'Pepito Perez'} rating={4} showContactButtons={false}/>
              <SelectField 
                name='estado'
                showLabel={true}
                label='Estado'
                control={control}
                defaultValue=''
                rules={{ required: 'Estado es requerido' }}
                options={estados}
                firstOption='Urgente/3 días de espera/1 semana de espera/Sin plazo de espera'
                error={errors.estado}
              />

              <section className=''>
                <section className='flex items-center gap-2'>
                  <label htmlFor="costo">Valor</label>
                  <svg className="mt-1 h-4 w-4 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10ZM12 7.75c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 1-1.5 0 2.625 2.625 0 1 1 4.508 1.829c-.092.095-.18.183-.264.267-.216.215-.405.404-.571.617-.22.282-.298.489-.298.662V13a.75.75 0 0 1-1.5 0v-.75c0-.655.305-1.186.614-1.583.229-.294.516-.58.75-.814.07-.07.136-.135.193-.194A1.125 1.125 0 0 0 12 7.75ZM12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></svg>
                </section>
                <Controller 
                  name='costo'
                  control={control}
                  defaultValue={0}
                  rules={{ 
                    required: 'El costo del servicio es requerido', 
                    validate: (costo) => 
                    {
                      const numericValue = costo;
                     
                      if (isNaN(numericValue)) 
                      {
                        return 'El costo debe ser un número válido';
                      }
                      if (numericValue < 0) 
                      {
                        return 'El costo no puede ser negativo';
                      }
                      return true; 
                    }
                  }}
                  render={({ field }) => (
                    <input 
                      id="costo"
                      { ...field }
                      placeholder='$XXXX'
                      className='input input-bordered w-full input-sm'
                    />                    
                  )}
                />
                {errors.costo && <p className='text-red-500 font-semibold'>{errors.costo.message}</p>}
              </section>
            </section>

            <section className='basis-2/4  sm:px-4 space-y-2'>
              <TextAreaField
                name='descripcion'
                control={control}
                defaultValue=''
                rules={{ required: 'Descripción es requerida' }}
                label='Descripción del Servicio'
                error={errors.descripcion}
              />
              <LocationFormSection locationInfo={location}/>
              <SelectField 
                name='tiempoEstimado'
                showLabel={true}
                label='Tiempo Estimado'
                control={control}
                defaultValue=''
                rules={{ required: 'El tiempo estimado del servicio es requerido' }}
                options={tiempos}
                firstOption='Urgente/3 días de espera/1 semana de espera/Sin plazo de espera'
                error={errors.tiempoEstimado}
              />
            </section>
          </section>

          <button type='submit' 
          className='mt-8 p-2 flex items-center gap-2 mx-auto text-xs text-black 
          bg-orange-100 rounded-lg border border-emerald-950
          dark:text-white'
          >
            <svg className='h-4 w-4 fill-current stroke-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M12 7h1v2h2v2H3v2h12v2h-2v2h-1v2h3v-2h2v-2h2v-1h1v-1h1v-2h-1v-1h-1V9h-2V7h-2V5h-3z"/></svg>
            <span className='uppercase'>Siguiente</span>
          </button>

          <a href="" className='mt-8 mb-6 p-2 inline-flex justify-center items-center gap-1 uppercase text-center text-xs
          bg-stone-300 rounded-lg border border-emerald-950
          '>
            <svg className='h-4 w-4 fill-current stroke-black text-transparent' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m3 5.5 2-2m16 2-2-2m-7 5v4l2 2m6-2a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}/></svg>  
            <span>continuar después</span>
          </a>
      </form>

      {showEditReviewModal && 
      <>
         <ConfirmationModal
         show={showEditReviewModal}
         onConfirm={() => 
          { 
            setShowEditReviewModal(false);
            setShowFinalOffer(true);
          }
        }
        onClickXSvg={() => setShowEditReviewModal(false)}
        onCancel={() => 
        {
          handleConfirmation(true);
          setShowEditReviewModal(false);
        }}
        title="" 
        message="¿Deseas revisar tu oferta antes de publicar?"
        acceptText="Sí, revisar"
        declineText="No, publicar"
       />
        </>
      }

        
      {showFinalOffer && formData && (
        <div className="fixed inset-0  bg-white flex justify-center items-center z-50 overflow-y-auto">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg h-screen w-full">
            <h2 className="font-bold text-xl tracking-wider">Prestación de Servicio</h2>
            <h3 className="font-bold text-md uppercase">{categories.find(category => category.value === formData.categoria)?.label || '' }</h3>               
            <section className='sm:flex sm:gap-8 sm:px-64 mt-4 text-sm '>
              <section className='basis-2/4 flex flex-col justify-between space-y-4'>
                <section className=''>
                  <Carousel/> 
                </section>
                
                <UserProfileInfo userName={'Pepito Perez'} rating={4} showContactButtons={true}/>

                <section className='w-full flex justify-between'>
                  <p className={`capitalize text-sm ${statusClasses[formData.estado] || ''}`}> {formData.estado}</p>
                  <p className='capitalize text-sm'>Tiempo estimado: {formData.tiempoEstimado} {parseInt(formData.tiempoEstimado) > 1 ? 'horas': 'hora' }</p>
                </section>

                <section className=''>
                  <section className='flex items-center gap-2'>
                    <p className=''>Valor</p>
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10ZM12 7.75c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 1-1.5 0 2.625 2.625 0 1 1 4.508 1.829c-.092.095-.18.183-.264.267-.216.215-.405.404-.571.617-.22.282-.298.489-.298.662V13a.75.75 0 0 1-1.5 0v-.75c0-.655.305-1.186.614-1.583.229-.294.516-.58.75-.814.07-.07.136-.135.193-.194A1.125 1.125 0 0 0 12 7.75ZM12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></svg>
                  </section>
                  <p className='ml-4 mt-2 text-left capitalize font-bold tracking-wide'>${formData.costo}</p>
                </section>
              </section>


              <section className='basis-2/4 px-4 sm:space-y-2'>             
                <section className='flex flex-col gap-2'>
                  <section className='flex gap-2'>
                    <p className='text-sm'>Descripción del servicio</p>
                    <svg className="mt-1 h-4 w-4 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10ZM12 7.75c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 1-1.5 0 2.625 2.625 0 1 1 4.508 1.829c-.092.095-.18.183-.264.267-.216.215-.405.404-.571.617-.22.282-.298.489-.298.662V13a.75.75 0 0 1-1.5 0v-.75c0-.655.305-1.186.614-1.583.229-.294.516-.58.75-.814.07-.07.136-.135.193-.194A1.125 1.125 0 0 0 12 7.75ZM12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></svg>
                  </section>
                  <p className='py-3 px-2 w-80 h-44 text-left break-words whitespace-normal overflow-y-auto '>{formData.descripcion}</p>
                </section>


                {/* <LocationFormSection /> */}
              </section>
            </section>

            <button type='submit' 
            className='mt-8 py-2 px-4 flex items-center gap-6 mx-auto text-xs text-black 
            bg-orange-100 rounded-lg border border-emerald-950
            dark:text-white'
            onClick={() => setShowModal(true)}

            >
              <svg className='h-4 w-4 fill-current text-emerald-950' viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" ><path d="m14.83 9.5-2.14-3.12a.82.82 0 0 0-1.38 0L9.17 9.5a1 1 0 0 0 .69 1.5H11v10a1 1 0 0 0 2 0V11h1.14a1 1 0 0 0 .69-1.5Z"/><path d="M20 8a1 1 0 0 1-1-1V4H5v3a1 1 0 0 1-2 0V4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1Z" /></svg>
              <span className='uppercase'>Publicar</span>
            </button>

            <button type='button' className='mt-8 mb-6 p-2 inline-flex justify-center items-center gap-2 uppercase text-center text-xs
            bg-stone-300 rounded-lg border border-emerald-950'
            onClick={() => setShowFinalOffer(false)}
            >
              <svg className='h-4 w-4 fill-current stroke-black stroke-1.5 text-transparent' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4"/><path d="M12.5 15.8 22 6.2 17.8 2l-9.5 9.5L8 16l4.5-.2z"/></g></svg>
              <span>Editar</span>
            </button>


            {showModal && (          
              <ConfirmationModal
                show={showModal}
                onConfirm={() => handleConfirmation(true)}
                onClickXSvg={() => handleConfirmation(false)}
                onCancel={() => handleConfirmation(false)}
                title="Publicar tu solicitud" 
                message="¿Estás seguro(a)?"
                acceptText="Sí, Enviar"
                declineText="Cancelar"
              />
            )}
          </div>
        </div>
      )}


      {showSuccessModal && (
        <dialog id="my_modal_2" className="modal modal-open">
          <div className="modal-box flex justify-between" onClick={(e) => e.stopPropagation()}>
            <h2>Se ha publicado con éxito</h2>
            <svg className=" h-7 w-7 stroke-black bg-transparent cursor-pointer " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            ><circle cx="12" cy="12" r="10" /><path d="m14.5 9.5-5 5m0-5 5 5" strokeLinecap="round"/></svg>
          </div> 
          <button type='button' className='absolute top-0 h-screen w-full' onClick={() => setShowSuccessModal(false)}>
          </button>
        </dialog>
      )}

      <button onClick={toggleDarkMode}
       className='absolute w-16 h-16 bottom-16 right-16 bg-neutral-900 rounded-full text-white 
       dark:bg-white dark:text-black font-bold'>
        {darkMode? "Light": "Dark"}
      </button>
    </main>

    </div>
  )
}

export default PublishServiceOffer


