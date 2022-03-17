import React, { useEffect, useState } from "react";
import cityList from "./cityList.js";
import "./index.less";
// import "https://webapi.amap.com/subway?v=1.0&key=c6e434d1188e1c9f904dc256f7e14de8&callback=cbk";
import Loading from "../../../components/Loading";

function Metro(props) {
  let [adcodeId, setAdcodeId] = useState(1100);
  let [mySubway, setmySubway] = useState({});
  // 线路
  let [lineList, setLineList] = useState([]);
  // 控制线路显示隐藏
  let [flag, setFlag] = useState("address");
  // 默认地址
  let [address, setAddres] = useState("北京市");
  // 默认线路
  let [line, setLine] = useState("所有线路");
  let [lineId, setLineId] = useState(0);
  // 控制loading
  let [flagLoading, setFlagLoading] = useState(true);

  useEffect(() => {
    cityList.map((item) => {
      if (item.adcode == adcodeId) {
        setAddres(item.name);
      }
    });
    // if (!document.querySelector("#beijing")) return;
    // 创建地铁图
    let script = document.createElement('script')
    script.src = `https://webapi.amap.com/subway?v=1.0&key=${import.meta.env.VITE_WebMapKey}&callback=cbk`
    document.body.appendChild(script)
    
    window.cbk = function () {
      mySubway = subway("beijing", {
        adcode: adcodeId,
        easy: 1,
      }); 
      console.log('mySubway', mySubway)
      mySubway.event.on("subway.complete", function () {
        console.log("地铁图加载成功");
        // 获取线路
        mySubway.getLineList(function (res) {
          setLineList(res);
        });
        // 关闭Loading组件
        setFlagLoading(false);
      });
      setmySubway(mySubway);
    };
  }, []);

  let lineClick = (item) => {
    console.log('item',item);
    if (item == "全部") {
      setLine("全部线路");
      setLineId(0);
      mySubway.clearOverlays();
    } else {
      setLine(item.shortname);
      setLineId(item.id);
      mySubway.showLine(item.id);
      mySubway.showLine ? mySubway.showLine(item.id) : "";
      var select_obj = document.getElementById("g-select");
      mySubway.setFitView ? mySubway.setFitView(select_obj) : "";
      var center = mySubway.getSelectedLineCenter();
      mySubway.setCenter(center);
    }
  };
  const addressClick = (city) => {
    if (address === city.name) return;
    setFlagLoading(true);
    setLineList([]);
    setAddres(city.name);
    setAdcodeId(city.adcode);
    lineClick("全部");
    mySubway = null;
    let list = cityList;
    list.map((item) => {
      if (item.adcode === city.adcode) {
        item.flag = true;
      } else {
        item.flag = false;
      }
    });
    setTimeout(() => {
      mySubway = subway(city.city, {
        adcode: city.adcode,
        easy: 1,
      });
      mySubway.event.on("subway.complete", function () {
        mySubway.getLineList(function (res) {
          setLineList(res);
        });
        setFlagLoading(false);
      });
      setmySubway(mySubway);
    }, 0);
  };
  return (
    <div className={["subway-module", "show-" + flag].join(" ")}>
      <div className="address">
        <div
          className="address_default"
          onClick={() => {
            flag == "address" ? setFlag("none") : setFlag("address");
          }}
        >
          <span>{address}</span>
          {flag == "address" ? (
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
            flag == "line" ? setFlag("none") : setFlag("line");
          }}
        >
          {line}
          {flag == "line" ? (
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
              {item && (
                <span
                  className="color"
                  style={{ background: "#" + item.color }}
                ></span>
              )}
              {item.shortname}
              {item.laname ? `  (${item.laname})` : ""}
            </li>
          ))}
        </ul>
      </div>

      <Loading flagLoading={flagLoading} />
      {cityList.map((item) =>
        item.flag ? <div key={item.adcode} id={item.city}></div> : ""
      )}
    </div>
  );
}

export default Metro;
