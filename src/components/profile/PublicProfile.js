import { Tab } from "@headlessui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublicProfile } from "../../store/users/userSlice";
import BodyUser from "./BodyUser";
import HeaderUser from "./HeaderUser";
import CoinImage from "../../assets/img/coin.png";
import { toFixedTrunc } from "../../utils/Helpers";
import {
  setBetId,
  setBetOpen,
  setUserOpen,
} from "../../store/modals/modalSlice";

const PublicProfile = () => {
  const { userModalId } = useSelector((state) => state.modals);
  const { publicProfile } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    dispatch(getPublicProfile(userModalId));
  }, []);

  const ImageComponent = (game) => {
    let imageResponse;

    switch (game) {
      case "hilo":
        imageResponse = (
          <i className="fa-solid fa-down-left-and-up-right-to-center mr-5"></i>
        );
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

      default:
        break;
    }

    return imageResponse;
  };

  const handleOpenBet = (betid) => {
    dispatch(setUserOpen(false));
    dispatch(setBetId(betid));
    setTimeout(() => {
      dispatch(setBetOpen(true));
    }, 600);
  };

  return (
    <>
      <HeaderUser
        level={publicProfile?.level}
        username={publicProfile?.username}
        user_id={publicProfile?.id}
        isPublic={true}
      />
      <BodyUser
        wagared={publicProfile?.wagared}
        bets={publicProfile?.bets}
        created={publicProfile?.created}
      />
      <div className="mt-5">
        <Tab.Group>
          <Tab.List className="flex justify-center text-sm w-full">
            <div className="bg-theme px-1 py-1 rounded-full inline-block w-full">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-2 text-black-300 rounded-full cursor-pointer focus:outline-none",
                    selected ? "bg-theme" : ""
                  )
                }
              >
                Last Bets
              </Tab>
            </div>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="flex justify-center ">
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
                        className="text-sm font-semibold text-black-400 px-6 py-5 text-right"
                      >
                        Bet Amount
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
                    {publicProfile?.bets_history?.length > 0 ? (
                      publicProfile?.bets_history.map((item, index) => (
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-right">
                            {toFixedTrunc(item.bet_amount, 4)}
                            <img
                              src={CoinImage}
                              className="w-5 inline-block ml-2"
                              alt="Coin"
                            />
                          </td>
                          <td
                            className={`${
                              index % 2 !== 0 && "rounded-tr-md rounded-br-md"
                            } ${
                              parseFloat(item.profit) > 0
                                ? "text-green-light-200"
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
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default PublicProfile;
