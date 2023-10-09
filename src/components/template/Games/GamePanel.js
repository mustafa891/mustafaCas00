import React from "react";

const GamePanel = (props) => {
  const { children } = props;
  return (
    <div className="w-full md:w-4/6 px-3 py-10 shadow-inner bg-theme rounded-tl-md md:rounded-tl-none rounded-tr-md md:rounded-br-md">
      {children}
    </div>
  );
};

export default GamePanel;
