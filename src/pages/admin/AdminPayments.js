import { Tab } from "@headlessui/react";
import React, { Fragment } from "react";
import CryptoPayment from "../../components/admin/CryptoPayment";
import ButtonGreen from "../../components/template/buttons/ButtonGreen";

const AdminPayments = () => {
  return (
    <div>
      <Tab.Group>
        <div className="flex space-x-5">
          <Tab.List className="text-black-300 md:w-1/4 w-full text-sm">
            <Tab
              as={Fragment}
              className={({ selected }) =>
                selected
                  ? "py-2 px-5 bg-theme border border-green-light-200 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
                  : "py-2 px-5 bg-theme border border-rose-300 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
              }
            >
              <span>Bitcoin</span>
            </Tab>
            <Tab
              as={Fragment}
              className={({ selected }) =>
                selected
                  ? "py-2 px-5 bg-theme border border-green-light-200 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
                  : "py-2 px-5 bg-theme border border-rose-300 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
              }
            >
              <span>Litecoin</span>
            </Tab>
            <Tab
              as={Fragment}
              className={({ selected }) =>
                selected
                  ? "py-2 px-5 bg-theme border border-green-light-200 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
                  : "py-2 px-5 bg-theme border border-rose-300 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
              }
            >
              <span>Dogecoin</span>
            </Tab>
            <Tab
              as={Fragment}
              className={({ selected }) =>
                selected
                  ? "py-2 px-5 bg-theme border border-green-light-200 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
                  : "py-2 px-5 bg-theme border border-rose-300 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
              }
            >
              <span>Bitcoin Cash</span>
            </Tab>
            <Tab
              as={Fragment}
              className={({ selected }) =>
                selected
                  ? "py-2 px-5 bg-theme border border-green-light-200 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
                  : "py-2 px-5 bg-theme border border-rose-300 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
              }
            >
              <span>P2P Payments</span>
            </Tab>
          </Tab.List>
          <Tab.Panels className="md:w-3/4 w-full">
            <Tab.Panel>
              <CryptoPayment currency="BTC" />
            </Tab.Panel>
            <Tab.Panel>
              <CryptoPayment currency="LTC" />
            </Tab.Panel>
            <Tab.Panel>
              <CryptoPayment currency="DOGE" />
            </Tab.Panel>
            <Tab.Panel>
              <CryptoPayment currency="BCH" />
            </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
};

export default AdminPayments;
