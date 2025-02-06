import { useEffect, useState } from 'react';
import { fetchCategories } from '../../../services/api.service';
import { useNavigate } from 'react-router';

function CategoryList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        setIsLoading(true);
        const categories = await fetchCategories();
        setData(categories);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getCategories();
  }, []);

  const hanleClickCategory = (category: string) => {
    navigate(`/category/${category}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center py-8"
      style={{
        background:
          'linear-gradient(4deg, rgba(6,17,16,1) 0%, rgba(35,55,55,1) 22%, rgba(91,106,105,1) 47%, rgba(134,138,138,1) 100%)',
      }}
    >
      <h1 className="text-center text-white text-2xl mb-8">CATEGORÍAS</h1>
      <div className="grid grid-cols-3 grid-rows-3 gap-10">
        {data.map((item, index) => (
          <div
            key={item.id}
            className="bg-white p-4 text-center rounded-2xl shadow-md cursor-pointer"
            onClick={() => hanleClickCategory(item.categoria)}
          >
            {item.categoria}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
