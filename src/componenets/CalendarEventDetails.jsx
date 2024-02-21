import React from "react";
import { useNavigate } from "react-router";

function CalendarEventDetails({ event, closeModal }) {
  const navigate = useNavigate();
  return (
    <>
      {Array.isArray(event) ? (
        <div className="event-modal">
          <p className="mt-2" style={{ fontSize: 20, fontWeight: 500 }}>
            Events Details
          </p>
          {event.map((event, index) => (
            <div
              className="d-flex mb-3"
              style={{ gap: 10, alignItems: "center" }}
            >
              <span>{event.title}</span>
              <button
                onClick={() =>
                  navigate("/eventdetails", {
                    state: { event },
                  })
                }
                className="btn btn-primary btn-sm"
              >
                More Details
              </button>
            </div>
          ))}
          <button className="btn btn-sm btn-light" onClick={closeModal}>
            Close
          </button>
        </div>
      ) : (
        <div className="event-modal">
          <p className="mt-2" style={{ fontSize: 20, fontWeight: 500 }}>
            Events Details
          </p>
          <div
            className="d-flex mb-3"
            style={{ gap: 10, alignItems: "center" }}
          >
            <span>{event.title}</span>
            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                navigate("/eventdetails", {
                  state: { event },
                })
              }
            >
              More Details
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CalendarEventDetails;
