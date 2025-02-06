
interface UserProfileInfoProps 
{
    userName: string;
    rating: number;
    showContactButtons: boolean;
}

const UserProfileInfo: React.FC<UserProfileInfoProps> = ({ userName, rating, showContactButtons }) => 
{
    const stars = Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? 'text-orange-600' : 'text-orange-600 font-semibold'}>
            { index < rating ? '★' : '☆'}
        </span>
    ));

    return (        
        <section className='py-4 px-6 flex justify-between items-center gap-2 border-b border-gray-300 dark:border-white'>
            <section className='flex gap-2'>
              <svg className='w-10 h-10 fill-current text-transparent stroke-black stroke-1 dark:stroke-white' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="9" r="3" /><circle cx="12" cy="12" r="10"/><path d="M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5" strokeLinecap="round"/></svg>
              <section className=' text-left'>
                <h2 className='font-semibold'>{userName}</h2>    
                {stars}
              </section>
            </section>
            {showContactButtons && <section className='flex gap-1.5 justify-around'>
              <button className='p-2 bg-orange-100 shadow-lg' type='button'><svg className='w-4 h-4 fill-current text-transparent stroke-black stroke-2 dark:stroke-white cursor-pointer' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#a)" ><path d="M17.36 20H6a2 2 0 0 1-2-2v-8h3.93a2 2 0 0 0 1.664-.89l2.516-3.774A3 3 0 0 1 14.606 4h.214a1 1 0 0 1 .986 1.164L15 10h3.56a2 2 0 0 1 1.962 2.392l-1.2 6A2 2 0 0 1 17.36 20Z" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 10v10"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg></button>
              <button className='p-2 bg-orange-100 shadow-lg' type='button'><svg className='w-4 h-4 fill-current text-transparent stroke-black stroke-2 dark:stroke-white cursor-pointer' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 14V4m0 10H4V4h4m0 10 5.196 6.061a2 2 0 0 0 2.003.64l.048-.013a2 2 0 0 0 1.179-3.05L14 14h4.56a2 2 0 0 0 1.962-2.392l-1.2-6A2 2 0 0 0 17.36 4H8" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
              <button className='p-2 bg-orange-100 shadow-lg' type='button'><svg className='w-4 h-4 fill-current text-transparent stroke-black stroke-2 dark:stroke-white cursor-pointer' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m10.3 13.695 9.802-9.798m-9.523 10.239 2.223 4.444c.537 1.075.806 1.612 1.144 1.756a1 1 0 0 0 .903-.061c.316-.188.51-.757.898-1.893l4.2-12.298c.338-.99.506-1.485.39-1.813a1 1 0 0 0-.609-.61c-.328-.115-.823.054-1.813.392l-12.297 4.2c-1.137.387-1.705.581-1.893.897a1 1 0 0 0-.061.904c.144.338.681.607 1.755 1.143l4.445 2.223c.177.088.265.133.342.192a1 1 0 0 1 .182.181c.059.077.103.166.191.343Z" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            </section>}
                
        </section>
    )
}

export default UserProfileInfo;