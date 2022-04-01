import React, { useEffect, useState } from "react";
import { getBusList, getCityList } from "../../../api/mycityModule";
import "./index.less";
import AMapLoader from "@amap/amap-jsapi-loader";
import Loading from "../../../components/Loading";
let WebMapKey = import.meta.env.VITE_WebMapKey

function Bus() {
  // 城市列表
  const [cityList, setCityList] = useState([]);
  // 公交列表
  const [busList, setBusList] = useState([]);
  // 地图
  let [map, setMap] = useState({});
  // 当前城市
  let [city, setCity] = useState("");
  // 控制地址选择的显示和隐藏
  let [cityFlag, setCityFlag] = useState(false);
  // 当前公交线路
  let [busLine, setBusLine] = useState("1路");
  // 公交线路信息
  let [busLineInfo, setBusLineInfo] = useState([]);
  // 公交时间信息
  let [busTimeInfo, setBusTimeInfo] = useState("");
  // 站点标记
  let [marker, setMarKer] = useState("");
  // 站点选中
  let [busStop, setBusStop] = useState(0);
  // 地图显示
  let [mapFlag, setMapFlag] = useState(true);
  let [heightNum, setHeightNum] = useState("100%");
  useEffect(() => {
    AMapLoader.load({
      key: WebMapKey, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.CitySearch", "AMap.LineSearch"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        map = new AMap.Map("container", {
          zoom: 13, //初始化地图级别
          center: [116.397428, 39.90923], // 默认北京
        });
        setMap(map);

        //实例化城市查询类
        var citysearch = new AMap.CitySearch();
        citysearch.getLocalCity(function (status, result) {
          console.log('result',result)
          if (status === "complete" && result.info === "OK") {
            result.city = '上海市'
            // result即为当前所在城市信息
            setCity(result.city);
            // 地图显示当前城市
            var citybounds = result.bounds;
            // 设置当前城市
            map.setBounds(citybounds);
            busListClick(result.city);
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const busListClick = (cityName) => {
    getBusList(cityName).then((res) => {
      setBusList(res.buses);
      setBusLine(res.buses[0].bus_name);
      getbusLine(res.buses[0].bus_name, cityName);
    });
  };

  // 点击城市
  const cityClick = (e, item) => {
    e.stopPropagation();

    if (item.cities) {
      console.log("item", item);
      setCityList(item.cities);
    } else {
      // 关闭选框
      setCityFlag(false);
      // 设置城市
      setCity(item.city_name);
      // 获取所有公交
      busListClick(item.city_name);
      // 设置第一个公交线路
      setBusLine("1路");
      // 获取第一个公交线路
      getbusLine(busLine, item.city_name);
      // 设置第一个公交站点
      setBusStop(0);
    }
  };
  useEffect(() => { }, [city]);

  // 城市下拉框
  const downClick = () => {
    getCityList().then((res) => {
      setCityList(res.provinces);
    });
    setCityFlag(!cityFlag);
  };

  // 获取公交线路信息
  const getbusLine = (name, city) => {
    // 公交路线查询
    //实例化公交线路查询类
    var linesearch;
    //实例化公交线路查询类，只取回一条路线
    if (!linesearch) {
      linesearch = new AMap.LineSearch({
        pageIndex: 1,
        city: city,
        pageSize: 1,
        extensions: "all",
      });
    }

    //执行公交路线关键字查询
    linesearch.search(name, function (status, result) {
      map.clearMap ? map.clearMap() : "";
      if (status === "complete" && result.info === "OK") {
        setBusLineInfo(result.lineInfo);
        setHeightNum("70%");
        setBusStop(0);
        // 获取公交时间
        setBusTimeInfo(
          JSON.parse(
            decodeURI(result.lineInfo[0].timedesc).replaceAll("%2C", ",")
          ).allRemark
        );
        lineSearch_Callback(result.lineInfo);
        setMapFlag(false);
      }
    });
  };

  // 线路选择
  const busLineClick = (name) => {
    setBusLine(name);
    // 重新获取线路
    getbusLine(name, city);
  };

  /*公交路线查询服务返回数据解析概况*/
  function lineSearch_Callback(data) {
    var lineArr = data;
    var lineNum = data.length;
    if (lineNum == 0) {
    } else {
      for (var i = 0; i < lineNum; i++) {
        var pathArr = lineArr[i].path;
        var stops = lineArr[i].via_stops;
        var startPot = stops[0].location;
        var endPot = stops[stops.length - 1].location;
        if (i == 0)
          //作为示例，只绘制一条线路
          drawbusLine(startPot, endPot, pathArr);
      }
    }
  }
  /*绘制路线*/
  function drawbusLine(startPot, endPot, BusArr) {
    setMapFlag(true);
    //绘制起点，终点
    new AMap.Marker({
      map: map,
      position: startPot, //基点位置
      icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
      zIndex: 10,
      anchor: "bottom-center",
    });
    new AMap.Marker({
      map: map,
      position: endPot, //基点位置
      icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
      zIndex: 10,
      anchor: "bottom-center",
    });
    //绘制乘车的路线
    var busPolyline = new AMap.Polyline({
      map: map,
      path: BusArr,
      strokeColor: "#09f", //线颜色
      strokeOpacity: 0.8, //线透明度
      isOutline: true,
      outlineColor: "white",
      strokeWeight: 6, //线宽
    });
    // 将 busPolyline 显示在地图中心并自动缩放地图到合适级别。
    // true表示需要动画过程，[60,200,60,60]表示上下左右避让像素
    map.setFitView(busPolyline, true, [60, 200, 60, 60]);
  }
  // 站点标记
  const busStopClick = (busPot, index) => {
    setBusStop(index);
    if (marker) {
      marker.setMap(null);
      marker = null;
    }
    marker = new AMap.Marker({
      map: map,
      position: busPot, //基点位置
      icon: "https://a.amap.com/jsapi_demos/static/resource/img/pin.png",
      zIndex: 10,
      anchor: "bottom-center",
    });
    setMarKer(marker);
  };

  return (
    <div className="bus-module">
      <div className="box_left">
        <div
          className="city"
          onClick={() => {
            downClick();
          }}
        >
          <div className="city-name">{city}</div>
          <span>城市公交</span>
          {/* {cityFlag ? (
            <img src="https://hrsaas.obs.cn-north-4.myhuaweicloud.com/icon_down.png" alt="" />
          ) : (
            <img src="https://hrsaas.obs.cn-north-4.myhuaweicloud.com/icon_up.png" alt="" />
          )} */}
          {cityFlag ? (
            <div className="city-select">
              <ul>
                {cityList.map((item) => (
                  <li
                    onClick={(e) => cityClick(e, item)}
                    key={item.city_id || item.prov_id}
                  >
                    {item.prov_name || item.city_name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="bus">
          <ul>
            {busList.map((item) => (
              <li
                onClick={() => {
                  busLineClick(item.bus_name);
                }}
                className={
                  busLine === item.bus_name ? "bus_item bus_select" : "bus_item"
                }
                key={item.bus_id}
              >
                {item.bus_name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="box_right">
        {busLineInfo[0] && (
          <div className="bus-info">
            <div className="bus-base-info">
              <div className="bus-number">
                {busLine?.match(/^\d+/)[0]}
                {/* {busLineInfo[0].name} */}
              </div>
              <div className="bus-company">
                {busLineInfo[0].company || "暂无客运公司信息"}
              </div>
              <div className="bus-start-end">
                <div className="start-stop">
                  起点:<span> {busLineInfo[0].start_stop}</span>
                </div>
                <div className="end-stop">
                  终点:<span> {busLineInfo[0].end_stop}</span>
                </div>
              </div>
            </div>
            <div className="bus-line-info">
              <div className="top-line">
                <div
                  className="arrive-line"
                  style={{
                    width: `calc(20px + (100% - 40px) * ${busStop} / ${busLineInfo[0].via_stops.length - 1
                      })`,
                  }}
                ></div>
              </div>
              <div className="stop-list">
                {busLineInfo[0].via_stops.map((item, index) => (
                  <div
                    key={item.sequence}
                    className={
                      index === busStop ? "stop-info active" : "stop-info"
                    }
                  >
                    <div className="point"></div>
                    <div
                      className="stop-name"
                      onClick={() => {
                        busStopClick(item.location, index);
                      }}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bottom-line">
                {[
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0,
                ].map((item, index) => (
                  <div className="point" key={index}></div>
                ))}
                <div className="bus-time">{busTimeInfo}</div>
              </div>
            </div>
          </div>
        )}
        <Loading isLoading={mapFlag} />
        <div id="container" className="map" style={{ height: "70%" }}></div>
      </div>
    </div>
  );
}

export default Bus;
