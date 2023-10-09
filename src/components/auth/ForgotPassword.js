import { useDispatch } from "react-redux";
import { setAuthModalForm } from "../../store/modals/modalSlice";
import LogoImage from "../../assets/img/csgocrazy/logo.png";
import { useState } from "react";
import { toast } from "react-hot-toast";
import clientAxios from "../../config/axios";

const ForgotPassword = ({ setModalForm }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const openNewModal = (modal) => {
    dispatch(setAuthModalForm(modal));
  };

  const sendRequest = async () => {
    try {
      const result = await clientAxios.post(`/api/users/forgot-password`, {
        email,
      });
      toast.success("An email was sent with instructions", {
        style: {
          //background: "rgba(255,255,255,0)",
          background: "#162a31",
          color: "#67de7d",
        },
      });
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
    if (email === "") {
      toast.error("Email is required", {
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
      <div className="flex justify-center">
        <img className="w-36 hidden md:block" src={LogoImage} alt="Logo" />
      </div>
      <p className="text-center mt-3 text-black-200">Reset your password</p>
      <div className="mt-10 px-2">
        <form onSubmit={handleSubmit}>
          <div>
            <p className="text-black-400 mb-1 text-sm font-medium">
              Email <span className="text-red-700">*</span>
            </p>
            <input
              type="text"
              className="bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-green-light-400 hover:bg-green-light-300 text-dark-green-800 px-8 py-3 font-semibold text-sm rounded"
          >
            Send Instructions
          </button>
        </form>
        <div className="inline-flex justify-center items-center w-full">
          <hr className="my-8 w-full h-px bg-gray-400 border-0" />
          <span className="absolute left-1/2 px-5 font-light text-sm text-black-200 -translate-x-1/2 bg-theme">
            OR
          </span>
        </div>
        <button
          onClick={() => openNewModal("login")}
          className="w-full bg-theme text-black-300 px-8 py-3 font-semibold text-sm rounded"
        >
          <i className="fa-solid fa-chevron-left mr-1"></i> Back
        </button>
      </div>
    </>
  );
};

export default ForgotPassword;
