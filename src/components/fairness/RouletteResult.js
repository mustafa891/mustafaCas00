import React from "react";
import RouletteNumbers from "../roulette/RouletteNumbers";

const RouletteResult = ({ showNumber }) => {
  let numbrClass = (number) => {
    if (number > 0 && number < 8) {
      return "bg-roulette-red-300";
    } else if (number > 7 && number < 15) {
      return "bg-theme";
    } else {
      return "bg-green-400";
    }
  };

  return (
    <>
      <div className="grid my-14">
        <div className="page_content roulette_game">
          <div className="roulette-container">
            <div className="roll">
              <div className="numbers-roulette opacity-70">
                <RouletteNumbers />
              </div>
              <div className="number_mark"></div>
              <div className="absolute top-0 left-1/2">
                <div className="relative -left-[50%] shadow-number-primary">
                  <div
                    id="primary-number"
                    className={`${numbrClass(
                      showNumber
                    )} number-primary shadow-inner-number transition-all ease-linear duration-1000`}
                  >
                    {showNumber}
                  </div>
                  <div className="number_mark bg-transparent shadow-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RouletteResult;
