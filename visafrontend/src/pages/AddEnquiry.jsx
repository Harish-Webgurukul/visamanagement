import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddEnquiry() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    mobile: "",
    source: "",
    assignedTo: "",
    country: "",
    purpose: "",
    travelFrom: "",
    travelTo: "",
    adults: 1,
    children: 0,
    selectedVisaOption: "",
    status: "new",
    notes: "",
    isGuest: true,
  });

  const [loading, setLoading] = useState(false);
  const [visaPurposes, setVisaPurposes] = useState([]);
  const [visaOptions, setVisaOptions] = useState([]);
  const [countries, setCountries] = useState([]);

  // Static source options for dropdown
  const sourceOptions = [
    "Website",
    "Referral",
    "Advertisement",
    "Social Media",
    "Walk-in",
    "Email Campaign",
    "Other"
  ];

  // Fetch countries
  const fetchCountries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/country");
      if (Array.isArray(res.data)) setCountries(res.data);
      else if (res.data.data && Array.isArray(res.data.data)) setCountries(res.data.data);
      else setCountries([]);
    } catch (err) {
      console.error("❌ Error fetching countries:", err);
      toast.error("Failed to fetch countries ❌");
    }
  };

  // Fetch visa purposes
  const fetchVisaPurposes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/visapurpose");
      if (Array.isArray(res.data)) setVisaPurposes(res.data);
      else if (res.data.data && Array.isArray(res.data.data)) setVisaPurposes(res.data.data);
      else setVisaPurposes([]);
    } catch (err) {
      console.error("❌ Error fetching visa purposes:", err);
      toast.error("Failed to fetch visa purposes ❌");
    }
  };

  // Fetch visa options
  const fetchVisaOptions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/visaoption");
      if (Array.isArray(res.data)) setVisaOptions(res.data);
      else if (res.data.data && Array.isArray(res.data.data)) setVisaOptions(res.data.data);
      else setVisaOptions([]);
    } catch (err) {
      console.error("❌ Error fetching visa options:", err);
      toast.error("Failed to fetch visa options ❌");
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchVisaPurposes();
    fetchVisaOptions();
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/enquiry/${id}`)
        .then((res) => {
          const enquiry = res.data.data;
          setFormData({
            customerName: enquiry.customerName || "",
            email: enquiry.email || "",
            mobile: enquiry.mobile || "",
            source: enquiry.source || "",
            assignedTo: enquiry.assignedTo?._id || "",
            country: enquiry.country?._id || "",
            purpose: enquiry.purpose?._id || "",
            travelFrom: enquiry.travelDates?.from?.substring(0, 10) || "",
            travelTo: enquiry.travelDates?.to?.substring(0, 10) || "",
            adults: enquiry.adults || 1,
            children: enquiry.children || 0,
            selectedVisaOption: enquiry.selectedVisaOption?._id || "",
            status: enquiry.status || "new",
            notes: enquiry.notes || "",
            isGuest: enquiry.isGuest ?? true,
          });
        })
        .catch((err) => {
          console.error("❌ Failed to fetch enquiry:", err);
          toast.error("Failed to load enquiry details ❌");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        customerName: formData.customerName,
        email: formData.email || undefined,
        mobile: formData.mobile || undefined,
        source: formData.source || undefined,
        assignedTo: formData.assignedTo || null,
        country: formData.country || null,
        purpose: formData.purpose || null,
        travelDates: {
          from: formData.travelFrom || null,
          to: formData.travelTo || null,
        },
        adults: formData.adults,
        children: formData.children,
        selectedVisaOption: formData.selectedVisaOption || null,
        status: formData.status,
        notes: formData.notes,
        isGuest: formData.isGuest,
      };

      if (id) {
        await axios.put(`http://localhost:5000/api/enquiry/${id}`, payload);
        toast.success("✅ Enquiry updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/enquiry", payload);
        toast.success("✅ Enquiry submitted successfully!");
      }

      setTimeout(() => navigate("/enquiry"), 1500);
    } catch (err) {
      console.error("❌ Error submitting enquiry:", err.response?.data || err.message);
      toast.error("Error submitting enquiry ❌");
    }
  };

  const handleBack = () => {
    navigate("/enquiry");
  };

  if (loading) return <p className="text-center mt-10">Loading enquiry...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {id ? "Edit Enquiry" : "Add New Enquiry"}
        </h1>
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-500 transition duration-200"
        >
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Name *</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="mt-2 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Email & Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Source & AssignedTo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Source</label>
            <div className="mt-2 relative">
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
              >
                <option value="">Select a source</option>
                {sourceOptions.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Assigned To (User ID)</label>
            <input
              type="text"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Country & Purpose */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <div className="mt-2 relative">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country._id} value={country._id}>
                    {country.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Purpose</label>
            <div className="mt-2 relative">
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
              >
                <option value="">Select a purpose</option>
                {visaPurposes.map((purpose) => (
                  <option key={purpose._id} value={purpose._id}>
                    {purpose.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Travel Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Travel From</label>
            <input
              type="date"
              name="travelFrom"
              value={formData.travelFrom}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Travel To</label>
            <input
              type="date"
              name="travelTo"
              value={formData.travelTo}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Adults & Children */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Adults</label>
            <input
              type="number"
              name="adults"
              value={formData.adults}
              min={1}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Children</label>
            <input
              type="number"
              name="children"
              value={formData.children}
              min={0}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Visa Option & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Visa Option</label>
            <div className="mt-2 relative">
              <select
                name="selectedVisaOption"
                value={formData.selectedVisaOption}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
              >
                <option value="">Select a visa option</option>
                {visaOptions.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.title}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="inprogress">In Progress</option>
              <option value="closed">Closed</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="mt-2 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Is Guest */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isGuest"
            checked={formData.isGuest}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="text-sm font-medium text-gray-700">Is Guest</label>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-500 transition duration-200"
          >
            {id ? "Update Enquiry" : "Submit Enquiry"}
          </button>
        </div>
      </form>
    </div>
  );
}