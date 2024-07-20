import { useRef, useState } from "react";
import CTAButton from "../components/CTAButton";
import * as yup from "yup";
import { string, object } from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import api from "../features/api";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedRole, setRole] = useState(null);
  const loginForm = useRef(null);

  const loginSchema = object({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters"),
    email: string().required("Email is required").email("Invalid Email"),
  });

  const otpSchema = object({
    otp: yup
      .number()
      .transform((value, originalValue) => {
        return originalValue === "" ? undefined : value;
      })
      .required("OTP is required.")
      .typeError("OTP must be a number.")
      .test(
        "len",
        "OTP should be 6 digits.",
        (val) => val.toString().length === 6
      ),
  });

  async function handleLogin(event) {
    try {
      event.preventDefault();
      const form = loginForm.current;
      const emailValue = form["email"].value;
      setEmail(emailValue);
      const password = form["password"].value;
      const roleInput = form.querySelector('input[name="role"]:checked');
      if (!roleInput) {
        toast.error("Please select a role!");
        return;
      }
      const role = roleInput.value;
      await loginSchema.validate({ email: emailValue, password });
      setRole(role);
      const payload = { email: emailValue, password, role: role };

      setIsLoading(true);
      const response = await api.post(`/auth/login`, payload);

      if (response && response.data) {
        toast.success(response.data.message);
        setIsOtpSent(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    }
  }

  async function handleOtpVerification(event) {
    try {
      event.preventDefault();
      const form = loginForm.current;
      const otp = form["otp"].value;
      await otpSchema.validate({ otp });
      setIsLoading(true);
      const response = await api.post("/auth/verify-otp", {
        email,
        otp,
        role: selectedRole,
      });
  
      if (response && response.data) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.user));
        setIsLoading(false);
        setTimeout(() => {
          navigate(
            "/redirect",
            {replace: true}
          );
        }, 700);
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    }
  }
  

  return (
    <div className="py-32 px-4 min-h-screen dark:bg-slate-800 dark:text-white">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <section className="flex flex-col justify-center items-center">
        <form ref={loginForm} className="w-full flex flex-col max-w-xl">
          {!isOtpSent ? (
            <>
              <label htmlFor="role">Role</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="user"
                  name="role"
                  value="user"
                  className="mr-2"
                  required
                />
                <label htmlFor="user">User</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="healthcareprovider"
                  name="role"
                  value="healthcareprovider"
                  className="mr-2"
                  required
                />
                <label htmlFor="healthcareprovider">Health care provider</label>
              </div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="p-2 mt-2 mb-4 border border-violet-600 text-black"
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="p-2 mt-2 mb-4 border border-violet-600 text-black"
                required
              />
              {isLoading ? (
                <button
                  type="button"
                  className="w-full bg-purple-700 text-white h-10 rounded-sm px-4 hover:bg-purple-500 hover:text-black hover:font-bold flex items-center justify-center my-4"
                  disabled
                >
                  <CircularProgress
                    size={20}
                    color="inherit"
                    sx={{ marginRight: 5 }}
                  />
                </button>
              ) : (
                <CTAButton type="submit" action={handleLogin} text="Login" />
              )}
            </>
          ) : (
            <>
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="number"
                id="otp"
                className="p-2 mt-2 mb-4 border border-violet-600 text-black"
                required
              />
              {isLoading ? (
                <button
                  type="button"
                  className="w-full bg-purple-700 text-white h-10 rounded-sm px-4 hover:bg-purple-500 hover:text-black hover:font-bold flex items-center justify-center my-4"
                  disabled
                >
                  <CircularProgress
                    size={20}
                    color="inherit"
                    sx={{ marginRight: 5 }}
                  />
                </button>
              ) : (
                <CTAButton
                  type="submit"
                  action={handleOtpVerification}
                  text="Verify OTP"
                />
              )}
            </>
          )}
        </form>
        <span>
          Don&apos;t have an account?{" "}
          <Link
            className="font-semibold dark:text-purple-400 text-purple-800 hover:underline"
            to={"/signup"}
          >
            Sign up
          </Link>
        </span>
      </section>
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
      />
    </div>
  );
}

export default Login;
