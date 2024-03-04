import React from 'react'
import heroVideo from '../images/hero-v2.mp4'
import { Link } from 'react-router-dom';
import Zendesk from "../images/Zendesk-Symbol.png";

const login = () => {
  return (
    <div className='max-w-7xl mx-auto'>
        <div className='md:flex justify-between items-center'>
          <img className='w-32 h-32 mx-20 object-contain' src={Zendesk} />
          <Link to={'/create-ticket'}><h4 className='mt-16 mr-10 text-base text-zinc-700 px-2 bg-zinc-300 p-1 rounded-lg bg-opacity-40'>Create custom tickets</h4></Link>
        </div>
        <div className='md:flex justify-between gap-5 items-start py-5 md:mx-20 shadow-lg'>
            <div className='mx-8 max-w-5xl'>
                <h1 className='text-4xl text-emerald-900 font-serif font-semibold whitespace-nowrap'>Sign in to Zendesk</h1>
                <div className='text-center w-full mt-8'>
                   <Link to={'/admin-login'}><button className='bg-emerald-900 hover:bg-emerald-800 w-full p-3 font-medium text-xl text-white' type='submit'>Admin Login</button></Link>
                </div>
                <div className='text-center w-full mt-4'>
                   <Link to={'/employee-login'}><button className='border-2 border-emerald-900 w-full hover:text-white hover:bg-emerald-900 p-3 font-medium text-xl text-emerald-900' type='submit'>Employee Login</button></Link>
                </div>
            </div>
            <div className='flex justify-between items-center p-8 bg-cyan-50 max-w-4xl h-full mx-8 '>
                <div>
                  <h1 className='text-4xl font-serif font-semibold'>What is new</h1>
                  <p className='text-lg md:text-xl font-serif font-medium mt-7 px-4'>Join us at What is New for the latest in Workforce Engagement Management and AI advancements</p>
                  <button className='bg-emerald-900 w-40 flex justify-center p-3 font-medium text-xl mt-3 text-white' type='submit'>Learn More</button>
                </div>
                <div className='max-w-xl' >
                  <img className='w-64 h-64 object-cover' src='https://static.vecteezy.com/system/resources/thumbnails/024/770/617/small_2x/happy-student-cheerful-asian-girl-smiling-to-camera-photo.jpg'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default login