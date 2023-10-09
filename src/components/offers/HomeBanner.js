import React from "react";
import { useNavigate } from "react-router-dom";

const HomeBanner = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="py-5 px-5">
        <p className="text-center text-5xl text-blue-white-200 uppercase mt-12">
          Earn with <span className="text-green-light-200">Offers</span>
        </p>
        <div className="md:flex md:justify-center mt-2">
          <div>
            <div className="md:flex py-2 px-3 rounded-md mt-5 justify-center space-x-5">
              <button
                className="template-bg-linear-green text-dark-green-200 px-10 py-4 mt-4 template-btn-green  tracking-widest font-semibold text-md rounded-md hover:opacity-80"
                onClick={() => navigate("/games/faucet")}
              >
                <i className="fa-solid fa-sack-dollar mr-1.5"></i>Claim Free
                Coins
              </button>
              <button
                type="button"
                className="template-btn-white text-dark-green-200 px-10 py-4 mt-4 template-btn-green  tracking-widest font-semibold text-md rounded-md hover:opacity-80"
              >
                <i className="fa-solid fa-user-plus mr-2"></i> Sign Up
              </button>
            </div>
            <p className="text-center text-black-400 text-sm mt-3">
              Simple sign-up, instant withdrawals and exclusive gifts.
            </p>
            <div className="hidden sm:flex mt-5 justify-between">
              <div className="flex text-black-300">
                <div className="px-10 my-auto py-2 bg-gradient-to-r from-transparent to-slate-500 text-sm">
                  <span className="font-semibold mr-2">01</span>
                  <span className="">Register an account</span>
                </div>
                <div className="w-7  overflow-hidden inline-block">
                  <div className=" h-10  bg-slate-500 rotate-45 transform origin-top-left"></div>
                </div>
              </div>
              <div className="flex text-black-300">
                <div className="px-10 my-auto py-2 bg-gradient-to-r from-transparent to-slate-500 text-sm">
                  <span className="font-semibold mr-2">02</span>
                  <span className="">Complete offers</span>
                </div>
                <div className="w-7  overflow-hidden inline-block">
                  <div className=" h-10  bg-slate-500 rotate-45 transform origin-top-left"></div>
                </div>
              </div>
              <div className="flex text-black-300">
                <div className="px-10 my-auto py-2 bg-gradient-to-r from-transparent to-slate-500 text-sm">
                  <span className="font-semibold mr-2">03</span>
                  <span className="">Earn coins</span>
                </div>
                <div className="w-7  overflow-hidden inline-block">
                  <div className=" h-10  bg-slate-500 rotate-45 transform origin-top-left"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
