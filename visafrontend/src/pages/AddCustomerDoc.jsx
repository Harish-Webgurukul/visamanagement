import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AddCustomerDoc() {
  const [enquiries, setEnquiries] = useState([]);
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    enquiry: "",
    uploadedBy: "",
    docCode: "",
    fileType: "",
    isVerified: false,
    sensitive: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { id } = useParams(); // For edit mode if needed

  // Fetch Enquiries & Users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enqRes, userRes] = await Promise.all([
          axios.get("http://localhost:5000/api/enquiry"),
          axios.get("http://localhost:5000/api/user"),
        ]);

        // ✅ Ensure arrays
        setEnquiries(Array.isArray(enqRes.data) ? enqRes.data : enqRes.data?.data || []);
        setUsers(Array.isArray(userRes.data) ? userRes.data : userRes.data?.data || []);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
        setEnquiries([]);
        setUsers([]);
      }
    };
    fetchData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file && !id) return alert("Please select a file to upload.");

    setLoading(true);
    setMessage("");

    const data = new FormData();
    if (file) data.append("file", file);
    data.append("enquiry", formData.enquiry);
    data.append("uploadedBy", formData.uploadedBy);
    data.append("docCode", formData.docCode);
    data.append("fileType", formData.fileType);
    data.append("isVerified", formData.isVerified);
    data.append("sensitive", formData.sensitive);

    try {
      if (id) {
        // Edit existing document
        await axios.put(`http://localhost:5000/api/customer-doc/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("✅ Document updated successfully!");
      } else {
        // Create new document
        await axios.post("http://localhost:5000/api/customer-doc", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("✅ Document uploaded successfully!");
        setFormData({
          enquiry: "",
          uploadedBy: "",
          docCode: "",
          fileType: "",
          isVerified: false,
          sensitive: false,
        });
        setFile(null);
      }
      navigate("/customerDocs");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error uploading document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {id ? "Edit Customer Document" : "Add Customer Document"}
      </h2>

      {message && (
        <div className="mb-4 p-3 rounded-md text-center text-white bg-blue-500">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Enquiry */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Enquiry *</label>
          <select
            name="enquiry"
            value={formData.enquiry}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select Enquiry</option>
            {Array.isArray(enquiries) &&
              enquiries.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.customerName || e._id}
                </option>
              ))}
          </select>
        </div>

        {/* Uploaded By */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Uploaded By *</label>
          <select
            name="uploadedBy"
            value={formData.uploadedBy}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select User</option>
            {Array.isArray(users) &&
              users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name || u.email}
                </option>
              ))}
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">File {id ? "(Optional)" : "*"}</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Doc Code */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Document Code</label>
          <input
            type="text"
            name="docCode"
            value={formData.docCode}
            onChange={handleChange}
            placeholder="e.g., PASSPORT"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* File Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">File Type</label>
          <input
            type="text"
            name="fileType"
            value={formData.fileType}
            onChange={handleChange}
            placeholder="e.g., PDF, Image"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isVerified"
              checked={formData.isVerified}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="text-gray-700 font-medium">Verified</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="sensitive"
              checked={formData.sensitive}
              onChange={handleChange}
              className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <span className="text-gray-700 font-medium">Sensitive</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition disabled:opacity-50"
        >
          {loading ? (id ? "Updating..." : "Uploading...") : id ? "Update Document" : "Add Document"}
        </button>
      </form>
    </div>
  );
}
 