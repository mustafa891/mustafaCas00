import React from "react";
import ButtonGreen from "../template/buttons/ButtonGreen";

const LevelSettings = ({ data, updateData, setData }) => {
  const handleSubmit = () => {
    updateData();
  };

  return (
    <>
      <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
        <div className="bg-theme border border-rose-300 shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold leading-none text-black-300 capitalize">
              Level settings
            </h3>
          </div>
          {data.levels_settings.levels.map((item, key) => (
            <div className="flex space-x-4 mt-3" key={key}>
              {key > 0 && (
                <div className="w-full">
                  <label htmlFor="coin_name" className="text-black-300">
                    Wagared needed for level {item.level}
                  </label>
                  <input
                    name="coin_name"
                    id="coin_name"
                    value={data.levels_settings?.levels[key].amount || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        levels_settings: {
                          ...data.levels_settings,
                          levels: [
                            ...data.levels_settings.levels.slice(0, key),
                            {
                              ...data.levels_settings.levels[key],
                              amount: e.target.value,
                            },
                            ...data.levels_settings.levels.slice(key + 1),
                          ],
                        },
                      })
                    }
                    className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                    required
                  />
                </div>
              )}
            </div>
          ))}

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

export default LevelSettings;
