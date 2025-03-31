import './css/App.css';
import CartPage from './pages/CartPage';
import DonatePage from './pages/DonatePage';
import ProjectsPage from './pages/ProjectsPage';
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminProjectPage from './pages/AdminProjectsPage';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ProjectsPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/donate/:projectName/:projectId" element={<DonatePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminProjects" element={<AdminProjectPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
