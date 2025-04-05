import { Outlet } from "react-router";
import './App.css'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvide } from "./context/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <AuthProvide>
      <Navbar />
      <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
        <Outlet />
      </main>
      <Footer />
    </AuthProvide>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App