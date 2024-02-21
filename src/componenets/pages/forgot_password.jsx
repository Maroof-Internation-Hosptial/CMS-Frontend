import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../api/api";
import { toast } from "sonner";
import { MDBSpinner } from "mdb-react-ui-kit";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sendCode, sendResp] = useResetPasswordMutation();

  const navigate = useNavigate();

  function handleForgot(e) {
    e.preventDefault();
    sendCode({ email })
      .then((res) => {
        if (res.error) {
          toast.error(res.error.data.error, {
            style: {
              textTransform: "capitalize",
            },
          });
        } else if (res.data.message) {
          navigate("/verify-otp", {
            state: {
              email,
              id: res?.data?.user?._id,
              module: "forget",
            },
          });
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div class="login-logo">
            <Link to="/" className="h1">
              <img
                src="dist\img\Muawin-Logo.png"
                alt="Logo"
                className="logo-image"
              />
            </Link>
          </div>
          <div className="c-body">
            <div className="card-body">
              <p className="login-box-msg">
                You forgot your password? Here you can easily retrieve a new
                password.
              </p>
              <form onSubmit={handleForgot}>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    {sendResp.isLoading ? (
                      <div className=" d-flex justify-content-center align-items-center">
                        <MDBSpinner
                          color="primary"
                          style={{ marginLeft: 10, marginTop: 3 }}
                        />
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Request new password
                      </button>
                    )}
                  </div>
                </div>
              </form>
              <p className="mt-3 mb-1">
                <Link to="/">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
