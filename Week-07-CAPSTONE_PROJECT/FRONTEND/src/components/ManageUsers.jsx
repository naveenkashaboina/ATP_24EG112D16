// ManageUsers.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import {
  pageBackground, pageWrapper, pageTitleClass, bodyText, tagClass,
  loadingClass, emptyStateClass, errorClass, successClass,
} from "../styles/common";

function ManageUsers() {
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("all");
  const [toggling, setToggling] = useState(null);
  const [feedback, setFeedback] = useState({ type: "", msg: "" });

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin-api/users-authors", { withCredentials: true })
      .then((res) => setUsers(res.data.payload || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const toggleState = async (email, currentState) => {
    setToggling(email);
    setFeedback({ type: "", msg: "" });
    try {
      await axios.put(
        "http://localhost:4000/admin-api/state",
        { mail: email, toBeActive: !currentState },  // send boolean directly
        { withCredentials: true }
      );
      setUsers((prev) =>
        prev.map((u) => u.email === email ? { ...u, isUserActive: !currentState } : u)
      );
      setFeedback({
        type: "success",
        msg: `${email} has been ${!currentState ? "activated" : "blocked"}.`,
      });
    } catch {
      setFeedback({ type: "error", msg: "Failed to update account state." });
    } finally {
      setToggling(null);
      setTimeout(() => setFeedback({ type: "", msg: "" }), 3000);
    }
  };

  const counts = {
    all:    users.length,
    USER:   users.filter((u) => u.role === "USER").length,
    AUTHOR: users.filter((u) => u.role === "AUTHOR").length,
  };

  const filtered = filter === "all" ? users : users.filter((u) => u.role === filter);

  return (
    <div className={pageBackground}>
      <AdminNavbar />
      <div className={pageWrapper}>
        <div className="mb-10">
          <p className={`${tagClass} mb-2`}>Accounts</p>
          <h1 className={pageTitleClass}>Users & Authors</h1>
          <p className={`${bodyText} mt-1 text-sm`}>
            Block or activate accounts on your platform.
          </p>
        </div>

        {feedback.msg && (
          <p className={`${feedback.type === "success" ? successClass : errorClass} mb-6`}>
            {feedback.msg}
          </p>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2 mb-8">
          {[["all", "All"], ["USER", "Users"], ["AUTHOR", "Authors"]].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                filter === val
                  ? "bg-[#1d1d1f] text-white"
                  : "border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7]"
              }`}>
              {label} ({counts[val]})
            </button>
          ))}
        </div>

        {loading ? (
          <p className={loadingClass}>Loading users…</p>
        ) : filtered.length === 0 ? (
          <p className={emptyStateClass}>No accounts found.</p>
        ) : (
          <div className="bg-[#f5f5f7] rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8e8ed]">
                  {["Email", "Role", "Status", "Action"].map((h) => (
                    <th key={h} className="text-left px-6 py-3.5 text-xs font-semibold text-[#6e6e73] uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, idx) => (
                  <tr key={user.email}
                    className={`hover:bg-[#ebebf0] transition-colors ${
                      idx !== filtered.length - 1 ? "border-b border-[#e8e8ed]" : ""
                    }`}>
                    <td className="px-6 py-4 font-medium text-[#1d1d1f]">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[0.65rem] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                        user.role === "AUTHOR"
                          ? "bg-[#0066cc]/10 text-[#0066cc]"
                          : "bg-[#e8e8ed] text-[#6e6e73]"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                        user.isUserActive
                          ? "bg-[#34c759]/15 text-[#248a3d]"
                          : "bg-[#ff3b30]/10 text-[#cc2f26]"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.isUserActive ? "bg-[#34c759]" : "bg-[#ff3b30]"}`} />
                        {user.isUserActive ? "Active" : "Blocked"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleState(user.email, user.isUserActive)}
                        disabled={toggling === user.email}
                        className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                          user.isUserActive
                            ? "bg-[#ff3b30]/10 text-[#cc2f26] hover:bg-[#ff3b30]/20"
                            : "bg-[#34c759]/15 text-[#248a3d] hover:bg-[#34c759]/25"
                        }`}>
                        {toggling === user.email ? "Updating…" : user.isUserActive ? "Block" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;