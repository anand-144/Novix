import React, { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import AddNews from '../addNews/AddNews' // 👈 Import AddNews component
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';

const AddBook = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [addBook, { isLoading, isError }] = useAddBookMutation();
    const [imageFileName, setimageFileName] = useState('');
    const [imageFileName1, setimageFileName1] = useState('');

    const onSubmit = async (data) => {
        const newBookData = {
            ...data,
            coverImage: imageFileName,
            backImage: imageFileName1
        }
        try {
            await addBook(newBookData).unwrap();
            Swal.fire({
                title: "Book added",
                text: "Your book is uploaded successfully!",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, It's Okay!"
            });
            reset();
            setimageFileName('');
            setimageFileName1('');
            setimageFile(null);
        } catch (error) {
            console.error(error);
            alert("Failed to add book. Please try again.");
        }
    }

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setimageFile(file);
            setimageFileName(file.name);
        }
    };

    const handleBackImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setimageFile(file);
            setimageFileName1(file.name);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 p-4">
            {/* Add Book Form */}
            <div className="w-full md:w-1/2 max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField label="Title" name="title" placeholder="Enter book title" register={register} />
                    <InputField label="Description" name="description" placeholder="Enter book description" type="textarea" register={register} />
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
                            <input type="checkbox" {...register('trending')} className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500" />
                            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
                        </label>
                    </div>
                    <InputField label="Old Price" name="oldPrice" type="number" placeholder="Old Price" register={register} />
                    <InputField label="New Price" name="newPrice" type="number" placeholder="New Price" register={register} />
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                        <input type="file" accept="image/*" onChange={handleCoverImageChange} className="mb-2 w-full" />
                        {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Back Image</label>
                        <input type="file" accept="image/*" onChange={handleBackImageChange} className="mb-2 w-full" />
                        {imageFileName1 && <p className="text-sm text-gray-500">Selected: {imageFileName1}</p>}
                    </div>
                    <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
                        {isLoading ? 'Adding..' : 'Add Book'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddBook
