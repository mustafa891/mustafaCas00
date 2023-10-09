import React from "react";

const MenuAuto = ({ setActiveAuto, activeAuto, isAutoOn = false }) => {
  return (
    <div className="flex justify-center text-sm">
      <div className="bg-theme px-1 py-1 rounded-full inline-block">
        <div className="flex text-md">
          <div
            className={`px-8 py-2 text-black-300 rounded-full cursor-pointer ${
              !activeAuto && "bg-theme"
            }`}
            onClick={() => (isAutoOn ? () => {} : setActiveAuto(false))}
          >
            Manual
          </div>
          <div
            className={`px-8 py-2 text-black-300 rounded-full cursor-pointer ${
              activeAuto && "bg-theme"
            }`}
            onClick={() => (isAutoOn ? () => {} : setActiveAuto(true))}
          >
            Auto
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuAuto;
