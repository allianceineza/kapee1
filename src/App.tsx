import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/home';
import NavbarPage from './components/Navbar'
import FooterSide from './components/Footer';
import FAQ from './components/FAQ';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
// import Cart from './components/Cart';
import LayoutHandling from './LayoutFolder/Layout';

function App() {
  return (
    <BrowserRouter>
      {/* <NavbarPage /> */}
      
      <Routes>
        <Route path="/" element={<LayoutHandling />}>
          <Route index element={<Homepage />} />
        
        <Route path="/navbar" element={<NavbarPage />} />
        <Route path="Home" element={<Homepage />} />
        <Route path="FAQ" element={<FAQ />} />
        <Route path="Blogs" element={<Blogs />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/footer" element={<FooterSide />} />
        </Route>
      </Routes>
      
      {/* <FooterSide /> */}
    </BrowserRouter>
  );
}

export default App;