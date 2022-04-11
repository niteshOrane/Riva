import React from "react";

function SaudiFrame() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p
        style={{
          fontSize: "10px",
          color: "#b3b2b2",
        }}
      >
        CR NO. 1010297339
      </p>
      <p
        style={{
          fontSize: "10px",
          color: "#b3b2b2",
        }}
      >
        VAT NO. 300269462200003
      </p>
      <iframe
        src="//maroof.sa/Business/GetStamp?bid=215578"
        style={{
          width: "250px",
          height: "100px",
          overflow: "hidden",
        }}
        // style="width: 250px;height: 250px;overflow-y: hidden;"
        frameborder="0"
        seamless="seamless"
        scrollable="no"
      ></iframe>
    </div>
  );
}

export default SaudiFrame;
