import { useState, useEffect } from "react";
import axios from "axios";

export default function AddDocument() {
  const [formData, setFormData] = useState({
    country: "",
    purpose: "",
    name: "",
    requiredDocuments: [""],
    tags: [""],
    notes: "",
    isTemplate: false,
  });

  const [countries, setCountries] = useState([]); // ✅ start as array
  const [purposes, setPurposes] = useState([]); // ✅ start as array
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch dropdown data
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/country")
      .then((res) => {
        console.log("Countries API response:", res.data);
        // ✅ adjust based on API shape
        setCountries(Array.isArray(res.data) ? res.data : res.data.countries || []);
      })
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:5000/api/visapurpose")
      .then((res) => {
        console.log("VisaPurpose API response:", res.data);
        setPurposes(Array.isArray(res.data) ? res.data : res.data.purposes || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle array fields (requiredDocuments, tags)
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

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/document", formData);
      setMessage("✅ Document added successfully!");
      setFormData({
        country: "",
        purpose: "",
        name: "",
        requiredDocuments: [""],
        tags: [""],
        notes: "",
        isTemplate: false,
      });
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
        Add Document
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
            {Array.isArray(countries) &&
              countries.map((c) => (
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
            {Array.isArray(purposes) &&
              purposes.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
          </select>
        </div>

        {/* Document Name */}
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
          {formData.requiredDocuments.map((doc, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={doc}
                onChange={(e) =>
                  handleArrayChange(index, "requiredDocuments", e.target.value)
                }
                placeholder="Enter document"
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <button
                type="button"
                onClick={() => removeArrayField(index, "requiredDocuments")}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("requiredDocuments")}
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
          >
            + Add Document
          </button>
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
          {loading ? "Saving..." : "Add Document"}
        </button>
      </form>
    </div>
  );
}
