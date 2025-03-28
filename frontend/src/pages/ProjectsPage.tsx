import { useState } from 'react';
import '../css/App.css';
import CategoryFilter from '../components/CategoryFilter';
// import Fingerprint from '../components/Fingerprint';
// import PrivacyPolicy from '../components/PrivacyPolicy';
import ProjectList from '../components/ProjectList';
import CookieConsent from 'react-cookie-consent';
import Header from '../components/Header';
import CartSummary from '../components/CartSummary';


export default function ProjectsPage() {
   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


  return (
    <div className="container mt-4">
      <CartSummary />
      <Header />
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter setSelections={setSelectedCategories} selectedCategories={selectedCategories} />
        </div>
        <div className="col-md-9">
          <ProjectList selectedCategories={selectedCategories} />
        </div>

        <div className="row">
          <CookieConsent>This website uses cookies to enhance your experience</CookieConsent>
          {/* <PrivacyPolicy /> */}
          {/* <Fingerprint />  */}
        </div>
      </div>
    </div>
  );
}
