import React, { useEffect, useState } from "react";
import Navbar from "../common/navbar";
import Footer from "../common/footer";
import { Link, useNavigate } from "react-router-dom";
import { useSelectiveEventsQuery, useUpdateEventMutation } from "../../api/api";
import moment from "moment";
import { toast } from "sonner";
import DeleteDialogue from "../DeleteDialogue";
import { useSelector } from "react-redux";
import { calculatePercentage } from "../../utils";

const Eventdirectory = () => {
  const user = useSelector((state) => state.authReducer.activeUser);
  const permissions = useSelector((state) => state.authReducer.permissions);

  const { data, isLoading } = useSelectiveEventsQuery();
  const [update, updateResp] = useUpdateEventMutation();

  const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const [Events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [timers, setTimers] = useState({}); // Store timers for each event

  const navigate = useNavigate();

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
    const timersCopy = { ...timers };
    const interval = setInterval(() => {
      const updatedEvents = Events.map((event) => {
        const priority = event.priority.toLowerCase();
        const duration = priority === 'high' ? 1 : priority === 'medium' ? 60 : 90;
        const elapsedTime = moment.duration(moment().diff(moment(event.createdAt)));
        timersCopy[event._id] = elapsedTime.asSeconds() >= duration * 60 ? 0 : duration * 60 - elapsedTime.asSeconds();
        return {
          ...event,
          elapsedTime,
        };
      });
      setEvents(updatedEvents);
      setTimers(timersCopy);
    }, 1000);

    return () => clearInterval(interval);
  }, [Events]);

  const inProgressEvents = Events
    ? Events.filter((event) => event.status === "in-progress")
    : [];

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
                  {inProgressEvents && inProgressEvents.length > 0 ? (
                    <thead>
                      <tr>
                        <th style={{ width: "1%" }}>ID</th>
                        <th style={{ width: "30%" }}>Subject</th>
                        <th style={{ width: "30%" }}>Department</th>
                        <th style={{ width: "30%" }}>Name</th>
                        <th style={{ width: "8%" }} className="text-center">
                          Priority
                        </th>
                        <th>Submited</th>
                        <th>Resolved</th>
                        <th style={{ width: "8%" }} className="text-center">
                          Status
                        </th>
                        <th style={{ width: "20%" }}>Actions</th>
                        <th style={{ width: "10%" }}>Timer</th>
                      </tr>
                    </thead>
                  ) : (
                    <thead>
                      <th style={{ textAlign: "center" }}>
                        {isLoading ? "Loading Events" : "No Complaint Found"}
                      </th>
                    </thead>
                  )}
                  <tbody>
                    {inProgressEvents.map((row, index) => {
                      // Check if the timer for this event has completed
                      const isTimerCompleted = timers[row._id] <= 0;

                      // Check if the status is still 'in-progress' and timer is completed
                      const isLate = row.status === 'in-progress' && isTimerCompleted;

                      return (
                        <tr key={row._id}>
                          <td>{row.complaint_id}</td>
                          <td>
                            <a>{row.name}</a>
                          </td>
                          <td>{user?.userdepartment}</td>
                          <td>
                            {user.firstName} {user.lastName}
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
                          <td>
                            {row.resolvedAt ? (
                              <>
                                {moment(row.resolvedAt).format("DD.MM.YYYY")}
                                <br />
                                <small>
                                  {moment(row.resolvedAt).format("h:mm:ss A")}
                                </small>
                              </>
                            ) : (
                              "Not resolved"
                            )}
                          </td>

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
                            {permissions.includes("update") && (
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
                            )}
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
                          <td style={{ textAlign: "center", backgroundColor: isLate ? 'rgba(255, 0, 0, 0.2)' : 'inherit', color: isLate ? 'red' : 'inherit' }}>
                            {isLate ? "Late" : (timers[row._id] > 0 ? moment.utc(timers[row._id] * 1000).format('HH:mm:ss') : "Time's up!")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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

export default Eventdirectory;
