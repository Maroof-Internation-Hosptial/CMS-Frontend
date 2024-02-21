import React, { useRef } from "react";
import "../css/style.css";
import { useState } from "react";
import Navbar from "../common/navbar";
import Footer from "../common/footer";
import { useGetAllUsersQuery } from "../../api/api";
import { useEffect } from "react";
import { initSocket } from "../../socket";
import { toast } from "sonner";

const Configuration = () => {
  const { data, refetch } = useGetAllUsersQuery();
  const [users, setUsers] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
      }
      socketRef.current.on("permissionChanged", (data) => {
        refetch().then((res) => {
          setUsers(res.data);
          setFilteredItems(res.data);
        });
      });
    };
    init();
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    setUsers(data);
    setFilteredItems(data);
  }, [data]);

  const handlePermissionChange = (userId, permission, isChecked) => {
    socketRef.current.emit("updatePermission", {
      userId,
      permission,
      isChecked,
    });
    toast.success("Permission Updated");
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearch(term);

    const filtered = users?.filter(
      (user) =>
        user.firstName.toLowerCase().includes(term.toLowerCase()) ||
        user.lastName.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredItems(filtered);
  };
  return (
    <div className="wrapper">
      <Navbar />
      <div style={{ padding: "0 20px", minHeight: "83vh" }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h5>System Configuration</h5>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item ">Configuration</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <div className="">
          <div className="mb-2" style={{ width: "30%", marginLeft: "auto" }}>
            <input
              className="form-control"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Permissions</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                filteredItems.length > 0 &&
                filteredItems.map((user) => {
                  if (user.role === "dept-manager") {
                    return (
                      <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>
                          <span className="d-block">
                            {user.firstName} {user.lastName}
                          </span>
                          <small>{user.email}</small>
                        </td>
                        <td>
                          <span style={{ textTransform: "capitalize" }}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex">
                            <label style={{ marginRight: 10 }}>
                              <input
                                type="checkbox"
                                checked={user.permissions.includes("create")}
                                onChange={(e) =>
                                  handlePermissionChange(
                                    user._id,
                                    "create",
                                    e.target.checked
                                  )
                                }
                                style={{ cursor: "pointer" }}
                              />
                              Create
                            </label>
                            <label style={{ marginRight: 10 }}>
                              <input
                                type="checkbox"
                                checked={user.permissions.includes("update")}
                                onChange={(e) =>
                                  handlePermissionChange(
                                    user._id,
                                    "update",
                                    e.target.checked
                                  )
                                }
                                style={{ cursor: "pointer" }}
                              />
                              Update
                            </label>
                            <label style={{ marginRight: 10 }}>
                              <input
                                type="checkbox"
                                checked={user.permissions.includes("delete")}
                                onChange={(e) =>
                                  handlePermissionChange(
                                    user._id,
                                    "delete",
                                    e.target.checked
                                  )
                                }
                                style={{ cursor: "pointer" }}
                              />
                              Delete
                            </label>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Configuration;
