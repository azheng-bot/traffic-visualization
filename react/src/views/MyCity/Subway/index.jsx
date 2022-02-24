import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cityList from "./cityList.js";
import "./index.less";
// import "https://webapi.amap.com/subway?v=1.0&key=c6e434d1188e1c9f904dc256f7e14de8&callback=cbk";
function Metro() {
  const { id } = useParams();
  let [adcodeId, setAdcodeId] = useState(1100);
  let [mysubway, setmysubway] = useState("");
  // 放大比例
  let [zoom, setZoom] = useState(1);
  // 线路
  let [lineList, setLineList] = useState([]);
  // 控制地址的显示和隐藏
  let [flagAddres, setFlagAddres] = useState(false);
  // 控制线路显示隐藏
  let [flagLine, setFlagLine] = useState(false);
  // 默认地址
  let [address, setAddres] = useState("北京市");
  // 默认线路
  let [line, setLine] = useState("所有线路");
  let [lineId, setLineId] = useState(0);
  // 放大缩小
  const zoomClick = (type) => {
    if (zoom > 1.3) {
      setZoom(1.3);
    } else if (zoom < 0.3) {
      setZoom(0.3);
    } else {
      type === "da"
        ? setZoom(Math.round((zoom += 0.1)))
        : setZoom(Math.round((zoom -= 0.1)));
      mysubway.scale ? mysubway.scale(zoom) : "";
    }
  };

  useEffect(() => {
    setAdcodeId(id);
    cityList.map((item) => {
      if (item.adcode == id) {
        setAddres(item.name);
      }
    });
    window.cbk = function () {
      var mySubway = subway("mybox", {
        adcode: id,
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

      setmysubway(mySubway);
    };
  }, []);

  const lineClick = (item) => {
    if (item == "全部") {
      setLine("全部线路");
      setLineId(0);
      mysubway.clearOverlays();
    } else {
      setLine(item.shortname);
      setLineId(item.id);
      mysubway.showLine ? mysubway.showLine(item.id) : "";
      var select_obj = document.getElementById("g-select");
      mysubway.setFitView ? mysubway.setFitView(select_obj) : "";
      var center = mysubway.getSelectedLineCenter();
      mysubway.setCenter(center);
    }
  };
  const updateFlag = (type) => {
    if (type == "addres") {
      mysubway.clearOverlays();
      setFlagLine(false);
      setFlagAddres(!flagAddres);
    } else {
      setFlagAddres(true);
      setFlagLine(!flagLine);
    }
  };
  const addressClick = (name) => {
    setAddres(name);
  };
  return (
    <div className="subway-module">
      <div className="box_left">
        <div className={flagAddres ? "address action_width" : "address"}>
          <div
            className="address_default"
            onClick={() => {
              updateFlag("addres");
            }}
          >
            {address}
            {flagAddres ? (
              <img
                src="https://hrsaas.obs.cn-north-4.myhuaweicloud.com/icon_down.png"
                alt=""
              />
            ) : (
              <img
                src="https://hrsaas.obs.cn-north-4.myhuaweicloud.com/icon_up.png"
                alt=""
              />
            )}
          </div>
          {!flagAddres ? (
            <ul>
              {cityList.map((item) => (
                <li
                  className={item.adcode == adcodeId ? "bg" : ""}
                  key={item.adcode}
                  onClick={() => {
                    addressClick(item.name);
                  }}
                >
                  <a href={`/subway/${item.adcode}`}>{item.name}</a>
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
        <div className={!flagLine ? "line action_width" : "line"}>
          <div
            className="line_default"
            onClick={() => {
              updateFlag("line");
            }}
          >
            {line}
            {flagLine ? (
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
          {flagLine ? (
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
                  {item.shortname}
                  {item.laname ? `  (${item.laname})` : ""}
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="box_right">
        <div id="mybox"></div>
      </div>
      <div className="zoom">
        <div
          className="da"
          onClick={() => {
            zoomClick("da");
          }}
        >
          <img
            src="https://hrsaas.obs.cn-north-4.myhuaweicloud.com/jia.png"
            alt="放大"
          />
        </div>
        <div
          className="xiao"
          onClick={() => {
            zoomClick("xiao");
          }}
        >
          <img
            src="https://hrsaas.obs.cn-north-4.myhuaweicloud.com/jian.png"
            alt="缩小"
          />
        </div>
      </div>
    </div>
  );
}

export default Metro;
