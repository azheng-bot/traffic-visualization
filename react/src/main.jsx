import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyCity from "./views/maps/MyCity/index";
import Icon from "./views/knowledgeModule/Icon/index";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<MyCity />}></Route>
          <Route path="/mycity" element={<MyCity />}></Route>
          <Route path="/icon" element={<Icon />}></Route>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
