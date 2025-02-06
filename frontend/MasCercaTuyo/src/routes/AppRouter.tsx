import { BrowserRouter, Route, Routes } from "react-router";
import Register from "../components/pages/register/Register";
import Login from "../components/pages/login/login";
import Home from "../components/pages/home/Home.tsx";
import PublishServiceRequest from "../components/pages/PublishServiceRequest/PublishServiceRequest.tsx";
import PublishServiceOffer from "../components/pages/PublishServiceOffer/PublishServiceOffer";
import ServicesCatalogue from "../components/pages/ServicesCatalogue/ServicesCatalogue.tsx"
import NotFound from "../components/pages/NotFound/404.tsx";
import ServiceDetails from "../components/pages/ServiceDetails/ServiceDetails.tsx";

function AppRouter() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/servicio-solicitar" element={<PublishServiceRequest/>} />
          <Route path="/servicio-ofrecer" element={<PublishServiceOffer />} />
          <Route path="/servicios/:category" element={<ServicesCatalogue />} />
          <Route path="/servicios/:category/:servicioId" element={<ServiceDetails />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default AppRouter;