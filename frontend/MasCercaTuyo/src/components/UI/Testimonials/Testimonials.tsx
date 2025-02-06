import React from 'react';

const Testimonials: React.FC = () => {
  // Fictional reviews in Spanish
  const reviews = [
    {
      name: 'Carlos Gómez',
      comment: '"Contraté a un fontanero y llegó puntual, solucionó el problema rápidamente. ¡Muy profesional! Lo recomiendo."',
      stars: 4,
    },
    {
      name: 'María López',
      comment: '"Necesitaba un electricista urgente y encontré uno excelente en la plataforma. El servicio fue impecable y el precio justo."',
      stars: 4,
    },
    {
      name: 'Javier Ruiz',
      comment: '"El técnico que contraté para reparar mi calefacción fue muy amable y eficiente. Definitivamente usaré la plataforma de nuevo. Definitivamente usaré la plataforma de nuevo."',
      stars: 5,
    },
    {
      name: 'Ana Martínez',
      comment: '"Encontré a un pintor muy talentoso. Hizo un trabajo excelente y dejó mi casa como nueva. ¡Gracias!"',
      stars: 5,
    },
  ];    

  return (
    <section className='mt-24'>
      <section className='flex justify-start items-center gap-4 px-48'>
        <figure className='w-16'>
          <img src="./img/testimonios.png" alt="Testimonios" className='w-full h-full' />
        </figure>
        <h2 className='text-xl font-bold text-black'>Testimonios de la comunidad</h2>
      </section>

      <ul className=' pt-4 pb-32 px-48 flex flex-nowrap gap-6 overflow-hidden'>
        {reviews.map((review, index) => (
          <li key={index} className='text-center'>
            <section className='p-2 flex gap-2 bg-white rounded-xs'>
              <svg className='w-10 h-10 fill-current text-transparent stroke-black stroke-1 dark:stroke-white' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="9" r="3" />
                <circle cx="12" cy="12" r="10" />
                <path d="M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5" strokeLinecap="round" />
              </svg>
              <div>
                <p className='text-black'>{review.name}</p>
                {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < review.stars ? 'text-orange-600' : 'text-orange-600 font-semibold'}>
                  {i < review.stars ? '★' : '☆'}
                </span>
                ))}
              </div>
            </section>
            
            <p key={index} className={`h-52 mt-4 p-4  max-w-[12rem] text-ellipsis text-black overflow-hidden rounded-xl bg-gradient-to-b 
            ${index % 2 === 0 ? 'from-white via-orange-300 to-orange-600': 'from-orange-600 via-orange-300 to-white'}`}>
                {review.comment}
            </p>
            
            
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Testimonials;
