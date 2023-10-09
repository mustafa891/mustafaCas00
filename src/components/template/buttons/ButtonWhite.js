import React from "react";

const ButtonWhite = ({ onClick }) => {
  return (
    <button
      type="button"
      className="bg-blue-white-200 hover:opacity-80 text-sm my-1.5 px-8 py-2.5 capitalize rounded-full items-center text-dark-green-800 font-semibold cursor-pointer"
      onClick={onClick}
    >
      <i className="fa-solid fa-wallet mr-1"></i> Wallet
    </button>
  );
};

export default ButtonWhite;
