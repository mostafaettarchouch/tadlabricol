import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ArtisanDashboard from './pages/ArtisanDashboard';
import ArtisanProfile from './pages/ArtisanProfile';
import { useEffect } from 'react';

function App() {
  // Simple title update
  useEffect(() => {
    document.title = "Artisan Platform Tadla | Find Local Pros";
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ArtisanDashboard />} />
        <Route path="/artisan/:id" element={<ArtisanProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
