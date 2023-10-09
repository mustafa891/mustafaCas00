import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaySound from "../assets/sounds/limbo.mp3";
import GameMenu from "../components/GameMenu";
import MenuAuto from "../components/template/buttons/MenuAuto";
import GamePage from "../components/template/Games/GamePage";
import Input from "../components/template/Inputs/Input";
import Label from "../components/template/Inputs/Label";
import {
  resetProfitLoss,
  sendRequestLimbo,
  setResultNumber,
} from "../store/games/limboSlice";
import { toFixedTrunc } from "../utils/Helpers";
import { toast } from "react-hot-toast";
import AutoDetails from "../components/dice/AutoDetails";
import ButtonGreen from "../components/template/buttons/ButtonGreen";
import { setAuthModalForm, setAuthOpen } from "../store/modals/modalSlice";
import GamePanel from "../components/template/Games/GamePanel";
import GamePanelPlus from "../components/template/Games/GamePanelPlus";
import GameResult from "../components/limbo/GameResult";
import RangeInput from "../components/template/Inputs/RangeInput";
import Decimal from "decimal.js";
import BetHistory from "../components/history/BetHistory";

import bgLimbo from "../assets/img/limbo-bg.svg";

let intervalId;
const HOUSE_EDGE = 99;
const TIME_SECONDS = 1.5; // Seconds for automatic bet

