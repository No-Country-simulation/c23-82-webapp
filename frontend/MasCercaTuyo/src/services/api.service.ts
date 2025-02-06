import axios from 'axios';
import { RequestedService } from '../components/pages/ServiceDetails/ServiceDetails';

const API_KEY_IMG = import.meta.env.VITE_API_KEY_IMG;
const API_BASE_URL = import.meta.env.VITE_API_URL;

console.log(API_BASE_URL);



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


export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/usuarios`, userData);
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw new Error("No se pudo registrar el usuario");
  }
};

export const createServiceRequest = async (serviceData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/serviciosGeo/cliente`, serviceData);
    return response.data;
  } catch (error) {
    console.error("Error creating service request:", error);
    throw new Error("No se pudo crear la solicitud de servicio");
  }
};

export const createServiceOffer = async (serviceData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/serviciosGeo/prestador`, serviceData);
    return response.data;
  } catch (error) {
    console.error("Error creating service request:", error);
    throw new Error("No se pudo crear la solicitud de servicio");
  }
};

export const fetchAllServicesByCategory = async (category: string) => 
{
  try 
  {
    const response = await axios.get<any[]>(`${API_BASE_URL}/serviciosGeo/categoriaGeo/${category}`); 

    return response.data;
  } 
  catch (error) 
  {
    console.error('Error fetching services', error);
    throw new Error('Error fetching services');
  }
}

export const fetchAllServicesByCategoryAndProximity = async (
  category: string,
  userLat: number,
  userLon: number,
  radius: number
) => 

{
  try 
  {
    const response = await axios.get<any[]>(
      `${API_BASE_URL}/serviciosGeo/servicios-cercanos/${category}`,
      {
        params: {
          userLat,
          userLon,
          radius,
        },
      }
    ); 

    return response.data;
  } 
  catch (error) 
  {
    console.error('Error fetching services', error);
    throw new Error('Error fetching services');
  }
}

export const fetchServiceById = async (serviceId: number) => 
  {
    try 
    {
      const response = await axios.get<any>(`${API_BASE_URL}/serviciosGeo/${serviceId}`); 
  
      return response.data;
    } 
    catch (error) 
    {
      console.error('Error fetching services', error);
      throw new Error('Error fetching services');
    }
  }
  
export const hireServiceRequest  = async (requestedService: RequestedService) => 
{
  try 
  {
    const response = await axios.post<RequestedService>(`${API_BASE_URL}/serviciosSolicitados`, requestedService); 

    return response.data;
  } 
  catch (error) 
  {
    console.error('Error hiring services', error);
    throw new Error('Error hiring services');
  }
}


export const fetchUserById = async (userId: number) => 
  {
    try 
    {
      const response = await axios.get<any>(`${API_BASE_URL}/usuarios/${userId}`); 
  
      return response.data;
    } 
    catch (error) 
    {
      console.error('Error fetching services', error);
      throw new Error('Error fetching services');
    }
  }


