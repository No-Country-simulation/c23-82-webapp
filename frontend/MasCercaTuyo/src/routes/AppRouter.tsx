import { BrowserRouter, Route, Routes } from "react-router";
import Register from "../components/pages/register/Register";

function AppRouter() {
    return (
      <BrowserRouter>
        <Routes>
          {/*<Route path="/login" element={<Login />} />*/}
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default AppRouter;