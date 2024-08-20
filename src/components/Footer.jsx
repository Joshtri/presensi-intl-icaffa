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

function FooterComp() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <div className="flex space-x-5">
            <Footer.Brand href="https://fst.undana.ac.id/" src={uncLogo} alt="UNDANA Logo" />
            <Footer.Brand href="https://icaffa.com" src={icaffaLogo} alt="ICAFFA Logo" />
            <Footer.Brand href="https://arsenet.com" src={arsenetLogo} alt="Arsenet Logo" />
            <Footer.Brand href="https://bluspeed.com" src={bluspeedLogo} alt="BluSpeed Logo" />
            <Footer.Brand href="https://fitofatulogi.com" src={fitofatologiLogo} alt="Fitofatologi Logo" />
            <Footer.Brand href="https://ioppublishing.com" src={ioppublishingLogo} alt="IOP Publishing Logo" />
            <Footer.Brand href="https://kampusmerdeka.com" src={merdekaLogo} alt="Kampus Merdeka Logo" />
            <Footer.Brand href="https://unimor.ac.id" src={unimorLogo} alt="Unimor Logo" />
            <Footer.Brand href="https://univkatolikindonesia.com" src={univkatolikindoLogo} alt="Univ Katolik Indonesia Logo" />
            <Footer.Brand href="https://untl.edu" src={untlLogo} alt="UNTL Logo" />
          </div>

          <Footer.LinkGroup>
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
