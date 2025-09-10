import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
  const [message, setMessage] = useState("");

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
          permissions: data.permissions || [],
          inherits: data.inherits || [],
          isSystem: data.isSystem || false,
        });
      } catch (err) {
        console.error("❌ Error fetching role:", err);
      }
    };

    fetchRole();
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "select-multiple") {
      const selected = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);
      setFormData((prev) => ({ ...prev, [name]: selected }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/role/${id}`, formData);
        setMessage("✅ Role updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/role", formData);
        setMessage("✅ Role added successfully!");
        setFormData({ name: "", description: "", permissions: [], inherits: [], isSystem: false });
      }

      setTimeout(() => navigate("/role"), 1000);
    } catch (err) {
      console.error("❌ Error saving role:", err);
      setMessage("❌ Error saving role. Name might be duplicate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {id ? "Edit Role" : "Add Role"}
      </h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded-md text-center text-white ${
            message.startsWith("✅") ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message}
        </div>
      )}

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

        {/* Permissions */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Permissions</label>
          <select
            name="permissions"
            value={formData.permissions}
            onChange={handleChange}
            multiple
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {permissionsList.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Inherited Roles */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Inherits Roles</label>
          <select
            name="inherits"
            value={formData.inherits}
            onChange={handleChange}
            multiple
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {rolesList.filter((r) => r._id !== id).map((r) => (
              <option key={r._id} value={r._id}>
                {r.name}
              </option>
            ))}
          </select>
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
    </div>
  );
}






