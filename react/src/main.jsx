import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// cityInfoContext
import { CityInfoContextProvider, cityInfoContext } from './utils/reducer'
// antd design


// 我的城市 - MyCity
import MyCity from "./views/MyCity/index";
import Bus from "./views/MyCity/Bus/index";
import Subway from "./views/MyCity/Subway/index";
// 基础通识 - Knowledge
import Knowledge from "./views/Knowledge/index";
import Sign from "./views/Knowledge/Sign/index";
// 深入交通 - Deep
import Deep from "./views/Deep/index";
// 未来展望 - Future
import Future from "./views/Future/index";

ReactDOM.render(
  <React.StrictMode>
    <CityInfoContextProvider  >
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<MyCity />}></Route>
            <Route path="/mycity" element={<MyCity />}>
              <Route path="bus" element={<Bus />}></Route>
              <Route path="subway/:id" element={<Subway />}></Route>
            </Route>
            <Route path="/knowledge" element={<Knowledge />}>
              <Route path="sign" element={<Sign />}></Route>
              <Route path="sign" element={<Sign />}></Route>
            </Route>
            <Route path="/deep" element={<Deep />}>
              <Route path="now" element={<Sign />}></Route>
            </Route>
            <Route path="/future" element={<Future />}>
              <Route path="ai" element={<Sign />}></Route>
            </Route>
            <Route path="/bus" element={<Bus />}></Route>
            <Route path="/subway/:id" element={<Subway />}></Route>
          </Route>
        </Routes>
      </Router>
    </ CityInfoContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
