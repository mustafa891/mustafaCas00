import HashDiceImage from "../../assets/img/dice.png";
import FaucetImage from "../../assets/img/faucet.png";
import RouletteImage from "../../assets/img/roulette.png";
import HiLoImage from "../../assets/img/hilo.png";
import LimboImage from "../../assets/img/limbo.png";
//import DiamondsImage from "../../assets/img/diamonds.png";
//import ComingSoonImage from "../../assets/img/coming_soon.png";
import CrashImage from "../../assets/img/Games/playngo-legacyof-dead.webp";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomeGames = () => {
  const { generalSettings } = useSelector((state) => state.settings);
  const navigate = useNavigate();
  return (
    <>
      <div className="px-3 sm:px-4 lg:px-5 mt-8">
        <p className="text-black-300 text-2xl inline-block rounded-tr-full font-medium">
          <i className="fa-solid fa-fire mr-3"></i>
          <span className="">Games</span>
        </p>
      </div>
      <div className="flex flex-wrap px-3 sm:px-4 lg:px-5 py-5 mt-0 ">
        <div
          className="group group w-1/2 lg:w-1/4 my-2.5 cursor-pointer md:px-2 px-1 hover:scale-105 transition duration-500 ease-in-out relative"
          onClick={() => navigate("/casino/LegacyOfDead")}
        >
          <img
            src={CrashImage}
            alt="Crash game"
            className="rounded-lg transition duration-300 ease-out group-hover:brightness-75 group-hover:rotate-1"
          />
        </div>
        {generalSettings.crash_active && (
          <div
            className="group group w-1/2 lg:w-1/4 my-2.5 cursor-pointer md:px-2 px-1 hover:scale-105 transition duration-500 ease-in-out relative"
            onClick={() => navigate("/casino/crash")}
          >
            <img
              src={CrashImage}
              alt="Crash game"
              className="rounded-lg transition duration-300 ease-out group-hover:brightness-75 group-hover:rotate-1"
            />
          </div>
        )}
        {generalSettings.dice_active && (
          <div
            className="group group w-1/2 lg:w-1/4 my-2.5 cursor-pointer md:px-2 px-1 hover:scale-105 transition duration-500 ease-in-out relative"
            onClick={() => navigate("/casino/hash-dice")}
          >
            <img
              src={HashDiceImage}
              alt="Hash Dice Game"
              className="rounded-lg transition duration-300 ease-out group-hover:brightness-75 group-hover:rotate-1"
            />
          </div>
        )}
        {generalSettings.roulette_active && (
          <div
            className="group group w-1/2 lg:w-1/4 my-2.5 cursor-pointer md:px-2 px-1 hover:scale-105 transition duration-500 ease-in-out relative"
            onClick={() => navigate("/casino/roulette")}
          >
            <img
              src={RouletteImage}
              alt="roulette Game"
              className="rounded-lg transition duration-300 ease-out group-hover:brightness-75 group-hover:rotate-1"
            />
          </div>
        )}
        {generalSettings.limbo_active && (
          <div
            className="group group w-1/2 lg:w-1/4 my-2.5 cursor-pointer md:px-2 px-1 hover:scale-105 transition duration-500 ease-in-out relative"
            onClick={() => navigate("/casino/limbo")}
          >
            <img
              src={LimboImage}
              alt="Limbo Game"
              className="rounded-lg transition duration-300 ease-out group-hover:brightness-75 group-hover:rotate-1"
            />
          </div>
        )}
        {generalSettings.hilo_active && (
          <div
            className="group group w-1/2 lg:w-1/4 my-2.5 cursor-pointer md:px-2 px-1 hover:scale-105 transition duration-500 ease-in-out relative"
            onClick={() => navigate("/casino/hilo")}
          >
            <img
              src={HiLoImage}
              alt="HiLo Game"
              className="rounded-lg transition duration-300 ease-out group-hover:brightness-75 group-hover:rotate-1"
            />
          </div>
        )}
        {generalSettings.faucet_active && (
          <div
            className="group group w-1/2 lg:w-1/4 my-2.5 cursor-pointer md:px-2 px-1 hover:scale-105 transition duration-500 ease-in-out relative"
            onClick={() => navigate("/free/faucet")}
          >
            <img
              src={FaucetImage}
              alt="Free roll"
              className="rounded-lg transition duration-300 ease-out group-hover:brightness-75 group-hover:rotate-1"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default HomeGames;
