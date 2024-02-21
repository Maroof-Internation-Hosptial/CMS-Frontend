import React from "react";
import Navbar from "../common/navbar";
import moment from "moment";
import Footer from "../common/footer";
import "../css/style.css";
import { useGetContactsQuery } from "../../api/api";

const Contacts = () => {
  const { data, isLoading } = useGetContactsQuery();
  return (
    <div className="wrapper">
      <Navbar />
      <div
        style={{
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 10,
          minHeight: "83vh",
        }}
      >
        {data && data.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <h4>No Contacts</h4>
          </div>
        )}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {data &&
            data.length > 0 &&
            data.map((contact) => (
              <div key={contact._id} className="col">
                <div className="card">
                  <div className="card-body">
                    <h6 className="">Name : {contact.name}</h6>
                    <h6 className="">Email : {contact.email}</h6>
                    <span style={{ display: "block" }} className="">
                      Message: {contact.message}
                    </span>
                    <span style={{ fontSize: 12 }}>
                      {moment(contact.createdAt).fromNow()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contacts;
