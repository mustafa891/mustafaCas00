import React from "react";
import { useDispatch } from "react-redux";
import LogoImage from "../assets/img/csgocrazy/logo.png";
import { setFairnessOpen } from "../store/modals/modalSlice";

const GameMenu = ({ isMuteOn, setIsMuteOn, game = "dice" }) => {
  const dispatch = useDispatch();

  const openFairnessModal = () => {
    dispatch(setFairnessOpen({ status: true, game }));
  };

  return (
    <>
      <div className="flex justify-between px-5 bg-theme border-t-2 border-rose-300 rounded-bl-md rounded-br-md items-center py-5 mb-10">
        <div className="flex space-x-5 text-black-300">
          {/*<i className="fa-solid fa-circle-info"></i>*/}
          <i
            className={`fa-solid cursor-pointer ${
              isMuteOn ? "fa-volume-xmark" : "fa-volume-high"
            }`}
            onClick={() => setIsMuteOn(!isMuteOn)}
          ></i>
          {/*<i className="fa-solid fa-chart-simple"></i>*/}
        </div>
        <div>
          <img
            className="w-28 grayscale brightness-75 cursor-default opacity-50"
            src={LogoImage}
            alt="Logo"
          />
        </div>
        <div>
          <p
            className="hover:opacity-50 cursor-pointer text-black-300"
            onClick={openFairnessModal}
          >
            <i className="fa-solid fa-scale-balanced mr-1.5"></i>
            <span className="text-sm">Fairness</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default GameMenu;
