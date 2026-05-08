// Home.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../store/authStore";
import {
  pageBackground, pageWrapper, pageTitleClass, bodyText,
  articleGrid, articleCardClass, articleTitle, articleExcerpt,
  articleMeta, tagClass, ghostBtn, timestampClass,
  loadingClass, errorClass, emptyStateClass,
  primaryBtn, divider,
} from "../styles/common";

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useAuth((state) => state);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated && currentUser?.role === "AUTHOR") {
      navigate("/author-profile", { replace: true });
    }
    if (isAuthenticated && currentUser?.role === "ADMIN") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("http://localhost:4000/user-api/articles", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setArticles(res.data.payload || []);
        }
      } catch (err) {
        if (err.response?.status === 403) {
          localStorage.clear();
          navigate("/login");
          return;
        }
        if (err.response?.status === 401) {
          setArticles([]);
          return;
        }
        setError(err.response?.data?.message || "Failed to load articles");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
    });

  const openArticle = (article) => {
    navigate(`/article/${article._id}`, { state: article });
  };

  if (loading) return <p className={loadingClass}>Loading articles…</p>;

  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>

        {/* Hero */}
        <div className="mb-14">
          <p className={`${tagClass} mb-3`}>Welcome to MyBlog</p>
          <h1 className={pageTitleClass}>
            {isAuthenticated && currentUser
              ? `Hello, ${currentUser.firstName}.`
              : "Stories worth reading."}
          </h1>
          <p className={`${bodyText} mt-3 max-w-xl`}>
            {isAuthenticated
              ? "Catch up on the latest articles from our authors."
              : "Discover articles on technology, programming, AI, and more. Sign in to leave comments."}
          </p>

          {!isAuthenticated && (
            <div className="flex gap-3 mt-6">
              <button className={primaryBtn} onClick={() => navigate("/register")}>
                Get started
              </button>
              <button
                className="border border-[#d2d2d7] text-[#1d1d1f] font-medium px-5 py-2 rounded-full hover:bg-[#f5f5f7] transition-colors text-sm cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Sign in
              </button>
            </div>
          )}
        </div>

        <div className={divider} />

        {/* Article count */}
        <p className="text-sm text-[#6e6e73] mb-8 mt-10">
          {articles.length} article{articles.length !== 1 ? "s" : ""}
        </p>

        {error && <p className={errorClass}>{error}</p>}

        {!error && articles.length === 0 && (
          <p className={emptyStateClass}>No articles published yet.</p>
        )}

        {/* Articles grid */}
        {articles.length > 0 && (
          <div className={articleGrid}>
            {articles.map((article) => (
              <div key={article._id} className={`${articleCardClass} rounded-2xl flex flex-col`}>
                <span className={tagClass}>{article.category}</span>
                <p className={articleTitle}>{article.title}</p>
                <p className={articleExcerpt}>
                  {article.content?.slice(0, 90)}{article.content?.length > 90 ? "…" : ""}
                </p>
                <div className="mt-auto pt-4 border-t border-[#e8e8ed] flex items-center justify-between">
                  <div>
                    <p className={articleMeta}>
                      {article.author?.firstName
                        ? `${article.author.firstName} ${article.author.lastName || ""}`.trim()
                        : article.author?.email || "Author"}
                    </p>
                    <p className={`${timestampClass} mt-0.5`}>{formatDate(article.createdAt)}</p>
                  </div>
                  <button className={ghostBtn} onClick={() => openArticle(article)}>
                    Read →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Guest CTA at bottom */}
        {!isAuthenticated && articles.length > 0 && (
          <div className="mt-14 bg-[#f5f5f7] rounded-2xl p-8 text-center">
            <p className="text-[#1d1d1f] font-semibold text-lg mb-1">
              Want to join the conversation?
            </p>
            <p className={`${bodyText} text-sm mb-5`}>
              Sign in to comment on articles and save your favourites.
            </p>
            <div className="flex gap-3 justify-center">
              <button className={primaryBtn} onClick={() => navigate("/register")}>
                Create account
              </button>
              <button
                className="border border-[#d2d2d7] text-[#1d1d1f] font-medium px-5 py-2 rounded-full hover:bg-[#ebebf0] transition-colors text-sm cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Sign in
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;