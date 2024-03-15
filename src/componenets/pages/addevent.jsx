import React from "react";
import "../css/style.css";
import Navbar from "../common/navbar";

import Footer from "../common/footer";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { uploadFiles, useAddEventMutation } from "../../api/api";
import ProgressLoader from "../ProgressLoader";
import { toast } from "sonner";
import { eventValidationSchema, validateFiles } from "../../utils/validations";
import { useNavigate } from "react-router-dom";
import { convertToUnix } from "../../utils";
import NotAuth from "./notauth";
import { useSelector } from "react-redux";

const Addevent = () => {
  const permissions = useSelector((state) => state.authReducer.permissions);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(eventValidationSchema),
  });

  const [addEvent] = useAddEventMutation();

  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  const departments = [
    { value: "M010500", label: "Accident & Emergency" },
    { value: "M013400", label: "Accounts" },
    { value: "M012300", label: "Administration" },
    { value: "M013600", label: "Anesthesia" },
    { value: "M014138", label: "Appointment Center" },
    { value: "M013001", label: "Audit & Taxation" },
    { value: "M014466", label: "Billing" },
    { value: "M013200", label: "Bio Medical" },
    { value: "M014433", label: "Business Development" },
    { value: "M013002", label: "Cardiac Surgery" },
    { value: "M010001", label: "Cardiology" },
    { value: "M011700", label: "Cath Lab" },
    { value: "M010801", label: "Coronary Care Unit" },
    { value: "M014152", label: "Corporate Billing & Recovery" },
    { value: "M014141", label: "Corporate Business" },
    { value: "M012800", label: "CSSD" },
    { value: "M010018", label: "Dental" },
    { value: "M010011", label: "Dermatology" },
    { value: "M010010", label: "Ear, Nose & Throat (ENT)" },
    { value: "M011111", label: "Early Intervention Therapy Unit" },
    { value: "M012010", label: "Physiology Lab" },
    { value: "M014300", label: "Endocrinology" },
    { value: "M014004", label: "Facility Management Department" },
    { value: "M011500", label: "Food & Nutrition Services (FNSD)" },
    { value: "M019999", label: "Gastroenterology" },
    { value: "M010101", label: "General Surgery" },
    { value: "M012015", label: "Housekeeping IPD" },
    { value: "M013000", label: "Housekeeping OPD" },
    { value: "M012100", label: "Human Resources & Development" },
    { value: "M014326", label: "Inpatient Department" },
    { value: "M011902", label: "Intensive Care Unit" },
    { value: "M014200", label: "Internal Medicine" },
    { value: "M012088", label: "IPD Medical" },
    { value: "M010202", label: "IPD Room Services" },
    { value: "M012097", label: "IPD Surgical" },
    { value: "0010100", label: "Laboratory" },
    { value: "M010013", label: "Laundry & Linen" },
    { value: "M010014", label: "Marketing" },
    { value: "M013300", label: "Medical Records" },
    { value: "M012501", label: "Medical Staff Affairs" },
    { value: "M012700", label: "MIS & Communication" },
    { value: "M014129", label: "Neonatal Intensive Care Unit" },
    { value: "M010019", label: "Nephrology" },
    { value: "1133", label: "Neuro Surgery" },
    { value: "M010017", label: "Neurology" },
    { value: "M012026", label: "Materials Management" },
    { value: "M014328", label: "Nursing A&E" },
    { value: "M012034", label: "Nursing Administration" },
    { value: "M014337", label: "Nursing Cath Lab" },
    { value: "M014334", label: "Nursing CCU" },
    { value: "M014329", label: "Nursing Dialysis" },
    { value: "M014339", label: "Nursing General Ward" },
    { value: "M014332", label: "Nursing ICU" },
    { value: "M012322", label: "Nursing Inpatient" },
    { value: "M014330", label: "Nursing Medical" },
    { value: "M014333", label: "Nursing NICU" },
    { value: "M014335", label: "Nursing Obs & Gynae" },
    { value: "M014331", label: "Nursing OPD" },
    { value: "M011200", label: "Nursing OR" },
    { value: "M014336", label: "Nursing OT" },
    { value: "M010039", label: "Nursing Peads IPD" },
    { value: "M014002", label: "Nursing PICU" },
    { value: "M014338", label: "Nursing Surgical IPD" },
    { value: "M011600", label: "Nutrition & Dietetics" },
    { value: "M010700", label: "Obstetrics & Gynecology" },
    { value: "M014467", label: "Oncology/Hematology" },
    { value: "M011800", label: "Operation Theaters" },
    { value: "M012565", label: "Ophthalmology" },
    { value: "M014100", label: "Orthopedics" },
    { value: "M014327", label: "Outpatient Department" },
    { value: "M011901", label: "Patient Coordination & PR" },
    { value: "M012587", label: "Patient Services" },
    { value: "M010012", label: "Pediatric" },
    { value: "M014469", label: "Pediatric Cardiology/Cardiac Surgery" },
    { value: "M014470", label: "Pediatric ICU" },
    { value: "M014471", label: "Pediatric Surgery" },
    { value: "M010400", label: "Pharmacy" },
    { value: "M014472", label: "Plastic Surgery" },
    { value: "M014000", label: "Procurement" },
    { value: "M010065", label: "Psychiatry" },
    { value: "M010016", label: "Pulmonology" },
    { value: "M012900", label: "Quality Assurance" },
    { value: "M010200", label: "Radiology" },
    { value: "M011300", label: "Rehabilitation" },
    { value: "M011990", label: "Research" },
    { value: "M010030", label: "Rheumatology" },
    { value: "M010000", label: "Security" },
    { value: "M011992", label: "Shifting Project" },
    { value: "M011120", label: "Top City Urgent Care" },
    { value: "M012200", label: "Transport" },
    { value: "M011100", label: "Urology" },
    { value: "M014468", label: "Vascular Surgery" },
  ];


  const [natureOptions, setNatureOptions] = useState([]);

  // Function to handle complaint department selection change
  const handleDepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    switch (selectedDepartment) {
      case "Accident & Emergency":
        setNatureOptions(["Other"]);
        break;
      case "Accounts":
        setNatureOptions(["Other"]);
        break;
      case "Administration":
        setNatureOptions(["Other"]);
        break;
      case "Anesthesia":
        setNatureOptions(["Other"]);
        break;
      case "Appointment Center":
        setNatureOptions(["Other"]);
        break;
      case "Audit & Taxation":
        setNatureOptions(["Other"]);
        break;
      case "Billing":
        setNatureOptions(["Other"]);
        break;
      case "Bio Medical":
        setNatureOptions(["Other"]);
        break;
      case "Business Development":
        setNatureOptions(["Other"]);
        break;
      case "Cardiac Surgery":
        setNatureOptions(["Other"]);
        break;
      case "Cardiology":
        setNatureOptions(["Other"]);
        break;
      case "Cath Lab":
        setNatureOptions(["Other"]);
        break;
      case "Coronary Care Unit":
        setNatureOptions(["Other"]);
        break;
      case "Corporate Billing & Recovery":
        setNatureOptions(["Other"]);
        break;
      case "Corporate Business":
        setNatureOptions(["Other"]);
        break;
      case "CSSD":
        setNatureOptions(["Other"]);
        break;
      case "Dental":
        setNatureOptions(["Other"]);
        break;
      case "Dermatology":
        setNatureOptions(["Other"]);
        break;
      case "Ear, Nose & Throat (ENT)":
        setNatureOptions(["Other"]);
        break;
      case "Early Intervention Therapy Unit":
        setNatureOptions(["Other"]);
        break;
      case "Physiology Lab":
        setNatureOptions(["Other"]);
        break;
      case "Endocrinology":
        setNatureOptions(["Other"]);
        break;
      case "Facility Management Department":
        setNatureOptions(["Plumber", "Carpenter", "HVAC", "Painters", "Electrical", "Other",]);
        break;
      case "Food & Nutrition Services (FNSD)":
        setNatureOptions(["Delay Services", "Quality of Food", "Other",]);
        break;
      case "Gastroenterology":
        setNatureOptions(["Other"]);
        break;
      case "General Surgery":
        setNatureOptions(["Other"]);
        break;
      case "Housekeeping IPD":
        setNatureOptions(["Other"]);
        break;
      case "Housekeeping OPD":
        setNatureOptions(["Other"]);
        break;
      case "Human Resources & Development":
        setNatureOptions(["Other"]);
        break;
      case "Inpatient Department":
        setNatureOptions(["Other"]);
        break;
      case "Intensive Care Unit":
        setNatureOptions(["Other"]);
        break;
      case "Internal Medicine":
        setNatureOptions(["Other"]);
        break;
      case "IPD Medical":
        setNatureOptions(["Other"]);
        break;
      case "IPD Room Services":
        setNatureOptions(["Other"]);
        break;
      case "IPD Surgical":
        setNatureOptions(["Other"]);
        break;
      case "Laboratory":
        setNatureOptions(["Other"]);
        break;
      case "Laundry & Linen":
        setNatureOptions(["Other"]);
        break;
      case "Marketing":
        setNatureOptions(["Other"]);
        break;
      case "Medical Records":
        setNatureOptions(["Other"]);
        break;
      case "Medical Staff Affairs":
        setNatureOptions(["Other"]);
        break;
      case "MIS & Communication":
        setNatureOptions(["Printer", "Computer", "Scanner", "HIS", "Network", "Intranet", "Email", "KeyBoard", "Other",]);
        break;
      case "Neonatal Intensive Care Unit":
        setNatureOptions(["Other"]);
        break;
      case "Nephrology":
        setNatureOptions(["Other"]);
        break;
      case "Neuro Surgery":
        setNatureOptions(["Other"]);
        break;
      case "Neurology":
        setNatureOptions(["Other"]);
        break;
      case "Materials Management":
        setNatureOptions(["Other"]);
        break;
      case "Nursing A&E":
        setNatureOptions(["Other"]);
        break;
      case "Nursing Administration":
        setNatureOptions(["Other"]);
        break;
      case "Nursing Cath Lab":
        setNatureOptions(["Other"]);
        break;
      case "Nursing CCU":
        setNatureOptions(["Other"]);
        break;
      case "Nursing Dialysis":
        setNatureOptions(["Other"]);
        break;
      case "Nursing General Ward":
        setNatureOptions(["Other"]);
        break;
      case "Nursing ICU":
        setNatureOptions(["Other"]);
        break;
      case "Nursing Inpatient":
        setNatureOptions(["Other"]);
        break;
      case "Nursing Medical":
        setNatureOptions(["Other"]);
        break;
      case "Nursing NICU":
        setNatureOptions(["Other"]);
        break;
      case "Nursing Obs & Gynae":
        setNatureOptions(["Other"]);
        break;
      case "Nursing OPD":
        setNatureOptions(["Other"]);
        break;
      case "Nursing OR":
        setNatureOptions(["Other"]);
        break;
      case "Nursing OT":
        setNatureOptions(["Other"]);
        break;
      case "Nursing Peads IPD":
        setNatureOptions(["Other"]);
        break;
      case "Nursing PICU":
        setNatureOptions(["Other"]);
        break;
      case "Nursing Surgical IPD":
        setNatureOptions(["Other"]);
        break;
      case "Nutrition & Dietetics":
        setNatureOptions(["Other"]);
        break;
      case "Obstetrics & Gynecology":
        setNatureOptions(["Other"]);
        break;
      case "Oncology/Hematology":
        setNatureOptions(["Other"]);
        break;
      case "Operation Theaters":
        setNatureOptions(["Other"]);
        break;
      case "Ophthalmology":
        setNatureOptions(["Other"]);
        break;
      case "Orthopedics":
        setNatureOptions(["Other"]);
        break;
      case "Outpatient Department":
        setNatureOptions(["Other"]);
        break;
      case "Patient Coordination & PR":
        setNatureOptions(["Other"]);
        break;
      case "Patient Services":
        setNatureOptions(["Other"]);
        break;
      case "Pediatric":
        setNatureOptions(["Other"]);
        break;
      case "Pediatric Cardiology/Cardiac Surgery":
        setNatureOptions(["Other"]);
        break;
      case "Pediatric ICU":
        setNatureOptions(["Other"]);
        break;
      case "Pediatric Surgery":
        setNatureOptions(["Other"]);
        break;
      case "Pharmacy":
        setNatureOptions(["Other"]);
        break;
      case "Plastic Surgery":
        setNatureOptions(["Other"]);
        break;
      case "Procurement":
        setNatureOptions(["Other"]);
        break;
      case "Psychiatry":
        setNatureOptions(["Other"]);
        break;
      case "Pulmonology":
        setNatureOptions(["Other"]);
        break;
      case "Quality Assurance":
        setNatureOptions(["Other"]);
        break;
      case "Radiology":
        setNatureOptions(["Other"]);
        break;
      case "Rehabilitation":
        setNatureOptions(["Other"]);
        break;
      case "Research":
        setNatureOptions(["Other"]);
        break;
      case "Rheumatology":
        setNatureOptions(["Other"]);
        break;
      case "Security":
        setNatureOptions(["Other"]);
        break;
      case "Shifting Project":
        setNatureOptions(["Other"]);
        break;
      case "Top City Urgent Care":
        setNatureOptions(["Other"]);
        break;
      case "Transport":
        setNatureOptions(["Other"]);
        break;
      case "Urology":
        setNatureOptions(["Other"]);
        break;
      case "Vascular Surgery":
        setNatureOptions(["Other"]);
        break;
      default:
        setNatureOptions([]);
        break;
    }
  };




  async function onSubmit(data) {
    const isValid = await validateFiles(files, setError);
    console.log(isValid);
    if (isValid) {
      setProgress(25);
      uploadFiles(files, setProgress)
        .then((res) => {
          // Generate unique complaint ID
          const complaintId = generateComplaintId();
          addEvent({
            complaint_id: complaintId, // Assuming the field name is 'id' for the complaint ID in your API
            name: data.name,
            nature: data.nature,
            description: data.description,
            status: data.status,
            timing: data.timing,
            deadline: data.deadline,
            priority: data.priority,
            department: data.department,
            files: res,
          }).then((res) => {
            setProgress(0);
            setFiles([]);
            reset();
            setValue("status", "");
            if (res?.data?.message) {
              toast.success("Complaint Added Successfully");
              navigate("/user_event_directory");
            }
          });
        })
        .catch((err) => console.log(err.message));
    }
  }

  // function generateComplaintId() {
  //   // Generate random number between 100000 and 999999 (6-digit number)
  //   const randomNumber = Math.floor(Math.random() * 900000) + 100000;
  //   return randomNumber.toString().substring(0, 6); // Ensure only 5 digits are used
  // }

  // let complaintCounter = 0;

  // function generateComplaintId() {
  //   complaintCounter++;
  //   return complaintCounter.toString().padStart(6, '0');
  // }

  function generateComplaintId() {
    // Generate random number between 900000 and 999999 (6-digit number starting from 900000)
    const randomNumber = Math.floor(Math.random() * 100000) + 900000;
    return randomNumber.toString().substring(0, 6); // Ensure only 6 digits are used
  }

  const [timingOptions, setTimingOptions] = useState([]);

  // Function to handle deadline selection change
  const handleDeadlineChange = (e) => {
    const selectedDeadline = e.target.value;
    if (selectedDeadline === "days") {
      setTimingOptions(["1 day", "2 days", "3 days", "4 days", "5 days", "6 days", "7 days",]); // Set timing options for days
    } else if (selectedDeadline === "hours") {
      setTimingOptions(["15 minutes", "30 minutes", "45 minutes", "1 hour", "2 hour", "3 hour", "4 hour", "5 hour", "6 hour", "7 hour", "8 hour", "9 hour", "10 hour", "11 hour", "12 hour",]); // Set timing options for minutes
    }
  };


  return (
    <div className="wrapper" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "0 20px", flex: "1" }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6"></div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item">Add Complaint</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <form
          style={{ marginLeft: 15, marginRight: 15 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <section className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">General</h3>
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
                      <div className="form-group col-md-6" style={{ display: "none" }}>
                        <label htmlFor="inputName">
                          Subject
                        </label>

                        <input
                          type="text"
                          id="inputName"
                          className="form-control"

                          // {...register("name")}
                          {...register("name", { value: "its subject" })}
                        />
                        {errors.name && (
                          <p className="validation-error">
                            {errors.name?.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="inputDepartment">
                          Complaint Department{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          className="form-control custom-select"
                          {...register("department")}
                          onChange={handleDepartmentChange} // Add onchange event handler
                        >
                          <option value="" defaultValue="" selected disabled>
                            Select Department
                          </option>
                          {departments
                            .sort((a, b) => a.label.localeCompare(b.label))
                            .map((department, index) => (
                              <option key={index} value={department.label}>
                                {department.label}
                              </option>
                            ))}
                        </select>
                        {errors.department && (
                          <p className="validation-error">
                            {errors.department?.message}
                          </p>
                        )}
                      </div>

                      <div className="form-group col-md-4">
                        <label htmlFor="inputNature">
                          Complaint Nature{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          className="form-control custom-select"
                          {...register("nature")}
                        >
                          <option value="" defaultValue="" selected disabled>
                            Select Nature
                          </option>
                          {natureOptions.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {errors.nature && (
                          <p className="validation-error">
                            {errors.nature?.message}
                          </p>
                        )}
                      </div>

                      <div className="form-group col-md-4">
                        <label htmlFor="inputPriority">Priority </label>
                        <select
                          className="form-control custom-select"
                          {...register("priority")}
                        >
                          <option value="" defaultValue="" selected disabled>
                            Select Priority
                          </option>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                        {errors.priority && (
                          <p className="validation-error">
                            {errors.priority?.message}
                          </p>
                        )}
                      </div>


                    </div>
                    <div className="form-group">
                      <label htmlFor="inputDescription">Description</label>
                      <span style={{ color: "red" }}>*</span>
                      <textarea
                        id="inputDescription"
                        className="form-control"
                        rows={4}
                        defaultValue={""}
                        {...register("description")}
                      />
                      {errors.name && (
                        <p className="validation-error">
                          {errors.description?.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group" style={{ display: "none" }}>
                      <select
                        className="form-control custom-select"
                        {...register("status")}
                      >
                        <option value="in-progress">In Progress</option>
                      </select>
                    </div>

                    <div className="row">

                      <div className="form-group col-md-4">
                        <label htmlFor="inputDeadline">Deadline </label>
                        <select
                          className="form-control custom-select"
                          {...register("deadline")}
                          onChange={handleDeadlineChange} // Add onchange event handler
                        >
                          <option value="" defaultValue="" selected disabled>
                            Select Deadline
                          </option>
                          <option value="days">Days</option>
                          <option value="hours">Hours</option>
                        </select>
                        {errors.deadline && (
                          <p className="validation-error">
                            {errors.deadline?.message}
                          </p>
                        )}
                      </div>


                      <div className="form-group col-md-4">
                        <label htmlFor="inputTiming">Specify Time </label>
                        <select
                          className="form-control custom-select"
                          {...register("timing")}
                        >
                          <option value="" defaultValue="" selected disabled>
                            Select Timing
                          </option>
                          {timingOptions.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {errors.timing && (
                          <p className="validation-error">
                            {errors.timing?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* <div className="form-group">
                        <div className="btn btn-default btn-file">
                          <i className="fas fa-paperclip" /> Attachment
                          <input
                            type="file"
                            name="attachment"
                            onChange={(e) => {
                              clearErrors("attachment");
                              setFiles(e.target.files);
                            }}
                            multiple
                          />
                        </div>
                        <p
                          style={{
                            display: "inline",
                            marginLeft: 5,
                          }}
                          className="help-block"
                        >
                          Max. 10 MB
                        </p>
                        <div style={{ marginTop: 10 }}>
                          {files.length > 0 &&
                            Array.from(files).map((file) => (
                              <div key={file.name}>{file.name}</div>
                            ))}
                        </div>

                        {errors.attachment && (
                          <p className="validation-error">
                            {errors.attachment?.message}
                          </p>
                        )}
                      </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="row" id="cap">
              {progress > 0 ? (
                <div className="float-right" style={{ marginRight: 10 }}>
                  <ProgressLoader progress={progress} />
                </div>
              ) : (
                <input
                  type="submit"
                  defaultValue="Create new Event"
                  className="btn btn-success float-right"
                  style={{ width: "150px" }} // Adjust the width as needed
                />
              )}

              <Link
                to="/"
                className="btn btn-secondary"
                style={{ marginRight: "10px", marginLeft: "10px" }}
              >
                Cancel
              </Link>
            </div>
          </section>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Addevent;
