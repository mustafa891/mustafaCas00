import React from "react";

const FaucetResult = ({ rollNumber }) => {
  return (
    <>
      <div className="px-8 py-4 bg-theme rounded-md text-center">
        <span className="text-6xl font-bold text-green-light-200">
          {rollNumber}
        </span>
      </div>
    </>
  );
};

export default FaucetResult;
