import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtected = () => {
  const user = useSelector((state) => state.authReducer.activeUser);
  return user.role === "admin" ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default AdminProtected;
