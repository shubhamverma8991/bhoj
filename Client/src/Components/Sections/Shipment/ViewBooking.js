import React, { useEffect } from "react";
import "./ViewBooking.css";

export default function Viewdata() {
  const data = JSON.parse(localStorage.getItem("booked"));
  useEffect(() => {
    console.log(data);
  });
  const index = 0;
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Shipper Name</th>
            <th>Shipper Phone</th>
            <th>Shipper Address</th>
            <th>Shipper City</th>
            <th>Booking Date</th>
            <th>Receiver Name</th>
            <th>Receiver Phone</th>
            <th>Receiver Address</th>
            <th>Receiver City</th>
            <th>Est DeliveryDate</th>
            <th>Parcel Type</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.shipper.name}</td>
              <td>{item.shipper.phonenumber}</td>
              <td>{item.shipper.shipperAddress.street}</td>
              <td>{item.shipper.shipperAddress.city}</td>
              <td>{item.bookingdate}</td>
              <td>{item.receiver.name}</td>
              <td>{item.receiver.phonenumber}</td>
              <td>{item.receiver.receiverAddress.street}</td>
              <td>{item.receiver.receiverAddress.city}</td>
              <td>{item.estdeliverydate}</td>
              <td>{item.parcelType}</td>
              <td>{item.quantity}</td>
              <td>{item.rate}</td>
              <td>{item.finalamount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
