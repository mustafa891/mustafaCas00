import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Badge from "../../components/Badge";
import Chips from "../../components/Chips";
import clientAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import { authenticatedFail } from "../../store/users/userSlice";
import { getTokenApi } from "../../utils/functions";
import { toFixedTrunc } from "../../utils/Helpers";

const DATE_OPTIONS = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const AdminBets = () => {
  const [bets, setBets] = useState([]);

  const dispatch = useDispatch();
  const token = getTokenApi();

  const navigate = useNavigate();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get("page") || 1;

  const getBets = async () => {
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const result = await clientAxios.get(
          `/api/admin/bets?page=${page}&limit=20`
        );
        setBets(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBets();
  }, []);

  useEffect(() => {
    getBets();
  }, [page]);

  const handlePageChange = ({ selected }) => {
    navigate("?page=" + parseInt(selected + 1));
  };

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

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
      <div className="bg-theme border border-rose-300 shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold leading-none text-black-300">
            All Bets
          </h3>
        </div>
        <div className="flex flex-col mt-8">
          <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-theme">
                    <tr>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-black-300 uppercase tracking-wider"
                      >
                        Game
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-black-300 uppercase tracking-wider"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-black-300 uppercase tracking-wider"
                      >
                        Bet Amount
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-black-300 uppercase tracking-wider"
                      >
                        Multiplier
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-right text-xs font-medium text-black-300 uppercase tracking-wider"
                      >
                        Profit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-theme">
                    {bets.totalItems > 0 ? (
                      bets?.bets?.map((item, key) => (
                        <tr
                          className={`${
                            key % 2 === 0 ? "" : "bg-theme"
                          } hover:opacity-50`}
                          key={key}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-left">
                            {ImageComponent(item.game)}
                            <span className="capitalize font-medium">
                              {item.game}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-left">
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-left">
                            {toFixedTrunc(item.bet_amount, 4)}
                            <Chips className="w-4 inline-block ml-2" />
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm text-black-300 text-left font-semibold capitalize`}
                          >
                            {toFixedTrunc(item.multiplier, 2)}x
                          </td>
                          <td
                            className={`${
                              parseFloat(item.profit) > 0
                                ? "text-green-light-200"
                                : "text-black-400"
                            } px-6 py-4 whitespace-nowrap text-sm cursor-pointer text-right font-semibold capitalize`}
                          >
                            {item.profit}
                            <Chips className="w-4 inline-block ml-2" />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-black-400">
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full">
          <ReactPaginate
            pageCount={parseInt(bets?.totalPages || 0)}
            pageRangeDisplayed={20}
            onPageChange={handlePageChange}
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            containerClassName={"mt-10 justify-end space-x-1 pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminBets;
