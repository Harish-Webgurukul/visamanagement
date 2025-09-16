import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const editUser = location.state?.user || null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    passportNo: "",
    dob: "",
    address: "",
    profileImage: null,
    role: "",
    isActive: true,
  });

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [hasExistingImage, setHasExistingImage] = useState(false);
  const [imageError, setImageError] = useState(null); // ✅ Track image loading errors

  useEffect(() => {
    console.log("Edit user data:", editUser); // ✅ Debug: Log editUser data
    if (editUser) {
      setFormData({
        name: editUser.name || "",
        email: editUser.email || "",
        mobile: editUser.mobile || "",
        password: "",
        passportNo: editUser.customerProfile?.passportNo || "",
        dob: editUser.customerProfile?.dob?.slice(0, 10) || "",
        address: editUser.customerProfile?.address || "",
        profileImage: null,
        role: editUser.roles?.[0]?._id || "",
        isActive: editUser.isActive || true,
      });

      if (editUser.profileImage) {
        const imageUrl = `http://localhost:5000${editUser.profileImage}`;
        console.log("Attempting to set preview image:", imageUrl); // ✅ Debug: Log image URL
        setPreviewImage(imageUrl);
        setHasExistingImage(true);
        setImageError(null); // Reset error state
      } else {
        console.log("No profile image found in editUser"); // ✅ Debug
        setPreviewImage(null);
        setHasExistingImage(false);
        setImageError("No image available");
      }
    } else {
      console.log("Creating new user, no editUser data"); // ✅ Debug
      setPreviewImage(null);
      setHasExistingImage(false);
      setImageError(null);
    }
  }, [editUser]);

  const fetchRoles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/role");
      setRoles(res.data.data || []);
    } catch (err) {
      console.error("Error fetching roles:", err);
      toast.error("Failed to load roles");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("Selected file:", file); // ✅ Debug: Log selected file
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Only JPEG or PNG images are allowed");
        return;
      }
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setPreviewImage(URL.createObjectURL(file));
      setHasExistingImage(false);
      setImageError(null);
    } else {
      console.log("No file selected"); // ✅ Debug
    }
  };

  const handleClearImage = () => {
    console.log("Clearing image"); // ✅ Debug
    setFormData((prev) => ({ ...prev, profileImage: null }));
    setPreviewImage(null);
    setHasExistingImage(false);
    setImageError("Image cleared");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("mobile", formData.mobile);
      if (formData.password) data.append("password", formData.password);
      data.append("passportNo", formData.passportNo);
      data.append("dob", formData.dob);
      data.append("address", formData.address);
      data.append("isActive", formData.isActive ? "true" : "false");
      data.append("roles", JSON.stringify(formData.role ? [formData.role] : []));

      for (let [key, value] of data.entries()) {
        console.log(`FormData: ${key} =`, value); // ✅ Debug: Log FormData
      }

      if (formData.profileImage) {
        data.append("profileImage", formData.profileImage);
        console.log("Appending new profile image:", formData.profileImage); // ✅ Debug
      } else if (!hasExistingImage && editUser) {
        data.append("removeProfileImage", "true");
        console.log("Appending removeProfileImage flag"); // ✅ Debug
      } else {
        console.log("Retaining existing image"); // ✅ Debug
      }

      let res;
      if (editUser) {
        console.log("Sending PUT request for user:", editUser._id); // ✅ Debug
        res = await axios.put(
          `http://localhost:5000/api/user/${editUser._id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        console.log("Sending POST request for new user"); // ✅ Debug
        if (!formData.profileImage) {
          toast.error("Profile image is required for new users");
          setLoading(false);
          return;
        }
        data.append("profileImage", formData.profileImage);
        res = await axios.post("http://localhost:5000/api/user", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      console.log("API Response:", res.data); // ✅ Debug

      if (res.data.success) {
        toast.success(
          editUser ? "User updated successfully!" : "User created successfully!"
        );
        navigate("/user");
      } else {
        toast.error(res.data.message || "Operation failed");
      }
    } catch (err) {
      console.error("Error submitting user:", err.response?.data || err);
      if (err.response?.data?.errors) {
        err.response.data.errors.forEach((e) => toast.error(e.msg));
      } else if (err.response?.data?.error?.includes("duplicate key")) {
        toast.error("Email already exists!");
      } else {
        toast.error(err.response?.data?.message || "Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
        {editUser ? "Edit User" : "Add New User"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile
            </label>
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password{" "}
              {editUser ? (
                "(leave blank to keep current)"
              ) : (
                <span className="text-red-500">*</span>
              )}
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required={!editUser}
              placeholder="Enter password"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Passport No
            </label>
            <input
              name="passportNo"
              value={formData.passportNo}
              onChange={handleChange}
              placeholder="Enter passport number"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">DOB</label>
            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image {editUser ? "(optional)" : <span className="text-red-500">*</span>}
            </label>
            <input
              name="profileImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-base text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-white hover:file:bg-indigo-700"
            />
            {previewImage ? (
              <div className="mt-2 flex items-center">
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  className="w-20 h-20 rounded-full object-cover"
                  onError={(e) => {
                    console.error("Image failed to load:", previewImage); // ✅ Debug
                    setImageError("Failed to load image");
                    e.target.src = "https://via.placeholder.com/80"; // Fallback image
                  }}
                />
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="ml-4 text-sm text-red-500 hover:text-red-700"
                >
                  Clear Image
                </button>
              </div>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                {imageError || (editUser ? "No image selected" : "Please select an image")}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              name="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
            />
            <label className="ml-2 text-base text-gray-700">Active</label>
          </div>
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md text-white ${
              loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading
              ? editUser
                ? "Updating..."
                : "Creating..."
              : editUser
              ? "Update User"
              : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
}