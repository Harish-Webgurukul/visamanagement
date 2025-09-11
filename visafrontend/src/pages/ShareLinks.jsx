import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShareLinks() {
  const [links, setLinks] = useState([]);
  const [, setVisaOptions] = useState([]);
  const navigate = useNavigate();

  // Fetch share links and visa options
  const fetchData = async () => {
    try {
      const [linksRes, visaRes] = await Promise.all([
        axios.get("http://localhost:5000/api/sharelink"),
        axios.get("http://localhost:5000/api/visaoption")
      ]);

      setLinks(Array.isArray(linksRes.data) ? linksRes.data : linksRes.data?.data || []);
      setVisaOptions(Array.isArray(visaRes.data) ? visaRes.data : visaRes.data?.data || []);
    } catch (err) {
      console.error("❌ Error fetching data:", err);
      toast.error("❌ Failed to fetch share links or visa options");
      setLinks([]);
      setVisaOptions([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete share link
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this share link?")) {
      try {
        await axios.delete(`http://localhost:5000/api/sharelink/${id}`);
        toast.success("✅ Share link deleted successfully!");
        fetchData();
      } catch (err) {
        console.error("❌ Error deleting share link:", err);
        toast.error("❌ Failed to delete share link");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Share Links</h1>
          <p className="text-sm text-gray-500">Manage all visa share links in one place.</p>
        </div>
        <button
          onClick={() => navigate("/add-sharelink")}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-sm transition-all"
        >
          ➕ Add Share Link
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left">Visa Option</th>
              <th className="p-3 text-left">Token</th>
              <th className="p-3 text-left">Clicks</th>
              <th className="p-3 text-left">Expires At</th>
              <th className="p-3 text-left">One-Time</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.length > 0 ? (
              links.map((link, index) => (
                <tr
                  key={link._id}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
                >
                  <td className="p-3 font-medium text-gray-700">
                    {link.visaOption?.title || "-"}
                  </td>
                  <td className="p-3 text-gray-600">{link.token}</td>
                  <td className="p-3 text-gray-600">{link.clicks}</td>
                  <td className="p-3 text-gray-600">
                    {link.expiresAt ? new Date(link.expiresAt).toLocaleDateString() : "-"}
                  </td>
                  <td className="p-3 text-center">
                    {link.isOneTime ? (
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-800">
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                        No
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className="inline-flex justify-center w-full p-1 text-gray-500 hover:text-gray-700">
                        <EllipsisVerticalIcon className="w-5 h-5" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-10">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => navigate(`/add-sharelink/${link._id}`)}
                                  className={`${active ? "bg-gray-100" : ""} w-full text-left px-4 py-2 text-sm text-gray-700`}
                                >
                                  Edit
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleDelete(link._id)}
                                  className={`${active ? "bg-gray-100" : ""} w-full text-left px-4 py-2 text-sm text-red-600`}
                                >
                                  Delete
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500 italic">
                  No share links found 🚫
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
