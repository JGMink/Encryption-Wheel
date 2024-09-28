import React, { useState } from "react";
import "./styles.css";
import InnerWheel from "./InnerWheel"; // Import the inner wheel component

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const EncryptionWheel = () => {
  const [outerIndex, setOuterIndex] = useState(0);
  const [hashMap, setHashMap] = useState({});

  const rotateWheel = (direction) => {
    let newIndex = (outerIndex + direction + alphabet.length) % alphabet.length; // Adjusted to wrap correctly
    setOuterIndex(newIndex);
  };

  const createHashMap = () => {
    const innerWheel = alphabet.split("").map((char, index) => {
      return alphabet[(outerIndex + index) % alphabet.length];
    });

    const newHashMap = {};
    innerWheel.forEach((key, index) => {
      newHashMap[key] = alphabet[index];
    });

    setHashMap(newHashMap);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Encryption Wheel</h1>
      <div className="wheel">
        {alphabet.split("").map((letter, index) => {
          const shiftedIndex = (index + outerIndex) % alphabet.length; // Shift the letters
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
              {alphabet[shiftedIndex]} {/* Use the shifted index */}
            </div>
          );
        })}

        <InnerWheel outerIndex={outerIndex} />
      </div>
      <div>
        <button onClick={() => rotateWheel(-1)}>Rotate Left</button>
        <button onClick={() => rotateWheel(1)}>Rotate Right</button>
        <button onClick={createHashMap}>Create Hash Map</button>
      </div>
      <h2>Hash Map</h2>
      <pre>{JSON.stringify(hashMap, null, 2)}</pre>
    </div>
  );
};

export default EncryptionWheel;
