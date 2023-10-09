import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <ul className="text-black-300 mt-3 md:w-1/4 w-full">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "py-2 px-5 bg-theme hover:border-l-4 hover:border-green-600 border-green-600 border-l-4 rounded mb-2 cursor-pointer block"
              : "py-2 px-5 bg-theme hover:border-l-4 hover:border-green-600 rounded mb-2 cursor-pointer block"
          }
        >
          Overview
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "py-2 px-5 bg-theme hover:border-l-4 hover:border-green-600 border-green-600 border-l-4 rounded mb-2 cursor-pointer block"
              : "py-2 px-5 bg-theme hover:border-l-4 hover:border-green-600 rounded mb-2 cursor-pointer block"
          }
        >
          Settings
        </NavLink>
      </ul>
    </>
  );
};

export default Menu;
