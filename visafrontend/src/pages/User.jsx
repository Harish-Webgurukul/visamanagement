import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function User() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // ================================
  // Fetch all users
  // ================================
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user");
      setUsers(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error.response?.data?.message || "Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================================
  // Delete user
  // ================================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/user/${id}`);
      toast.success("User deleted successfully!");
      fetchUsers(); // refresh list
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  // ================================
  // Edit user
  // ================================
  const handleEdit = (user) => {
    navigate("/user/add", { state: { user } });
  };

  // ================================
  // Filter users by search
  // ================================
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase()) ||
    user.mobile?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-4">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-bold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-600">
            A list of all users in your system including their name, email,
            mobile number, role, and status.
          </p>
        </div>
        <div className="mt-4 flex gap-2 sm:mt-0 sm:flex-none">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />

          {/* Add Button */}
          <button
            type="button"
            onClick={() => navigate("/user/add")}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            + Add User
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Profile</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 hidden sm:table-cell">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 hidden lg:table-cell">Mobile</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  {/* Profile Image */}
                  <td className="px-4 py-3">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover border"
                        onError={(e) => (e.target.src = "/default-avatar.png")}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                        N/A
                      </div>
                    )}
                  </td>

                  {/* Name */}
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {user.name}
                  </td>

                  {/* Email */}
                  <td className="hidden sm:table-cell px-4 py-3 text-sm text-gray-600">
                    {user.email}
                  </td>

                  {/* Mobile */}
                  <td className="hidden lg:table-cell px-4 py-3 text-sm text-gray-600">
                    {user.mobile || "-"}
                  </td>

                  {/* Role */}
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {user.roles?.length
                      ? user.roles.map((role) => role.name).join(", ")
                      : "No Role"}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        user.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-indigo-600 hover:text-indigo-900 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-900 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
