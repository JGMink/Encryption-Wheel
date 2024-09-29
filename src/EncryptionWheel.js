import React, { useState } from "react";
import "./styles.css";
import InnerWheel from "./InnerWheel"; // Assuming this component exists for displaying inner wheel letters

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const EncryptionWheel = () => {
  const [outerIndex, setOuterIndex] = useState(0); // Tracks the current letter index
  const [rotationDegrees, setRotationDegrees] = useState(0); // Tracks the total rotation in degrees
  const [hashMap, setHashMap] = useState({}); // Stores the current hash map

  const degreesPerLetter = 360 / alphabet.length; // ~13.85 degrees per letter

  const rotateWheel = () => {
    // Generate a random number of spins between 1 and 26
    const randomSpin = Math.floor(Math.random() * 26) + 1; // Randomly choose a number of letters to spin (1-26)
    
    // Calculate the total degrees to rotate
    const totalDegrees = randomSpin * degreesPerLetter + 360; // Add full rotation for the spin

    // Update rotation degrees for the smooth rotation
    setRotationDegrees(rotationDegrees + totalDegrees);

    // Update the outerIndex to reflect the new position
    const newOuterIndex = (outerIndex + randomSpin) % alphabet.length;
    setOuterIndex(newOuterIndex);

    // Create a new hash map based on the same random spin
    createHashMap(randomSpin);
  };

  const createHashMap = (shiftValue) => {
    const newHashMap = {};
    for (let i = 0; i < alphabet.length; i++) {
      // The outer ring letters are the keys
      const key = alphabet[(shiftValue + i) % alphabet.length]; // Shift keys by the random value
      // The inner ring letters are the values (A-Z)
      const value = alphabet[i]; // Inner ring value (A-Z)
      newHashMap[key] = value; // Set the key-value pair
    }
    setHashMap(newHashMap); // Update the hash map state
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Encryption Wheel</h1>
      <div className="wheel">
        <div
          className="outer-wheel"
          style={{ transform: `rotate(${rotationDegrees}deg)` }}
        >
          {alphabet.split("").map((_, index) => {
            // Get the key from the current hashMap based on the outerIndex
            const key = alphabet[(outerIndex + index) % alphabet.length];
            return (
              <div
                key={index}
                className="wheel-letter"
                style={{
                  transform: `rotate(${(index * 360) / alphabet.length}deg) translateY(-145px)`,
                }}
              >
                {hashMap[key] || key} {/* Show key from hashMap, default to key if not available */}
              </div>
            );
          })}
        </div>

        <InnerWheel outerIndex={outerIndex} />
      </div>

      <div>
        <button onClick={rotateWheel}>Spin Wheel</button>
      </div>
      <h2>Hash Map</h2>
      <pre>{JSON.stringify(hashMap, null, 2)}</pre>
    </div>
  );
};

export default EncryptionWheel;
