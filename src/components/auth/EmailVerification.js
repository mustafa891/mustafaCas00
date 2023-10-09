import React from "react";

const EmailVerification = () => {
  return (
    <>
      <p className="mb-4 text-black-300 text-center font-semibold text-xl">
        Email Verification
      </p>

      <i className="fa-solid fa-circle-check fa-5x text-green-600 flex justify-center"></i>
      <p className="text-black-300 text-center mb-4 mt-4">
        A verification email was sent to your email address. Please check and
        verify your email.
      </p>
    </>
  );
};

export default EmailVerification;
