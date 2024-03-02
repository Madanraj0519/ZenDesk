import React from 'react'
import heroVideo from '../../images/hero-v2.mp4'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='mt-5 max-w-5xl mx-auto'>
        <div className='md:flex gap-5 py-10 px-4 md:px-0'>
            <div className='mt-10'>
                <h1 className='text-4xl md:text-7xl font-serif font-semibold'>Unlock the power of customer experiences</h1>
                <h1 className='text-lg md:text-xl font-serif font-medium mt-7'>Build lasting relationships with our complete customer service solution.</h1>
                <div className='flex gap-10 mt-10'>
                    <Link to={'/register'}>
                    <button className='bg-fuchsia-800 px-4 py-2 text-zinc-100 
             font-poppins font-medium text-lg rounded-full'>Start your free trial</button>
                    </Link>
                    <Link to={'/login'}>
                    <button className='px-4 py-2 text-zinc-900 border-2 border-zinc-900
             font-poppins font-medium text-lg rounded-full'>Sign In</button>
                    </Link>
                </div>
            </div>
            <div className='cursor-pointer'>
                <video autoPlay muted loop>
                    <source src={heroVideo} type="video/mp4" />
                </video>
            </div>
        </div>
    </div>
  )
}

export default Hero