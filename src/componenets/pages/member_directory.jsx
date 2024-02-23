import React, { useEffect, useState } from "react";
import Navbar from "../common/navbar";

import Footer from "../common/footer";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetRukanMuawinsQuery,
  useUpdateMemberMutation,
} from "../../api/api";
import moment from "moment";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import DeleteDialogue from "../DeleteDialogue";
import { useSelector } from "react-redux";
import { MenuItem, Select } from "@mui/material";
import Loader from "../Loader";

const Member_directory = () => {
  const user = useSelector((state) => state.authReducer.activeUser);
  const permissions = useSelector((state) => state.authReducer.permissions);

  const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);
  const [update, updateResp] = useUpdateMemberMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [selectedItem, setSelectedItem] = useState({ column: "", id: "" });
  const [search, setSearch] = useState("");
  const [Members, setMembers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const { data, isLoading: rukanLoading } = useGetRukanMuawinsQuery(user?._id);
  const [selectedId, setSelectedId] = useState("");

  const navigate = useNavigate();

  function handleDelete(id) {
    deleteUser(id).then((res) => {
      if (res?.data?.message) {
        toast.success("User Deleted");
      }
    });
  }

  function handleActive(value, id) {
    setSelectedItem({ column: "status", id });
    update({ id, data: { is_active: value } }).then((res) => {
      if (res?.data?.message) {
        toast.success("Account Status Updated");
        setSelectedItem({});
      }
    });
  }

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearch(term);

    const filtered = Members?.filter(
      (user) =>
        user.firstName.toLowerCase().includes(term.toLowerCase()) ||
        user.lastName.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase())
    );

    setFiltered(filtered);
  };

  useEffect(() => {
    setMembers(data);
    setFiltered(data);
  }, [data]);

  return (
    <>
      <div className="wrapper">
        {/* Navbar */}
        <Navbar />
        {/* /.navbar */}
        {/* <Sidenav /> */}
        <div style={{ padding: "0 20px", minHeight: "83vh" }}>
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                 
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="/dashboard">Home</a>
                    </li>
                    <li className="breadcrumb-item "> Directory</li>
                  </ol>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </section>
          {/* Main content */}
          <div className="mb-2" style={{ width: "30%", marginLeft: "auto" }}>
            <input
              className="form-control"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <section className="content">
            {/* Default box */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title"> Directory</h3>
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
                  {Members && Members.length > 0 ? (
                    <thead>
                      <tr>
                        <th style={{ width: "1%" }}>No.</th>
                        <th style={{ width: "15%" }}>User Name</th>
                        <th style={{ width: "10%" }}>Role</th>
                        <th style={{ width: "12%" }}>Department</th>
                        <th style={{ width: "12%" }}>First Login</th>
                        <th style={{ width: "12%" }}>Last Login</th>
                        <th style={{ width: "10%" }}>Status</th>
                        <th style={{ width: "20%" }}>Action</th>
                      </tr>
                    </thead>
                  ) : (
                    <thead>
                      <th style={{ textAlign: "center" }}>
                        {rukanLoading ? "Loading..." : "No User Found"}
                      </th>
                    </thead>
                  )}
                  <tbody>
                    {Members &&
                      filtered.map((user, index) => (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td>
                            <a>
                              {user.firstName} {user.lastName}
                            </a>
                            <br />
                            <small>{user.email}</small>
                            <br />
                            {/* <small>
                              Created{" "}
                              {moment(user.createdAt).format("DD.MM.YYYY")}
                            </small> */}
                          </td>
                          <td
                            style={{
                              fontSize: 14,
                            }}
                          >
                            <a style={{ textTransform: "capitalize" }}>
                              {user.role}
                            </a>
                          </td>
                          <td
                            style={{
                              fontSize: 14,
                            }}
                          >
                            <a style={{ textTransform: "capitalize" }}>
                              {user.userdepartment}
                            </a>
                          </td>

                          <td
                            style={{
                              fontSize: 14,
                            }}
                          >
                            {user.first_login === "Nil"
                              ? "Nil"
                              : moment(user.first_login).fromNow()}
                          </td>
                          <td style={{ fontSize: 14 }}>
                            {user.last_login === "Nil"
                              ? "Nil"
                              : moment(user.last_login).fromNow()}
                          </td>

                          <td>
                            {selectedItem.id === user._id &&
                            selectedItem.column === "status" ? (
                              <div style={{ marginLeft: 10 }}>
                                {" "}
                                <Loader size={20} />
                              </div>
                            ) : (
                              <Select
                                sx={{
                                  width: 80,
                                  height: 30,
                                  fontSize: 10,
                                  border: "none",
                                  outline: "none",
                                  backgroundColor: user.is_active
                                    ? " #bbf7d0"
                                    : " #fecaca",
                                }}
                                value={user.is_active}
                                onChange={(e) =>
                                  handleActive(e.target.value, user._id)
                                }
                              >
                                <MenuItem value={true}>Active</MenuItem>
                                <MenuItem value={false}>Disabled</MenuItem>
                              </Select>
                            )}
                          </td>
                          <td className="Event-actions text-center">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                              }}
                            >
                              <button
                                onClick={() =>
                                  navigate("/memberdetails", {
                                    state: { user },
                                  })
                                }
                                className="btn btn-primary btn-sm"
                              >
                                <i className="fas fa-eye"></i>
                                {/* View */}
                              </button>
                              {permissions.includes("update") && (
                                <button
                                  onClick={() =>
                                    navigate("/updatemember", {
                                      state: { user },
                                    })
                                  }
                                  className="btn btn-info btn-sm"
                                >
                                  <i className="fas fa-pencil-alt"></i>
                                  {/* Edit */}
                                </button>
                              )}
                              {permissions.includes("delete") && (
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => {
                                    setSelectedId(user._id);
                                    setOpenDeleteDialogue(true);
                                  }}
                                >
                                  <i className="fas fa-trash"></i>
                                  {/* Delete */}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
      <DeleteDialogue
        open={openDeleteDialogue}
        onClose={() => setOpenDeleteDialogue(false)}
        onConfirm={() => handleDelete(selectedId)}
      />
    </>
  );
};

export default Member_directory;
