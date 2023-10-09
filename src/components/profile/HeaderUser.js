import React from "react";
import Badge from "../Badge";
import RexImage from "../../assets/img/rex-head.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/users/userSlice";
import { setUserMenuOpen } from "../../store/modals/modalSlice";

const HeaderUser = ({ level, username, isPublic = false, user_id }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(setUserMenuOpen(false));
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex justify-start space-x-3 items-center">
          <div className="border-4 border-rose-300 p-1 rounded-full">
            <img
              className="w-12 h-12 rounded-full"
              src={`https://www.gravatar.com/avatar/${user_id}?d=retro&f=y`}
              alt="user"
            />
          </div>
          <div>
            <Badge level={level} />
            <p className=" font-semibold text-black-300 text-md inline">
              {username}
            </p>
            <p className="mt-1.5 font-semibold text-green-light-200 bg-theme px-4 py-[0.16rem] rounded text-sm">
              LEVEL {level}
            </p>
          </div>
        </div>
        {!isPublic && (
          <div>
            <p
              onClick={handleLogout}
              className="cursor-pointer hover:brightness-125 px-4 py-[0.22rem] font-semibold rounded text-sm bg-theme  text-roulette-red-300"
            >
              <i className="fa-solid fa-power-off mr-1"></i>LOGOUT
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderUser;
