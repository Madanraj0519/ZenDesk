import React, { useState } from 'react';
import zenLogo from "../../images/zen-logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import  {Link} from "react-router-dom"

const Header = () => {
    
    const [showMode, setShowMode] = useState(false);

    const links = [
        {
          id: 1,
          link: "Products",
        },
        {
          id: 2,
          link: "Pricing",
        },
        {
          id: 3,
          link: "Solution",
        },
        {
          id: 4,
          link: "Demo",
        },
        {
          id: 5,
          link: "Resource",
        },
      ];

      const toggleShowMode = () => {
        setShowMode(!showMode);
      }

  return (
    <div className='bg-orange-50 w-full sticky mt-5 h-20 border-b-2 border-b-zinc-400'>
        <div className='flex justify-between items-center max-w-5xl mx-auto'>
            <div className='flex-col'>
                <img src={zenLogo} className='w-12 h-8 hidden md:block' />
                <h1 className='text-2xl font-medium md:-ml-5 font-poppins'>Zen desk</h1>
            </div>
            <ul className='flex text-base font-medium font-poppins gap-10 items-center cursor-pointer'>
              {
                links.map(({id, link}) => (
                    <ul key={id}>
                      <li className='hover:scale-105 duration-200 hidden md:block'>{link}</li>
                    </ul>
                ))
              }        
            </ul>
            <Link to={'/register'}>
            <button className='bg-fuchsia-800 px-4 py-2 text-zinc-100 
            font-poppins font-medium text-lg rounded-full hidden md:block'>Start Free Trial</button>
            </Link>
            <div onClick={toggleShowMode} 
                   className='flex  justify-between gap-5 cursor-pointer pr-4 z-10 text-zinc-900 md:hidden'>
            <h1 className='text-base font-medium'>Contact us</h1>
            {
            showMode ? <FaTimes size={30} /> : <FaBars size={30}/>
            }
           </div>
        </div>
        { showMode && (
          <ul className='flex flex-col justify-center items-start absolute
          top-0 left-0 w-full h-screen bg-show-background
           text-zinc-900 '>
  
              {links.map(({ id, link }) => (
                 <ul key={id}
                  className="px-4 cursor-pointer py-4 text-4xl capitalize flex justify-between gap-10 items-center hover:scale-105 duration-200 mx-4">    
                    <li onClick={toggleShowMode} to={link} smooth duration={500}>
                       {link}
                     </li>
                     <MdKeyboardArrowDown />
                  </ul>
              ))}
             <Link to={'/register'}><button className='bg-fuchsia-800 px-8 mt-5 py-2 w-full mx-auto text-zinc-100 
             font-poppins font-medium text-lg rounded-full'>Start Free Trial</button></Link>
             <h1 className='text-base font-medium underline text-center w-full mt-5' >Sign up</h1>
          </ul>
        )}
    </div>
  )
}

export default Header