import React from "react";
import ButtonGreen from "../template/buttons/ButtonGreen";

const GeneralSettings = ({ data, updateData, setData }) => {
  const handleSubmit = () => {
    updateData();
  };

  return (
    <>
      <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
        <div className="bg-theme border border-rose-300 shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold leading-none text-black-300 capitalize">
              General settings
            </h3>
          </div>
          <div className="flex space-x-4 mt-3">
            <div className="w-1/2">
              <label className="text-black-300">Site name</label>
              <input
                name="site_name"
                value={data.general_settings?.site_name || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    general_settings: {
                      ...data.general_settings,
                      site_name: e.target.value,
                    },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="text-black-300">Site domain</label>
              <input
                name="site_domain"
                value={data.general_settings?.site_domain || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    general_settings: {
                      ...data.general_settings,
                      site_domain: e.target.value,
                    },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              />
            </div>
          </div>
          <div className="flex space-x-4 mt-3">
            <div className="w-1/2">
              <label htmlFor="coin_name" className="text-black-300">
                Coin name
              </label>
              <input
                name="coin_name"
                id="coin_name"
                value={data.general_settings?.coin_name || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    general_settings: {
                      ...data.general_settings,
                      coin_name: e.target.value,
                    },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="coin_exchange" className="text-black-300">
                Coin exchange ($1 USD = ? coins)
              </label>
              <input
                name="coin_exchange"
                id="coin_exchange"
                value={data.general_settings?.coin_exchange || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    general_settings: {
                      ...data.general_settings,
                      coin_exchange: e.target.value,
                    },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              />
            </div>
          </div>
          <div className="flex space-x-4 mt-3">
            <div className="w-1/2">
              <label htmlFor="coin_exchange" className="text-black-300">
                Affiliates Earning % (Every ref bet)
              </label>
              <input
                name="affiliates_earning"
                id="affiliates_earning"
                value={data.general_settings?.affiliates_earning || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    general_settings: {
                      ...data.general_settings,
                      affiliates_earning: e.target.value,
                    },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="coin_exchange" className="text-black-300">
                Affiliates Minimum Redem amount
              </label>
              <input
                name="affiliates_min_redem"
                id="affiliates_min_redem"
                value={data.general_settings?.affiliates_min_redem || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    general_settings: {
                      ...data.general_settings,
                      affiliates_min_redem: e.target.value,
                    },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              />
            </div>
          </div>
          <div className="flex space-x-4 mt-3">
            <div className="w-1/2">
              <label htmlFor="coin_exchange" className="text-black-300">
                Minimum Bonus Redem amount
              </label>
              <input
                name="min_bonus_redem"
                id="min_bonus_redem"
                value={data.general_settings?.min_bonus_redem || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    general_settings: {
                      ...data.general_settings,
                      min_bonus_redem: e.target.value,
                    },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              />
            </div>
          </div>

          <div className="mt-10">
            <ButtonGreen
              type="button"
              onClick={() => handleSubmit()}
              text="Update"
              icon="fa-floppy-disk"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralSettings;
