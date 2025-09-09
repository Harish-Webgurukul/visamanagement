import { useState, useEffect } from "react";
import axios from "axios";

export default function AddVisaOption() {
  const [formData, setFormData] = useState({
    country: "",
    purpose: "",
    title: "",
    editorHtml: "",
    fees: [],
    documentRequirements: [],
    addOnNotes: "",
    attachments: [],
    isActive: true,
  });

  const [countries, setCountries] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch countries and visa purposes
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [countriesRes, purposesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/countries"),
          axios.get("http://localhost:5000/api/visapurpose"),
        ]);
        setCountries(countriesRes.data);
        setPurposes(purposesRes.data);
      } catch (err) {
        console.error("Error fetching dropdown data", err);
      }
    };
    fetchOptions();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      attachments: Array.from(e.target.files),
    }));
  };

  // Add Fee Item
  const addFeeItem = () => {
    setFormData((prev) => ({
      ...prev,
      fees: [...prev.fees, { title: "", adultPrice: 0, childPrice: 0, serviceFee: 0, currency: "USD" }],
    }));
  };

  // Update Fee Item
  const updateFeeItem = (index, field, value) => {
    const updatedFees = [...formData.fees];
    updatedFees[index][field] = value;
    setFormData((prev) => ({ ...prev, fees: updatedFees }));
  };

  // Add Document Requirement
  const addDocRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      documentRequirements: [...prev.documentRequirements, { title: "", code: "", required: true, providedBy: "guest", type: "edoc", notes: "" }],
    }));
  };

  // Update Document Requirement
  const updateDocRequirement = (index, field, value) => {
    const updatedDocs = [...formData.documentRequirements];
    updatedDocs[index][field] = value;
    setFormData((prev) => ({ ...prev, documentRequirements: updatedDocs }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "fees" || key === "documentRequirements") {
          form.append(key, JSON.stringify(formData[key]));
        } else if (key === "attachments") {
          formData.attachments.forEach((file) => form.append("attachments", file));
        } else {
          form.append(key, formData[key]);
        }
      });

      await axios.post("http://localhost:5000/api/visaoptions", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Visa Option added successfully!");
      setFormData({
        country: "",
        purpose: "",
        title: "",
        editorHtml: "",
        fees: [],
        documentRequirements: [],
        addOnNotes: "",
        attachments: [],
        isActive: true,
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Error saving Visa Option.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Visa Option</h2>

      {message && <div className="mb-4 p-3 text-white text-center bg-indigo-600 rounded">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Country */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Country *</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select Country --</option>
            {countries.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Purpose */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Visa Purpose *</label>
          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select Purpose --</option>
            {purposes.map((p) => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Visa Option Title"
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Editor HTML */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Editor Content</label>
          <textarea
            name="editorHtml"
            value={formData.editorHtml}
            onChange={handleChange}
            rows={4}
            placeholder="Enter HTML or description..."
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Fees */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Fees</label>
          {formData.fees.map((fee, index) => (
            <div key={index} className="grid grid-cols-5 gap-2 mb-2">
              <input type="text" placeholder="Title" value={fee.title} onChange={(e) => updateFeeItem(index, "title", e.target.value)} className="border p-2 rounded" />
              <input type="number" placeholder="Adult Price" value={fee.adultPrice} onChange={(e) => updateFeeItem(index, "adultPrice", e.target.value)} className="border p-2 rounded" />
              <input type="number" placeholder="Child Price" value={fee.childPrice} onChange={(e) => updateFeeItem(index, "childPrice", e.target.value)} className="border p-2 rounded" />
              <input type="number" placeholder="Service Fee" value={fee.serviceFee} onChange={(e) => updateFeeItem(index, "serviceFee", e.target.value)} className="border p-2 rounded" />
              <input type="text" placeholder="Currency" value={fee.currency} onChange={(e) => updateFeeItem(index, "currency", e.target.value)} className="border p-2 rounded" />
            </div>
          ))}
          <button type="button" onClick={addFeeItem} className="mt-2 bg-green-500 text-white px-3 py-1 rounded">+ Add Fee</button>
        </div>

        {/* Document Requirements */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Document Requirements</label>
          {formData.documentRequirements.map((doc, index) => (
            <div key={index} className="grid grid-cols-5 gap-2 mb-2">
              <input type="text" placeholder="Title" value={doc.title} onChange={(e) => updateDocRequirement(index, "title", e.target.value)} className="border p-2 rounded" />
              <input type="text" placeholder="Code" value={doc.code} onChange={(e) => updateDocRequirement(index, "code", e.target.value)} className="border p-2 rounded" />
              <select value={doc.providedBy} onChange={(e) => updateDocRequirement(index, "providedBy", e.target.value)} className="border p-2 rounded">
                <option value="guest">Guest</option>
                <option value="consultant">Consultant</option>
                <option value="both">Both</option>
              </select>
              <select value={doc.type} onChange={(e) => updateDocRequirement(index, "type", e.target.value)} className="border p-2 rounded">
                <option value="edoc">E-Doc</option>
                <option value="physical">Physical</option>
                <option value="both">Both</option>
              </select>
              <input type="text" placeholder="Notes" value={doc.notes} onChange={(e) => updateDocRequirement(index, "notes", e.target.value)} className="border p-2 rounded" />
            </div>
          ))}
          <button type="button" onClick={addDocRequirement} className="mt-2 bg-green-500 text-white px-3 py-1 rounded">+ Add Document</button>
        </div>

        {/* Add-on Notes */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Add-on Notes</label>
          <textarea
            name="addOnNotes"
            value={formData.addOnNotes}
            onChange={handleChange}
            rows={3}
            placeholder="Extra notes..."
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Attachments */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Attachments</label>
          <input type="file" multiple onChange={handleFileChange} className="w-full border border-gray-300 p-2 rounded" />
        </div>

        {/* Active Toggle */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
          <label className="text-gray-700 font-medium">Active</label>
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition disabled:opacity-50">
          {loading ? "Saving..." : "Add Visa Option"}
        </button>
      </form>
    </div>
  );
}
