import { Tab } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import DepositBonusesSettings from "../../components/admin/DepositBonusesSettings";
import CryptoPayment from "../../components/admin/CryptoPayment";
import GeneralSettings from "../../components/admin/GeneralSettings";
import clientAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import { authenticatedFail } from "../../store/users/userSlice";
import { getTokenApi } from "../../utils/functions";
import LevelSettings from "../../components/admin/LevelSettings";

const AdminSettings = () => {
  const [data, setData] = useState({});

  const dispatch = useDispatch();
  const token = getTokenApi();

  const getData = async () => {
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const result = await clientAxios.get(`/api/admin/settings`);
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
          `/api/admin/settings/${data._id}`,
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
  return (
    <div>
      <Tab.Group>
        <div className="flex space-x-5">
          <Tab.List className="text-black-300 md:w-1/4 w-full text-sm">
            <Tab
              as={Fragment}
              className={({ selected }) =>
                selected
                  ? "py-2 px-5 bg-theme border border-green-light-200 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
                  : "py-2 px-5 bg-theme border border-rose-300 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
              }
            >
              <span>General</span>
            </Tab>
            <Tab
              as={Fragment}
              className={({ selected }) =>
                selected
                  ? "py-2 px-5 bg-theme border border-green-light-200 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
                  : "py-2 px-5 bg-theme border border-rose-300 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
              }
            >
              <span>Deposit Bonuses</span>
            </Tab>
            <Tab
              as={Fragment}
              className={({ selected }) =>
                selected
                  ? "py-2 px-5 bg-theme border border-green-light-200 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
                  : "py-2 px-5 bg-theme border border-rose-300 hover:border-l-4 hover:border-green-light-200 border-l-4 rounded-full mb-2 cursor-pointer block focus:outline-0"
              }
            >
              <span>Levels</span>
            </Tab>
          </Tab.List>
          <Tab.Panels className="md:w-3/4 w-full">
            <Tab.Panel>
              <GeneralSettings
                data={data}
                updateData={updateData}
                setData={setData}
              />
            </Tab.Panel>
            <Tab.Panel>
              <DepositBonusesSettings
                data={data}
                updateData={updateData}
                setData={setData}
              />
            </Tab.Panel>
            <Tab.Panel>
              <LevelSettings
                data={data}
                updateData={updateData}
                setData={setData}
              />
            </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
};

export default AdminSettings;
