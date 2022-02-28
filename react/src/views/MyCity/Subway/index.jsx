import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cityList from "./cityList.js";
import "./index.less";
import "https://webapi.amap.com/subway?v=1.0&key=c6e434d1188e1c9f904dc256f7e14de8&callback=cbk";
function Metro(props) {
  let [adcodeId, setAdcodeId] = useState(1100);
  let [mySubway, setmySubway] = useState({});
  // 线路
  let [lineList, setLineList] = useState([]);
  // 控制线路显示隐藏
  let [flag, setFlag] = useState('address');
  // 默认地址
  let [address, setAddres] = useState("北京市");
  // 默认线路
  let [line, setLine] = useState("所有线路");
  let [lineId, setLineId] = useState(0);

  // var mySubway;
  useEffect(() => {
    cityList.map((item) => {
      if (item.adcode == adcodeId) {
        setAddres(item.name);
      }
    });
    window.cbk = function () {
      mySubway = subway("subway-map", {
        adcode: adcodeId,
        easy: 1,
      });
      mySubway.event.on("subway.complete", function () {
        mySubway.getLineList(function (res) {
          console.log("res", res);
          setLineList(res);
        });
      });
      //点击线路名，高亮此线路
      mySubway.event.on("lineName.touch", function (ev, info) {
        mySubway.showLine(info.id);
        var select_obj = qs("#g-select");
        mySubway.setFitView(select_obj);
        var center = mySubway.getSelectedLineCenter();
        mySubway.setCenter(center);
      });
      //点击空白, 关闭infowindow
      setmySubway(mySubway);
    };
  }, []);

  let lineClick = (item) => {
    if (item == "全部") {
      setLine("全部线路");
      setLineId(0);
      mySubway.clearOverlays();
    } else {
      setLine(item.shortname);
      setLineId(item.id);
      mySubway.showLine ? mySubway.showLine(item.id) : "";
      var select_obj = document.getElementById("g-select");
      mySubway.setFitView ? mySubway.setFitView(select_obj) : "";
      var center = mySubway.getSelectedLineCenter();
      mySubway.setCenter(center);
    }
  };
  const addressClick = (city) => {
    setAddres(city.name);
    console.log(city.adcode)
    setAdcodeId(city.adcode)

    // document.getElementById('subway-map').innerHTML = ''
    mySubway = null;
    mySubway = subway("subway-map", {
      adcode: city.adcode,
      easy: 1,
    });
    mySubway.event.on("subway.complete", function () {
      mySubway.getLineList(function (res) {
        console.log("res", res);
        setLineList(res);
      });
    });
    //点击线路名，高亮此线路
    mySubway.event.on("lineName.touch", function (ev, info) {
      mySubway.showLine(info.id);
      var select_obj = qs("#g-select");
      mySubway.setFitView(select_obj);
      var center = mySubway.getSelectedLineCenter();
      mySubway.setCenter(center);
    });
    //点击空白, 关闭infowindow
    // setmySubway(mySubway);

  };
  return (
    <div className={["subway-module", 'show-' + flag].join(' ')}>
      <div className="address">
        <div
          className='address_default'
          onClick={() => {
            flag == 'address' ? setFlag("none") : setFlag('address')
          }}
        >
          <span>
            {address}
          </span>
          {flag == 'address' ? (
            <img
              src="https://hrsaas.obs.cn-north-4.myhuaweicloud.com/icon_up.png"
              alt=""
            />
          ) : (
            <img
              src="https://hrsaas.obs.cn-north-4.myhuaweicloud.com/icon_down.png"
              alt=""
            />
          )}
        </div>
        <ul>
          {cityList.map((item) => (
            <li
              className={item.adcode == adcodeId ? "bg" : ""}
              key={item.adcode}
              onClick={() => {
                addressClick(item);
              }}
            >
              <span href={`/subway/${item.adcode}`}>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="line">
        <div
          className="line_default"
          onClick={() => {
            flag == 'line' ? setFlag("none") : setFlag('line')
          }}
        >
          {line}
          {flag == 'line' ? (
            <img
              src="https://hrsaas.obs.cn-north-4.myhuaweicloud.com/icon_up.png"
              alt=""
            />
          ) : (
            <img
              src="https://hrsaas.obs.cn-north-4.myhuaweicloud.com/icon_down.png"
              alt=""
            />
          )}
        </div>
        <ul>
          <li
            className={line === "所有线路" ? "bg" : ""}
            onClick={() => {
              lineClick("全部");
            }}
          >
            全部线路
          </li>
          {lineList.map((item) => (
            <li
              className={item.id === lineId ? "bg" : ""}
              onClick={() => {
                lineClick(item);
              }}
              key={item.id}
            >
              {item &&
                <span className="color" style={{ background: '#'+item.color }}></span>}
              {item.shortname}
              {item.laname ? `  (${item.laname})` : ""}
            </li>
          ))}
        </ul>
      </div>
      <div id="subway-map"></div>
    </div>
  );
}

export default Metro;
