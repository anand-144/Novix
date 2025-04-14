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
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.title);
      setValue('description', bookData.description);
      setValue('category', bookData.category);
      setValue('trending', bookData.trending);
      setValue('oldPrice', bookData.oldPrice);
      setValue('newPrice', bookData.newPrice);
      setValue('genre', bookData.genre);
      setValue('author', bookData.author);
    }
  }, [bookData, setValue]);

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
      };

      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      Swal.fire({
        title: "Book Updated",
        text: "Your book has been updated successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6"
      });

      await refetch();
    } catch (error) {
      console.error("Failed to update book.", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update book. Please try again.',
      });
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching book data</div>;

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField label="Title" name="title" placeholder="Enter book title" register={register} />
        <InputField label="Description" name="description" placeholder="Enter book description" type="textarea" register={register} />
        <InputField label="Author" name="author" placeholder="Enter author name" type="textarea" register={register} />

        <SelectField
          label="Category"
          name="category"
          register={register}
          options={[{ value: '', label: 'Choose A Category' },
            { value: 'action-and-adventure', label: 'Action and Adventure' },
            { value: 'art', label: 'Art' },
            { value: 'autobiography', label: 'Autobiography' },
            { value: 'biography', label: 'Biography' },
            { value: 'business', label: 'Business' },
            { value: 'children', label: "Children's" },
            { value: 'classic', label: 'Classic' },
            { value: 'comics', label: 'Comics' },
            { value: 'cookbooks', label: 'Cookbooks' },
            { value: 'crime', label: 'Crime' },
            { value: 'drama', label: 'Drama' },
            { value: 'dystopian', label: 'Dystopian' },
            { value: 'education', label: 'Education' },
            { value: 'fantasy', label: 'Fantasy' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'graphic-novel', label: 'Graphic Novel' },
            { value: 'historical-fiction', label: 'Historical Fiction' },
            { value: 'history', label: 'History' },
            { value: 'horror', label: 'Horror' },
            { value: 'humor', label: 'Humor' },
            { value: 'literary-fiction', label: 'Literary Fiction' },
            { value: 'memoir', label: 'Memoir' },
            { value: 'mystery', label: 'Mystery' },
            { value: 'non-fiction', label: 'Non-fiction' },
            { value: 'paranormal', label: 'Paranormal' },
            { value: 'philosophy', label: 'Philosophy' },
            { value: 'poetry', label: 'Poetry' },
            { value: 'psychology', label: 'Psychology' },
            { value: 'religion', label: 'Religion' },
            { value: 'romance', label: 'Romance' },
            { value: 'science', label: 'Science' },
            { value: 'science-fiction', label: 'Science Fiction' },
            { value: 'self-help', label: 'Self-help' },
            { value: 'short-stories', label: 'Short Stories' },
            { value: 'spirituality', label: 'Spirituality' },
            { value: 'sports', label: 'Sports' },
            { value: 'supernatural', label: 'Supernatural' },
            { value: 'thriller', label: 'Thriller' },
            { value: 'travel', label: 'Travel' },
            { value: 'true-crime', label: 'True Crime' },
            { value: 'western', label: 'Western' },
            { value: 'young-adult', label: 'Young Adult' },
          ]}
        />

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input type="checkbox" {...register('trending')} className="rounded text-blue-600" />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>

        <InputField label="Old Price" name="oldPrice" type="number" placeholder="Old Price" register={register} />
        <InputField label="New Price" name="newPrice" type="number" placeholder="New Price" register={register} />

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
