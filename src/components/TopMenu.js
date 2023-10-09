import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import RexImage from "../assets/img/rex-head.png";
import CoinImage from "../assets/img/coin.png";
import PointsImage from "../assets/img/footprint.png";
import ChatImage from "../assets/img/chat.png";
import BellImage from "../assets/img/bell.png";
import ButtonWhite from "./template/buttons/ButtonWhite";
import {
  setChatOpen,
  setUserMenuOpen,
  setWalletOpen,
} from "../store/modals/modalSlice";
import { getDisplayBalance, setDisplayBalance } from "../utils/functions";
import { toFixedTrunc } from "../utils/Helpers";

const TopMenu = ({
  isAuthenticated,
  balance = "0.0000",
  handleLogout,
  openNewModal,
  navigate,
}) => {
  const { generalSettings } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  //const [dBalance, setDBalance] = useState("dinousd");

  /*useEffect(() => {
    let display_balance = getDisplayBalance();
    //console.log(display_balance);
    if (display_balance === null) {
      setDBalance("dinousd");
    } else {
      setDBalance(display_balance);
    }
  }, [getDisplayBalance]);

  const handleChangeBalance = (balance) => {
    setDisplayBalance(balance);
    setDBalance(balance);
  };*/

  return (
    <>
      {isAuthenticated ? (
        <>
          <div className="md:flex text-md">
            <div className="flex items-center cursor-default">
              <div className=" flex my-1.5 md:my-0 py-2 px-4 justify-between rounded-md items-center md:mr-3">
                {/*dBalance === "dinousd" ? (
                  <div className="flex items-center">
                    <img className="w-5 mr-1.5" src={CoinImage} alt="coins" />
                    <span className="mr-2 font-medium">
                      {toFixedTrunc(balance, 4)}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <img
                      className="w-5 mr-1.5 saturate-50"
                      src={PointsImage}
                      alt="coins"
                    />
                    <span className="mr-2">0</span>
                  </div>
                )*/}
                <div className="flex items-center">
                  <img className="w-5 mr-1.5" src={CoinImage} alt="coins" />
                  <span className="mr-2 font-medium">
                    {toFixedTrunc(balance, 4)}
                  </span>
                </div>
                <p>
                  <span className="bg-theme py-1 px-2.5 rounded-md text-sm">
                    {generalSettings?.coin_name}
                  </span>
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <ButtonWhite onClick={() => dispatch(setWalletOpen(true))} />
            </div>
          </div>
          <div className="hidden md:flex">
            {/*
            <div className="border border-rose-300 rounded-md mr-2 flex items-center px-3">
              <img className="w-5" src={BellImage} alt="user" />
            </div>
            */}
            <div
              className="border border-rose-300 rounded-full flex items-center px-3 cursor-pointer mr-3"
              onClick={() => dispatch(setChatOpen(true))}
            >
              <img className="w-5" src={ChatImage} alt="user" />
            </div>
            <div
              className="border-2 border-rose-300 p-1 rounded-full cursor-pointer"
              onClick={() => dispatch(setUserMenuOpen(true))}
            >
              <img
                className="w-8 h-8 rounded-full"
                src={`https://www.gravatar.com/avatar/${user?.id}?d=retro&f=y`}
                alt="user"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex bg-theme py-2 px-3 rounded-md">
          <div
            className=" rounded-full hidden md:flex items-center px-3 cursor-pointer mr-6"
            onClick={() => dispatch(setChatOpen(true))}
          >
            <img className="w-5" src={ChatImage} alt="user" />
          </div>
          <button
            onClick={() => openNewModal("login")}
            className="bg-green-light-400 hover:bg-red-light-300 text-dark-green-800 px-6 lg:px-14 py-2 font-semibold text-sm rounded-full mr-2"
          >
            Sign In
          </button>
          <button
            onClick={() => openNewModal("register")}
            className="bg-theme hover:bg-theme text-black-300 px-6 lg:px-14 py-2 font-semibold text-sm rounded-full"
          >
            Sign Up
          </button>
        </div>
      )}
    </>
  );
};

export default TopMenu;
