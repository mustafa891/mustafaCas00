import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import Input from "../template/Inputs/Input";
import Label from "../template/Inputs/Label";
import CoinImage from "../CoinImage";
import CoinsImage from "../../assets/img/coin.png";
import { useDispatch, useSelector } from "react-redux";
import { withdrawRequest } from "../../store/wallet/walletSlice";
import { toast } from "react-hot-toast";
import { hideAlerts } from "../../store/wallet/walletSlice";
import ButtonGreen from "../template/buttons/ButtonGreen";

const BASE_COINS = ["BTC", "LTC", "BCH", "DOGE"];

const Withdraw = ({
  selected,
  setSelected,
  coins,
  generalSettings,
  prices,
  payments,
}) => {
  const [amount, setAmount] = useState("");
  const [amountUsd, setAmountUsd] = useState("0");
  const [receiveAmount, setReceiveAmount] = useState("0");
  const [address, setAddress] = useState("");
  const { isLoading, errors, message } = useSelector((state) => state.wallet);

  const dispatch = useDispatch();

  const onChangeAmount = (e) => {
    setAmount(e.target.value);
    let coin_exchange = generalSettings?.coin_exchange || 1;
    let calculateAmount = (e.target.value * 1) / coin_exchange;
    setAmountUsd(Math.abs(calculateAmount));
    /**
     * Calculate amount with fee
     */
    let calculateAmountFee =
      ((e.target.value - selected?.withdrawals?.fee?.$numberDecimal) * 1) /
      coin_exchange;
    let basePrice = 0;
    switch (selected?.short_name) {
      case "BTC":
        basePrice = prices.btc_usd;
        break;
      case "LTC":
        basePrice = prices.ltc_usd;
        break;
      case "DOGE":
        basePrice = prices.doge_usd;
        break;
      case "BCH":
        basePrice = prices.bch_usd;
        break;

      default:
        break;
    }
    //console.log(selected?.short_name);
    let amountInCrypto = (calculateAmountFee * 1) / basePrice;
    setReceiveAmount(parseFloat(amountInCrypto).toFixed(8));
  };

  const onBlurAmount = (e) => {
    if (e.target.value !== "") {
      setAmount(Math.abs(parseFloat(e.target.value)));
    }
  };

  useEffect(() => {
    if (errors !== null) {
      toast.error(errors, {
        style: {
          background: "#607d8b",
          color: "#fff",
        },
      });
    }
    if (message !== null) {
      toast.success(message, {
        style: {
          //background: "rgba(255,255,255,0)",
          background: "#162a31",
          color: "#67de7d",
        },
      });
      dispatch(hideAlerts());
    }
    // eslint-disable-next-line
  }, [errors, message, dispatch]);

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (address === "") {
      toast.error("Address is required", {
        style: {
          background: "#607d8b",
          color: "#fff",
        },
      });
      return;
    }
    if (amount === "0" || amount === "") {
      toast.error("Amount is required", {
        style: {
          background: "#607d8b",
          color: "#fff",
        },
      });
      return;
    }
    dispatch(
      withdrawRequest({
        coin: selected?._id,
        address: address,
        amount: amount,
      })
    );
  };

  return (
    <div>
      <form onSubmit={handleWithdraw}>
        <Label text="Withdraw to" />
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button
              className="relative w-full cursor-pointer rounded-md bg-theme border border-rose-200 
            py-2.5 pl-5 pr-10 text-left text-blue-white-200
           hover:opacity-80 focus:outline-none sm:text-sm"
            >
              <span className="block truncate capitalize">
                <CoinImage
                  coin={selected.icon}
                  className="inline mr-2.5 w-6"
                  custom={
                    BASE_COINS.includes(selected.short_name) ? false : true
                  }
                />
                <span className="font-medium">{selected.name}</span>
                <span className="bg-theme py-1 px-2.5 rounded-md ml-2 font-medium">
                  {selected.short_name}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <i className="fa-solid fa-chevron-down text-black-400"></i>
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-52 w-full overflow-auto rounded-md bg-theme pb-3 pt-2 px-2 text-base shadow-lg ring-1 ring-dark-green-300 ring-opacity-5 focus:outline-none sm:text-sm">
                {payments.map(
                  (item, idx) =>
                    item.deposits.isActive && (
                      <Listbox.Option
                        key={idx}
                        className={({ active, selected }) =>
                          `relative cursor-default select-none py-2.5 pl-10 pr-4 rounded-md bg-theme mt-1 ${
                            active || selected
                              ? "border border-green-light-200 text-blue-white-200"
                              : "border border-rose-200 text-blue-white-200"
                          }`
                        }
                        value={item}
                      >
                        {({ selected }) => (
                          <>
                            <CoinImage
                              coin={item.icon}
                              className="inline mr-2.5 w-6"
                              custom={item.icon}
                            />
                            <span
                              className={`truncate inline ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {item.name}
                            </span>
                            <span className="bg-theme py-1 px-2.5 font-medium rounded-md ml-2">
                              {item.short_name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-light-200">
                                <i className="fa-solid fa-check"></i>
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    )
                )}
                {coins.map(
                  (coin, coinIdx) =>
                    coin.deposits.isActive && (
                      <Listbox.Option
                        key={coinIdx}
                        className={({ active, selected }) =>
                          `relative cursor-default select-none py-2.5 pl-10 pr-4 rounded-md bg-theme mt-1 ${
                            active || selected
                              ? "border border-green-light-200 text-blue-white-200"
                              : "border border-rose-200 text-blue-white-200"
                          }`
                        }
                        value={coin}
                      >
                        {({ selected }) => (
                          <>
                            <CoinImage
                              coin={coin.icon}
                              className="inline mr-2.5 w-6"
                            />
                            <span
                              className={`truncate inline ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {coin.name}
                            </span>
                            <span className="bg-theme py-1 px-2.5 font-medium rounded-md ml-2">
                              {coin.short_name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-light-200">
                                <i className="fa-solid fa-check"></i>
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    )
                )}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        {BASE_COINS.includes(selected.short_name) ? (
          <>
            <Label text="Address" />
            <Input
              type="text"
              name="withdraw_address"
              icon="qr"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onBlur={() => {}}
              readOnly={false}
              isLoading={isLoading}
              isAutoOn={false}
              className="w-full"
              inputClass="bg-theme text-sm w-full py-3 rounded-md text-black-200 focus:outline-none focus:bg-theme placeholder:text-black-400"
            />
            <Label text="Amount" />
            <div className="flex space-x-3 items-center">
              <div className="w-full">
                <Input
                  type="number"
                  name="amount"
                  icon="coins"
                  placeholder="0.0000"
                  value={amount}
                  onChange={(e) => onChangeAmount(e)}
                  onBlur={(e) => onBlurAmount(e)}
                  readOnly={false}
                  isLoading={isLoading}
                  isAutoOn={false}
                  className="w-full"
                  inputClass="bg-theme text-sm w-full py-3 rounded-md text-black-200 focus:outline-none focus:bg-theme placeholder:text-black-400"
                />
                <p className="text-sm mt-1 text-black-400">
                  Amount in {generalSettings?.coin_name}
                </p>
              </div>
              <p className="text-lg text-black-300 mb-6">&#8776;</p>
              <div className="w-full">
                <Input
                  type="number"
                  name="amount_usd"
                  icon="usd"
                  placeholder="0.0000"
                  value={parseFloat(amountUsd).toFixed(2)}
                  readOnly={true}
                  isLoading={isLoading}
                  isAutoOn={false}
                  className="w-full"
                  inputClass="bg-theme opacity-80 text-sm w-full py-3 rounded-md text-black-200 focus:outline-none focus:bg-theme placeholder:text-black-400"
                />
                <p className="text-sm mt-1 text-black-400">Amount in USD</p>
              </div>
            </div>
            <div className="flex mt-5 justify-between space-x-5">
              <div className="w-1/2">
                <div className="flex justify-between">
                  <p className="text-black-400 text-sm">Fee</p>
                  <div>
                    <img
                      className="inline w-4 mr-1"
                      src={CoinsImage}
                      alt="coins"
                    />
                    <p className="text-black-400 text-sm inline">
                      {parseFloat(
                        selected?.withdrawals?.fee?.$numberDecimal
                      ).toFixed(4)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="text-black-400 text-sm">You Receive</p>
                  <div>
                    <CoinImage
                      coin={selected.icon}
                      className="inline mr-1.5 w-4"
                    />
                    <p className="text-black-400 text-sm uppercase inline">
                      {receiveAmount}{" "}
                      <span className="font-medium">
                        {selected?.short_name}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <ButtonGreen
                  type="submit"
                  isLoading={isLoading}
                  text="Withdraw"
                  icon="fa-sack-dollar"
                />
              </div>
            </div>
          </>
        ) : null}
      </form>
    </div>
  );
};

export default Withdraw;
