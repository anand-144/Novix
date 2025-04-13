import React, { useEffect, useState } from 'react';
import InputField from '../addBook/InputField';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchNewsByIdQuery } from '../../../redux/features/news/newsApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseUrl';

const EditNews = () => {
  const { id } = useParams();
  const { data: newsData, isLoading, isError, refetch } = useFetchNewsByIdQuery(id);
  const { register, handleSubmit, setValue } = useForm();

  const [imageFiles, setImageFiles] = useState([null, null, null, null]);
  const [imageFileNames, setImageFileNames] = useState(['', '', '', '']);

  useEffect(() => {
    if (newsData) {
      setValue('title', newsData.title);
      setValue('description', newsData.description);
      setImageFileNames([
        newsData.image1 || '',
        newsData.image2 || '',
        newsData.image3 || '',
        newsData.image4 || '',
      ]);
    }
  }, [newsData, setValue]);

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width !== 123 || img.height !== 156) {
          alert(`Warning: Image ${index + 1} dimensions should be 123x156px. The selected image does not meet the required size.`);
          e.target.value = '';  // Clear the file input to prevent selecting the invalid image
          return;  // Exit the function without updating the state
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
  

  const onSubmit = async (data) => {
    const updatedNews = {
      title: data.title,
      description: data.description,
      image1: imageFileNames[0],
      image2: imageFileNames[1],
      image3: imageFileNames[2],
      image4: imageFileNames[3],
    };

    try {
      await axios.put(`${getBaseUrl()}/api/news/${id}`, updatedNews, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      Swal.fire({
        title: 'News Updated',
        text: 'Your news article was successfully updated!',
        icon: 'success',
        confirmButtonText: "Great!",
      });

      await refetch();
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update news. Please try again.');
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading news data</div>;

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update News</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter news title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter news description"
          type="textarea"
          register={register}
        />

        {[1, 2, 3, 4].map((num, index) => (
          <div key={num} className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image {num}
            </label>
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

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          Update News
        </button>
      </form>
    </div>
  );
};

export default EditNews;
