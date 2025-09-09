
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import UserProvider, { UserContext } from "./context/userContext";
import Login from "./pages/Auth/Login";
import NotFound from "./pages/NotFound";
import Refferal from "./pages/Refferal";
import User from "./pages/Enquiry";
import AddEnquiry from "./pages/AddEnquiry";
import Role from "./pages/Role";
import AddRoles from "./pages/AddRoles";
import Enquiry from "./pages/Enquiry";
import AddCountry from "./pages/AddCountry";
import Country from "./pages/Country";
import AddVisaPurpose from "./pages/AddVisaPurpose";
import VisaPurpose from "./pages/VisaPurpose";
import AddVisaOption from "../AddVisaOption";
import VisaOption from "./pages/VisaOption";
import AddDocument from "./pages/AddDocument";
import Document from "./pages/Document";
import AddFollowup from "./pages/AddFollowup";
import Followup from "./pages/Followup";
import AddCustomerDoc from "./pages/AddCustomerDoc";
import CustomerDocs from "./pages/CustomerDocs";
import AddShareLink from "./pages/AddShareLink";
import ShareLinks from "./pages/ShareLinks";
import Notification from "./pages/Notification";
import AddNotification from "./pages/AddNotification";
import AuditLog from "./pages/AuditLog";
import AddAuditLog from "./pages/AddAuditLog";
import Permission from "./pages/Permission";
import AddPermission from "./pages/AddPermission";


const App = () => {
  return (
    <>
      {/* ✅ Wrap entire app inside UserProvider */}
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/permission" element={<Permission />} />
              <Route path="/add-permission" element={<AddPermission />} />
              <Route path="/add-permission/:id" element={<AddPermission />} />

              <Route path="/role" element={<Role/>} />
              <Route path="/add-role" element={<AddRoles />} />
              <Route path="/add-role/:id" element={<AddRoles />} />

              <Route path="/country" element={<Country />} />
              <Route path="/add-country" element={<AddCountry />} />
              <Route path="/add-country/:id" element={<AddCountry />} />

              <Route path="/visaPurpose" element={<VisaPurpose />} />
              <Route path="/add-visapurpose" element={<AddVisaPurpose />} />
              <Route path="/add-visapurpose/:id" element={<AddVisaPurpose />} />

              <Route path="/visaoption" element={<VisaOption />} />
              <Route path="/add-visaoption" element={<AddVisaOption />} />
              <Route path="/add-visaoption/:id" element={<AddVisaOption />} />

              <Route path="/document" element={<Document />} />
              <Route path="/add-dacument" element={<AddDocument />} />
              <Route path="/add-dacument/:id" element={<AddDocument />} />

              <Route path="/enquiry" element={<Enquiry />} />
              <Route path="/add-enquiry" element={<AddEnquiry />} />
              <Route path="/add-enquiry/:id" element={<AddEnquiry />} />

              <Route path="/followup" element={<Followup />} />
              <Route path="/add-followup" element={<AddFollowup />} />
              <Route path="/add-followup/:id" element={<AddFollowup />} />


              <Route path="/customerDocs" element={<CustomerDocs />} />
              <Route path="/add-CustomerDoc" element={<AddCustomerDoc />} />

              <Route path="/sharelink" element={<ShareLinks />} />
              <Route path="/add-sharelink" element={<AddShareLink />} />
              <Route path="/add-sharelink/:id" element={<AddShareLink />} />

              <Route path="/notification" element={<Notification />} />
              <Route path="/add-notification" element={<AddNotification />} />
              <Route path="/add-notification/:id" element={<AddNotification />} />

              <Route path="/auditLog" element={<AuditLog />} />
              <Route path="/add-auditLog" element={<AddAuditLog />} />
            </Route>
            <Route path="/" element={<Root />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </UserProvider>
      <ToastContainer />
    </>
  );
};

export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Outlet />;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/user/dashboard" />
  );
};


