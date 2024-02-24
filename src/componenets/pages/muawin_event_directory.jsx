import React, { useEffect } from "react";
import Navbar from "../common/navbar";

import Footer from "../common/footer";
import { Link, useNavigate } from "react-router-dom";
import { useAssigneeEventsQuery, useUpdateEventMutation } from "../../api/api";
// import { useAllEventsQuery, useUpdateEventMutation } from "../../api/api";
import moment from "moment";
import { toast } from "sonner";
import DeleteDialogue from "../DeleteDialogue";
import { useState } from "react";
import { useSelector } from "react-redux";

const Eventdirectory = () => {
	const user = useSelector((state) => state.authReducer.activeUser);

	const { data, isLoading } = useAssigneeEventsQuery();
	// const { data, isLoading } = useAllEventsQuery();
	const [update, updateResp] = useUpdateEventMutation();

	const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);
	const [selectedId, setSelectedId] = useState("");

	const navigate = useNavigate();

	function handleDelete(id) {
		update({ id, data: { is_active: false } }).then((res) => {
			if (res?.data?.message) {
				toast.success("Event Deleted Successfully!");
			}
		});
	}

	return (
		<>
			<div className="wrapper">
				<Navbar />
				<div style={{ padding: "0 20px", minHeight: "83vh" }}>
					{/* Content Header (Page header) */}
					<section className="content-header">
						<div className="container-fluid">
							<div className="row mb-2">
								<div className="col-sm-6">
									<h1>Complaints</h1>
								</div>
								<div className="col-sm-6">
									<ol className="breadcrumb float-sm-right">
										<li className="breadcrumb-item">
											<Link to="/dashboard">Home</Link>
										</li>
										<li className="breadcrumb-item ">Complaints</li>
									</ol>
								</div>
							</div>
						</div>
						{/* /.container-fluid */}
					</section>
					{/* Main content */}
					<section className="content">
						{/* Default box */}
						<div className="card">
							<div className="card-header">
								<h3 className="card-title">Complaints</h3>
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
							<div className="card-body p-0">
								<table className="table table-striped Events">
									{data && data.length > 0 ? (
										<thead>
											<tr>
												<th style={{ width: "1%" }}>No.</th>
												<th style={{ width: "30%" }}>Details</th>
												<th>Progress</th>
												{/* <th>Created By</th> */}
												<th style={{ width: "8%" }} className="text-center">
													Status
												</th>
												<th style={{ width: "20%" }}>Actions</th>
											</tr>
										</thead>
									) : (
										<thead>
											<th style={{ textAlign: "center" }}>
												{isLoading ? "Loading Events" : "No Events"}
											</th>
										</thead>
									)}
									<tbody>
										{data &&
											data.map((row, index) => {
												if (row.status !== "success") {
													return (
														<tr key={row._id}>
															<td>{index + 1}</td>
															<td>
																<a>{row.name}</a>
																<br />
																<small>
																	Created{" "}
																	{moment(row.createdAt).format("DD.MM.YYYY")}
																</small>
															</td>
															<td className="Event_progress">
																<div className="progress progress-sm">
																	<div
																		className="progress-bar bg-green"
																		role="progressbar"
																		aria-volumenow={57}
																		aria-volumemin={0}
																		aria-volumemax={100}
																		style={{ width: "57%" }}
																	></div>
																</div>
																<small>57% Complete</small>
															</td>
															{/* <td>
                            <a>
                              {`${row.created_by.firstName} 
                                ${
                                  row.created_by.lastName
                                    ? row.created_by.lastName
                                    : ""
                                }`}
                            </a>
                            <br />
                            <small>{row.created_by.email}</small>
                          </td> */}
															<td className="Event-state">
																<span
																	className={`badge ${
																		row.status === "resolved"
																			? "badge-success"
																			: row.status === "in-progress"
																			? "badge-primary"
																			: row.status === "canceled"
																			? "badge-danger"
																			: row.status === "upcoming"
																			? "badge-warning"
																			: ""
																	}`}
																	style={{ padding: "5px 10px" }}
																>
																	{row.status}
																</span>
															</td>
															<td
																className="Event-actions text-right"
																style={{
																	display: "flex",
																	alignItems: "center",
																	justifyContent: "start",
																	gap: 5,
																}}
															>
																<button
																	onClick={() =>
																		navigate("/eventdetails", {
																			state: { event: row },
																		})
																	}
																	className="btn btn-primary btn-sm"
																	style={{ marginRight: 5, marginBottom: 5 }}
																	href="/eventdetails"
																>
																	<i className="fas fa-folder"></i>
																</button>
																{user?.role === "admin" ? (
																	<button
																		onClick={() =>
																			navigate("/updateevent", {
																				state: { event: row },
																			})
																		}
																		className="btn btn-info btn-sm"
																	>
																		<i className="fas fa-pencil-alt"></i>
																	</button>
																) : (
																	user?._id === row?.created_by?._id && (
																		<button
																			onClick={() =>
																				navigate("/updateevent", {
																					state: { event: row },
																				})
																			}
																			className="btn btn-info btn-sm"
																		>
																			<i className="fas fa-pencil-alt"></i>
																		</button>
																	)
																)}
																{user?.role === "admin" ? (
																	<button
																		className="btn btn-danger btn-sm"
																		onClick={() => {
																			setSelectedId(row?._id);
																			setOpenDeleteDialogue(true);
																		}}
																	>
																		<i className="fas fa-trash"></i>
																	</button>
																) : (
																	user._id === row?.created_by?._id && (
																		<button
																			className="btn btn-danger btn-sm"
																			onClick={() => {
																				setSelectedId(row?._id);
																				setOpenDeleteDialogue(true);
																			}}
																		>
																			<i className="fas fa-trash"></i>
																		</button>
																	)
																)}
															</td>
														</tr>
													);
												}
											})}
									</tbody>
								</table>
							</div>
							{/* /.card-body */}
						</div>
						{/* /.card */}
					</section>
					{/* /.content */}
				</div>
				<DeleteDialogue
					open={openDeleteDialogue}
					onClose={() => setOpenDeleteDialogue(false)}
					onConfirm={() => handleDelete(selectedId)}
				/>
				<Footer />
			</div>
		</>
	);
};

export default Eventdirectory;
