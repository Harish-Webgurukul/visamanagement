import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddAuditLog() {
  const [formData, setFormData] = useState({
    action: "",
    performedBy: "",
    ip: "",
    userAgent: "",
    targetKind: "",
    targetId: "",
    before: "",
    after: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate JSON
    let beforeObj = undefined;
    let afterObj = undefined;
    try {
      if (formData.before.trim()) beforeObj = JSON.parse(formData.before);
      if (formData.after.trim()) afterObj = JSON.parse(formData.after);
    } catch {
      toast.error("❌ 'Before' or 'After' fields must be valid JSON!");
      setLoading(false);
      return;
    }

    // Construct payload
    const payload = {
      action: formData.action,
      performedBy: formData.performedBy || "",
      ip: formData.ip || "",
      userAgent: formData.userAgent || "",
      target: {
        kind: formData.targetKind || "",
        item: formData.targetId || "",
      },
      ...(beforeObj !== undefined && { before: beforeObj }),
      ...(afterObj !== undefined && { after: afterObj }),
    };

    try {
      const res = await axios.post("http://localhost:5000/api/auditlog", payload);

      // Success
      toast.success("✅ Audit Log added successfully!");
      setFormData({
        action: "",
        performedBy: "",
        ip: "",
        userAgent: "",
        targetKind: "",
        targetId: "",
        before: "",
        after: "",
      });

      setTimeout(() => navigate("/auditLog"), 1000);
    } catch (err) {
      console.error(err);
      if (err.response?.data?.errors) {
        toast.error(`❌ Error: ${err.response.data.errors.join(", ")}`);
      } else {
        toast.error("❌ Server Error: Check console for details");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Add Audit Log
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Action *</label>
          <input
            type="text"
            name="action"
            value={formData.action}
            onChange={handleChange}
            required
            placeholder="Action performed"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Performed By</label>
          <input
            type="text"
            name="performedBy"
            value={formData.performedBy}
            onChange={handleChange}
            placeholder="User ID"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">IP Address</label>
          <input
            type="text"
            name="ip"
            value={formData.ip}
            onChange={handleChange}
            placeholder="127.0.0.1"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">User Agent</label>
          <input
            type="text"
            name="userAgent"
            value={formData.userAgent}
            onChange={handleChange}
            placeholder="Browser or app info"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Target Kind</label>
          <input
            type="text"
            name="targetKind"
            value={formData.targetKind}
            onChange={handleChange}
            placeholder="Target model kind"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Target ID</label>
          <input
            type="text"
            name="targetId"
            value={formData.targetId}
            onChange={handleChange}
            placeholder="Target model ID"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Before (JSON)</label>
          <textarea
            name="before"
            value={formData.before}
            onChange={handleChange}
            rows={3}
            placeholder='{"name": "John"}'
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">After (JSON)</label>
          <textarea
            name="after"
            value={formData.after}
            onChange={handleChange}
            rows={3}
            placeholder='{"name": "John Doe"}'
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Audit Log"}
        </button>
      </form>
    </div>
  );
}
