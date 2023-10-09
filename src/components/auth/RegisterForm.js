import { useEffect } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/users/userSlice";
import { setAuthModalForm } from "../../store/modals/modalSlice";
import LogoImage from "../../assets/img/csgocrazy/logo.png";
import { useLocation } from "react-router-dom";

const validationSchema = () => {
  return {
    username: Yup.string()
      .min(4, "Too Short!")
      .max(12, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(15, "Too Long!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{5,})/,
        "Must Contain 5 Characters, One Uppercase, One Lowercase and One Number"
      )
      .required("Required"),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true),
    terms: Yup.boolean().required("You must agree to the terms of service"),
  };
};

const RegisterForm = () => {
  const { errors, isLoading, showEmailVerification } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors != null)
      toast.error(errors, {
        style: {
          background: "#607d8b",
          color: "#fff",
        },
      });

    if (showEmailVerification) dispatch(setAuthModalForm("email_verification"));
  }, [errors, showEmailVerification, dispatch]);

  const openNewModal = (modal) => {
    dispatch(setAuthModalForm(modal));
  };

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const referral = searchParams.get("ref") || "";

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
      terms: "",
    },
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      try {
        formData.referral = referral;
        dispatch(registerUser(formData));
      } catch (error) {
        toast.error(error);
      }
    },
  });

  return (
    <>
      <div className="flex justify-center">
        <img className="w-36 hidden md:block" src={LogoImage} alt="Logo" />
      </div>
      <p className="text-center mt-3 text-black-300">Create New Account</p>
      <div className="mt-10 px-2">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <p className="text-black-400 mb-1 text-sm font-medium">
              Username <span className="text-red-700">*</span>
            </p>
            <input
              type="text"
              name="username"
              id="username"
              className={`bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400 ${
                formik.touched.username && formik.errors.username
                  ? "border-red-400"
                  : "border-rose-800"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
              <span className="text-red-400 text-sm">
                {formik.errors.username}
              </span>
            )}
          </div>
          <div className="mt-4">
            <p className="text-black-400 mb-1 text-sm font-medium">
              Email <span className="text-red-700">*</span>
            </p>
            <input
              type="text"
              name="email"
              id="email"
              className={`bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-400"
                  : "border-rose-800"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-400 text-sm">
                {formik.errors.email}
              </span>
            )}
          </div>
          <div className="mt-4">
            <p className="text-black-400 mb-1 text-sm font-medium">
              Password <span className="text-red-700">*</span>
            </p>
            <input
              type="password"
              name="password"
              id="password"
              className={`bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-400"
                  : "border-rose-800"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <span className="text-red-400 text-sm">
                {formik.errors.password}
              </span>
            )}
          </div>
          <div className="mt-4">
            <p className="text-black-400 mb-1 text-sm font-medium">
              Repeat password <span className="text-red-700">*</span>
            </p>
            <input
              type="password"
              name="repeatPassword"
              id="repeatPassword"
              className={`bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400 ${
                formik.touched.repeatPassword && formik.errors.repeatPassword
                  ? "border-red-400"
                  : "border-rose-800"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.repeatPassword}
            />
            {formik.touched.repeatPassword && formik.errors.repeatPassword && (
              <span className="text-red-400 text-sm">
                {formik.errors.repeatPassword}
              </span>
            )}
          </div>
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              className="w-4 h-4 bg-transparent rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.terms}
            />
            <label htmlFor="terms" className="ml-2 text-sm text-black-400">
              I agree to{" "}
              <span className="text-green-light-400">Terms of Service</span>
            </label>
          </div>
          {formik.touched.terms && formik.errors.terms && (
            <span className="text-red-400 text-sm block">
              {formik.errors.terms}
            </span>
          )}
          <button
            type="submit"
            className="mt-4 w-full bg-green-light-400 hover:bg-green-light-300 text-dark-green-800 px-8 py-3 font-semibold text-sm rounded"
            disabled={isLoading ? true : false}
          >
            Create account
            {isLoading && <i className="fa-solid fa-spinner fa-spin ml-2"></i>}
          </button>
        </form>
        <div className="inline-flex justify-center items-center w-full">
          <hr className="my-8 w-full h-px bg-gray-400 border-0" />
          <span className="absolute left-1/2 px-5 font-light text-sm text-black-200 -translate-x-1/2 bg-theme">
            OR
          </span>
        </div>
        <p className="text-black-400 text-sm text-center mt-2">
          Have an account?
          <span
            onClick={() => openNewModal("login")}
            className="text-black-300 cursor-pointer font-medium ml-1 hover:opacity-75"
          >
            Login now
          </span>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;
