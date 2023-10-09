import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chips from "../components/Chips";
import CrashChart from "../components/crash/CrashChart";
import GameMenu from "../components/GameMenu";
import BetHistory from "../components/history/BetHistory";
import ButtonGreen from "../components/template/buttons/ButtonGreen";
import GamePage from "../components/template/Games/GamePage";
import GamePanel from "../components/template/Games/GamePanel";
import Input from "../components/template/Inputs/Input";
import Label from "../components/template/Inputs/Label";
import {
  resetData,
  sendCashoutGame,
  sendRequestCrash,
  sendTickGame,
} from "../store/games/crashSlice";
import { setAuthModalForm, setAuthOpen } from "../store/modals/modalSlice";
import PlaySound from "../assets/sounds/mouse-click.mp3";
import SuccessSound from "../assets/sounds/success_bell.mp3";
import FailSound from "../assets/sounds/fail_bell.mp3";

let intervalId;

const Crash = () => {
  const { isPlaying, gameResult, message, amountBetGlobal, isLoading } =
    useSelector((state) => state.crash);
  const { isAuthenticated } = useSelector((state) => state.users);
  const [betAmount, setBetAmount] = useState("0.50");
  const [cashoutAt, setCashoutAt] = useState("2.0");
  const [isMuteOn, setIsMuteOn] = useState(false);
  const [gameData, setGameData] = useState([
    {
      multiplier: 0,
    },
  ]);

  const dispatch = useDispatch();

  //Handle Bet
  const handleStartGame = () => {
    if (!isMuteOn) {
      const playSound = new Audio(PlaySound);
      playSound.volume = 0.5;
      playSound.currentTime = 0;
      playSound.play();
    }
    setGameData([
      {
        multiplier: 0,
      },
    ]);
    dispatch(
      sendRequestCrash({
        bet_amount: betAmount,
        cashout_at: cashoutAt,
      })
    );
  };

  useEffect(() => {
    if (isPlaying) {
      intervalId = setInterval(() => {
        dispatch(sendTickGame(gameResult?.game));
      }, 1000);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (gameResult !== null) {
      if (gameResult?.crash_point) {
        setGameData([
          {
            multiplier: 0,
          },
          {
            multiplier: gameResult?.crash_point,
          },
        ]);
      } else {
        setGameData([
          //...gameData,
          {
            multiplier: 0,
          },
          {
            multiplier: gameResult?.multiplier,
          },
        ]);
      }
    }
  }, [gameResult]);

  useEffect(() => {
    if (message === "Lose" || message === "Win") {
      clearInterval(intervalId);
    }

    if (message === "Lose") {
      if (!isMuteOn) {
        const playSound = new Audio(FailSound);
        //playSound.volume = 0.2
        playSound.currentTime = 0;
        playSound.play();
      }
    } else if (message === "Win") {
      if (!isMuteOn) {
        const playSound = new Audio(SuccessSound);
        //playSound.volume = 0.2
        playSound.currentTime = 0;
        playSound.play();
      }
    }
  }, [message]);

  useEffect(() => {
    return () => {
      dispatch(resetData());
    };
  }, [dispatch]);

  const handleCashout = () => {
    clearInterval(intervalId);
    dispatch(sendCashoutGame(gameResult?.game));
  };

  const getColor = () => {
    if (message === "Win") {
      return "text-roulette-green-300";
    } else if (message === "Lose") {
      return "text-roulette-red-300";
    } else {
      return "text-black-100";
    }
  };

  const getBetText = () => {
    let betText = (
      <span className="items-center text-xl text-black-100 font-normal block mt-1">
        +
        {parseFloat(
          amountBetGlobal * gameResult?.multiplier - amountBetGlobal
        ).toFixed(4)}{" "}
        <Chips className="inline w-5 -mt-1" />
      </span>
    );
    if (message === "Win") {
      betText = (
        <span className="items-center text-xl text-black-100 font-normal block mt-1">
          You won +
          {parseFloat(
            amountBetGlobal * gameResult?.multiplier - amountBetGlobal
          ).toFixed(4)}{" "}
          <Chips className="inline w-5 -mt-1" />
        </span>
      );
    } else if (message === "Lose") {
      betText = (
        <span className="items-center text-xl text-black-100 font-normal block mt-1">
          You lost {parseFloat(amountBetGlobal).toFixed(4)}{" "}
          <Chips className="inline w-5 -mt-1" />
        </span>
      );
    }

    return betText;
  };

  //Auth modal
  const openNewModal = (modal) => {
    dispatch(setAuthOpen(true));
    dispatch(setAuthModalForm(modal));
  };

  return (
    <div className="mt-12">
      <GamePage>
        <div className="bg-theme rounded-md rounded-br-none rounded-bl-none flex-col-reverse md:flex-row flex shadow-lg">
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
                readOnly={false}
                isLoading={isLoading || isPlaying}
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
            <Label text="Cashout at" />
            <Input
              type="number"
              name="cashout_at"
              icon="multiplier"
              iconPosition="end"
              placeholder="0.00"
              value={cashoutAt}
              isLoading={isLoading || isPlaying}
              onChange={(e) => setCashoutAt(e.target.value)}
              onBlur={(e) =>
                setCashoutAt(parseFloat(e.target.value).toFixed(2))
              }
              className="w-full"
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
          </div>
          <GamePanel>
            <div className="relative">
              {gameResult?.crash_point && (
                <p className="text-center text-black-100 text-4xl font-semibold absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_1.2px_1.2px_rgba(1,1,1,0.8)] z-10">
                  Crashed @ {parseFloat(gameResult?.crash_point).toFixed(2)}x
                </p>
              )}
              {gameResult !== null && (
                <div
                  className={`flex justify-center mb-5 absolute top-40 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10`}
                >
                  <div
                    className={`bg-theme px-12 py-5 border-2 border-yellow-400 rounded-md text-center relative`}
                  >
                    <span
                      className={`items-center text-4xl font-medium block ${getColor()}`}
                    >
                      {gameResult?.multiplier}x
                    </span>
                    {getBetText()}
                  </div>
                </div>
              )}

              <CrashChart data={gameData} />
            </div>
          </GamePanel>
        </div>
        <GameMenu setIsMuteOn={setIsMuteOn} isMuteOn={isMuteOn} game="crash" />
        <BetHistory isAuthenticated={isAuthenticated} />
      </GamePage>
    </div>
  );
};

export default Crash;
