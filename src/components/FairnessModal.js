import { Fragment, useEffect, useState } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setFairnessOpen } from "../store/modals/modalSlice";
import {
  getFairnessSeeds,
  updateServerSeed,
} from "../store/fairness/fairnessSlice";
import Calculation from "./fairness/Calculation";
import { useNavigate } from "react-router-dom";
import Label from "./template/Inputs/Label";
import { getClientSeed, updateClientSeed } from "../utils/functions";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FairnessModal = () => {
  const { fairnessOpen, fairnessGame } = useSelector((state) => state.modals);
  const { seedsData } = useSelector((state) => state.fairness);
  const dispatch = useDispatch();
  const [serverCopied, setServerCopied] = useState(false);
  const [clientCopied, setClientCopied] = useState(false);
  const [nonceCopied, setNonceCopied] = useState(false);
  const [clientSeed, setClientSeed] = useState("");

  const navigate = useNavigate();

  const closeModal = () => {
    dispatch(setFairnessOpen({ status: false, game: "" }));
  };

  useEffect(() => {
    if (fairnessOpen) {
      dispatch(getFairnessSeeds(fairnessGame));
      let client_seed = getClientSeed();
      setClientSeed(client_seed);
    }
  }, [dispatch, fairnessGame]);

  const handleServerSeed = () => {
    dispatch(
      updateServerSeed({
        game: fairnessGame,
      })
    );
  };

  const handleClientSeed = () => {
    updateClientSeed();
    let client_seed = getClientSeed();
    setClientSeed(client_seed);
  };

  const handleProvablyPage = () => {
    closeModal();
    navigate("/provably-fair");
  };

  return (
    <Transition appear show={fairnessOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => closeModal()}
      >
        <div
          className="fixed inset-0 bg-theme/90"
          aria-hidden="true"
        />
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-theme border border-rose-300 shadow-xl rounded-xl">
              <Dialog.Title
                as="h3"
                className="font-medium leading-6 text-black-400 flex justify-between text-xl mb-5"
              >
                <p
                  className="text-black-300 text-base capitalize font-semibold focus:outline-0"
                  tabIndex="0"
                >
                  <i className="fa-solid fa-scale-balanced mr-2 p-1.5 rounded-full bg-green-light-200 text-dark-green-500"></i>
                  Fairness
                </p>
                <i
                  className="fa fa-close cursor-pointer hover:text-black-300"
                  onClick={() => closeModal()}
                ></i>
              </Dialog.Title>
              <Tab.Group>
                <div className="px-2 mt-5">
                  <Tab.List className="flex justify-center text-sm w-full">
                    <div className="bg-theme px-1 py-1 rounded-full inline-block w-full">
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            "w-1/2 py-2 text-black-300 rounded-full cursor-pointer outline-none",
                            selected ? "bg-theme" : ""
                          )
                        }
                      >
                        Seeds
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            "w-1/2 py-2 text-black-300 rounded-full cursor-pointer outline-none",
                            selected ? "bg-theme" : ""
                          )
                        }
                      >
                        Verify
                      </Tab>
                    </div>
                  </Tab.List>
                  <Tab.Panels className="w-full mt-10">
                    <Tab.Panel>
                      <Label text="Server Seed (Hashed)" />
                      <div className="relative">
                        <input
                          type="text"
                          name="server_seed"
                          id="server_seed"
                          className={`bg-theme text-sm w-full py-3 rounded-md text-black-200 focus:outline-none placeholder:text-black-400 pl-5 pr-20`}
                          placeholder="Server Seed Hashed"
                          value={seedsData.server_seed}
                          readOnly
                          autoFocus={false}
                          tabIndex="-1"
                        />
                        <div className="absolute inset-y-0 right-4 flex items-center text-xl text-black-300">
                          <i
                            className="fa-solid fa-rotate hover:opacity-70 cursor-pointer mr-3"
                            onClick={() => handleServerSeed()}
                          ></i>
                          <div className="flex relative">
                            <i
                              className="fa-solid fa-copy hover:opacity-70 cursor-pointer"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  seedsData.server_seed
                                );
                                setServerCopied(true);
                                setTimeout(() => {
                                  setServerCopied(false);
                                }, 2000);
                              }}
                            ></i>
                            {serverCopied && (
                              <span className="transition-opacity bg-gray-800 px-1 text-sm text-black-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full m-4 mx-auto">
                                Copied!
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex mt-2">
                        <div className="mr-3 w-11/12">
                          <Label text="Client Seed" />
                          <div className="relative">
                            <input
                              type="text"
                              name="client_seed"
                              id="client_seed"
                              className={`bg-theme text-sm w-full py-3 rounded-md text-black-200 focus:outline-none placeholder:text-black-400 pl-5 pr-20`}
                              placeholder="Client Seed"
                              value={clientSeed}
                              readOnly
                              autoFocus={false}
                              tabIndex="-1"
                            />
                            <div className="absolute inset-y-0 right-4 flex items-center text-xl text-black-300">
                              <i
                                className="fa-solid fa-rotate hover:opacity-70 cursor-pointer mr-3"
                                onClick={() => handleClientSeed()}
                              ></i>
                              <div className="flex relative">
                                <i
                                  className="fa-solid fa-copy hover:opacity-70 cursor-pointer"
                                  onClick={() => {
                                    navigator.clipboard.writeText(clientSeed);
                                    setClientCopied(true);
                                    setTimeout(() => {
                                      setClientCopied(false);
                                    }, 2000);
                                  }}
                                ></i>
                                {clientCopied && (
                                  <span className="transition-opacity bg-gray-800 px-1 text-sm text-black-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full m-4 mx-auto">
                                    Copied!
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Label text="Nonce" />
                          <div className="relative">
                            <input
                              type="text"
                              name="nonce"
                              id="nonce"
                              className={`bg-theme text-sm w-full py-3 rounded-md text-black-200 focus:outline-none placeholder:text-black-400 pl-5 pr-12`}
                              placeholder="Nonce"
                              value={seedsData.nonce}
                              readOnly
                              autoFocus={false}
                              tabIndex="-1"
                            />
                            <div className="absolute inset-y-0 right-4 flex items-center text-xl text-black-300">
                              <div className="flex relative">
                                <i
                                  className="fa-solid fa-copy hover:opacity-70 cursor-pointer"
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      seedsData.nonce
                                    );
                                    setNonceCopied(true);
                                    setTimeout(() => {
                                      setNonceCopied(false);
                                    }, 2000);
                                  }}
                                ></i>
                                {nonceCopied && (
                                  <span className="transition-opacity bg-gray-800 px-1 text-sm text-black-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full m-4 mx-auto">
                                    Copied!
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <Calculation />
                      <p
                        onClick={handleProvablyPage}
                        className="block text-center text-black-400 mt-5 hover:opacity-80 cursor-pointer"
                      >
                        View Fairness Details
                      </p>
                    </Tab.Panel>
                  </Tab.Panels>
                </div>
              </Tab.Group>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FairnessModal;
