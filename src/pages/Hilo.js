import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaySound from "../assets/sounds/card.mp3";
import UpImage from "../assets/img/up-arrow.png";
import DownImage from "../assets/img/down-arrow.png";
import EqualsImage from "../assets/img/equals.png";
import EqualsYImage from "../assets/img/equals-y.png";
import ButtonGreen from "../components/template/buttons/ButtonGreen";
import GamePage from "../components/template/Games/GamePage";
import GamePanel from "../components/template/Games/GamePanel";
import GamePanelPlus from "../components/template/Games/GamePanelPlus";
//import GameTitle from "../components/template/Games/GameTitle";
import Input from "../components/template/Inputs/Input";
import Label from "../components/template/Inputs/Label";
import { setAuthModalForm, setAuthOpen } from "../store/modals/modalSlice";

import Card from "../components/hilo/Card";
import GameMenu from "../components/GameMenu";
import {
  getBaseCard,
  skipCard,
  startHiloGameRequest,
  cashoutHiloRequest,
  sendRequestHilo,
  resetHistoryCard,
} from "../store/games/hiloSlice";
import { toFixedTrunc } from "../utils/Helpers";
import BackCard from "../components/hilo/BackCard";
import Decimal from "decimal.js";
import BetHistory from "../components/history/BetHistory";
import { toast } from "react-hot-toast";

const HOUSE_EDGE = 99;

const GAME_CASES = [
  //CASE FOR NUMBER 2
  {
    text_higher: "HIGHER OR SAME",
    text_lower: "LOWER OR SAME",
    profit_higher: 92.31,
    profit_lower: 15.38,
  },
  //CASE FOR NUMBER 3
  {
    text_higher: "HIGHER OR SAME",
    text_lower: "LOWER OR SAME",
    profit_higher: 84.62,
    profit_lower: 23.08,
  },
  //CASE FOR NUMBER 4
  {
    text_higher: "HIGHER OR SAME",
    text_lower: "LOWER OR SAME",
    profit_higher: 76.92,
    profit_lower: 30.77,
  },
  //CASE FOR NUMBER 5
  {
    text_higher: "HIGHER OR SAME",
    text_lower: "LOWER OR SAME",
    profit_higher: 69.23,
    profit_lower: 38.46,
  },
  //CASE FOR NUMBER 6
  {
    text_higher: "HIGHER OR SAME",
    text_lower: "LOWER OR SAME",
    profit_higher: 61.54,
    profit_lower: 46.15,
  },
  //CASE FOR NUMBER 7
  {
    text_higher: "HIGHER OR SAME",
    text_lower: "LOWER OR SAME",
    profit_higher: 53.85,
    profit_lower: 53.85,
  },
  //CASE FOR NUMBER 8
  {
    text_higher: "HIGHER OR SAME",
    text_lower: "LOWER OR SAME",
    profit_higher: 46.15,
    profit_lower: 61.54,
  },
  //CASE FOR NUMBER 9
  {
    text_higher: "HIGHER OR SAME",
    text_lower: "LOWER OR SAME",
    profit_higher: 38.46,
    profit_lower: 69.23,
  },
  //CASE FOR NUMBER 10
  {
    text_higher: "HIGHER OR SAME",
    text_lower: "LOWER OR SAME",
    profit_higher: 30.77,
    profit_lower: 76.92,
  },
  //CASE FOR J
  {
    text_higher: "HIGHER OR SAME",
    text_lower: "LOWER OR SAME",
    profit_higher: 23.08,
    profit_lower: 84.62,
  },
  //CASE FOR Q
  {
    text_higher: "HIGHER OR SAME",
    text_lower: "LOWER OR SAME",
    profit_higher: 15.38,
    profit_lower: 92.31,
  },
  //CASE FOR K
  {
    text_higher: "SAME",
    text_lower: "LOWER",
    profit_higher: 7.69,
    profit_lower: 92.31,
  },
  //CASE FOR A
  {
    text_higher: "HIGHER",
    text_lower: "SAME",
    profit_higher: 92.31,
    profit_lower: 7.69,
  },
];

