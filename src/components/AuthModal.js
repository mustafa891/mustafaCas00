import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import ForgotPassword from "./auth/ForgotPassword";
import EmailVerification from "./auth/EmailVerification";
import { setAuthOpen } from "../store/modals/modalSlice";

const AuthModal = () => {
  const { authModalForm, authOpen } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  const ViewFormContent = () => {
    if (authModalForm === "login") {
      return <LoginForm />;
    } else if (authModalForm === "register") {
      return <RegisterForm />;
    } else if (authModalForm === "reset") {
      return <ForgotPassword />;
    } else if (authModalForm === "email_verification") {
      return <EmailVerification />;
    }
  };

  const closeModal = () => {
    dispatch(setAuthOpen(false));
  };

  return (
    <Transition appear show={authOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => {}}
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
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-theme border border-rose-300 shadow-xl rounded-lg">
              <Dialog.Title
                as="h3"
                className="font-medium leading-6 text-black-400 flex justify-end text-xl"
              >
                <i
                  className="fa fa-close cursor-pointer hover:text-black-300"
                  onClick={() => closeModal()}
                ></i>
              </Dialog.Title>
              <ViewFormContent />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AuthModal;
