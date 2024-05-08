import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Sections/Users/Login";
import SignUp from "./Components/Sections/Users/SignUp";
import Home from "./Components/Sections/Home";
import BookPackage from "./Components/Sections/Shipment/BookPackage";
import ViewBooking from "./Components/Sections/Shipment/ViewBooking";
import TrackShipment from "./Components/Sections/Shipment/TrackShipment";
import Welcome from "./Components/Sections/Welcome";

const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: isAuthenticated() ? <Home /> : <Login />,
      },
      {
        path: "/signup",
        element: isAuthenticated() ? <Home /> : <SignUp />,
      },
      {
        path: "/home",
        element: <Home />,
        children: [
          {
            path: "",
            element: <Welcome />,
          },
          {
            path: "bookpackage",
            element: <BookPackage />,
          },
          {
            path: "viewbooking",
            element: <ViewBooking />,
          },
          {
            path: "track",
            element: <TrackShipment />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
