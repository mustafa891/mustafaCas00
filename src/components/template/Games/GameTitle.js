import React from "react";

const GameTitle = ({ title }) => {
  return (
    <>
      <div className="mt-20 mb-5">
        <p className="text-black-300 text-5xl text-shadow-game pb-1.5 inline-block  tracking-wider uppercase">
          {title}
        </p>
      </div>
    </>
  );
};

export default GameTitle;
