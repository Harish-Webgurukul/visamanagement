import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddFollowup() {
  const [formData, setFormData] = useState({
    enquiry: "",
    type: "call",
    message: "",
    result: "",
    nextFollowupAt: "",
    attachedDocs: [],
  });
  const [enquiries, setEnquiries] = useState([]);
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all enquiries
        const resEnq = await axios.get("http://localhost:5000/api/enquiry");
        if (resEnq.data?.data && Array.isArray(resEnq.data.data)) {
          setEnquiries(resEnq.data.data);
        }

        // Fetch all documents
        const resDocs = await axios.get("http://localhost:5000/api/document");
        if (resDocs.data?.data && Array.isArray(resDocs.data.data)) {
          setDocuments(resDocs.data.data);
        }

        // If edit mode, fetch followup by ID
        if (id) {
          const res = await axios.get(`http://localhost:5000/api/followup/${id}`);
          if (res.data?.data) {
            const f = res.data.data;
            setFormData({
              enquiry: f.enquiry?._id || f.enquiry || "",
              type: f.type || "call",
              message: f.message || "",
              result: f.result || "",
              nextFollowupAt: f.nextFollowupAt
                ? new Date(f.nextFollowupAt).toISOString().slice(0, 16)
                : "",
              attachedDocs: f.attachedDocs?.map((d) => d._id) || [],
            });
          }
        }
      } catch (err) {
        console.error("❌ Error fetching data:", err);
        toast.error("❌ Failed to fetch followup data");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox for documents
  const handleDocsCheckbox = (docId) => {
    setFormData((prev) => {
      const attached = [...prev.attachedDocs];
      if (attached.includes(docId)) {
        // Remove if already selected
        return { ...prev, attachedDocs: attached.filter((id) => id !== docId) };
      } else {
        // Add if not selected
        attached.push(docId);
        return { ...prev, attachedDocs: attached };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/followup/${id}`, formData);
        toast.success("✅ Followup updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/followup", formData);
        toast.success("✅ Followup added successfully!");
      }
      setTimeout(() => navigate("/followup"), 1500);
    } catch (err) {
      console.error("❌ Error saving followup:", err);
      toast.error("❌ Failed to save followup");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
          {id ? "✏️ Edit Followup" : "➕ Add Followup"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Enquiry */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Enquiry <span className="text-red-500">*</span>
            </label>
            <select
              name="enquiry"
              value={formData.enquiry}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">-- Select Enquiry --</option>
              {enquiries.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.customerName || e._id}
                </option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Followup Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="call">📞 Call</option>
              <option value="email">✉️ Email</option>
              <option value="whatsapp">💬 WhatsApp</option>
              <option value="sms">📲 SMS</option>
              <option value="automated_call">🤖 Automated Call</option>
              <option value="automated_whatsapp">🤖 Automated WhatsApp</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              placeholder="Enter followup message..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Result */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Result
            </label>
            <input
              type="text"
              name="result"
              value={formData.result}
              onChange={handleChange}
              placeholder="Enter followup result"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Next Followup */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Next Followup Date
            </label>
            <input
              type="datetime-local"
              name="nextFollowupAt"
              value={formData.nextFollowupAt}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Attached Documents - checkboxes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Attach Documents
            </label>
            <div className="flex flex-col space-y-2">
              {documents.map((doc) => (
                <label key={doc._id} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.attachedDocs.includes(doc._id)}
                    onChange={() => handleDocsCheckbox(doc._id)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">{doc.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate("/followup")}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-md transition"
            >
              {id ? "Update Followup" : "Save Followup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
