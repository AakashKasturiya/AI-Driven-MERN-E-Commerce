import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Table = ({ data, loading, error }) => {
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    setFilterData(data || []);
  }, [data]);

  const deleteProduct = (id) => {
    const UpdatedfilteredData = filterData.filter((item) => item.id !== id);
    setFilterData(UpdatedfilteredData);
    console.log(UpdatedfilteredData);
  };

  return (
    <>
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="bg-white border border-gray-100 rounded-lg overflow-">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider  sm:table-cell">
                    Category
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider  md:table-cell">
                    Stock
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Price 
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider  lg:table-cell">
                    Created At
                  </th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="7" className="px-5 py-4 text-center">
                      Loading...
                    </td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan="7" className="px-5 py-4 text-center">
                      Error: {error.message}
                    </td>
                  </tr>
                )}
                {filterData?.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        alt={item.title}
                        className="w-10 h-10 rounded-lg object-cover border border-gray-100 shrink-0"
                        src={item.thumbnail}
                      />
                      <div className="min-w-0">
                        <p className="text-md font-bold text-gray-900 truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {item.brand}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4  sm:table-cell">
                    <span className="text-sm text-gray-600">
                     {item.category}
                    </span>
                  </td>
                  <td className="px-5 py-4  md:table-cell">
                    <span className="text-sm text-gray-600">{item.stock}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-100">
                      Active
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      ${item.price}
                    </span>
                  </td>
                  <td className="px-5 py-4  lg:table-cell">
                    <span className="text-sm text-gray-500">{item.createdAt}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`${item.id}`}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                        title="Product Details">
                        <i className="ri-eye-line text-sm"></i>
                      </Link>
                      <button onClick={()=>deleteProduct(item.id)}
                        className="border border-1 w-8 h-8 flex items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
                        title="Delete Product">
                        <i className="ri-delete-bin-line text-sm"></i>
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
    </>
  );
};
