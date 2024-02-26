import React, { useEffect, useState } from "react";
import "../css/style.css";
import Navbar from "../common/navbar";

import Footer from "../common/footer";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
// import { useUpdateEventMutation } from "../../api/api";
import Loader from "../Loader";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import {
  useSelectiveAssigneeQuery,
  useUpdateEventMutation,
} from "../../api/api";

const Updateevent = () => {
  const [update, updateResp] = useUpdateEventMutation();
  const [assignees, setAssignees] = useState([]);
  const { data: detail, isLoading } = useSelectiveAssigneeQuery();
  useEffect(() => {
    setAssignees(detail);
  }, [detail]);

  const departments = [
    { value: "M012700", label: "MIS & Communication" },
    { value: "M014004", label: "Facility Management Department" },
    { value: "M011500", label: "Food & Nutrition Services (FNSD)" },
    { value: "M013200", label: "Bio Medical" },
  ];

  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState({
    name: state.event.name,
    description: state.event.description,
    status: state.event.status,
    priority: state.event.priority,
    department: state.event.department,
    assignedTo: state.event.assignedTo,
    remarks: state.event.remarks,
    resolvedAt: state.event.resolvedAt,
  });
  const [files, setFiles] = useState(state.event.files);

  function handleDelete(name) {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  }

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  function handleUpdate() {
    update({ id: state.event._id, data: { ...data, files: [...files] } }).then(
      (res) => {
        if (res?.data?.message) {
          toast.success("Complaint Updated Successfully!");
        }
      }
    );
  }

  // function btnresolved() {
  //   // Check if an assignee is selected
  //   if (!data.assignedTo) {
  //     toast.error("Please select an assignee before marking as resolved.");
  //     return;
  //   }

  //   // Update the status to 'resolved' before sending to the database
  //   const updatedData = { ...data, status: "resolved" };

  //   update({ id: state.event._id, data: updatedData }).then((res) => {
  //     if (res?.data?.message) {
  //       toast.success("Complaint Successfully Mark as Resolved");
  //     }
  //   });
  // }

  function btnresolved() {
    // Check if an assignee is selected
    if (!data.assignedTo) {
      toast.error("Please select an assignee before marking as resolved.");
      return;
    }

    // Check if remarks are empty
    if (!data.remarks) {
      toast.error("Please provide comments before marking as resolved.");
      return;
    }

    // Update the status to 'resolved' and add timestamp
    const resolvedTimestamp = new Date().toISOString(); // Get current timestamp
    const updatedData = {
      ...data,
      status: "resolved",
      resolvedAt: resolvedTimestamp,
    };

    update({ id: state.event._id, data: updatedData }).then((res) => {
      if (res?.data?.message) {
        toast.success("Complaint Successfully Mark as Resolved");

        // Redirect to /eventdirectory after 3 seconds
        setTimeout(() => {
          navigate("/eventdirectory");
        }, 1000);
      }
    });
  }

  function btncancel() {
    // Check if an assignee is selected
    if (!data.assignedTo) {
      toast.error("Please select an assignee before marking as resolved.");
      return;
    }

    // Check if remarks are empty
    if (!data.remarks) {
      toast.error("Please provide comments before marking as resolved.");
      return;
    }

    // Update the status to 'resolved' and add timestamp
    const resolvedTimestamp = new Date().toISOString(); // Get current timestamp
    const updatedData = {
      ...data,
      status: "canceled",
      resolvedAt: resolvedTimestamp,
    };

    update({ id: state.event._id, data: updatedData }).then((res) => {
      if (res?.data?.message) {
        toast.success("Complaint Successfully Canceled");

        // Redirect to /eventdirectory after 3 seconds
        setTimeout(() => {
          navigate("/eventdirectory");
        }, 1000);
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
                {/* <p>{JSON.stringify(assignees, null, 4)}</p> */}
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item ">Edit Complaint</li>
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
                  <div className="form-group">
                    <label htmlFor="inputName">Subject</label>
                    <input
                      name="name"
                      type="text"
                      id="inputName"
                      className="form-control"
                      value={data?.name}
                      onChange={onChange}
                      readOnly={true}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputDescription">Description</label>
                    <textarea
                      name="description"
                      id="inputDescription"
                      className="form-control"
                      rows={4}
                      value={data?.description}
                      onChange={onChange}
                      readOnly={true} // Set readOnly attribute to true
                    />
                  </div>

                  <div className="row">
                    <div className="form-group col-md-4">
                      <label htmlFor="inputDepartment">
                        Complaint Department{" "}
                      </label>
                      <input
                        name="department"
                        id="inputDepartment"
                        className="form-control custom-select"
                        type="text"
                        value={data?.department}
                        readOnly // Make the input non-editable
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="inputPriority">Priority</label>
                      <select
                        name="priority"
                        className="form-control custom-select"
                        value={data?.priority}
                        onChange={onChange}
                      >
                        <option value="" defaultValue="" selected disabled>
                          Select Priority
                        </option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>

                    {/* <div className="form-group col-md-3">
                      <label htmlFor="inputStatus">Status</label>
                      <select
                        name="status"
                        className="form-control custom-select"
                        value={data?.status}
                        onChange={onChange}
                      >
                        <option value="" selected disabled>
                          Select one
                        </option>
                        <option value="in-progress">In Progress</option>
                        <option value="canceled">Canceled</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div> */}

                    <div className="form-group col-md-4">
                      <label htmlFor="inputStatus">
                        Assign To <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="assignedTo"
                        className="form-control custom-select"
                        value={data?.assignedTo}
                        onChange={onChange}
                      >
                        <option value="" selected disabled>
                          Select one
                        </option>
                        {assignees?.map((assignee) => (
                          <>
                            <option value={assignee._id}>
                              {assignee.firstName + " " + assignee.lastName}
                            </option>
                          </>
                        ))}
                      </select>
                    </div>

                    <div className="form-group col-12">
                      <label htmlFor="inputRemarks">
                        Comments<span style={{ color: "red" }}>*</span>
                      </label>
                      <textarea
                        name="remarks"
                        id="inputRemarks"
                        className="form-control"
                        rows={2}
                        value={data?.remarks}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* <div className="col-md-12">
              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">Files</h3>
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
                <div className="card-body p-0">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>File Name</th>
                        <th>File Size</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {files &&
                        files.map((file) => (
                          <tr key={file.name}>
                            <td>{file.name}</td>

                            <td>{Math.round(file.size / 1024)} KB</td>
                            <td className="text-right py-0 align-middle">
                              <div className="btn-group btn-group-sm">
                                <a
                                  href={file.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-info"
                                >
                                  <i className="fas fa-eye" />
                                </a>
                                <button
                                  onClick={() => handleDelete(file.name)}
                                  className="btn btn-danger"
                                >
                                  <i className="fas fa-trash" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div> */}
          </div>
          <div className="row" id="cap">
            {/* Resolved Button */}
            <button
              onClick={btnresolved}
              type="button"
              className="btn btn-success float-right"
              value={data?.status}
              onChange={onChange}
              style={{
                width: "120px",
                marginRight: "10px",
                marginLeft: "10px",
              }}
            >
              Resolved
            </button>

            {/* Save Button */}
            {updateResp.isLoading ? (
              <div className="float-right" style={{ marginRight: 15 }}>
                <Loader size={30} />
              </div>
            ) : (
              <button
                onClick={handleUpdate}
                type="button"
                className="btn btn-primary float-right"
                style={{
                  width: "120px",
                  marginRight: "10px",
                  marginLeft: "10px",
                }}
              >
                Save
              </button>
            )}

            {/* Cancel Button */}
            <button
              onClick={btncancel}
              type="button"
              className="btn btn-danger float-right"
              value={data?.status}
              onChange={onChange}
              style={{
                width: "120px",
                marginRight: "10px",
                marginLeft: "10px",
              }}
            >
              Cancel
            </button>

            {/* Back Button */}
            <Link
              to="/eventdirectory"
              className="btn btn-secondary"
              style={{
                width: "120px",
                marginRight: "10px",
                marginLeft: "10px",
              }}
            >
              Back
            </Link>
          </div>

          {/* 
          <div className="form-group col-md-3">
            <label htmlFor="inputStatus">Status</label>
            <div className="btn-group" role="group" aria-label="Status">
              <button
                type="button"
                className={`btn ${
                  data && data.status === "in-progress"
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
                onClick={() => onChange && onChange("in-progress")}
              >
                In Progress
              </button>
              <button
                type="button"
                className={`btn ${
                  data && data.status === "canceled"
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
                onClick={() => onChange && onChange("canceled")}
              >
                Canceled
              </button>
              <button
                type="button"
                className={`btn ${
                  data && data.status === "resolved"
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
                onClick={() => onChange && onChange("resolved")}
              >
                Resolved
              </button>
            </div>
          </div> */}
        </section>
        {/* /.content */}
      </div>
      <Footer />
    </div>
  );
};

export default Updateevent;
