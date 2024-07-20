import Family from "../assets/img/Family.png";
import Immun from "../assets/img/Immunity.png";
import Medicine from "../assets/img/Medicine.png";
import Heart from "../assets/img/Heart.png";
import sugar from "../assets/img/sugar.png";
import bp from "../assets/img/bp.png";
import chol from "../assets/img/cholestrol.png";
import rate from "../assets/img/hrate.png";
//import Hosp from "../assets/img/medid.png";
import book from "../assets/img/Booking.svg";
import Info from "../assets/img/INFO.svg";
import Med from "../assets/img//Person.svg";
import EastIcon from "@mui/icons-material/East";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UserHome() {
  const user = useSelector((state) => state.auth.user);
  const birthYear = parseInt(user.dob.toString().slice(0, 4));
  const age = new Date().getFullYear() - birthYear;
  return (
    <>
      <section className="mx-auto px-6 lg:px-12 py-6 lg:py-12 flex flex-col w-full justify-center items-center">
        <div className="mt-20 w-full h-48 mb-10 flex flex-row justify-center items-center rounded-2xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] dark:shadow-[rgba(127,127,127,0.5)]">
          <div className="flex flex-col text-center gap-5">
            <h1 className="font-bold text-4xl from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
              Welcome {user.fullname}
            </h1>
            <p className="text-lg">
              {new Date().toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          {/* <img src={Hosp} alt="Welcome" className="w-48 h-36" /> */}
        </div>
        <div>
          <div className="flex flex-row justify-center gap-5">
            <div className="px-10 max-w-xl bg-gradient-to-b from-blue-100 via-purple-300 to-blue-200 rounded-lg dark:bg-blue-100 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
              <div className="flex justify-center px-3">
                <h4 className="mt-8 text-lg font-bold text-violet-900">
                  Personl Info
                </h4>
              </div>
              <div className="flex flex-row py-8 ml-5">
                <div className="flex flex-col gap-5">
                  <div>
                    <h6 className="flex item-center text-base text-gray-500">
                      Personal Info
                    </h6>
                    <p className="text-lg text-slate-900 font-semibold">
                      {user.gender} , {age}
                    </p>
                  </div>
                  <div>
                    <h6 className="flex item-center text-base text-gray-500">
                      Birthdate
                    </h6>
                    <p className="text-lg text-slate-900 font-semibold">
                      {user.dob.toString().slice(0, 10)}
                    </p>
                  </div>
                  <div>
                    <h6 className="flex item-center text-base text-gray-500">
                      Blood Type
                    </h6>
                    <p className="text-lg text-slate-900 font-semibold">
                      {user.bloodgroup}
                    </p>
                  </div>
                  <div>
                    <h6 className="flex item-center text-base text-gray-500">
                      {" "}
                      Location
                    </h6>
                    <p className="text-lg text-slate-900 font-semibold">
                      {user.address.residentialaddress}
                    </p>
                  </div>
                </div>
                <img src={Info} alt="Booking Icon" className="w-64 h-64" />
              </div>
            </div>

            <div className="px-10 max-w-xl bg-gradient-to-b from-blue-100 via-purple-300 to-blue-200 rounded-lg shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
              <div className="flex justify-center px-3 ">
                <h4 className="mt-8 text-lg font-bold text-violet-900">
                  Medical Record
                </h4>
              </div>
              <div className="flex flex-row py-8 ml-5">
                <img
                  src={Med}
                  alt="Medical Record Icon"
                  className="w-56 h-56"
                />
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <img
                      src={Heart}
                      alt="Medical Conditions Icon"
                      className="h-7 w-7 flex justify-center"
                    />
                    <h6 className="item-center text-base text-gray-500">
                      Condition
                    </h6>
                    <p className="font-semibold">0 Conditions</p>
                  </div>
                  <div>
                    <img
                      src={Medicine}
                      alt="Medications Icon"
                      className="h-7 w-7 flex justify-center"
                    />
                    <h6 className="item-center text-base text-gray-500">
                      Medication
                    </h6>
                    <p className="font-semibold">0 Medications</p>
                  </div>
                  <div>
                    <img
                      src={Immun}
                      alt="Immunizations Icon"
                      className="h-7 w-7 flex justify-center"
                    />
                    <h6 className="item-center text-base text-gray-500">
                      Immunization
                    </h6>
                    <p className="font-semibold">0 Immunization</p>
                  </div>
                  <div>
                    <img
                      src={Family}
                      alt="Family History Icon"
                      className="h-7 w-7 flex justify-center"
                    />
                    <h6 className="item-center text-base text-gray-500">
                      Family History
                    </h6>
                    <p className="font-semibold">0 Family history</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center gap-24 my-14 ">
          <div className="border border-pink-700 rounded-2xl w-52 h-48 py-6 transition ease-out delay-15 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300 hover:text-black">
            <img src={sugar} alt="" className="w-12 h-12 mr-auto ml-auto" />
            <h6 className="text-lg mt-3 text-slate-600 font-semibold flex justify-center">
              Sugar Level{" "}
            </h6>
            <span className="flex justify-center text-xs font-medium text-gray-400 mb-3">
              Recent visit
            </span>
            <p className="font-bold flex justify-center items-center">
              70{" "}
              <span className="text-sm font-medium text-gray-400 ml-2">
                mg/dL
              </span>{" "}
            </p>
          </div>
          <div className="border border-pink-700 rounded-2xl w-52 h-48 py-6 transition ease-out delay-15 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300 hover:text-black">
            <img src={bp} alt="" className="w-12 h-12 mr-auto ml-auto" />
            <h6 className="mt-3 text-lg font-semibold text-slate-600 flex justify-center">
              BP Level
            </h6>
            <span className="flex justify-center text-xs font-medium text-gray-400 mb-3">
              Recent visit
            </span>
            <p className="font-bold flex justify-center items-center">
              100/20{" "}
              <span className="text-sm font-medium text-gray-400 ml-2">
                mm/hg
              </span>{" "}
            </p>
          </div>
          <div className="border border-pink-700 rounded-2xl w-52 h-48 py-6 transition ease-out delay-15 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300 hover:text-black">
            <img src={chol} alt="" className="w-12 h-12 mr-auto ml-auto" />
            <h6 className="text-lg mt-3 font-semibold text-slate-600 flex justify-center">
              Cholestrol
            </h6>
            <span className="flex justify-center text-xs font-medium text-gray-400 mb-3">
              Recent visit
            </span>
            <p className="font-bold flex justify-center items-center">
              200{" "}
              <span className="text-sm font-medium text-gray-400 ml-2">
                mg/dL
              </span>{" "}
            </p>
          </div>
          <div className="border border-pink-700 rounded-2xl w-52 h-48 py-6 transition ease-out delay-15 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300 hover:text-black">
            <img src={rate} alt="" className="w-12 h-12 mr-auto ml-auto" />
            <h6 className="text-lg mt-3 font-semibold text-slate-600 flex justify-center">
              Pulse
            </h6>
            <span className="flex justify-center text-xs font-medium text-gray-400 mb-3">
              Recent visit
            </span>
            <p className="font-bold flex justify-center items-center">
              80{" "}
              <span className="text-sm font-medium text-gray-400 ml-2">
                bpm
              </span>{" "}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-center my-4 w-full">
          <div className="flex flex-col px-5 items-center  rounded-2xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] dark:shadow-[rgba(127,127,127,0.5)] py-10">
            <img src={book} alt="Booking Icon" className=" rounded-lg" />
            <h3 className="flex justify-center font-bold text-xl pt-5 text-violet-900">
              Get your Online Appointment
            </h3>
            <p className="flex flex-wrap px-8 font-base mt-2 mb-5">
              Quick and convenient way to book our top specialist doctors
            </p>
            <Link to={"/user-dashboard/appointments"}>
              <button className="flex flex-row gap-2 w-60 text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-semibold rounded-full text-base px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                Book an Appointment
                <EastIcon />
              </button>
            </Link>
          </div>
          {/* <div
            className="max-w-xl border rounded-2xl pr-10 pb-6 overflow-y-scroll shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
            style={{ maxHeight: "28.75rem" }}
          >
            <div className="flex justify-center px-3 mb-5">
              <h4 className="mt-8 text-lg font-bold text-violet-900">
                Recent Activity
              </h4>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}

export default UserHome;
