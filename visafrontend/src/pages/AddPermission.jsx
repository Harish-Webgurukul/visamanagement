import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AddPermission() {
  const { id } = useParams(); // If editing
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    key: "",
    name: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch permission data for edit
  useEffect(() => {
    if (!id) return;
    const fetchPermission = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/permission/${id}`);
        const data = res.data.data || res.data; // handle API response
        setFormData({
          key: data.key || "",
          name: data.name || "",
          description: data.description || ""
        });
      } catch (err) {
        console.error("❌ Error fetching permission:", err);
      }
    };
    fetchPermission();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/permission/${id}`, formData);
        setMessage("✅ Permission updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/permission", formData);
        setMessage("✅ Permission added successfully!");
        setFormData({ key: "", name: "", description: "" });
      }

      // Redirect after a short delay
      setTimeout(() => navigate("/permission"), 1000);
    } catch (err) {
      console.error("❌ Error saving permission:", err);
      setMessage("❌ Error saving permission. Key might be duplicate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {id ? "Edit Permission" : "Add Permission"}
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
        {/* Key */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Key *</label>
          <input
            type="text"
            name="key"
            value={formData.key}
            onChange={handleChange}
            required
            placeholder="e.g., enquiry:create"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Human-readable name"
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
            placeholder="Optional description"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition disabled:opacity-50"
        >
          {loading ? "Saving..." : id ? "Update Permission" : "Add Permission"}
        </button>
      </form>
    </div>
  );
}
