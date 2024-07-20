import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import Home from "./routes/Home.jsx";
import Login from "./routes/Login.jsx";
import Signup from "./routes/Signup.jsx";
import UserDashboard from "./routes/UserDashboard.jsx";
import UserHome from "./routes/UserHome.jsx";
import { initializeFromCookies } from "./features/auth/authSlice";
import store from "./app/store.js";
import Appointment from "./routes/Appointment.jsx";
import BookAppointment from "./routes/Bookappointment.jsx";
import DataSharing from "./routes/DataSharing.jsx";
import HcpDashboard from "./routes/HcpDashboard.jsx";
import HcpHome from "./routes/HcpHome.jsx";
import HcpAppointments from "./routes/HcpAppointment.jsx";
import MedicalRecord from "./routes/MedicalRecord";
import UserRecords from "./routes/UserMedicalRecords.jsx";
import UserRoleRedirect from "./routes/UserRoleRedirect.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserRoleRedirect />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/redirect",
        element: <UserRoleRedirect />,
      },
    ],
  },
  {
    path: "/user-dashboard",
    element: <UserDashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/user-dashboard",
        element: <UserHome />,
      },
      {
        path: "/user-dashboard/appointments",
        element: <Appointment />,
      },
      {
        path: "/user-dashboard/appointments/book",
        element: <BookAppointment />,
      },
      {
        path: "/user-dashboard/datasharing",
        element: <DataSharing />,
      },
      {
        path: "/user-dashboard/records",
        element: <UserRecords />,
      },
    ],
  },
  {
    path: "/hcp-dashboard",
    element: <HcpDashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/hcp-dashboard",
        element: <HcpHome />,
      },
      {
        path: "/hcp-dashboard/appointments",
        element: <HcpAppointments />,
      },
      {
        path: "/hcp-dashboard/records/:appointmentId",
        element: <MedicalRecord />,
      },
    ],
  },
]);

const AppInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeFromCookies());
  }, [dispatch]);
  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppInitializer />
    </Provider>
  </React.StrictMode>
);
