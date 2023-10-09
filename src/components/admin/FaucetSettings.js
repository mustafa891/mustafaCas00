import React from "react";
import ButtonGreen from "../template/buttons/ButtonGreen";

const FaucetSettings = ({ data, updateData, setData }) => {
  const handleSubmit = () => {
    updateData();
  };

  return (
    <>
      <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
        <div className="bg-theme border border-rose-300 shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold leading-none text-black-300 capitalize">
              Faucet settings
            </h3>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="status" className="text-black-300">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={
                  data.faucet_settings?.status !== undefined
                    ? data.faucet_settings.status
                    : true
                }
                onChange={(e) =>
                  setData({
                    ...data,
                    faucet_settings: {
                      ...data.faucet_settings,
                      status: e.target.value,
                    },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="text-black-300">Claim time (minutes)</label>
              <input
                name="time"
                value={data.faucet_settings?.claim_time || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    faucet_settings: {
                      ...data.faucet_settings,
                      claim_time: e.target.value,
                    },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              />
            </div>
          </div>
          <p className="mt-8 text-black-300 font-semibold">Earnings in coins</p>
          <div className="flex space-x-4 mt-3">
            <div className="w-1/2">
              <label className="text-black-300">Number between 0 - 9885</label>
              <input
                name="level1"
                value={data.faucet_settings?.level_1 || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    faucet_settings: {
                      ...data.faucet_settings,
                      level_1: e.target.value,
                    },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="text-black-300">
                Number between 9886 - 9985
              </label>
              <input
                name="level2"
                value={data.faucet_settings?.level_2 || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    faucet_settings: {
                      ...data.faucet_settings,
                      level_2: e.target.value,
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
              <label className="text-black-300">
                Number between 9986 - 9993
              </label>
              <input
                name="level3"
                value={data.faucet_settings?.level_3 || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    faucet_settings: {
                      ...data.faucet_settings,
                      level_3: e.target.value,
                    },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="text-black-300">
                Number between 9994 - 9997
              </label>
              <input
                name="level4"
                value={data.faucet_settings?.level_4 || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    faucet_settings: {
                      ...data.faucet_settings,
                      level_4: e.target.value,
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
              <label className="text-black-300">
                Number between 9998 - 9999
              </label>
              <input
                name="level5"
                value={data.faucet_settings?.level_5 || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    faucet_settings: {
                      ...data.faucet_settings,
                      level_5: e.target.value,
                    },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              />
            </div>
            <div className="w-1/2"></div>
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

export default FaucetSettings;
