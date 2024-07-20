import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import api from "../features/api";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ToastContainer, toast } from "react-toastify";

dayjs.extend(customParseFormat);

export default function BookAppointment() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("00:00");
  const [appointments, setAppointments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteAppointmentId, setDeleteAppointmentId] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("doctorId");

  useEffect(() => {
    if (!doctorId) {
      toast.error("Doctor ID is missing");
      console.error("Doctor ID is missing");
    }
  }, [doctorId]);

  const fetchAppointments = async () => {
    if (!user || !user._id) {
      return;
    }

    try {
      const response = await api.get(`/appointment/user/${user._id}`);
      setAppointments(response.data);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchAppointments();
    }
  }, [user]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleEditClick = (appointment) => {
    setIsEditing(true);
    setEditingAppointment(appointment);
    setSelectedDate(dayjs(appointment.appointmentDate, "DDMMYYYY").toDate());
    setSelectedTime(
      dayjs(appointment.appointmentTime, "hh:mm A").format("HH:mm")
    );
  };

  const handleDeleteClick = (appointmentId) => {
    setShowDeleteConfirm(true);
    setDeleteAppointmentId(appointmentId);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/appointment/${deleteAppointmentId}`);
      setShowDeleteConfirm(false);
      setDeleteAppointmentId(null);
      fetchAppointments();
      toast.success("Appointment deleted successfully");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const formatAppointmentDate = (date) => {
    return dayjs(date).format("DDMMYYYY");
  };

  const formatAppointmentTime = (time) => {
    // Validate time format
    const formattedTime = dayjs(time, "HH:mm").format("hh:mm A");
    if (formattedTime === "Invalid Date") {
      return null;
    }
    return formattedTime;
  };

  const handleBookOrUpdateAppointment = async () => {
    if (!doctorId) {
      toast.error("Doctor ID is missing");
      console.error("Doctor ID is missing");
      return;
    }

    try {
      const appointmentDate = formatAppointmentDate(selectedDate);
      const appointmentTime = formatAppointmentTime(selectedTime);

      if (!appointmentTime) {
        toast.error("Invalid appointment time:", selectedTime);
        console.error("Invalid appointment time:", selectedTime);
        return;
      }

      if (isEditing) {
        // Update existing appointment
        await api.put(`/appointment/user/${editingAppointment._id}`, {
          appointmentDate,
          appointmentTime,
        });
        setIsEditing(false);
        setEditingAppointment(null);
        toast.success("Appointment Edited Successfully");
      } else {
        // Book new appointment
        await api.post("/appointment", {
          userId: user._id,
          doctorId,
          appointmentDate,
          appointmentTime,
        });
        toast.success("Appointment Booked Successfully");
      }

      fetchAppointments();
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat dark:bg-slate-950 dark:text-white">
      <div className="mt-48 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-8 rounded-md max-w-lg w-full">
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="w-full">
            <label
              htmlFor="date"
              className="block text-lg font-semibold mb-2 text-black dark:text-white"
            >
              Select Date:
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              className="border rounded-md p-2 w-full text-black"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="time"
              className="block text-lg font-semibold mb-2 text-black dark:text-white"
            >
              Select Time:
            </label>
            <TimePicker
              value={selectedTime}
              onChange={handleTimeChange}
              disableClock={true}
              format="HH:mm"
              className="border rounded-md p-2 w-full text-black dark:text-white"
            />
          </div>
          <button
            onClick={handleBookOrUpdateAppointment}
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            {isEditing ? "Update Appointment" : "Book Appointment"}
          </button>
        </div>
      </div>
      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-white mb-4">
          Your Appointments
        </h2>
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-4 rounded-md mb-4 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">
                {dayjs(appointment.appointmentDate, "DDMMYYYY").format(
                  "DD/MM/YYYY"
                )}
                <span className="text-sm"> {appointment.appointmentTime}</span>
              </h3>
              <h3 className="text-md font-semibold">
                {appointment.doctor.fullname}
                <span className="text-sm fon">
                  , {appointment.doctor.specialization}
                </span>
              </h3>
              <p className="text-sm">
                {appointment.doctor.workaddress.address}
              </p>
              <p className="text-sm">{appointment.status}</p>
            </div>
            {appointment.status === "pending" && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditClick(appointment)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(appointment._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:text-black p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this appointment?
            </h3>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
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
