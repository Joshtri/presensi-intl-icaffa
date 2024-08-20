// import React from 'react'
import icaffaLogo from '../assets/icaffa_logo.webp';


function NavbarComp() {
  return (
    <>
        <nav className="bg-green-700 p-4 shadow-md">
        <div className="container mx-auto flex  items-center">
          <img src={icaffaLogo} className="mr-3 h-10 sm:h-10" alt="ICAFFA Logo" />
            <a href="#" className="text-white text-2xl font-semibold">ICAFFA Registery</a>
            <div className="flex space-x-4">
            {/* <a href="#" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">Home</a> */}

            </div>
        </div>
        </nav>
    </>
  )
}

export default NavbarComp