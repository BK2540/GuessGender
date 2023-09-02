import { Link } from 'react-router-dom';
import arrow from '../assets/arrow.png';
import hero from '../assets/hero.png';

const Home = () => {
  return (
    <div className='flex flex-col h-screen px-12 py-8 md:px-24 md:py-12 font-poppins'>
        {/* LOGO */}
        <div>
            <h3 className='font-semibold text-secondary-blue text-center md:text-left md:text-base text-xs'>GuessGender</h3>
        </div>

        {/* CONTENT CONTAINER */}
        <div className='flex-center flex-col md:flex-row '>
        {/* LEFT SIDE */} 
        <div className='flex-1 sm:flex-center'>
            <div className='text-center md:text-start py-6 md:py-14'>
                <p className='text-xl md:text-3xl font-semibold'>Let we guess your</p>
                <h2 className='font-bold text-secondary-blue text-2xl md:text-5xl py-4 md:py-10'>GENDER</h2>
                <p className='text-xl md:text-3xl font-semibold'>by</p>
                <h2 className='font-bold text-secondary-blue text-2xl md:text-5xl py-4 md:py-10'>Name</h2>
            </div>
           
           <Link to='/guess'>
           <button className="main_button flex-center gap-2">
                Get started
                <img src={arrow} alt="start" className='w-[18px] h-2 md:w-[24px] md:h-3' />
            </button>
           </Link>
            
            
            
        </div>

        {/* RIGHT SIDE */}
        <div className='flex-center mt-12 md:mt-0 w-[310px] h-[350px] md:w-[600px] md:h-[580px]'>
            <img src={hero} alt="hero-image" className='w-full h-full object-contain' />
        </div>

        </div>        
    </div>
  )
}

export default Home