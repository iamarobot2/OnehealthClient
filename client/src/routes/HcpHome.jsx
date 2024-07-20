import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../features/api";
import dayjs from "dayjs";
import Info from "../assets/img/INFO.svg";

function HcpHome() {
  const hcp = useSelector((state) => state.auth.user);
  const birthYear = parseInt(hcp.dob.toString().slice(0, 4));
  const age = new Date().getFullYear() - birthYear;
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (hcp) {
      fetchAppointments();
    }
  }, [hcp]);

  const fetchAppointments = async () => {
    try {
      const response = await api.get(`/appointment/doctor/${hcp._id}`);
      setAppointments(response.data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  // Filter appointments to show only today's appointments
  const todayAppointments = appointments.filter(appointment =>
    dayjs(appointment.appointmentDate, "DDMMYYYY").isSame(dayjs(), "day")
  );

  return (
    <>
      <section className="mx-auto px-6 lg:px-12 py-6 lg:py-12 flex flex-col w-full justify-center items-center">
        <div className="mt-20 w-full h-48 mb-10 flex flex-row justify-center items-center rounded-2xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] dark:shadow-[rgba(127,127,127,0.5)]">
          <div className="flex flex-col text-center gap-5">
            <h1 className="font-bold text-4xl from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
              Welcome Dr. {hcp.fullname}
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
        <div className="flex flex-row justify-center gap-5">
          <div className="px-10 backdrop-blur-md rounded-lg bg-gradient-to-b from-blue-100 via-purple-300 to-blue-200  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
            <div className="flex justify-center px-3">
              <h4 className="mt-8 text-lg font-bold text-violet-900">
                Personal Info
              </h4>
            </div>
            <div className="flex flex-row py-8 ml-5">
              <div className="flex flex-col gap-5">
                <div>
                  <h6 className="flex item-center text-base text-gray-500">
                    Personal Info
                  </h6>
                  <p className="text-lg text-slate-900 font-semibold">
                    {hcp.gender} , {age}
                  </p>
                </div>
                <div>
                  <h6 className="flex item-center text-base text-gray-500">
                    Birthdate
                  </h6>
                  <p className="text-lg text-slate-900 font-semibold">
                    {hcp.dob.toString().slice(0, 10)}
                  </p>
                </div>
                <div>
                  <h6 className="flex item-center text-base text-gray-500">
                    {" "}
                    Work Place
                  </h6>
                  <p className="text-lg text-slate-900 font-semibold">
                    {hcp.workaddress.address}
                  </p>
                </div>
              </div>
              <img src={Info} alt="Booking Icon" className="w-64 h-64 mx-12" />
            </div>
          </div>
        </div>

        <div className="mt-12 w-full max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Today&apos;s Appointments</h2>
          {todayAppointments.length === 0 ? (
            <p>No appointments for today.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className=" bg-slate-200 backdrop-filter backdrop-blur-md  p-4 rounded-lg shadow-lg dark:text-black"
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      {appointment.user.fullname}
                    </h3>
                    <p className="text-sm">
                      {dayjs(appointment.appointmentDate, "DDMMYYYY").format("DD/MM/YYYY")}
                    </p>
                    <p className="text-sm">{appointment.appointmentTime}</p>
                    <p className="text-sm">{appointment.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default HcpHome;
