import axios from 'axios';

const API_KEY_IMG = import.meta.env.VITE_API_KEY_IMG;
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const uploadPhoto = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${API_KEY_IMG}`,
      formData
    );
    return response.data.data.url;
  } catch (error) {
    console.error('Error uploading the image:', error);
    throw new Error('Error uploading the image');
  }
};

export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/usuarios`, userData);
    return response.data;
  } catch (error) {
    console.error('Error en el registro:', error);
    throw new Error('No se pudo registrar el usuario');
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categorias`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      'No se pudo establecer comunicacion con el servidor, intente de nuevo mas tarde'
    );
  }
};

export const fetchCategoriesServices = async (category: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/servicios/categoria/${category}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      'No se pudo establecer comunicacion con el servidor, intente de nuevo mas tarde'
    );
  }
};
