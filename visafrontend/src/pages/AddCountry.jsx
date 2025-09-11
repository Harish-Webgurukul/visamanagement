import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch country for edit mode
  const fetchCountry = async () => {
    if (!id) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/country/${id}`);
      const country = res.data?.data || res.data; // handle nested data

      if (country) {
        setFormData({
          name: country.name || "",
          iso2: country.iso2 || "",
          iso3: country.iso3 || "",
          flagUrl: country.flagUrl || "",
          defaultCurrency: country.defaultCurrency || "",
          meta: country.meta ? JSON.stringify(country.meta) : ""
        });
      }
    } catch (err) {
      console.error("❌ Error fetching country:", err);
      toast.error("❌ Failed to load country data.");
    }
  };

  useEffect(() => {
    fetchCountry();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        meta: formData.meta ? JSON.parse(formData.meta) : {}
      };

      if (id) {
        await axios.put(`http://localhost:5000/api/country/${id}`, payload);
        toast.success("✅ Country updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/country", payload);
        toast.success("✅ Country added successfully!");
        setFormData({ name: "", iso2: "", iso3: "", flagUrl: "", defaultCurrency: "", meta: "" });
      }

      setTimeout(() => navigate("/country"), 1000);
    } catch (err) {
      console.error(err);
      toast.error("❌ Error saving country. Check your 'meta' JSON.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <h2 className="text-2xl font-bold mb-6 text-center">
        {id ? "Edit Country" : "Add Country"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "iso2", "iso3", "flagUrl", "defaultCurrency"].map((field) => (
          <div key={field}>
            <label className="block font-medium mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required={field === "name"}
            />
          </div>
        ))}

        {/* Meta */}
        <div>
          <label className="block font-medium mb-1">Meta (JSON)</label>
          <textarea
            name="meta"
            value={formData.meta}
            onChange={handleChange}
            placeholder='e.g. {"population": 1000000}'
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white font-medium p-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : id ? "Update Country" : "Add Country"}
        </button>
      </form>
    </div>
  );
}
