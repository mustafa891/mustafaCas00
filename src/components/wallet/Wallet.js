import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import Deposit from "./Deposit";
import { useDispatch, useSelector } from "react-redux";
import Withdraw from "./Withdraw";
import History from "./History";
import { getCryptoPrices } from "../../store/wallet/walletSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Wallet = () => {
  const { coins, prices } = useSelector((state) => state.wallet);
  const { generalSettings } = useSelector((state) => state.settings);
  const { payments } = useSelector((state) => state.ingame);
  const [selected, setSelected] = useState(coins[0]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCryptoPrices());
  }, [dispatch]);

  return (
    <>
      <Tab.Group>
        <Tab.List className="flex justify-center text-sm w-full">
          <div className="bg-theme px-1 py-1 rounded-full inline-block w-full">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-1/3 py-2 text-black-300 rounded-full cursor-pointer",
                  selected ? "bg-theme" : ""
                )
              }
            >
              Deposit
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-1/3 py-2 text-black-300 rounded-full cursor-pointer",
                  selected ? "bg-theme" : ""
                )
              }
            >
              Withdraw
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-1/3 py-2 text-black-300 rounded-full cursor-pointer",
                  selected ? "bg-theme" : ""
                )
              }
            >
              History
            </Tab>
          </div>
        </Tab.List>
        <Tab.Panels className="mt-8">
          <Tab.Panel>
            <Deposit
              selected={selected}
              setSelected={setSelected}
              coins={coins}
              generalSettings={generalSettings}
              payments={payments}
            />
          </Tab.Panel>
          <Tab.Panel>
            <Withdraw
              selected={selected}
              setSelected={setSelected}
              coins={coins}
              generalSettings={generalSettings}
              prices={prices}
              payments={payments}
            />
          </Tab.Panel>
          <Tab.Panel>
            <History />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#afd571" opacity="1" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#2c3a44"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Wallet;
