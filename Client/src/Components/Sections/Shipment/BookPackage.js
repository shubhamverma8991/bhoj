import React, { useState, useEffect } from "react";
import "../../common/common.css";
import "../../common/spacing.css";
import "./BookPackage.css";
import PrimaryBtn from "../../common/Element/PrimaryBtn";

export default function BookPackage() {
  //   const docShipRate = 18;
  const [booked, setBooked] = useState(false);
  const [formdata, setFormData] = useState({
    shipper: {
      name: "",
      email: "",
      phonenumber: "",
      shipperAddress: {
        street: "",
        city: "",
        state: "",
      },
    },
    receiver: {
      name: "",
      email: "",
      phonenumber: "",
      receiverAddress: {
        street: "",
        city: "",
        state: "",
      },
    },
    parceltype: "",
    quantity: 0,
    rate: 0,
    finalamount: 0,
    bookingdate: "",
    estdeliverydate: "",
  });
  const docTotalAmount = formdata.finalamount;
  useEffect(() => {
    const quantity = parseInt(formdata.quantity);
    const rate = parseFloat(formdata.rate);
    const finalamount = quantity * rate;
    setFormData((prevState) => ({
      ...prevState,
      finalamount: finalamount,
    }));
  }, [formdata.quantity, formdata.rate]);

  //   const handleChange = (e) => {
  //     const { name, value, type } = e.target;
  //     else {
  //       setFormData((prevState) => ({
  //         ...prevState,
  //         [name]: value,
  //       }));
  //     }
  //     };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const names = name.split(".");

    if (type === "number" && names.length === 2) {
      // Nested number input
      const [parentName, childName] = names;
      setFormData((prevState) => ({
        ...prevState,
        [parentName]: {
          ...prevState[parentName],
          [childName]: parseInt(value), // Parsing as integer assuming it's a number input
        },
      }));
    } else if (names.length === 1) {
      // Non-nested field
      if (name === "quantity") {
        setFormData((prevState) => ({
          ...prevState,
          [name]: parseInt(value),
        }));
      } else if (name === "rate") {
        setFormData((prevState) => ({
          ...prevState,
          [name]: parseFloat(value),
        }));
        console.log(typeof formdata.rate);
      } else
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    } else if (names.length === 2) {
      // Two-level nested field
      const [parentName, childName] = names;
      setFormData((prevState) => ({
        ...prevState,
        [parentName]: {
          ...prevState[parentName],
          [childName]: value,
        },
      }));
    } else if (names.length === 3) {
      // Three-level nested field
      const [grandParentName, parentName, childName] = names;
      setFormData((prevState) => ({
        ...prevState,
        [grandParentName]: {
          ...prevState[grandParentName],
          [parentName]: {
            ...prevState[grandParentName][parentName],
            [childName]: value,
          },
        },
      }));
    } else {
      // Other cases, like non-number inputs in nested fields
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleDocSubmit = (e) => {
    e.preventDefault();
    console.log(formdata);
    // Retrieve existing data from localStorage
    const existingDataString = localStorage.getItem("booked");
    const existingData = existingDataString ? JSON.parse(existingDataString) : [];

    // Append the new entry to the existing data array
    const newData = [...existingData, formdata];

    // Store the updated array back into localStorage
    localStorage.setItem("booked", JSON.stringify(newData));
    setBooked(true);
  };

  const resetDocForm = (e) => {
    e.preventDefault();
    setFormData({
      shipper: {
        name: "",
        email: "",
        phonenumber: "",
        shipperAddress: {
          street: "",
          city: "",
          state: "",
        },
      },
      receiver: {
        name: "",
        email: "",
        phonenumber: "",
        receiverAddress: {
          street: "",
          city: "",
          state: "",
        },
      },
      quantity: 0,
      rate: 0,
      finalamount: 0,
      bookingdate: "",
      estdeliverydate: "",
    });
    setBooked(false);
  };

  return (
    <div>
      <h1 className="center">Book Your Package</h1>
      <div>
        <form onSubmit={handleDocSubmit} className="flex justify_center align_center parentSec flex_wrap">
          {/* Parcel Type */}

          <div className="flex flex_column justify_center align_center parentSec m-2">
            <h3 className="center">Parcel Type</h3>
            <div className="parcel flex flex_wrap flex_row justify_center align_center parentSec">
              <br />
              <div>
                <input
                  className="ml-3"
                  type="radio"
                  name="parceltype"
                  value="document"
                  id="document"
                  checked={formdata.parceltype === "document"}
                  onChange={handleChange}
                />
                <label className="ml-4">Document</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="parceltype"
                  value="electronic"
                  id="electronic"
                  checked={formdata.parceltype === "electronic"}
                  onChange={handleChange}
                />
                <label className="ml-4">Electronic</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="parceltype"
                  value="flt"
                  id="flt"
                  checked={formdata.parceltype === "flt"}
                  onChange={handleChange}
                />
                <label className="ml-4">Full Load Truck</label>
              </div>
            </div>
            {(formdata.parceltype === "electronic" || formdata.parceltype === "document") && (
              <div className="size">
                <div>
                  <label style={{ width: "100px" }} htmlFor="length">
                    Length (cm)
                  </label>
                  <input style={{ width: "100px", marginRight: "30px" }} type="number" name="length" id="length" />
                </div>
                <div>
                  <label style={{ width: "100px" }} htmlFor="breadth">
                    Breadth (cm)
                  </label>
                  <input style={{ width: "100px", marginRight: "30px" }} type="number" name="breadth" id="breadth" />
                </div>
                <div>
                  <label style={{ width: "100px" }} htmlFor="height">
                    Height (cm)
                  </label>
                  <input style={{ width: "100px", marginRight: "30px" }} type="number" name="height" id="height" />
                </div>
              </div>
            )}
          </div>
          {/* Shipper */}
          <div className="shipper border-1 m-3 p-5">
            <h2>Sender's Detail</h2>
            <div>
              <label htmlFor="shipperName">Name</label>
              <input type="text" name="shipper.name" id="shipperName" value={formdata.shipper.name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="shipperEmail">Email</label>
              <input type="email" name="shipper.email" id="shipperEmail" value={formdata.shipper.email} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="shipperPhoneNumber">Phone Number</label>
              <input
                type="number"
                name="shipper.phonenumber"
                id="shipperPhoneNumber"
                value={formdata.shipper.phonenumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="shipperStreet">Address</label>
              <input
                type="text"
                name="shipper.shipperAddress.street"
                id="shipperStreet"
                value={formdata.shipper.shipperAddress.street}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="shipperCity">City</label>
              <input
                type="text"
                name="shipper.shipperAddress.city"
                id="shipperCity"
                value={formdata.shipper.shipperAddress.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="shipperState">State</label>
              <input
                type="text"
                name="shipper.shipperAddress.state"
                id="shipperState"
                value={formdata.shipper.shipperAddress.state}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Receiver */}
          <div className="receiver border-1 m-3 p-5">
            <h2>Receiver's Detail</h2>
            <div>
              <label htmlFor="receiverName">Name</label>
              <input type="text" name="receiver.name" id="receiverName" value={formdata.receiver.name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="receiverEmail">Email</label>
              <input type="email" name="receiver.email" id="receiverEmail" value={formdata.receiver.email} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="receiverPhoneNumber">Phone Number</label>
              <input
                type="number"
                name="receiver.phonenumber"
                id="receiverPhoneNumber"
                value={formdata.receiver.phonenumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="receiverStreet">Street</label>
              <input
                type="text"
                name="receiver.receiverAddress.street"
                id="receiverStreet"
                value={formdata.receiver.receiverAddress.street}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="receiverCity">City</label>
              <input
                type="text"
                name="receiver.receiverAddress.city"
                id="receiverCity"
                value={formdata.receiver.receiverAddress.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="receiverState">State</label>
              <input
                type="text"
                name="receiver.receiverAddress.state"
                id="receiverState"
                value={formdata.receiver.receiverAddress.state}
                onChange={handleChange}
              />
            </div>
          </div>

          {/*  */}
          <div className="other flex justify_center m-3 p-3 flex_wrap flex_column">
            <div>
              <label htmlFor="bookingdate">Book Date</label>
              <input type="date" name="bookingdate" id="bookingdate" value={formdata.bookingdate} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="estdeliverydate">Exp Deliver Date</label>
              <input type="date" name="estdeliverydate" id="estdeliverydate" value={formdata.estdeliverydate} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="quantity">Quantity</label>
              <input type="number" name="quantity" id="quantity" value={formdata.quantity} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="rate">Rate (Rs.)</label>
              <input type="number" name="rate" id="rate" value={formdata.rate} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="amount">Amount (Rs.)</label>
              <input type="number" name="finalamount" id="amount" disabled value={docTotalAmount} />
            </div>
            {/* <button type="submit">Book</button> */}
            <div className="flex justify_space_btw align_center flex_wrap">
              <PrimaryBtn primary="blue" seconday="white" fontcolor="white" text="Reset" onClick={resetDocForm} />
              <PrimaryBtn primary="green" seconday="white" fontcolor="white" text="Book a Parcel" onClick={handleDocSubmit} />
            </div>
          </div>
        </form>
        {booked && <h4 className="center booked">Parcel booked Successfully,Please note Your AWB no is :- 0000000 </h4>}
      </div>
    </div>
  );
}
