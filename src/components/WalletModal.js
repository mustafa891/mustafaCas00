import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setWalletOpen } from "../store/modals/modalSlice";
import Wallet from "./wallet/Wallet";
import { getCoins } from "../store/wallet/walletSlice";

const WalletModal = () => {
  const { walletOpen } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setWalletOpen(false));
  };

  useEffect(() => {
    dispatch(getCoins());
  }, []);

  return (
    <Transition appear show={walletOpen} as={Fragment}>
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
            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-theme border border-rose-300 shadow-xl rounded-lg">
              <Dialog.Title
                as="h3"
                className="font-medium leading-6 text-black-400 flex justify-between text-xl mb-5"
              >
                <p
                  className="text-black-300 text-base capitalize font-semibold focus:outline-0"
                  tabIndex="0"
                >
                  <i className="fa-solid fa-wallet mr-2 p-1.5 rounded-full bg-green-light-200 text-dark-green-500"></i>
                  Wallet
                </p>
                <i
                  className="fa fa-close cursor-pointer hover:text-black-300"
                  onClick={() => closeModal()}
                ></i>
              </Dialog.Title>
              <Wallet />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default WalletModal;
