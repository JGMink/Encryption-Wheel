import React from "react";

const InnerWheel = ({ outerIndex }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return (
    <div className="inner-wheel">
      {alphabet.split("").map((letter, index) => (
        <div
          key={index}
          className="inner-wheel-letter"
          style={{
            transform: `rotate(${
              (index * 360) / alphabet.length
            }deg) translateY(-40px)`, // Adjust for inner radius
          }}
        >
          {letter} {/* Displaying the inner letters (A-Z) */}
        </div>
      ))}
    </div>
  );
};

export default InnerWheel;
