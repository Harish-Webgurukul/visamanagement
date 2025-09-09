import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes
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
    setMessage("");

    try {
      const payload = {
        action: formData.action,
        performedBy: formData.performedBy,
        ip: formData.ip,
        userAgent: formData.userAgent,
        target: {
          kind: formData.targetKind,
          item: formData.targetId || null,
        },
        before: formData.before ? JSON.parse(formData.before) : null,
        after: formData.after ? JSON.parse(formData.after) : null,
      };

      await axios.post("http://localhost:5000/api/auditlog", payload);

      setMessage("✅ Audit Log added successfully!");
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
      setMessage("❌ Error adding Audit Log. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Add Audit Log
      </h2>

      {message && (
        <div className="mb-4 p-3 rounded-md text-center text-white bg-blue-500">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Action */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Action *</label>
          <input
            type="text"
            name="action"
            value={formData.action}
            onChange={handleChange}
            required
            placeholder="Action performed (e.g., Created User)"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Performed By */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Performed By (User ID)</label>
          <input
            type="text"
            name="performedBy"
            value={formData.performedBy}
            onChange={handleChange}
            placeholder="User ID who performed the action"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* IP */}
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

        {/* User Agent */}
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

        {/* Target */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Target Kind</label>
          <input
            type="text"
            name="targetKind"
            value={formData.targetKind}
            onChange={handleChange}
            placeholder="Target model kind (e.g., User)"
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

        {/* Before */}
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

        {/* After */}
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

        {/* Submit Button */}
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
