import react, { useEffect, useState, useRef } from "react";
import "./index.less";

// echarts
import * as echarts from 'echarts';
// china.json
import china from "./china.json"
echarts.registerMap('china', china)

function Index() {
  // document.body.setAttribute('arco-theme', 'dark');

  // 颜色组
  let colorGroup1 = {
    ['蓝']: '#0f8bea', // 蓝
    ['青']: '#00d3cd', // 青
    ['紫']: '#a46dec', // 紫
    ['黄']: '#f9d679', // 黄
    ['红']: '#ff2c74', // 红
    ['蓝1']: '#47b9ff', // 蓝1
    ['蓝2']: '#25abfc', // 蓝2
    ['蓝3']: '#0a49d4', // 蓝3
    ['背景色1']: '#000429', // 背景色1
    ['背景色2']: '#174f9a', // 背景色2
  }
  let colorGroup2 = {
    ['红']: '#e7222a', // 红
    ['橙']: '#f58c30', // 橙
    ['黄']: '#e5cd75', // 黄
    ['红1']: '#e71f29', // 红1
    ['红2']: '#f28488', // 红2
    ['红3']: '#f8c8cb', // 红3
    ['背景色1']: '#03010f', // 背景色1
    ['背景色2']: '#1c5d57', // 背景色2
  }
  let colorGroup3 = {
    ['色1']: '#2a86d1', // 色1
    ['色2']: '#32a6c9', // 色2
    ['色3']: '#46cacc', // 色3
    ['色4']: '#5cb5b5', // 色4
    ['色5']: '#92d3d6', // 色5
    ['主色']: '#60fefa', // 主色
  }


  // 模块类Class
  class EchartModule {
    constructor(dom, option) {
      this.dom = dom;
      this.option = option;
    }
    createChart() {
      this.chart = echarts.init(this.dom)
      this.chart.setOption(this.option)
    }
  }

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

  // echarts配置项
  let mapOption = {
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
  }
  let road1Option = {
    color: [colorGroup1.蓝],
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Sat', 'Sun', 'Sat', 'Sun', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      left: 40,
      right: 30,
      top: 30,
      bottom: 40,
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 110, 130, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
    ]
  }
  let road2Option = {
    color: [colorGroup1.青],
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      left: 40,
      right: 30,
      top: 30,
      bottom: 40,
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
    ]
  }
  let water1Option = {
    color: [colorGroup1.蓝],
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Sun', 'Sun', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      left: 40,
      right: 30,
      top: 30,
      bottom: 40,
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
    ]
  }
  let water2Option = {
    color: [colorGroup1.蓝],
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      left: 40,
      right: 30,
      top: 30,
      bottom: 40,
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
    ]
  }
  let port1Option = {
    color: [colorGroup1.蓝],
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      left: 40,
      right: 30,
      top: 30,
      bottom: 40,
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
    ]
  }
  let rateOption = {}
  let grownOption = {
    color: ['#04a96f', 'rgb(255 255 255 / 22.5%)', '#e34d59'],
    title: [
      {
        text: 'Pie label alignTo',
        left: 'center'
      },
    ],
    series: [
    ]
  };
  for (var i = 0; i < 12; i++) {
    grownOption.title.push({
      subtext: i + '月',
      left: parseFloat((i / 13 + 1 / 20).toFixed(5) * 100) + '%',
      top: '70%',
      textAlign: 'center',
      textStyle: {
        color: '#fff'
      }
    })
    let data = parseInt(Math.random() * 100 - 50)
    data = data > 0 ?
      [{ name: 1, value: data }, { name: 2, value: 100 - data }, { name: 3, value: 0 }] :
      [{ name: 1, value: 0 }, { name: 2, value: 100 + data }, { name: 3, value: -data }]
    grownOption.series.push({
      type: 'pie',
      radius: ['25%', '35%'],
      center: ['0%', i > 5 ? '70%' : "30%"],
      data: data,
      label: {
        show: false
      },
      left: parseFloat((i % 6 / 6.5 + 12 / 100) * 100).toFixed(5) + '%',
      right: -1000,
      top: 0,
      bottom: 0
    })
  }


  // 地图模块
  let mapModule;
  // 公路1模块
  let road1Module
  // 公路2模块
  let road2Module
  // 水路1模块
  let water1Module
  // 水路2模块
  let water2Module
  // 港口1模块
  let port1Module
  // 港口2模块
  let port2Module
  // 港口3模块
  let port3Module
  // 总比率模块
  let rateModule
  // 增速模块
  let grownModule

  useEffect(() => {
    // 创建echartModule对象
    mapModule = new EchartModule(mapRef.current, mapOption)
    road1Module = new EchartModule(road1Ref.current, road1Option)
    road2Module = new EchartModule(road2Ref.current, road1Option)
    water1Module = new EchartModule(water1Ref.current, road1Option)
    water2Module = new EchartModule(water2Ref.current, road1Option)
    port1Module = new EchartModule(port1Ref.current, road1Option)
    port2Module = new EchartModule(port2Ref.current, road1Option)
    port3Module = new EchartModule(port3Ref.current, road1Option)
    rateModule = new EchartModule(rateRef.current, rateOption)
    grownModule = new EchartModule(grownRef.current, grownOption)

    // 生成Echarts
    mapModule.createChart()
    road1Module.createChart()
    road2Module.createChart()
    water1Module.createChart()
    water2Module.createChart()
    port1Module.createChart()
    port2Module.createChart()
    port3Module.createChart()
    rateModule.createChart()
    grownModule.createChart()
  }, [])

  return (
    <div className="transport-count">
      <div className="top-nav">
        2021年全国货物运输数据统计
      </div>
      <div className="content cols">
        {/* 第一列 */}
        <div className="col col-1 rows">
          <div className="row row-1">
            <div id="water-1" style={{ width: '100%', height: "100%" }} ref={water1Ref}></div>
          </div>
          <div className="row row-1">
            <div className="water-2" style={{ width: '100%', height: "100%" }} ref={water2Ref}></div>
          </div>
          <div className="row row-1">
            <div className="road-1" style={{ width: '100%', height: "100%" }} ref={road1Ref}></div>
          </div>
          <div className="row row-1">
            <div className="road-2" style={{ width: '100%', height: "100%" }} ref={road2Ref}></div>
          </div>
        </div>
        {/* 第二列 */}
        <div className="col col-2 rows">
          <div className="row row-1">

          </div>
          <div className="row row-5">
            <div id="map" style={{ width: '100%', height: "100%" }} ref={mapRef}></div>
          </div>
          <div className="row row-2">
            <div id="grown" style={{ width: '100%', height: "100%" }} ref={grownRef}></div>
          </div>
        </div>
        {/* 第三列 */}
        <div className="col col-1 rows">
          <div className="row row-2">
            <div id="total-rate" style={{ width: '100%', height: "100%" }} ref={rateRef}></div>
          </div>
          <div className="row row-1">
            <div id="port-1" style={{ width: '100%', height: "100%" }} ref={port1Ref}></div>
          </div>
          <div className="row row-1">
            <div id="port-2" style={{ width: '100%', height: "100%" }} ref={port2Ref}></div>
          </div>
          <div className="row row-1">
            <div id="port-3" style={{ width: '100%', height: "100%" }} ref={port3Ref}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index;
