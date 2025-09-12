import { useEffect, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuditLog() {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  // Fetch audit logs
  const fetchLogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auditlog");
      if (Array.isArray(res.data)) setLogs(res.data);
      else if (res.data.data && Array.isArray(res.data.data)) setLogs(res.data.data);
      else setLogs([]);
    } catch (err) {
      console.error("❌ Error fetching audit logs:", err);
      toast.error("Failed to fetch audit logs ❌");
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // Delete log
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this audit log?")) {
      try {
        await axios.delete(`http://localhost:5000/api/auditlog/${id}`);
        toast.success("Audit log deleted ✅");
        fetchLogs();
      } catch (err) {
        console.error("❌ Error deleting log:", err);
        toast.error("Failed to delete audit log ❌");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Audit Logs</h1>
          <p className="text-sm text-gray-500">View and manage all audit logs.</p>
        </div>
        <button
          onClick={() => navigate("/add-auditlog")} // Add new audit log
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-sm transition-all"
        >
          ➕ Add Audit Log
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Performed By</th>
              <th className="p-3 text-left">IP</th>
              <th className="p-3 text-left">User Agent</th>
              <th className="p-3 text-left">Target</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <tr
                  key={log._id}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
                >
                  <td className="p-3 font-medium text-gray-700">{log.action}</td>
                  <td className="p-3 text-gray-600">{log.performedBy?.name || log.performedBy || "-"}</td>
                  <td className="p-3 text-gray-600">{log.ip || "-"}</td>
                  <td className="p-3 text-gray-600">{log.userAgent || "-"}</td>
                  <td className="p-3 text-gray-600">{log.target?.kind || "-"}: {log.target?.item || "-"}</td>
                  <td className="p-3 text-gray-600">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="p-3 text-center">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className="inline-flex justify-center w-full p-1 text-gray-500 hover:text-gray-700">
                        <EllipsisVerticalIcon className="w-5 h-5" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-10">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => navigate(`/add-auditlog/${log._id}`)} // Navigate to edit page
                                  className={`${active ? "bg-gray-100" : ""} w-full text-left px-4 py-2 text-sm text-gray-700`}
                                >
                                  Edit
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleDelete(log._id)}
                                  className={`${active ? "bg-gray-100" : ""} w-full text-left px-4 py-2 text-sm text-red-600`}
                                >
                                  Delete
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500 italic">
                  No audit logs found 🚫
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
