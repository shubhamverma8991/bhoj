import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem("token") ? navigate("/home") : navigate("/");
  }, []);

  return (
    <div className="">
      <Navigation />
      <Outlet />
    </div>
  );
}
