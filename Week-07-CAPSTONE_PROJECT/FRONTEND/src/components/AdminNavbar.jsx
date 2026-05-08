// AdminNavbar.jsx

import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import {
  navbarClass, navContainerClass, navBrandClass, navLinksClass,
  navLinkClass, navLinkActiveClass,
} from "../styles/common";

function AdminNavbar() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className={navbarClass}>
      <div className={navContainerClass}>
        <div className="flex items-center gap-2.5">
          <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-[#0066cc] bg-[#0066cc]/10 px-2.5 py-0.5 rounded-full">
            Admin
          </span>
          <span className={navBrandClass}>Blog Panel</span>
        </div>

        <ul className={navLinksClass}>
          <li>
            <NavLink to="/admin/dashboard" className={({ isActive }) =>
              isActive ? navLinkActiveClass : navLinkClass}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/articles" className={({ isActive }) =>
              isActive ? navLinkActiveClass : navLinkClass}>
              Articles
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className={({ isActive }) =>
              isActive ? navLinkActiveClass : navLinkClass}>
              Users
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          {currentUser?.email && (
            <span className="text-xs text-[#a1a1a6] hidden sm:block">
              {currentUser.email}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="text-[#ff3b30] hover:text-[#d62c23] text-sm font-medium transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;