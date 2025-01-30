import axios from 'axios';
import { data } from 'react-router';

const API_KEY_IMG = import.meta.env.VITE_API_KEY_IMG;
const API_BASE_URL = import.meta.env.VITE_API_URL;


export const uploadPhoto = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY_IMG}`, formData);
    return response.data.data.url;
  } catch (error) {
    console.error('Error uploading the image:', error);
    throw new Error('Error uploading the image');
  }
};

// Registrar un usuario
export const registerUser = async (userData: any) => {
  try {
    console.log(userData)
    console.log(API_BASE_URL)
    const response = await axios.post(`${API_BASE_URL}/usuarios`, userData);
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw new Error("No se pudo registrar el usuario");
  }
};