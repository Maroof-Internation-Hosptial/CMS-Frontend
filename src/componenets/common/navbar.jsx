import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, setPermissions } from "../../redux/reducers/auth";
import CustomModal from "../Modal";
import LogoutModal from "../Modal";
import moment from "moment";
import { toast } from "sonner";
import { api, useGetNotificationsQuery } from "../../api/api";
import { initSocket } from "../../socket";
import { BiSupport } from "react-icons/bi";

const Navbar = () => {
  const user = useSelector((state) => state.authReducer.activeUser);
  const isRemember = useSelector((state) => state.authReducer.isRemember);
  const [openLogout, setOpenLogout] = useState(false);

  const { data, refetch } = useGetNotificationsQuery();

  const [noti, setNoti] = useState([]);
  const socketRef = useRef(null);

  const [openAddNoti, setOpenAddNoti] = useState(false);
  const textRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function confirmLogOut() {
    setOpenLogout(false);
    sessionStorage.clear();
    localStorage.clear();
    dispatch(api.util.resetApiState());
    dispatch(logout());
    navigate("/");
  }

  function handleLogout() {
    setOpenLogout(true);
  }

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
      }

      socketRef.current.on("notification", () => {
        refetch();
      });
      socketRef.current.on("allNotificationsRead", () => {
        refetch();
      });
      socketRef.current.on("permissionChanged", (data) => {
        if (data.userId === user._id) {
          dispatch(setPermissions(data.permissions));
          if (isRemember) {
            localStorage.setItem(
              "permissions",
              JSON.stringify(data.permissions)
            );
          } else {
            sessionStorage.setItem(
              "permissions",
              JSON.stringify(data.permissions)
            );
          }
        }
        // dispatch(api.util.updateQueryData("/users"));
      });
    };
    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off("notification");
      socketRef.current.off("allNotificationsRead");
    };
  }, []);

  const handleSendNotification = () => {
    if (socketRef.current && textRef?.current?.value) {
      socketRef.current.emit("adminBroadcast", textRef?.current?.value);
      toast.success("Notification sent");
      setOpenAddNoti(false);
    }
  };

  const handleMarkAllAsRead = () => {
    socketRef.current.emit("markAllAsRead", user._id);
  };

  let unreadCount = 0;

  function countUnreadDocuments() {
    noti?.forEach((notification) => {
      if (
        (!notification.isReadBy ||
          notification.isReadBy.indexOf(user._id) === -1) &&
        (!notification.isClearBy ||
          notification.isClearBy.indexOf(user._id) === -1)
      ) {
        unreadCount++;
      }
    });
  }

  countUnreadDocuments();

  useEffect(() => {
    setNoti(data);
  }, [data]);

  return (
    <div>
      <nav
        className="navbar navbar-expand navbar-white navbar-light"
        style={{
          padding: "6px 20px",
          borderBottom: "1px solid #ededed",
        }}
      >
        {/* Left navbar links */}
        <ul className="navbar-nav">
          {/* <li className="nav-item">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => dispatch(handleDrawerOpen())}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          </li> */}

          {/* <li className="nav-item d-none d-sm-inline-block">
            <a href="/dashboard" className="nav-link">
              {" "}
              Home{" "}
            </a>
          </li> */}

          {user.role !== "admin" && (
            <li className="nav-item d-none d-sm-inline-block">
              <Link
                to="/contact"
                className="nav-link"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <BiSupport />
                Support{" "}
              </Link>
            </li>
          )}
        </ul>

        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Navbar Search */}
          {/* <li className="nav-item">
            <a
              className="nav-link"
              data-widget="navbar-search"
              href="#"
              role="button"
            >
              <i className="fas fa-search" />
            </a>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search" />
                    </button>
                    <button
                      className="btn btn-navbar"
                      type="button"
                      data-widget="navbar-search"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li> */}

          {/* Messages Dropdown Menu */}
          {/* <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-comments" />
              <span className="badge badge-danger navbar-badge">3</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <a href="#" className="dropdown-item">
                <div className="media">
                  <img
                    src="dist/img/user1-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-50 mr-3 img-circle"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Brad Diesel
                      <span className="float-right text-sm text-danger">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">Call me whenever you can...</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <div className="media">
                  <img
                    src="dist/img/user8-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-50 img-circle mr-3"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      John Pierce
                      <span className="float-right text-sm text-muted">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">I got your message bro</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <div className="media">
                  <img
                    src="dist/img/user3-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-50 img-circle mr-3"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Nora Silvester
                      <span className="float-right text-sm text-warning">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">The subject goes here</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
              </a>

              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item dropdown-footer">
                {" "}
                See All Messages{" "}
              </a>
            </div>
          </li> */}

          {/* Notifications Dropdown Menu */}
          {user.role === "admin" ? (
            <div
              className="nav-link"
              style={{ position: "relative", cursor: "pointer" }}
              onClick={() => setOpenAddNoti(true)}
            >
              <i className="fa fa-bell" />
              <span
                className="badge badge-info navbar-badge"
                style={{ position: "absolute" }}
              >
                <i className="fas fa-plus" />
              </span>
            </div>
          ) : (
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="far fa-bell" />
                <span className="badge badge-warning navbar-badge">
                  {noti && unreadCount}
                </span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-right"
                style={{ maxWidth: "41vw" }}
              >
                <span className="dropdown-item dropdown-header">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>
                      {noti && unreadCount} Unread Notification
                      {noti && unreadCount > 1 ? "s" : ""}
                    </p>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      style={{ paddingTop: "1px", paddingBottom: "1px" }}
                      onClick={() => handleMarkAllAsRead()}
                    >
                      Mark all read
                    </button>
                  </div>
                </span>
                <div className="dropdown-divider" />
                {noti &&
                  noti.slice(0, 7).map((not) => (
                    <div
                      key={not._id}
                      className="dropdown-item"
                      style={{
                        marginBottom: 5,
                        backgroundColor: not.isReadBy.includes(user._id)
                          ? "white"
                          : "#f1f5f9",
                        display: not?.isClearBy.includes(user._id)
                          ? "none"
                          : "block",
                        borderRadius: 5,
                        width: "40vw",
                      }}
                    >
                      {console.log(not)}
                      <div className="d-flex">
                        <i className="fas fa-envelope mr-2" />
                        <div
                          className="d-flex"
                          style={{ justifyContent: "space-between", flex: 1 }}
                        >
                          <p style={{ fontSize: 12, textAlign: "justify" }}>
                            {not.message}
                          </p>
                          <span
                            className="float-right text-muted"
                            style={{ fontSize: 10, marginLeft: 5 }}
                          >
                            {moment(not.createdAt).fromNow()}
                          </span>
                        </div>
                      </div>
                      <div style={{ borderBottom: "1px solid #f1f5f9" }}></div>
                    </div>
                  ))}
                <div className="dropdown-divider" />
                <div
                  onClick={() =>
                    navigate("/notifications", {
                      state: { notifications: noti },
                    })
                  }
                  className="dropdown-item dropdown-footer"
                  style={{ cursor: "pointer" }}
                >
                  See All Notifications
                </div>
              </div>
            </li>
          )}

          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>
          <li className="nav-item">
            <li className="nav-item d-none d-sm-inline-block">
              <button
                onClick={handleLogout}
                className="btn  btn-outline-danger"
                style={{ outline: "none", border: "none", color: "black" }}
              >
                Logout
              </button>
            </li>
          </li>
        </ul>
      </nav>
      <CustomModal open={openAddNoti} setOpen={setOpenAddNoti}>
        <div className="form-group">
          <label>Enter Notification to be broadcast</label>
          <textarea
            type="text"
            className="form-control"
            style={{ width: "100%" }}
            rows="2"
            ref={textRef}
          />
        </div>
        <div
          className="d-flex gap-5 justify-content-center align-items-center"
          style={{ gap: 10 }}
        >
          <button
            onClick={() => setOpenAddNoti(false)}
            className="btn btn-outline-secondary"
          >
            Cancel
          </button>

          <button
            className="btn btn-outline-primary"
            onClick={handleSendNotification}
          >
            Send
          </button>
        </div>
      </CustomModal>
      <LogoutModal open={openLogout} setOpen={setOpenLogout} width={300}>
        <div className="form-group">
          <label>Are you sure want to Logout ?</label>
        </div>
        <div
          className="d-flex gap-5 justify-content-center align-items-center"
          style={{ gap: 10 }}
        >
          <button
            onClick={() => setOpenLogout(false)}
            className="btn btn-sm btn-outline-secondary"
          >
            Cancel
          </button>

          <button
            className="btn btn-sm btn-outline-primary"
            onClick={confirmLogOut}
          >
            Confirm
          </button>
        </div>
      </LogoutModal>
    </div>
  );
};

export default Navbar;
