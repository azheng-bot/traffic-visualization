import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// cityInfoContext
import { CityInfoContextProvider, cityInfoContext } from "./utils/reducer";
// arco design
import "@arco-design/web-react/dist/css/arco.css";

// 城市交通 - MyCity
import MyCity from "./views/MyCity/index";
import Bus from "./views/MyCity/Bus/index";
import Subway from "./views/MyCity/Subway/index";
// 基础通识 - Simple
import Simple from "./views/Simple/index";
import Sign from "./views/Simple/Sign/index";
import Laws from "./views/Simple/Law/index";
import Tool from "./views/Simple/Tool/index";
// 深入交通 - Deep
import Deep from "./views/Deep/index";
import News from "./views/Deep/News/index";
import Carbon from "./views/Deep/Carbon/index";
// 数据汇总 - Count
import Count from "./views/Count/index";
import ProvinceCount from "./views/Count/ProvinceCount/index";
import CountryCount from "./views/Count/CountryCount/index";

ReactDOM.render(
  // <React.StrictMode>
  <CityInfoContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>

          <Route path="/" element={<MyCity />}></Route>

          <Route path="/mycity" element={<MyCity />}>
            <Route path="bus" element={<Bus />}></Route>
            <Route path="subway" element={<Subway />}></Route>
          </Route>

          <Route path="/knowledge" element={<Simple />}>
            <Route path="sign" element={<Sign />}></Route>
            <Route path="law" element={<Laws />}></Route>
            <Route path="tool" element={<Tool />}></Route>
          </Route>

          <Route path="/deep" element={<Deep />}>
            <Route path="news" element={<News />}></Route>
            <Route path="carbon" element={<Carbon />}></Route>
          </Route>

          <Route path="/count" element={<Count />}>
            <Route path="province" element={<ProvinceCount />}></Route>
            <Route path="country" element={<CountryCount />}></Route>
          </Route>



          <Route path="/bus" element={<Bus />}></Route>
          <Route path="/subway/:id" element={<Subway />}></Route>
          <Route path="/subway" element={<Subway />}></Route>
          <Route path="/sign" element={<Sign />}></Route>
          <Route path="/law" element={<Laws />}></Route>
          <Route path="/tool" element={<Tool />}></Route>
          <Route path="/news" element={<News />}></Route>
          <Route path="/count/province" element={<ProvinceCount />}></Route>
          <Route path="/count/country" element={<CountryCount />}></Route>
          <Route path="/carbon" element={<Carbon />}></Route>

        </Route>
      </Routes>
    </Router>
  </CityInfoContextProvider>
  // </React.StrictMode>
  ,
  document.getElementById("root")
);
