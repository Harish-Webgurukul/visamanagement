

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AddDocument() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    country: "",
    purpose: "",
    name: "",
    requiredDocuments: [], // file objects
    tags: [""],
    notes: "",
    isTemplate: false,
  });

  const [countries, setCountries] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch dropdown data
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [countryRes, purposeRes] = await Promise.all([
          axios.get("http://localhost:5000/api/country"),
          axios.get("http://localhost:5000/api/visapurpose"),
        ]);

        setCountries(
          Array.isArray(countryRes.data)
            ? countryRes.data
            : countryRes.data.data || []
        );

        setPurposes(
          Array.isArray(purposeRes.data)
            ? purposeRes.data
            : purposeRes.data.data || []
        );
      } catch (err) {
        console.error("Dropdown fetch failed:", err);
        setCountries([]);
        setPurposes([]);
      }
    };
    fetchDropdowns();
  }, []);

  // Fetch existing document if editing
  useEffect(() => {
    if (!isEditMode) return;
    const fetchDocument = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/document/${id}`);
        const doc = res.data.data || res.data;

        setFormData({
          country: doc.country?._id || "",
          purpose: doc.purpose?._id || "",
          name: doc.name || "",
          requiredDocuments: doc.requiredDocuments || [],
          tags: doc.tags?.length ? doc.tags : [""],
          notes: doc.notes || "",
          isTemplate: doc.isTemplate || false,
        });
      } catch (err) {
        console.error("Error fetching document:", err);
      }
    };
    fetchDocument();
  }, [id, isEditMode]);

  // Handle simple input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle tags array
  const handleArrayChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayField = (index, field) => {
    setFormData((prev) => {
      const updated = [...prev[field]];
      updated.splice(index, 1);
      return { ...prev, [field]: updated };
    });
  };

  // Handle file input for requiredDocuments
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      requiredDocuments: Array.from(e.target.files),
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = new FormData();
      payload.append("country", formData.country);
      payload.append("purpose", formData.purpose);
      payload.append("name", formData.name);
      payload.append("notes", formData.notes);
      payload.append("isTemplate", formData.isTemplate);

      // Append files
      formData.requiredDocuments.forEach((file) => {
        payload.append("requiredDocuments", file);
      });

      // Append tags
      formData.tags.forEach((tag) => payload.append("tags[]", tag));

      if (isEditMode) {
        await axios.put(
          `http://localhost:5000/api/document/${id}`,
          payload,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setMessage("✅ Document updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/document", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("✅ Document added successfully!");
      }

      setTimeout(() => navigate("/document"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error: Could not save Document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {isEditMode ? "Edit Document" : "Add Document"}
      </h2>

      {message && (
        <div className="mb-4 p-3 rounded-md text-center text-white bg-blue-500">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Country */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Country *</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Purpose */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Purpose *</label>
          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select Purpose</option>
            {purposes.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
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
            placeholder="Document name"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Required Documents */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Required Documents</label>
          <input
            type="file"
            name="requiredDocuments"
            multiple
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          {formData.requiredDocuments.length > 0 && (
            <ul className="mt-2 list-disc list-inside">
              {formData.requiredDocuments.map((file, index) => (
                <li key={index} className="text-gray-700">
                  {file.name || file}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Tags</label>
          {formData.tags.map((tag, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={tag}
                onChange={(e) => handleArrayChange(index, "tags", e.target.value)}
                placeholder="Enter tag"
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <button
                type="button"
                onClick={() => removeArrayField(index, "tags")}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("tags")}
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
          >
            + Add Tag
          </button>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Enter notes"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Template Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isTemplate"
            checked={formData.isTemplate}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="text-gray-700 font-medium">Is Template</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition disabled:opacity-50"
        >
          {loading ? "Saving..." : isEditMode ? "Update Document" : "Add Document"}
        </button>
      </form>
    </div>
  );
}
