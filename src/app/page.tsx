"use client"
import { Menu } from "@/pages/menu/menu";
import { ReadMore } from "@/pages/readmore/readmore";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Home() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu/>}/>
        <Route path="/readmore" element={<ReadMore/>}/>
      </Routes>
    </Router>
  );
}