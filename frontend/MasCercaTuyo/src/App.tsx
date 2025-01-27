import './App.css';
import Footer from './components/UI/footer/footer';
import Menu from './components/UI/menu/menu';
import { Home } from './components/pages/home/Home.tsx';

function App() {

  return (
    <>
      <Menu />
      <Home />
      <Footer />
    </>
  );
}

export default App;