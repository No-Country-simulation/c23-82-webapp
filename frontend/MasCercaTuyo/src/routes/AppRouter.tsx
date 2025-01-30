import { BrowserRouter, Route, Routes } from "react-router";
import Register from "../components/pages/register/Register";
import Login from "../components/pages/login/login";
import { Home } from "../components/pages/home/Home";

function AppRouter() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default AppRouter;