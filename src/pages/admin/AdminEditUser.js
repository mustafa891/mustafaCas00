import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import clientAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import { authenticatedFail } from "../../store/users/userSlice";
import { getTokenApi } from "../../utils/functions";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import ButtonGreen from "../../components/template/buttons/ButtonGreen";
import HeaderUser from "../../components/profile/HeaderUser";
import BodyUser from "../../components/profile/BodyUser";
import BoxBalance from "../../components/admin/BoxBalance";

const validationSchema = () => {
  return {
    //confirmed: Yup.boolean().required("Required"),
    role: Yup.string().required("Required"),
    chatIsBlocked: Yup.boolean().required("Required"),
    is_cashier: Yup.boolean().required("Required"),
    cashierBalance: Yup.string().required("Required"),
    //chatIsMod: Yup.boolean().required("Required"),
  };
};

const AdminEditUser = () => {
  let { id } = useParams();
  const [user, setUser] = useState([]);

  const dispatch = useDispatch();
  const token = getTokenApi();

  const getUser = async () => {
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const result = await clientAxios.get(`/api/admin/users/show/${id}`);
        setUser(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (data) => {
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const result = await clientAxios.put(`/api/admin/users/${id}`, {
          data: {
            role: data.role,
            chat_info: {
              isBlocked: data.chatIsBlocked,
              isMod: data.chatIsMod,
            },
            cashier_balance: data.cashierBalance,
            is_cashier: data.is_cashier,
          },
        });
        toast.success("User updated", {
          style: {
            //background: "rgba(255,255,255,0)",
            background: "#162a31",
            color: "#67de7d",
          },
        });
      }
    } catch (error) {
      toast.error("An error was found", {
        style: {
          background: "#607d8b",
          color: "#fff",
        },
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const formik = useFormik({
    initialValues: {
      role: user?.role || "",
      chatIsBlocked: user?.chat_info?.isBlocked || "",
      chatIsMod: user?.chat_info?.isMod || "",
      is_cashier: user?.is_cashier || "",
      cashierBalance: user?.cashier_balance?.$numberDecimal || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      try {
        //dispatch(loginUser(formData));
        updateUser(formData);
      } catch (error) {
        toast.error(error);
      }
    },
  });

  return (
    <>
      <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
        <div className="bg-theme border border-rose-300 shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold leading-none text-black-300">
              Edit user: {user?.username}
            </h3>
            <NavLink
              to="/admin-panel/users"
              className="text-sm font-medium text-black-300 hover:bg-theme rounded-lg p-2"
            >
              Back
            </NavLink>
          </div>

          <div className="flex space-x-8">
            <div className="w-1/2">
              <HeaderUser
                level={user?.level}
                username={user?.username}
                user_id={user?._id}
                isPublic={true}
              />
              <BodyUser
                wagared={user?.wagared?.$numberDecimal}
                bets={user?.bets}
                created={user?.createdAt}
              />
              <div className="flex mt-3 space-x-3">
                <BoxBalance
                  title="Balance"
                  withChip={true}
                  value={parseFloat(user?.balance?.$numberDecimal).toFixed(4)}
                />
                <BoxBalance
                  title="Faucet tickets"
                  withChip={false}
                  value={user?.faucet_tickets}
                />
              </div>
            </div>
            <div className="w-1/2 bg-theme px-5 py-5 rounded-md">
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="role" className="text-black-300">
                  Role:
                </label>
                <select
                  id="role"
                  name="role"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}
                  className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                >
                  <option value="">Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                {formik.touched.role && formik.errors.role && (
                  <span className="text-red-400 text-xs">
                    <i className="fa-solid fa-circle-exclamation mr-2"></i>
                    {formik.errors.role}
                  </span>
                )}
                <div className="mt-4">
                  <label htmlFor="role" className="text-black-300">
                    Is Cashier: {user?.is_cashier ? "Yes" : "No"}
                  </label>
                  <select
                    id="is_cashier"
                    name="is_cashier"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    //value={formik.values.is_cashier ? "true" : "false"}
                    className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                  >
                    <option value="">Select an option</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                  {formik.touched.is_cashier && formik.errors.is_cashier && (
                    <span className="text-red-400 text-xs">
                      <i className="fa-solid fa-circle-exclamation mr-2"></i>
                      {formik.errors.is_cashier}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <label htmlFor="role" className="text-black-300">
                    Is Mod: {user?.chat_info?.isMod ? "Yes" : "No"}
                  </label>
                  <select
                    id="chatIsMod"
                    name="chatIsMod"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    //value={formik.values.chatIsMod ? "true" : "false"}
                    className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                  >
                    <option value="">Select a status</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                  {formik.touched.chatIsMod && formik.errors.chatIsMod && (
                    <span className="text-red-400 text-xs">
                      <i className="fa-solid fa-circle-exclamation mr-2"></i>
                      {formik.errors.chatIsMod}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <label htmlFor="role" className="text-black-300">
                    Chat blocked:{" "}
                    {user?.chat_info?.isBlocked ? "Blocked" : "Unblocked"}
                  </label>
                  <select
                    id="chatIsBlocked"
                    name="chatIsBlocked"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    //value={formik.values.chatIsBlocked ? "true" : "false"}
                    className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                  >
                    <option value="">Select a status</option>
                    <option value="true">Block</option>
                    <option value="false">Unblock</option>
                  </select>
                  {formik.touched.chatIsBlocked &&
                    formik.errors.chatIsBlocked && (
                      <span className="text-red-400 text-xs">
                        <i className="fa-solid fa-circle-exclamation mr-2"></i>
                        {formik.errors.chatIsBlocked}
                      </span>
                    )}
                </div>
                <div className="mt-4">
                  <label htmlFor="role" className="text-black-300">
                    Cashier balance:
                  </label>
                  <input
                    id="cashierBalance"
                    name="cashierBalance"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cashierBalance}
                    className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
                  />
                </div>
                <ButtonGreen
                  type="submit"
                  text="Update"
                  icon="fa-floppy-disk"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEditUser;
