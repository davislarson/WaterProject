import './App.css'
import CategoryFilter from './CategoryFilter'
import Fingerprint from './Fingerprint';
// import PrivacyPolicy from './PrivacyPolicy';
import ProjectList from './ProjectList'
import CookieConsent from 'react-cookie-consent';

function App() {

  return (
    <>
      <CategoryFilter />
      <ProjectList />
      <CookieConsent>This website uses cookies to enhance your experience</CookieConsent>
      {/* <PrivacyPolicy /> */}
      <Fingerprint />
    </>
  )
}

export default App
