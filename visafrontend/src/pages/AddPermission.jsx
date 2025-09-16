
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddPermission() {
  const { id } = useParams(); // Get permission id from route params (for edit mode)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);

  // Fetch permission data when editing
  useEffect(() => {
    if (!id) return;

    const fetchPermission = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/permission/${id}`);
        const data = res.data.data || res.data;

        setFormData({
          name: data.name || "",
          description: data.description || ""
        });
      } catch (err) {
        console.error("❌ Error fetching permission:", err);
        toast.error("❌ Failed to fetch permission details!");
      }
    };

    fetchPermission();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        // Update existing permission
        await axios.put(`http://localhost:5000/api/permission/${id}`, formData);
        toast.success("✅ Permission updated successfully!");
      } else {
        // Create new permission
        await axios.post("http://localhost:5000/api/permission", formData);
        toast.success("✅ Permission added successfully!");
        setFormData({ name: "", description: "" });
      }

      // Redirect after success
      setTimeout(() => navigate("/permission"), 1200);
    } catch (err) {
      console.error("❌ Error saving permission:", err);

      const errorMessage = err.response?.data?.message || "❌ Error saving permission!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {id ? "Edit Permission" : "Add Permission"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., Create Enquiry"
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
            placeholder="Optional description of permission"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
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
