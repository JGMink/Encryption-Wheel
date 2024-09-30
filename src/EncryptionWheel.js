import React, { useState, useMemo } from "react";
import "./styles.css";
import InnerWheel from "./InnerWheel"; // Assuming this component exists for displaying inner wheel letters

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const EncryptionWheel = () => {
  const [outerIndex, setOuterIndex] = useState(0);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [inputMessage, setInputMessage] = useState(""); // State for input message
  const [encodedMessage, setEncodedMessage] = useState(""); // State for encoded message
  const degreesPerLetter = 360 / alphabet.length;

  const rotateWheel = () => {
    const firstKey = alphabet[outerIndex];
    const firstKeyNumber = alphabet.indexOf(firstKey) + 1;

    const additionalShiftDegrees = firstKeyNumber * degreesPerLetter;
    setRotationDegrees((prev) => prev + additionalShiftDegrees);

    const shiftedOuterIndex = (outerIndex + firstKeyNumber) % alphabet.length;
    setOuterIndex(shiftedOuterIndex);
  };

  const hashMap = useMemo(() => {
    const newHashMap = {};
    const startingIndex = outerIndex;

    for (let i = 0; i < alphabet.length; i++) {
      const key = alphabet[i];
      const value = alphabet[(startingIndex + i) % alphabet.length];
      newHashMap[key] = value;
    }
    return newHashMap;
  }, [outerIndex]);

  const encodeMessage = () => {
    const message = inputMessage.toUpperCase(); // Convert to uppercase for consistency
    let encoded = "";

    for (let char of message) {
      if (alphabet.includes(char)) {
        encoded += hashMap[char]; // Use the hashMap to encode the character
      } else {
        encoded += char; // Keep non-alphabetic characters unchanged
      }
    }

    setEncodedMessage(encoded); // Update the encoded message state
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(encodedMessage).then(() => {
      alert("Encoded message copied to clipboard!"); // Optional feedback
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Encryption Wheel</h1>
      <div className="wheel">
        <div
          className="outer-wheel"
          style={{ transform: `rotate(${rotationDegrees}deg)` }} // Rotate the outer wheel
        >
          {alphabet.split("").map((_, index) => {
            const key = alphabet[(outerIndex + index) % alphabet.length];
            return (
              <div
                key={index}
                className="wheel-letter"
                style={{
                  transform: `rotate(${
                    (index * 360) / alphabet.length
                  }deg) translateY(-145px)`,
                }}
              >
                {hashMap[key] || key}
              </div>
            );
          })}
        </div>

        <InnerWheel outerIndex={outerIndex} />
      </div>
      <div>
        <button onClick={rotateWheel}>Shift Wheel</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <textarea
          placeholder="Type your message here"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          rows="4"
          cols="40"
          style={{
            border: "2px solid #333",
            borderRadius: "5px",
            padding: "10px",
            resize: "none",
            marginTop: "10px",
            width: "80%",
          }}
        />
        <div>
          <button onClick={encodeMessage}>Encode Message</button>
        </div>
        <div className="encoded-message" style={{ marginTop: "20px" }}>
          <h3>Encoded Message:</h3>
          <p style={{ display: "inline", fontSize: "18px", color: "#fff" }}>
            {encodedMessage}
          </p>
          <span
            onClick={copyToClipboard}
            style={{
              cursor: "pointer",
              marginLeft: "10px",
              fontSize: "24px",
              color: "#333",
            }}
            title="Copy to clipboard"
          >
            👀
          </span>
        </div>
      </div>
    </div>
  );
};

export default EncryptionWheel;
