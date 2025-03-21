import { useState } from 'react';
import './css/App.css';
import CategoryFilter from './CategoryFilter';
// import Fingerprint from './Fingerprint';
// import PrivacyPolicy from './PrivacyPolicy';
import ProjectList from './ProjectList';
import CookieConsent from 'react-cookie-consent';


function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


  return (
    <>
      <div className="container mt-4">
        <div className="row mt-4 bg-primary text-white">
          <h1>Water Projects</h1>
        </div>
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter setSelections={setSelectedCategories} selectedCategories={selectedCategories}/>
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
    </>
  );
}

export default App;
