import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { validateResetPassword } from "../../utils/validations";
import { useState } from "react";
import { useUserUpdateMutation } from "../../api/api";
import { toast } from "sonner";
import { MDBSpinner } from "mdb-react-ui-kit";

const ResetPassword = () => {
  const { state } = useLocation();
  const [password, setPassword] = useState("");
  const [updateUser, updateResp] = useUserUpdateMutation();

  const navigate = useNavigate();

  function handleReset(e) {
    e.preventDefault();

    const newErrors = validateResetPassword(password);

    const submitForm = () => {
      updateUser({ id: state.id, data: { password: password } })
        .then((res) => {
          if (res.error) {
            toast.error(res.error.data.error, {
              style: {
                textTransform: "capitalize",
              },
            });
          } else if (res.data.message) {
            toast.success("Password Updated Successfuly");
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    };

    setTimeout(() => {
      if (Object.values(newErrors).every((error) => !error)) {
        submitForm();
      } else {
        if (newErrors.password) {
          toast.error(newErrors.password);
        }
      }
    }, 0);
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
              <p className="login-box-msg" style={{ fontSize: 20 }}>
                Reset Password
              </p>
              <form action="recover-password.html" method="post">
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    {updateResp.isLoading ? (
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
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
