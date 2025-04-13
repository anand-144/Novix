import React, { useState } from 'react'
import InputField from '../addBook/InputField'
import { useForm } from 'react-hook-form';
import { useAddNewsMutation } from '../../../redux/features/news/newsApi';
import Swal from 'sweetalert2';

const AddNews = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [addNews, { isLoading }] = useAddNewsMutation();
    const [imageFiles, setImageFiles] = useState([null, null, null, null]);
    const [imageFileNames, setImageFileNames] = useState(['', '', '', '']);

    const onSubmit = async (data) => {
        const newsData = {
            ...data,
            image1: imageFileNames[0],
            image2: imageFileNames[1],
            image3: imageFileNames[2],
            image4: imageFileNames[3],
        };

        try {
            await addNews(newsData).unwrap();
            Swal.fire({
                title: "News Added",
                text: "Your news has been uploaded successfully!",
                icon: "success",
                confirmButtonColor: "#3085d6",
            });
            reset();
            setImageFiles([null, null, null, null]);
            setImageFileNames(['', '', '', '']);
        } catch (error) {
            console.error(error);
            alert("Failed to add news. Please try again.");
        }
    };

    const handleImageChange = (index, e) => {
      const file = e.target.files[0];
      if (file) {
          const img = new Image();
          img.src = URL.createObjectURL(file);
          img.onload = () => {
              if (img.width !== 123 || img.height !== 156) {
                  alert(`Warning: Image ${index + 1} dimensions should be 123x156px. The selected image does not meet the required size.`);
                  return;
              }
  
              // Proceed if the image is valid
              const updatedFiles = [...imageFiles];
              const updatedNames = [...imageFileNames];
              updatedFiles[index] = file;
              updatedNames[index] = file.name;
              setImageFiles(updatedFiles);
              setImageFileNames(updatedNames);
          };
      }
  };
  

    return (
        <div className="flex flex-col md:flex-row gap-6 p-4">
            <div className="w-full md:w-1/2 max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Add News</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField label="Title" name="title" placeholder="Enter news title" register={register} />
                    <InputField label="Description" name="description" type="textarea" placeholder="Enter news description" register={register} />
                    
                    {[1, 2, 3, 4].map((num, index) => (
                        <div key={num} className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Image {num}</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(index, e)}
                                className="mb-2 w-full"
                            />
                            {imageFileNames[index] && (
                                <p className="text-sm text-gray-500">Selected: {imageFileNames[index]}</p>
                            )}
                        </div>
                    ))}

                    <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
                        {isLoading ? 'Posting..' : 'Post News'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNews;
