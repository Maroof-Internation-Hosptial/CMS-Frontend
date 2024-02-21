import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const CheckActiveUser = () => {
  const user = useSelector((state) => state.authReducer.activeUser);
  return user !== null ? <Outlet /> : <Navigate to="/" />;
};

export default CheckActiveUser;
