import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddNotification() {
  const [formData, setFormData] = useState({
    toUser: "",
    toEmail: "",
    toMobile: "",
    type: "inapp",
    title: "",
    body: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // For edit mode

  // Fetch notification data for edit mode
  useEffect(() => {
    if (!id) return;

    const fetchNotification = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notification/${id}`);
        const data = res.data?.data || res.data;

        if (data) {
          setFormData({
            toUser: data.toUser || "",
            toEmail: data.toContact?.email || "",
            toMobile: data.toContact?.mobile || "",
            type: data.type || "inapp",
            title: data.title || "",
            body: data.body || "",
          });
        }
      } catch (err) {
        console.error("❌ Error fetching notification:", err);
        toast.error("❌ Failed to load notification data.");
      }
    };

    fetchNotification();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      toUser: formData.toUser || null,
      toContact: {
        email: formData.toEmail || null,
        mobile: formData.toMobile || null,
      },
      type: formData.type,
      title: formData.title,
      body: formData.body,
    };

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/notification/${id}`, payload);
        toast.success("✅ Notification updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/notification", payload);
        toast.success("✅ Notification added successfully!");
        setFormData({
          toUser: "",
          toEmail: "",
          toMobile: "",
          type: "inapp",
          title: "",
          body: "",
        });
      }

      setTimeout(() => navigate("/notification"), 1000);
    } catch (err) {
      console.error(err);
      toast.error("❌ Error saving notification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {id ? "Edit Notification" : "Add Notification"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* To User */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">To User (optional)</label>
          <input
            type="text"
            name="toUser"
            value={formData.toUser}
            onChange={handleChange}
            placeholder="User ID"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* To Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email (optional)</label>
          <input
            type="email"
            name="toEmail"
            value={formData.toEmail}
            onChange={handleChange}
            placeholder="example@mail.com"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* To Mobile */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Mobile (optional)</label>
          <input
            type="text"
            name="toMobile"
            value={formData.toMobile}
            onChange={handleChange}
            placeholder="+1234567890"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Type *</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="inapp">In-App</option>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="sms">SMS</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Notification title"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Body */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Body *</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Notification message"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition disabled:opacity-50"
        >
          {loading ? "Saving..." : id ? "Update Notification" : "Add Notification"}
        </button>
      </form>
    </div>
  );
}
