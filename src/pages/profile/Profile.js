import React from "react";
import Menu from "../../components/profile/Menu";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.users);
  return (
    <div className="px-12 py-10">
      <p className="text-black-300 text-xl">
        <i className="fa-solid fa-user mr-2 text-green-500"></i>Profile
      </p>
      <div className="flex">
        <Menu />
        <div className="md:w-3/4 w-full px-5">
          <div className="text-center w-full bg-theme py-5 rounded">
            <p className="text-black-300 text-xl">{user.username}</p>
            <p className="text-black-500 text-sm">Member since {user.created}</p>
          </div>
          <div className="flex space-x-3">
            <div className="text-center w-full md:w-1/2 bg-theme py-5 rounded mt-3">
              <p className="text-black-400 text-md">Profit</p>
              <p className="text-black-300 text-xl mt-1">$0.00</p>
            </div>
            <div className="text-center w-full md:w-1/2 bg-theme py-5 rounded mt-3">
              <p className="text-black-400 text-md">Bets</p>
              <p className="text-black-300 text-xl mt-1">$0.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
