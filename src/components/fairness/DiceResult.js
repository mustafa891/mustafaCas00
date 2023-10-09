import React from "react";

const DiceResult = ({ rollNumber, win = null }) => {
  return (
    <>
      <div className="px-5 bg-theme template-bg-dice rounded-md py-6 border-2 border-rose-300">
        <p
          className={`text-8xl sm:text-9xl font-bold tracking-wider sm:tracking-widest text-center pl-2.5 ${
            win
              ? "text-green-400"
              : win === null
              ? "text-black-400"
              : "text-red-400"
          }`}
        >
          {rollNumber}
        </p>
      </div>
    </>
  );
};

export default DiceResult;
