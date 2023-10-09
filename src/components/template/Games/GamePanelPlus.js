import React from "react";

const GamePanelPlus = (props) => {
  const { children } = props;
  return (
    <div className="flex justify-center mt-5">
      <div className="mt-5 w-full md:w-4/5">{children}</div>
    </div>
  );
};

export default GamePanelPlus;
