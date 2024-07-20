import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../features/api";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";

function HcpAppointments() {
  const hcp = useSelector((state) => state.auth.user);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

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

  const handleAccept = async (appointmentId) => {
    try {
      await api.put(`/appointment/hcp/${appointmentId}`, {
        status: "accepted",
      });
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status: "accepted" }
            : appointment
        )
      );
      toast.success("Appointment accepted successfully");
    } catch (error) {
      console.error("Failed to accept appointment:", error);
      toast.error("Failed to accept appointment");
    }
  };

  const handleReject = async (appointmentId) => {
    try {
      await api.put(`/appointment/hcp/${appointmentId}`, {
        status: "rejected",
      });
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status: "rejected" }
            : appointment
        )
      );
      toast.success("Appointment rejected successfully");
    } catch (error) {
      console.error("Failed to reject appointment");
      console.error("Failed to reject appointment:", error);
    }
  };

  const handleComplete = async (appointmentId) => {
    try {
      await api.put(`/appointment/hcp/${appointmentId}`, {
        status: "completed",
      });
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status: "completed" }
            : appointment
        )
      );
      toast.success("Appointment completed successfully");
      navigate(`/hcp-dashboard/records/${appointmentId}?appointmentId=${appointmentId}`);
    } catch (error) {
      console.error("Failed to complete appointment");
      console.error("Failed to complete appointment:", error);
    }
  };

  const handleSetPending = async (appointmentId) => {
    try {
      await api.put(`/appointment/hcp/${appointmentId}`, { status: "pending" });
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status: "pending" }
            : appointment
        )
      );
      toast.success("Appointment set as pending successfully");
    } catch (error) {
      toast.error("Failed to set appointment as pending");
      console.error("Failed to set appointment as pending:", error);
    }
  };

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "pending"
  );

  const acceptedAppointments = appointments.filter(
    (appointment) => appointment.status === "accepted"
  );

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "completed"
  );

  const rejectedAppointments = appointments.filter(
    (appointment) => appointment.status === "rejected"
  );

  return (
    <div className="mx-auto px-6 lg:px-12 py-6 lg:py-12 w-full min-h-screen">
      <section className="mb-12 mt-28">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Pending Appointments
        </h2>
        {pendingAppointments.length === 0 ? (
          <p>No pending appointments.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-slate-200 backdrop-filter backdrop-blur-md p-4 rounded-lg shadow-lg dark:text-black"
              >
                <div>
                  <h3 className="text-lg font-semibold">
                    {appointment.user?.fullname ?? "Unknown"}
                  </h3>
                  <p className="text-sm">
                    {dayjs(appointment.appointmentDate, "DDMMYYYY").format(
                      "DD/MM/YYYY"
                    )}
                  </p>
                  <p className="text-sm">{appointment.appointmentTime}</p>
                  <div className="flex gap-4 justify-center mt-4">
                    <button
                      onClick={() => handleAccept(appointment._id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(appointment._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Accepted Appointments
        </h2>
        {acceptedAppointments.length === 0 ? (
          <p>No accepted appointments.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {acceptedAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-slate-200 backdrop-filter backdrop-blur-md p-4 rounded-lg shadow-lg dark:text-black"
              >
                <div>
                  <h3 className="text-lg font-semibold">
                    {appointment.user?.fullname ?? "Unknown"}
                  </h3>
                  <p className="text-sm">
                    {dayjs(appointment.appointmentDate, "DDMMYYYY").format(
                      "DD/MM/YYYY"
                    )}
                  </p>
                  <p className="text-sm">{appointment.appointmentTime}</p>
                  <div className="flex justify-center mt-4 gap-4">
                    <button
                      onClick={() => handleComplete(appointment._id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                    >
                      Mark as Completed
                    </button>
                    <button
                      onClick={() => handleSetPending(appointment._id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none"
                    >
                      Mark as Pending
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold my-4 dark:text-white">
          Completed Appointments
        </h2>
        {completedAppointments.length === 0 ? (
          <p>No Completed appointments.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-slate-200 backdrop-filter backdrop-blur-md p-4 rounded-lg shadow-lg dark:text-black"
              >
                <div>
                  <h3 className="text-lg font-semibold">
                    {appointment.user?.fullname ?? "Unknown"}
                  </h3>
                  <p className="text-sm">
                    {dayjs(appointment.appointmentDate, "DDMMYYYY").format(
                      "DD/MM/YYYY"
                    )}
                  </p>
                  <p className="text-sm">{appointment.appointmentTime}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold my-4 dark:text-white">
          Rejected Appointments
        </h2>
        {rejectedAppointments.length === 0 ? (
          <p>No Rejected appointments.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rejectedAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-slate-200 backdrop-filter backdrop-blur-md p-4 rounded-lg shadow-lg dark:text-black"
              >
                <div>
                  <h3 className="text-lg font-semibold">
                    {appointment.user?.fullname ?? "Unknown"}
                  </h3>
                  <p className="text-sm">
                    {dayjs(appointment.appointmentDate, "DDMMYYYY").format(
                      "DD/MM/YYYY"
                    )}
                  </p>
                  <p className="text-sm">{appointment.appointmentTime}</p>
                </div>
              </div>
            ))}
          </div>
        )}
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

export default HcpAppointments;
