import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadPhoto } from '../../../services/api.service';

interface UploadPhotoProps {
  onImageUpload: (url: string) => void;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ onImageUpload }) => {
  const [image, setImage] = useState<string | null>(null);
  console.log('image', image);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setImage(URL.createObjectURL(file));

      try {
        const imageUrl = await uploadPhoto(file);
        console.log("🚀 ~ UploadPhoto ~ imageUrl:", imageUrl)
        onImageUpload(imageUrl);
      } catch (error) {
        console.error(error);
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center border-2 border-dashed 
                        border-gray-400 rounded-lg w-40 h-40 p-4 mx-auto mb-4
                        ${isDragActive ? 'bg-gray-200' : 'bg-gray-100'}`}
    >
      <input {...getInputProps()} />
      {image ? (
        <img src={image} alt="Foto subida" className="object-cover w-full h-full rounded-lg" />
      ) : (
        <div className="text-center text-gray-500 flex flex-col items-center">
          <span className="text-4xl mb-2">📸</span>
          <p className="text-sm">Agregar una foto</p>
        </div>
      )}
    </div>
  );
};

export default UploadPhoto;
