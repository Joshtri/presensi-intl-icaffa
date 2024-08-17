import React from 'react'
import NavbarComp from '../components/Navbar'
import FooterComp from '../components/Footer'

// eslint-disable-next-line react/prop-types
function Layout({children}) {
  return (
    <React.Fragment>
        <NavbarComp/>
        <main className=' p-7 bg-gray-200'>
            {children}
        </main>

        <FooterComp/>
    </React.Fragment>
  )
}

export default Layout