import React from "react";
import Navbar from "../common/navbar";
import Footer from "../common/footer";
import { usePostContactMutation } from "../../api/api";
import { toast } from "sonner";
import Loader from "../Loader";

const Contact = () => {
  const [postContact, { isLoading }] = usePostContactMutation();
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    postContact({ name, email, message })
      .then((res) => {
        if (res.data.message) {
          toast.success("Message has been sent");
          e.target.reset();
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }
  return (
    <div className="wrapper">
      <Navbar />
      <div style={{ padding: 47 }}>
        <div
          className=""
          style={{
            padding: 20,
            border: "1px solid lightgray",
            borderRadius: 10,
          }}
        >
          <div className="row">
            <div className="col-md-3">
              <div className="contact-info">
                <img
                  src="/dist/img/email(1).png"
                  alt="image"
                  width={100}
                  height={100}
                />
                <h2>Contact Us</h2>
                <h5 style={{ padding: 20, paddingLeft: 10 }}>
                  We would love to hear from you !
                </h5>
              </div>
            </div>
            <div className="col-md-9">
              <form onSubmit={handleSubmit}>
                <div className="contact-form">
                  <div className="form-group">
                    <label className="control-label col-sm-2" for="fname">
                      Name:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Name"
                        name="name"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-sm-2" for="email">
                      Email:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter Email"
                        name="email"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="message">
                      Message:
                    </label>
                    <div className="col-sm-10">
                      <textarea
                        className="form-control"
                        rows="5"
                        id="message"
                        name="message"
                        placeholder="Write Something ..."
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                      {isLoading ? (
                        <div style={{ display: "inline" }}>
                          <Loader size={25} />
                        </div>
                      ) : (
                        <button type="submit" className="btn btn-success">
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
