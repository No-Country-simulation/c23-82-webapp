import Footer from '../../UI/footer/footer.tsx';
import Menu from '../../UI/menu/menu.tsx';
import { NavBar } from '../../UI/navbar/NavBar.tsx';

export function Home() {
  return (
    <>
      <Menu />
      <NavBar />
      <Footer />
    </>
  );
}