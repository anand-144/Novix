import React, { useEffect, useState } from 'react';
import InputField from '../addBook/InputField';
import SelectField from '../addBook/SelectField';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchBookByIdQuery } from '../../../redux/features/books/booksApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseUrl';

const UpdateBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const { register, handleSubmit, setValue, reset } = useForm();
  // State to store the selected file names
  const [coverImageFileName, setCoverImageFileName] = useState('');
  const [backImageFileName, setBackImageFileName] = useState('');

  useEffect(() => {
    if (bookData) {
      // Pre-fill the form with current book data
      setValue('title', bookData.title);
      setValue('description', bookData.description);
      setValue('category', bookData.category);
      setValue('trending', bookData.trending);
      setValue('oldPrice', bookData.oldPrice);
      setValue('newPrice', bookData.newPrice);
      
      // Set current image names as default
      setCoverImageFileName(bookData.coverImage);
      setBackImageFileName(bookData.backImage || '');
    }
  }, [bookData, setValue]);

  const onSubmit = async (data) => {
    // Use updated image file names if the user selected new files;
    // otherwise use existing ones from the fetched book data
    const updateBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: coverImageFileName || bookData.coverImage,
      backImage: backImageFileName || bookData.backImage,
    };
    try {
      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      Swal.fire({
        title: "Book Updated",
        text: "Your book is updated successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!"
      });
      await refetch();
    } catch (error) {
      console.log("Failed to update book.", error);
      alert("Failed to update book. Please try again.");
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Save only the file name
      setCoverImageFileName(file.name);
    }
  };

  const handleBackImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Save only the file name
      setBackImageFileName(file.name);
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching book data</div>;

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
          ]}
          register={register}
        />

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

        {/* Replace text input for cover image with file input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleCoverImageChange} 
            className="mb-2 w-full" 
          />
          {coverImageFileName && (
            <p className="text-sm text-gray-500">Selected: {coverImageFileName}</p>
          )}
        </div>

        {/* Add back image file input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Back Image</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleBackImageChange} 
            className="mb-2 w-full" 
          />
          {backImageFileName && (
            <p className="text-sm text-gray-500">Selected: {backImageFileName}</p>
          )}
        </div>

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
