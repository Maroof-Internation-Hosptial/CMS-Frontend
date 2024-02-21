import React from "react";
import Navbar from "../common/navbar";
import Footer from "../common/footer";
import { useLocation, useNavigate } from "react-router";
import moment from "moment";
import "../css/don.css";
import { useUpdateMarkMutation } from "../../api/api";
import { toast } from "sonner";

const DonorsDetail = () => {
  const { state } = useLocation();
  const [updateMark] = useUpdateMarkMutation();
  const navigation = useNavigate();

  function handleMark(donorId) {
    updateMark({ donationId: state.donationId, donorId })
      .then((res) => {
        toast.success("Verification Success");
        navigation("/donations");
      })
      .catch((err) => toast.error(err.message));
  }
  return (
    <>
      <Navbar />
      <section class="section-50">
        <div class="container-fluid px-5">
          <h5 class="m-b-50 heading-line">
            Donors <i class="ml-3 mt-2 fas fa-donate"></i>
          </h5>
          <div className="donations-container">
            {state.donors.map((donation, index) => (
              <div
                key={index}
                className="donation-card"
                style={{
                  backgroundColor: donation.mark ? "#bbf7d0" : "#bfdbfe",
                }}
              >
                <h2
                  className="organization-name"
                  style={{ textAlign: "center", fontWeight: "normal" }}
                >
                  {donation.donationBy.firstName} {donation.donationBy.lastName}
                </h2>
                <div className="donation-info" style={{ textAlign: "center" }}>
                  <div>
                    <img
                      src={donation.donationBy.image}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginBottom: 10,
                      }}
                    />
                  </div>
                  <a
                    href={donation.receiptImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-info"
                  >
                    View Receipt
                  </a>
                  <p>
                    <strong>Amount Donated: </strong>RS {donation.amount}
                  </p>
                  <p>
                    <strong>Contact Info:</strong> {donation.phone}
                  </p>
                  <p>{moment(donation.donationDate).fromNow()}</p>
                  {!donation.mark && (
                    <button
                      onClick={() => handleMark(donation._id)}
                      className="btn btn-sm btn-success mt-2"
                    >
                      Mark as verified
                    </button>
                  )}
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

export default DonorsDetail;
