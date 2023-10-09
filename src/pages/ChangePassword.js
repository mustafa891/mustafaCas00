import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import ButtonGreen from "../components/template/buttons/ButtonGreen";
import clientAxios from "../config/axios";

const ChangePassword = () => {
  const [isValid, setIsValid] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [password, setPassword] = useState("");
  const params = useParams();

  useEffect(() => {
    const validateToken = async () => {
      try {
        await clientAxios.get(`/api/users/forgot-password/${params.token}`);
        setIsValid(true);
      } catch (error) {
        setIsValid(false);
      }
    };

    validateToken();
  }, []);

  const sendRequest = async () => {
    try {
      await clientAxios.post(`/api/users/forgot-password/${params.token}`, {
        password,
      });
      toast.success("Password updated successfully", {
        style: {
          //background: "rgba(255,255,255,0)",
          background: "#162a31",
          color: "#67de7d",
        },
      });
      setIsUpdated(true);
    } catch (error) {
      toast.error("An error was found", {
        style: {
          background: "#607d8b",
          color: "#fff",
        },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "") {
      toast.error("Password is required", {
        style: {
          background: "#607d8b",
          color: "#fff",
        },
      });
      return;
    }
    sendRequest();
  };

  return (
    <>
      {" "}
      <Toaster />
      <div className="flex justify-center align-middle items-center h-screen">
        <div className="w-1/3 border-2 border-rose-300 rounded-md px-5 py-8">
          {isValid ? (
            !isUpdated ? (
              <>
                <form onSubmit={handleSubmit}>
                  <p className=" text-black-300 text-2xl uppercase text-center">
                    New Password
                  </p>
                  <p className="text-center py-5 text-yellow-500">
                    <i className="fa-solid fa-key fa-5x"></i>
                  </p>
                  <p className=" text-black-300 text-base text-center">
                    Update your password and do not lose access to your account.
                  </p>
                  <p className="text-black-400 mb-1 text-sm font-medium">
                    Password <span className="text-red-700">*</span>
                  </p>
                  <input
                    type="password"
                    name="password"
                    className={`bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <ButtonGreen
                    type="submit"
                    icon="fa-save"
                    text="Update password"
                  />
                </form>
              </>
            ) : (
              <>
                <p className="text-center py-5 text-green-400">
                  <i className="fa-solid fa-check-circle fa-5x"></i>
                </p>
                <p className=" text-black-300 text-base text-center">
                  Password upated successfully
                </p>
                <a
                  href="/"
                  className="mt-5 border-2 block text-center border-rose-300 w-full px-5 py-3 rounded-md  text-black-300 hover:opacity-75"
                >
                  Now login
                </a>
              </>
            )
          ) : (
            <>
              <p className="text-center py-5 text-red-400">
                <i className="fa-solid fa-xmark-circle fa-5x"></i>
              </p>
              <p className=" text-black-300 text-base text-center">
                Invalid token
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
