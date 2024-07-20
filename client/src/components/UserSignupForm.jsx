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

const steps = ["Personal Info", "Contact & Address"];

function UserSignupForm() {
  const navigate = useNavigate();
  const SignupForm = useRef(null);
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    dob: "",
    gender: "",
    bloodgroup: "",
    email: "",
    password: "",
    cpassword: "",
    contactnumber: "",
    address: "",
    state: "",
    district: "",
    pincode: "",
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
    bloodgroup: yup
      .string()
      .required("Blood group is required")
      .oneOf(
        ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        "Please select a Blood Group"
      ),
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
    pincode: yup
      .string()
      .required("Pincode is required")
      .test("isNumber", "Pincode must be a number", function (value) {
        return /^\d+$/.test(value);
      })
      .length(6, "Pincode must be 6 digits"),
    district: yup.string().required("District is required"),
    state: yup.string().required("State is required"),
    address: yup.string(),
    contactnumber: yup
      .string()
      .required("Contact number is required")
      .test("isNumber", "Contact number must be a number", function (value) {
        return /^\d+$/.test(value.replace("+", ""));
      })
      .min(10, "Contact number must be at least 10 digits")
      .max(14, "Contact number must be at most 14 digits"),
  });

  async function handleSignup(event) {
    try {
      event.preventDefault();
      const payload = {
        fullname: formData.fullname,
        dob: formData.dob,
        gender: formData.gender,
        bloodgroup: formData.bloodgroup,
        email: formData.email,
        password: formData.password,
        contactnumber: formData.contactnumber,
        address: {
          residentialaddress: formData.address,
          state: formData.state,
          district: formData.district,
          pincode: formData.pincode,
        },
      };

      const response = await axios
        .post("http://localhost:4500/auth/signup", payload)
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
      toast.error(err);
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step == null;
  };

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
      if (activeStep === steps.length - 1) {
        const form = SignupForm.current;
        const contactnumber = form["contactnumber"].value;
        const address = form["address"].value;
        const state = form["state"].value;
        const district = form["district"].value;
        const pincode = form["pincode"].value;
        const validationResult = await SignupSchematwo.validate({
          contactnumber,
          address,
          state,
          district,
          pincode,
        });
        if (!validationResult.error) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSkipped(newSkipped);
          await handleSignup(event);
        } else {
          throw new Error(validationResult.error.message, {
            key: validationResult.error.id,
          }); // Re-throw error for toast
        }
      } else {
        const form = SignupForm.current;
        const fullname = form["fullname"].value;
        const dob = form["dob"].value;
        const gender = form["gender"].value;
        const bloodgroup = form["bloodgroup"].value;
        const email = form["email"].value;
        const password = form["password"].value;
        const cpassword = form["cpassword"].value;

        const validationResult = await SignupSchemaone.validate({
          fullname,
          dob,
          gender,
          bloodgroup,
          email,
          password,
          cpassword,
        });
        if (!validationResult.error) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSkipped(newSkipped);
        } else {
          throw new Error(validationResult.error.message, {
            key: validationResult.error.id,
          }); // Re-throw error for toast
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

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      fullname: "",
      dob: "",
      gender: "",
      bloodgroup: "",
      email: "",
      password: "",
      cpassword: "",
      contactnumber: "",
      address: "",
      state: "",
      district: "",
      pincode: "",
    });
  };

  return (
    <>
      <Helmet>
        <title>Signup</title>
      </Helmet>
      <form ref={SignupForm}>
        <Box sx={{ width: "100%" }} className="flex flex-col gap-4">
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
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
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleBack}>Back</Button>
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
                  <label htmlFor="bloodgroup">Blood Group *</label>
                  <select
                    id="bloodgroup"
                    className={"p-2 my-2 border border-violet-600"}
                    required
                    value={formData.bloodgroup}
                    onChange={handleInputChange}
                  >
                    <option>Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
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
                  {/* <i
                    className={`cursor-pointer ${
                      showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                    }`}
                    onClick={togglePasswordVisibility}
                  >
                  </i> */}
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
                  <label htmlFor="address">Address</label>
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
                  <label htmlFor="pincode">Pincode *</label>
                  <input
                    type="text"
                    id="pincode"
                    className={"p-2 my-2 border border-violet-600"}
                    required
                    value={formData.pincode}
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
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}

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

export default UserSignupForm;
