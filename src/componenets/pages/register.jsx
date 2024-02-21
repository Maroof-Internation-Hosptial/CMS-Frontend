import React, { useEffect, useState } from "react";
import "../css/style.css";
import { toast } from "sonner";
import { validateRegistrationForm } from "../../utils/validations";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../api/api";
import { MDBSpinner } from "mdb-react-ui-kit";

const Register = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "member",
    agreeCheck: false,
  });

  const [register, response] = useRegisterMutation();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const checkBoxChange = () => {
    setFormValue({ ...formValue, agreeCheck: !formValue.agreeCheck });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validateRegistrationForm(formValue);
    setErrors(newErrors);

    const submitForm = () => {
      register({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password,
        role: formValue.role,
      });
    };

    setTimeout(() => {
      if (Object.values(newErrors).every((error) => !error)) {
        submitForm();
      } else {
        if (newErrors.name) {
          toast.error(newErrors.name);
        } else if (newErrors.email) {
          toast.error(newErrors.email);
        } else if (newErrors.password) {
          toast.error(newErrors.password);
        } else if (newErrors.confirmPassword) {
          toast.error(newErrors.confirmPassword);
        } else if (newErrors.agreeCheck) {
          toast.error(newErrors.agreeCheck);
        }
      }
    }, 0);
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (
      response?.isSuccess &&
      response?.data?.message === "Verify Your Account"
    ) {
      navigate("/verify-otp", {
        state: {
          email: formValue.email,
          id: response?.data?.user?._id,
          module: "register",
        },
      });
    }
  }, [response?.isSuccess]);

  useEffect(() => {
    if (response?.isError) {
      toast.error(response?.error?.data?.error);
    }
  }, [response?.isError]);

  return (
    <div className="hold-transition register-page">
      <div className="register-box">
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
              <p className="login-box-msg">Register as new member</p>

              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    name="name"
                    id="name"
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                    value={formValue.name}
                    onChange={onChange}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    name="email"
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={formValue.email}
                    onChange={onChange}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    name="password"
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={formValue.password}
                    onChange={onChange}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    value={formValue.confirmPassword}
                    onChange={onChange}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="terms"
                        value={formValue.agreeCheck}
                        onChange={checkBoxChange}
                      />
                      <label htmlFor="agreeTerms">
                        I agree to the <Link to="/terms">terms</Link>
                      </label>
                    </div>
                  </div>
                  <div className="col-4">
                    {response.isLoading ? (
                      <MDBSpinner
                        color="primary"
                        style={{ marginLeft: 10, marginTop: 3 }}
                      />
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Register
                      </button>
                    )}
                  </div>
                </div>
              </form>

              <Link to="/" className="text-center">
                already have an account ?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
