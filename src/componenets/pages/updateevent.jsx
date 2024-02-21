import React, { useState } from "react";
import "../css/style.css";
import Navbar from "../common/navbar";

import Footer from "../common/footer";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useUpdateEventMutation } from "../../api/api";
import Loader from "../Loader";
import { toast } from "sonner";

const Updateevent = () => {
  const [update, updateResp] = useUpdateEventMutation();

  const { state } = useLocation();

  const [data, setData] = useState({
    name: state.event.name,
    description: state.event.description,
    status: state.event.status,
    location: state.event.location,
    department: state.event.department,
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
          toast.success("Event Updated Successfully!");
        }
      }
    );
  }

  console.log(data);
  return (
    <div className="wrapper">
      <Navbar />
      <div style={{ padding: "0 20px" }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Event Edit</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item ">Edit Event</li>
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
                    <label htmlFor="inputName">Complainant Name</label>
                    <input
                      name="name"
                      type="text"
                      id="inputName"
                      className="form-control"
                      value={data?.name}
                      onChange={onChange}
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
                    />
                  </div>
                  <div className="row">
                    <div className="form-group col-md-4">
                      <label htmlFor="inputLocation">Location</label>
                      <select
                        name="location"
                        className="form-control custom-select"
                        value={data?.location}
                        onChange={onChange}
                      >
                        <option value="" defaultValue="" selected disabled>
                          Select Location
                        </option>
                        <option value="Ground-Floor">Ground Floor</option>
                        <option value="First-Floor">1st Floor</option>
                        <option value="Second-Floor">2nd Floor</option>
                        <option value="Third-Floor">3rd Floor</option>
                      </select>
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="inputDepartment">Department</label>
                      <select
                        name="department"
                        className="form-control custom-select"
                        value={data?.department}
                        onChange={onChange}
                      >
                        <option value="" defaultValue="" selected disabled>
                          Select Department
                        </option>
                        <option value="Department-MIS">MIS</option>
                        <option value="Department-HR">HR</option>
                        <option value="Department-Accounts">Accounts</option>
                        <option value="Department-OPD">OPD</option>
                      </select>
                    </div>
                    <div className="form-group col-md-4">
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
                        <option value="upcoming">Upcoming</option>
                        <option value="in-progress">In Progress</option>
                        <option value="canceled">Canceled</option>
                        <option value="success">Success</option>
                      </select>
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
            <Link
              to="/eventdirectory"
              className="btn btn-secondary"
              style={{ marginRight: "10px" , marginLeft: "10px" }}
            >
              Cancel
            </Link>

            {updateResp.isLoading ? (
              <div className="float-right" style={{ marginRight: 15 }}>
                <Loader size={30} />
              </div>
            ) : (
              <button
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

export default Updateevent;
