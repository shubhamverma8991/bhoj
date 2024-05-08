import React from "react";
import "../../common/common.css";

export default function PrimaryBtn({ primary, secondary, fontcolor, text, onClick }) {
  const handleSubmit = (e) => {
    if (typeof onClick === "function") {
      onClick(e); // Call the provided onClick function
    }
  };
  return (
    <div>
      <div className="primary_btn_container">
        <div className="primary_btn_hover" style={{ backgroundColor: secondary }}></div>
        <button className="primary_btn" style={{ backgroundColor: primary, color: fontcolor }} onClick={handleSubmit}>
          {text}
        </button>
      </div>
    </div>
  );
}
