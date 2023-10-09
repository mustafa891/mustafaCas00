import React from "react";
import ButtonGreen from "../template/buttons/ButtonGreen";

const RouletteSettings = ({ data, updateData, setData }) => {
  const handleSubmit = () => {
    updateData();
  };

  return (
    <>
      <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
        <div className="bg-theme border border-rose-300 shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold leading-none text-black-300 capitalize">
              Roulette settings
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
                  data.roulette_settings?.status !== undefined
                    ? data.roulette_settings.status
                    : true
                }
                onChange={(e) =>
                  setData({
                    ...data,
                    roulette_settings: {
                      ...data.roulette_settings,
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
              <label htmlFor="max_profit" className="text-black-300">
                Max profit
              </label>
              <input
                name="max_profit"
                value={data.roulette_settings?.max_profit || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    roulette_settings: {
                      ...data.roulette_settings,
                      max_profit: e.target.value,
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
              <label htmlFor="min_bet" className="text-black-300">
                Min bet
              </label>
              <input
                name="min_bet"
                value={data.roulette_settings?.min_bet || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    roulette_settings: {
                      ...data.roulette_settings,
                      min_bet: e.target.value,
                    },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="max_bet" className="text-black-300">
                Max bet
              </label>
              <input
                name="max_bet"
                value={data.roulette_settings?.max_bet || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    roulette_settings: {
                      ...data.roulette_settings,
                      max_bet: e.target.value,
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

export default RouletteSettings;
