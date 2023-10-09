import React from "react";

const Reload = () => {
  return (
    <>
      <div className="flex justify-center align-middle items-center h-screen">
        <div className="w-1/3 border-4 border-rose-300 rounded-md px-5 py-8">
          <p className=" text-black-300 text-2xl uppercase text-center">
            Inactivity
          </p>
          <p className="text-center py-5 text-yellow-500">
            <i className="fa-solid fa-moon fa-5x"></i>
          </p>
          <p className=" text-black-300 text-base text-center">
            You were inactive for a long period of time, please restart the page
            to get a better performance.
          </p>
          <a
            href="/"
            className="mt-5 border-2 block text-center border-rose-300 w-full px-5 py-3 rounded-md  text-black-300 hover:opacity-75"
          >
            Reload page
          </a>
        </div>
      </div>
    </>
  );
};

export default Reload;
