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
import User from "./pages/User";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user" element={<User />} />
            <Route path="/referral" element={<Refferal />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Root />} />
        </Routes>
      </Router>
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
