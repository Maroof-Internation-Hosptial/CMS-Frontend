import React from "react";
import "../css/notifications.css";
import Navbar from "../common/navbar";
import Footer from "../common/footer";
import { useLocation } from "react-router";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  api,
  useClearNotificationsMutation,
  useGetNotificationsQuery,
} from "../../api/api";
import { toast } from "sonner";
import Loader from "../Loader";

const Notifications = () => {
  const { state } = useLocation();
  const user = useSelector((state) => state.authReducer.activeUser);
  const { data } = useGetNotificationsQuery();
  const [clear, { isLoading }] = useClearNotificationsMutation();

  function handleClear() {
    clear(user._id)
      .then((res) => {
        if (res.data.message) {
          toast.success("Notifications Cleared");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  }

  return (
    <>
      <Navbar />
      <section class="section-50">
        <div class="container-fluid px-5">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h5 class="m-b-50 heading-line">
              Notifications <i class="fa fa-bell text-muted"></i>
            </h5>
            {isLoading ? (
              <Loader size={25} />
            ) : (
              <button
                className="btn btn-outline-secondary"
                style={{ height: 35, fontSize: 13 }}
                onClick={handleClear}
              >
                Clear All Notifications
              </button>
            )}
          </div>
          <div class="notification-ui_dd-content">
            {data &&
              data?.map((not) => (
                <div
                  key={not._id}
                  class="notification-list notification-list--unread"
                  style={{
                    backgroundColor: not.isReadBy.includes(user._id)
                      ? "white"
                      : "#f1f5f9",
                    display: not?.isClearBy.includes(user._id)
                      ? "none"
                      : "block",
                  }}
                >
                  <div class="notification-list_content">
                    <div class="notification-list_img">
                      <img src={not.notificationBy.image} alt="profile" />
                    </div>
                    <div class="notification-list_detail">
                      <p style={{ textAlign: "left", fontSize: 14 }}>
                        <b>{not.notificationBy.firstName}</b> sent you a
                        notification
                      </p>

                      <p
                        class="text-muted"
                        style={{ textAlign: "left", fontSize: 14 }}
                      >
                        {not.message}
                      </p>
                      <p class="text-muted" style={{ textAlign: "left" }}>
                        <small>{moment(not.createdAt).fromNow()}</small>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* <div class="text-center">
            <a href="#!" class="dark-link">
              Load more activity
            </a>
          </div> */}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Notifications;
