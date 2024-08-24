import { Footer } from 'flowbite-react';
import uncLogo from '../assets/unc_logo.webp';
import icaffaLogo from '../assets/icaffa_logo.webp';
import arsenetLogo from '../assets/arsenet.webp';
import bluspeedLogo from '../assets/blu_speed.webp';
import fitofatologiLogo from '../assets/fitofatulogi.webp';
import ioppublishingLogo from '../assets/iop_publishing.webp';
import merdekaLogo from '../assets/kampus_merdeka.webp';
import unimorLogo from '../assets/unimor.webp';
import univkatolikindoLogo from '../assets/univ_katolik_indonesia.webp';
import untlLogo from '../assets/untl.webp';
import yayasanLogo from '../assets/yayasan.png';
import jplLogo from '../assets/jpl.png';

function FooterComp() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <div className="grid grid-cols-3 gap-4 sm:flex sm:space-x-5 justify-center">
            <Footer.Brand
              href="https://fst.undana.ac.id/"
              src={uncLogo}
              alt="UNDANA Logo"
              className="w-full h-auto sm:w-auto"
            />
            <Footer.Brand
              href="https://icaffa.com"
              src={icaffaLogo}
              alt="ICAFFA Logo"
              className="w-full h-auto sm:w-auto"
            />
            <Footer.Brand
              href="https://arsenet.com"
              src={arsenetLogo}
              alt="Arsenet Logo"
              className="w-full h-auto sm:w-auto"
            />
            <Footer.Brand
              href="https://bluspeed.com"
              src={bluspeedLogo}
              alt="BluSpeed Logo"
              className="w-full h-auto sm:w-auto"
            />
            <Footer.Brand
              href="https://fitofatulogi.com"
              src={fitofatologiLogo}
              alt="Fitofatologi Logo"
              className="w-full h-auto sm:w-auto"
            />
            <Footer.Brand
              href="https://ioppublishing.com"
              src={ioppublishingLogo}
              alt="IOP Publishing Logo"
              className="w-full h-auto sm:w-auto"
            />
            <Footer.Brand
              href="https://kampusmerdeka.com"
              src={merdekaLogo}
              alt="Kampus Merdeka Logo"
              className="w-full h-auto sm:w-auto"
            />
            <Footer.Brand
              href="https://unimor.ac.id"
              src={unimorLogo}
              alt="Unimor Logo"
              className="w-full h-auto sm:w-auto"
            />
            <Footer.Brand
              href="https://univkatolikindonesia.com"
              src={univkatolikindoLogo}
              alt="Univ Katolik Indonesia Logo"
              className="w-full h-auto sm:w-auto"
            />
            <Footer.Brand
              href="https://untl.edu"
              src={untlLogo}
              alt="UNTL Logo"
              className="w-full h-auto sm:w-auto"
            />
            <Footer.Brand
              href="https://yayasan.com"
              src={yayasanLogo}
              alt="Yayasan Logo"
              className="w-full h-auto sm:w-auto"
            />
            <Footer.Brand
              href="https://jpl.com"
              src={jplLogo}
              alt="JPL Logo"
              className="w-full h-auto sm:w-auto"
            />
          </div>

          <Footer.LinkGroup className="mt-4 sm:mt-0">
            <Footer.Link href="https://icaffa.undana.ac.id/">About</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="https://icaffa.undana.ac.id/" by="ICAFFA" year={2024} />
      </div>
    </Footer>
  );
}

export default FooterComp;
