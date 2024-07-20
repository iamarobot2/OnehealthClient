import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../features/api";
import { toast, ToastContainer } from "react-toastify";

function MedicalRecord() {
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");

  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    title: "",
    description: "",
    prescription: "",
    medicines: [],
    findings: "",
    additionalComments: "",
    vitals: {
      temperature: "",
      bloodPressure: "",
      heartRate: "",
      respirationRate: "",
    },
  });

  useEffect(() => {
    fetchMedicalRecords();
  }, [appointmentId]);

  const fetchMedicalRecords = async () => {
    try {
      const response = await api.get(`/medical-records/${appointmentId}`);
      setRecords(response.data);
    } catch (error) {
      toast.error(error.message)
      console.error("Failed to fetch medical records:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleVitalsChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prev) => ({
      ...prev,
      vitals: { ...prev.vitals, [name]: value },
    }));
  };

  const handleCreateRecord = async () => {
    try {
      const payload = {
        appointment: appointmentId,
        date: new Date().toISOString(),
        title: newRecord.title,
        description: newRecord.description,
        prescription: newRecord.prescription,
        medicines: newRecord.medicines,
        findings: newRecord.findings,
        additionalComments: newRecord.additionalComments,
        vitals: {
          temperature: newRecord.vitals.temperature,
          bloodPressure: newRecord.vitals.bloodPressure,
          heartRate: newRecord.vitals.heartRate,
          respirationRate: newRecord.vitals.respirationRate,
        },
      };
      console.log(payload);
      const response = await api.post("/medical-records", payload);
      setRecords((prev) => [...prev, response.data.record]);
      resetNewRecord();
      toast.success("Medical record created successfully");
    } catch (error) {
      console.error("Failed to create medical record:", error);
      toast.error("Failed to create medical record");
    }
  };

  const resetNewRecord = () => {
    setNewRecord({
      title: "",
      description: "",
      prescription: "",
      medicines: [],
      findings: "",
      additionalComments: "",
      vitals: {
        temperature: "",
        bloodPressure: "",
        heartRate: "",
        respirationRate: "",
      },
    });
  };

  const handleUpdateRecord = async (recordId) => {
    try {
      await api.put(`/medical-records/${recordId}`, newRecord);
      fetchMedicalRecords();
      toast.success("Medical record updated successfully");
    } catch (error) {
      console.error("Failed to update medical record:", error);
      toast.error("Failed to update medical record");
    }
  };

  const handleDeleteRecord = async (recordId) => {
    try {
      await api.delete(`/medical-records/${recordId}`);
      setRecords((prev) => prev.filter((record) => record._id !== recordId));
      toast.success("Medical record deleted successfully");
    } catch (error) {
      console.error("Failed to delete medical record:", error);
      toast.error("Failed to delete medical record");
    }
  };

  return (
    <div className="min-h-screen bg-center bg-no-repeat bg-cover flex items-center justify-center">
      <div className="mt-40 max-w-3xl w-full bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold mb-4 text-left">
          Medical Records
        </h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">New Record</h3>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newRecord.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newRecord.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
            ></textarea>
            <input
              type="text"
              name="prescription"
              placeholder="Prescription"
              value={newRecord.prescription}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
            />
            <input
              type="text"
              name="medicines"
              placeholder="Medicines (comma separated)"
              value={newRecord.medicines.join(", ")}
              onChange={(e) =>
                setNewRecord((prev) => ({
                  ...prev,
                  medicines: e.target.value.split(",").map((s) => s.trim()),
                }))
              }
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
            />
            <input
              type="text"
              name="findings"
              placeholder="Findings"
              value={newRecord.findings}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
            />
            <input
              type="text"
              name="additionalComments"
              placeholder="Additional Comments"
              value={newRecord.additionalComments}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="temperature"
                placeholder="Temperature"
                value={newRecord.vitals.temperature}
                onChange={handleVitalsChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
              />
              <input
                type="text"
                name="bloodPressure"
                placeholder="Blood Pressure"
                value={newRecord.vitals.bloodPressure}
                onChange={handleVitalsChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
              />
              <input
                type="text"
                name="heartRate"
                placeholder="Heart Rate"
                value={newRecord.vitals.heartRate}
                onChange={handleVitalsChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
              />
              <input
                type="text"
                name="respirationRate"
                placeholder="Respiration Rate"
                value={newRecord.vitals.respirationRate}
                onChange={handleVitalsChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={handleCreateRecord}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Record
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Existing Records</h3>
          {records.length === 0 ? (
            <p>No medical records available for this appointment.</p>
          ) : (
            <div className="space-y-4">
              {records.map((record) => (
                <div
                  key={record._id}
                  className="bg-gray-100 p-4 rounded-md shadow-md"
                >
                  <h3 className="text-lg font-semibold">{record.title}</h3>
                  <p className="text-sm"><span>Description : </span>{record.description}</p>
                  <p className="text-sm"><span>Prescription : </span>{record.prescription}</p>
                  <p className="text-sm"><span>Medicines : </span>{record.medicines.join(", ")}</p>
                  <p className="text-sm"><span>Findings : </span>{record.findings}</p>
                  <p className="text-sm"><span>Additional Notes : </span>{record.additionalComments}</p>
                  <div className="">
                    <h3 className="text-lg">Vitals :</h3>
                    <p className="text-sm">
                      Temperature: {record.vitals.temperature}
                    </p>
                    <p className="text-sm">
                      Blood Pressure: {record.vitals.bloodPressure}
                    </p>
                    <p className="text-sm">
                      Heart Rate: {record.vitals.heartRate}
                    </p>
                    <p className="text-sm">
                      Respiration Rate: {record.vitals.respirationRate}
                    </p>
                  </div>
                  <div className="flex justify-center mt-4 gap-4">
                    <button
                      onClick={() => handleUpdateRecord(record._id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteRecord(record._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
    </div>
  );
}

export default MedicalRecord;
