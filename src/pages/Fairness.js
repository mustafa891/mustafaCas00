import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import Calculation from "../components/fairness/Calculation";
import Implementation from "../components/fairness/Implementation";
import Overview from "../components/fairness/Overview";

const Fairness = () => {
  return (
    <div className="px-12">
      <p className="py-3 text-black-300  text-lg inline-block rounded-tr-full mt-10 mb-5">
        <i className="fa-solid fa-scale-balanced mr-2 text-dark-green-200 p-2 bg-green-light-200 rounded-full"></i>
        <span className="text-green-light-200">PROVABLY</span> FAIR
      </p>
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
              <span>Overview</span>
            </Tab>
            <Tab
              as={Fragment}
              className={({ selected }) =>
                selected
                  ? "py-2 px-5 bg-theme border border-green-light-200 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
                  : "py-2 px-5 bg-theme border border-rose-300 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
              }
            >
              <span>Implementation</span>
            </Tab>
            <Tab
              as={Fragment}
              className={({ selected }) =>
                selected
                  ? "py-2 px-5 bg-theme border border-green-light-200 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
                  : "py-2 px-5 bg-theme border border-rose-300 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
              }
            >
              <span>Calculation</span>
            </Tab>
          </Tab.List>
          <Tab.Panels className="md:w-3/4 w-full">
            <Tab.Panel>
              <Overview />
            </Tab.Panel>
            <Tab.Panel>
              <Implementation />
            </Tab.Panel>
            <Tab.Panel>
              <div className="bg-theme rounded-md p-6 w-full">
                <p className="text-black-300 font-semibold uppercase text-2xl ">
                  Calculation
                </p>
                <div className="flex justify-center mt-5">
                  <div className="w-full lg:w-2/3">
                    <Calculation />
                  </div>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
};

export default Fairness;
