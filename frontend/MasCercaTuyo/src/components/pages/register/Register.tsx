import UploadPhoto from '../../UI/uploadphoto/UploadPhoto';
import Input from '../../UI/input/Input';
import { IoIosArrowBack } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { registerUser } from '../../../services/api.service';
import { Link } from 'react-router';

interface IData {
    name: string,
    nickname: string,
    email: string,
    password: string,
    rePassword: string,
    city: string,
    birthdate: Date,
    image_url?: string | null,
}


function Register() {
  const { register, handleSubmit, control, setValue } = useForm<IData>();

  const onValid = async (data: IData) => {
    try {
      console.log('Datos originales del formulario:', data);

      const fechaISO = new Date(data.birthdate).toISOString();

      const formattedData = {
        nombreApellido: data.name,
        domicilio: data.city,
        alias: data.nickname,
        correo: data.email,
        contraseña: data.password,
        fechaNacimiento: fechaISO,
        imagen: data.image_url || '',
      };

      const response = await registerUser(formattedData);
      console.log('Registro exitoso:', response);
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    setValue('image_url', imageUrl);
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit(onValid)} className="form-control w-full max-w-md p-4 gap-2">
        <div className="flex justify-center items-center mb-4">
          <Link to={"/"}>
            <IoIosArrowBack className="font-semibold text-4xl" />
          
          </Link>
          
          <h1 className="text-center text-4xl font-semibold mb-4 flex-1">Crear Cuenta</h1>
        </div>

        <UploadPhoto onImageUpload={handleImageUpload} />

        <Input
          type="text"
          placeholder="Nombre y apellidos"
          label="Nombre Completo"
          {...register('name', { required: true })}
        />
        <Input
          type="text"
          placeholder="Como suelen llamarte"
          label="Alias"
          {...register('nickname', { required: true })}
        />
        <Input
          type="email"
          placeholder="Correo electronico"
          label="Email"
          {...register('email', { required: true })}
        />
        <Input
          type="password"
          placeholder="Debe tener al menos 4 letras y 2 numeros"
          label="Crear contraseña"
          {...register('password', {
            required: true,
            minLength: 6,
            pattern: /^(?=.*\d{2,})(?=.*[a-zA-Z]{4,}).*$/,
          })}
        />
        <Input
          type="password"
          placeholder="Debe tener al menos 4 letras y 2 numeros"
          label="Repite tu nueva contraseña"
          {...register('rePassword', {
            required: true,
            minLength: 6,
            pattern: /^(?=.*\d{2,})(?=.*[a-zA-Z]{4,}).*$/,
          })}
        />
        <Input
          type="text"
          placeholder="Introduce tu ciudad o localidad"
          label="Ciudad"
          {...register('city', { required: true })}
        />
        <Input
          type="date"
          label="Fecha de nacimiento"
          {...register('birthdate', { required: true })}
        />

        <div className="flex justify-center m-4">
          <button type="submit" className="btn w-full">
            GUARDAR
          </button>
        </div>
        <DevTool control={control} />
      </form>
    </div>
  );
}

export default Register;
