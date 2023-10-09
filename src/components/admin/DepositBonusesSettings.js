import React from "react";
import ButtonGreen from "../template/buttons/ButtonGreen";

const DepositBonusesSettings = ({ data, updateData, setData }) => {
  const handleSubmit = () => {
    updateData();
  };

  return (
    <>
      <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
        <div className="bg-theme border border-rose-300 shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold leading-none text-black-300 capitalize">
              Deposit Bonuses settings
            </h3>
          </div>
          {data?.bonuses_settings.map((item, key) => (
            <div key={key}>
              <p className="text-black-300 font-semibold mt-8">
                - {item.name} Deposit
              </p>
              <div className="flex space-x-4 mt-3">
                <div className="w-1/2">
                  <label className="text-black-300">Max bonus</label>
                  <input
                    name="max_bonus"
                    value={data.bonuses_settings[key]?.max_bonus || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        bonuses_settings: [
                          ...data.bonuses_settings.slice(0, key),
                          {
                            ...data.bonuses_settings[key],
                            max_bonus: e.target.value,
                          },
                          ...data.bonuses_settings.slice(key + 1),
                        ],
                      })
                    }
                    className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                    required
                  />
                </div>
              </div>

              {data.bonuses_settings[key].tier_deposit.map((tier, key2) => (
                <div key={key2}>
                  <p className="mt-5 text-black-300 font-semibold text-sm">
                    --Tier {key2 + 1}
                  </p>
                  <div className="flex space-x-4 mt-2">
                    <div className="w-1/2">
                      <label className="text-black-300">Min deposit</label>
                      <input
                        name="min_deposit"
                        value={
                          data.bonuses_settings[key]?.tier_deposit[key2]
                            .min_deposit || ""
                        }
                        onChange={(e) =>
                          setData({
                            ...data,
                            bonuses_settings: data.bonuses_settings.map(
                              (bonus, index) => {
                                if (index !== key) return bonus;

                                return {
                                  ...bonus,
                                  tier_deposit: bonus.tier_deposit.map(
                                    (tier, tierIndex) => {
                                      if (tierIndex !== key2) return tier;

                                      return {
                                        ...tier,
                                        min_deposit: e.target.value,
                                      };
                                    }
                                  ),
                                };
                              }
                            ),
                          })
                        }
                        className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                        required
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="text-black-300">Deposit bonus</label>
                      <input
                        name="tier_deposit_bonus"
                        value={
                          data.bonuses_settings[key]?.tier_deposit[key2]
                            .deposit_bonus || ""
                        }
                        onChange={(e) =>
                          setData({
                            ...data,
                            bonuses_settings: data.bonuses_settings.map(
                              (bonus, index) => {
                                if (index !== key) return bonus;

                                return {
                                  ...bonus,
                                  tier_deposit: bonus.tier_deposit.map(
                                    (tier, tierIndex) => {
                                      if (tierIndex !== key2) return tier;

                                      return {
                                        ...tier,
                                        deposit_bonus: e.target.value,
                                      };
                                    }
                                  ),
                                };
                              }
                            ),
                          })
                        }
                        className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
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

export default DepositBonusesSettings;
