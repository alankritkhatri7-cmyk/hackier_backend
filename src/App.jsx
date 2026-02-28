import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Builders from './pages/Builders';
import Store from './pages/Store';
import Apply from './pages/Apply';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-950 font-sans text-slate-200">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builders" element={<Builders />} />
            <Route path="/store" element={<Store />} />
            <Route path="/apply" element={<Apply />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
