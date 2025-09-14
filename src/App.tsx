import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/home';
import NavbarPage from './components/Navbar';
import FooterSide from './components/Footer';
import FAQ from './components/FAQ';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import Cart from './components/Cart';
import LayoutHandling from './LayoutFolder/Layout';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ForgotPasswordModel from './components/ForgotPasswordModel';
import DashboardLayout from './Dashboardkapee/DashboardLayout';
import Navbar from './Dashboardkapee/NavbarDashboard';
import Sidebar from './Dashboardkapee/Sidebar';
import './index.css'; // or './App.css'
import DashboardOutlet from './Dashboardkapee/DashboardOutlet';

function App() {
  return (
    <BrowserRouter>
      {/* <NavbarPage /> */}
      <Routes>
        <Route path="/" element={<LayoutHandling />}>
          <Route index element={<Homepage />} />
          <Route path="navbar" element={<NavbarPage />} />
          <Route path="home" element={<Homepage />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="cart" element={<Cart />} />
          <Route path="loginform" element={<LoginForm onClose={() => {}} />} />
          <Route path="signupform" element={<SignupForm onClose={() => {}} />} />
          <Route path="forgotpasswordmodel" element={<ForgotPasswordModel onClose={() => {}} />} />
          <Route path="contact" element={<Contact />} />
          <Route path="footer" element={<FooterSide />} />
          
         
        </Route>
         {/* Dashboard Routes */}
          <Route path="/Dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOutlet />} />
            <Route path="sidebar" element={<Sidebar />} />
            <Route path="navbar" element={<Navbar />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;