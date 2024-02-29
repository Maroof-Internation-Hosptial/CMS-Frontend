import React, { useState } from "react";
import Footer from "../common/footer";
import Navbar from "../common/navbar";
import { Link } from "react-router-dom";
import NotAuth from "./notauth";
import MemberForm from "../MemberForm";
import { useSelector } from "react-redux";

const MemberManagement = () => {
  const permissions = useSelector((state) => state.authReducer.permissions);
  return (
    <div className="wrapper">
      <Navbar />
      {/* <Sidenav /> */}

      <div style={{ padding: "0 20px" }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                {/* {permissions.includes("create") ? <h1>Add User</h1> : null} */}
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item ">Add User</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        {/* Main content */}
        <MemberForm />
        {/* /.content */}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <div style={{ flexGrow: 1 }}>{/* Your main content here */}</div>
        <Footer
          style={{
            flexShrink: 0,
            position: "fixed",
            left: 0,
            bottom: 0,
            width: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default MemberManagement;
