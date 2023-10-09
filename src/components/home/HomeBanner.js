import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Banner1Img from "../../assets/img/csgocrazy/7670535@0,5x.png";
import Banner2Img from "../../assets/img/csgocrazy/faucetdropbanner.png";
import Banner3Img from "../../assets/img/csgocrazy/ProvFair.png";
import {
  setAuthModalForm,
  setAuthOpen,
  setWalletOpen,
} from "../../store/modals/modalSlice";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const HomeBanner = () => {
  const { isAuthenticated } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openNewModal = (modal) => {
    dispatch(setAuthOpen(true));
    dispatch(setAuthModalForm(modal));
  };

  return (
    <div>
      <div className="py-5 px-5">
        <div className="flex justify-between space-x-5 mt-10">
          <Carousel autoPlay={true} infiniteLoop={true} interval={5000}>
            <div>
              <div
                className="group hover:shadow-xl hover:scale-105 cursor-pointer w-full"
                onClick={() => navigate("/free/faucet")}
              >
                <img
                  src={Banner1Img}
                  className="w-full mx-auto rounded-lg shadow-xl group-hover:brightness-75"
                  alt="free faucet"
                />
              </div>
            </div>
            <div>
              <div
                className="group hover:shadow-xl hover:scale-105 cursor-pointer w-full hidden lg:block"
                onClick={() => navigate("/bonuses")}
              >
                <img
                  src={Banner2Img}
                  className="w-full mx-auto rounded-lg shadow-xl group-hover:brightness-75"
                  alt="bonuses"
                />
              </div>
            </div>
            <div>
              <div
                className="group hover:shadow-xl hover:scale-105 cursor-pointer w-full hidden lg:block"
                onClick={() => navigate("/provably-fair")}
              >
                <img
                  src={Banner3Img}
                  className="w-full mx-auto rounded-lg shadow-xl group-hover:brightness-75"
                  alt="fairness"
                />
              </div>
            </div>
          </Carousel>
        </div>
        <div className="flex justify-center mt-2">
          <div>
            <div className="md:flex py-2 px-3 rounded-md mt-5 justify-center lg:space-x-5 items-center">
              <button
                className="bg-rose-500 text-rose-200 px-10 py-3.5 mt-4 w-full lg:w-auto font-semibold text-sm rounded-md hover:opacity-80"
                onClick={() => navigate("/free/faucet")}
              >
                <i className="fa-solid fa-sack-dollar mr-1.5"></i>Claim Free
                Coins
              </button>
              {!isAuthenticated && (
                <button
                  type="button"
                  onClick={() => openNewModal("register")}
                  className="bg-rose-200 px-10 py-3.5 mt-4 w-full lg:w-auto font-semibold text-sm rounded-md hover:opacity-80"
                >
                  <i className="fa-solid fa-user-plus mr-1.5"></i> Sign Up
                </button>
              )}
            </div>
            <p className="text-center text-black-400 text-sm mt-3">
              Simple sign-up, instant withdrawals and exclusive gifts.
            </p>
            <div className="hidden sm:flex mt-5 justify-between">
              <div className="flex text-black-300">
                <div className="px-10 my-auto py-2 bg-gradient-to-r from-transparent to-neutral-800 text-sm">
                  <span className="font-semibold mr-2">01</span>
                  <span className="">Register an account</span>
                </div>
                <div className="w-7  overflow-hidden inline-block">
                  <div className=" h-10  bg-neutral-800 rotate-45 transform origin-top-left"></div>
                </div>
              </div>
              <div className="flex text-black-300">
                <div className="px-10 my-auto py-2 bg-gradient-to-r from-transparent to-neutral-800 text-sm">
                  <span className="font-semibold mr-2">02</span>
                  <span className="">Start to play</span>
                </div>
                <div className="w-7  overflow-hidden inline-block">
                  <div className=" h-10  bg-neutral-800 rotate-45 transform origin-top-left"></div>
                </div>
              </div>
              <div className="flex text-black-300">
                <div className="px-10 my-auto py-2 bg-gradient-to-r from-transparent to-neutral-800 text-sm">
                  <span className="font-semibold mr-2">03</span>
                  <span className="">Earn free coins</span>
                </div>
                <div className="w-7  overflow-hidden inline-block">
                  <div className=" h-10  bg-neutral-800 rotate-45 transform origin-top-left"></div>
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
