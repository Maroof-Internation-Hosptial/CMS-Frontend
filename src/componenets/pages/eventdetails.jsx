import React from "react";
import Navbar from "../common/navbar";

import Footer from "../common/footer";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { uploadFiles, useUpdateEventMutation } from "../../api/api";
import { toast } from "sonner";
import { validateFiles } from "../../utils/validations";
import ProgressLoader from "../ProgressLoader";
import moment from "moment";
import { convertMinutes } from "../../utils";
import { useSelector } from "react-redux";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { BsFilePerson } from "react-icons/bs";

const Eventdetails = () => {
  const [update, updateResp] = useUpdateEventMutation();
  const user = useSelector((state) => state.authReducer.activeUser);

  const { state } = useLocation();
  const [stateFiles, setStateFiles] = useState(state?.event?.files);
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState({});

  function handleImageDelete(index) {
    const updatedItems = Array.from(files).filter((file, i) => i !== index);
    setFiles(updatedItems);
  }

  async function handleUpload() {
    const isValid = await validateFiles(files, setError);
    if (isValid) {
      setProgress(25);
      uploadFiles(files, setProgress)
        .then((res) => {
          setFiles([]);
          setStateFiles([...stateFiles, ...res]);
          update({
            id: state.event._id,
            data: { files: [...state.event.files, ...res] },
          }).then((res) => {
            setProgress(0);
            if (res?.data?.message) {
              toast.success("Files Added Successfully");
            }
          });
        })
        .catch((err) => console.log(err.message));
    }
  }
  return (
    <div className="wrapper" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "0 20px", flex: "1" }}>
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Event Detail</h3>
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
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="remove"
                  data-toggle="tooltip"
                  title="Remove"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 mb-4">
                  <div className="card mb-4">
                    <div className="card-body">
                      <div className="form-outline mb-4">
                        <label style={{ fontSize: 17 }}>Subject</label>
                        <p
                          style={{
                            textAlign: "start",
                            fontSize: 16,
                            marginTop: 2,
                          }}
                        >
                          {state?.event?.name}
                        </p>
                      </div>
                      <div className="form-outline mb-4">
                        <label style={{ fontSize: 17 }}>Description</label>
                        <p
                          style={{
                            textAlign: "start",
                            fontSize: 16,
                            marginTop: 2,
                          }}
                        >
                          {state?.event?.description}
                        </p>
                      </div>

                      <h5 className="mt-5 ">Attachment files</h5>
                      <ul className="list-unstyled">
                        {stateFiles?.map((file, index) => (
                          <li key={index}>
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-link text-secondary"
                            >
                              <i className="far fa-fw fa-file-word" />{" "}
                              {file.name}
                            </a>
                          </li>
                        ))}
                        {files.length > 0 &&
                          Array.from(files).map((file, index) => (
                            <li key={file.name}>
                              <a className="btn-link text-secondary">
                                <i className="far fa-fw fa-file-word" />{" "}
                                {file.name}
                                <HighlightOffIcon
                                  onClick={() => handleImageDelete(index)}
                                  sx={{
                                    fontSize: 18,
                                    color: "red",
                                    marginLeft: 0.5,
                                    "&:hover": {
                                      cursor: "pointer",
                                      color: "darkred",
                                    },
                                  }}
                                />
                              </a>
                            </li>
                          ))}
                      </ul>
                      <div className="mt-2 mb-3">
                        {progress > 0 ? (
                          <ProgressLoader progress={progress} />
                        ) : files.length > 0 ? (
                          <div className="form-group">
                            <div
                              className="btn btn-sm btn-primary btn-file"
                              onClick={handleUpload}
                            >
                              <i className="fas fa-upload" /> Upload
                            </div>
                          </div>
                        ) : (
                          user._id === state.event.created_by._id ||
                          (user.role === "admin" && (
                            <div className="form-group">
                              <div className="btn btn-sm btn-primary btn-file">
                                <i className="fas fa-paperclip" /> Add Files
                                <input
                                  type="file"
                                  name="attachment"
                                  onChange={(e) => {
                                    setFiles(e.target.files);
                                  }}
                                  multiple
                                />
                              </div>
                              <p
                                style={{
                                  display: "inline",
                                  marginLeft: 5,
                                  fontSize: 12,
                                }}
                                className="help-block"
                              >
                                Max. 10 MB
                              </p>
                              {error.attachment && (
                                <p className="validation-error">
                                  {error.attachment?.message}
                                </p>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="info-box bg-light">
                    <div className="info-box-content">
                      <span className="info-box-text text-center text-muted">
                        Created At
                      </span>
                      <span className="info-box-number text-center text-muted mb-0">
                        {moment(state?.event?.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss A"
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="info-box bg-light">
                    <div className="info-box-content">
                      <span className="info-box-text text-center text-muted">
                        Priority{" "}
                      </span>
                      <span className="info-box-number text-center text-muted mb-0">
                        {state?.event?.priority}
                      </span>
                    </div>
                  </div>
                  <div className="info-box bg-light">
                    <div className="info-box-content">
                      {/* <span className="info-box-text text-center text-muted">
                        Department
                      </span> */}
                      <span className="info-box-number text-center text-muted mb-0">
                        {state?.event?.department}
                        <span></span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Eventdetails;
