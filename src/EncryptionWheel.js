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
    // Generate a random number of spins between 1 and 26
    const randomSpin = Math.floor(Math.random() * 26) + 1;
    const totalDegrees = randomSpin * degreesPerLetter + 360;

    // Update the visual rotation and outerIndex based on the spin
    setRotationDegrees((prev) => prev + totalDegrees);
    const newOuterIndex = (outerIndex + randomSpin) % alphabet.length;
    setOuterIndex(newOuterIndex);

    // Update the spin count (optional)
    setSpinCount(randomSpin);

    const firstKeyNumber = alphabet.indexOf(alphabet[newOuterIndex]) + 1;
    console.log(firstKeyNumber);

    // Optionally, store or use the first key-value pair and its number
    // Example: setFirstPair({ key: firstKey, value: firstValue, keyNumber: firstKeyNumber });
  };

  const hashMap = useMemo(() => {
    const newHashMap = {};
    const startingIndex = outerIndex; // Use the current outerIndex as the starting point

    for (let i = 0; i < alphabet.length; i++) {
      const key = alphabet[(startingIndex + i) % alphabet.length]; // Shift keys based on outerIndex
      const value = alphabet[i]; // Inner ring value (A-Z)
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
          style={{ transform: `rotate(${rotationDegrees}deg)` }}
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
        <button onClick={rotateWheel}>Spin Wheel</button>
      </div>
      <h2>Hash Map</h2>
      <pre>{JSON.stringify(hashMap, null, 2)}</pre>
    </div>
  );
};

export default EncryptionWheel;
