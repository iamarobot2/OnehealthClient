import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";
import UserSignupForm from "../components/UserSignupForm";
import HcpSignupForm from "../components/HcpSignupForm";
import { Helmet } from "react-helmet";

function Signup() {
  const [role, setRole] = useState(null);
  return (
    <>
      <Helmet>
        <title>Signup</title>
      </Helmet>
      <section className="shadow-md shadow-slate-300 dark:shadow-white dark:bg-slate-800 w-full h-full lg:h-full mx-auto px-6 lg:px-12 py-6 lg:py-12 flex flex-col dark:text-white text-lg">
        <div className="dark:bg-slate-700 bg-slate-100 w-full py-12 rounded-2xl mb-6">
          <h2 className="text-center text-xl">Signup with One Health</h2>
        </div>
        <FormControl>
          <FormLabel id="role-select-radio" sx={{ color: "grey" }}>
            I am a
          </FormLabel>
          <RadioGroup
            aria-labelledby="role-select-radio"
            name="role-select-radio"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <FormControlLabel value="user" control={<Radio />} label="User"/>
            <FormControlLabel
              value="healthcareprovider"
              control={<Radio />}
              label="Healthcare Provider"
            />
          </RadioGroup>
        </FormControl>
        <div className="flex flex-col lg:flex-row gap-4 py-6 w-full max-h-full justify-center items-center">
          <div className="lg:w-1/2">
            <img
              src="/assets/signup.svg"
              className="lg:h-auto w-full object-contain"
            />
          </div>
          {role != null && (
            <div className="backdrop-blur-md dark:bg-white/60 dark:text-black bg-slate-100 w-full lg:w-1/2 lg:h-auto py-6 lg:py-12 px-6 lg:px-12 rounded-2xl flex flex-col">
              {
                role==="user"?<UserSignupForm />:role==="healthcareprovider"?<HcpSignupForm />:<h3>Unexpected Error !</h3>
              }
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Signup;
