// // AddRoles.jsx
// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function AddRoles({ roleId }) {
//   const [role, setRole] = useState({
//     name: "",
//     description: "",
//     permissions: [],
//     inherits: [],
//     isSystem: false,
//   });

//   const [allPermissions, setAllPermissions] = useState([]);
//   const [allRoles, setAllRoles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch permissions and roles
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const permRes = await axios.get("/api/permissions");
//         const rolesRes = await axios.get("/api/roles");

//         setAllPermissions(Array.isArray(permRes.data) ? permRes.data : []);
//         setAllRoles(Array.isArray(rolesRes.data) ? rolesRes.data : []);

//         if (roleId) {
//           const roleRes = await axios.get(`/api/roles/${roleId}`);
//           setRole(roleRes.data);
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [roleId]);

//   const handleChange = (e) => {
//     const { name, value, type, checked, options } = e.target;

//     if (type === "checkbox") {
//       setRole((prev) => ({ ...prev, [name]: checked }));
//     } else if (type === "select-multiple") {
//       const selected = Array.from(options)
//         .filter((opt) => opt.selected)
//         .map((opt) => opt.value);
//       setRole((prev) => ({ ...prev, [name]: selected }));
//     } else {
//       setRole((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (roleId) {
//         await axios.put(`/api/roles/${roleId}`, role);
//         alert("Role updated successfully!");
//       } else {
//         await axios.post("/api/roles", role);
//         alert("Role created successfully!");
//         setRole({
//           name: "",
//           description: "",
//           permissions: [],
//           inherits: [],
//           isSystem: false,
//         });
//       }
//     } catch (err) {
//       console.error("Error saving role:", err);
//       alert("Error saving role!");
//     }
//   };

//   if (loading) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-800">
//         {roleId ? "Edit Role" : "Add New Role"}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Role Name */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             Role Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={role.name}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={role.description}
//             onChange={handleChange}
//             rows={3}
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Permissions */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             Permissions
//           </label>
//           <select
//             multiple
//             name="permissions"
//             value={role.permissions}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {Array.isArray(allPermissions) &&
//               allPermissions.map((p) => (
//                 <option key={p._id} value={p._id}>
//                   {p.name}
//                 </option>
//               ))}
//           </select>
//         </div>

//         {/* Inherits */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             Inherits From Roles
//           </label>
//           <select
//             multiple
//             name="inherits"
//             value={role.inherits}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {Array.isArray(allRoles) &&
//               allRoles
//                 .filter((r) => r._id !== roleId)
//                 .map((r) => (
//                   <option key={r._id} value={r._id}>
//                     {r.name}
//                   </option>
//                 ))}
//           </select>
//         </div>

//         {/* System Role */}
//         <div className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             name="isSystem"
//             checked={role.isSystem}
//             onChange={handleChange}
//             className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//           />
//           <label className="text-gray-700 font-medium">System Role</label>
//         </div>

//         {/* Submit Button */}
//         <div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
//           >
//             {roleId ? "Update Role" : "Create Role"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }



// AddRoles.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddRoles() {
  const [role, setRole] = useState({
    name: "",
    description: "",
    permissions: [],
    inherits: [],
    isSystem: false,
  });

  const [allPermissions, setAllPermissions] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch permissions and roles
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const permRes = await axios.get("/api/permissions");
        const rolesRes = await axios.get("/api/role");

        setAllPermissions(Array.isArray(permRes.data) ? permRes.data : []);
        setAllRoles(Array.isArray(rolesRes.data) ? rolesRes.data : []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;

    if (type === "checkbox") {
      setRole((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "select-multiple") {
      const selected = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);
      setRole((prev) => ({ ...prev, [name]: selected }));
    } else {
      setRole((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST request to your specific route
await axios.post("/api/role", role);
      alert("Role created successfully!");
      setRole({
        name: "",
        description: "",
        permissions: [],
        inherits: [],
        isSystem: false,
      });
    } catch (err) {
      console.error("Error saving role:", err);
      alert("Error saving role!");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Role</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Role Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Role Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={role.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={role.description}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Permissions */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Permissions</label>
          <select
            multiple
            name="permissions"
            value={role.permissions}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {allPermissions.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Inherits */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Inherits From Roles</label>
          <select
            multiple
            name="inherits"
            value={role.inherits}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {allRoles.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* System Role */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isSystem"
            checked={role.isSystem}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="text-gray-700 font-medium">System Role</label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Create Role
          </button>
        </div>
      </form>
    </div>
  );
}
