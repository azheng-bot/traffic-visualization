import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import cityList from "./cityList.js";
import "./index.less";
// import "https://webapi.amap.com/subway?v=1.0&key=c6e434d1188e1c9f904dc256f7e14de8&callback=cbk";
function Index() {
  // const { id } = useParams();
  let id = 1;
  let [adcodeId, setAdcodeId] = useState(1100);
  // let [mysubway, setmysubway] = useState("");
  // 放大比例
  let [zoom, setZoom] = useState(0.7);

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


  var mysubway;
  window.cbk = function () {
    mysubway = subway("mybox", {
      adcode: adcodeId
    });
    // mysubway.setAdcode(4401)
    console.log('my subway')
    mysubway.getCityList(function (res) {
      console.log('res', res)
    })
    mysubway.event.on("subway.complete", function () {
      mysubway.getLineList(function (res) {
        console.log('res', res)
      })
      var center = mysubway.getSelectedLineCenter();
      mysubway.setCenter(center);
    });
  };
  // adcodeId改变后地图跟着改变
  useEffect(() => {
    // setAdcodeId(id);
    // console.log('my subway',adcodeId)
    if (subway) {
      mysubway = null; 
      mysubway = subway("mybox", {
        adcode: adcodeId
      });
    }
  }, [adcodeId]);

  return (
    <div className="subway-module">
      <div className="box_left">
        <ul>
          {cityList.map((item) => (
            <li
              className={item.adcode == adcodeId ? "bg" : ""}
              key={item.adcode}
              onClick={() => setAdcodeId(item.adcode)}
            >
              <a href={`#`}>{item.name}</a>
            </li>
          ))}
        </ul>
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

export default Index;
