import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../features/api";
import dayjs from "dayjs";
import { toast , ToastContainer } from "react-toastify";
import accountcircle from "../assets/img/accountcircle2.jpg"

function Appointment() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch doctors
    api
      .get("/hcps")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        toast.error(error.message)
        console.error(error);
      });

    // Fetch user's appointments
    if (user) {
      api
        .get(`/appointment/user/${user._id}`)
        .then((response) => {
          setAppointments(response.data);
        })
        .catch((error) => {
          toast.error(error.message)
          console.error(error);
        });
    }
  }, [user]);

  const hasAppointmentWithDoctorOnDate = (doctorId, date) => {
    return appointments.some(
      (app) =>
        app.doctor &&
        app.doctor._id === doctorId &&
        new Date(app.appointmentDate).toDateString() ===
          new Date(date).toDateString()
    );
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const response = await api.delete(`/appointment/${appointmentId}`);
      if (response.status === 200) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((app) => app._id !== appointmentId)
        );
      }
      toast.success("Appointment Deleted Successfully")
    } catch (error) {
      toast.error("Failed to delete appointment")
      console.error("Failed to delete appointment:", error);
    }
  };

  const handleEditAppointment = (appointment) => {
    navigate(
      `/user-dashboard/appointments/book?doctorId=${appointment.doctor._id}`,
      {
        state: { appointment },
      }
    );
  };

  return (
    <div className="bg-white min-h-screen text-gray-800 dark:bg-slate-950 dark:text-white bg-cover bg-center bg-no-repeat">
      <header className="pt-24">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold">
            Book Appointment with Healthcare Providers
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-slate-200 p-4 rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 backdrop-filter backdrop-blur-lg bg-opacity-20 hover:bg-opacity-30"
            >
              <div className="rounded-full h-20 w-20 bg-gray-300 mb-2 flex items-center justify-center">
                <img
                  src={accountcircle}
                  alt={doctor.fullname}
                  className="rounded-full object-cover h-full w-full transition-opacity duration-300 opacity-100 hover:opacity-100"
                />
              </div>
              <h2 className="text-lg font-semibold">{doctor.fullname}</h2>
              <p className="text-sm">{doctor.specialization}</p>
              <p className="text-sm">{doctor.workaddress.address}</p>
              <Link
                to={`/user-dashboard/appointments/book?doctorId=${doctor._id}`}
                state={{
                  canBook: !hasAppointmentWithDoctorOnDate(
                    doctor._id,
                    new Date()
                  ),
                }}
              >
                <button
                  className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
                  disabled={hasAppointmentWithDoctorOnDate(
                    doctor._id,
                    new Date()
                  )}
                >
                  {hasAppointmentWithDoctorOnDate(doctor._id, new Date())
                    ? "Already Booked"
                    : "Book Appointment"}
                </button>
              </Link>
            </div>
          ))}
        </div>
        <section className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
          {appointments.length === 0 ? (
            <p>No Appointments yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {appointments.map((appointment, index) => (
                <div
                  key={index}
                  className="dark:bg-gradient-to-b from-slate-500 to-slate-900 backdrop-filter backdrop-blur-md p-4 rounded-lg shadow-lg"
                >
                  {appointment.doctor && (
                    <>
                      <h3 className="text-lg font-semibold">
                        {appointment.doctor.fullname}
                      </h3>
                      <p className="text-sm">
                        {appointment.doctor.specialization}
                      </p>
                    </>
                  )}
                  <p className="text-sm">
                    Date:{" "}
                    {dayjs(appointment.appointmentDate, "DDMMYYYY").format(
                      "DD/MM/YYYY"
                    )}
                  </p>
                  <p className="text-sm">Time: {appointment.appointmentTime}</p>
                  <p className="text-sm">Status: {appointment.status}</p>
                  {
                    <div className="flex space-x-2 mt-2">
                      {appointment.status === "pending" && (
                        <button
                          onClick={() => handleEditAppointment(appointment)}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
                        >
                          Edit
                        </button>
                      )}
                      {appointment.status != "accepted" && (
                        <button
                          onClick={() =>
                            handleDeleteAppointment(appointment._id)
                          }
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  }
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
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

export default Appointment;
