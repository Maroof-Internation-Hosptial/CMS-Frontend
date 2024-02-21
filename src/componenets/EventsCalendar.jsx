import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarEventDetails from "./CalendarEventDetails";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import { Link } from "react-router-dom";

export default function EventsCalendar({ events }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const eventsWithFormattedDates = events?.map((doc) => ({
    ...doc,
    id: doc._id,
    title: doc.name,
    date: new Date(doc.date * 1000),
  }));

  const getEventCountForDate = (date) => {
    return eventsWithFormattedDates?.filter((event) => {
      return (
        date.getDate() === event?.date?.getDate() &&
        date.getMonth() === event?.date?.getMonth() &&
        date.getFullYear() === event?.date?.getFullYear()
      );
    }).length;
  };

  const tileContent = ({ date, view }) => {
    const eventCount = getEventCountForDate(date);
    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const isPast = date < today;

    const handleClick = () => {
      const eventsForDate = eventsWithFormattedDates.filter((event) => {
        return (
          date.getDate() === event.date.getDate() &&
          date.getMonth() === event.date.getMonth() &&
          date.getFullYear() === event.date.getFullYear()
        );
      });

      if (eventsForDate.length > 0) {
        setSelectedEvent(eventsForDate);
      }
    };

    let backgroundColor = "transparent"; // Default background color
    let color = "black";

    if (isToday) {
      backgroundColor = "blue"; // Today's background color
      color = "white";
    } else if (isPast) {
      backgroundColor = "lightgreen"; // Past days' background color
    } else if (eventCount > 0) {
      backgroundColor = "lightcoral"; // Future days with events' background color
    }

    return (
      <div
        style={{
          backgroundColor,
          borderRadius: 10,
          color,
          marginTop: 2,
          cursor: "pointer",
          padding: eventCount > 0 ? 2 : null,
        }}
        onClick={handleClick}
      >
        <div className="flex-center" style={{ gap: 2 }}>
          {/* {isToday && <span>Yes </span>} */}
          <span style={{ fontSize: 15, fontWeight: 600 }}>
            {eventCount > 0 ? eventCount : null}
          </span>
          {eventCount > 0 && <EventOutlinedIcon sx={{ fontSize: 15 }} />}
        </div>
      </div>
    );
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <div className="card bg-gradient-success">
        <div className="card-header border-0">
          <h3 className="card-title">
            <i className="far fa-calendar-alt mr-1" />
            Events Calendar
          </h3>
          {/* tools card */}
          <div className="card-tools">
            {/* button with a dropdown */}
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-success btn-sm dropdown-toggle"
                data-toggle="dropdown"
                data-offset={-52}
              >
                <i className="fas fa-bars" />
              </button>
              <div className="dropdown-menu" role="menu">
                <Link to="/addevent" className="dropdown-item">
                  Add new event
                </Link>
                <Link to="/eventdirectory" className="dropdown-item">
                  Clear events
                </Link>
                {/* <div className="dropdown-divider" />
                          <a href="#" className="dropdown-item">
                            View calendar
                          </a> */}
              </div>
            </div>
            <button
              type="button"
              className="btn btn-success btn-sm"
              data-card-widget="collapse"
            >
              <i className="fas fa-minus" />
            </button>
            <button
              type="button"
              className="btn btn-success btn-sm"
              data-card-widget="remove"
            >
              <i className="fas fa-times" />
            </button>
          </div>
          {/* /. tools */}
        </div>
        {/* /.card-header */}
        <div className="card-body pt-0">
          {/*The calendar */}
          <Calendar tileContent={tileContent} showNeighboringMonth={false} />
          {selectedEvent && (
            <CalendarEventDetails
              event={selectedEvent}
              closeModal={closeModal}
            />
          )}

          {/* <div id="calendar" style={{ width: "100%" }} /> */}
        </div>
        {/* /.card-body */}
      </div>
    </div>
  );
}
