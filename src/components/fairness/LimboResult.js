import React from "react";
import { toFixedTrunc } from "../../utils/Helpers";
import GameResult from "../limbo/GameResult";
import bgLimbo from "../../assets/img/limbo-bg.svg";

const LimboResult = ({ resultNumber, win = true, multiplier = 0 }) => {
  return (
    <div
      className="px-5 rounded-md py-6 border-2 border-rose-300 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgLimbo})` }}
    >
      <div className="flex justify-between  text-blue-white-200">
        <div className="text-center text-sm">
          <p>MULTIPLIER</p>
          <p className="text-lg px-3 py-1 mt-1 border-2 border-blue-white-200 rounded-md">
            {multiplier === 0 ? "-" : multiplier + "x"}
          </p>
        </div>
        <div className="text-center text-sm">
          <p>RESULT</p>
          <p
            className={`border-blue-white-200 text-blueborder-blue-white-200 text-lg px-3 py-1 mt-1 border-2 rounded-md`}
          >
            {resultNumber !== null ? toFixedTrunc(resultNumber, 2) : "1.00"}x
          </p>
        </div>
      </div>
      <GameResult
        resultNumber={resultNumber}
        win={win}
        multiplier={multiplier}
      />
    </div>
  );
};

export default LimboResult;
