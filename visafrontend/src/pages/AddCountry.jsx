import { useState } from "react";
import axios from "axios";

export default function AddCountry() {
  const [formData, setFormData] = useState({
    name: "",
    iso2: "",
    iso3: "",
    flagUrl: "",
    defaultCurrency: "",
    meta: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Convert meta string to JSON if provided
      const payload = {
        ...formData,
        meta: formData.meta ? JSON.parse(formData.meta) : {}
      };

      const response = await axios.post("/api/country", payload); // Update endpoint if needed
      setMessage("Country added successfully!");
      setFormData({ name: "", iso2: "", iso3: "", flagUrl: "", defaultCurrency: "", meta: "" });
    } catch (error) {
      console.error(error);
      setMessage("Error adding country. Make sure 'meta' is valid JSON.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Add Country</h2>
      {message && (
        <div className="mb-4 p-3 rounded-md text-white bg-blue-500">{message}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">ISO2</label>
          <input
            type="text"
            name="iso2"
            value={formData.iso2}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">ISO3</label>
          <input
            type="text"
            name="iso3"
            value={formData.iso3}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Flag URL</label>
          <input
            type="text"
            name="flagUrl"
            value={formData.flagUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Default Currency</label>
          <input
            type="text"
            name="defaultCurrency"
            value={formData.defaultCurrency}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Meta (JSON)</label>
          <textarea
            name="meta"
            value={formData.meta}
            onChange={handleChange}
            placeholder='e.g. {"population": 1000000}'
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white font-medium p-2 rounded-md hover:bg-blue-600 transition"
        >
          {loading ? "Saving..." : "Add Country"}
        </button>
      </form>
    </div>
  );
}
