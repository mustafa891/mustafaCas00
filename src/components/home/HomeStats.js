import React from "react";
import BetHistory from "../history/BetHistory";

const HomeStats = () => {
  return (
    <>
      <div className="px-3 sm:px-4 lg:px-5 mt-8">
        <p className="py-3 text-black-300 text-md inline-block rounded-tr-full font-semibold">
          <i className="fa-solid fa-chess-rook mr-2 text-dark-green-200 p-2 bg-green-light-200 rounded-full"></i>
          <span className="text-green-light-200">ALL</span> BETS
        </p>
      </div>
      <div className="px-3 sm:px-4 lg:px-5 py-5">
        <BetHistory />
      </div>
    </>
  );
};

export default HomeStats;
