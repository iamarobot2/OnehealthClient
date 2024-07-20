import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../features/api";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";

function UserMedicalRecords() {
  const user = useSelector((state) => state.auth.user);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserRecords();
    }
  }, [user]);

  const fetchUserRecords = async () => {
    try {
      const response = await api.get(`/medical-records/user/${user._id}`);
      setRecords(response.data);
    } catch (error) {
      console.error("Failed to fetch user medical records:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="mx-auto px-6 lg:px-12 py-6 lg:py-12 w-full min-h-screen">
      <h2 className="text-3xl font-semibold mb-4 text-left">My Medical Records</h2>
      {records.length === 0 ? (
        <p>No medical records available.</p>
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <div
              key={record._id}
              className="bg-gray-100 p-4 rounded-md shadow-md"
            >
              <h4 className="text-lg font-semibold">{record.title}</h4>
              <p className="text-sm">{dayjs(record.date).format("DD/MM/YYYY")}</p>
              <p className="text-sm">Description: {record.description}</p>
              <p className="text-sm">Prescription: {record.prescription}</p>
              <p className="text-sm">Medicines: {record.medicines.join(", ")}</p>
              <p className="text-sm">Findings: {record.findings}</p>
              <p className="text-sm">Additional Comments: {record.additionalComments}</p>
              <div className="grid grid-cols-2 gap-4">
                <p className="text-sm">Temperature: {record.vitals.temperature}</p>
                <p className="text-sm">Blood Pressure: {record.vitals.bloodPressure}</p>
                <p className="text-sm">Heart Rate: {record.vitals.heartRate}</p>
                <p className="text-sm">Respiration Rate: {record.vitals.respirationRate}</p>
              </div>
            </div>
          ))}
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

export default UserMedicalRecords;
