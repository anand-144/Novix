import React from 'react';
import { useDeleteNewsMutation, useFetchAllNewsQuery } from '../../../redux/features/news/newsApi';
import { Link, useNavigate } from 'react-router-dom';

const ManageNews = () => {
  const navigate = useNavigate();
  const { data: newsList, refetch } = useFetchAllNewsQuery();
  const [deleteNews] = useDeleteNewsMutation();

  const handleDeleteNews = async (id) => {
    try {
      await deleteNews(id).unwrap();
      alert('News deleted successfully!');
      refetch();
    } catch (error) {
      console.error('Failed to delete news:', error.message);
      alert('Failed to delete news. Please try again.');
    }
  };

  return (
    <section className="py-4 px-2 sm:px-4 bg-blueGray-50 min-h-screen">
      <div className="max-w-7xl mx-auto mt-16">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 border-b">
            <h3 className="text-lg sm:text-xl font-semibold text-blueGray-700">All News</h3>
            <button className="mt-2 sm:mt-0 bg-indigo-500 text-white text-xs font-bold uppercase px-3 py-2 rounded hover:bg-indigo-600 transition">
              See all
            </button>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-blueGray-500">
                <tr>
                  <th className="px-4 py-2 font-semibold border">#</th>
                  <th className="px-4 py-2 font-semibold border">Title</th>
                  <th className="px-4 py-2 font-semibold border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {newsList && newsList.map((news, index) => (
                  <tr key={news._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{news.title}</td>
                    <td className="px-4 py-2 border">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link
                          to={`/dashboard/edit-news/${news._id}`}
                          className="text-indigo-600 hover:text-indigo-700 hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteNews(news._id)}
                          className="bg-red-500 text-white text-xs px-3 py-1 rounded-full hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ManageNews;
