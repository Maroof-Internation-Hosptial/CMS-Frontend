import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/verifyotp.css";
import {
  useVerifyForgotOTPMutation,
  useVerifyOTPMutation,
} from "../../api/api";
import { toast } from "sonner";
import { MDBSpinner } from "mdb-react-ui-kit";
import OtpInput from "react-otp-input";

const VerifyOTP = () => {
  const { state } = useLocation();
  const [verify, response] = useVerifyOTPMutation();
  const [verifyForgot, forgotResp] = useVerifyForgotOTPMutation();

  const [otp, setOtp] = useState("");

  function handleVerify() {
    if (state.module === "register") {
      verify({ verification_code: otp, _id: state.id });
    } else {
      verifyForgot({ resetCode: otp, _id: state.id });
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (response?.isSuccess && response?.data?.message) {
      toast.success("Verification Success");
      if (state?.module === "register") {
        toast.success("Verification Success");
        navigate("/");
      } else {
        navigate("/reset-password", {
          state: { id: state.id },
        });
      }
    }
  }, [response?.isSuccess]);

  useEffect(() => {
    if (response?.isError) {
      toast.error(response?.error?.data?.error);
    }
  }, [response?.isError]);

  useEffect(() => {
    if (forgotResp?.isSuccess && forgotResp?.data?.message) {
      if (state?.module === "register") {
        toast.success("Verification Success");
        navigate("/");
      } else {
        navigate("/reset-password", {
          state: { id: state.id },
        });
      }
    }
  }, [forgotResp?.isSuccess]);

  useEffect(() => {
    if (forgotResp?.isError) {
      toast.error(forgotResp?.error?.data?.error);
    }
  }, [forgotResp?.isError]);

  return (
    <div className="hold-transition register-page  ">
      <div style={{ width: 500 }}>
        <div className="card card-outline card-primary">
          <div className="login-logo">
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
              <h3
                className="font-weight-bold text-dark mt-4 text-center"
                style={{ fontSize: 25 }}
              >
                Verify your email
              </h3>
              <p className="mt-4 mb-1 text-center">
                Please check your email for verification code sent to{" "}
                <span style={{ color: "blue" }}>{state?.email}</span>
              </p>
              <p className="mt-2 mb-1 text-center">
                have a look in your spam folder too.
              </p>
              <p className="text-center mt-3">Enter Code:</p>
              <div className=" d-flex justify-content-center align-items-center">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  inputType="tel"
                  renderInput={(props) => (
                    <input
                      {...props}
                      style={{
                        width: 45,
                        height: 45,
                        textAlign: "center",
                        marginRight: 20,
                        marginTop: 6,
                      }}
                    />
                  )}
                />
              </div>

              {response.isLoading || forgotResp.isLoading ? (
                <div className=" d-flex justify-content-center align-items-center">
                  <MDBSpinner
                    color="primary"
                    style={{ marginLeft: 10, marginTop: 3 }}
                  />
                </div>
              ) : (
                <button
                  style={{ marginTop: 30 }}
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={handleVerify}
                >
                  Verify
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
