import React, { useEffect, useRef, useState } from "react";
import Footer from "../common/footer";
import Navbar from "../common/navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { TbUsersGroup } from "react-icons/tb";
import UpdateMember from "./UpdateProfile";
import OrgChartTree from "../MembersHierarchy";
import { FaCamera } from "react-icons/fa";
import {
  uploadImage,
  uploadImageToCloudinary,
  useUpdateMemberMutation,
} from "../../api/api";
import { setActiveUser } from "../../redux/reducers/auth";
import Loader from "../Loader";
import { toast } from "sonner";
import ConfirmationDialog from "../PasswordDialogue";

const Profile = () => {
  const user = useSelector((state) => state.authReducer.activeUser);
  const isRemember = useSelector((state) => state.authReducer.isRemember);
  const [update] = useUpdateMemberMutation();

  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  const ImageInputRef = useRef();

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
    }
  }, [image]);

  const dispatch = useDispatch();
  async function updatePicture() {
    setIsLoading(true);
    const url = await uploadImageToCloudinary(image);
    update({ id: user._id, data: { image: url } }).then((res) => {
      if (res?.data?.message) {
        setImage();
        setIsLoading(false);
        dispatch(setActiveUser(res.data.user));
        if (isRemember) {
          localStorage.setItem("activeUser", JSON.stringify(res.data.user));
        } else {
          sessionStorage.setItem("activeUser", JSON.stringify(res.data.user));
        }
        toast.success("Picture Updated Successfully!");
      }
    });
  }

  function handlePassword() {}

  return (
    <div className="wrapper">
      <Navbar />

      {/* Content Wrapper. Contains page content */}
      <div style={{ padding: "0 20px" }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Profile</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item ">User Profile</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <div className="card card-primary card-outline">
                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img
                        className="profile-user-img img-fluid img-circle"
                        src={preview ? preview : user?.image}
                        alt="User profile picture"
                      />
                      <FaCamera
                        className="profile-camera-icon"
                        size={25}
                        color="#007bff"
                        style={{
                          position: "absolute",
                          bottom: 100,
                          right: 55,
                        }}
                        onClick={() => ImageInputRef.current.click()}
                      />
                      <input
                        type="file"
                        style={{ display: "none" }}
                        ref={ImageInputRef}
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>

                    {image ? (
                      <div className="d-flex justify-content-center align-items-center mt-3">
                        {isLoading ? (
                          <Loader size={20} />
                        ) : (
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => updatePicture()}
                          >
                            Update
                          </button>
                        )}
                      </div>
                    ) : (
                      <h3 className="profile-username text-center">
                        {user?.firstName} {user?.lastName}
                      </h3>
                    )}
                    <p className="text-muted text-center">{user?.jobTitle}</p>
                  </div>
                </div>
                {user.role !== "admin" && (
                  <div className="card card-primary">
                    <div className="card-header">
                      <h3 className="card-title">About Me</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                      <strong>
                        <i className="fas fa-book mr-1" /> Education
                      </strong>
                      <p className="text-muted">
                        <span style={{ textTransform: "uppercase" }}>
                          {user?.educationLevel}
                        </span>{" "}
                        in {user?.major} from {user?.institute}
                      </p>
                      <hr />
                      <strong>
                        <i className="fas fa-map-marker-alt mr-1" /> Location
                      </strong>
                      <p className="text-muted">{user?.address}</p>
                      <hr />
                      <strong>
                        <i className="fas fa-pencil-alt mr-1" /> Skills
                      </strong>
                      <p className="text-muted">{user?.skills}</p>
                      <hr />
                    </div>
                  </div>
                )}
                <div className="card card-primary">
                  <div className="card-body">
                    <div className="text-center">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setOpenPassword(true)}
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header p-2">
                    <Tabs sx={{}} value={activeTab} onChange={handleChange}>
                      <Tab
                        sx={{
                          "&:hover": {
                            color: "#007bff",
                            backgroundColor: "white",
                          },
                        }}
                        icon={<SettingsIcon />}
                        label="Settings"
                      />
                      <Tab
                        sx={{
                          "&:hover": {
                            color: "#007bff",
                            backgroundColor: "white",
                          },
                        }}
                        icon={<TbUsersGroup />}
                        label="Member's hierarchy"
                      />
                    </Tabs>
                  </div>
                  {/* /.card-header */}
                  <div
                    className="card-body"
                    style={{ padding: 1, paddingTop: 10 }}
                  >
                    {activeTab === 0 && <UpdateMember />}
                    {activeTab === 1 && <OrgChartTree />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <ConfirmationDialog
        open={openPassword}
        onClose={() => setOpenPassword(false)}
        onConfirm={() => handlePassword()}
      />
    </div>
  );
};
export default Profile;
