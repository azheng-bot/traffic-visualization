import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MyCity from "./views/MyCity/index";
import Knowledge from "./views/Knowledge/index";
import Deep from "./views/Deep/index";
import Future from "./views/Future/index";
import Sign from "./views/Knowledge/Sign/index";
import Bus from "./views/MyCity/bus/index";

import Bus from "./views/mycityModule/bus/index";
import Metro from "./views/mycityModule/metro/index";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<MyCity />}></Route>
          <Route path="/mycity" element={<MyCity />}>
            <Route path="bus" element={<Bus />}></Route>
          </Route>
          <Route path="/knowledge" element={<Knowledge />}>
            <Route path="sign" element={<Sign />}></Route>
          </Route>
          <Route path="/deep" element={<Deep />}>
            <Route path="now" element={<Sign />}></Route>
          </Route>
          <Route path="/future" element={<Future />}>
            <Route path="ai" element={<Sign />}></Route>
          </Route>
          <Route path="/bus" element={<Bus />}></Route>
          <Route path="/metro/:id" element={<Metro />}></Route>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
