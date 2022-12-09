import { Routes, Route } from "react-router-dom";
import React, { useReducer, createContext, useState } from "react";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ScrollPage from "./components/button/ScrollPage";

export default function App() {

  return (
    <ScrollPage>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slugCategory" element={<BlogByCategory />} />
        <Route path="/blogs/:slugCategory/:slug" element={<ReadBlog />} /> */}
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ScrollPage>
  );
}