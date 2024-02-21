import React, { useRef, useState } from "react";
import "../css/don.css";
import Navbar from "../common/navbar";
import Footer from "../common/footer";
import { useNavigate } from "react-router";
import {
  uploadImageToCloudinary,
  useAddDonationAmountMutation,
  useDeleteDonationMutation,
  useGetDonationsQuery,
  useUpdateDonationMutation,
} from "../../api/api";
import CustomModal from "../Modal";
import DeleteModal from "../Modal";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function Donations() {
  const navigation = useNavigate();
  const user = useSelector((state) => state.authReducer.activeUser);

  const { data, isLoading } = useGetDonationsQuery();
  const [addAmount] = useAddDonationAmountMutation();
  const [updateDonation, { isLoading: updateLoading }] =
    useUpdateDonationMutation();

  const [deleteDonation, { isLoading: deleteLoading }] =
    useDeleteDonationMutation();
  const [openDonation, setOpenDonation] = useState(false);
  const [amount, setAmount] = useState(0);
  const [file, setFile] = useState(null);
  const [selectedId, setSelectedId] = useState("");
  const [amountLoading, setAmountLoading] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [donationDetails, setDonationDetails] = useState({
    projectName: "",
    requiredCost: "",
    location: "",
    collectedAmount: "",
    city: "",
  });
  const [openMark, setOpenMark] = useState(false);
  const [openDelete, setopenDelete] = useState(false);

  async function handleDonation(e) {
    e.preventDefault();
    setAmountLoading(true);
    const imageURL = await uploadImageToCloudinary(file);
    addAmount({
      id: selectedId,
      data: { donationBy: user._id, amount, receiptImage: imageURL },
    })
      .then((res) => {
        if (res.data.message) {
          toast.success("Donation Added");
        }
        setAmountLoading(false);
        setAmount(0);
        setOpenDonation(false);
      })
      .catch((err) => {
        setOpenDonation(false);

        toast.error(err.message);
      });
  }

  function handleUpdateDonation(e) {
    e.preventDefault();
    updateDonation({
      id: selectedId,
      data: donationDetails,
    })
      .then((res) => {
        if (res.data.message) {
          toast.success("Donation Updated");
        }
        setOpenUpdate(false);
      })
      .catch((err) => {
        setOpenUpdate(false);
        toast.error(err.message);
      });
  }

  function handleMark(e) {
    e.preventDefault();
    e.preventDefault();
    updateDonation({
      id: selectedId,
      data: { isActive: "false" },
    })
      .then((res) => {
        if (res.data.message) {
          toast.success("Donation Marked As Done");
        }
        setOpenMark(false);
      })
      .catch((err) => {
        setOpenMark(false);
        toast.error(err.message);
      });
  }

  function handleDelete() {
    deleteDonation(selectedId)
      .then((res) => {
        if (res.data.message) {
          toast.success("Donation Deleted");
        }
        setopenDelete(false);
      })
      .catch((err) => {
        setopenDelete(false);
        toast.error(err.message);
      });
  }

  const matchedArray = data?.filter((item) => item.city === user.city) || [];
  const notMatchedArray = data?.filter((item) => item.city !== user.city) || [];
  const donations = [...matchedArray, ...notMatchedArray];

  return (
    <div className="wrapper">
      <Navbar />
      <div style={{ padding: "0 20px", minHeight: "84vh" }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Donations</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item ">Donations</li>
                </ol>
              </div>
            </div>
            {user.role === "admin" && (
              <div className="row">
                <button
                  onClick={() => navigation("/adddonation")}
                  className="btn btn-primary"
                  style={{ marginLeft: "auto" }}
                >
                  Create
                </button>
              </div>
            )}
          </div>
        </section>

        <div>
          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Loader size={25} />
            </div>
          ) : (
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>City</th>
                  <th style={{ textAlign: "center" }}>Collection</th>
                  <th>Required Cost</th>
                  <th>Donate Now</th>
                  {user.role === "admin" && <th>Donations</th>}
                </tr>
              </thead>
              <tbody>
                {donations &&
                  donations.length > 0 &&
                  donations.map((donation) => (
                    <tr
                      key={donation._id}
                      style={{
                        backgroundColor: donation.is_active
                          ? "#f7fee7"
                          : "#fff1f2",
                      }}
                    >
                      <td>
                        <span>{donation.projectName}</span>
                      </td>
                      <td>
                        <span>{donation.location}</span>
                      </td>
                      <td>
                        <span>{donation.city}</span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center ">
                          <div style={{ width: "5rem" }}>
                            <span>RS</span>{" "}
                            <span>{donation.collectedAmount}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span>RS</span> <span>{donation.requiredCost}</span>
                      </td>
                      <td>
                        {donation.is_active && (
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => {
                              setSelectedId(donation._id);
                              setOpenDonation(true);
                            }}
                          >
                            Donate Now
                          </button>
                        )}
                      </td>
                      {user.role === "admin" && (
                        <td>
                          <button
                            className="btn-sm"
                            style={{
                              backgroundColor: "rgb(92, 99, 106)",
                              width: 70,
                            }}
                            onClick={() =>
                              navigation("/donorsdetail", {
                                state: {
                                  donors: donation.donors,
                                  donationId: donation._id,
                                },
                              })
                            }
                          >
                            Donors
                          </button>
                          <button
                            onClick={() => {
                              setOpenMark(true);
                              setSelectedId(donation._id);
                            }}
                            className="btn btn-info btn-sm ml-2 mr-2"
                            disabled={!donation.is_active}
                          >
                            <i className="fas fa-check"></i>
                          </button>
                          <button
                            className="btn-sm"
                            style={{ backgroundColor: "rgb(19, 132, 150)" }}
                            onClick={() => {
                              setSelectedId(donation._id);
                              setDonationDetails({
                                projectName: donation.projectName,
                                requiredCost: donation.requiredCost,
                                location: donation.location,
                                collectedAmount: donation.collectedAmount,
                                city: donation.city,
                              });
                              setOpenUpdate(true);
                            }}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            onClick={() => {
                              setopenDelete(true);
                              setSelectedId(donation._id);
                            }}
                            className="btn btn-info btn-sm ml-2"
                            style={{ backgroundColor: "red" }}
                          >
                            <i
                              className="fas fa-trash"
                              style={{ color: "white" }}
                            ></i>
                          </button>
                          <CustomModal
                            open={openUpdate}
                            setOpen={setOpenUpdate}
                            textAlign={"start"}
                          >
                            <h4
                              className="mb-4"
                              style={{ textAlign: "center" }}
                            >
                              Update Donation
                            </h4>
                            <label>Project Name</label>
                            <input
                              className="form-control mb-2"
                              value={donationDetails.projectName}
                              onChange={(e) =>
                                setDonationDetails({
                                  ...donationDetails,
                                  projectName: e.target.value,
                                })
                              }
                            />
                            <label>Required Cost</label>
                            <input
                              className="form-control mb-2"
                              value={donationDetails.requiredCost}
                              onChange={(e) =>
                                setDonationDetails({
                                  ...donationDetails,
                                  requiredCost: e.target.value,
                                })
                              }
                            />
                            <label>Location</label>
                            <input
                              className="form-control mb-2"
                              value={donationDetails.location}
                              onChange={(e) =>
                                setDonationDetails({
                                  ...donationDetails,
                                  location: e.target.value,
                                })
                              }
                            />
                            <label>Collected Amount</label>
                            <input
                              className="form-control mb-2"
                              value={donationDetails.collectedAmount}
                              onChange={(e) =>
                                setDonationDetails({
                                  ...donationDetails,
                                  collectedAmount: e.target.value,
                                })
                              }
                            />
                            <label>City</label>
                            <input
                              className="form-control mb-2"
                              value={donationDetails.city}
                              onChange={(e) =>
                                setDonationDetails({
                                  ...donationDetails,
                                  city: e.target.value,
                                })
                              }
                            />
                            <div className="d-flex mt-3 align-items-center justify-content-end ">
                              <button
                                onClick={() => setOpenUpdate(false)}
                                className="btn-secondary mr-2"
                              >
                                Cancel
                              </button>
                              {updateLoading ? (
                                <div style={{ display: "inline" }}>
                                  <Loader size={30} />
                                </div>
                              ) : (
                                <button
                                  onClick={(e) => handleUpdateDonation(e)}
                                >
                                  Update
                                </button>
                              )}
                            </div>
                          </CustomModal>
                          <DeleteModal
                            open={openDelete}
                            setOpen={setopenDelete}
                          >
                            <h5
                              className="mb-4"
                              style={{ textAlign: "center" }}
                            >
                              Are you sure want to delete ?
                            </h5>
                            <div className="d-flex mt-3 align-items-center justify-content-end ">
                              <button
                                onClick={() => setopenDelete(false)}
                                className="btn-secondary btn-sm mr-2"
                              >
                                Cancel
                              </button>
                              {deleteLoading ? (
                                <div style={{ display: "inline" }}>
                                  <Loader size={30} />
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleDelete()}
                                  className="btn btn-sm btn-primary"
                                >
                                  Confirm
                                </button>
                              )}
                            </div>
                          </DeleteModal>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <CustomModal open={openDonation} setOpen={setOpenDonation}>
        <form onSubmit={handleDonation}>
          <section className="">
            <div className="row">
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="donationAmount">
                    Donation Amount
                    <span style={{ fontSize: 12 }}> (RS)</span>
                    <span style={{ color: "red" }}> *</span>
                  </label>
                  <input
                    type="number"
                    id="donationAmount"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="receipt">
                    Recipet Photo
                    <span style={{ color: "red" }}> *</span>
                  </label>
                  <input
                    type="file"
                    id="receipt"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row" id="cap">
              <div className="col-12" style={{ padding: "0px 1.5rem" }}>
                {amountLoading ? (
                  <div className="float-right mt-2">
                    <Loader size={20} />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-sm btn-success float-right"
                  >
                    Donate
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpenDonation(false)}
                  className="btn btn-sm btn-secondary float-right mr-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </section>
        </form>
      </CustomModal>
      <CustomModal open={openMark} setOpen={setOpenMark}>
        <form onSubmit={handleMark}>
          <section className="">
            <div className="row">
              <div className="card-body">
                <div className="form-group" style={{ textAlign: "center" }}>
                  <label htmlFor="donationAmount">
                    Are You sure want to Mark Done ?
                  </label>
                </div>
              </div>
            </div>
            <div className="row" id="cap">
              <div className="col-12" style={{ padding: "0px 1.5rem" }}>
                {updateLoading ? (
                  <div className="float-right mt-2">
                    <Loader size={20} />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-sm btn-success float-right"
                  >
                    Confirm
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpenMark(false)}
                  className="btn btn-sm btn-secondary float-right mr-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </section>
        </form>
      </CustomModal>
      <Footer />
    </div>
  );
}

export default Donations;
