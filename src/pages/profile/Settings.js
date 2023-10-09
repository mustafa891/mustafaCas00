import React from "react";
import ChangePassword from "../../components/profile/ChangePassword";
import Menu from "../../components/profile/Menu";
import TwoFactor from "../../components/profile/TwoFactor";

const Settings = () => {
  return (
    <div className="px-12 py-10">
      <p className="text-black-300 text-xl">
        <i className="fa-solid fa-user mr-2 text-green-500"></i>Profile
      </p>
      <div className="flex">
        <Menu />
        <div className="md:w-3/4 w-full px-5">
          <p className="text-black-300 mb-2">Security</p>
          <div className="xl:flex">
            <div className="text-center bg-theme py-4 rounded xl:w-1/2 w-full px-5 mr-2 h-fit">
              <ChangePassword />
            </div>
            <div className="text-center bg-theme py-4 rounded xl:w-1/2 w-full px-5 xl:mt-0 mt-3 h-fit">
              <TwoFactor />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
