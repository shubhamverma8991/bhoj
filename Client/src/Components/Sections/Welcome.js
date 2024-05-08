import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
export default function Welcome() {
  const navigate = useNavigate();
  const trackShipment = () => {
    navigate("/home/track");
  };
  const bookPackage = () => {
    navigate("/home/bookpackage");
  };
  const viewBooking = () => {
    navigate("/home/viewbooking");
  };
  return (
    <div>
      <h1 className="center">BHOJ Enterprise Always moving forward</h1>
      <div className="flex flex_column justify_center align_center h-100">
        <button className="btn_links" onClick={trackShipment}>
          Track Shipment
        </button>
        <button className="btn_links" onClick={bookPackage}>
          Book Package
        </button>
        <button className="btn_links" onClick={viewBooking}>
          View Booking
        </button>
      </div>
    </div>
  );
}
