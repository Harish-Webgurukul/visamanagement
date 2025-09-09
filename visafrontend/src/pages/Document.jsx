import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

export default function Document() {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  // Fetch all documents
  const fetchDocuments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/document"); // update backend URL if needed
      if (Array.isArray(res.data)) setDocuments(res.data);
      else if (res.data.data && Array.isArray(res.data.data)) setDocuments(res.data.data);
      else setDocuments([]);
    } catch (err) {
      console.error("❌ Error fetching documents:", err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Delete document
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        await axios.delete(`http://localhost:5000/api/document/${id}`);
        fetchDocuments();
      } catch (err) {
        console.error("❌ Error deleting document:", err);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Documents</h1>
          <p className="text-sm text-gray-500">Manage visa-related document templates.</p>
        </div>
        <button
          onClick={() => navigate("/add-dacument")}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-sm transition-all"
        >
          ➕ Add Document
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Country</th>
              <th className="p-3 text-left">Purpose</th>
              <th className="p-3 text-left">Tags</th>
              <th className="p-3 text-left">Required Docs</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.length > 0 ? (
              documents.map((doc, index) => (
                <tr
                  key={doc._id}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
                >
                  <td className="p-3 font-medium text-gray-700">{doc.name}</td>
                  <td className="p-3 text-gray-600">{doc.country?.name || "-"}</td>
                  <td className="p-3 text-gray-600">{doc.purpose?.name || "-"}</td>
                  <td className="p-3 text-gray-600">{doc.tags?.join(", ") || "-"}</td>
                  <td className="p-3 text-gray-600">
                    {doc.requiredDocuments?.length > 0 ? doc.requiredDocuments.join(", ") : "-"}
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
                                  onClick={() => navigate(`/add-document/${doc._id}`)}
                                  className={`${
                                    active ? "bg-gray-100" : ""
                                  } w-full text-left px-4 py-2 text-sm text-gray-700`}
                                >
                                  Edit
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleDelete(doc._id)}
                                  className={`${
                                    active ? "bg-gray-100" : ""
                                  } w-full text-left px-4 py-2 text-sm text-red-600`}
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
                  No documents found 🚫
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
