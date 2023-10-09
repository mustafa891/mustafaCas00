import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../../store/wallet/walletSlice";
import Chips from "../Chips";

const DATE_OPTIONS = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

const History = () => {
  const [page, setPage] = useState(1);
  const { transactions, pageCount, totalItems, isLoading } = useSelector(
    (state) => state.wallet
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions(page));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTransactions(page));
  }, [page, dispatch]);

  const handlePageChange = ({ selected }) => {
    setPage(parseInt(selected + 1));
  };

  const getColorStatus = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "pending":
        return "text-yellow-800";
      case "refused":
        return "text-red-500";

      default:
        break;
    }
  };

  return (
    <div>
      <table className="w-full">
        <thead className="roundex-md">
          <tr className="">
            <th
              scope="col"
              className="text-sm font-semibold text-black-400 px-6 py-5 text-center"
            >
              Type
            </th>
            <th
              scope="col"
              className="text-sm font-semibold text-black-400 px-6 py-5 text-right"
            >
              Amount
            </th>
            <th
              scope="col"
              className="text-sm font-semibold text-black-400 px-6 py-5 text-right"
            >
              Date
            </th>
            <th
              scope="col"
              className="text-sm font-semibold text-black-400 px-6 py-5 text-right"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="rounded-md">
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-black-400">
                No data found
              </td>
            </tr>
          ) : (
            transactions.map((item, key) => (
              <tr
                className={`${
                  key % 2 === 0 ? "bg-theme" : "bg-theme"
                } hover:opacity-50 cursor-pointer`}
                key={key}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-center capitalize">
                  {item.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-right">
                  {parseFloat(item.amount.$numberDecimal).toFixed(4)}
                  <Chips className="inline w-4 ml-1.5" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-right">
                  {new Date(item.createdAt).toLocaleDateString(
                    "en-US",
                    DATE_OPTIONS
                  )}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right capitalize ${getColorStatus(
                    item.status
                  )}`}
                >
                  {item.status}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
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
    </div>
  );
};

export default History;
