import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ sideBar }) => {
  let baseClass = `text-base text-black-300 font-normal rounded-lg flex items-center p-2 hover:bg-theme group`;
  let baseActiveClass = `text-base text-black-300 font-normal rounded-lg flex items-center p-2 bg-theme group`;

  return (
    <>
      <aside
        id="sidebar"
        className={`fixed z-20 h-full top-0 left-0 pt-16 ${
          sideBar ? "flex" : "hidden lg:flex"
        } flex-shrink-0 flex-col w-64 transition-width duration-75`}
        aria-label="Sidebar"
      >
        <div className="relative flex-1 flex flex-col min-h-0 border-r border-rose-300 bg-theme pt-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 bg-theme divide-y space-y-1">
              <ul className="space-y-2 pb-2">
                <li>
                  <form action="#" method="GET" className="hidden">
                    <label htmlFor="mobile-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-black-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="email"
                        id="mobile-search"
                        className="bg-gray-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-cyan-600 block w-full pl-10 p-2.5"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </li>
                <li>
                  <NavLink
                    to="/admin-panel"
                    end
                    className={({ isActive }) =>
                      isActive ? baseActiveClass : baseClass
                    }
                  >
                    <i className="fa-solid fa-chart-pie"></i>
                    <span className="ml-3">Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin-panel/users"
                    className={({ isActive }) =>
                      isActive ? baseActiveClass : baseClass
                    }
                  >
                    <i className="fa-solid fa-users"></i>
                    <span className="ml-3">Users</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin-panel/bets"
                    className={({ isActive }) =>
                      isActive ? baseActiveClass : baseClass
                    }
                  >
                    <i className="fa-solid fa-dice-five"></i>
                    <span className="ml-3">Bets</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin-panel/transactions"
                    className={({ isActive }) =>
                      isActive ? baseActiveClass : baseClass
                    }
                  >
                    <i className="fa-solid fa-rectangle-list"></i>
                    <span className="ml-3">Transactions</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin-panel/transactions-p2p"
                    className={({ isActive }) =>
                      isActive ? baseActiveClass : baseClass
                    }
                  >
                    <i className="fa-solid fa-rectangle-list"></i>
                    <span className="ml-3">P2P Transactions</span>
                  </NavLink>
                </li>
                {/*
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="text-base text-black-300 font-normal rounded-lg w-full flex justify-between items-center p-2 hover:bg-theme group">
                        <div>
                          <i className="fa-solid fa-rectangle-list"></i>
                          <span className="ml-3">Transactions</span>
                        </div>
                        <i
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } fa-solid fa-chevron-down float-right`}
                        ></i>
                      </Disclosure.Button>
                      <Disclosure.Panel>
                        <li>
                          <NavLink
                            to="/admin-panel"
                            className="text-base text-black-400 font-normal rounded-lg flex items-center p-2 hover:bg-theme group"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                            <span className="ml-3">Deposits</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/admin-panel"
                            className="text-base text-black-400 font-normal rounded-lg flex items-center p-2 hover:bg-theme group"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                            <span className="ml-3">Withdrawals</span>
                          </NavLink>
                        </li>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                        */}
                <li>
                  <NavLink
                    to="/admin-panel/payment-methods"
                    className={({ isActive }) =>
                      isActive ? baseActiveClass : baseClass
                    }
                  >
                    <i className="fa-brands fa-bitcoin"></i>
                    <span className="ml-3">Payment methods</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin-panel/settings"
                    className={({ isActive }) =>
                      isActive ? baseActiveClass : baseClass
                    }
                  >
                    <i className="fa-solid fa-cogs"></i>
                    <span className="ml-3">Settings</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin-panel/games"
                    className={({ isActive }) =>
                      isActive ? baseActiveClass : baseClass
                    }
                  >
                    <i className="fa-solid fa-dice"></i>
                    <span className="ml-3">Casino games</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin-panel/support"
                    className={({ isActive }) =>
                      isActive ? baseActiveClass : baseClass
                    }
                  >
                    <i className="fa-solid fa-envelope"></i>
                    <span className="ml-3">Support messages</span>
                  </NavLink>
                </li>
                {/*
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="text-base text-black-300 font-normal rounded-lg w-full flex justify-between items-center p-2 hover:bg-theme group">
                        <div>
                          <i className="fa-solid fa-dice"></i>
                          <span className="ml-3">Games</span>
                        </div>
                        <i
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } fa-solid fa-chevron-down float-right`}
                        ></i>
                      </Disclosure.Button>
                      <Disclosure.Panel>
                        <li>
                          <NavLink
                            to="/admin-panel"
                            className="text-base text-black-400 font-normal rounded-lg flex items-center p-2 hover:bg-theme group"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                            <span className="ml-3">Faucet settings</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/admin-panel"
                            className="text-base text-black-400 font-normal rounded-lg flex items-center p-2 hover:bg-theme group"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                            <span className="ml-3">Dice settings</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/admin-panel"
                            className="text-base text-black-400 font-normal rounded-lg flex items-center p-2 hover:bg-theme group"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                            <span className="ml-3">Roulette settings</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/admin-panel"
                            className="text-base text-black-400 font-normal rounded-lg flex items-center p-2 hover:bg-theme group"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                            <span className="ml-3">Limbo settings</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/admin-panel"
                            className="text-base text-black-400 font-normal rounded-lg flex items-center p-2 hover:bg-theme group"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                            <span className="ml-3">Hilo settings</span>
                          </NavLink>
                        </li>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                */}
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
