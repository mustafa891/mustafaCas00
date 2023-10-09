import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBetById } from "../../store/bets/betSlice";
import DiceImage from "../../assets/img/dice.png";
import HiloImage from "../../assets/img/hilo.png";
import RouletteImage from "../../assets/img/roulette.png";
import LimboImage from "../../assets/img/limbo.png";
import CoinImage from "../../assets/img/coin.png";
import DiceResult from "../fairness/DiceResult";
import LimboResult from "../fairness/LimboResult";
import RouletteResult from "../fairness/RouletteResult";
import HiloResult from "../fairness/HiloResult";
import { Disclosure } from "@headlessui/react";
import Label from "../template/Inputs/Label";
import {
  setBetOpen,
  setUserId,
  setUserOpen,
} from "../../store/modals/modalSlice";
import { useNavigate } from "react-router-dom";
import { revealServerSeed, reset } from "../../store/fairness/fairnessSlice";
import { toast } from "react-hot-toast";
import HeaderUser from "../profile/HeaderUser";
import CrashResult from "../fairness/CrashResult";

const DATE_OPTIONS = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

const Bet = () => {
  const { betModalId } = useSelector((state) => state.modals);
  const { betDetails } = useSelector((state) => state.bets);
  const { serverSeedRevealed, errors } = useSelector((state) => state.fairness);
  const [clientCopied, setClientCopied] = useState(false);
  const [nonceCopied, setNonceCopied] = useState(false);
  const [serverCopied, setServerCopied] = useState(false);
  const [serverUCopied, setServerUCopied] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBetById(betModalId));
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (errors !== null) {
      toast.error(errors, {
        style: {
          background: "#607d8b",
          color: "#fff",
        },
      });
    }
  }, [errors]);

  const closeModal = () => {
    dispatch(setBetOpen(false));
  };

  const handleProvablyPage = () => {
    closeModal();
    navigate("/provably-fair");
  };

  const ImageComponent = (game) => {
    let imageResponse;

    switch (game) {
      case "hilo":
        imageResponse = (
          <img src={HiloImage} className="w-24 rounded-md" alt="Hilo Game" />
        );
        break;
      case "dice":
        imageResponse = (
          <img src={DiceImage} className="w-24 rounded-md" alt="Dice Game" />
        );
        break;
      case "roulette":
        imageResponse = (
          <img
            src={RouletteImage}
            className="w-24 rounded-md"
            alt="Roulette Game"
          />
        );
        break;
      case "limbo":
        imageResponse = (
          <img src={LimboImage} className="w-24 rounded-md" alt="Limbo Game" />
        );
        break;

      default:
        break;
    }

    return imageResponse;
  };

  const gameResult = () => {
    let gamePrint = "";
    switch (betDetails?.game) {
      case "dice":
        gamePrint = (
          <DiceResult
            rollNumber={betDetails?.game_result.roll_number}
            win={betDetails?.win}
          />
        );
        break;
      case "limbo":
        gamePrint = (
          <LimboResult
            resultNumber={betDetails?.game_result.result}
            win={betDetails?.win}
            multiplier={parseFloat(betDetails?.multiplier).toFixed(2)}
          />
        );
        break;
      case "roulette":
        gamePrint = (
          <RouletteResult showNumber={betDetails?.game_result.roll_number} />
        );
        break;
      case "hilo":
        gamePrint = <HiloResult allCards={betDetails?.game_result} />;
        break;
      case "crash":
        gamePrint = <CrashResult crashPoint={betDetails?.game_result.result} />;
        break;

      default:
        break;
    }

    return gamePrint;
  };

  const handleOpenUser = (userid) => {
    dispatch(setBetOpen(false));
    dispatch(setUserId(userid));
    setTimeout(() => {
      dispatch(setUserOpen(true));
    }, 600);
  };

  return (
    <>
      <div className="flex justify-left space-x-8">
        <div>{ImageComponent(betDetails.game)}</div>
        <div>
          <div
            onClick={() => handleOpenUser(betDetails?.user?._id)}
            className="cursor-pointer hover:opacity-80"
          >
            <HeaderUser
              level={betDetails?.user?.level}
              username={betDetails?.user?.username}
              user_id={betDetails?.user?._id}
              isPublic={true}
            />
          </div>
          <p className="text-black-400 text-md mt-2.5">
            Date:
            <span className="text-black-300 ml-2 ">
              {new Date(betDetails?.createdAt).toLocaleDateString(
                "en-US",
                DATE_OPTIONS
              )}
            </span>
          </p>
          <p className="text-black-400 text-md mt-2.5">
            Bet Id:
            <span className="text-black-300 ml-2 ">{betDetails?._id}</span>
          </p>
        </div>
      </div>
      <div className="flex justify-center space-x-2 mt-5">
        <div className="bg-theme px-2 py-3 w-1/3 text-center rounded-md text-blue-white-200 ">
          <p className="font-medium">Bet</p>
          <p>
            {parseFloat(betDetails?.bet_amount).toFixed(4)}
            <img className="w-5 inline ml-2" src={CoinImage} alt="coins" />
          </p>
        </div>
        <div className="bg-theme px-2 py-3 w-1/3 text-center rounded-md text-blue-white-200 ">
          <p className="font-medium">Multiplier</p>
          <p>{parseFloat(betDetails?.multiplier).toFixed(2)}x</p>
        </div>
        <div className="bg-theme px-2 py-3 w-1/3 text-center rounded-md text-blue-white-200 ">
          <p className="font-medium">Profit</p>
          <p>
            {parseFloat(betDetails?.profit).toFixed(4)}
            <img className="w-5 inline ml-2" src={CoinImage} alt="coins" />
          </p>
        </div>
      </div>
      <p className="font-Blogger-Sans-Bold text-center text-black-300 text-4xl uppercase mt-8">
        Game{" "}
        {betDetails?.win ? (
          <span className="text-green-400">Won</span>
        ) : (
          <span className="text-roulette-red-300">Lost</span>
        )}
      </p>
      <div className="mt-5">{gameResult()}</div>
      <div className="mt-5">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-theme px-5 py-3 text-left text-sm  uppercase text-black-300 hover:bg-theme focus:outline-none">
                Fairness
                {open ? (
                  <i className="fa-solid fa-chevron-up pt-[2px]"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down pt-[2px]"></i>
                )}
              </Disclosure.Button>
              <Disclosure.Panel className="text-black-500">
                <Label text="Server Seed (Hashed)" />
                <div className="relative">
                  <input
                    type="text"
                    name="server_seed_hash"
                    id="server_seed_hash"
                    className={`bg-theme text-sm w-full py-3 rounded-md text-black-200 focus:outline-none placeholder:text-black-400 pl-5 pr-20`}
                    placeholder="Server Seed Hashed"
                    value={betDetails?.server_seed}
                    readOnly
                    autoFocus={false}
                    tabIndex="-1"
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center text-xl text-black-300">
                    <div className="flex relative">
                      <i
                        className="fa-solid fa-copy hover:opacity-70 cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            betDetails?.server_seed
                          );
                          setServerCopied(true);
                          setTimeout(() => {
                            setServerCopied(false);
                          }, 2000);
                        }}
                      ></i>
                      {serverCopied && (
                        <span className="transition-opacity bg-gray-800 px-1 text-sm text-black-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full m-4 mx-auto">
                          Copied!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Label text="Server Seed" />
                <div className="relative">
                  <input
                    type="text"
                    name="server_seed"
                    id="server_seed"
                    className={`bg-theme text-sm w-full py-3 rounded-md text-black-200 focus:outline-none placeholder:text-black-400 pl-5 pr-36`}
                    placeholder="************"
                    value={serverSeedRevealed}
                    readOnly
                    autoFocus={false}
                    tabIndex="-1"
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center text-xl text-black-300">
                    <div className="flex relative">
                      <p
                        className="text-sm mr-5 hover:opacity-70 cursor-pointer"
                        onClick={() =>
                          dispatch(revealServerSeed(betDetails?._id))
                        }
                      >
                        Reveal <i className="fa-solid fa-eye ml-1"></i>
                      </p>
                      <i
                        className="fa-solid fa-copy hover:opacity-70 cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(serverSeedRevealed);
                          setServerUCopied(true);
                          setTimeout(() => {
                            setServerUCopied(false);
                          }, 2000);
                        }}
                      ></i>
                      {serverUCopied && (
                        <span className="transition-opacity bg-gray-800 px-1 text-sm text-black-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full m-4 mx-auto">
                          Copied!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex mt-2">
                  <div className="mr-3 w-11/12">
                    <Label text="Client Seed" />
                    <div className="relative">
                      <input
                        type="text"
                        name="client_seed"
                        id="client_seed"
                        className={`bg-theme text-sm w-full py-3 rounded-md text-black-200 focus:outline-none placeholder:text-black-400 pl-5 pr-14`}
                        placeholder="Client Seed"
                        value={betDetails?.client_seed}
                        readOnly
                        autoFocus={false}
                        tabIndex="-1"
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center text-xl text-black-300">
                        <div className="flex relative">
                          <i
                            className="fa-solid fa-copy hover:opacity-70 cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                betDetails?.client_seed
                              );
                              setClientCopied(true);
                              setTimeout(() => {
                                setClientCopied(false);
                              }, 2000);
                            }}
                          ></i>
                          {clientCopied && (
                            <span className="transition-opacity bg-gray-800 px-1 text-sm text-black-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full m-4 mx-auto">
                              Copied!
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label text="Nonce" />
                    <div className="relative">
                      <input
                        type="text"
                        name="nonce"
                        id="nonce"
                        className={`bg-theme text-sm w-full py-3 rounded-md text-black-200 focus:outline-none placeholder:text-black-400 pl-5 pr-12`}
                        placeholder="Nonce"
                        value={betDetails?.nonce}
                        readOnly
                        autoFocus={false}
                        tabIndex="-1"
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center text-xl text-black-300">
                        <div className="flex relative">
                          <i
                            className="fa-solid fa-copy hover:opacity-70 cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(betDetails?.nonce);
                              setNonceCopied(true);
                              setTimeout(() => {
                                setNonceCopied(false);
                              }, 2000);
                            }}
                          ></i>
                          {nonceCopied && (
                            <span className="transition-opacity bg-gray-800 px-1 text-sm text-black-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full m-4 mx-auto">
                              Copied!
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-5">
                  <button
                    type="button"
                    className="bg-blue-white-200 text-dark-green-200 text-sm px-8 py-4 mt-4 w-full template-btn-green  tracking-widest font-semibold text-md rounded hover:opacity-80"
                    onClick={handleProvablyPage}
                  >
                    Probably Fair
                  </button>
                  <a
                    href="https://www.movable-type.co.uk/scripts/sha256.html"
                    target="_BLANK"
                    className="template-bg-linear-green text-sm text-dark-green-200 px-8 py-4 mt-4 w-full template-btn-green  tracking-widest font-semibold text-md rounded hover:opacity-80"
                  >
                    <i className="fa-solid fa-up-right-from-square mr-2"></i>{" "}
                    Verify Hash
                  </a>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};

export default Bet;
