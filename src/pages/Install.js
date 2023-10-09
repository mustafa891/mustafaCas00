import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ButtonGreen from "../components/template/buttons/ButtonGreen";
import clientAxios from "../config/axios";

const Install = () => {
  const [siteName, setSiteName] = useState("");
  const [siteDomain, setSiteDomain] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirect, setIsRedirect] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const validateInstallation = async () => {
      try {
        await clientAxios.get(`/api/settings/isInstalled`);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsRedirect(true);
      }
    };

    validateInstallation();
  }, []);

  if (isLoading) {
    return (
      <p className="text-black-300 mt-2 text-md text-center">
        <i className="fa-solid fa-spinner fa-spin"></i> Loading...
      </p>
    );
  }

  if (isRedirect) {
    return <Navigate to="/" replace />;
  }

  const submitInstallation = async () => {
    try {
      await clientAxios.post(`/api/settings/poblate`, {
        site_name: siteName,
        site_domain: siteDomain,
        username,
        email: email,
        password: password,
      });
      setIsInstalled(true);
    } catch (error) {
      setIsInstalled(false);
    }
  };

  const handleSubmit = () => {
    submitInstallation();
  };

  return isInstalled ? (
    <>
      <p className="text-center py-5 text-green-400">
        <i className="fa-solid fa-check-circle fa-5x"></i>
      </p>
      <p className=" text-black-300 text-base text-center">
        Installed successfully
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
      <div className="flex justify-center align-middle items-center h-screen">
        <div className="w-1/3 border-4 border-rose-300 rounded-md px-5 py-8">
          <p className=" text-black-300 text-2xl uppercase text-center">
            INSTALLATION
          </p>
          <p className="text-center py-5 text-black-300">
            <i className="fa-solid fa-gears fa-4x"></i>
          </p>
          <p className=" text-black-300 text-base text-center">
            Fill all inputs to install.
          </p>
          <p className="text-black-400 mb-1 text-sm font-medium">
            Site name <span className="text-red-700">*</span>
          </p>
          <input
            type="text"
            name="site_name"
            className={`bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400`}
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
          />
          <p className="text-black-400 mb-1 text-sm font-medium mt-3">
            Site domain <span className="text-red-700">*</span>
          </p>
          <input
            type="text"
            name="site_domain"
            className={`bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400`}
            value={siteDomain}
            onChange={(e) => setSiteDomain(e.target.value)}
          />
          <p className="my-3 text-black-300">Admin details</p>
          <p className="text-black-400 mb-1 text-sm font-medium mt-3">
            Username <span className="text-red-700">*</span>
          </p>
          <input
            type="text"
            name="username"
            className={`bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className="text-black-400 mb-1 text-sm font-medium mt-3">
            Email <span className="text-red-700">*</span>
          </p>
          <input
            type="email"
            name="email"
            className={`bg-theme text-sm w-full py-3 px-5 rounded-md text-black-200 focus:outline-none placeholder:text-black-400`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-black-400 mb-1 text-sm font-medium mt-3">
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
            type="button"
            onClick={() => handleSubmit()}
            icon="fa-cog"
            text="Install"
          />
        </div>
      </div>
    </>
  );
};

export default Install;
