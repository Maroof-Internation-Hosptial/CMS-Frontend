import React, { useState } from "react";
import "react-datetime/css/react-datetime.css";
import FormHeader from "./FormHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseURL, useRegisterMutation } from "../api/api";
import "./css/style.css";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  personalInfoValidation,
  otherInfoValidation,
} from "../utils/validations";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const MemberForm = () => {
  const [register, response] = useRegisterMutation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.authReducer.activeUser);

  const {
    register: pregister,
    handleSubmit: phandleSubmit,
    formState: { errors: perrors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(personalInfoValidation),
  });

  const departments = [
    { value: "M012700", label: "MIS & Communication" },
    { value: "M014004", label: "Facility Management Department" },
    { value: "M011500", label: "Food & Nutrition Services (FNSD)" },
    { value: "M013200", label: "Bio Medical" },

  ];

  const [formData] = useState({});

  function onPersonalSubmit(data) {
    register({
      ...formData,
      ...data,
      created_by: user._id,
      role: user.role === "dept-manager" ? "complaint-assignee" : data.role,
    })
      .then((res) => {
        console.log(res);
        if (res?.data?.message) {
          toast.success(res?.data?.message);
          navigate("/directory");
        } else if (res?.error?.data?.error) {
          toast.error(res?.error?.data?.error);
        }
      })
      .catch((err) => toast.error(err.message));
  }

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">Register New User</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                >
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>

            <div className="card-body">
              <div className="px-3">
                <form onSubmit={phandleSubmit(onPersonalSubmit)}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          First Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          style={{ width: "100%" }}
                          {...pregister("firstName")}
                        />
                        {perrors.firstName && (
                          <p className="validation-error">
                            {perrors.firstName?.message}
                          </p>
                        )}
                      </div>

                      <div className="row">
                        <div className="form-group col-6">
                          <label>Phone Number</label>
                          <input
                            type="tel"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...pregister("phone")}
                          />
                          {perrors.phone && (
                            <p className="validation-error">
                              {perrors.phone?.message}
                            </p>
                          )}
                        </div>
                        <div className="form-group col-6">
                          <label>
                            Gender <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="gender"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...pregister("gender")}
                          >
                            <option value="" selected defaultValue disabled>
                              {" "}
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          {perrors.gender && (
                            <p className="validation-error">
                              {perrors.gender?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="form-group">
                        <label>
                          Email <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          style={{ width: "100%" }}
                          {...pregister("email")}
                        />
                        {perrors.email && (
                          <p className="validation-error">
                            {perrors.email?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Last Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          style={{ width: "100%" }}
                          {...pregister("lastName")}
                        />
                        {perrors.lastName && (
                          <p className="validation-error">
                            {perrors.lastName?.message}
                          </p>
                        )}
                      </div>

                      <div className="row">
                        <div className="form-group col-6">
                          <label>
                            Member Role <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="blood"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...pregister("role")}
                          >
                            <option value="" selected defaultValue disabled>
                              {" "}
                            </option>
                            {user.role === "admin" && (
                              <option value="dept-manager">Dept Manager</option>
                            )}
                            <option value="complaint-assignee">
                              Complaint Assignee
                            </option>
                            {user.role === "admin" && (
                              <>
                                <option value="user">User</option>
                              </>
                            )}
                          </select>
                          {perrors.role && (
                            <p className="validation-error">
                              {perrors.role?.message}
                            </p>
                          )}
                        </div>
                        <div className="form-group col-6">
                          <label>
                            Department <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="userdepartment"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...pregister("userdepartment")}
                          >
                            <option value="" selected defaultValue disabled>
                              {" "}
                            </option>
                            {departments
                              .sort((a, b) => a.label.localeCompare(b.label))
                              .map((department, index) => (
                                <option key={index} value={department.label}>
                                  {department.label}
                                </option>
                              ))}
                          </select>
                          {perrors.userdepartment && (
                            <p className="validation-error">
                              {perrors.userdepartment?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div
                    className="d-flex gap-5 justify-content-center align-items-center"
                    style={{ gap: 10 }}
                  >
                    <button
                      type="submit"
                      className="btn btn-outline-primary"
                      disabled={response.isLoading}
                      style={{ width: "200px" }}
                    >
                      {response.isLoading ? <Loader size={30} /> : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MemberForm;
