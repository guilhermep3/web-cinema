"use client"
import Menu from "@/pages/menu";
import ReadMore from "@/pages/readmore";
import Search from "@/pages/search";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Home() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/readmore" element={<ReadMore />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}