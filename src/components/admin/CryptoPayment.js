import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import clientAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import { authenticatedFail } from "../../store/users/userSlice";
import { getTokenApi } from "../../utils/functions";
import ButtonGreen from "../template/buttons/ButtonGreen";

const CryptoPayment = ({ currency = "BTC" }) => {
  const [data, setData] = useState({});

  const dispatch = useDispatch();
  const token = getTokenApi();

  const getData = async () => {
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const result = await clientAxios.get(`/api/admin/coins/${currency}`);
        setData(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const result = await clientAxios.put(
          `/api/admin/coins/${data._id}`,
          data
        );
        toast.success("Details updated", {
          style: {
            //background: "rgba(255,255,255,0)",
            background: "#162a31",
            color: "#67de7d",
          },
        });
      }
    } catch (error) {
      toast.error("An error was found, you need to fill all inputs", {
        style: {
          background: "#607d8b",
          color: "#fff",
        },
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = () => {
    updateData();
  };

  return (
    <>
      <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
        <div className="bg-theme border border-rose-300 shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold leading-none text-black-300 capitalize">
              {data.name}
            </h3>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="short_name" className="text-black-300">
                Short Name
              </label>
              <input
                name="short_name"
                id="short_name"
                defaultValue={data.short_name}
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                readOnly
              />
            </div>
            <div className="w-1/2"></div>
          </div>
          <p className="text-black-300 font-semibold mt-8">- Deposit</p>
          <div className="flex space-x-4 mt-3">
            <div className="w-1/2">
              <label htmlFor="api" className="text-black-300">
                Deposit API
              </label>
              <select
                id="api"
                name="api"
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
              >
                <option value="apirone">Apirone</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="text-black-300">Status</label>
              <select
                name="status_dp"
                value={
                  data.deposits?.isActive !== undefined
                    ? data.deposits.isActive
                    : true
                }
                onChange={(e) =>
                  setData({
                    ...data,
                    deposits: { ...data.deposits, isActive: e.target.value },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4 mt-3">
            <div className="w-1/2">
              <label htmlFor="deposit_apikey" className="text-black-300">
                API Key
              </label>
              <input
                name="deposit_apikey"
                id="deposit_apikey"
                value={data.deposits?.apikey || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    deposits: { ...data.deposits, apikey: e.target.value },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="deposit_secretkey" className="text-black-300">
                Secret Key
              </label>
              <input
                name="deposit_secretkey"
                id="deposit_secretkey"
                value={data.deposits?.secretkey || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    deposits: { ...data.deposits, secretkey: e.target.value },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              />
            </div>
          </div>
          <p className="text-black-300 font-semibold mt-8">- Withdraw</p>
          <div className="flex space-x-4 mt-3">
            <div className="w-1/2">
              <label htmlFor="api" className="text-black-300">
                Withdraw API
              </label>
              <select
                id="api"
                name="api"
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
              >
                <option value="apirone">Apirone</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="text-black-300">Status</label>
              <select
                name="status_wh"
                value={
                  data.withdrawals?.isActive !== undefined
                    ? data.withdrawals.isActive
                    : true
                }
                onChange={(e) =>
                  setData({
                    ...data,
                    withdrawals: {
                      ...data.withdrawals,
                      isActive: e.target.value,
                    },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4 mt-3">
            <div className="w-1/2">
              <label htmlFor="withdraw_apikey" className="text-black-300">
                API Key
              </label>
              <input
                name="withdraw_apikey"
                id="withdraw_apikey"
                value={data.withdrawals?.apikey || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    withdrawals: {
                      ...data.withdrawals,
                      apikey: e.target.value,
                    },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="withdraw_secretkey" className="text-black-300">
                Secret Key
              </label>
              <input
                name="withdraw_secretkey"
                id="withdraw_secretkey"
                value={data.withdrawals?.secretkey || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    withdrawals: {
                      ...data.withdrawals,
                      secretkey: e.target.value,
                    },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              />
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            <div className="w-1/2">
              <label htmlFor="fee" className="text-black-300">
                Fee
              </label>
              <input
                name="fee"
                id="fee"
                value={data.withdrawals?.fee.$numberDecimal || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    withdrawals: {
                      ...data.withdrawals,
                      fee: {
                        $numberDecimal: e.target.value,
                      },
                    },
                  })
                }
                className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="minimum" className="text-black-300">
                Minimum withdrawal
              </label>
              <input
                name="minimum"
                id="minimum"
                value={data.withdrawals?.minimum.$numberDecimal || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    withdrawals: {
                      ...data.withdrawals,
                      minimum: {
                        $numberDecimal: e.target.value,
                      },
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

export default CryptoPayment;
