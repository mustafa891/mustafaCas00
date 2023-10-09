import DiceImage from "../../assets/img/dice-g.png";
import FaucetImage from "../../assets/img/faucet-g.png";
import RouletteImage from "../../assets/img/roulette-g.png";
import HiLoImage from "../../assets/img/hilo-g.png";
import LimboImage from "../../assets/img/limbo-g.png";
import BgGameImage from "../../assets/img/bg-game.svg";
import { useNavigate } from "react-router-dom";

const HomeOffers = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="px-3 sm:px-4 lg:px-5 mt-8">
        <p className="py-3 text-black-300  text-lg inline-block rounded-tr-full">
          <i className="fa-solid fa-fire mr-2 text-dark-green-200 p-2 bg-green-light-200 rounded-full"></i>
          <span className="text-green-light-200">OFFER</span> PARTNERS
        </p>
      </div>
      <div className="flex px-3 sm:px-4 lg:px-5 py-5 mt-0 justify-start space-x-4 items-center">
        <div
          style={{ backgroundImage: `url(${BgGameImage})` }}
          className="group cursor-pointer md:px-2 px-1 w-1/4 h-48 flex flex-col justify-start items-center bg-no-repeat bg-left transition duration-500 ease-in-out relative border border-rose-400 rounded-md"
          onClick={() => navigate("/games/faucet")}
        >
          <img
            className="mx-auto w-36 block mt-3 group-hover:blur-sm"
            src="https://freecash.com/public/img/AdGatemediaGlow.png"
            alt="AdGatemediaGlow"
          />
          <div className="hidden group-hover:block absolute bottom-16">
            <p className="text-center text-green-light-200 opacity-90 mb-1.5">
              <i className="fa-solid fa-circle-play fa-2x"></i>
            </p>
            <p className="text-center text-black-100 font-semibold">
              View Offers
            </p>
          </div>
          <div className="absolute bottom-0 group-hover:blur-sm">
            <p className="text-center text-black-100 font-semibold mb-3">
              AdGate
            </p>
            <div className="flex justify-center mb-6 space-x-1">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(${BgGameImage})` }}
          className="group cursor-pointer md:px-2 px-1 w-1/4 h-48 flex flex-col justify-start items-center bg-no-repeat bg-left transition duration-500 ease-in-out relative border border-rose-400 rounded-md"
          onClick={() => navigate("/games/faucet")}
        >
          <img
            className="mx-auto w-36 block mt-14 group-hover:blur-sm"
            src="https://freecash.com/public/img/wannads-white.webp"
            alt="Wannads"
          />
          <div className="hidden group-hover:block absolute bottom-16">
            <p className="text-center text-green-light-200 opacity-90 mb-1.5">
              <i className="fa-solid fa-circle-play fa-2x"></i>
            </p>
            <p className="text-center text-black-100 font-semibold">
              View Offers
            </p>
          </div>
          <div className="absolute bottom-0 group-hover:blur-sm">
            <p className="text-center text-black-100 font-semibold mb-3">
              Wannads
            </p>
            <div className="flex justify-center mb-6 space-x-1">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(${BgGameImage})` }}
          className="group cursor-pointer md:px-2 px-1 w-1/4 h-48 flex flex-col justify-start items-center bg-no-repeat bg-left transition duration-500 ease-in-out relative border border-rose-400 rounded-md"
          onClick={() => navigate("/games/faucet")}
        >
          <img
            className="mx-auto w-36 block mt-11 group-hover:blur-sm"
            src="https://freecash.com/public/img/earn/timewall-logo.png"
            alt="TimeWall"
          />
          <div className="hidden group-hover:block absolute bottom-16">
            <p className="text-center text-green-light-200 opacity-90 mb-1.5">
              <i className="fa-solid fa-circle-play fa-2x"></i>
            </p>
            <p className="text-center text-black-100 font-semibold">
              View Offers
            </p>
          </div>
          <div className="absolute bottom-0 group-hover:blur-sm">
            <p className="text-center text-black-100 font-semibold mb-3">
              TimeWall
            </p>
            <div className="flex justify-center mb-6 space-x-1">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(${BgGameImage})` }}
          className="group cursor-pointer md:px-2 px-1 w-1/4 h-48 flex flex-col justify-start items-center bg-no-repeat bg-left transition duration-500 ease-in-out relative border border-rose-400 rounded-md"
          onClick={() => navigate("/games/faucet")}
        >
          <img
            className="mx-auto w-36 block mt-12 group-hover:blur-sm"
            src="https://freecash.com/public/img/ayetLogo.webp"
            alt="Ayet Studios"
          />
          <div className="hidden group-hover:block absolute bottom-16">
            <p className="text-center text-green-light-200 opacity-90 mb-1.5">
              <i className="fa-solid fa-circle-play fa-2x"></i>
            </p>
            <p className="text-center text-black-100 font-semibold">
              View Offers
            </p>
          </div>
          <div className="absolute bottom-0 group-hover:blur-sm">
            <p className="text-center text-black-100 font-semibold mb-3">
              Ayet Studios
            </p>
            <div className="flex justify-center mb-6 space-x-1">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeOffers;
