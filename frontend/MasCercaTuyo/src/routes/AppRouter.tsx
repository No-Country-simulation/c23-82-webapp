import { BrowserRouter, Route, Routes } from "react-router";
import Register from "../components/pages/register/Register";
import Login from "../components/pages/login/login";
import { Home } from "../components/pages/home/Home";
import CategoryList from "../components/pages/categorylist/CategoryList";
import Category from "../components/pages/category/Category";

function AppRouter() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categorylist" element={<CategoryList />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:name" element={<Category />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default AppRouter;