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
    { "value": "M010500", "label": "Accident & Emergency" },
    { "value": "M013400", "label": "Accounts" },
    { "value": "M012300", "label": "Administration" },
    { "value": "M013600", "label": "Anesthesia" },
    { "value": "M014138", "label": "Appointment Center" },
    { "value": "M013001", "label": "Audit & Taxation" },
    { "value": "M014466", "label": "Billing" },
    { "value": "M013200", "label": "Bio Medical" },
    { "value": "M014433", "label": "Business Development" },
    { "value": "M013002", "label": "Cardiac Surgery" },
    { "value": "M010001", "label": "Cardiology" },
    { "value": "M011700", "label": "Cath Lab" },
    { "value": "M010801", "label": "Coronary Care Unit" },
    { "value": "M014152", "label": "Corporate Billing & Recovery" },
    { "value": "M014141", "label": "Corporate Business" },
    { "value": "M012800", "label": "CSSD" },
    { "value": "M010018", "label": "Dental" },
    { "value": "M010011", "label": "Dermatology" },
    { "value": "M010010", "label": "Ear, Nose & Throat (ENT)" },
    { "value": "M011111", "label": "Early Intervention Therapy Unit" },
    { "value": "M012010", "label": "Physiology Lab" },
    { "value": "M014300", "label": "Endocrinology" },
    { "value": "M014004", "label": "Facility Management Department" },
    { "value": "M011500", "label": "Food & Nutrition Services (FNSD)" },
    { "value": "M019999", "label": "Gastroenterology" },
    { "value": "M010101", "label": "General Surgery" },
    { "value": "M012015", "label": "Housekeeping IPD" },
    { "value": "M013000", "label": "Housekeeping OPD" },
    { "value": "M012100", "label": "Human Resources & Development" },
    { "value": "M014326", "label": "Inpatient Department" },
    { "value": "M011902", "label": "Intensive Care Unit" },
    { "value": "M014200", "label": "Internal Medicine" },
    { "value": "M012088", "label": "IPD Medical" },
    { "value": "M010202", "label": "IPD Room Services" },
    { "value": "M012097", "label": "IPD Surgical" },
    { "value": "0010100", "label": "Laboratory" },
    { "value": "M010013", "label": "Laundry & Linen" },
    { "value": "M010014", "label": "Marketing" },
    { "value": "M013300", "label": "Medical Records" },
    { "value": "M012501", "label": "Medical Staff Affairs" },
    { "value": "M012700", "label": "MIS & Communication" },
    { "value": "M014129", "label": "Neonatal Intensive Care Unit" },
    { "value": "M010019", "label": "Nephrology" },
    { "value": "1133", "label": "Neuro Surgery" },
    { "value": "M010017", "label": "Neurology" },
    { "value": "M012026", "label": "Materials Management" },
    { "value": "M014328", "label": "Nursing A&E" },
    { "value": "M012034", "label": "Nursing Administration" },
    { "value": "M014337", "label": "Nursing Cath Lab" },
    { "value": "M014334", "label": "Nursing CCU" },
    { "value": "M014329", "label": "Nursing Dialysis" },
    { "value": "M014339", "label": "Nursing General Ward" },
    { "value": "M014332", "label": "Nursing ICU" },
    { "value": "M012322", "label": "Nursing Inpatient" },
    { "value": "M014330", "label": "Nursing Medical" },
    { "value": "M014333", "label": "Nursing NICU" },
    { "value": "M014335", "label": "Nursing Obs & Gynae" },
    { "value": "M014331", "label": "Nursing OPD" },
    { "value": "M011200", "label": "Nursing OR" },
    { "value": "M014336", "label": "Nursing OT" },
    { "value": "M010039", "label": "Nursing Peads IPD" },
    { "value": "M014002", "label": "Nursing PICU" },
    { "value": "M014338", "label": "Nursing Surgical IPD" },
    { "value": "M011600", "label": "Nutrition & Dietetics" },
    { "value": "M010700", "label": "Obstetrics & Gynecology" },
    { "value": "M014467", "label": "Oncology/Hematology" },
    { "value": "M011800", "label": "Operation Theaters" },
    { "value": "M012565", "label": "Ophthalmology" },
    { "value": "M014100", "label": "Orthopedics" },
    { "value": "M014327", "label": "Outpatient Department" },
    { "value": "M011901", "label": "Patient Coordination & PR" },
    { "value": "M012587", "label": "Patient Services" },
    { "value": "M010012", "label": "Pediatric" },
    { "value": "M014469", "label": "Pediatric Cardiology/Cardiac Surgery" },
    { "value": "M014470", "label": "Pediatric ICU" },
    { "value": "M014471", "label": "Pediatric Surgery" },
    { "value": "M010400", "label": "Pharmacy" },
    { "value": "M014472", "label": "Plastic Surgery" },
    { "value": "M014000", "label": "Procurement" },
    { "value": "M010065", "label": "Psychiatry" },
    { "value": "M010016", "label": "Pulmonology" },
    { "value": "M012900", "label": "Quality Assurance" },
    { "value": "M010200", "label": "Radiology" },
    { "value": "M011300", "label": "Rehabilitation" },
    { "value": "M011990", "label": "Research" },
    { "value": "M010030", "label": "Rheumatology" },
    { "value": "M010000", "label": "Security" },
    { "value": "M011992", "label": "Shifting Project" },
    { "value": "M011120", "label": "Top City Urgent Care" },
    { "value": "M012200", "label": "Transport" },
    { "value": "M011100", "label": "Urology" },
    { "value": "M014468", "label": "Vascular Surgery" }

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
                          <label>Department</label>
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
