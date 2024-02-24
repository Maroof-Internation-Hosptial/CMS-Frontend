import React, { useEffect, useState } from "react";
import "../css/style.css";
import Navbar from "../common/navbar";

import Footer from "../common/footer";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { convertMinutes } from "../../utils/index";
import { baseURL } from "../../api/api";
import axios from "axios";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Report = () => {
  const user = useSelector((state) => state.authReducer.activeUser);

  const [quote, setQuote] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportFormat, setReportFormat] = useState("pdf");
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  const handleReportFormatChange = (e) => {
    setReportFormat(e.target.value);
  };

  const handleGenerateReport = () => {
    if (!startDate || !endDate) {
      toast.error("Please Select Start & End Date");
      return;
    }
    const unixStartDate = moment(startDate).unix();
    const unixEndDate = moment(endDate).unix();
    setIsLoading(true);
    axios
      .get(`${baseURL}/event/pdf`, {
        params: {
          startDate: unixStartDate,
          endDate: unixEndDate,
          userId:
            user.role === "admin"
              ? null
              : user.role === "dept-manager"
              ? user._id
              : user.created_by,
        },
      })
      .then((response) => {
        setIsLoading(false);
        const data = response.data;
        if (data.length === 0) {
          return toast.error("No Events Found");
        } else if (reportFormat === "pdf") {
          const report = new jsPDF("portrait", "pt", "a4");
          const image = new Image();
          image.src = "dist/img/Muawin-Logo.png";
          report.addImage(image, "PNG", 30, 8, 50, 50);
          report.text("Events Report", 80, 40);
          const headers = [
            [
              "S.No",
              "Name",
              "Description",
              "Event Venue",
              "Event Date",
              "Event Leader",
              "Budget",
              "Spent",
              "Duration",
            ],
          ];
          const tableData = data.map((event, index) => [
            index + 1,
            event.name,
            event.description,
            event.venue,
            moment.unix(event?.date).format("Do MMMM YYYY, h:mm a"),
            event.leader,
            event.budget,
            event.spent,
            convertMinutes(event.duration),
          ]);

          report.autoTable({
            head: headers,
            body: tableData,
            startY: 50,
            styles: {
              fontSize: 8,
            },
          });

          report.save("events_report.pdf");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error:", error);
      });
  };

  const hasError = false;
  if (hasError) {
    alert(
      "An error occurred while generating the report. Please contact muawin support."
    );
  }

  useEffect(() => {
    if (quote.length === 0) {
      axios({
        method: "get",
        url: "https://api.api-ninjas.com/v1/quotes?category=success",
        headers: {
          "X-Api-Key": process.env.REACT_APP_QUOTES_API_KEY,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          setQuote(response.data);
        })
        .catch(function (error) {
          console.error("Error getting quote:", error.response.data);
        });
    }
  }, []);

  return (
    <div className="wrapper">
      <Navbar />
      <div style={{ padding: "0 20px", minHeight: "84vh" }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Reports and Analytics</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item ">Reports</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <div className="container">
          <div className="filters">
            <label htmlFor="startDate">From:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={handleDateChange}
            />
            <label htmlFor="endDate">To:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={handleDateChange}
            />
            <label htmlFor="reportFormat">Report Format:</label>
            <select
              id="reportFormat"
              name="reportFormat"
              value={reportFormat}
              onChange={handleReportFormatChange}
            >
              <option value="pdf">PDF</option>
              {/* <option value="csv">CSV</option> */}
            </select>

            {isLoading ? (
              <Loader />
            ) : (
              <button id="report" onClick={handleGenerateReport}>
                Get Report
              </button>
            )}
          </div>
          <p className="error-note">
            If you encounter any errors while generating the report, please
            contact muawin support for assistance.
          </p>
        </div>
        <section className="mt-5" style={{ marginLeft: 100, marginRight: 70 }}>
          <div className="">
            <div className="">
              <div className="text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-quotes/bulb.webp"
                  alt="Bulb"
                  width="100"
                />
              </div>

              <figure className="text-center mb-0">
                <blockquote className="blockquote">
                  <p className="pb-3">
                    <i
                      className="fas fa-quote-left fa-xs text-primary"
                      style={{ paddingRight: 5 }}
                    ></i>
                    <span className="lead font-italic">
                      {quote.length > 0 && quote[0].quote}
                    </span>
                    <i
                      className="fas fa-quote-right fa-xs text-primary"
                      style={{ paddingLeft: 5 }}
                    ></i>
                  </p>
                </blockquote>
                <figcaption className="blockquote-footer mb-0">
                  {quote.length > 0 && quote[0].author}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Report;
