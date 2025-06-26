import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import React, { useState, useRef } from "react";

const QRCodeGenerator = () => {
  const [text, setText] = useState("https://example.com");
  const qrRef = useRef();

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🧾 QR Code Generator</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL"
        style={{ padding: "10px", width: "300px" }}
      />
      <div ref={qrRef} style={{ marginTop: "20px" }} className="*:mx-auto">
        <QRCodeCanvas value={text} size={256} />
      </div>
      <button
        onClick={downloadQRCode}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        ⬇️ Download QR Code
      </button>
    </div>
  );
};

export default QRCodeGenerator;