const Hilo = () => {
  const [isMuteOn, setIsMuteOn] = useState(false);
  const [betAmount, setBetAmount] = useState("0.50");
  const [multiplier, setMultiplier] = useState({
    higher: 0.0,
    lower: 0.0,
  });
  const [profit, setProfit] = useState({
    profit_higher: "0.0000",
    profit_lower: "0.0000",
  });
  const [isShowingCard, setIsShowingCard] = useState(false);

  //State cases
  const [gameCase, setGameCase] = useState({
    text_higher: "WAITING...",
    text_lower: "WAITING...",
    profit_higher: 0,
    profit_lower: 0,
  });

  const {
    errors,
    isLoading,
    isPlaying,
    baseCard,
    bet_amount: BetAmountPlaying,
    final_profit,
    historyCards,
    gameStatus,
    gameMessage,
  } = useSelector((state) => state.hilo);
  const { isAuthenticated } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const soundPlay = new Audio(PlaySound);

  //GAME CASES
  useEffect(() => {
    switch (baseCard) {
      case 0:
      case 1:
      case 2:
      case 3:
        setGameCase(GAME_CASES[0]);
        break;
      case 4:
      case 5:
      case 6:
      case 7:
        setGameCase(GAME_CASES[1]);
        break;
      case 8:
      case 9:
      case 10:
      case 11:
        setGameCase(GAME_CASES[2]);
        break;
      case 12:
      case 13:
      case 14:
      case 15:
        setGameCase(GAME_CASES[3]);
        break;
      case 16:
      case 17:
      case 18:
      case 19:
        setGameCase(GAME_CASES[4]);
        break;
      case 20:
      case 21:
      case 22:
      case 23:
        setGameCase(GAME_CASES[5]);
        break;
      case 24:
      case 25:
      case 26:
      case 27:
        setGameCase(GAME_CASES[6]);
        break;
      case 28:
      case 29:
      case 30:
      case 31:
        setGameCase(GAME_CASES[7]);
        break;
      case 32:
      case 33:
      case 34:
      case 35:
        setGameCase(GAME_CASES[8]);
        break;
      case 36:
      case 37:
      case 38:
      case 39:
        setGameCase(GAME_CASES[9]);
        break;
      case 40:
      case 41:
      case 42:
      case 43:
        setGameCase(GAME_CASES[10]);
        break;
      case 44:
      case 45:
      case 46:
      case 47:
        setGameCase(GAME_CASES[11]);
        break;
      case 48:
      case 49:
      case 50:
      case 51:
        setGameCase(GAME_CASES[12]);
        break;

      default:
        break;
    }
  }, [baseCard]);

  useEffect(() => {
    //Generate multiplier
    const generateMultiplier = (winChan) => {
      let calcMultip = toFixedTrunc(HOUSE_EDGE / winChan, 4);
      return toFixedTrunc(calcMultip, 4);
    };

    const calculateProfit = () => {
      let Dec = Decimal.clone({ precision: 8 });

      if (
        betAmount !== "" &&
        gameCase.profit_higher !== 0 &&
        gameCase.profit_lower !== 0
      ) {
        let nProfitH = new Dec(
          new Dec(betAmount).mul(generateMultiplier(gameCase.profit_higher))
        ).sub(betAmount);
        let nProfitL = new Dec(
          new Dec(betAmount).mul(generateMultiplier(gameCase.profit_lower))
        ).sub(betAmount);
        setProfit({
          profit_higher: toFixedTrunc(nProfitH, 4),
          profit_lower: toFixedTrunc(nProfitL, 4),
        });
      }
    };

    if (gameCase.text_higher !== "WAITING") {
      let valHigher = generateMultiplier(gameCase.profit_higher);
      let valLower = generateMultiplier(gameCase.profit_lower);
      setMultiplier({
        higher: valHigher,
        lower: valLower,
      });
      calculateProfit();
    }
  }, [gameCase, betAmount]);

  //Update bet amount if is playing
  useEffect(() => {
    if (BetAmountPlaying !== null) {
      setBetAmount(BetAmountPlaying);
    }
    if (isPlaying) {
      setIsShowingCard(true);
    }
  }, [BetAmountPlaying, isPlaying]);

  useEffect(() => {
    dispatch(getBaseCard());
    if (!isPlaying) {
      dispatch(resetHistoryCard());
    }
    // eslint-disable-next-line
  }, [dispatch]);

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

  //Skip Card
  const handleSkipCard = () => {
    if (!isMuteOn) soundPlay.play();
    dispatch(skipCard());
  };

  //Handle start new game
  const handleStartGame = () => {
    dispatch(resetHistoryCard());
    dispatch(getBaseCard());
    setIsShowingCard(false);

    setTimeout(() => {
      if (!isMuteOn) soundPlay.play();
      setIsShowingCard(true);
    }, 500);
    dispatch(
      startHiloGameRequest({
        bet_amount: betAmount,
      })
    );
  };

  //Handle cashout
  const handleCashout = () => {
    dispatch(cashoutHiloRequest());
  };

  //Handle Bet Hi or Lo
  const handleBetHiLo = (bet) => {
    if (!isMuteOn) soundPlay.play();
    dispatch(
      sendRequestHilo({
        bet,
        bet_amount: betAmount,
      })
    );
  };

  //Auth modal
  const openNewModal = (modal) => {
    dispatch(setAuthOpen(true));
    dispatch(setAuthModalForm(modal));
  };

  return (
    <div className="mt-12">
      <GamePage>
        <div className="bg-theme rounded-md rounded-br-none rounded-bl-none flex-col-reverse md:flex-row flex shadow-md">
          <div className="w-full md:w-2/6 bg-theme md:rounded-tl-md rounded-bl-md rounded-br-md md:rounded-br-none py-5 px-4">
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
                readOnly={isPlaying}
                isLoading={isLoading}
                isAutoOn={false}
                className="w-full lg:w-8/12 mr-1"
              />
              <button
                className="w-full lg:w-2/12 mt-2 lg:mt-0 py-2 lg:py-0 bg-theme text-black-400 text-sm font-medium rounded-md hover:bg-theme"
                onClick={() =>
                  setBetAmount(parseFloat(betAmount / 2).toFixed(2))
                }
                disabled={isLoading || isPlaying ? true : false}
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
                disabled={isLoading || isPlaying ? true : false}
              >
                2x
              </button>
            </div>
            <Label text="Final Profit" />
            <Input
              type="number"
              name="profit_amt"
              icon="coins"
              placeholder="0.0000"
              value={final_profit}
              readOnly={true}
              className="w-full"
            />
            <ButtonGreen
              type="button"
              text="Skip Card"
              icon="fa-angles-right"
              className={`${
                isPlaying ? "" : "opacity-50 hover:opacity-50 cursor-default"
              } py-3 bg-theme text-black-300`}
              onClick={handleSkipCard}
              disabled={!isPlaying}
            />
            {isAuthenticated ? (
              isPlaying ? (
                <ButtonGreen
                  type="button"
                  text="Cashout"
                  icon="fa-sack-dollar"
                  isLoading={isLoading}
                  onClick={handleCashout}
                />
              ) : (
                <ButtonGreen
                  type="button"
                  text="Bet"
                  icon="fa-play"
                  isLoading={isLoading}
                  onClick={handleStartGame}
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
            <button
              type="button"
              className={`${
                isPlaying
                  ? "hover:opacity-100 opacity-80"
                  : "hover:opacity-50 opacity-50 cursor-default"
              } py-3 template-btn-white text-black-800 mt-4 w-full bg-blue-white-200  tracking-widest font-semibold text-sm rounded`}
              disabled={!isPlaying}
              onClick={() => handleBetHiLo("hi")}
            >
              <span>{gameCase.text_higher}</span>
              {gameCase.text_higher === "SAME" ? (
                <img src={EqualsYImage} className="w-5 mx-2" alt="Higher" />
              ) : (
                <img src={UpImage} className="w-5 mx-2" alt="Higher" />
              )}
              <span>{gameCase.profit_higher}%</span>
            </button>
            <button
              type="button"
              className={`${
                isPlaying
                  ? "hover:opacity-100 opacity-80"
                  : "hover:opacity-50 opacity-50 cursor-default"
              } py-3 template-btn-white text-black-800 mt-4 w-full bg-blue-white-200  tracking-widest font-semibold text-sm rounded`}
              disabled={!isPlaying}
              onClick={() => handleBetHiLo("lo")}
            >
              <span>{gameCase.text_lower}</span>
              {gameCase.text_lower === "SAME" ? (
                <img src={EqualsImage} className="w-5 mx-2" alt="Lower" />
              ) : (
                <img
                  src={DownImage}
                  className="w-5 mx-2 rotate-180"
                  alt="Lower"
                />
              )}
              <span>{gameCase.profit_lower}%</span>
            </button>
          </div>
          <GamePanel>
            <GamePanelPlus>
              <div className="relative mt-8">
                {gameStatus === "loss" || gameStatus === "win" ? (
                  <div
                    className={`flex justify-center mb-5 absolute -top-12 left-1/2 -translate-x-1/2 -translate-y-1/2`}
                  >
                    <div
                      className={`bg-theme px-8 py-5 font-medium border ${
                        gameMessage === "You Lose"
                          ? "border-roulette-red-300 text-roulette-red-300"
                          : "border-roulette-green-300 text-roulette-green-300"
                      } text-lg rounded-md text-center relative`}
                    >
                      {gameMessage !== null && (
                        <span className="items-center">{gameMessage}</span>
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="flex justify-between items-center select-none flex-col lg:flex-row space-y-4 lg:space-y-0">
                  <div>
                    <div className="border border-gray-300 pl-5 pr-16 rounded-xl py-4 text-black-300 opacity-75">
                      <p className="text-4xl font-semibold">K</p>
                      <p className="text-4xl pt-2 border-t-2 border-gray-300 mt-8">
                        <i className="fa-solid fa-arrow-up"></i>
                      </p>
                    </div>
                  </div>
                  {isShowingCard ? (
                    <Card cardNumber={baseCard} />
                  ) : (
                    <BackCard />
                  )}
                  <div>
                    <div className="border border-gray-300 pl-5 pr-16 rounded-xl py-4 text-black-300 opacity-75">
                      <p className="text-4xl font-semibold">A</p>
                      <p className="text-4xl pb-2 border-b-2 border-gray-300 mt-8">
                        <i className="fa-solid fa-arrow-down"></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row justify-center my-8 px-6 bg-theme pb-5 rounded-md lg:space-x-4 space-y-2 lg:space-y-0">
                <div className="w-full lg:w-1/2">
                  <Label text={`Profit Higher (${multiplier.higher}x)`} />
                  <Input
                    type="number"
                    name="profit_higher"
                    icon="coins"
                    placeholder="0.0000"
                    defaultValue={profit.profit_higher}
                    readOnly={true}
                    className="w-full"
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <Label text={`Profit Lower (${multiplier.lower}x)`} />
                  <Input
                    type="number"
                    name="profit_lower"
                    icon="coins"
                    placeholder="0.0000"
                    defaultValue={profit.profit_lower}
                    readOnly={true}
                    className="w-full"
                  />
                </div>
              </div>
            </GamePanelPlus>
            <div className="grid">
              <div className="wrap-card-small">
                <div className="wrap-card-small-2">
                  <div className="card-scroll-small">
                    <div className="card-slide-down">
                      {historyCards.map((item, key) => (
                        <Card
                          key={key}
                          position={key}
                          cardNumber={item}
                          isSmall={true}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/*<div className="flex justify-center flex-nowrap bg-theme mx-auto rounded-md px-3 py-4 w-full overflow-x-scroll">
                <div className="flex justify-center space-x-3 items-center select-none flex-nowrap">
                  {historyCards.map((item, key) => (
                    <Card key={key} cardNumber={item} isSmall={true} />
                  ))}
                </div>
              </div> */}
            </div>
          </GamePanel>
        </div>
        <GameMenu isMuteOn={isMuteOn} setIsMuteOn={setIsMuteOn} game="hilo" />
        <BetHistory isAuthenticated={isAuthenticated} />
      </GamePage>
    </div>
  );
};

export default Hilo;
