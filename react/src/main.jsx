import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyCity from "./views/maps/MyCity/index";
import Sign from "./views/knowledgeModule/Sign/index";
import Bus from "./views/mycityModule/bus/index";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<MyCity />}></Route>
          <Route path="/mycity" element={<MyCity />}></Route>
          <Route path="/sign" element={<Sign />}></Route>
          <Route path="/bus" element={<Bus />}></Route>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
