import react, { useEffect, useState, useRef } from "react";
import "./index.less";

// echarts
import * as echarts from 'echarts';
// china.json
import china from "./china.json"
console.log('china', china)

function Index() {
  // document.body.setAttribute('arco-theme', 'dark');

  // 颜色组
  let colorGroup1 = [
    '#0f8bea', // 蓝
    '#00d3cd', // 青
    '#a46dec', // 紫
    '#f9d679', // 黄
    '#ff2c74', // 红
    '#47b9ff', // 蓝1
    '#25abfc', // 蓝2
    '#0a49d4', // 蓝3
    '#000429', // 背景色1
    '#174f9a', // 背景色2
  ]
  let colorGroup2 = [
    '#2a86d1',
    '#32a6c9',
    '#46cacc',
    '#5cb5b5',
    '#92d3d6',
    '#60fefa', // 主色
  ]

  // 获取DOM元素
  let mapRef = useRef()
  let water1Ref = useRef()
  let water2Ref = useRef()
  let road1Ref = useRef()
  let road2Ref = useRef()
  let port1Ref = useRef()
  let port2Ref = useRef()
  let port3Ref = useRef()
  let rateRef = useRef()
  let grownRef = useRef()

  // 地图模块
  let mapModule = {
    dom: mapRef.current,
    option: {
      // inRange: {
      //   
      // },

      color: [
        '#0054d9',
        '#804ec1',
        '#0394fa',
        '#00a970',
        '#ebb104',
      ],
      colorBy: 'series',
      geo: {
        map: "china",
        show: true,
        itemStyle: {
          areaColor: '#5470c6',
          // borderColor: "#002242",
        },
        emphasis: {
          itemStyle: {
            areaColor: '#f2f3f5',
            color: "red"
          }
        },
        label: {
          fontSize: 18,
        },
        style: {

        }
      },
      series: [
        {
          type: 'effectScatter',
          colorBy: 'series',
          coordinateSystem: 'geo',//使用地理坐标系geo
          data: [
            [120.13, 33.38, 120],
            [118.87, 42.28, 20],
            [120.33, 36.07, 202],
          ],
          color: "rgb(255,255,254,0.5)",
          symbolSize: function (val) {
            return val[2] / 10
          }
        }
      ]
    },
    chart: {},
    create: function () {
      echarts.registerMap('china', china)
      this.chart = echarts.init(this.dom)
      this.chart.setOption(this.option)
    }
  }
  // 公路1模块
  // 公路2模块
  // 水路1模块
  // 水路2模块
  // 港口1模块
  // 港口2模块
  // 港口3模块
  // 总比率模块
  // 增速模块


  return (
    <div className="transport-count">
      <div className="top-nav">
        2021年全国货物运输数据统计
      </div>
      <div className="content cols">
        {/* 第一列 */}
        <div className="col col-1 rows">
          <div className="row row-1">
            <div id="water-1" ref={water1Ref}></div>
          </div>
          <div className="row row-1">
            <div className="water-2" ref={water2Ref}></div>
          </div>
          <div className="row row-1">
            <div className="road-1" ref={road1Ref}></div>
          </div>
          <div className="row row-1">
            <div className="road-2" ref={road2Ref}></div>
          </div>
        </div>
        {/* 第二列 */}
        <div className="col col-2 rows">
          <div className="row row-1">

          </div>
          <div className="row row-5">
            <div id="map" ref={mapRef}></div>
          </div>
          <div className="row row-2">
            <div id="grown" ref={grownRef}></div>
          </div>
        </div>
        {/* 第三列 */}
        <div className="col col-1 rows">
          <div className="row row-2">
            <div id="total-rate" ref={rateRef}></div>
          </div>
          <div className="row row-1">
            <div id="port-1" ref={port1Ref}></div>
          </div>
          <div className="row row-1">
            <div id="port-2" ref={port2Ref}></div>
          </div>
          <div className="row row-1">
            <div id="port-3" ref={port3Ref}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index;