const Limbo = () => {
  const [isMuteOn, setIsMuteOn] = useState(false);
  const [betAmount, setBetAmount] = useState("0.50");
  const [multipliear, setMultipliear] = useState("1.6500");
  const [profitAmt, setProfitAmt] = useState("0.0000");
  const [winChance, setWinChance] = useState("60.00");
  const [colorBorder, setColorBorder] = useState("border-blue-white-200");
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

  const { errors, isLoading, resultNumber, win, amountProfit, amountLoss } =
    useSelector((state) => state.limbo);
  const { isAuthenticated } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const soundPlay = new Audio(PlaySound);
  const sendRequestFunc = () => {
    let Dec = Decimal.clone({ precision: 8 });
    let nProfit = new Dec(betAmount).mul(multipliear);

    if (!isMuteOn) soundPlay.play();

    dispatch(
      sendRequestLimbo({
        payout: toFixedTrunc(multipliear, 4),
        win_chance: toFixedTrunc(winChance, 2),
        bet_amount: toFixedTrunc(betAmount, 2),
        profit: toFixedTrunc(nProfit, 4),
      })
    );
  };

  const handleBet = () => {
    sendRequestFunc();
  };

  //Handle Start auto bet
  const handleAutoBet = () => {
    dispatch(resetProfitLoss());
    setIsAutoOn(true);
    sendRequestFunc();

    let timesec = TIME_SECONDS * 1000;

    let n = 1;
    intervalId = setInterval(() => {
      setBetCounter(n);
      n++;
    }, timesec);
  };

  //GAME FUNCTIONS

  //HandleMultiplier from range
  const handleMultiplierFromRange = (value) => {
    //setMultipliear(value);
    let nMultip = toFixedTrunc(value, 4);
    if (value < 1.0102) {
      nMultip = 1.0102;
    } else if (value > 990) {
      nMultip = 990.0;
    }

    setMultipliear(toFixedTrunc(nMultip, 4));
    generateWinChance(nMultip);
  };

  //Generate multiplier
  const generateMultiplier = (winChan) => {
    let calcMultip = toFixedTrunc(HOUSE_EDGE / winChan, 4);
    setMultipliear(toFixedTrunc(calcMultip, 4));
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
  const handleMultipliear = (e) => {
    setMultipliear(e.target.value);
  };

  const handleBlurMultiplier = () => {
    let nMultip = toFixedTrunc(multipliear, 4);
    if (multipliear < 1.0102) {
      nMultip = 1.0102;
    } else if (multipliear > 990) {
      nMultip = 990.0;
    }

    setMultipliear(toFixedTrunc(nMultip, 4));
    generateWinChance(nMultip);
  };

  const handleWinChance = (e) => {
    setWinChance(e.target.value);
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
  //END GAME FUNCTIONS

  //UseEffect for automatic game
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
    const calculateProfit = () => {
      let Dec = Decimal.clone({ precision: 8 });

      if (betAmount !== "" && multipliear !== "") {
        let nProfit = new Dec(new Dec(betAmount).mul(multipliear)).sub(
          betAmount
        ); // with sub bet amount
        setProfitAmt(toFixedTrunc(nProfit, 4));
      }
    };
    calculateProfit();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [betAmount, multipliear]);

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
      dispatch(
        setResultNumber({
          result_number: null,
          win: null,
        })
      );
    };
  }, [dispatch]);

  useEffect(() => {
    const getColorR = (val1, val2) => {
      if (val1 === null) {
        setColorBorder("blue-white-200");
      } else {
        if (val2) {
          setColorBorder("green-400");
        } else {
          setColorBorder("simple-red");
        }
      }
    };

    getColorR(resultNumber, win);
  }, [resultNumber, win]);

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

    // eslint-disable-next-line
  }, [errors, dispatch]);

  //Auth modal
  const openNewModal = (modal) => {
    dispatch(setAuthOpen(true));
    dispatch(setAuthModalForm(modal));
  };

  //Stop auto
  const handleStopAuto = () => {
    clearTimeout(intervalId);
    setIsAutoOn(false);
  };

  return (
    <div className="mt-12">
      <GamePage>
        <div className="bg-theme rounded-md rounded-br-none rounded-bl-none flex-col-reverse md:flex-row flex shadow-xl">
          <div className="w-full md:w-2/6 bg-theme md:rounded-tl-md rounded-bl-md rounded-br-md md:rounded-br-none py-5 px-4">
            {/*<MenuAuto
              setActiveAuto={setActiveAuto}
              activeAuto={activeAuto}
              isAutoOn={isAutoOn}
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
                  setBetAmount(parseFloat(Math.abs(e.target.value)).toFixed(2))
                }
                readOnly={false}
                isLoading={isLoading}
                isAutoOn={isAutoOn}
                className="w-full lg:w-8/12 mr-1"
              />
              <button
                className="w-full lg:w-2/12 mt-2 lg:mt-0 py-2 lg:py-0 bg-theme text-black-400 text-sm font-medium rounded-md hover:bg-theme"
                onClick={() =>
                  isAutoOn
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
                  isAutoOn
                    ? () => {}
                    : setBetAmount(parseFloat(betAmount * 2).toFixed(2))
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
                  isLoading={isLoading}
                  onClick={() => handleBet()}
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
            <GamePanelPlus>
              <div
                className="px-5 rounded-md py-6 border-2 border-rose-300 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bgLimbo})` }}
              >
                <div className="flex justify-between  text-blue-white-200">
                  <div className="text-center text-sm">
                    <p>MULTIPLIER</p>
                    <p className="text-lg px-3 py-1 mt-1 border-2 border-blue-white-200 rounded-md">
                      {toFixedTrunc(multipliear, 2)}x
                    </p>
                  </div>
                  <div className="border-green-400 hidden"></div>
                  <div className="text-center text-sm">
                    <p>RESULT</p>
                    <p
                      className={`border-${colorBorder} text-${colorBorder} text-lg px-3 py-1 mt-1 border-2 rounded-md`}
                    >
                      {resultNumber !== null
                        ? toFixedTrunc(resultNumber, 2)
                        : "1.00"}
                      x
                    </p>
                  </div>
                </div>
                <GameResult
                  resultNumber={resultNumber}
                  win={win}
                  multiplier={multipliear}
                />
              </div>
              <div className="mt-10 bg-theme py-3 px-4 rounded-md">
                <RangeInput
                  handleMultiplierFromRange={handleMultiplierFromRange}
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
        <GameMenu isMuteOn={isMuteOn} setIsMuteOn={setIsMuteOn} game="limbo" />
        <BetHistory isAuthenticated={isAuthenticated} />
      </GamePage>
    </div>
  );
};

export default Limbo;
