import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import { profileUser } from "../store/users/userSlice";

const AdminLayout = () => {
  const [sideBar, setSideBar] = useState(true);
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.users
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileUser());
  }, [dispatch]);

  if (isLoading) {
    return (
      <p className="text-black-300 mt-2 text-md text-center">
        <i className="fa-solid fa-spinner fa-spin"></i> Loading...
      </p>
    );
  }

  if (user?.role !== "admin" && user !== null) {
    return <Navigate to="/" replace />;
  }

  return isAuthenticated ? (
    <>
      <Toaster />
      <nav className="bg-theme border-b border-rose-300 fixed z-30 w-full">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                id="toggleSidebarMobile"
                aria-expanded="true"
                aria-controls="sidebar"
                className="lg:hidden mr-2 text-black-600 hover:text-black-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                onClick={() => setSideBar(!sideBar)}
              >
                <svg
                  id="toggleSidebarMobileHamburger"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  id="toggleSidebarMobileClose"
                  className="w-6 h-6 hidden"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <NavLink
                to="/admin-panel"
                className="text-xl font-bold flex items-center lg:ml-2.5 text-black-300"
              >
                <span className="self-center whitespace-nowrap">
                  Admin Panel
                </span>
                <span className="text-sm ml-3">v1.1</span>
              </NavLink>
              <form action="#" method="GET" className="hidden lg:pl-32">
                <label htmlFor="topbar-search" className="sr-only">
                  Search user
                </label>
                <div className="mt-1 relative lg:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-black-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="email"
                    id="topbar-search"
                    className="bg-theme border border-rose-300 text-black-200 sm:text-sm rounded-lg focus:outline-none focus:bg-theme block w-full pl-10 p-2.5"
                    placeholder="Search user"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center">
              <button
                id="toggleSidebarMobileSearch"
                type="button"
                className="hidden text-black-500 hover:text-black-900 hover:bg-gray-100 p-2 rounded-lg"
              >
                <span className="sr-only">Search</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <NavLink
                to="/"
                className="hidden sm:inline-flex ml-5 text-black-700 bg-blue-white-200 hover:opacity-80 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3"
              >
                <i className="fa-solid fa-chevron-left mr-2"></i>
                Back to User page
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex overflow-hidden bg-theme pt-16">
        <Sidebar sideBar={sideBar} setSideBar={setSideBar} />
        <div
          className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
          id="sidebarBackdrop"
        ></div>
        <div
          id="main-content"
          className="h-full w-full bg-theme relative overflow-y-auto lg:ml-64"
        >
          <main>
            <div className="pt-6 px-4">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminLayout;