import { IoIosArrowBack } from 'react-icons/io';
import CategoryCard from '../../UI/categorycard/CategoryCard';
import { MdOutlineHome } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { fetchCategoriesServices } from '../../../services/api.service';

function Category() {
  const { name } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        setIsLoading(true);
        const categories = await fetchCategoriesServices(String(name));
        setData(categories);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getCategories();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="flex justify-center">
      <div className="flex-1 max-w-5xl">
        <div className="flex justify-between p-6 items-center">
          <div
            className="rounded-full p-[0.2rem] cursor-pointer text-[33px]"
            onClick={handleBackClick}
          >
            <IoIosArrowBack />
          </div>
          <div>
            <p className="text-4xl font-bold">{name?.toUpperCase()}</p>
          </div>
          <div
            className="rounded-full p-3 cursor-pointer text-[40px] bg-red-500 text-white"
            onClick={handleHomeClick}
          >
            <MdOutlineHome />
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] gap-8 p-4 mt-5">
          {data.map((item, index) => (
            <CategoryCard
              key={index}
              title={item.nombrePrestador}
              category={item.categoria}
              location="Santiago Chile"
              image="https://urosario.edu.co/sites/default/files/2024-07/Las-mascotas-se-visten-a-la-moda.jpg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
