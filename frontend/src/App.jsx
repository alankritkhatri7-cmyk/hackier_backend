import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Builders from './pages/Builders';
import Store from './pages/Store';
import Apply from './pages/Apply';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';

function Layout() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 font-sans text-slate-200">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builders" element={<Builders />} />
          <Route path="/store" element={<Store />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;
