import { useDispatch, useSelector } from "react-redux";
import {
  setPasswordOpen,
  setUserMenuOpen,
  setTwoFaOpen,
} from "../store/modals/modalSlice";
import { updatePrivateProfile } from "../store/users/userSlice";
import HeaderUser from "./profile/HeaderUser";
import BodyUser from "./profile/BodyUser";

const UserMenu = () => {
  const { user, twoFaEnabled } = useSelector((state) => state.users);
  const { userMenu } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  const handleCloseMenu = () => {
    document.body.classList.remove("template-modal-open");
    dispatch(setUserMenuOpen(false));
  };

  const mouseEnter = () => {
    document.body.classList.add("template-modal-open");
  };

  const mouseLeave = () => {
    document.body.classList.remove("template-modal-open");
  };

  return (
    <>
      <div
        className={`${
          userMenu ? "translate-x-0" : "md:translate-x-[400px] translate-x-full"
        } bg-theme overflow-y-auto border-l-2 border-rose-300 fixed block md:w-[400px] w-full transition-all ease-in-out duration-300 lg:h-screen lg:min-h-screen template-min-heigth px-2 py-5 z-20 right-0 top-0`}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      >
        <div className="text-black-100 text-md ml-3 leading-none">
          <span
            className="px-3 py-2 bg-theme rounded-md cursor-pointer hover:opacity-80"
            onClick={handleCloseMenu}
          >
            <i className="fa-solid fa-xmark"></i>
          </span>
          <span className="ml-3 font-medium">PROFILE</span>
        </div>
        <div className="border-b border-rose-300 mt-5"></div>
        <div className="py-3 px-2">
          <HeaderUser
            level={user?.level}
            username={user?.username}
            user_id={user?.id}
          />
          <BodyUser
            wagared={user?.wagared}
            bets={user?.bets}
            created={user?.created}
          />
          <p className="mt-7 text-md text-black-300 font-medium">
            <i className="fa-solid fa-gear mr-1.5"></i>SETTINGS
          </p>
          <div className="border-b border-rose-300 mt-2"></div>
          <div className="flex justify-between mt-6">
            <p className="text-black-300 text-sm">
              <i className="fa-solid fa-key mr-2 p-1.5 rounded-full bg-green-light-200 text-dark-green-500"></i>
              Change Password
            </p>
            <p
              className="cursor-pointer hover:brightness-125 px-6 pt-[0.18rem] pb-[0.18rem] rounded text-sm bg-theme  text-green-light-200"
              onClick={() => dispatch(setPasswordOpen(true))}
            >
              <i className="fa-solid fa-edit mr-1"></i>CHANGE
            </p>
          </div>
          <div className="flex justify-between mt-6">
            <p className="text-black-300 text-sm">
              <i className="fa-solid fa-lock mr-2 p-1.5 rounded-full bg-green-light-200 text-dark-green-500"></i>
              Authenticator
            </p>
            <div
              className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in opacity-80"
              onClick={() => dispatch(setTwoFaOpen(true))}
            >
              <input
                type="checkbox"
                name="toggle_2fa"
                id="toggle_2fa"
                className={`${
                  twoFaEnabled
                    ? "opacity-100 bg-theme border-2 border-green-light-200"
                    : "opacity-80 border-4"
                } toggle-checkbox absolute block w-5 h-5 rounded-full appearance-none cursor-pointer`}
                readOnly={true}
                checked={twoFaEnabled}
              />
              <label
                htmlFor="toggle_2fa"
                className={`${
                  twoFaEnabled ? "bg-green-light-200" : "bg-theme"
                } toggle-label block overflow-hidden h-5 rounded-full cursor-pointer`}
              ></label>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <p className="text-black-300 text-sm">
              <i className="fa-solid fa-user-secret mr-2 p-1.5 rounded-full bg-green-light-200 text-dark-green-500"></i>
              Private Profile
            </p>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in opacity-80">
              <input
                type="checkbox"
                name="toggle_profile"
                id="toggle_profile"
                className={`${
                  user?.private_profile
                    ? "opacity-100 bg-theme border-2 border-green-light-200"
                    : "opacity-80 border-4"
                } toggle-checkbox absolute block w-5 h-5 rounded-full appearance-none cursor-pointer`}
                readOnly={true}
                checked={user?.private_profile ? true : false}
                onClick={() => dispatch(updatePrivateProfile())}
              />
              <label
                htmlFor="toggle_profile"
                className={`${
                  user?.private_profile
                    ? "bg-green-light-200"
                    : "bg-theme"
                } toggle-label block overflow-hidden h-5 rounded-full cursor-pointer`}
              ></label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
