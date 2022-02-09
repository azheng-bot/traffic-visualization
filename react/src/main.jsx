import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyCity from "./views/maps/MyCity/index";
import Knowledge from "./views/maps/Knowledge/index";
import Deep from "./views/maps/Deep/index";
import Future from "./views/maps/Future/index";
import Sign from "./views/knowledgeModule/Sign/index";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<MyCity />}></Route>
          <Route path="/mycity" element={<MyCity />}></Route>
          <Route path="/knowledge" element={<Knowledge />}>
            <Route path="sign" element={<Sign />}></Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
