import React, { useEffect, useState } from "react";
import Navbar from "../common/navbar";
import Footer from "../common/footer";
import { Link, useNavigate } from "react-router-dom";
import { useSelectiveEventsQuery, useUpdateEventMutation } from "../../api/api";
import moment from "moment";
import { toast } from "sonner";
import DeleteDialogue from "../DeleteDialogue";
import { useSelector } from "react-redux";

const Eventdirectoryresolved = () => {
  const user = useSelector((state) => state.authReducer.activeUser);
  const permissions = useSelector((state) => state.authReducer.permissions);

  const { data, isLoading } = useSelectiveEventsQuery();
  const [update, updateResp] = useUpdateEventMutation();

  const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const [Events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const navigate = useNavigate();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);


  function handleDelete(id) {
    update({ id, data: { is_active: false } }).then((res) => {
      if (res?.data?.message) {
        toast.success("Event Deleted Successfully!");
      }
    });
  }

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearch(term);

    const filtered = Events?.filter((event) =>
      event.name.toLowerCase().includes(term.toLowerCase())
    );
    setFiltered(filtered);
  };

  useEffect(() => {
    setEvents(data);
    setFiltered(data);
  }, [data]);

  useEffect(() => {
    const timer = setInterval(() => {
      // Update events with timer data
      setEvents(prevEvents =>
        prevEvents.map(event => ({
          ...event,
          timer: moment().diff(moment(event.createdAt), "seconds")
        }))
      );
    }, 1000);

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, []);

  const pendingEvents = Events
    ? Events.filter((event) => event.status === "in-progress")
    : [];

  const getTimerColor = (priority, timer) => {
    const timeLimits = {
      High: 1800, // 30 minutes in seconds
      Medium: 3600, // 60 minutes in seconds
      Low: 5400 // 90 minutes in seconds
    };

    if (timer >= timeLimits[priority]) {
      return '#ff4d4d'; // or any other color for time over
    } else {
      return 'transparent'; // default color
    }
  };

  const formatTimer = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pendingEvents.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <div className="wrapper">
        <Navbar />
        <div style={{ padding: "0 20px", minHeight: "83vh" }}>
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6"></div>
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
          </section>
          <div className="mb-2" style={{ width: "30%", marginLeft: "auto" }}>
            <input
              className="form-control"
              placeholder="Search"
              value={search}
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <section className="content">
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
                  {pendingEvents && pendingEvents.length > 0 ? (
                    <thead>
                      <tr>
                        <th style={{ width: "1%" }}>ID</th>
                        <th style={{ width: "30%" }}>Subject</th>
                        <th style={{ width: "30%" }}>Complainee Dept</th>
                        <th style={{ width: "30%" }}>Complainee</th>
                        <th style={{ width: "8%" }} className="text-center">
                          Priority
                        </th>

                        <th>Submited</th>
                        <th style={{ width: "8%" }} className="text-center">
                          Timer
                        </th>
                        <th style={{ width: "8%" }} className="text-center">
                          Status
                        </th>
                        <th style={{ width: "20%" }}>Actions</th>
                      </tr>
                    </thead>
                  ) : (
                    <thead>
                      <th style={{ textAlign: "center" }}>
                        {isLoading
                          ? "Loading Events"
                          : "No Resolved Complaint Found"}
                      </th>
                    </thead>
                  )}
                  <tbody>
                    {currentItems.map((row, index) => (
                      <tr key={row._id}>
                        <td>{row.complaint_id}</td>
                        <td>
                          <a>{row.name}</a>
                        </td>
                        {/* <td>{user?.userdepartment}</td> */}
                        Accounts
                        <td>
                          {/* {user.firstName} {user.lastName} */}
                          Faizan Ali
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <a>{row.priority}</a>
                        </td>

                        <td>
                          {moment(row.createdAt).format("DD.MM.YYYY")}
                          <br />
                          <small>
                            {" "}
                            {moment(row.createdAt).format("h:mm:ss A")}
                          </small>
                        </td>
                        <td style={{ backgroundColor: getTimerColor(row.priority, row.timer) }}>
                          {formatTimer(row.timer)}
                        </td>
                        <td className="Event-state">
                          <span
                            className={`badge ${row.status === "resolved"
                              ? "badge-success"
                              : row.status === "in-progress"
                                ? "badge-primary"
                                : row.status === "canceled"
                                  ? "badge-danger"
                                  : row.status === "upcoming"
                                    ? "badge-warning"
                                    : ""
                              }`}
                            style={{ padding: "8px 12px", width: 100 }}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td
                          className="Event-actions text-right"
                          style={{
                            display: "flex",
                            alignItems: "center",
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
                            href="/eventdetails"
                          >
                            <i className="fas fa-eye"></i>
                          </button>

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

                          {permissions.includes("delete") && (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                setSelectedId(row._id);
                                setOpenDeleteDialogue(true);
                              }}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-footer clearfix">
                <ul className="pagination pagination-sm m-0 float-right">
                  {currentPage > 1 && (
                    <li className="page-item">
                      <button className="page-link bg-primary text-white" style={{ width: "120px" }} onClick={() => paginate(currentPage - 1)}>Previous Page</button>
                    </li>
                  )}
                  {/* Render "Next" button only if there are enough items for the next page */}
                  {itemsPerPage < pendingEvents.length && indexOfLastItem < pendingEvents.length && (
                    <li className="page-item">
                      <button className="page-link bg-primary text-white" style={{ width: "120px" }} onClick={() => paginate(currentPage + 1)}>Next Page</button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </section>
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

export default Eventdirectoryresolved;
