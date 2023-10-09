import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clientAxios from "../config/axios";

const ConfirmAccount = () => {
  const [isValid, setIsValid] = useState(false);
  const params = useParams();

  useEffect(() => {
    const validateAccount = async () => {
      try {
        await clientAxios.get(`/api/users/activate-account/${params.id}`);
        setIsValid(true);
      } catch (error) {
        setIsValid(false);
      }
    };

    validateAccount();
  }, []);

  return (
    <>
      <div className="flex justify-center align-middle items-center h-screen">
        <div className="w-1/3 border-2 border-rose-300 rounded-md px-5 py-8">
          <p className=" text-black-300 text-2xl uppercase text-center">
            Confirm Account
          </p>
          {isValid ? (
            <>
              <p className="text-center py-5 text-green-400">
                <i className="fa-solid fa-check-circle fa-5x"></i>
              </p>
              <p className=" text-black-300 text-base text-center">
                Account successfully validated.
              </p>
              <a
                href="/"
                className="mt-5 border-2 block text-center border-rose-300 w-full px-5 py-3 rounded-md  text-black-300 hover:opacity-75"
              >
                Home page
              </a>
            </>
          ) : (
            <>
              <p className="text-center py-5 text-red-400">
                <i className="fa-solid fa-xmark-circle fa-5x"></i>
              </p>
              <p className=" text-black-300 text-base text-center">
                Unable to validate the account
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfirmAccount;
