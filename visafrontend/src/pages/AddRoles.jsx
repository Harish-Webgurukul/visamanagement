import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddRoles() {
  const { id } = useParams(); // For editing
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [],
    inherits: [],
    isSystem: false,
  });

  const [permissionsList, setPermissionsList] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all permissions and roles
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [permRes, roleRes] = await Promise.all([
          axios.get("http://localhost:5000/api/permission"),
          axios.get("http://localhost:5000/api/role"),
        ]);

        setPermissionsList(Array.isArray(permRes.data) ? permRes.data : permRes.data?.data || []);
        setRolesList(Array.isArray(roleRes.data) ? roleRes.data : roleRes.data?.data || []);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
        toast.error("Error fetching permissions/roles");
      }
    };

    fetchData();
  }, []);

  // Fetch role data if editing
  useEffect(() => {
    if (!id) return;
    const fetchRole = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/role/${id}`);
        const data = res.data.data || res.data;

        setFormData({
          name: data.name || "",
          description: data.description || "",
          permissions: data.permissions?.map((p) => p._id) || [], // only IDs
          inherits: data.inherits?.map((r) => r._id) || [],       // only IDs
          isSystem: data.isSystem || false,
        });
      } catch (err) {
        console.error("❌ Error fetching role:", err);
        toast.error("Error fetching role data");
      }
    };

    fetchRole();
  }, [id]);

  // Handle text/checkbox changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name !== "isSystem") {
      // For permissions and inherits
      setFormData((prev) => {
        const current = prev[name] || [];
        return {
          ...prev,
          [name]: checked
            ? [...current, value] // add if checked
            : current.filter((v) => v !== value), // remove if unchecked
        };
      });
    } else if (name === "isSystem") {
      setFormData((prev) => ({ ...prev, isSystem: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/role/${id}`, formData);
        toast.success("✅ Role updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/role", formData);
        toast.success("✅ Role added successfully!");
        setFormData({ name: "", description: "", permissions: [], inherits: [], isSystem: false });
      }

      setTimeout(() => navigate("/role"), 1200);
    } catch (err) {
      console.error("❌ Error saving role:", err);
      toast.error("❌ Error saving role. Name might be duplicate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {id ? "Edit Role" : "Add Role"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Role Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter role name"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Permissions (Checkboxes) */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Permissions</label>
          <div className="grid grid-cols-2 gap-2">
            {permissionsList.map((p) => (
              <label key={p._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="permissions"
                  value={p._id}
                  checked={formData.permissions.includes(p._id)}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-gray-700">{p.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Inherits Roles (Checkboxes) */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Inherits Roles</label>
          <div className="grid grid-cols-2 gap-2">
            {rolesList
              .filter((r) => r._id !== id) // avoid self-reference
              .map((r) => (
                <label key={r._id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="inherits"
                    value={r._id}
                    checked={formData.inherits.includes(r._id)}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">{r.name}</span>
                </label>
              ))}
          </div>
        </div>

        {/* System Role */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isSystem"
            checked={formData.isSystem}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="text-gray-700 font-medium">System Role</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition disabled:opacity-50"
        >
          {loading ? "Saving..." : id ? "Update Role" : "Add Role"}
        </button>
      </form>

      {/* Toastify container */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
}
