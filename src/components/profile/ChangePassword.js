import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../store/users/userSlice";
import ButtonGreen from "../template/buttons/ButtonGreen";
import Label from "../template/Inputs/Label";

const validationSchema = () => {
  return {
    current_password: Yup.string()
      .min(5, "Must be at least 5 chars long")
      .matches(/\d/, "Must contain a number")
      .max(20, "Must be no more than 20 chars long")
      .required("Required"),
    password: Yup.string()
      .min(5, "Must be at least 5 chars long")
      .matches(/\d/, "Must contain a number")
      .max(20, "Must be no more than 20 chars long")
      .matches(/^(?=.*[A-Z])/, "Must contain one uppercase character")
      .matches(/^(?=.*[a-z])/, "Must contain one lowercase character")
      .matches(
        /^(?=.*[!@#\$%\^&\*.-_])/,
        "Must contain one special case character"
      )
      .required("Required"),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true),
  };
};

const ChangePassword = () => {
  const { errors, loadingButton, message } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      current_password: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      try {
        dispatch(changePassword(formData));
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (errors !== null) {
      toast.error(errors, {
        style: {
          background: "#607d8b",
          color: "#fff",
        },
      });
    }
    if (message !== null) {
      toast.success(message, {
        style: {
          background: "#607d8b",
          color: "#fff",
        },
      });
      formik.resetForm();
    }
    // eslint-disable-next-line
  }, [errors, message]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Label text="Current Password" />
        <input
          type="password"
          name="current_password"
          id="current_password"
          className={`bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none focus:bg-theme placeholder:text-black-400 ${
            formik.touched.current_password && formik.errors.current_password
              ? "border-red-400"
              : "border-rose-800"
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.current_password}
        />
        {formik.touched.current_password && formik.errors.current_password && (
          <span className="text-red-400 text-sm">
            {formik.errors.current_password}
          </span>
        )}
        <Label text="New Password" />
        <input
          type="password"
          name="password"
          id="password"
          className={`bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none focus:bg-theme placeholder:text-black-400 ${
            formik.touched.password && formik.errors.password
              ? "border-red-400"
              : "border-rose-800"
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <span className="text-red-400 text-sm">{formik.errors.password}</span>
        )}
        <Label text="Repeat Password" />
        <input
          type="password"
          name="repeatPassword"
          id="repeatPassword"
          className={`bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none focus:bg-theme placeholder:text-black-400 ${
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
        <ButtonGreen
          type="submit"
          text="Update password"
          icon="fa-key"
          isLoading={loadingButton}
        />
      </form>
    </>
  );
};

export default ChangePassword;
