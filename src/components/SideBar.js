import React from "react";
import { NavLink } from "react-router-dom";
import LogoImage from "../assets/img/csgocrazy/logo.png";
//import FaucetSmImage from "../assets/img/faucet-sm.png";
import { Disclosure } from "@headlessui/react";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { user } = useSelector((state) => state.users);
  const { generalSettings } = useSelector((state) => state.settings);

  let baseClass = `block mt-2 px-5 py-2.5 rounded-full text-black-200 cursor-pointer hover:text-black-100 hover:bg-theme w-full text-left`;
  let baseActiveClass = `block mt-2 px-5 py-2.5 rounded-full text-black-200 cursor-default bg-theme w-full text-left`;

  let baseClassSub = `block mt-2 px-5 py-2.5 rounded-full text-black-400 cursor-pointer hover:text-black-300 hover:bg-theme w-full text-left`;
  let baseActiveClassSub = `block mt-2 px-5 py-2.5 rounded-full text-black-300 cursor-default bg-theme w-full text-left`;

  return (
    <aside>
      <div
        id="sidebar-menu"
        className={`bg-theme alt top-16 text-sm font-medium fixed w-[250px] hidden lg:block  transition-all ease-in-out duration-300 h-screen min-h-screen px-2 py-5 z-20 left-0`}
      >
        <img
          className="cursor-pointer w-36 hover:scale-105 md:hidden block mx-auto mb-5"
          src={LogoImage}
          alt="Logo"
        />
        <div className="leading-none">
          {user?.role === "admin" && (
            <NavLink
              to="/admin-panel"
              className={({ isActive }) =>
                isActive ? baseActiveClass : baseClass
              }
            >
              <i className="fa-solid fa-gauge mr-3 text-red-400"></i>
              <span>Admin panel</span>
            </NavLink>
          )}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? baseActiveClass : baseClass
            }
          >
            <i className="fa-solid fa-home mr-3 text-black-300"></i>
            <span>Home</span>
          </NavLink>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={({ isActive }) =>
                    isActive ? baseActiveClass : baseClass
                  }
                >
                  <i className="fa-solid fa-dice mr-3 text-black-300"></i>
                  Games
                  <i
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } fa-solid fa-chevron-down float-right`}
                  ></i>
                </Disclosure.Button>
                <Disclosure.Panel>
                  {generalSettings.faucet_active && (
                    <NavLink
                      to="/free/faucet"
                      className={({ isActive }) =>
                        isActive ? baseActiveClassSub : baseClassSub
                      }
                    >
                      <i className="fa-solid fa-faucet-drip mr-3 text-black-300"></i>
                      <span>Faucet</span>
                    </NavLink>
                  )}
                  <NavLink
                    to="/casino/aussie-slots"
                    className={({ isActive }) =>
                      isActive ? baseActiveClassSub : baseClassSub
                    }
                  >
                    <i className="fa-brands fa-cotton-bureau mr-3 text-black-300"></i>
                    <span>Aussie Slots</span>
                  </NavLink>
                  {generalSettings.crash_active && (
                    <NavLink
                      to="/casino/crash"
                      className={({ isActive }) =>
                        isActive ? baseActiveClassSub : baseClassSub
                      }
                    >
                      <i className="fa-solid fa-chart-line mr-3 text-black-300"></i>
                      <span>Crash</span>
                    </NavLink>
                  )}
                  {generalSettings.cases_active && (
                    <NavLink
                      to="/casino/case-opening"
                      className={({ isActive }) =>
                        isActive ? baseActiveClassSub : baseClassSub
                      }
                    >
                      <i className="fa-solid fa-box-open mr-3 text-black-300"></i>
                      <span>Case Opening</span>
                    </NavLink>
                  )}
                  {generalSettings.dice_active && (
                    <NavLink
                      to="/casino/hash-dice"
                      className={({ isActive }) =>
                        isActive ? baseActiveClassSub : baseClassSub
                      }
                    >
                      <i className="fa-solid fa-dice-five mr-3 text-black-300"></i>
                      <span>Dice</span>
                    </NavLink>
                  )}
                  {generalSettings.roulette_active && (
                    <NavLink
                      to="/casino/roulette"
                      className={({ isActive }) =>
                        isActive ? baseActiveClassSub : baseClassSub
                      }
                    >
                      <i className="fa-solid fa-arrow-up-wide-short mr-3 text-black-300"></i>
                      <span>Roulette</span>
                    </NavLink>
                  )}
                  {generalSettings.limbo_active && (
                    <NavLink
                      to="/casino/limbo"
                      className={({ isActive }) =>
                        isActive ? baseActiveClassSub : baseClassSub
                      }
                    >
                      <i className="fa-solid fa-bullseye mr-3 text-black-300"></i>
                      <span>Limbo</span>
                    </NavLink>
                  )}
                  {generalSettings.hilo_active && (
                    <NavLink
                      to="/casino/hilo"
                      className={({ isActive }) =>
                        isActive ? baseActiveClassSub : baseClassSub
                      }
                    >
                      <i className="fa-solid fa-down-left-and-up-right-to-center mr-3 text-black-300"></i>
                      <span>Hilo</span>
                    </NavLink>
                  )}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <NavLink
            to="/bonuses"
            className={({ isActive }) =>
              isActive ? baseActiveClass : baseClass
            }
          >
            <i className="fa-solid fa-gift mr-3 text-black-300"></i>
            <span>Bonuses</span>
          </NavLink>
          <NavLink
            to="/affiliates"
            className={({ isActive }) =>
              isActive ? baseActiveClass : baseClass
            }
          >
            <i className="fa-solid fa-user-group mr-3 text-black-300"></i>
            <span>Affiliates</span>
          </NavLink>
          <div className="border-b border-rose-300 my-4"></div>
          <NavLink
            to="/provably-fair"
            className={({ isActive }) =>
              isActive ? baseActiveClass : baseClass
            }
          >
            <i className="fa-solid fa-scale-balanced mr-3 text-black-300"></i>
            <span>Fairness</span>
          </NavLink>
          <NavLink
            to="/support"
            className={({ isActive }) =>
              isActive ? baseActiveClass : baseClass
            }
          >
            <i className="fa-solid fa-headset mr-3 text-black-300"></i>
            <span>Support</span>
          </NavLink>
          {/*<div className="block px-5 py-3 border border-rose-300 rounded-md text-black-200 cursor-pointer hover:text-black-100 hover:bg-theme mt-2">
            <i className="fa-solid fa-bug mr-2 text-blue-white-200"></i>{" "}
            <span>BUG BOUNTY</span>
          </div>*/}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
