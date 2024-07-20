import { Outlet } from "react-router-dom";
import HcpDashHeader from "../components/HcpDashHeader";
import { useEffect } from "react";
import { initializeFromCookies } from "./../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";

function HcpDashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeFromCookies());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <HcpDashHeader />
      <main className="dark:bg-slate-950 dark:text-slate-500">
        <Outlet />
      </main>
    </>
  );
}

export default HcpDashboard;
