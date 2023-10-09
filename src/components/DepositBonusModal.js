import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import CoinImage from "../assets/img/coin.png";
import ButtonGreen from "./template/buttons/ButtonGreen";
import { setWalletOpen } from "../store/modals/modalSlice";

const DepositBonusModal = ({
  depositBonusModal,
  setDepositBonusModal,
  itemBonusModal,
}) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    setDepositBonusModal(false);
  };

  const openDepositModal = () => {
    setDepositBonusModal(false);
    setTimeout(() => {
      dispatch(setWalletOpen(true));
    }, 600);
  };

  return (
    <Transition appear show={depositBonusModal} as={Fragment}>
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
            <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-theme border border-rose-300 shadow-xl rounded-xl">
              <Dialog.Title
                as="h3"
                className="font-medium leading-6 text-black-400 flex justify-between text-xl mb-5"
              >
                <p
                  className="text-black-300 text-base capitalize font-semibold focus:outline-0"
                  tabIndex="0"
                >
                  <i className="fa-solid fa-sack-dollar mr-2 p-1.5 rounded-full bg-green-light-200 text-dark-green-500"></i>
                  <span className="text-green-light-200">
                    {itemBonusModal.name}
                  </span>{" "}
                  Deposit bonus
                </p>
                <i
                  className="fa fa-close cursor-pointer hover:text-black-300"
                  onClick={() => closeModal()}
                ></i>
              </Dialog.Title>
              <p className="text-black-400  text-xs flex justify-between">
                <span>MINIMUM DEPOSIT</span>
                <span>DEPOSIT BONUS</span>
              </p>
              {itemBonusModal.tier_deposit?.map((item, key) => (
                <div
                  className="bg-theme rounded-md py-3 mt-2 w-full flex justify-between"
                  key={key}
                >
                  <div className="uppercase  text-xl mt-2 mb-1 ml-5 inline-block">
                    <span className="px-4 pb-2 pt-3 bg-theme rounded-lg text-green-light-200 border border-rose-300">
                      <img
                        src={CoinImage}
                        className="w-5 inline-block mr-2 mb-1"
                        alt="Coin"
                      />
                      {parseFloat(item.min_deposit).toFixed(2)}
                      {/*<span className="ml-2 text-base text-blue-white-200">
                        &#8776; ${parseFloat(item.min_deposit / 100).toFixed(2)}{" "}
                        USD
                      </span> */}
                    </span>
                  </div>
                  <div className="uppercase  text-xl mt-2 mb-1 mr-5 inline-block">
                    <span className="px-4 pb-2 pt-3 bg-theme rounded-lg text-blue-white-200 border border-rose-300">
                      {item.deposit_bonus}%
                    </span>
                  </div>
                </div>
              ))}
              <ButtonGreen
                type="button"
                text="Deposit Now"
                icon="fa-wallet"
                onClick={openDepositModal}
              />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DepositBonusModal;
