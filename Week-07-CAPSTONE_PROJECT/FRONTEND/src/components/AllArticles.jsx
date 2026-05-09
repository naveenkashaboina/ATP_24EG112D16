// AllArticles.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import {
  pageBackground, pageWrapper, pageTitleClass, bodyText, tagClass,
  articleGrid, articleCardClass, articleTitle, articleExcerpt, articleMeta,
  loadingClass, emptyStateClass,
} from "../styles/common";

function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    axios
      .get("https://atp-24eg112d16.onrender.com/admin-api/articles", { withCredentials: true })
      .then((res) => setArticles(res.data.payload || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={pageBackground}>
      <AdminNavbar />
      <div className={pageWrapper}>
        <div className="mb-10">
          <p className={`${tagClass} mb-2`}>All Articles</p>
          <h1 className={pageTitleClass}>Articles</h1>
          <p className={`${bodyText} mt-1 text-sm`}>
            {articles.length} articles across all authors
          </p>
        </div>

        {loading ? (
          <p className={loadingClass}>Loading articles…</p>
        ) : articles.length === 0 ? (
          <p className={emptyStateClass}>No articles found.</p>
        ) : (
          <div className={articleGrid}>
            {articles.map((article) => (
              <div key={article._id} className={`${articleCardClass} rounded-2xl flex flex-col`}>
                {article.category && <span className={tagClass}>{article.category}</span>}
                <p className={articleTitle}>{article.title}</p>
                <p className={articleExcerpt}>
                  {article.content?.slice(0, 90)}{article.content?.length > 90 ? "…" : ""}
                </p>
                <div className="mt-auto pt-3 border-t border-[#e8e8ed]">
                  <p className={articleMeta}>{article.author?.email || "Unknown"}</p>
                  <p className={articleMeta}>
                    {article.createdAt
                      ? new Date(article.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric",
                        })
                      : "—"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllArticles;