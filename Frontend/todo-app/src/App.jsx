import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register"; // <- add this page
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useEffect } from "react";

function App() {
  const { user, loading, checkAuth } = useContext(AuthContext);

  // Check if user is authenticated
  useEffect( ()=> {
    
    if(!user) {
      checkAuth();
    }

  }, [checkAuth]);


  if(loading){
    return <div>Loading...</div>; // Show a loading state while checking auth
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ !user? <Navigate to="/login" /> : <Dashboard/>} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
