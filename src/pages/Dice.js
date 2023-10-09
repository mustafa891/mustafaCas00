import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaySound from "../assets/sounds/rolling-dice.mp3";
import ClickSound from "../assets/sounds/click.mp3";
import {
  //hideAlerts,
  sendRequestDice,
  resetProfitLoss,
  setRollNumber,
} from "../store/games/diceSlice";

import Decimal from "decimal.js";
import { toast } from "react-hot-toast";
import CountUp from "react-countup";

import AutoDetails from "../components/dice/AutoDetails";
import BetHistory from "../components/history/BetHistory";
import { toFixedTrunc } from "../utils/Helpers";
import { setAuthModalForm, setAuthOpen } from "../store/modals/modalSlice";

import GameMenu from "../components/GameMenu";
import MenuAuto from "../components/template/buttons/MenuAuto";
import ButtonGreen from "../components/template/buttons/ButtonGreen";
import Input from "../components/template/Inputs/Input";
import Label from "../components/template/Inputs/Label";
import GamePage from "../components/template/Games/GamePage";
//import GameTitle from "../components/template/Games/GameTitle";
import GamePanel from "../components/template/Games/GamePanel";
import GamePanelPlus from "../components/template/Games/GamePanelPlus";

let intervalId;

const TIME_SECONDS = 2; // Seconds for automatic bet

