import React, { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const ArticleCates = lazy(() => import("@/pages/Article/Cates/index.jsx"));
const ArticleLists = lazy(() => import("@/pages/Article/Lists/index.jsx"));
const ArticleAdd = lazy(() => import("@/pages/Article/Add/index.jsx"));

const Article = () => {
  return (
    <Routes>
      <Route path="/cates" element={<ArticleCates />} />
      <Route path="/lists" element={<ArticleLists />} />
      <Route path="/addcates" element={<ArticleAdd />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Article;
