import React from 'react'
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
    <section className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">All News</h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded">
                  See all
                </button>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-blueGray-500 bg-blueGray-50 border border-solid border-blueGray-100">
                    #
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-blueGray-500 bg-blueGray-50 border border-solid border-blueGray-100">
                    Title
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-blueGray-500 bg-blueGray-50 border border-solid border-blueGray-100">
                    Category
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-blueGray-500 bg-blueGray-50 border border-solid border-blueGray-100">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {newsList && newsList.map((news, index) => (
                  <tr key={news._id}>
                    <td className="border-t-0 px-6 py-4 text-xs text-left text-blueGray-700">
                      {index + 1}
                    </td>
                    <td className="border-t-0 px-6 py-4 text-xs">
                      {news.title}
                    </td>
                    <td className="border-t-0 px-6 py-4 text-xs">
                      {news.category}
                    </td>
                    <td className="border-t-0 px-6 py-4 text-xs space-x-4">
                      <Link
                        to={`/dashboard/edit-news/${news._id}`}
                        className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline underline-offset-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteNews(news._id)}
                        className="font-medium bg-red-500 py-1 px-4 rounded-full text-white"
                      >
                        Delete
                      </button>
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
