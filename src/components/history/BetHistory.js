import { useState, useEffect, useRef, useContext } from "react";
import CoinImage from "../../assets/img/coin.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllHistory,
  getUserHistory,
  setPayloadSocket,
} from "../../store/bets/betSlice";
import YourHistory from "./YourHistory";
import { toFixedTrunc } from "../../utils/Helpers";
import { WebSocketContext } from "../../config/WebSocket";
import Badge from "../Badge";
import { setBetId, setBetOpen } from "../../store/modals/modalSlice";

const BetHistory = ({ isAuthenticated }) => {
  const { allHistory, userHistory, payloadSocket } = useSelector(
    (state) => state.bets
  );
  const dispatch = useDispatch();
  const [activeTab, setactiveTab] = useState("all");
  const count = useRef(0);

  const ws = useContext(WebSocketContext);

  useEffect(() => {
    if (payloadSocket !== null) {
      let payload = payloadSocket;
      ws.addBetHistory(payload);
      setPayloadSocket(null);
    }
  }, [dispatch, payloadSocket, ws]);

  useEffect(() => {
    dispatch(getAllHistory());
  }, [dispatch]);

  useEffect(() => {
    if (activeTab === "your_bets" && count.current === 0) {
      dispatch(getUserHistory());
      count.current++;
    }
  }, [dispatch, activeTab]);

  const handleOpenBet = (betid) => {
    dispatch(setBetId(betid));
    dispatch(setBetOpen(true));
  };

  const ActiveTabRender = () => {
    const ImageComponent = (game) => {
      let imageResponse;

      switch (game) {
        case "hilo":
          imageResponse = (
            <i className="fa-solid fa-down-left-and-up-right-to-center mr-5"></i>
          );
          break;
        case "cases":
            imageResponse = <i className="fa-solid fa-box-open mr-5"></i>;
            break;
        case "dice":
          imageResponse = <i className="fa-solid fa-dice-five mr-5"></i>;
          break;
        case "roulette":
          imageResponse = (
            <i className="fa-solid fa-arrow-up-wide-short mr-5"></i>
          );
          break;
        case "limbo":
          imageResponse = <i className="fa-solid fa-bullseye mr-5"></i>;
          break;
        case "crash":
          imageResponse = <i className="fa-solid fa-chart-line mr-5"></i>;
          break;

        default:
          break;
      }

      return imageResponse;
    };

    if (activeTab === "all") {
      return (
        <>
          <div className="flex justify-center">
            <table className="w-full">
              <thead className="rounded-md">
                <tr className="">
                  <th
                    scope="col"
                    className="text-sm font-semibold text-black-400 px-6 py-5 text-left"
                  >
                    Game
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-semibold text-black-400 px-6 py-5 text-center hidden lg:block"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-semibold text-black-400 px-6 py-5 text-right"
                  >
                    Bet Amount
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-semibold text-black-400 px-6 py-5 text-right hidden lg:block"
                  >
                    Multiplier
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-semibold text-black-400 px-6 py-5 text-right"
                  >
                    Profit
                  </th>
                </tr>
              </thead>
              <tbody className="rounded-md">
                {allHistory.length > 0 ? (
                  allHistory.map((item, index) => (
                    <tr
                      className={`${
                        index % 2 === 0
                          ? "bg-theme"
                          : "bg-theme"
                      } hover:opacity-50 cursor-pointer`}
                      key={index}
                      onClick={() => handleOpenBet(item._id)}
                    >
                      <td
                        className={`${
                          index % 2 !== 0 && "rounded-tl-md rounded-bl-md"
                        } px-6 py-4 text-sm text-black-300 left`}
                      >
                        {ImageComponent(item.game)}
                        <span className="capitalize font-medium">
                          {item.game}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-center hidden lg:block">
                        {item?.user?.private_profile ? (
                          <p>
                            <i className="fa-solid fa-user-secret mr-2"></i>
                            Hidden
                          </p>
                        ) : (
                          <>
                            <Badge level={item?.user?.level} size="w-5" />
                            {item.user?.username}
                          </>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-right">
                        {toFixedTrunc(item.bet_amount, 4)}
                        <img
                          src={CoinImage}
                          className="w-5 inline-block ml-2"
                          alt="Coin"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-right hidden lg:block">
                        {toFixedTrunc(item.multiplier, 2)}x
                      </td>
                      <td
                        className={`${
                          index % 2 !== 0 && "rounded-tr-md rounded-br-md"
                        } ${
                          parseFloat(item.profit) > 0
                            ? "text-green-400"
                            : "text-black-400"
                        } px-6 py-4 whitespace-nowrap text-sm font-medium text-right`}
                      >
                        {item.profit}
                        <img
                          src={CoinImage}
                          className="w-5 inline-block ml-2"
                          alt="Coin"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-rose-600">
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black-300 w-1/2 text-center"
                      colSpan="5"
                    >
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      );
    } else if (activeTab === "your_bets") {
      return <YourHistory userHistory={userHistory} />;
    }
  };

  return (
    <>
      <div className="flex justify-start mb-2 ">
        <div className="bg-theme px-1 py-1 rounded-full inline-block">
          <div className="flex text-sm">
            <div
              className={`${
                activeTab === "all" && "bg-theme"
              } px-8 py-2 text-black-300 rounded-full cursor-pointer`}
              onClick={() => setactiveTab("all")}
            >
              All Bets{" "}
              <span className="ml-2 text-xs">
                <i className="fa-solid fa-circle mr-1 text-green-600 fa-xs fa-beat-fade"></i>
                Live
              </span>
            </div>
            {isAuthenticated && (
              <div
                className={`${
                  activeTab === "your_bets" && "bg-theme"
                } px-8 py-2 text-black-300 rounded-full cursor-pointer`}
                onClick={() => setactiveTab("your_bets")}
              >
                Your Bets
              </div>
            )}
          </div>
        </div>
      </div>
      <ActiveTabRender />
    </>
  );
};

export default BetHistory;
