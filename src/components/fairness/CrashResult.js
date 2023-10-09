import React from "react";
import CrashChart from "../crash/CrashChart";

const CrashResult = ({ crashPoint = 0 }) => {
  const gameData = [
    {
      multiplier: 0,
    },
    {
      multiplier: crashPoint,
    },
  ];
  return (
    <div className="relative">
      <p className="text-center text-black-100 text-3xl font-semibold absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_1.2px_1.2px_rgba(1,1,1,0.8)] z-10">
        Crashed @ {parseFloat(crashPoint).toFixed(2)}x
      </p>

      <CrashChart data={gameData} height={250} />
    </div>
  );
};

export default CrashResult;
