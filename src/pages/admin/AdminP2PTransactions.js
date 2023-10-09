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

const AdminP2PTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  const dispatch = useDispatch();
  const token = getTokenApi();

  const navigate = useNavigate();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get("page") || 1;

  const getData = async () => {
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const result = await clientAxios.get(
          `/api/admin/transactions-p2p?page=${page}&limit=20`
        );
        setTransactions(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [page]);

  const handlePageChange = ({ selected }) => {
    navigate("?page=" + parseInt(selected + 1));
  };

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
      <div className="bg-theme border border-rose-300 shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold leading-none text-black-300">
            All P2P Transactions
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
                        Type
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
                        Cashier
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-black-300 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-black-300 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-right text-xs font-medium text-black-300 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-theme">
                    {transactions.totalItems > 0 ? (
                      transactions?.transactions?.map((item, key) => (
                        <tr
                          className={`${
                            key % 2 === 0 ? "" : "bg-theme"
                          } hover:opacity-50`}
                          key={key}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-left">
                            <span className="capitalize font-medium">
                              {item.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-left">
                            <>
                              <Badge level={item?.user?.level} size="w-5" />
                              {item.user?.username}
                            </>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-left">
                            <>
                              <Badge level={item?.cashier?.level} size="w-5" />
                              {item.cashier?.username}
                            </>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-left">
                            {toFixedTrunc(item.amount.$numberDecimal, 4)}
                            <Chips className="w-4 inline-block ml-2" />
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm text-black-300 text-left font-semibold capitalize`}
                          >
                            {new Date(item.createdAt).toLocaleDateString(
                              "en-US",
                              DATE_OPTIONS
                            )}
                          </td>
                          <td
                            className={`text-black-300 px-6 py-4 whitespace-nowrap text-sm cursor-pointer text-right font-semibold capitalize`}
                          >
                            {item.status}
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
            pageCount={parseInt(transactions?.totalPages || 0)}
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

export default AdminP2PTransactions;
