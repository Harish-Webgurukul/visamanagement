import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Role() {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  // Fetch roles
  const fetchRoles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/role");
      // ✅ Corrected: roles are inside res.data.data
      setRoles(Array.isArray(res.data?.data) ? res.data.data : []);
      console.log("📌 Roles:", res.data.data); // Debug
    } catch (err) {
      console.error("❌ Error fetching roles:", err);
      toast.error("Failed to fetch roles ❌");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Delete role
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await axios.delete(`http://localhost:5000/api/role/${id}`);
        toast.success("✅ Role deleted successfully");
        fetchRoles();
      } catch (err) {
        console.error("❌ Error deleting role:", err);
        toast.error("❌ Failed to delete role");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Roles</h1>
          <p className="text-sm text-gray-500">
            Manage all roles and permissions.
          </p>
        </div>
        <button
          onClick={() => navigate("/add-role")}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-sm transition-all"
        >
          ➕ Add Role
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Permissions</th>
              <th className="p-3 text-left">Inherited Roles</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.length > 0 ? (
              roles.map((role, index) => (
                <tr
                  key={role._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition`}
                >
                  {/* Name */}
                  <td className="p-3 font-medium text-gray-700">
                    {role.name}
                  </td>

                  {/* Description */}
                  <td className="p-3 text-gray-600">
                    {role.description || "-"}
                  </td>

                  {/* Permissions */}
                  <td className="p-3 text-gray-600">
                    {Array.isArray(role.permissions) &&
                    role.permissions.length > 0
                      ? role.permissions.map((p) => p.name).join(", ")
                      : "-"}
                  </td>

                  {/* Inherited Roles */}
                  <td className="p-3 text-gray-600">
                    {Array.isArray(role.inherits) && role.inherits.length > 0
                      ? role.inherits.map((i) => i.name).join(", ")
                      : "-"}
                  </td>

                  {/* Actions */}
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
                        <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-10">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() =>
                                    navigate(`/add-role/${role._id}`)
                                  }
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
                                  onClick={() => handleDelete(role._id)}
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
                <td
                  colSpan="5"
                  className="p-6 text-center text-gray-500 italic"
                >
                  No roles found 🚫
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
