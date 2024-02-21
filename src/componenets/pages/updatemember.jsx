import React, { useEffect, useState } from "react";
import "../css/style.css";
import Navbar from "../common/navbar";
import Footer from "../common/footer";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { baseURL, useUpdateMemberMutation } from "../../api/api";
import Loader from "../Loader";
import { toast } from "sonner";
import { deepEqual } from "../../utils";

const UpdateMember = () => {
  const [update, updateResp] = useUpdateMemberMutation();

  const { state } = useLocation();
  const initialValues = {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
    gender: state.user.gender,
    phone: state.user.phone,
  };

  const [data, setData] = useState(initialValues);
  const [cities, setCities] = useState([]);
  const [hasChanged, setHasChanged] = useState(false);

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    function getCities() {
      fetch(`${baseURL}/cities/${data.nationality}/${data.province}`)
        .then((response) => response.json())
        .then((result) => setCities(result))
        .catch((error) => console.log("error", error));
    }
    getCities();
  }, [data.province]);

  useEffect(() => {
    const dataHasChanged = !deepEqual(data, initialValues);
    setHasChanged(dataHasChanged);
  }, [data, initialValues]);

  function handleUpdate() {
    update({ id: state.user._id, data }).then((res) => {
      if (res?.data?.message) {
        toast.success("Member Updated Successfully!");
      }
    });
  }
  return (
    <div className="wrapper">
      <Navbar />
      <div style={{ padding: "0 20px" }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Member Edit</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item ">Edit Member</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Personal Info</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      data-toggle="tooltip"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        name="firstName"
                        type="text"
                        id="firstName"
                        className="form-control"
                        value={data?.firstName}
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        name="lastName"
                        type="text"
                        id="lastName"
                        className="form-control"
                        value={data?.lastName}
                        onChange={onChange}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6">
                      <label>Gender</label>
                      <select
                        name="gender"
                        id="gender"
                        className="form-control"
                        style={{ width: "100%" }}
                        value={data.gender}
                        onChange={onChange}
                      >
                        <option value="" selected defaultValue disabled>
                          {" "}
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="phone">Contact</label>
                      <input
                        name="phone"
                        type="text"
                        id="phone"
                        className="form-control"
                        value={data?.phone}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      name="email"
                      type="text"
                      id="email"
                      className="form-control"
                      value={data?.email}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row" id="cap">
            <Link
              to="/directory"
              className="btn btn-secondary"
              style={{ marginRight: "10px", marginLeft: "10px" }}
            >
              Cancel
            </Link>

            {updateResp.isLoading ? (
              <div className="float-right" style={{ marginRight: 15 }}>
                <Loader size={30} />
              </div>
            ) : (
              <button
                disabled={!hasChanged}
                onClick={handleUpdate}
                type="button"
                className="btn btn-success float-right"
              >
                Save Changes
              </button>
            )}
          </div>
        </section>
        {/* /.content */}
      </div>
      <Footer />
    </div>
  );
};

export default UpdateMember;
