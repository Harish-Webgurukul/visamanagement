
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function User() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user");
      setUsers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/user/${id}`);
      toast.success("User deleted successfully!");
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user");
    }
  };

  // Handle edit
  const handleEdit = (user) => {
    navigate("/user/add", { state: { user } }); // pass user data to AddUser page
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-4">
      {/* Header Section */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, email,
            mobile, and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => navigate("/user/add")}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="-mx-4 mt-10 sm:-mx-0 ring-1 ring-gray-300 rounded-lg p-2">
        <table className="min-w-full divide-y divide-gray-500">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th className="hidden sm:table-cell">Email</th>
              <th className="hidden lg:table-cell">Mobile</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500 text-sm">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  {/* Profile Image */}
                  <td className="py-4 pr-3 pl-4 text-sm text-gray-900 sm:pl-0">
                    {user.profileImage ? (
                      <img
                        src={`http://localhost:5000${
                          user.profileImage.startsWith("/uploads/profileImages")
                            ? user.profileImage
                            : `/uploads/profileImages/${user.profileImage.split("/").pop()}`
                        }`}
                        alt={user.name}
                        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                        onError={(e) => (e.target.src = "/default-avatar.png")}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                        N/A
                      </div>
                    )}
                  </td>

                  <td className="py-4 pr-3 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{user.email}</td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{user.mobile || "-"}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {user.roles && user.roles.length > 0
                      ? user.roles.map((role) => role.name).join(", ")
                      : "No Role"}
                  </td>
                  <td className="px-3 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-0 space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-900"
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
