import Auth from "./auth/Auth";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";
import Home from "./router/Home"
import React, {useState} from "react";
import "./bootstrap.min.css";
import Detail from "./router/Detail"
import MyPage from "./router/MyPage";
import Super from "./super/Super";



function App() {
  return(
    <Router>
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Home />} />
      {/* 프로그램 별로 가지고 있는 id를 Detail 컴포넌트에게 전달 */}
      <Route path="/prog/:id" element={<Detail />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/super" element={<Super />} />
    </Routes>
  </Router>
  );
}

export default App;
