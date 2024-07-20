import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, Fragment, useRef } from "react";
import * as yup from "yup";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { StepLabel } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";

const steps = ["Personal Info", "Contact & Address", "Professional Info"];

function HcpSignupForm() {
  const navigate = useNavigate();
  const SignupForm = useRef(null);
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    cpassword: "",
    contactnumber: "",
    address: "",
    state: "",
    district: "",
    postalCode: "",
    specialization: "",
    medicalLicenseNumber: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const SignupSchemaone = yup.object({
    cpassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), null], "Passwords do not match"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters")
      .matches(passwordRules, { message: "Please create a stronger password" }),
    email: yup.string().required("Email is required").email("Invalid Email"),
    gender: yup
      .string()
      .oneOf(["male", "female", "other"], "Please select a gender")
      .required("Gender is required"),
    dob: yup
      .string()
      .required("Date of birth is required")
      .test("min", "Date of birth must be after 01-01-1900", function (value) {
        const date = new Date(value);
        return date >= new Date("1900-01-01");
      })
      .test("max", "Date of birth must be before today", function (value) {
        const date = new Date(value);
        return date <= new Date();
      }),
    fullname: yup.string().required("Full Name is required"),
  });

  const SignupSchematwo = yup.object({
    postalCode: yup
      .string()
      .required("Postal Code is required")
      .test("isNumber", "Postal Code must be a number", function (value) {
        return /^\d+$/.test(value);
      })
      .length(6, "Postal Code must be 6 digits"),
    district: yup.string().required("District is required"),
    state: yup.string().required("State is required"),
    address: yup.string().notRequired(),
    contactnumber: yup
      .string()
      .required("Contact number is required")
      .test("isNumber", "Contact number must be a number", function (value) {
        return /^\d+$/.test(value.replace("+", ""));
      })
      .min(10, "Contact number must be at least 10 digits")
      .max(14, "Contact number must be at most 14 digits"),
  });

  const SignupSchemathree = yup.object({
    specialization: yup.string().required("Specialization is required"),
    medicalLicenseNumber: yup
      .string()
      .required("Medical License Number is required"),
  });

  async function handleSignup(event) {
    try {
      event.preventDefault();
      const payload = {
        fullname: formData.fullname,
        dob: formData.dob,
        gender: formData.gender,
        email: formData.email,
        password: formData.password,
        contactnumber: formData.contactnumber,
        specialization: formData.specialization,
        medicalLicenseNumber: formData.medicalLicenseNumber,
        workaddress: {
          address: formData.address,
          state: formData.state,
          district: formData.district,
          postalCode: formData.postalCode,
        },
      };
      console.log(payload);
      const response = await axios
        .post("http://localhost:4500/auth/signup/hcp", payload)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          const errorMessage = err.response?.data?.message;
          console.error(errorMessage);
          toast.error(errorMessage);
        });
      if (response) {
        toast.success(response.message);
        toast.done("Redirecting to Login");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    try {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      if (activeStep === 0) {
        const validationResult = await SignupSchemaone.validate(formData);
        if (!validationResult.error) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSkipped(newSkipped);
        } else {
          throw new Error(validationResult.error.message);
        }
      } else if (activeStep === 1) {
        const validationResult = await SignupSchematwo.validate(formData);
        if (!validationResult.error) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSkipped(newSkipped);
        } else {
          throw new Error(validationResult.error.message);
        }
      } else if (activeStep === 2) {
        const validationResult = await SignupSchemathree.validate(formData);
        if (!validationResult.error) {
          await handleSignup(event);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSkipped(newSkipped);
        } else {
          throw new Error(validationResult.error.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      fullname: "",
      dob: "",
      gender: "",
      email: "",
      password: "",
      cpassword: "",
      contactnumber: "",
      address: "",
      state: "",
      district: "",
      postalCode: "",
      specialization: "",
      medicalLicenseNumber: "",
    });
  };

  return (
    <>
      <Helmet>
        <title>Healthcare Provider Signup</title>
      </Helmet>
      <form ref={SignupForm}>
        <Box sx={{ width: "100%" }} className="flex flex-col gap-4">
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </Fragment>
          ) : (
            <Fragment>
              {activeStep === 0 && (
                <div className="w-full flex flex-col flex-grow grow-1">
                  <label htmlFor="fullname">Full Name *</label>
                  <input
                    type="text"
                    id="fullname"
                    className={"p-2 my-2 border border-violet-600"}
                    required
                    value={formData.fullname}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="dob">Date Of Birth *</label>
                  <input
                    type="date"
                    id="dob"
                    className={"p-2 my-2 border border-violet-600"}
                    required
                    value={formData.dob}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="gender">Gender *</label>
                  <select
                    id="gender"
                    className={"p-2 my-2 border border-violet-600"}
                    required
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    className={"p-2 my-2 border border-violet-600"}
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="password">
                    Password *{" "}
                    <span>
                      <VisibilityIcon onClick={togglePasswordVisibility} />
                    </span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className={"p-2 my-2 border border-violet-600"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="cpassword">Confirm Password *</label>
                  <input
                    type="password"
                    id="cpassword"
                    className={"p-2 my-2 border border-violet-600"}
                    required
                    value={formData.cpassword}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              {activeStep === 1 && (
                <div className="w-full flex flex-col flex-grow grow-1">
                  <label htmlFor="contactnumber">Contact Number *</label>
                  <input
                    type="text"
                    id="contactnumber"
                    className={"p-2 my-2 border border-violet-600"}
                    required
                    value={formData.contactnumber}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="address">Work Address</label>
                  <textarea
                    id="address"
                    className={"p-2 my-2 border border-violet-600"}
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    className={"p-2 my-2 border border-violet-600"}
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="district">District *</label>
                  <input
                    type="text"
                    id="district"
                    className={"p-2 my-2 border border-violet-600"}
                    required
                    value={formData.district}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="postalCode">Postal Code *</label>
                  <input
                    type="text"
                    id="postalCode"
                    className={"p-2 my-2 border border-violet-600"}
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              {activeStep === 2 && (
                <div className="w-full flex flex-col flex-grow grow-1">
                  <label htmlFor="specialization">Specialization *</label>
                  <input
                    type="text"
                    id="specialization"
                    className={"p-2 my-2 border border-violet-600"}
                    required
                    value={formData.specialization}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="medicalLicenseNumber">
                    Medical License Number *
                  </label>
                  <input
                    type="text"
                    id="medicalLicenseNumber"
                    className={"p-2 my-2 border border-violet-600"}
                    required
                    value={formData.medicalLicenseNumber}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            </Fragment>
          )}
        </Box>
      </form>
      <span>
        Already have an account?{" "}
        <Link
          className="font-semibold text-purple-900 hover:underline"
          to={"/login"}
        >
          Login
        </Link>
      </span>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Flip
      />
    </>
  );
}

export default HcpSignupForm;
