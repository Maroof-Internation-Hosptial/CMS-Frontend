import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const CheckLogin = () => {
  const user = useSelector((state) => state.authReducer.activeUser);
  return !user ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default CheckLogin;
