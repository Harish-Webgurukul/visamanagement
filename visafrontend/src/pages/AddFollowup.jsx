import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDocsChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setFormData({ ...formData, attachedDocs: selected });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/followup/${id}`, formData);
        alert("✅ Followup updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/followup", formData);
        alert("✅ Followup added successfully!");
      }
      navigate("/followup");
    } catch (err) {
      console.error("❌ Error saving followup:", err);
      alert("Failed to save followup.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
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

          {/* Attached Documents */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Attach Documents
            </label>
            <select
              multiple
              value={formData.attachedDocs}
              onChange={handleDocsChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {documents.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Hold <kbd className="px-1 bg-gray-200 rounded">Ctrl</kbd> (or{" "}
              <kbd className="px-1 bg-gray-200 rounded">Cmd</kbd>) to select
              multiple.
            </p>
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
