import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import RouletteNumbers from "../components/roulette/RouletteNumbers";
import PlaySound from "../assets/sounds/rolling-roulette.mp3";
import ClickSound from "../assets/sounds/click.mp3";
import {
  resetProfitLoss,
  sendRequestRoulette,
  setRollNumber,
} from "../store/games/rouletteSlice";
import { toFixedTrunc } from "../utils/Helpers";
import { toast } from "react-hot-toast";
import BetHistory from "../components/history/BetHistory";
import AutoDetails from "../components/dice/AutoDetails";
import { setAuthModalForm, setAuthOpen } from "../store/modals/modalSlice";
import Decimal from "decimal.js";
import GamePage from "../components/template/Games/GamePage";
//import GameTitle from "../components/template/Games/GameTitle";
import MenuAuto from "../components/template/buttons/MenuAuto";
import Label from "../components/template/Inputs/Label";
import Input from "../components/template/Inputs/Input";
import ButtonGreen from "../components/template/buttons/ButtonGreen";
import GameMenu from "../components/GameMenu";
import { Transition } from "@headlessui/react";
import GamePanel from "../components/template/Games/GamePanel";

let intervalId;
const TIME_SECONDS = 8.5; // Seconds for automatic bet

const Roulette = () => {
  const {
    errors,
    isLoading,
    rollNumber,
    win,
    amountProfit,
    amountLoss,
    message,
  } = useSelector((state) => state.roulette);
  const { isAuthenticated } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const numbersRouletteRef = useRef();
  const [isMuteOn, setIsMuteOn] = useState(false);
  const [betAmount, setBetAmount] = useState("0.50");
  const [selection, setSelection] = useState(null);
  const [showNumber, setshowNumber] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  //Bet auto
  const [activeAuto, setActiveAuto] = useState(false);
  const [numberBets, setNumberBets] = useState(10);
  const [betCounter, setBetCounter] = useState(0);
  const [winIncrease, setWinIncrease] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const [lossIncrease, setLossIncrease] = useState(false);
  const [lossAmount, setLossAmount] = useState(0);
  const [stopProfit, setStopProfit] = useState("0.00");
  const [stopLoss, setStopLoss] = useState("0.00");
  const [isAutoOn, setIsAutoOn] = useState(false);

  const [lastResults, setLastResults] = useState([]);

  const soundPlay = new Audio(PlaySound);
  const sendRequestFunc = () => {
    if (!isMuteOn) soundPlay.play();

    dispatch(
      sendRequestRoulette({
        bet_amount: toFixedTrunc(betAmount, 2),
        selection: selection,
      })
    );
  };

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
      setIsRunning(false);
    }

    // eslint-disable-next-line
  }, [errors, dispatch]);

  /*useEffect(() => {
    if (!numbersRouletteRef.current) return; // wait for the elementRef to be available
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          const contentBoxSize = entry.contentBoxSize[0];
          //h1Elem.style.fontSize = `${Math.max(1.5, contentBoxSize.inlineSize / 200)}rem`;
          console.log(contentBoxSize.inlineSize);
          console.log(709.328125 - contentBoxSize.inlineSize);
          console.log(
            `${Math.max(200, contentBoxSize.inlineSize / dimensions.num1)}rem`
          );
        } else {
          console.log("No content box");
        }
      }
      console.log("resize");
    });
    resizeObserver.observe(numbersRouletteRef.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []); */

  useEffect(() => {
    if (rollNumber !== null) {
      let pxs = "0";
      switch (rollNumber) {
        case 0:
          pxs = 4626;
          break;
        case 1:
          pxs = 6855;
          break;
        case 2:
          pxs = 7009;
          break;
        case 3:
          pxs = 7210;
          break;
        case 4:
          pxs = 4570;
          break;
        case 5:
          pxs = 4834;
          break;
        case 6:
          pxs = 5048;
          break;
        case 7:
          pxs = 5232;
          break;
        case 8:
          pxs = 5295;
          break;
        case 9:
          pxs = 3686;
          break;
        case 10:
          pxs = 3499;
          break;
        case 11:
          pxs = 6185;
          break;
        case 12:
          pxs = 5867;
          break;
        case 13:
          pxs = 5705;
          break;
        case 14:
          pxs = 5493;
          break;

        default:
          break;
      }

      let sumPx = 0;
      if (window.innerWidth >= 1980) {
        sumPx = -260;
      } else if (window.innerWidth >= 1690 && window.innerWidth < 1980) {
        sumPx = -170;
      } else if (window.innerWidth >= 1450 && window.innerWidth < 1690) {
        sumPx = -80;
      } else if (window.innerWidth < 1450 && window.innerWidth >= 1380) {
        sumPx = 0;
      } else if (window.innerWidth < 1380 && window.innerWidth >= 1200) {
        sumPx = 40;
      } else if (window.innerWidth < 1200 && window.innerWidth >= 938) {
        sumPx = 85;
      } else if (window.innerWidth >= 768 && window.innerWidth < 938) {
        sumPx = 90;
      } else if (window.innerWidth >= 650 && window.innerWidth < 768) {
        sumPx = 30;
      } else if (window.innerWidth >= 480 && window.innerWidth < 650) {
        sumPx = 85;
      } else if (window.innerWidth < 480) {
        sumPx = 150;
      }

      let measuresPx = `-${pxs + sumPx}px`;

      numbersRouletteRef.current.style.transitionTimingFunction =
        "cubic-bezier(0.12, 0.8, 0.38, 1)";
      numbersRouletteRef.current.style.transitionDuration = "6.7951s";
      numbersRouletteRef.current.style.transform = `translate3d(${measuresPx}, 0px, 0px)`;
      let numbr = rollNumber;

      dispatch(
        setRollNumber({
          roll_number: null,
          win: null,
        })
      );

      setTimeout(() => {
        setshowNumber(numbr);
      }, 5000);

      setTimeout(() => {
        setIsRunning(false);
        setLastResults([numbr, ...lastResults]);
      }, 7000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rollNumber]);

  //Clear interval on unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalId);
      dispatch(resetProfitLoss());
    };
  }, [dispatch]);

  const handleSubmit = () => {
    if (selection === null) {
      toast.error("You must select a bet Red, Green or Black", {
        position: "top-right",
        style: {
          background: "#2f4553",
          color: "#fff",
          padding: "14px",
          borderRadius: "3px",
        },
      });
      return;
    }
    //TODO: Validate Bet Amount (In Dice Game too)
    setshowNumber(null);
    setIsRunning(true);
    numbersRouletteRef.current.style.transform = "translate3d(0px, 0px, 0px)";
    numbersRouletteRef.current.style.transitionTimingFunction = "";
    numbersRouletteRef.current.style.transitionDuration = "";

    /*let element = document.getElementById("primary-number");
    setTimeout(() => {
      element.classList.remove("hidden");
    }, 5000); */

    setTimeout(() => {
      sendRequestFunc();
    }, 100);
  };

  //Handle Start auto bet
  const handleAutoBet = () => {
    //Validations
    if (selection === null) {
      toast.error("You must select a bet Red, Green or Black", {
        position: "top-right",
        style: {
          background: "#2f4553",
          color: "#fff",
          padding: "14px",
          borderRadius: "3px",
        },
      });
      return;
    }
    dispatch(resetProfitLoss());

    setIsAutoOn(true);

    setshowNumber(null);
    numbersRouletteRef.current.style.transform = "translate3d(0px, 0px, 0px)";
    numbersRouletteRef.current.style.transitionTimingFunction = "";
    numbersRouletteRef.current.style.transitionDuration = "";

    setTimeout(() => {
      sendRequestFunc();
    }, 100);

    let n = 1;
    intervalId = setInterval(() => {
      setBetCounter(n);
      n++;
    }, TIME_SECONDS * 1000);
  };

  useEffect(() => {
    if (betCounter <= numberBets - 1 && betCounter > 0 && isAutoOn) {
      //On Win Increase
      if (win && betCounter !== numberBets - 1 && winIncrease) {
        let Dec = Decimal.clone({ precision: 8 });
        let newAmount = new Dec(new Dec(betAmount).div(100)).mul(winAmount);
        newAmount = new Dec(betAmount).add(newAmount);
        setBetAmount(toFixedTrunc(newAmount, 2));
      }

      //On Loss Increase
      if (!win && betCounter !== numberBets - 1 && lossIncrease) {
        let Dec = Decimal.clone({ precision: 8 });
        let newAmount = new Dec(new Dec(betAmount).div(100)).mul(lossAmount);
        newAmount = new Dec(betAmount).add(newAmount);
        setBetAmount(toFixedTrunc(newAmount, 2));
      }

      setshowNumber(null);
      numbersRouletteRef.current.style.transform = "translate3d(0px, 0px, 0px)";
      numbersRouletteRef.current.style.transitionTimingFunction = "";
      numbersRouletteRef.current.style.transitionDuration = "";

      setTimeout(() => {
        sendRequestFunc();
      }, 100);
    }
    if (betCounter === numberBets - 1) {
      clearInterval(intervalId);
      setIsAutoOn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [betCounter]);

  useEffect(() => {
    if (
      (parseFloat(amountProfit) >= parseFloat(stopProfit) &&
        parseFloat(stopProfit) !== 0) ||
      (parseFloat(amountLoss) >= parseFloat(stopLoss) &&
        parseFloat(stopLoss) !== 0)
    ) {
      clearInterval(intervalId);
      setIsAutoOn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountProfit, amountLoss]);

  let numbrClass = (number) => {
    if (number > 0 && number < 8) {
      return "bg-roulette-red-300";
    } else if (number > 7 && number < 15) {
      return "bg-theme";
    } else {
      return "bg-green-400";
    }
  };

  //Stop auto
  const handleStopAuto = () => {
    clearTimeout(intervalId);
    setIsAutoOn(false);
  };

  //Auth modal
  const openNewModal = (modal) => {
    dispatch(setAuthOpen(true));
    dispatch(setAuthModalForm(modal));
  };

  const soundClick = new Audio(ClickSound);
  const handleChangeSelection = (selection) => {
    setSelection(selection);
    if (!isMuteOn) soundClick.play();
  };

  return (
    <div className="mt-12">
      <GamePage>
        <div className="bg-theme rounded-md rounded-br-none rounded-bl-none flex-col-reverse md:flex-row flex shadow-xl">
          <div className="w-full md:w-2/6 bg-theme md:rounded-tl-md rounded-bl-md rounded-br-md md:rounded-br-none py-5 px-4">
            {/*<MenuAuto
              setActiveAuto={setActiveAuto}
              activeAuto={activeAuto}
              isAutoOn={isAutoOn || isRunning ? true : false}
            /> */}
            <Label text="Bet Amount" />
            <div className="flex justify-between flex-col lg:flex-row">
              <Input
                type="number"
                name="bet_amount"
                icon="coins"
                placeholder="0.0000"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                onBlur={(e) =>
                  setBetAmount(parseFloat(e.target.value).toFixed(2))
                }
                readOnly={false}
                isLoading={isLoading || isRunning ? true : false}
                isAutoOn={isAutoOn}
                className="w-full lg:w-8/12 mr-1"
              />
              <button
                className="w-full lg:w-2/12 mt-2 lg:mt-0 py-2 lg:py-0 bg-theme text-black-400 text-sm font-medium rounded-md hover:bg-theme"
                onClick={() =>
                  isRunning || isAutoOn
                    ? () => {}
                    : setBetAmount(parseFloat(betAmount / 2).toFixed(2))
                }
                disabled={isLoading || isAutoOn ? true : false}
              >
                1/2
              </button>
              <button
                className="w-full lg:w-2/12 mt-2 lg:mt-0 py-2 lg:py-0 relative bg-theme text-black-400 text-sm font-medium rounded-md
                   hover:bg-theme lg:after:absolute lg:after:w-1 lg:after:bg-theme lg:after:-left-0.5
                   lg:after:top-1/4 lg:after:bottom-1/4
                   "
                onClick={() =>
                  isRunning || isAutoOn
                    ? () => {}
                    : setBetAmount(parseFloat(betAmount * 2).toFixed(2))
                }
                disabled={isLoading || isAutoOn ? true : false}
              >
                2x
              </button>
            </div>
            <div className="flex justify-between space-x-1.5 mt-4">
              <button
                className={`${
                  selection === "red"
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-75"
                } w-full bg-roulette-red-300 text-black-200  py-3.5 text-sm font-medium rounded`}
                onClick={() =>
                  isRunning || isAutoOn || selection === "red"
                    ? () => {}
                    : handleChangeSelection("red")
                }
              >
                <div className="flex flex-col lg:flex-row justify-between px-4">
                  <span>Red</span>
                  <span>x2</span>
                </div>
              </button>
              <button
                className={`${
                  selection === "green"
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-75"
                } w-full bg-green-400 text-dark-green-200  py-3.5 text-sm font-medium rounded`}
                onClick={() =>
                  isRunning || isAutoOn || selection === "green"
                    ? () => {}
                    : handleChangeSelection("green")
                }
              >
                <div className="flex flex-col lg:flex-row justify-between px-4">
                  <span>Green</span>
                  <span>x14</span>
                </div>
              </button>
              <button
                className={`${
                  selection === "black"
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-75"
                } w-full bg-theme text-black-200  py-3.5 text-sm font-medium rounded`}
                onClick={() =>
                  isRunning || isAutoOn || selection === "black"
                    ? () => {}
                    : handleChangeSelection("black")
                }
              >
                <div className="flex flex-col lg:flex-row justify-between px-4">
                  <span>Black</span>
                  <span>x2</span>
                </div>
              </button>
            </div>
            {activeAuto && (
              <AutoDetails
                isLoading={isLoading}
                numberBets={numberBets}
                setNumberBets={setNumberBets}
                winIncrease={winIncrease}
                setWinIncrease={setWinIncrease}
                winAmount={winAmount}
                setWinAmount={setWinAmount}
                lossIncrease={lossIncrease}
                setLossIncrease={setLossIncrease}
                lossAmount={lossAmount}
                setLossAmount={setLossAmount}
                stopProfit={stopProfit}
                setStopProfit={setStopProfit}
                stopLoss={stopLoss}
                setStopLoss={setStopLoss}
                isAutoOn={isAutoOn}
              />
            )}
            {isAuthenticated ? (
              activeAuto ? (
                isAutoOn ? (
                  <>
                    <ButtonGreen
                      type="button"
                      text="Stop Auto Bet"
                      icon="fa-stop"
                      className="bg-red-400 py-4"
                      onClick={handleStopAuto}
                    />
                    <p className="text-xs text-black-400 mt-3 opacity-60">
                      <i className="fa-solid fa-circle-info mr-1"></i> Auto Bets
                      run every {TIME_SECONDS} seconds
                    </p>
                  </>
                ) : (
                  <>
                    <ButtonGreen
                      type="button"
                      text="Start Auto Bet"
                      icon="fa-forward"
                      isLoading={isLoading}
                      onClick={() => handleAutoBet()}
                    />
                    <p className="text-xs text-black-400 mt-3 opacity-60">
                      <i className="fa-solid fa-circle-info mr-1"></i> Auto Bets
                      run every {TIME_SECONDS} seconds
                    </p>
                  </>
                )
              ) : (
                <ButtonGreen
                  type="button"
                  text="Bet"
                  icon="fa-play"
                  isLoading={isLoading || isRunning ? true : false}
                  onClick={() => handleSubmit()}
                />
              )
            ) : (
              <ButtonGreen
                type="button"
                text="Bet"
                icon="fa-play"
                onClick={() => openNewModal("login")}
              />
            )}
          </div>
          <GamePanel>
            <div className={`flex justify-end mb-5 mr-3 absolute right-10`}>
              {lastResults.slice(0, 10).map((item, key) => (
                <div
                  className={`${numbrClass(
                    item
                  )} mr-2 w-10 h-10 font-medium text-black-200 border border-gray-200 text-md rounded-full text-center relative`}
                  key={key}
                >
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <div className={`grid my-40 relative`}>
              {showNumber !== null && (
                <div
                  className={`flex justify-center mb-5 absolute -top-14 left-1/2 -translate-x-1/2 -translate-y-1/2`}
                >
                  <div
                    className={`bg-theme px-8 py-5 font-medium border ${
                      message === "You Lose"
                        ? "border-roulette-red-300 text-roulette-red-300"
                        : "border-roulette-green-300 text-roulette-green-300"
                    } text-lg rounded-md text-center relative`}
                  >
                    {message !== null && (
                      <span className="items-center">{message}</span>
                    )}
                  </div>
                </div>
              )}
              {/*<div
                className={`flex justify-center mb-5 ${
                  showNumber === null ? "opacity-0" : "opacity-100"
                }`}
              >
                <div
                  className={`${numbrClass(
                    showNumber
                  )} w-12 h-12 font-medium text-black-200 border border-gray-200 text-lg rounded-full text-center relative`}
                >
                  {showNumber !== null && (
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center">
                      {showNumber}
                    </span>
                  )}
                </div>
              </div> */}
              <div className="page_content roulette_game">
                <div className="roulette-container">
                  <div className="roll">
                    <div className="numbers-roulette" ref={numbersRouletteRef}>
                      <RouletteNumbers />
                    </div>
                    <div className="number_mark"></div>
                    <Transition
                      show={showNumber !== null ? true : false}
                      enter="transition-opacity duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity duration-150"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 left-1/2">
                        <div className="relative -left-[50%] shadow-number-primary">
                          <div
                            id="primary-number"
                            className={`${numbrClass(
                              showNumber
                            )} number-primary shadow-inner-number transition-all ease-linear duration-1000`}
                          >
                            {showNumber}
                          </div>
                          <div className="number_mark bg-transparent shadow-none"></div>
                        </div>
                      </div>
                    </Transition>
                  </div>
                </div>
              </div>
            </div>
          </GamePanel>
        </div>
        <GameMenu
          setIsMuteOn={setIsMuteOn}
          isMuteOn={isMuteOn}
          game="roulette"
        />
        <BetHistory isAuthenticated={isAuthenticated} />
      </GamePage>
    </div>
  );
};

export default Roulette;
