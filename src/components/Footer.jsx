import { Footer } from 'flowbite-react';
import uncLogo from '../assets/unc_logo.webp';
import icaffaLogo from '../assets/icaffa_logo.webp';
// import React from 'react'

function FooterComp() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <div className="flex space-x-6">
            <Footer.Brand
              href="https://flowbite.com"
              src={uncLogo}
              alt="Flowbite Logo"
              // name="Flowbite"
            />
            <Footer.Brand
              href="https://yoursecondsite.com"
              src={icaffaLogo}
              alt="Second Logo"
              // name="SecondSite"
            />
            <Footer.Brand
              href="https://yourthirdsite.com"
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Third Logo"
              name="ThirdSite"
            />
          </div>
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="ICAFFA" year={2024} />
      </div>
    </Footer>
  );
}

export default FooterComp;
