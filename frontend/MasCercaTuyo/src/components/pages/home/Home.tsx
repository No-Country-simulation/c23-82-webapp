import { Link } from 'react-router';
import Footer from '../../UI/footer/footer.tsx';
import HomeHeader from '../../UI/HomeHeader/HomeHeader.tsx';
import  NavBar from '../../UI/navbar/NavBar.tsx';
import HorizontalSlider from '../../UI/HorizontalSlider/HorizontalSlider.tsx';
import Testimonials from '../../UI/Testimonials/Testimonials.tsx';
import './Home.css'


const Home:React.FC = () => 
{ 

  return (
    <div className="bg-white">
      <HomeHeader />
      <main className='bg-black px-16 gradient-background'>
        <NavBar />
        <h1 className='mt-8 text-left text-5xl font-bold tracking-wide'>Un servicio <span className='text-orange-500'>M</span>ás Cerca Tuyo</h1>

        <h2 className='mt-14 text-left text-xl font-semibold'>Encuentra, visualiza y conecta</h2>
        <p className='mt-2 text-left text-sm max-w-md'>Con trabajadores o clientes locales y accede rápidamente a los servicios para el hogar o aumenta tus oportunidades laborales</p>

        <figure className='w-2/4 mx-auto mt-16'>
          <img src="./img/hero-img-nobg.png" alt="" className='w-full h-full'/>
        </figure>

        <figure className='w-2/4 mx-auto mt-20'>
          <img src="./img/hero-subtitle-img.png" alt="" className='w-full h-full'/>
        </figure>


        <section className='mt-24 flex flex-col justify-center gap-8'>
          <Link to={"servicio-solicitar"} className="w-3/12 mx-auto py-2 rounded-xl uppercase text-black text-center bg-orange-100 border border-emerald-950
            dark:text-white">
            Solicitar servicio
          </Link>

          <Link to={"servicio-ofrecer"} className="w-4/12 mx-auto px-24 py-2 rounded-xl uppercase text-black  bg-orange-100 border border-emerald-950
            dark:text-white">
            Ofrecer servicio
          </Link>

        </section>

        <section className='mt-14 px-24 py-12'>

          <HorizontalSlider/>
        </section>


        <section className='mt-16 flex gap-4 text-black'>
          <section className='flex justify-center items-center gap-4 pl-48'>
            <figure className=' w-16'>
              <img src="./img/prestador-destacado.png" alt="" className='w-full h-full'/>
            </figure>
            <section className='text-left'>
              <h2 className='text-xl font-bold'>Prestador(a) destacado(a)</h2>
              <p>¡Felicidades Nombre y apellido por su excelente servicio en Nombre del servicio!</p>
            </section>
          </section>
          <section className='flex items-center gap-4'>
            <figure className='h-full w-16 rounded-lg bg-neutral-300 border border-gray-400'>

            </figure>
            <section className='flex flex-col gap-1 text-black'>
              <button type="button" className='py-1 px-2 rounded-xl bg-orange-100 border border-emerald-900'>Ver Perfil</button>
              <button type="button" className='py-1 px-2 rounded-xl bg-red-100 border border-emerald-900'>Seguir</button>

            </section>
          </section>
        </section>

        <Testimonials/>

      </main>
      <Footer />

      
    </div>
  );
}

export default Home;


// className={`${darkMode && "dark"}`} data-theme={`${darkMode? "dark": "light"}`}


{/* <button onClick={toggleDarkMode}
      className='absolute w-16 h-16 bottom-16 right-16 bg-neutral-900 rounded-full text-white 
      dark:bg-white dark:text-black font-bold'>
      {darkMode? "Light": "Dark"}
      </button> */}


      // const [darkMode, setDarkMode] = useState(false);


      // const toggleDarkMode = useCallback(() => 
      // {
      //     setDarkMode((prevMode) => !prevMode);
      // }, []);