import React, { useEffect } from "react";
import Navbar from "../common/navbar";

import Footer from "../common/footer";
import { Link, useNavigate } from "react-router-dom";
import { useAddRatingMutation, useAllEventsQuery } from "../../api/api";
import moment from "moment";
import { toast } from "sonner";
import DeleteDialogue from "../DeleteDialogue";
import { useState } from "react";
import { useSelector } from "react-redux";
import CustomModal from "../Modal";
import Rating from "react-rating";
import { calculatePercentage } from "../../utils";

const EventFeedback = () => {
  const user = useSelector((state) => state.authReducer.activeUser);
  const { data, isLoading } = useAllEventsQuery();
  const [add, addResp] = useAddRatingMutation();
  const [rating, setRating] = useState(0);
  const [search, setSearch] = useState("");
  const [Events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [openStartDialogue, setOpenStarDialogue] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const navigate = useNavigate();

  function handleRating() {
    add({ id: selectedId, data: { rating } }).then((res) => {
      if (res?.data?.message) {
        setOpenStarDialogue(false);
        toast.success("Ratings Done");
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

  function isRated(ratingsArray) {
    return ratingsArray.some((rating) => rating.byUser === user._id);
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
          <div className="mb-2" style={{ width: "30%", marginLeft: "auto" }}>
            <input
              className="form-control"
              placeholder="Search"
              value={search}
              onChange={(e) => handleSearch(e)}
            />
          </div>
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
                  {Events && Events.length > 0 ? (
                    <thead>
                      <tr>
                        <th style={{ width: "1%" }}>No.</th>
                        <th style={{ width: "25%" }}>Complainant</th>
                        <th>Progress</th>
                        {/* <th>Created By</th> */}
                        <th style={{ width: "8%" }} className="text-center">
                          Status
                        </th>
                        <th style={{ width: "20%" }}>Rating</th>
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
                    {Events &&
                      filtered.map((row, index) => {
                        if (row.status === "success" && !isRated(row.ratings)) {
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
                                    style={{
                                      width: `${calculatePercentage(
                                        row.ratings
                                      )}%`,
                                    }}
                                  ></div>
                                </div>
                                <small className="d-block mt-2">
                                  {calculatePercentage(row.ratings)}% Success
                                  Rate
                                </small>
                                <small className="d-block">
                                  Based on {row.ratings.length} reviews
                                </small>
                              </td>
                              <td className="Event-state">
                                <span
                                  className={`badge ${
                                    row.status === "success"
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
                                  <i className="fas fa-folder"></i>
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedId(row._id);
                                    setOpenStarDialogue(true);
                                  }}
                                  className="btn btn-warning btn-sm"
                                  disabled={isRated(row.ratings)}
                                >
                                  <i className="fas fa-star">
                                    {" "}
                                    {isRated(row.ratings)
                                      ? "Rated"
                                      : "Rate this"}
                                  </i>
                                </button>
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
        <CustomModal open={openStartDialogue} setOpen={setOpenStarDialogue}>
          <div
            className="flex-center"
            style={{ flexDirection: "column", gap: 10 }}
          >
            <span className="d-block" style={{ fontWeight: "bold" }}>
              Give Feedback
            </span>
            <span
              className="d-block"
              style={{
                fontSize: 14,
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Thank you for attending! We value your feedback and would love to
              hear about your experience.
            </span>
            <Rating
              emptySymbol={
                <img
                  src="dist/img/star-empty.png"
                  style={{
                    width: "30px",
                    height: "30px",
                    marginRight: "5px",
                  }}
                />
              }
              fullSymbol={
                <img
                  src="dist/img/star-full.png"
                  style={{
                    width: "30px",
                    height: "30px",
                    marginRight: "5px",
                  }}
                />
              }
              onChange={(value) => setRating(value)}
              initialRating={rating}
            />
            <div className="flex-center" style={{ gap: 10, marginTop: 20 }}>
              <button
                className="btn btn-sm btn-success"
                onClick={() => handleRating()}
              >
                Submit
              </button>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => setOpenStarDialogue(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </CustomModal>
        <Footer />
      </div>
    </>
  );
};

export default EventFeedback;
