import React, { useEffect, useState } from "react";
import "../css/style.css";
import Navbar from "../common/navbar";

import Footer from "../common/footer";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
// import { useUpdateEventMutation } from "../../api/api";
import Loader from "../Loader";
import { toast } from "sonner";
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

	const { state } = useLocation();

	const [data, setData] = useState({
		name: state.event.name,
		description: state.event.description,
		status: state.event.status,
		priority: state.event.priority,
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
	console.log(assignees);
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
								{/* <p>{JSON.stringify(assignees, null, 4)}</p> */}
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
										<div className="form-group col-md-3">
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

										<div className="form-group col-md-3">
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

										<div className="form-group col-md-3">
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
										</div>

										<div className="form-group col-md-3">
											<label htmlFor="inputStatus">Assign Too</label>
											<select
												name="status"
												className="form-control custom-select"
												value={data?.status}
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