const Dice = () => {
  const {
    errors,
    isLoading,
    message,
    rollNumber,
    win,
    amountProfit,
    amountLoss,
  } = useSelector((state) => state.dice);
  const { isAuthenticated } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [betAmount, setBetAmount] = useState("0.50");
  const [multipliear, setMultipliear] = useState("1.6500");
  const [profitAmt, setProfitAmt] = useState("0.0000");
  const [winChance, setWinChance] = useState("60.00");
  const [rollType, setRollType] = useState("over");
  const [rollNum, setRollNum] = useState(0);
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
  const [isMuteOn, setIsMuteOn] = useState(false);

  const HOUSE_EDGE = 99; //1%

  const handleBetAmount = (e) => {
    setBetAmount(e.target.value);
  };

  //Regenerate payout
  const regeneratePayout = (calcWinChance) => {
    let Dec = Decimal.clone({ precision: 8 });
    let y = new Dec(HOUSE_EDGE);
    y = y.div(calcWinChance);
    //let multipNew = 99 / calcWinChance; //Original version
    setMultipliear(toFixedTrunc(y, 4));
  };

  //generate win chance (multiplier in param)
  const generateWinChance = (multip) => {
    let calcWinChance = toFixedTrunc(HOUSE_EDGE / multip, 2);
    setWinChance(calcWinChance);

    //Regenerate payout
    regeneratePayout(calcWinChance);
    //console.log(calcWinChance);
  };

  //Generate multiplier
  const generateMultiplier = (winChan) => {
    let calcMultip = toFixedTrunc(HOUSE_EDGE / winChan, 4);
    setMultipliear(toFixedTrunc(calcMultip, 4));
  };

  const handleMultipliear = (e) => {
    setMultipliear(e.target.value);
    //let multi = e.target.value;
    //multi = 9900 / multi;
    //let result = (multi / 10000) * 100;
    //setWinChance(toFixedTrunc(result, 2));
  };

  const handleBlurMultiplier = () => {
    let nMultip = toFixedTrunc(multipliear, 4);
    if (multipliear < 1.0102) {
      nMultip = 1.0102;
    } else if (multipliear > 990) {
      nMultip = 990.0;
    }

    /*
    } else if (multipliear > 990.99) {
      nMultip = 9900.99;
      console.log("entra");
    }
    */

    setMultipliear(toFixedTrunc(nMultip, 4));
    generateWinChance(nMultip);
  };

  const handleWinChance = (e) => {
    //TODO: Fix win chance to max 98.00 and min to 0.01
    setWinChance(e.target.value);
    //generateMultiplier(toFixedTrunc(e.target.value, 2));
  };

  const handleBlurWinChance = () => {
    let nWinChance = winChance;
    if (winChance < 0.02) {
      nWinChance = 0.02;
    } else if (winChance > 98.0) {
      nWinChance = 98.0;
    }

    setWinChance(toFixedTrunc(nWinChance, 2));
    generateMultiplier(toFixedTrunc(nWinChance, 2));
  };

  const soundClick = new Audio(ClickSound);
  const handleChangeType = (type) => {
    if (rollType !== type) {
      setRollNum(10000 - rollNum);
      setRollType(type);
      if (!isMuteOn) soundClick.play();
    }
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
    }

    /*if (win && message !== null) {
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
    }*/

    // eslint-disable-next-line
  }, [errors, win, message, dispatch]);

  useEffect(() => {
    const calculateProfit = () => {
      //let nProfit = parseFloat(betAmount).toFixed(2) * parseFloat(multipliear).toFixed(2);

      let Dec = Decimal.clone({ precision: 8 });

      if (betAmount !== "" && multipliear !== "") {
        let nProfit = new Dec(new Dec(betAmount).mul(multipliear)).sub(
          betAmount
        ); // with sub bet amount
        setProfitAmt(toFixedTrunc(nProfit, 4));
      }
    };
    const calcNumber = () => {
      //let multip = multipliear;
      //let multi = 9900 / multip;
      //let result = (multi / 10000) * 100;
      //console.log(result);

      let calcWinChance = toFixedTrunc(HOUSE_EDGE / multipliear, 2);

      let rNum;
      if (rollType === "over") rNum = 10000 - calcWinChance * 100;
      else if (rollType === "under") rNum = calcWinChance * 100;

      if (isNaN(rNum) || !isFinite(rNum)) {
        setRollNum(0);
      } else {
        setRollNum(parseInt(rNum));
      }
    };
    calculateProfit();
    calcNumber();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [betAmount, multipliear, rollType]);

  /*useEffect(() => {
    const calcMulti = () => {
      let multip = 99 / winChance;
      setMultipliear(toFixedTrunc(multip, 4));
    };
    calcMulti();
  }, [winChance]); */

  useEffect(() => {
    return () => {
      dispatch(
        setRollNumber({
          roll_number: null,
          win: null,
        })
      );
    };
  }, [dispatch]);

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

      sendRequestFunc();
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

  //Clear interval on unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalId);
      dispatch(resetProfitLoss());
    };
  }, [dispatch]);

  const soundPlay = new Audio(PlaySound);
  const sendRequestFunc = () => {
    let Dec = Decimal.clone({ precision: 8 });
    let nProfit = new Dec(betAmount).mul(multipliear);

    if (!isMuteOn) soundPlay.play();

    //let nProfit = parseFloat(betAmount).toFixed(2) * parseFloat(multipliear).toFixed(2);
    dispatch(
      sendRequestDice({
        payout: toFixedTrunc(multipliear, 4),
        win_chance: toFixedTrunc(winChance, 2),
        bet_amount: toFixedTrunc(betAmount, 2),
        profit: toFixedTrunc(nProfit, 4),
        selection: rollType,
      })
    );
  };

  //TODO: When send reqquest add bet amount to profit_amount
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequestFunc();
  };

  //Handle Start auto bet
  const handleAutoBet = (e) => {
    e.preventDefault();
    dispatch(resetProfitLoss());
    setIsAutoOn(true);
    sendRequestFunc();

    /*if (intervalId) {
      clearInterval(intervalId);
    }*/

    let timesec = TIME_SECONDS * 1000;

    let n = 1;
    intervalId = setInterval(() => {
      setBetCounter(n);
      /*if (n === numberBets) {
        clearInterval(intervalId);
        setIsAutoOn(false);
        console.log("Clear interval");
      }*/
      n++;
    }, timesec);
  };

  const handleStopAuto = () => {
    clearTimeout(intervalId);
    setIsAutoOn(false);
  };

  //Auth modal
  const openNewModal = (modal) => {
    dispatch(setAuthOpen(true));
    dispatch(setAuthModalForm(modal));
  };

  const onBlurBetAmount = (e) => {
    setBetAmount(parseFloat(Math.abs(e.target.value)).toFixed(2));
  };

  /*const SvgGameBottom = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="box-bg"
        viewBox="0 0 996 46"
      >
        <defs>
          <linearGradient id="gcardBg" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#31343C"></stop>
            <stop offset="100%" stopColor="#1E2024" stopOpacity="0"></stop>
          </linearGradient>
        </defs>
        <g opacity="0.899">
          <path
            fill="url(#gcardBg)"
            fillRule="evenodd"
            d="M0 0h996L892 46H96z"
            opacity="0.598"
            transform="rotate(-180 498 23)"
          ></path>
        </g>
      </svg>
    );
  }; */

  return (
    <div className="mt-12">
      <GamePage>
        <div className="bg-theme rounded-md rounded-br-none rounded-bl-none flex-col-reverse md:flex-row flex shadow-lg">
          <div className="w-full md:w-2/6 bg-theme md:rounded-tl-md rounded-bl-md rounded-br-md md:rounded-br-none py-5 px-4">
            {/*<MenuAuto
              setActiveAuto={setActiveAuto}
              activeAuto={activeAuto}
              isAutoOn={isAutoOn}
  />*/}
            <Label text="Bet Amount" />
            <div className="flex justify-between flex-col lg:flex-row">
              <Input
                type="number"
                name="bet_amount"
                icon="coins"
                placeholder="0.0000"
                value={betAmount}
                onChange={handleBetAmount}
                onBlur={onBlurBetAmount}
                readOnly={false}
                isLoading={isLoading}
                isAutoOn={isAutoOn}
                className="w-full lg:w-8/12 mr-1"
              />
              <button
                className="w-full lg:w-2/12 mt-2 lg:mt-0 py-2 lg:py-0 bg-theme text-black-400 text-sm font-medium rounded-md hover:bg-theme"
                onClick={() =>
                  setBetAmount(parseFloat(betAmount / 2).toFixed(2))
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
                  setBetAmount(parseFloat(betAmount * 2).toFixed(2))
                }
                disabled={isLoading || isAutoOn ? true : false}
              >
                2x
              </button>
            </div>
            <Label text="Profit on Win" />
            <Input
              type="number"
              name="profit_amt"
              icon="coins"
              placeholder="0.0000"
              value={profitAmt}
              readOnly={true}
              className="w-full"
            />
            {activeAuto ? (
              <>
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
                {isAutoOn ? (
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
                ) : isAuthenticated ? (
                  <form onSubmit={(e) => handleAutoBet(e)}>
                    <ButtonGreen
                      type="submit"
                      text="Start Auto Bet"
                      icon="fa-forward"
                      isLoading={isLoading}
                    />
                    <p className="text-xs text-black-400 mt-3 opacity-60">
                      <i className="fa-solid fa-circle-info mr-1"></i> Auto Bets
                      run every {TIME_SECONDS} seconds
                    </p>
                  </form>
                ) : (
                  <ButtonGreen
                    type="button"
                    text="Start Auto Bet"
                    icon="fa-forward"
                    onClick={() => openNewModal("login")}
                  />
                )}
              </>
            ) : isAuthenticated ? (
              <form onSubmit={(e) => handleSubmit(e)}>
                <ButtonGreen
                  type="submit"
                  text="Bet"
                  icon="fa-play"
                  isLoading={isLoading}
                />
              </form>
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
            <GamePanelPlus>
              <div className="h-3 rounded-md w-wull bg-theme mb-3"></div>
              <div className="px-5 bg-theme template-bg-dice rounded-md py-6 border-2 border-rose-300">
                <p
                  className={`text-8xl sm:text-9xl font-bold tracking-wider sm:tracking-widest text-center pl-2.5 ${
                    win
                      ? "text-green-400"
                      : win === null
                      ? "text-black-400"
                      : "text-red-400"
                  }`}
                >
                  {rollNumber !== null ? (
                    <CountUp end={rollNumber} duration={0.5} />
                  ) : (
                    "0000"
                  )}
                </p>
              </div>
              <div className="h-3 rounded-md w-wull bg-theme mt-3"></div>
              <p className="mt-5 text-black-400 mb-1 text-md  font-medium text-center">
                ROLL <span className="uppercase">{rollType}</span>
              </p>
              <p className="text-black-400 mb-1 text-3xl text-center">
                {rollNum}
              </p>
              <div className="flex justify-center space-x-2">
                <ButtonGreen
                  type="button"
                  text="Under"
                  icon="fa-arrow-down"
                  className={`${
                    rollType === "under"
                      ? "template-bg-linear-green text-dark-green-200 px-8 py-4"
                      : "bg-theme text-black-300 px-8 py-4"
                  }`}
                  onClick={() =>
                    isLoading || isAutoOn ? () => {} : handleChangeType("under")
                  }
                />
                <ButtonGreen
                  type="button"
                  text="Over"
                  icon="fa-arrow-up"
                  className={`${
                    rollType === "over"
                      ? "template-bg-linear-green text-dark-green-200 px-8 py-4"
                      : "bg-theme text-black-300 px-8 py-4"
                  }`}
                  onClick={() =>
                    isLoading || isAutoOn ? () => {} : handleChangeType("over")
                  }
                />
              </div>
              <div className="flex justify-center my-8 px-6 bg-theme pb-5 rounded-md">
                <div className="mr-4 w-1/2">
                  <Label text="Multiplier" />
                  <Input
                    type="number"
                    name="multipliear"
                    icon="multiplier"
                    iconPosition="end"
                    placeholder="0"
                    value={multipliear}
                    onChange={(e) => handleMultipliear(e)}
                    onBlur={handleBlurMultiplier}
                    readOnly={false}
                    isLoading={isLoading}
                    isAutoOn={isAutoOn}
                  />
                </div>
                <div className="w-1/2">
                  <Label text="Win Chance" />
                  <Input
                    type="number"
                    name="winchance"
                    icon="percentage"
                    iconPosition="end"
                    placeholder="0"
                    value={winChance}
                    onChange={(e) => handleWinChance(e)}
                    onBlur={handleBlurWinChance}
                    readOnly={false}
                    isLoading={isLoading}
                    isAutoOn={isAutoOn}
                  />
                </div>
              </div>
            </GamePanelPlus>
          </GamePanel>
        </div>
        <GameMenu setIsMuteOn={setIsMuteOn} isMuteOn={isMuteOn} game="dice" />
        <BetHistory isAuthenticated={isAuthenticated} />
      </GamePage>
    </div>
  );
};

export default Dice;
