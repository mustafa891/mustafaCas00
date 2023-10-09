import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import clientAxios from "../../config/axios";
import { getTokenApi } from "../../utils/functions";
import { authenticatedFail } from "../../store/users/userSlice";
import { useDispatch } from "react-redux";
import tokenAuth from "../../config/token";
import Chips from "../../components/Chips";
import { NavLink } from "react-router-dom";

const DATE_OPTIONS = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState("0.0000");
  const [totalProfit, setTotalProfit] = useState("0.0000");

  const dispatch = useDispatch();
  const token = getTokenApi();

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

  useEffect(() => {
    const getUsersChart = async () => {
      try {
        if (!token) {
          dispatch(authenticatedFail());
        } else {
          tokenAuth(token);
          const result = await clientAxios.get("/api/admin/users/get-chart");
          setUsers(result.data.data.users);
          //console.log(result.data.data.users);
          setTotalBalance(result.data.data.total_balance.$numberDecimal);
          //console.log(result.data.data.total_profit);
          setTotalProfit(result.data.data.total_profit);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getTransactions = async () => {
      try {
        if (!token) {
          dispatch(authenticatedFail());
        } else {
          tokenAuth(token);
          const result = await clientAxios.get(
            "/api/admin/transactions?page=1&limit=5"
          );
          setTransactions(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsersChart();
    getTransactions();
  }, []);

  useEffect(() => {
    const ctx = document.getElementById("usersChart");
    const labels = [];
    const data = [];

    const groups = users.reduce((groups, user) => {
      const date = user.createdAt.split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(user);
      return groups;
    }, {});

    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        users: groups[date],
      };
    });

    groupArrays?.forEach((item) => {
      const date = new Date(item.date);
      labels.push(date.toLocaleDateString());
      data.push(item.users.length);
    });

    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "# of Users",
            data: data,
            backgroundColor: "rgba(62, 74, 79, 0.5)",
            borderColor: "#387d9c",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [users]);

  return (
    <>
      <div className="w-full grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-4 mb-5">
        <div className="bg-theme border border-rose-300 shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-black-300 mb-2">
                Total Users Balance
              </h3>
              <span className="text-xl font-normal text-black-400">
                <Chips className="inline w-5" /> {totalBalance}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-theme border border-rose-300 shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-black-300 mb-2">
                Total Profit
              </h3>
              <span className="text-xl font-normal text-black-400">
                <Chips className="inline w-5" /> {totalProfit}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
        <div className="bg-theme border border-rose-300 shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-black-300">
                {users?.data?.users.length}
              </span>
              <h3 className="text-base font-normal text-black-400">
                Users in last 7 days
              </h3>
            </div>
            <div className="flex-shrink-0">
              <NavLink
                to="/admin-panel/users"
                className="text-sm font-medium text-black-300 hover:bg-theme rounded-lg p-2"
              >
                View all
              </NavLink>
            </div>
          </div>
          <canvas id="usersChart" width="400" height="250"></canvas>
        </div>
        <div className="bg-theme border border-rose-300 shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-black-300 mb-2">
                Latest Transactions
              </h3>
              <span className="text-base font-normal text-black-400">
                This is a list of latest transactions
              </span>
            </div>
            <div className="flex-shrink-0">
              <NavLink
                to="/admin-panel/transactions"
                className="text-sm font-medium text-black-300 hover:bg-theme rounded-lg p-2"
              >
                View all
              </NavLink>
            </div>
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
                          className="p-4 text-left text-xs font-medium text-black-300 uppercase tracking-wider"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-theme">
                      {transactions?.data?.totalItems > 0 ? (
                        transactions?.data?.transactions?.map((item, key) => (
                          <tr
                            className={`${
                              key % 2 === 0 ? "" : "bg-theme"
                            } hover:opacity-50`}
                            key={key}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-center capitalize">
                              {item.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-right">
                              {parseFloat(item.amount.$numberDecimal).toFixed(
                                4
                              )}
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
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center text-black-400">
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
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
