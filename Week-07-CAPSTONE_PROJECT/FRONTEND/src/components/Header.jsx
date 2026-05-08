// Header.jsx

import { NavLink } from "react-router";
import { useAuth } from "../store/authStore";
import {
  navbarClass,
  navContainerClass,
  navBrandClass,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
} from "../styles/common";

function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);

  const getProfilePath = () => {
    if (!user) return "/";
    switch (user.role) {
      case "AUTHOR": return "/author-profile";
      case "ADMIN":  return "/admin/dashboard";
      default:       return "/user-profile";
    }
  };

  return (
    <nav className={navbarClass}>
      <div className={navContainerClass}>
        <NavLink to="/" className={navBrandClass}>
          MyBlog
        </NavLink>

        <ul className={navLinksClass}>
          {(!isAuthenticated || user?.role === "USER") && (
            <li>
              <NavLink to="/" end className={({ isActive }) =>
                isActive ? navLinkActiveClass : navLinkClass}>
                Home
              </NavLink>
            </li>
          )}

          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="/register" className={({ isActive }) =>
                  isActive ? navLinkActiveClass : navLinkClass}>
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className={({ isActive }) =>
                  isActive ? navLinkActiveClass : navLinkClass}>
                  Login
                </NavLink>
              </li>
            </>
          )}

          {isAuthenticated && (
            <li>
              <NavLink to={getProfilePath()} className={({ isActive }) =>
                isActive ? navLinkActiveClass : navLinkClass}>
                {user?.role === "ADMIN" ? "Dashboard" : "Profile"}
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;