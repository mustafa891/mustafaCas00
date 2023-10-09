import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Bonusesimage from "../assets/img/bonuses-header.svg";
import CoinImage from "../assets/img/coin.png";
import ButtonGreen from "../components/template/buttons/ButtonGreen";
import {
  claimAffiliatesRewards,
  getAffiliates,
  hideAlerts,
} from "../store/affiliates/affiliateSlice";
import { getBonusesBalances } from "../store/users/userSlice";

const DATE_OPTIONS = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const Affiliates = () => {
  const { isLoading, affiliates, pageCount, totalItems, errors, message } =
    useSelector((state) => state.affiliates);
  const { user, bonusesUser } = useSelector((state) => state.users);
  const { generalSettings } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    loadData();
    dispatch(getBonusesBalances());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [page]);

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
    if (message !== null) {
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
    }
    // eslint-disable-next-line
  }, [errors, message, dispatch]);

  function loadData() {
    // get page of items from api
    dispatch(getAffiliates(page));
  }

  const handlePageChange = ({ selected }) => {
    navigate("?page=" + parseInt(selected + 1));
  };

  const handleClaimRewards = () => {
    dispatch(claimAffiliatesRewards());
  };

  return (
    <>
      <div className="py-5 px-5">
        <div className="mt-10 relative">
          <img
            className="rounded-lg mx-auto"
            src={Bonusesimage}
            alt="Bonuses header"
          />
          <p className="absolute bottom-32 left-16 uppercase text-blue-white-200 text-3xl text-shadow-game">
            INVITE AND EARN
          </p>
          <p className="absolute bottom-24 left-16 uppercase  text-blue-white-200 text-xl text-shadow-game">
            Invite players and earn from every bet your friends place!
          </p>
        </div>
        <div className="flex space-x-4 mt-16">
          <div className="bg-theme rounded-xl w-2/3">
            <p className="text-left py-3 text-blue-white-200 text-lg mt-2 pl-6">
              <i className="fa-solid fa-link mr-2 text-dark-green-200 p-2 bg-green-light-200 rounded-full"></i>
              Invitation Link
            </p>
            <div className=" text-center mt-3 text-2xl">
              <span className="px-4 pb-2 pt-3 bg-theme rounded-lg text-lg text-green-light-200 border border-rose-300">
                https://{generalSettings?.site_domain}/?ref={user?.id}
              </span>
            </div>
            <div className="uppercase  text-center mt-8 mb-8 text-md">
              <span className="mr-2.5 text-black-300">Referrals:</span>
              <span className="px-4 pb-2 pt-3 bg-theme text-black-200 rounded-lg border border-rose-300">
                {totalItems}
              </span>
            </div>
          </div>
          <div className="bg-theme rounded-xl w-1/3">
            <p className="text-left py-3 text-blue-white-200 text-lg mt-2 pl-6">
              <i className="fa-solid fa-percent mr-2 text-dark-green-200 p-2 bg-green-light-200 rounded-full"></i>
              Rewards
            </p>
            <div className=" text-center mt-8 text-lg">
              <span className="text-blue-white-200 mr-2">Get</span>
              <span className="px-4 pb-2 pt-3 bg-theme text-xl rounded-lg text-green-light-200 border border-rose-300">
                {generalSettings.affiliates_earning}%
              </span>
              <span className="text-blue-white-200 ml-2">of each bet</span>
            </div>
            {/*<div className=" text-center mt-6 text-lg">
              <span className="text-blue-white-200 mr-2">2. Get</span>
              <span className="px-4 pb-2 pt-3 bg-theme text-xl rounded-lg text-green-light-200 border border-rose-300">
                10%
              </span>
              <span className="text-blue-white-200 ml-2">
                of each faucet claim
              </span>
            </div> */}
          </div>
        </div>
        <div className="flex space-x-4 mt-5">
          <div className="bg-theme rounded-xl w-1/2">
            <p className="text-left py-3 text-blue-white-200 text-lg mt-2 pl-6">
              <i className="fa-solid fa-coins mr-2 text-dark-green-200 p-2 bg-green-light-200 rounded-full"></i>
              Total earned
            </p>
            <div className=" text-center mb-6 mt-6 text-2xl">
              <span className="px-4 pb-2 pt-3 bg-theme rounded-lg text-green-light-200 border border-rose-300">
                <img
                  src={CoinImage}
                  className="w-7 inline-block mr-2 mb-1"
                  alt="Coin"
                />
                {parseFloat(bonusesUser?.affiliates?.total_earned).toFixed(4)}
              </span>
            </div>
          </div>
          <div className="bg-theme rounded-xl w-1/2">
            <p className="text-left py-3 text-blue-white-200 text-lg mt-2 pl-6">
              <i className="fa-solid fa-gift mr-2 text-dark-green-200 p-2 bg-green-light-200 rounded-full"></i>
              Redem rewards
            </p>
            <div className=" text-center mb-6 mt-2 text-2xl">
              <span className="px-4 pb-2 pt-3 bg-theme rounded-lg text-green-light-200 border border-rose-300">
                <img
                  src={CoinImage}
                  className="w-7 inline-block mr-2 mb-1"
                  alt="Coin"
                />
                {parseFloat(bonusesUser?.affiliates?.redem_rewards).toFixed(4)}
              </span>
            </div>
            <ButtonGreen
              type="button"
              text="Claim"
              icon="fa-sack-dollar"
              className="template-bg-linear-green text-dark-green-200 px-8 py-4 mt-4 w-2/3 mx-auto mb-6 template-btn-green  tracking-widest font-semibold text-md rounded hover:opacity-80"
              onClick={handleClaimRewards}
              isLoading={isLoading}
            />
          </div>
        </div>
        <p className="py-3 text-black-300  text-lg inline-block rounded-tr-full mt-10">
          <i className="fa-solid fa-users mr-2 text-dark-green-200 p-2 bg-green-light-200 rounded-full"></i>
          <span className="text-green-light-200">ALL</span> AFFILIATES
        </p>
        <div>
          <table className="w-full">
            <thead className="roundex-md">
              <tr className="">
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
                  Member since
                </th>
                <th
                  scope="col"
                  className="text-sm font-semibold text-black-400 px-6 py-5 text-right"
                >
                  Wagared
                </th>
                <th
                  scope="col"
                  className="text-sm font-semibold text-black-400 px-6 py-5 text-right"
                >
                  Total earned
                </th>
              </tr>
            </thead>
            <tbody className="rounded-md">
              {affiliates.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-black-400">
                    No data found
                  </td>
                </tr>
              ) : (
                affiliates?.map((item, key) => (
                  <tr
                    className={`${
                      key % 2 === 0 ? "bg-theme" : "bg-theme"
                    } hover:opacity-50 cursor-pointer`}
                    key={key}
                  >
                    <td className="rounded-tl-md rounded-bl-md px-6 py-4 whitespace-nowrap text-sm text-black-300 text-center">
                      {item.user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-right">
                      {new Date(item.user.createdAt).toLocaleDateString(
                        "en-US",
                        DATE_OPTIONS
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-right">
                      <img
                        src={CoinImage}
                        className="w-5 inline-block mr-2"
                        alt="Coin"
                      />
                      {parseFloat(item.user.wagared.$numberDecimal).toFixed(4)}
                    </td>
                    <td className="rounded-tr-md rounded-br-md text-black-300 px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                      <img
                        src={CoinImage}
                        className="w-5 inline-block mr-2"
                        alt="Coin"
                      />
                      {parseFloat(item.earned.$numberDecimal).toFixed(4)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end w-full">
          <ReactPaginate
            pageCount={parseInt(pageCount)}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            containerClassName={"mt-10 justify-end space-x-1 pagination"}
            activeClassName={"active"}
          />
        </div>
        {/*
        <div className="card-footer pb-0 pt-3">
          {pager.pages && pager.pages.length && (
            <ul className="pagination">
              <li
                className={`page-item first-item ${
                  pager.currentPage === 1 ? "disabled" : ""
                }`}
              >
                <Link to={{ search: `?page=1` }} className="page-link">
                  First
                </Link>
              </li>
              <li
                className={`page-item previous-item ${
                  pager.currentPage === 1 ? "disabled" : ""
                }`}
              >
                <Link
                  to={{ search: `?page=${pager.currentPage - 1}` }}
                  className="page-link"
                >
                  Previous
                </Link>
              </li>
              {pager.pages.map((page) => (
                <li
                  key={page}
                  className={`page-item number-item ${
                    pager.currentPage === page ? "active" : ""
                  }`}
                >
                  <Link to={{ search: `?page=${page}` }} className="page-link">
                    {page}
                  </Link>
                </li>
              ))}
              <li
                className={`page-item next-item ${
                  pager.currentPage === pager.totalPages ? "disabled" : ""
                }`}
              >
                <Link
                  to={{ search: `?page=${pager.currentPage + 1}` }}
                  className="page-link"
                >
                  Next
                </Link>
              </li>
              <li
                className={`page-item last-item ${
                  pager.currentPage === pager.totalPages ? "disabled" : ""
                }`}
              >
                <Link
                  to={{ search: `?page=${pager.totalPages}` }}
                  className="page-link"
                >
                  Last
                </Link>
              </li>
            </ul>
          )}
        </div>
            */}
      </div>
    </>
  );
};

export default Affiliates;
