import React from "react";
import { Link } from "react-router-dom";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import { Chart as GoogleChart } from "react-google-charts";
import Todos from "../Todos";
import EventsCalendar from "../EventsCalendar";
import {
  useCalendarEventsQuery,
  useGetAllUsersCountQuery,
  useGetCityStatsQuery,
  useGetDonationsCountQuery,
  useGetStatsQuery,
  useGetTodosCountQuery,
} from "../../api/api";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
  datasets: [
    {
      data: [20, 30, 25, 15, 10],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"],
    },
  ],
};

const Header = () => {
  const user = useSelector((state) => state.authReducer.activeUser);

  const { data: statsData, isLoading: statsLoading } = useGetStatsQuery();
  const { data: events, isLoading: eventsLoading } = useCalendarEventsQuery();
  const { data: userCount, isLoading: userCountLoading } =
    useGetAllUsersCountQuery();
  const { data: todoCount, isLoading: todoCountLoading } =
    useGetTodosCountQuery();
  const { data: donationCount, isLoading: donationLoading } =
    useGetDonationsCountQuery();
  const { data: userCitiesStats } = useGetCityStatsQuery();
  return (
    <div>
      <div>
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item">Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="card">
                  <div className="card-body bg-success d-flex flex-column justify-content-between align-items-center">
                    <div>
                      <h3
                        className="text-white mb-0"
                        style={{ fontSize: "40px" }}
                      >
                        {donationLoading ? (
                          <HourglassEmptyRoundedIcon style={{ fontSize: 30 }} />
                        ) : (
                          donationCount
                        )}
                      </h3>
                    </div>
                    <div>
                      <p className="text-white mb-0 small">Open D</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-6">
                <div className="card">
                  <div
                    className="card-body bg-secondary d-flex flex-column justify-content-between align-items-center"
                    style={{ textAlign: "center" }}
                  >
                    <div>
                      <h3
                        className="text-white mb-0"
                        style={{ fontSize: "40px" }}
                      >
                        {todoCountLoading ? (
                          <HourglassEmptyRoundedIcon style={{ fontSize: 30 }} />
                        ) : (
                          todoCount
                        )}
                      </h3>
                      <p className="text-white mb-0 small">Incomplete Tasks</p>
                    </div>
                  </div>
                </div>
              </div>

              {user.role !== "User" ? (
                <div className="col-lg-3 col-6">
                  <div
                    className="card-body bg-danger d-flex flex-column justify-content-between align-items-center"
                    style={{ textAlign: "center" }}
                  >
                    <div>
                      <h3
                        className="text-white mb-0"
                        style={{ fontSize: "40px" }}
                      >
                        {eventsLoading ? (
                          <HourglassEmptyRoundedIcon style={{ fontSize: 30 }} />
                        ) : (
                          events?.length
                        )}
                      </h3>
                      <p className="text-white mb-0 small">Total Complaint</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-lg-3 col-6">
                  <div
                    className="card-body bg-danger d-flex flex-column justify-content-between align-items-center"
                    style={{ textAlign: "center" }}
                  >
                    <div>
                      <h3
                        className="text-white mb-0"
                        style={{ fontSize: "40px" }}
                      >
                        <HourglassEmptyRoundedIcon style={{ fontSize: 30 }} />
                      </h3>
                      <p className="text-white mb-0 small">Coming Soon</p>
                    </div>
                  </div>
                </div>
              )}
              {user?.role !== "complaint-assignee" && user.role !== "User" ? (
                <div className="col-lg-3 col-6">
                  <div
                    className="card-body bg-info d-flex flex-column justify-content-between align-items-center"
                    style={{ textAlign: "center" }}
                  >
                    <div>
                      <h3
                        className="text-white mb-0"
                        style={{ fontSize: "40px" }}
                      >
                        {userCountLoading ? (
                          <HourglassEmptyRoundedIcon style={{ fontSize: 30 }} />
                        ) : (
                          userCount
                        )}
                      </h3>
                      <p className="text-white mb-0 small">
                        Total {user?.role === "admin" ? "Users" : "Users"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-lg-3 col-6">
                  {/* small box */}
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>
                        <HourglassEmptyRoundedIcon style={{ fontSize: 30 }} />
                      </h3>
                      <p>Coming Soon</p>
                    </div>
                    <div className="icon">
                      <i className="fa fa-clock" />
                    </div>
                    <Link to="#" className="small-box-footer">
                      <i className="fas fa-arrow" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="row">
              <section className="col-lg-7 connectedSortable">
                {/* TO DO List */}
                <Todos />
                {/* /.card */}
              </section>

              {/* Calendar */}

              {/* <section className="col-lg-5 connectedSortable">
                {user.role !== "User" && <EventsCalendar events={events} />}
                {user.role === "User" && <div style={{ height: "48vh" }}></div>}
              </section> */}


              {/* right col */}
            </div>
            {/* /.row (main row) */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
};

export default Header;
