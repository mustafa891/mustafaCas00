import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHistory, getUserHistory } from "../../store/games/faucetSlice";
import CoinImage from "../../assets/img/coin.png";
import YourClaims from "./YourClaims";
import Badge from "../Badge";

const History = ({ isAuthenticated }) => {
  const { allHistory, userHistory } = useSelector((state) => state.faucet);
  const dispatch = useDispatch();
  const [activeTab, setactiveTab] = useState("all");
  const count = useRef(0);

  useEffect(() => {
    dispatch(getAllHistory());
  }, [dispatch]);

  useEffect(() => {
    if (activeTab === "your_claims" && count.current === 0) {
      dispatch(getUserHistory());
      count.current++;
    }
  }, [dispatch, activeTab]);

  const ActiveTabRender = () => {
    if (activeTab === "all") {
      return (
        <>
          <div className="flex justify-center ">
            <table className="w-full">
              <thead className="rounded-md">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-semibold text-black-400 px-6 py-5 text-left"
                  >
                    Game
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-semibold text-black-400 px-6 py-5 text-center"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-semibold text-black-400 px-6 py-5 text-right"
                  >
                    Lucky Number
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-semibold text-black-400 px-6 py-5 text-right"
                  >
                    Payout
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
                    >
                      <td
                        className={`${
                          index % 2 !== 0 && "rounded-tl-md rounded-bl-md"
                        } px-6 py-4 text-sm text-black-300 left`}
                      >
                        <i className="fa-solid fa-faucet-drip mr-5"></i>
                        <span>Faucet</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-center">
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
                        {item.roll_number}
                      </td>
                      <td
                        className={`${
                          index % 2 !== 0 && "rounded-tr-md rounded-br-md"
                        } text-green-400 px-6 py-4 whitespace-nowrap text-sm font-medium text-right`}
                      >
                        +{item.payout}
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
                      colSpan="4"
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
    } else if (activeTab === "your_claims") {
      return <YourClaims userHistory={userHistory} />;
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
              All Claims{" "}
              <span className="ml-2 text-xs">
                <i className="fa-solid fa-circle mr-1 text-green-600 fa-xs fa-beat-fade"></i>
                Live
              </span>
            </div>
            {isAuthenticated && (
              <div
                className={`${
                  activeTab === "your_claims" && "bg-theme"
                } px-8 py-2 text-black-300 rounded-full cursor-pointer`}
                onClick={() => setactiveTab("your_claims")}
              >
                Your Claims
              </div>
            )}
          </div>
        </div>
      </div>
      <ActiveTabRender />
    </>
  );
};

export default History;
