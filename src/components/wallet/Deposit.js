import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  generateDepositAddress,
  getDepositAddress,
} from "../../store/wallet/walletSlice";
import CoinImage from "../CoinImage";
import Label from "../template/Inputs/Label";

const BASE_COINS = ["BTC", "LTC", "BCH", "DOGE"];

const Deposit = ({
  selected,
  setSelected,
  coins,
  generalSettings,
  payments,
}) => {
  const { depositAddress } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    if (BASE_COINS.includes(selected.short_name)) {
      dispatch(getDepositAddress(selected._id));
    }
  }, [dispatch, selected]);

  useEffect(() => {
    if (BASE_COINS.includes(selected.short_name)) {
      dispatch(getDepositAddress(selected._id));
    }
  }, [dispatch, selected]);

  return (
    <div className="min-h-[300px]">
      <Label text="Deposit with" />
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
                custom={BASE_COINS.includes(selected.short_name) ? false : true}
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
        depositAddress === null || depositAddress === "" ? (
          <button
            type="button"
            onClick={() => dispatch(generateDepositAddress(selected._id))}
            className="bg-blue-white-200 hover:opacity-80 flex mx-auto text-md my-10 px-10 py-4 capitalize rounded-full items-center text-dark-green-800 font-semibold cursor-pointer"
          >
            <i className="fa-solid fa-qrcode mr-2"></i>Generate Deposit Address
          </button>
        ) : (
          <>
            <img
              src={`https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${depositAddress}&chld=L|2`}
              alt="qr"
              className="mx-auto mt-3 w-48"
            />
            <p className="text-center text-black-300 text-base mt-4">
              {depositAddress}
            </p>
          </>
        )
      ): null}
      <p className="text-center mt-4 text-black-400 text-sm">
        $1 USD ={" "}
        {`${generalSettings?.coin_exchange} ${generalSettings?.coin_name}`}
      </p>
    </div>
  );
};

export default Deposit;
