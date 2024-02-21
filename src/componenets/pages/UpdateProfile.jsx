import React, { useEffect, useState } from "react";
import "../css/style.css";
import { baseURL, useUpdateMemberMutation } from "../../api/api";
import Loader from "../Loader";
import { toast } from "sonner";
import { deepEqual } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { setActiveUser } from "../../redux/reducers/auth";

const UpdateMember = () => {
  const [update, updateResp] = useUpdateMemberMutation();
  const activeUser = useSelector((state) => state.authReducer.activeUser);

  const dispatch = useDispatch();

  const initialValues = {
    firstName: activeUser?.firstName,
    lastName: activeUser?.lastName,
    email: activeUser?.email,
    gender: activeUser?.gender,
    phone: activeUser?.phone,
  };

  const [data, setData] = useState(initialValues);
  const [hasChanged, setHasChanged] = useState(false);

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const dataHasChanged = !deepEqual(data, initialValues);
    setHasChanged(dataHasChanged);
  }, [data, initialValues]);

  function handleUpdate() {
    update({ id: activeUser._id, data }).then((res) => {
      if (res?.data?.message) {
        dispatch(setActiveUser(res.data.user));
        toast.success("Profile Updated Successfully!");
      }
    });
  }
  return (
    <div className="wrapper">
      <div style={{ padding: "0 5px" }}>
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
                  <div className="form-group">
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
                  <div className="form-group">
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

                  <div className="form-group">
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
                  <div className="form-group">
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
                {/* /.card-body */}
              </div>
            </div>

            <div className="col-md-6"></div>
          </div>
          <div className="row mt-2 mb-2" id="cap">
            <div className="col-12 d-flex justify-content-center align-items-center">
              {updateResp.isLoading ? (
                <div style={{ marginRight: 15 }}>
                  <Loader size={30} />
                </div>
              ) : (
                <button
                  disabled={!hasChanged}
                  onClick={handleUpdate}
                  type="button"
                  className="btn btn-success btn-block" // Added btn-block class
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </section>
        {/* /.content */}
      </div>
    </div>
  );
};

export default UpdateMember;
