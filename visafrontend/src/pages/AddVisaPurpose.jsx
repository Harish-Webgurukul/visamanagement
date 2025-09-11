import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddVisaPurpose() {
  const [formData, setFormData] = useState({
    key: "",
    name: "",
    description: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ for edit mode

  // Fetch existing Visa Purpose if editing
  const fetchVisaPurpose = async () => {
    if (!id) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/visapurpose/${id}`);
      const data = res.data?.data || res.data;
      if (data) {
        setFormData({
          key: data.key || "",
          name: data.name || "",
          description: data.description || "",
          isActive: data.isActive !== undefined ? data.isActive : true,
        });
      }
    } catch (err) {
      console.error("❌ Error fetching Visa Purpose:", err);
      toast.error("❌ Failed to load data for editing.");
    }
  };

  useEffect(() => {
    fetchVisaPurpose();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        // ✅ Edit existing Visa Purpose
        await axios.put(`http://localhost:5000/api/visapurpose/${id}`, formData);
        toast.success("✅ Visa Purpose updated successfully!");
      } else {
        // ✅ Add new Visa Purpose
        await axios.post("http://localhost:5000/api/visapurpose", formData);
        toast.success("✅ Visa Purpose added successfully!");
        setFormData({ key: "", name: "", description: "", isActive: true });
      }

      setTimeout(() => navigate("/visaPurpose"), 1000);
    } catch (err) {
      console.error(err);
      toast.error("❌ Error saving Visa Purpose. Key might be duplicate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {id ? "Edit Visa Purpose" : "Add Visa Purpose"}
      </h2>

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
            placeholder="Unique key (e.g., STUDY)"
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
            placeholder="Visa purpose name (e.g., Study Visa)"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Short description about this visa purpose"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Active Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="text-gray-700 font-medium">Active</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition disabled:opacity-50"
        >
          {loading ? "Saving..." : id ? "Update Visa Purpose" : "Add Visa Purpose"}
        </button>
      </form>
    </div>
  );
}
