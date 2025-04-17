import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';

const AddBook = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFileName, setimageFileName] = useState('');
    const [imageFileName1, setimageFileName1] = useState('');
    const [addBook, { isLoading }] = useAddBookMutation();

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setimageFileName(file.name); // Just set the file name without dimension check
        }
    };

    const handleBackImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setimageFileName1(file.name); // Just set the file name without dimension check
        }
    };

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('trending', data.trending);
        formData.append('author', data.author);

        // Only append price if provided
        if (data.oldPrice) formData.append('oldPrice', data.oldPrice);
        if (data.newPrice) formData.append('newPrice', data.newPrice);

        const coverImageFile = document.querySelector('input[type=file]').files[0];
        const backImageFile = document.querySelectorAll('input[type=file]')[1]?.files[0];

        // Only append the image files if they are selected
        if (coverImageFile) formData.append('coverImage', coverImageFile);
        if (backImageFile) formData.append('backImage', backImageFile);

        try {
            await addBook(formData).unwrap();
            Swal.fire({
                title: "Book added",
                text: "Your book has been uploaded successfully!",
                icon: "success",
            });
            reset();
            setimageFileName('');
            setimageFileName1('');
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error?.data?.message || 'Failed to add book. Please try again.',
            });
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 p-4">
            <div className="w-full md:w-1/2 max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField label="Title" name="title" placeholder="Enter book title" register={register} required />
                    <InputField label="Description" name="description" placeholder="Enter book description" type="textarea" register={register} required />
                    <InputField label="Author Name" name="author" placeholder="Enter author name" type="textarea" register={register} required />
                    <SelectField
                        label="Category"
                        name="category"
                        options={[
                            { value: '', label: 'Choose A Category' },
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
                        register={register}
                    />

                    <div className="mb-4">
                        <label className="inline-flex items-center">
                            <input type="checkbox" {...register('trending')} className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500" />
                            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
                        </label>
                    </div>

                    {/* Optional price fields */}
                    <InputField label="Old Price" name="oldPrice" type="number" placeholder="Old Price" register={register} />
                    <InputField label="New Price" name="newPrice" type="number" placeholder="New Price" register={register} />

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                        <input type="file" accept="image/*" onChange={handleCoverImageChange} className="mb-2 w-full" required />
                        {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Back Image</label>
                        <input type="file" accept="image/*" onChange={handleBackImageChange} className="mb-2 w-full" required />
                        {imageFileName1 && <p className="text-sm text-gray-500">Selected: {imageFileName1}</p>}
                    </div>

                    <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
                        {isLoading ? 'Adding..' : 'Add Book'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBook;
