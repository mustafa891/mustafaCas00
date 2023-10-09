import React from "react";
import BitcoinImage from "../assets/img/bitcoin.svg";
import LitecoinImage from "../assets/img/litecoin.svg";
import DogecoinImage from "../assets/img/dogecoin.svg";
import BitcoinCashImage from "../assets/img/bitcoin-cash.svg";
import SafeImage from "../assets/img/safe-gamble.svg";
import EPlusImage from "../assets/img/18plus.svg";
import LogoImage from "../assets/img/csgocrazy/logo.png";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const { generalSettings } = useSelector((state) => state.settings);
  return (
    <div>
      <div className="bg-theme mt-20">
        <div className="flex pt-10 px-5 lg:px-20 justify-between">
          <div>
            <img src={BitcoinImage} alt="Bitcoin" className="w-32" />
          </div>
          <div>
            <img src={LitecoinImage} alt="Litecoin" className="w-32" />
          </div>
          <div>
            <img src={DogecoinImage} alt="Dogecoin" className="w-32" />
          </div>
          <div>
            <img src={BitcoinCashImage} alt="BitcoinCash" className="w-32" />
          </div>
        </div>
        <div className="flex pt-10 px-5 lg:px-20 justify-center space-x-8 pb-12 border-b border-rose-300">
          <div>
            <img src={SafeImage} alt="Responsible Gambling" className="w-32" />
          </div>
          <div>
            <img src={EPlusImage} alt="18+" className="w-16" />
          </div>
        </div>
        <div className="max-w-4xl mx-auto py-10">
          <img
            className="mx-auto mt-5 w-36 opacity-60"
            src={LogoImage}
            alt="Logo"
          />
          <p className="text-center mt-4 text-sm">
            &copy; 2023 {generalSettings?.site_domain} | All Rights Reserved.
          </p>
          <p className="text-center mt-4 text-sm">
            $1 USD ={" "}
            {`${generalSettings?.coin_exchange} ${generalSettings?.coin_name}`}
          </p>
          <div className="mt-10 flex flex-col md:flex-row md:justify-between items-center text-sm">
            <p className="order-2 md:order-1 mt-8 md:mt-0">
              Support:{" "}
              <span>
                support@{generalSettings?.site_domain}
              </span>
            </p>
            <div className="order-1 md:order-2">
              <NavLink
                to="/faq"
                className="px-2 hover:text-black-300 cursor-pointer"
              >
                FAQ
              </NavLink>
              <NavLink
                to="/support"
                className="px-2 border-l hover:text-black-300 cursor-pointer"
              >
                Support
              </NavLink>
              <NavLink
                to="/terms"
                className="px-2 border-l hover:text-black-300 cursor-pointer"
              >
                Terms of services
              </NavLink>
              <NavLink
                to="/privacy"
                className="px-2 border-l hover:text-black-300 cursor-pointer"
              >
                Privacy Policy
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
