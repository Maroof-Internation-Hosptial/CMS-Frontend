import Navbar from "../common/navbar";
import Footer from "../common/footer";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useAddDonationMutation } from "../../api/api";
import { toast } from "sonner";
import { donationValidationSchema } from "../../utils/validations";
import axios from "axios";
import { baseURL } from "../../api/api";
import Loader from "../Loader";

const AddDonation = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(donationValidationSchema),
  });

  const [addDonation, { isLoading }] = useAddDonationMutation();

  const [cities, setCities] = useState([]);

  const navigation = useNavigate();
  async function onSubmit(data) {
    addDonation(data).then((res) => {
      if (res.error) {
        toast.error(res.error.data.error);
      } else if (res.data) {
        toast.success("Donation Project Created");
        reset();
        navigation("/donations");
      }
    });
  }

  useEffect(() => {
    async function getCities() {
      try {
        const response = axios.get(`${baseURL}/cities`);
        setCities((await response).data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getCities();
  }, []);

  return (
    <div className="wrapper" style={{ minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "0 20px" }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Create Donation</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item">Donation Add</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <form
          style={{ marginLeft: 15, marginRight: 15 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <section className="content">
            <div className="row" style={{ justifyContent: "center" }}>
              <div className="col-md-6">
                <div className="card card-secondary">
                  <div className="card-header">
                    <h3 className="card-title">Donation Details</h3>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="inputName">
                        Project Name <span style={{ color: "red" }}>*</span>
                      </label>

                      <input
                        type="text"
                        id="inputName"
                        className="form-control"
                        {...register("projectName")}
                      />
                      {errors.projectName && (
                        <p className="validation-error">
                          {errors.projectName?.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="location">
                        Project Location <span style={{ color: "red" }}>*</span>
                      </label>

                      <input
                        type="text"
                        id="location"
                        className="form-control"
                        {...register("location")}
                      />
                      {errors.location && (
                        <p className="validation-error">
                          {errors.location?.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputRequiredCost">
                        Required Cost
                        <span style={{ fontSize: 10 }}> (Rs)</span>
                        <span style={{ color: "red" }}> *</span>
                      </label>
                      <input
                        type="number"
                        id="inputRequiredCost"
                        className="form-control"
                        {...register("requiredCost", {
                          setValueAs: (v) =>
                            v === "" ? undefined : parseInt(v, 10),
                        })}
                      />
                      {errors.requiredCost && (
                        <p className="validation-error">
                          {errors.requiredCost?.message}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label>
                        City <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="city"
                        className="form-control"
                        style={{ width: "100%" }}
                        {...register("city")}
                      >
                        <option value="" selected defaultValue disabled>
                          {" "}
                        </option>
                        {cities.map((city) => (
                          <option key={city._id}>{city.name}</option>
                        ))}
                      </select>
                      {errors.city && (
                        <p className="validation-error">
                          {errors.city?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
            </div>
            <div
              className="row"
              id="cap"
              style={{ justifyContent: "center", marginBottom: 10 }}
            >
              <div className="col-md-6">
                {isLoading ? (
                  <div className="float-right" style={{ marginRight: 10 }}>
                    <Loader size={30} />
                  </div>
                ) : (
                  <button type="submit" className="btn btn-success float-right">
                    Submit
                  </button>
                )}
              </div>
            </div>
          </section>
        </form>
        {/* /.content */}
      </div>

      <div style={{ justifySelf: "flex-end" }}>
        <Footer />
      </div>
    </div>
  );
};

export default AddDonation;
