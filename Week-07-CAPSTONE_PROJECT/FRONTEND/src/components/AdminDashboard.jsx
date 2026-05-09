//  AdminDashboard.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import {
  pageBackground, pageWrapper, pageTitleClass, bodyText,
  cardClass, headingClass, subHeadingClass, mutedText,
  loadingClass, divider,
} from "../styles/common";

function AdminDashboard() {
  const [stats, setStats] = useState({ articles: 0, users: 0, authors: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [articlesRes, usersRes] = await Promise.all([
          axios.get("https://atp-24eg112d16.onrender.com/admin-api/articles", { withCredentials: true }),
          axios.get("https://atp-24eg112d16.onrender.com/admin-api/users-authors", { withCredentials: true }),
        ]);
        const articles = articlesRes.data.payload || [];
        const users = usersRes.data.payload  || [];
        setStats({
          articles: articles.length,
          users: users.filter((u) => u.role === "USER").length,
          authors: users.filter((u) => u.role === "AUTHOR").length,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Articles", value: stats.articles, route: "/admin/articles" },
    { label: "Authors",        value: stats.authors,  route: "/admin/users" },
    { label: "Readers",        value: stats.users,    route: "/admin/users" },
  ];

  const quickLinks = [
    { title: "Browse All Articles", desc: "View every published article across all authors.", route: "/admin/articles" },
    { title: "Manage Accounts",     desc: "Block or activate user and author accounts.",      route: "/admin/users" },
  ];

  return (
    <div className={pageBackground}>
      <AdminNavbar />
      <div className={pageWrapper}>
        <div className="mb-12">
          <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-[#0066cc] mb-3">
            Overview
          </p>
          <h1 className={pageTitleClass}>Dashboard</h1>
          <p className={`${bodyText} mt-2`}>Your blog platform at a glance.</p>
        </div>

        {loading ? (
          <p className={loadingClass}>Loading stats…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            {statCards.map((card) => (
              <button key={card.label} onClick={() => navigate(card.route)}
                className={`${cardClass} text-left`}>
                <p className={mutedText}>{card.label}</p>
                <p className="text-5xl font-bold text-[#1d1d1f] tracking-tight mt-2 mb-1">
                  {card.value}
                </p>
              </button>
            ))}
          </div>
        )}

        <div className={divider} />

        <div className="mt-10">
          <h2 className={`${headingClass} mb-6`}>Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickLinks.map((item) => (
              <button key={item.title} onClick={() => navigate(item.route)}
                className={`${cardClass} text-left`}>
                <p className={subHeadingClass}>{item.title}</p>
                <p className={`${bodyText} text-sm mt-1`}>{item.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;