
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Country() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch countries
  const fetchCountries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/country");
      setCountries(res.data?.data || res.data || []);
    } catch (err) {
      console.error("❌ Error fetching countries:", err);
      toast.error("Failed to fetch countries ❌");
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Delete country
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this country?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/country/${id}`);
      toast.success("Country deleted successfully!");
      fetchCountries();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete country ❌");
    }
  };

  // Filter countries
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="sm:flex sm:items-center justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Countries</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all countries and their currencies.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => navigate("/add-country")}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Add Country
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mt-4 mb-4">
        <input
          type="text"
          placeholder="Search country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-64 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="-mx-4 sm:-mx-0 ring-1 ring-gray-300 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">#</th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">Country</th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">Currency</th>
              <th className="px-3 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredCountries.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4 text-gray-500 text-sm"
                >
                  No countries found.
                </td>
              </tr>
            ) : (
              filteredCountries.map((country, index) => (
                <tr key={country._id}>
                  <td className="px-3 py-4 text-gray-600">{index + 1}</td>
                  <td className="px-3 py-4 text-sm font-medium text-gray-900">{country.name}</td>
                  <td className="px-3 py-4 text-sm text-gray-500 hidden md:table-cell">{country.defaultCurrency || "-"}</td>
                  <td className="px-3 py-4 text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => navigate(`/add-country/${country._id}`)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(country._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
