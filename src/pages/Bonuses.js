import React, { useEffect, useState } from "react";
import Bonusesimage from "../assets/img/bonuses-header.svg";
import ButtonGreen from "../components/template/buttons/ButtonGreen";
import CoinImage from "../assets/img/coin.png";
import clientAxios from "../config/axios";
import DepositBonusModal from "../components/DepositBonusModal";
import { useNavigate } from "react-router-dom";
import {
  claimUnlockedBalance,
  getBonusesBalances,
  hideAlerts,
} from "../store/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import UnlockerModal from "../components/UnlockerModal";
import FaucetBonusModal from "../components/FaucetBonusModal";

const Bonuses = () => {
  const [bonusesSettings, setBonusesSettings] = useState([]);
  const [depositBonusModal, setDepositBonusModal] = useState(false);
  const [unlockerModal, setUnlockerModal] = useState(false);
  const [faucetBonusModal, setFaucetBonusModal] = useState(false);
  const [itemBonusModal, setItemBonusModal] = useState({});

  const {
    bonusesUser,
    loadingButton: isLoading,
    errors,
    message,
  } = useSelector((state) => state.users);
  //const { generalSettings } = useSelector((state) => state.settings);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (errors !== null) {
      toast.error(errors, {
        position: "top-right",
        style: {
          background: "#2f4553",
          color: "#fff",
          padding: "14px",
          borderRadius: "3px",
        },
      });
    }
    if (message !== null) {
      toast.success(message, {
        position: "top-right",
        style: {
          background: "#2f4553",
          color: "#fff",
          padding: "14px",
          borderRadius: "3px",
        },
      });
      dispatch(hideAlerts());
    }
    // eslint-disable-next-line
  }, [errors, message, dispatch]);

  useEffect(() => {
    //Get Settings
    const getSettings = async () => {
      const response = await clientAxios.get("/api/settings/bonuses_settings");

      if (response && response.data) {
        setBonusesSettings(response.data.data);
      }
    };
    //Get User Bonuses
    const getUserBonuses = async () => {
      dispatch(getBonusesBalances());
    };
    getSettings();
    getUserBonuses();
    // eslint-disable-next-line
  }, []);

  const handleClaimUnlocked = () => {
    dispatch(claimUnlockedBalance());
  };

  return (
    <>
      <DepositBonusModal
        depositBonusModal={depositBonusModal}
        setDepositBonusModal={setDepositBonusModal}
        itemBonusModal={itemBonusModal}
      />
      <UnlockerModal
        unlockerModal={unlockerModal}
        setUnlockerModal={setUnlockerModal}
      />
      <FaucetBonusModal
        faucetBonusModal={faucetBonusModal}
        setFaucetBonusModal={setFaucetBonusModal}
      />
      <div className="py-5 px-5">
        <div className="mt-10 relative">
          <img
            className="rounded-lg mx-auto"
            src={Bonusesimage}
            alt="Bonuses header"
          />
          <p className="absolute bottom-32 left-16 uppercase text-blue-white-200 text-3xl text-shadow-game">
            Promotion & Bonuses
          </p>
          <p className="absolute bottom-24 left-16 uppercase  text-blue-white-200 text-xl text-shadow-game">
            Increase your profits with multiple bonuses
          </p>
        </div>
        <p className="py-3 text-black-300 text-md inline-block rounded-tr-full font-semibold mt-10">
          <i className="fa-solid fa-magnifying-glass-dollar mr-2 text-dark-green-200 p-2 bg-green-light-200 rounded-full"></i>
          <span className="text-green-light-200">DEPOSIT</span> BONUS
        </p>
        <div className="flex space-x-4 mt-3 border-b border-rose-300 pb-8 mb-8">
          {bonusesSettings.map((item, key) => (
            <div className="bg-theme rounded-xl w-1/4" key={key}>
              <p className="text-center py-3 text-blue-white-200 text-xl mt-2 font-semibold">
                <span className="text-green-light-200 uppercase">
                  {item.name}
                </span>{" "}
                DEPOSIT
              </p>
              <p className="uppercase  text-center mt-3">
                <span className="px-3 pb-1 pt-2 bg-theme rounded-lg text-green-light-200">
                  Up to
                </span>
              </p>
              <p className="uppercase  text-center text-green-light-200 text-4xl mt-3">
                {item.max_bonus}%
              </p>
              <ButtonGreen
                type="button"
                text="Deposit Now"
                icon="fa-wallet"
                onClick={() => {
                  setDepositBonusModal(true);
                  setItemBonusModal(item);
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex space-x-4 mt-3">
          <div className="bg-theme rounded-xl w-1/3">
            <div className="flex justify-between">
              <p className="text-left py-3 text-blue-white-200 text-lg mt-2 pl-6">
                <i className="fa-solid fa-lock mr-2 text-dark-green-200 p-2 bg-green-light-200 rounded-full"></i>
                Unlocker
              </p>
              <p className="py-3 text-blue-white-200 text-lg mt-2 pr-3">
                <i
                  onClick={() => setUnlockerModal(true)}
                  className="fa-solid fa-circle-info mr-2 text-black-400 p-2 bg-theme rounded-md cursor-pointer hover:opacity-80"
                ></i>
              </p>
            </div>
            <div className="uppercase  text-center mt-3 text-2xl">
              <span className="px-4 pb-2 pt-3 bg-theme rounded-lg text-green-light-200 border border-rose-300">
                <img
                  src={CoinImage}
                  className="w-7 inline-block mr-2 mb-1"
                  alt="Coin"
                />
                {parseFloat(bonusesUser?.unlocked_balance).toFixed(4)}
              </span>
            </div>
            <div className=" text-center mt-8 mb-8 text-md">
              <span className="mr-2.5 text-black-300">
                Locked
                {/*<span className="text-green-light-200">
                  {generalSettings?.coin_name}
              </span>*/}
                :
              </span>
              <span className="px-4 pb-2 pt-3 bg-theme text-black-200 rounded-lg border border-rose-300">
                <img
                  src={CoinImage}
                  className="w-5 inline-block mr-2 mb-1"
                  alt="Coin"
                />
                {parseFloat(bonusesUser?.locked_balance).toFixed(4)}
              </span>
            </div>
            <ButtonGreen
              type="button"
              text="Claim"
              icon="fa-sack-dollar"
              className="template-bg-linear-green text-dark-green-200 px-8 py-4 mt-4 w-2/3 mx-auto mb-6 template-btn-green  tracking-widest font-semibold text-md rounded hover:opacity-80"
              isLoading={isLoading}
              onClick={handleClaimUnlocked}
            />
          </div>
          <div className="bg-theme rounded-xl w-1/3">
            <div className="flex justify-between">
              <p className="text-left py-3 text-black text-lg mt-2 pl-6">
                <i className="fa-solid fa-faucet mr-2 text-dark-green-200 p-2 bg-green-light-200 rounded-full"></i>
                Free Faucet
              </p>
              <p className="py-3 text-blue-white-200 text-lg mt-2 pr-3">
                <i
                  onClick={() => setFaucetBonusModal(true)}
                  className="fa-solid fa-circle-info mr-2 text-black-400 p-2 bg-theme rounded-md cursor-pointer hover:opacity-80"
                ></i>
              </p>
            </div>
            <div className="uppercase  text-center mt-3 text-2xl">
              <span className="px-4 pb-2 pt-3 bg-theme rounded-lg text-green-light-200 border border-rose-300">
                {bonusesUser?.faucet_tickets}
              </span>
            </div>
            <div className=" text-center mt-8 mb-8 text-md">
              <span className="mr-2.5 text-black-300">
                Avalaible{" "}
                <span className="text-green-light-200">Faucet Tickets</span>
              </span>
            </div>
            <ButtonGreen
              type="button"
              text="Claim"
              icon="fa-sack-dollar"
              className="template-bg-linear-green text-dark-green-200 px-8 py-4 mt-4 w-2/3 mx-auto mb-6 template-btn-green  tracking-widest font-semibold text-md rounded hover:opacity-80"
              onClick={() => navigate("/free/faucet")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bonuses;
