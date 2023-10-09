import { useEffect } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginUserOTP } from "../../store/users/userSlice";
import { setAuthModalForm, setAuthOpen } from "../../store/modals/modalSlice";
import LogoImage from "../../assets/img/csgocrazy/logo.png";

const validationSchema = () => {
  return {
    email: Yup.string()
      .min(5, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
  };
};

const validationSchemaCode = () => {
  return {
    code: Yup.string()
      .min(6, "Too Short!")
      .max(6, "Too Long!")
      .required("Required"),
  };
};

const LoginForm = () => {
  const { errors, loadingButton, message, isAuthenticated, otpCode } =
    useSelector((state) => state.users);
  const { authOpen } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors !== null) {
      toast.error(errors, {
        style: {
          background: "#607d8b",
          color: "#fff",
        },
      });
    }
  }, [errors]);

  useEffect(() => {
    if (isAuthenticated && authOpen && message != null) {
      toast.success(message, {
        style: {
          background: "#607d8b",
          color: "#fff",
        },
      });
      dispatch(setAuthOpen(false));
    }
  }, [dispatch, isAuthenticated, message, authOpen]);

  const openNewModal = (modal) => {
    dispatch(setAuthModalForm(modal));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      try {
        dispatch(loginUser(formData));
      } catch (error) {
        toast.error(error);
      }
    },
  });

  const formikOTP = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object(validationSchemaCode()),
    onSubmit: (formData) => {
      formData.token = otpCode;
      try {
        dispatch(loginUserOTP(formData));
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
      <p className="text-center mt-3 text-black-300">Sign into your account</p>
      {otpCode === null ? (
        <div className="mt-6 px-2">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <p className="text-black-400 mb-1 text-sm font-medium">
                Username <span className="text-red-700">*</span>
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
                <span className="text-red-400 text-xs">
                  <i className="fa-solid fa-circle-exclamation mr-2"></i>
                  {formik.errors.email}
                </span>
              )}
            </div>
            <div className="mt-3">
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
                <span className="text-red-400 text-xs">
                  <i className="fa-solid fa-circle-exclamation mr-2"></i>
                  {formik.errors.password}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-green-light-400 hover:bg-green-light-300 text-dark-green-800 px-8 py-3 font-semibold text-sm rounded"
              disabled={loadingButton ? true : false}
            >
              Sign In{" "}
              {loadingButton && (
                <i className="fa-solid fa-spinner fa-spin ml-2"></i>
              )}
            </button>
          </form>
          <div className="inline-flex justify-center items-center w-full">
            <hr className="my-8 w-full h-px bg-gray-400 border-0" />
            <span className="absolute left-1/2 px-5 font-light text-sm text-black-200 -translate-x-1/2 bg-theme">
              OR
            </span>
          </div>
          <p className="text-center">
            <span
              onClick={() => openNewModal("reset")}
              className="text-black-300 hover:opacity-75 text-sm font-medium cursor-pointer"
            >
              Forgot your password?
            </span>
          </p>
          <p className="text-black-400 text-sm text-center mt-2">
            Don't have an account?
            <span
              onClick={() => openNewModal("register")}
              className="text-black-300 cursor-pointer font-medium ml-1 hover:opacity-75"
            >
              Register an account
            </span>
          </p>
          {/*<p className="text-black-400 text-xs mt-8 text-justify">
            BETPrime is protected by hCaptcha. hCaptcha Privacy Policy and Terms
            of Service apply
              </p>*/}
        </div>
      ) : (
        <div className="mt-10 px-5">
          <form onSubmit={formikOTP.handleSubmit}>
            <div className="mt-4">
              <p className="text-black-400 mb-1 text-sm font-medium">
                2FA Code <span className="text-red-700">*</span>
              </p>
              <input
                type="text"
                name="code"
                id="code"
                className={`bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400 ${
                  formikOTP.touched.code && formikOTP.errors.code
                    ? "border-red-400"
                    : "border-rose-800"
                }`}
                placeholder="2FA Code"
                onChange={formikOTP.handleChange}
                onBlur={formikOTP.handleBlur}
                value={formikOTP.values.code}
              />
              {formikOTP.touched.code && formikOTP.errors.code && (
                <span className="text-red-400 text-sm">
                  {formikOTP.errors.code}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-green-light-400 hover:bg-green-light-300 text-dark-green-800 px-8 py-3 font-semibold text-sm rounded"
              disabled={loadingButton ? true : false}
            >
              Continue{" "}
              {loadingButton && (
                <i className="fa-solid fa-spinner fa-spin ml-2"></i>
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginForm;
