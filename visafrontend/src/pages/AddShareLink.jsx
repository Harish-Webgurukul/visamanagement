import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AddShareLink() {
  const [formData, setFormData] = useState({
    visaOption: "",
    token: "",
    expiresAt: "",
    isOneTime: false,
  });
  const [loading, setLoading] = useState(false);
  const [visaOptions, setVisaOptions] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch visa options
  const fetchVisaOptions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/visa-option");
      setVisaOptions(Array.isArray(res.data) ? res.data : res.data?.data || []);
    } catch (err) {
      console.error("❌ Error fetching visa options:", err);
    }
  };

  // Fetch share link data if editing
  const fetchShareLink = async () => {
    if (!id) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/share-link/${id}`);
      if (res.data) {
        setFormData({
          visaOption: res.data.visaOption?._id || "",
          token: res.data.token || "",
          expiresAt: res.data.expiresAt ? res.data.expiresAt.slice(0, 10) : "",
          isOneTime: res.data.isOneTime || false,
        });
      }
    } catch (err) {
      console.error("❌ Error fetching share link:", err);
    }
  };

  useEffect(() => {
    fetchVisaOptions();
    fetchShareLink();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Auto-generate token
  const generateToken = () => {
    const token = Math.random().toString(36).substr(2, 10).toUpperCase();
    setFormData((prev) => ({ ...prev, token }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/share-link/${id}`, formData);
        setMessage("✅ Share Link updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/share-link", formData);
        setMessage("✅ Share Link added successfully!");
        setFormData({ visaOption: "", token: "", expiresAt: "", isOneTime: false });
      }
      setTimeout(() => navigate("/sharelink"), 1000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error saving Share Link. Token might be duplicate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {id ? "Edit Share Link" : "Add Share Link"}
      </h2>

      {message && (
        <div className="mb-4 p-3 rounded-md text-center text-white bg-blue-500">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Visa Option */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Visa Option *</label>
          <select
            name="visaOption"
            value={formData.visaOption}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select Visa Option</option>
            {visaOptions.map((v) => (
              <option key={v._id} value={v._id}>
                {v.title}
              </option>
            ))}
          </select>
        </div>

        {/* Token */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Token *</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="token"
              value={formData.token}
              onChange={handleChange}
              required
              placeholder="Unique token"
              className="flex-1 border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={generateToken}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 rounded-md transition"
            >
              Generate
            </button>
          </div>
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Expires At</label>
          <input
            type="date"
            name="expiresAt"
            value={formData.expiresAt}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* One-Time */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isOneTime"
            checked={formData.isOneTime}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="text-gray-700 font-medium">One-Time Link</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition disabled:opacity-50"
        >
          {loading ? "Saving..." : id ? "Update Share Link" : "Add Share Link"}
        </button>
      </form>
    </div>
  );
}
