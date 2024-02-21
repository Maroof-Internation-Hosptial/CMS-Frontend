import React, { useEffect } from "react";
import Navbar from "../common/navbar";
import Header from "../common/header";
import Footer from "../common/footer";
import { useLazyGetPermissionsQuery } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  setPermissionChecked,
  setPermissions,
} from "../../redux/reducers/auth";

const Dashboard = () => {
  const { activeUser, permissions, permissionChecked } = useSelector(
    (state) => state.authReducer
  );
  const [trigger] = useLazyGetPermissionsQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!permissionChecked) {
      trigger(activeUser._id)
        .then((res) => {
          console.log(res.data);
          dispatch(setPermissions(res.data));
          dispatch(setPermissionChecked(true));
        })
        .catch((err) => toast.error(err.message));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <Footer />
    </div>
  );
};

export default Dashboard;
