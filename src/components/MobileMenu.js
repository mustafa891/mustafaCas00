import ChatImage from "../assets/img/chat.png";
import ProfileImage from "../assets/img/user.png";
import DiceImage from "../assets/img/dice-cube.png";
import WalletImage from "../assets/img/wallet.png";

import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setChatOpen, setUserMenuOpen } from "../store/modals/modalSlice";

const MobileMenu = () => {
  const dispatch = useDispatch();

  const handleOpenChat = () => {
    document.body.classList.add("template-modal-open");
    dispatch(setChatOpen(true));
  };

  const handleOpenProfile = () => {
    document.body.classList.add("template-modal-open");
    dispatch(setUserMenuOpen(true));
  };

  return (
    <>
      <div className="w-full">
        <section
          id="bottom-navigation"
          className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-theme shadow"
        >
          {/*<section
          id="bottom-navigation"
          className="block fixed inset-x-0 bottom-0 z-10 bg-theme border-t border-rose-300 shadow"
        > */}
          <div id="tabs" className="flex justify-between items-center">
            <NavLink
              to="/"
              className="w-full text-black-200 focus:text-blue-white-200 hover:text-blue-white-200 justify-center inline-block text-center pt-2 pb-1"
            >
              <img src={DiceImage} alt="Casino" className="w-5 mx-auto" />
              <span className="tab tab-home block text-xs mt-1">Games</span>
            </NavLink>
            <div
              className="w-full text-black-200 focus:text-blue-white-200 hover:text-blue-white-200 justify-center inline-block text-center pt-2 pb-1"
              onClick={() => handleOpenChat()}
            >
              <img src={WalletImage} alt="Wallet" className="w-5 mx-auto" />
              <span className="tab tab-home block text-xs mt-1">Wallet</span>
            </div>
            <div
              className="w-full text-black-200 focus:text-blue-white-200 hover:text-blue-white-200 justify-center inline-block text-center pt-2 pb-1"
              onClick={() => handleOpenChat()}
            >
              <img src={ChatImage} alt="Chat" className="w-5 mx-auto" />
              <span className="tab tab-home block text-xs mt-1">Chat</span>
            </div>
            <div
              className="w-full text-black-200 focus:text-blue-white-200 hover:text-blue-white-200 justify-center inline-block text-center pt-2 pb-1"
              onClick={() => handleOpenProfile()}
            >
              <img src={ProfileImage} alt="Profile" className="w-5 mx-auto" />
              <span className="tab tab-home block text-xs mt-1">Profile</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MobileMenu;
