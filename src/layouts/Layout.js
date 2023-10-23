import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import AuthModal from "../components/AuthModal";
import Chat from "../components/Chat";
import Footer from "../components/Footer";
import { setAuthModalForm, setAuthOpen } from "../store/modals/modalSlice";
import { profileUser, logoutUser } from "../store/users/userSlice";
import { checkClientSeed } from "../utils/functions";
import LogoImage from "../assets/img/csgocrazy/logo.png";
import TopMenu from "../components/TopMenu";
import UserMenu from "../components/UserMenu";
import SideBar from "../components/SideBar";
import MobileMenu from "../components/MobileMenu";
import ChangePasswordModal from "../components/ChangePasswordModal";
import AuthenticatorModal from "../components/AuthenticatorModal";
import WalletModal from "../components/WalletModal";
import FairnessModal from "../components/FairnessModal";
import BetModal from "../components/BetModal";
import PublicProfileModal from "../components/PublicProfileModal";
import { getGeneralSettings } from "../store/settings/settingSlice";

const Layout = () => {

  const { isAuthenticated, user } = useSelector((state) => state.users);
  const [isOpenSibar, setIsOpenSibar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openNewModal = (modal) => {
    dispatch(setAuthOpen(true));
    dispatch(setAuthModalForm(modal));
  };

  useEffect(() => {
    console.log("Hi my name is mustafa")
    dispatch(profileUser());
    checkClientSeed();
    dispatch(getGeneralSettings());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleBars = () => {
    let element = document.getElementById("sidebar-menu");

    if (isOpenSibar) {
      element.classList.add("hidden");
    } else {
      element.classList.remove("hidden");
    }
    setIsOpenSibar(!isOpenSibar);
  };

  /**
   * Check user activity
   */
  const [lastActivityTime, setLastActivityTime] = useState(new Date());

  let baseClassL = `px-5 py-1.5 border border-rose-300 rounded-tl-md rounded-bl-md text-black-200 border-r-0 cursor-pointer hover:opacity-80`;
  let baseActiveClassL = `px-5 py-1.5 border border-green-light-200 rounded-tl-md rounded-bl-md bg-theme text-black-200 border-r-0 cursor-pointer`;
  let baseClassR = `px-5 py-1.5 border border-rose-300 rounded-tr-md rounded-br-md text-black-200 border-l-0 cursor-pointer hover:opacity-80`;
  let baseActiveClassR = `px-5 py-1.5 border border-green-light-200 rounded-tr-md rounded-br-md bg-theme text-black-200 border-l-0 cursor-pointer`;

  return (
    <>
      <Toaster />
      <AuthModal />
      <ChangePasswordModal />
      <AuthenticatorModal />
      <WalletModal />
      <FairnessModal />
      <BetModal />
      <PublicProfileModal />
      <header className="bg-theme py-1 text-black-200 px-5 flex justify-between items-center fixed w-full top-0 z-20">
        <div className="flex items-center">
          <i
            className="fa-solid fa-bars mr-8 text-xl text-black-300 cursor-pointer lg:opacity-60 lg:cursor-not-allowed block"
            onClick={handleBars}
          ></i>
          <NavLink to="/" className="cursor-pointer">
            <img className="w-20 hidden md:block" src={LogoImage} alt="Logo" />
          </NavLink>
        </div>
        <TopMenu
          isAuthenticated={isAuthenticated}
          balance={user?.balance}
          handleLogout={handleLogout}
          openNewModal={openNewModal}
          navigate={navigate}
        />
      </header>
      <div className="flex pt-[62px]">
        <SideBar />
        <main className="lg:ml-[250px] w-full ml-0">
          <Outlet />
          <Footer />
        </main>
      </div>
      <div className="">
        <Chat />
      </div>
      <div className="">
        <UserMenu />
      </div>
      <MobileMenu />
    </>
  );
};

export default Layout;
