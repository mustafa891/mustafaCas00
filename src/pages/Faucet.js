import { useContext, useEffect, useState } from "react";
import clientAxios from "../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  sendRequestFaucet,
  setRollNumber,
  hideAlerts,
  setPayloadSocket,
} from "../store/games/faucetSlice";
import {
  setAuthModalForm,
  setAuthOpen,
  setFairnessOpen,
} from "../store/modals/modalSlice";
import History from "../components/faucet/History";

import CoinImage from "../assets/img/coin.png";
import { WebSocketContext } from "../config/WebSocket";
import GamePage from "../components/template/Games/GamePage";
import GameTitle from "../components/template/Games/GameTitle";
import ButtonGreen from "../components/template/buttons/ButtonGreen";

const Faucet = () => {
  const { errors, isLoading, message, rollNumber, payloadSocket } = useSelector(
    (state) => state.faucet
  );
  const {
    isAuthenticated,
    user,
    isLoading: loadingAuth,
  } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [faucetSettings, setFaucetSettings] = useState({});
  const [number1, setNumber1] = useState(null);
  const [number2, setNumber2] = useState(null);
  const [number3, setNumber3] = useState(null);
  const [number4, setNumber4] = useState(null);
  //const [diffMinsState, setDiffMinsState] = useState(null);
  const [faucetReady, setFaucetReady] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  const ws = useContext(WebSocketContext);

  useEffect(() => {
    if (payloadSocket !== null) {
      let payload = payloadSocket;
      ws.addFaucetHistory(payload);
      setPayloadSocket(null);
    }
  }, [dispatch, payloadSocket, ws]);

  useEffect(() => {
    return () => {
      dispatch(setRollNumber(null));
      dispatch(hideAlerts());
    };
  }, [dispatch]);

  useEffect(() => {
    //Get Settings
    const getSettings = async () => {
      const response = await clientAxios.get("/api/settings/faucet_settings");

      if (response && response.data) {
        setFaucetSettings(response.data.data);
      }
    };
    getSettings();
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
    if (message !== null) {
      setFaucetReady(false);
    }
    // eslint-disable-next-line
  }, [errors, message]);

  useEffect(() => {
    if (rollNumber !== null) {
      let numStr = rollNumber.toString();
      const incNbrRec = (i, endNbr, posi) => {
        if (i <= endNbr) {
          switch (posi) {
            case 1:
              setNumber1(i);
              break;
            case 2:
              setNumber2(i);
              break;
            case 3:
              setNumber3(i);
              break;
            case 4:
              setNumber4(i);
              break;
            default:
              break;
          }
          setTimeout(function () {
            //Delay a bit before calling the function again.
            incNbrRec(i + 1, endNbr, posi);
          }, 100);
        }
      };
      //number1
      incNbrRec(0, parseInt(numStr[0]), 1);
      //number2
      incNbrRec(0, parseInt(numStr[1]), 2);
      //number3
      incNbrRec(0, parseInt(numStr[2]), 3);
      //number4
      incNbrRec(0, parseInt(numStr[3]), 4);
    }
  }, [rollNumber]);

  //Load Timer
  useEffect(() => {
    const dateServer = new Date(user?.last_claim);
    const dateNow = new Date(Date.now());
    const diffMs = dateNow.getTime() - dateServer.getTime();

    //const diffMins = Math.floor(diffMs / 60000); //Diff minutes
    //const diffSecs = Math.ceil(diffMins * 60);
    //setDiffMinsState(diffMins);

    let duration = faucetSettings.claim_time * 60 - diffMs / 1000;
    //console.log(duration);

    let timer = duration,
      minutes,
      seconds;
    let timeLeft = {};
    var intTimer = setInterval(() => {
      if (!isNaN(timer)) {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timeLeft = {
          minutes,
          seconds,
        };
        setTimeLeft(timeLeft);
        //console.log(timer);
      }
      if (--timer < 0) {
        setFaucetReady(true);
        clearInterval(intTimer);
      }
    }, 1000);
  }, [user, faucetSettings]);

  const openNewModal = (modal) => {
    dispatch(setAuthOpen(true));
    dispatch(setAuthModalForm(modal));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendRequestFaucet());
  };

  const openFairnessModal = () => {
    dispatch(setFairnessOpen({ status: true, game: "faucet" }));
  };

  const ButtonRoll = () => {
    if (faucetReady) {
      return (
        <form onSubmit={(e) => handleSubmit(e)} className="w-1/4">
          <ButtonGreen
            type="submit"
            text="Free Roll"
            icon="fa-arrow-up-9-1"
            isLoading={isLoading}
          />
        </form>
      );
    } else {
      return (
        <>
          {timeLeft === null ? (
            <p className="text-center text-3xl mb-2 text-black-300">
              <i className="fa-solid fa-spinner fa-spin"></i>
            </p>
          ) : (
            <div className="text-black-300 text-lg bg-theme px-16 py-4 rounded">
              <p className="text-center text-3xl mb-2">
                <i className="fa-regular fa-clock fa-fade"></i>
              </p>
              <p className="">
                Please wait{" "}
                <span className="font-semibold text-green-light-200">
                  {`${timeLeft.minutes}:${timeLeft.seconds}`}{" "}
                </span>
                minutes for next claim...
              </p>
            </div>
          )}
        </>
      );
    }
  };

  const BtnRollAuth = () => {
    if (loadingAuth) {
      return (
        <p className="text-center text-3xl mb-2 text-black-300">
          <i className="fa-solid fa-spinner fa-spin"></i>
        </p>
      );
    } else {
      return (
        <ButtonGreen
          type="button"
          text="Play"
          icon="fa-play"
          onClick={() => openNewModal("login")}
          isLoading={false}
        />
      );
    }
  };

  return (
    <>
      <GamePage>
        <div className="flex justify-center mt-12">
          <div className="w-1/2">
            <div className="float-right text-black-300 px-5 py-1.5 bg-theme rounded-tr-lg rounded-tl-lg">
              <p
                className="hover:opacity-50 cursor-pointer text-sm"
                onClick={() => openFairnessModal()}
              >
                <i className="fa-solid fa-scale-balanced"></i> Fairness
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-0">
          <table className="w-1/2">
            <thead className="bg-green-light-200 border-b border-rose-300">
              <tr>
                <th
                  scope="col"
                  className="text-md rounded-tl-md font-semibold border border-rose-300 text-dark-green-500  uppercase px-6 py-4 text-center w-1/2"
                >
                  Lucky Number
                </th>
                <th
                  scope="col"
                  className="text-md font-semibold border border-rose-300 text-dark-green-500  uppercase px-6 py-4 text-center w-1/2"
                >
                  Payout
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-theme border-rose-300">
                <td className="px-6 py-4 whitespace-nowrap border border-rose-300 text-sm font-medium text-black-300 w-1/2 text-center">
                  0 - 9885
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-rose-300 text-sm font-medium text-black-300 w-1/2 text-center">
                  {parseFloat(faucetSettings.level_1).toFixed(4)}
                  <img
                    className="w-5 inline ml-2"
                    src={CoinImage}
                    alt="coins"
                  />
                </td>
              </tr>
              <tr className="bg-theme border-rose-300">
                <td className="px-6 py-4 whitespace-nowrap border border-rose-300 text-sm font-medium text-black-300 w-1/2 text-center">
                  9886 - 9985
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-rose-300 text-sm font-medium text-black-300 w-1/2 text-center">
                  {parseFloat(faucetSettings.level_2).toFixed(4)}
                  <img
                    className="w-5 inline ml-2"
                    src={CoinImage}
                    alt="coins"
                  />
                </td>
              </tr>
              <tr className="bg-theme border-rose-300">
                <td className="px-6 py-4 whitespace-nowrap border border-rose-300 text-sm font-medium text-black-300 w-1/2 text-center">
                  9986 - 9993
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-rose-300 text-sm font-medium text-black-300 w-1/2 text-center">
                  {parseFloat(faucetSettings.level_3).toFixed(4)}
                  <img
                    className="w-5 inline ml-2"
                    src={CoinImage}
                    alt="coins"
                  />
                </td>
              </tr>
              <tr className="bg-theme border-rose-300">
                <td className="px-6 py-4 whitespace-nowrap border border-rose-300 text-sm font-medium text-black-300 w-1/2 text-center">
                  9994 - 9997
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-rose-300 text-sm font-medium text-black-300 w-1/2 text-center">
                  {parseFloat(faucetSettings.level_4).toFixed(4)}
                  <img
                    className="w-5 inline ml-2"
                    src={CoinImage}
                    alt="coins"
                  />
                </td>
              </tr>
              <tr className="bg-theme border-rose-300">
                <td className="px-6 py-4 whitespace-nowrap border border-rose-300 text-sm font-medium text-black-300 w-1/2 text-center">
                  9998 - 9999
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-rose-300 text-sm font-medium text-black-300 w-1/2 text-center">
                  {parseFloat(faucetSettings.level_5).toFixed(4)}
                  <img
                    className="w-5 inline ml-2"
                    src={CoinImage}
                    alt="coins"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {rollNumber !== null && (
          <div className="flex justify-center mt-8">
            <div className="px-8 py-3 bg-theme rounded-md">
              <span className="text-6xl font-bold text-green-400">
                {number1}
              </span>
              <span className="text-6xl font-bold text-green-400">
                {number2}
              </span>
              <span className="text-6xl font-bold text-green-400">
                {number3}
              </span>
              <span className="text-6xl font-bold text-green-400">
                {number4}
              </span>
            </div>
          </div>
        )}
        {message !== null && (
          <div className="flex justify-center mt-8">
            <div className="w-1/3 bg-theme py-3 shadow-md rounded px-5 text-center font-semibold text-green-400">
              {message}{" "}
              <img className="w-5 inline ml-2" src={CoinImage} alt="coins" />
            </div>
          </div>
        )}
        <div className="flex justify-center mt-8">
          {isAuthenticated ? <ButtonRoll /> : <BtnRollAuth />}
        </div>
        <div className="mt-14">
          <History isAuthenticated={isAuthenticated} />
        </div>
      </GamePage>
    </>
  );
};

export default Faucet;
