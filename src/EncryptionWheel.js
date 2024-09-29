import React, { useState, useMemo } from "react";
import "./styles.css";
import InnerWheel from "./InnerWheel"; // Assuming this component exists for displaying inner wheel letters

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const EncryptionWheel = () => {
  const [outerIndex, setOuterIndex] = useState(0);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [spinCount, setSpinCount] = useState(0); // Track the number of spins for hashMap

  const degreesPerLetter = 360 / alphabet.length;

  const rotateWheel = () => {
    // Get the current first key based on the outerIndex
    const firstKey = alphabet[outerIndex]; // This is the current top letter
    const firstKeyNumber = alphabet.indexOf(firstKey) + 1; // Convert to numerical value (A=1, B=2, etc.)

    console.log("First Key (before shift):", firstKey);
    console.log("First Key Number (before shift):", firstKeyNumber);

    // Calculate the total degrees to shift the wheel based on the firstKeyNumber
    const additionalShiftDegrees = firstKeyNumber * degreesPerLetter; // Calculate the degrees to shift

    // Update the rotation degrees for the shift
    setRotationDegrees((prev) => prev + additionalShiftDegrees);

    // Update the outerIndex for the additional shift
    const shiftedOuterIndex = (outerIndex + firstKeyNumber) % alphabet.length;
    setOuterIndex(shiftedOuterIndex);

    console.log("Shifted Outer Index:", shiftedOuterIndex);
  };

  // Updated hashMap: Inner wheel letters (A-Z) as keys and outer wheel letters as values
  const hashMap = useMemo(() => {
    const newHashMap = {};
    const startingIndex = outerIndex; // Use the current outerIndex as the starting point

    for (let i = 0; i < alphabet.length; i++) {
      const key = alphabet[i]; // Inner ring value (A-Z) becomes the key
      const value = alphabet[(startingIndex + i) % alphabet.length]; // Shifted outer ring letter becomes the value
      newHashMap[key] = value; // Set the key-value pair
    }
    return newHashMap;
  }, [outerIndex]); // Only recalculates when outerIndex changes

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Encryption Wheel</h1>
      <div className="wheel">
        <div
          className="outer-wheel"
          style={{ transform: `rotate(${rotationDegrees}deg)` }} // Rotate the outer wheel
        >
          {alphabet.split("").map((_, index) => {
            const key = alphabet[(outerIndex + index) % alphabet.length]; // Get the key from the new hashMap
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
                {hashMap[key] || key}{" "}
                {/* Display the current value from the hashMap */}
              </div>
            );
          })}
        </div>

        <InnerWheel outerIndex={outerIndex} />
      </div>
      <div>
        <button onClick={rotateWheel}>Shift Wheel</button>{" "}
        {/* Updated button label */}
      </div>
      <h2>Hash Map</h2>
      <pre>{JSON.stringify(hashMap, null, 2)}</pre>{" "}
      {/* Display the current state of the hash map */}
    </div>
  );
};

export default EncryptionWheel;
