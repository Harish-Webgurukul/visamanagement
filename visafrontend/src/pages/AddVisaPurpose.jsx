
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddVisaPurpose() {
  const [formData, setFormData] = useState({
    key: "",
    name: "",
    description: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ React Router navigation

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/visapurpose", formData);
      setMessage("✅ Visa Purpose added successfully!");
      setFormData({ key: "", name: "", description: "", isActive: true });

      // ✅ Navigate to list page after 1.5 sec
      setTimeout(() => {
        navigate("/visaPurpose"); // change path as per your routes
      }, 150);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error: Could not save Visa Purpose. Key might be duplicate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Add Visa Purpose
      </h2>

      {message && (
        <div className="mb-4 p-3 rounded-md text-center text-white bg-blue-500">
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
          {loading ? "Saving..." : "Add Visa Purpose"}
        </button>
      </form>
    </div>
  );
}

