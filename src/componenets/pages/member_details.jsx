import React from "react";
import Navbar from "../common/navbar";

import Footer from "../common/footer";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useUpdateEventMutation } from "../../api/api";
import { toast } from "sonner";
import moment from "moment";
import { convertMinutes } from "../../utils";

const MemberDetails = () => {
  const [update, updateResp] = useUpdateEventMutation();

  const { state } = useLocation();
  console.log(state);

  return (
    <div className="wrapper" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "0 20px", flex: "1" }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-12 col-sm-6">
                <h1>Member Details</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item ">Member Details</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                {state?.user?.firstName} {state?.user?.lastName} Detail's
              </h3>
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
            <div className="card-body mx-5">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-6 order-1 order-md-2">
                  <h5 className="text-primary">
                    <i className="fas fa-user" /> Personal Information
                  </h5>
                  <br />
                  <div className="text-muted">
                    <p className="text-left">
                      <b className="text-sm mr-2">Name :</b>
                      <span className="member-text">
                        {state?.user?.firstName} {state?.user?.lastName}
                      </span>
                    </p>

                    <p className="text-left">
                      <b className="text-sm mr-2">Gender :</b>
                      <span className="member-text text-capitalize">
                        {state?.user?.gender}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Contact :</b>
                      <span className="member-text text-capitalize">
                        0{state?.user?.phone}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Email :</b>
                      <span className="member-text">{state?.user?.email}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* /.card-body */}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default MemberDetails;
