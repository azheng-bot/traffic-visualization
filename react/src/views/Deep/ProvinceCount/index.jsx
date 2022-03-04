import react, { useEffect, useState, useRef } from "react";
import "./index.less";

// echarts
import * as echarts from 'echarts';
// china.json
import china from "./china.json"
console.log('china', china)
echarts.registerMap('china', china)

function Index() {
  let [province, setProvince] = useState('北京市')
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
    ['色1']: '#a6fcfd', // 色1
    ['色2']: '#70ffff', // 色2
    ['色3']: '#48ffff', // 色3
    ['色4']: '#2bc7ff', // 色4
    ['色5']: '#2492ff', // 色5
    ['主色']: '#00ffff', // 主色
  }
  let echartsColors = {
    road1: ['#00ffff'],
    road2: ['#00ffff'],
    water1: ['#70ffff'],
    water2: ['#70ffff'],
    road1: ['#00ffff'],
  }


  // 模块类Class
  class EchartModule {
    constructor(dom, option) {
      this.dom = dom;
      this.option = option;
    }
    // 创建
    createChart() {
      this.chart = echarts.init(this.dom)
      this.chart.setOption(this.option)
    }
    // 更新
    updateChart() {
      this.chart.setOption(this.option)
    }
  }

  // 地图模块
  let mapModule;
  // 中心城市模块
  let mainCityModule;
  // 公路1模块
  let road1Module
  // 公路2模块
  let road2Module
  // 水路1模块
  let water1Module
  // 水路2模块
  let water2Module
  // 周转量1模块
  let turnover1Module
  // 周转量2模块
  let turnover2Module
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

  // 获取DOM元素
  let mapRef = useRef()
  let mainCityRef = useRef()
  let water1Ref = useRef()
  let water2Ref = useRef()
  let road1Ref = useRef()
  let road2Ref = useRef()
  let turnover1Ref = useRef()
  let turnover2Ref = useRef()
  let port1Ref = useRef()
  let port2Ref = useRef()
  let port3Ref = useRef()
  let rateRef = useRef()
  let grownRef = useRef()

  // echarts配置项
  let mapOption = {
    colorBy: 'series',
    geo: {
      zoom: 1,
      top: 80,
      map: "china",
      show: true,
      borderWidth: 1.5,
      itemStyle: {
        areaColor: '#162234',
        // borderColor: "#60fefa",
        borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: colorGroup3.色1 },
          { offset: 0.3, color: colorGroup3.色1 },
          { offset: 0.6, color: colorGroup3.色2 },
          { offset: 0.9, color: colorGroup3.色3 },
          { offset: 1, color: colorGroup3.色4 }
        ]),
        borderWidth: 1
      },
      emphasis: {
        itemStyle: {
          areaColor: colorGroup3.色3,
        },
      },
      label: {
        fontSize: 12,
        position: 'inside',
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
        color: "rgb(96 ,254 ,250,0.5)",
        symbolSize: function (val) {
          return val[2] / 10
        }
      }
    ]
  }
  let road1Option = {
    color: [colorGroup3.色4],
    title: {
      text: `${province}公路客运量`,
      textStyle: {
        color: "#ffffffdd",
        fontWeight: "200",
        fontSize: 14
      }
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLine: {
        show: true
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      }
    },
    grid: {
      left: 50,
      right: 40,
      top: 40,
      bottom: 50,
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 110, 130, 110, 130, 110],
        type: 'bar',
        itemStyle: {
          color: colorGroup3.色5 + '4f',
          borderColor: colorGroup3.主色,
          borderWidth: 1.5
        },
        showBackground: false,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
    ]
  }
  let road2Option = {
    color: [colorGroup3.色4],
    title: {
      text: `${province}公路货运量`,
      textStyle: {
        color: "#ffffffdd",
        fontWeight: "200",
        fontSize: 14
      }
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLine: {
        show: true
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      }
    },
    grid: {
      left: 50,
      right: 40,
      top: 40,
      bottom: 50,
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 110, 130, 110, 130, 110],
        type: 'bar',
        itemStyle: {
          color: colorGroup3.色5 + '4f',
          borderColor: colorGroup3.主色,
          borderWidth: 1.5
        },
        showBackground: false,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
    ]
  }
  let water1Option = {
    color: [colorGroup3.色4],
    title: {
      text: `${province}水路客运量`,
      textStyle: {
        color: "#ffffffdd",
        fontWeight: "200",
        fontSize: 14
      }
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLine: {
        show: true
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      }
    },
    grid: {
      left: 50,
      right: 40,
      top: 40,
      bottom: 50,
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 110, 130, 110, 130, 110],
        type: 'bar',
        itemStyle: {
          color: colorGroup3.色1 + '4f',
          borderColor: colorGroup3.色1,
          borderWidth: 1.5
        },
        showBackground: false,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
    ]
  }
  let water2Option = {
    color: [colorGroup3.色1],
    title: {
      text: `${province}水路货运量`,
      textStyle: {
        color: "#ffffffdd",
        fontWeight: "200",
        fontSize: 14
      }
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLine: {
        show: true
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      }
    },
    grid: {
      left: 50,
      right: 40,
      top: 40,
      bottom: 50,
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 110, 130, 110, 130, 110],
        type: 'bar',
        itemStyle: {
          color: colorGroup3.色1 + '4f',
          borderColor: colorGroup3.色1,
          borderWidth: 1.5
        },
        showBackground: false,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
    ]
  }
  let turnover1Option = {
    color: [colorGroup3.色1, colorGroup3.色2, colorGroup3.色3, colorGroup3.色4, colorGroup3.色5,],
    title: {
      text: `${province}水路 & 公路客运旅客周转量`,
      textStyle: {
        color: "#ffffffdd",
        fontWeight: "200",
        fontSize: 14
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Line 1', 'Line 2', 'Line 3', 'Line 4',]
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '20',
      right: '40',
      bottom: '20',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
        ,
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: 'Line 1',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: colorGroup3.色4
        },
        emphasis: {
          focus: 'series'
        },
        data: [140, 232, 101, 264, 90, 340, 250]
      },
      {
        name: 'Line 4',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: colorGroup3.色1
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 402, 231, 134, 190, 230, 120]
      },

    ]
  };
  let turnover2Option = {
    color: [colorGroup3.色1, colorGroup3.色2, colorGroup3.色3, colorGroup3.色4, colorGroup3.色5,],
    title: {
      text: `${province}水路 & 公路货运货物周转量`,
      textStyle: {
        color: "#ffffffdd",
        fontWeight: "200",
        fontSize: 14
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Line 1', 'Line 2', 'Line 3', 'Line 4',]
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '20',
      right: '40',
      bottom: '20',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
        ,
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: 'Line 1',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: colorGroup3.色5
        },
        emphasis: {
          focus: 'series'
        },
        data: [140, 232, 101, 264, 90, 340, 250]
      },
      {
        name: 'Line 4',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: colorGroup3.色3
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 402, 231, 134, 190, 230, 120]
      },

    ]
  };
  let port1Option = {
    color: [colorGroup3.色4],
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLine: {
        show: true
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      }
    },
    grid: {
      left: 40,
      right: 30,
      top: 30,
      bottom: 40,
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 110, 130, 110, 130, 110],
        type: 'bar',
        itemStyle: {
          color: colorGroup3.主色 + '4f',
          borderColor: colorGroup3.主色,
          borderWidth: 1.5
        },
        showBackground: false,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
    ]
  }
  let port2Option = {
    color: [colorGroup3.色4],
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLine: {
        show: true
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      }
    },
    grid: {
      left: 40,
      right: 30,
      top: 30,
      bottom: 40,
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 110, 130, 110, 130, 110],
        type: 'bar',
        itemStyle: {
          color: colorGroup3.主色 + '4f',
          borderColor: colorGroup3.主色,
          borderWidth: 1.5
        },
        showBackground: false,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
    ]
  }
  let port3Option = {
    color: [colorGroup3.色4],
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLine: {
        show: true
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      }
    },
    grid: {
      left: 40,
      right: 30,
      top: 30,
      bottom: 40,
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 110, 130, 110, 130, 110],
        type: 'bar',
        itemStyle: {
          color: colorGroup3.主色 + '4f',
          borderColor: colorGroup3.主色,
          borderWidth: 1.5
        },
        showBackground: false,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
    ]
  }
  let rateOption = {
    color: [
      colorGroup3.色1,
      colorGroup3.色5,
      colorGroup3.色3,
    ],
    title: {
      text: '运输方式总体比率',
      textAlign: 'left',
      textStyle: {
        color: "#ffffffdd",
        fontWeight: "200",
        fontSize: 16,
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        selectedMode: 'single',
        radius: ['25%', '40%'],
        top: 0,
        bottom: -60,
        label: {
          position: 'inner',
          fontSize: 14
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1548, name: '公路客运' },
          { value: 775, name: '水路客运' },
        ]
      },
      {
        name: 'Access From',
        type: 'pie',
        radius: ['50%', '55%'],
        labelLine: {
          length: 30
        },
        top: 0,
        bottom: -60,
        label: {
          formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
          backgroundColor: '#F6F8FC',
          borderColor: '#8C8D8E',
          borderWidth: 1,
          borderRadius: 4,
          rich: {
            a: {
              color: '#6E7079',
              lineHeight: 22,
              align: 'center'
            },
            hr: {
              borderColor: '#8C8D8E',
              width: '100%',
              borderWidth: 1,
              height: 0
            },
            b: {
              color: '#4C5058',
              fontSize: 14,
              fontWeight: 'bold',
              lineHeight: 33
            },
            per: {
              color: '#fff',
              backgroundColor: '#4C5058',
              padding: [3, 4],
              borderRadius: 4
            }
          }
        },
        data: [
          { value: 1048, name: '公路货运' },
          { value: 335, name: '水路货运' },
          { value: 310, name: '港口货运' },
        ]
      }
    ]
  };
  let grownOption = {
    color: [colorGroup3.色1, 'rgb(255 255 255 / 22.5%)', colorGroup3.色5],
    title: [
      {
        text: '不同运输方式每月增长速率',
        left: 'left',
        textStyle: {
          color: "#ffffffdd",
          fontWeight: "200",
          fontSize: 16
        }
      },
    ],
    series: [
    ]
  };
  for (var i = 0; i < 12; i++) {
    grownOption.title.push({
      subtext: i + 1 + '月',
      // left: parseFloat((i / 13 + 1 / 20).toFixed(5) * 100) + '%',
      left: parseFloat((i % 6 / 6 + 7 / 100) * 100).toFixed(5) + '%',
      top: i > 5 ? '70%' : "41%",
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
      radius: ['15%', '20%'],
      center: ['0%', i > 5 ? '62%' : "33%"],
      data: data,
      label: {
        show: false
      },
      left: parseFloat((i % 6 / 6 + 8 / 100) * 100).toFixed(5) + '%',
      right: -1000,
      top: 0,
      bottom: 0
    })
  }
  let mainCityOption = {
    color: [colorGroup3.色5, colorGroup3.色4, colorGroup3.色3, colorGroup3.色2,],
    title: {
      text: `${province}水路 & 公路客运周转量`,
      textStyle: {
        color: "#ffffffdd",
        fontWeight: "200",
        fontSize: 14
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    legend: {
      data: ['Evaporation', 'Precipitation', 'Temperature']
    },
    xAxis: [
      {
        type: 'value',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        name: 'Precipitation',
        axisLabel: {
          formatter: '{value} ml'
        },
        splitLine: {
          show: false
        }
      },
      {
        type: 'value',
        name: 'Temperature',
        axisLabel: {
          formatter: '{value} °C'
        },
        splitLine: {
          show: false
        }
      }
    ],
    grid: {
      left: 70,
      right: 70,
      top: 40,
      bottom: 40,
    },
    series: [
      {
        name: 'Evaporation',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' ml';
          }
        },
        itemStyle: {
          color: colorGroup3.色5 + '4f',
          borderColor: colorGroup3.色5,
          borderWidth: 1.5
        },
        data: [
          {
            value: 2.0,
            itemStyle: {
              color: colorGroup3.色1 + '4f',
              borderColor: colorGroup3.色1,
              borderWidth: 1.5
            },
          },
          {
            value: 2.9,
            itemStyle: {
              color: colorGroup3.色3 + '4f',
              borderColor: colorGroup3.色3,
              borderWidth: 1.5
            },
          },
          {
            value: 2.5,
            itemStyle: {
              color: colorGroup3.色4 + '4f',
              borderColor: colorGroup3.色4,
              borderWidth: 1.5
            },
          },
          {
            value: 1.0,
            itemStyle: {
              color: colorGroup3.色5 + '4f',
              borderColor: colorGroup3.色5,
              borderWidth: 1.5
            },
          },
        ]
      },
    ]
  };

  // 创建echartModule对象
  function createAllEchartsModule() {
    mapModule = new EchartModule(mapRef.current, mapOption)
    mainCityModule = new EchartModule(mainCityRef.current, mainCityOption)
    road1Module = new EchartModule(road1Ref.current, road1Option)
    road2Module = new EchartModule(road2Ref.current, road2Option)
    water1Module = new EchartModule(water1Ref.current, water1Option)
    water2Module = new EchartModule(water2Ref.current, water2Option)
    turnover1Module = new EchartModule(turnover1Ref.current, turnover1Option)
    turnover2Module = new EchartModule(turnover2Ref.current, turnover2Option)
    port1Module = new EchartModule(port1Ref.current, port1Option)
    port2Module = new EchartModule(port2Ref.current, port2Option)
    port3Module = new EchartModule(port3Ref.current, port3Option)
    rateModule = new EchartModule(rateRef.current, rateOption)
    grownModule = new EchartModule(grownRef.current, grownOption)
  }

  // 初始化生成Echarts
  function initAllEcharts() {
    mapModule.createChart()
    mainCityModule.createChart()
    road1Module.createChart()
    road2Module.createChart()
    water1Module.createChart()
    water2Module.createChart()
    turnover1Module.createChart()
    turnover2Module.createChart()
    port1Module.createChart()
    port2Module.createChart()
    port3Module.createChart()
    rateModule.createChart()
    grownModule.createChart()
  }

  // 更新Echarts
  function updateAllEcharts() {
    mapModule.updateChart()
    mainCityModule.updateChart()
    road1Module.updateChart()
    road2Module.updateChart()
    water1Module.updateChart()
    water2Module.updateChart()
    turnover1Module.updateChart()
    turnover2Module.updateChart()
    port1Module.updateChart()
    port2Module.updateChart()
    port3Module.updateChart()
    rateModule.updateChart()
    grownModule.updateChart()
  }

  useEffect(() => {
    // 创建echartModule对象
    createAllEchartsModule()

    // 初始化生成Echarts
    initAllEcharts()

    // 地图点击事件
    mapModule.chart.on('click', params => {
      setProvince(params.name)
    })
  }, [])
  useEffect(() => {
    // updateAllEcharts()
    // turnover1Module.updateChart()
    console.log(turnover1Module)

  }, [province])

  return (
    <div className="transport-count">
      <div className="top-nav">
        2021年全国货物运输数据统计
      </div>
      <div className="content cols">
        {/* 第一列 */}
        <div className="col-1 rows">
          <div className="row-1 cols">
            <div className="col-1">
              <div id="road-1" style={{ width: '100%', height: "100%" }} ref={road1Ref}></div>
            </div>
            <div className="col-1">
              <div id="road-2" style={{ width: '100%', height: "100%" }} ref={road2Ref}></div>
            </div>
          </div>
          <div className="row-1 cols">
            <div className="col-1">
              <div id="water-1" style={{ width: '100%', height: "100%" }} ref={water1Ref}></div></div>
            <div className="col-1">
              <div id="water-2" style={{ width: '100%', height: "100%" }} ref={water2Ref}></div>
            </div>
          </div>
          <div className="row-1 cols">
            <div id="turnover-2" style={{ width: '100%', height: "100%" }} ref={turnover1Ref}></div>
          </div>
          <div className="row-1 cols">
            <div id="turnover-1" style={{ width: '100%', height: "100%" }} ref={turnover2Ref}></div>
          </div>
        </div>
        {/* 第二列 */}
        <div className="col-2 rows" style={{ position: "relative" }}>
          <div id="map" style={{ width: '100%', height: "100%", position: "absolute" }} ref={mapRef} ></div>
          <div className="row-5">
            959599万吨公路客运量
          </div>
          <div className="row-2">
            <div id="port-3" style={{ width: '100%', height: "100%" }} ref={port3Ref}></div>
          </div>
          <div className="row-0" style={{ height: 0 }}>
            <div id="port-1" style={{ width: '100%', height: "100%" }} ref={port1Ref}></div>
          </div>
        </div>
        {/* 第三列 */}
        <div className="col-1 rows">
          <div className="row-5">
            <div id="total-rate" style={{ width: '100%', height: "100%" }} ref={rateRef}></div>
          </div>
          <div className="row-4">
            <div id="grown" style={{ width: '100%', height: "100%" }} ref={grownRef}></div>
          </div>
          <div className="row-2" style={{ display: 'none' }}>
            <div id="port-2" style={{ width: '100%', height: "100%" }} ref={port2Ref}></div>
          </div>
          <div className="row-3">
            <div id="mainCity" style={{ width: '100%', height: "100%" }} ref={mainCityRef}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index;
