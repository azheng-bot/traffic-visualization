import react, { useEffect, useState, useRef } from "react";
import "./index.less";
import { getProvinceData } from "../../../api/deepModule";

// echarts
import * as echarts from 'echarts';
// china.json
import china from "./china.json"
console.log('china', china)
echarts.registerMap('china', china)

function Index() {
  let [province, setProvince] = useState('北京')
  let [totalData, setTotalData] = useState({
    portGoods: 0,
    roadGoods: 0,
    roadGuest: 0,
    waterGoods: 0,
    waterGuest: 0
  })

  // let province = '北京市'
  // document.body.setAttribute('arco-theme', 'dark');

  // 颜色组
  // let colorGroup1 = {
  //   ['蓝']: '#0f8bea', // 蓝
  //   ['青']: '#00d3cd', // 青
  //   ['紫']: '#a46dec', // 紫
  //   ['黄']: '#f9d679', // 黄
  //   ['红']: '#ff2c74', // 红
  //   ['蓝1']: '#47b9ff', // 蓝1
  //   ['蓝2']: '#25abfc', // 蓝2
  //   ['蓝3']: '#0a49d4', // 蓝3
  //   ['背景色1']: '#000429', // 背景色1
  //   ['背景色2']: '#174f9a', // 背景色2
  // }
  // let colorGroup2 = {
  //   ['红']: '#e7222a', // 红
  //   ['橙']: '#f58c30', // 橙
  //   ['黄']: '#e5cd75', // 黄
  //   ['红1']: '#e71f29', // 红1
  //   ['红2']: '#f28488', // 红2
  //   ['红3']: '#f8c8cb', // 红3
  //   ['背景色1']: '#03010f', // 背景色1
  //   ['背景色2']: '#1c5d57', // 背景色2
  // }
  let colorGroup = {
    ['色1']: '#a6fcfd', // 色1
    ['色2']: '#70ffff', // 色2
    ['色3']: '#48ffff', // 色3
    ['色4']: '#2bc7ff', // 色4
    ['色5']: '#2492ff', // 色5
    ['主色']: '#00ffff', // 主色
  }

  // 模块类Class
  class EchartModule {
    constructor(dom, option) {
      this.dom = dom;
      this.option = option;
      this.chart = {}
    }

    // 创建
    createChart() {
      this.chart = echarts.init(this.dom)
      this.chart.setOption(this.option)
    }

    // 更新
    updateChart() {
      this.chart.setOption(Object.assign({}, this.option))
    }
  }

  // 地图模块
  let mapModule;
  // 中心城市模块
  let centerCityModule;
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
  let portModule
  // 总比率模块
  let rateModule
  // 增速模块
  let grownModule

  // 获取DOM元素
  let mapRef = useRef()
  let centerCityRef = useRef()
  let water1Ref = useRef()
  let water2Ref = useRef()
  let road1Ref = useRef()
  let road2Ref = useRef()
  let turnover1Ref = useRef()
  let turnover2Ref = useRef()
  let portRef = useRef()
  let rateRef = useRef()
  let grownRef = useRef()

  // echarts配置项
  let mapOption = {
    colorBy: 'series',
    geo: {
      zoom: 1,
      top: 95,
      map: "china",
      show: true,
      borderWidth: 1.5,
      itemStyle: {
        areaColor: '#162234',
        // borderColor: "#60fefa",
        borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: colorGroup.色1 },
          { offset: 0.3, color: colorGroup.色1 },
          { offset: 0.6, color: colorGroup.色2 },
          { offset: 0.9, color: colorGroup.色3 },
          { offset: 1, color: colorGroup.色4 }
        ]),
        borderWidth: 1.1
      },
      emphasis: {
        itemStyle: {
          areaColor: colorGroup.色3,
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
          [120.13, 33.38, 200],
        ],
        color: "rgb(96 ,254 ,250,0.8)",
        symbolSize: function (val) {
          return val[2] / 10
        }
      }
    ]
  }
  let road1Option = {
    color: [colorGroup.色4],
    title: {
      left: 'center',
      text: `公路旅客运输量`,
      textStyle: {
        color: "#6e7079",
        fontWeight: "500",
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
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      valueFormatter: function (value) {
        return value + ' 万人';
      }
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 110, 130, 110, 130, 110],
        type: 'bar',
        itemStyle: {
          color: colorGroup.色5 + '4f',
          borderColor: colorGroup.主色,
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
    color: [colorGroup.色4],
    title: {
      left: 'center',
      text: `公路货物运输量`,
      textStyle: {
        color: "#6e7079",
        fontWeight: "500",
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
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      valueFormatter: function (value) {
        return value + ' 万吨';
      }
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 110, 130, 110, 130, 110],
        type: 'bar',
        itemStyle: {
          color: colorGroup.色5 + '4f',
          borderColor: colorGroup.主色,
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
    color: [colorGroup.色4],
    title: {
      text: `水路旅客运输量`,
      left: 'center',
      textStyle: {
        color: "#6e7079",
        fontWeight: "500",
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
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      valueFormatter: function (value) {
        return value + ' 万人';
      }
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 110, 130, 110, 130, 110],
        type: 'bar',
        itemStyle: {
          color: colorGroup.色1 + '4f',
          borderColor: colorGroup.色1,
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
    color: [colorGroup.色1],
    title: {
      text: `水路货物运输量`,
      left: 'center',
      textStyle: {
        color: "#6e7079",
        fontWeight: "500",
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
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      valueFormatter: function (value) {
        return value + ' 万吨';
      }
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 110, 130, 110, 130, 110],
        type: 'bar',
        itemStyle: {
          color: colorGroup.色1 + '4f',
          borderColor: colorGroup.色1,
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
    color: [colorGroup.色1, colorGroup.色2, colorGroup.色3, colorGroup.色4, colorGroup.色5,],
    title: {
      text: `水路 & 公路客运旅客周转量`,
      left: 'center',
      textStyle: {
        color: "#6e7079",
        fontWeight: "500",
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
      },
      valueFormatter: function (value) {
        return value + ' 万吨公里';
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
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      }
    ],
    yAxis: [
      {
        type: 'value'
        ,
        name: '     货物吞吐量(万吨公里)',
        splitLine: {
          show: false
        }
      },
    ],
    series: [
      {
        name: '水路',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: colorGroup.色4
        },
        emphasis: {
          focus: 'series'
        },
        data: [140, 232, 101, 264, 90, 340, 250, 101, 264, 90, 340, 250]
      },
      {
        name: '公路',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: colorGroup.色1
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 402, 231, 134, 190, 230, 120, 231, 134, 190, 230, 120]
      },

    ]
  };
  let turnover2Option = {
    color: [colorGroup.色1, colorGroup.色2, colorGroup.色3, colorGroup.色4, colorGroup.色5,],
    title: {
      text: `水路 & 公路货运货物周转量`,
      left: 'center',
      textStyle: {
        color: "#6e7079",
        fontWeight: "500",
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
      },
      valueFormatter: function (value) {
        return value + ' 万吨公里';
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
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      }
    ],
    yAxis: [
      {
        type: 'value'
        ,
        splitLine: {
          show: false
        },
        name: '货运量(万吨公里)',
      }
    ],
    series: [
      {
        name: '水路',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: colorGroup.色5
        },
        emphasis: {
          focus: 'series'
        },
        data: [140, 232, 101, 264, 90, 340, 250, 101, 264, 90, 340, 250]
      },
      {
        name: '公路',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: colorGroup.色3
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 402, 231, 134, 190, 230, 120, 231, 134, 190, 230, 120]
      },

    ]
  };
  let centerCityOption = {
    title: {
      text: `中心城市客运量`,
      left: 50,
      textStyle: {
        color: "#6e7079",
        fontWeight: "500",
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
    // legend: {
    //   data: ['客运总量','公共汽电车','城市轨道交通','巡游出租车', ],
    //   textStyle:{
    //     color:'#fff'
    //   }
    // },
    xAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisPointer: {
          type: 'shadow'
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '客运量',
        axisLabel: {
          formatter: '{value} 万人'
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: true
        }
      }
    ],
    grid: {
      bottom: 40,
      left: 120,
      right: 100
    },
    series: [
      {
        name: '客运总量',
        type: 'line',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 万人';
          }
        },
        itemStyle: {
          color: colorGroup.色3 + '8f',
          borderColor: colorGroup.色3,
          borderWidth: 1.5
        },
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
        ]
      },
      {
        name: '公共汽电车',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 万人';
          }
        },
        itemStyle: {
          color: colorGroup.色5 + '4f',
          borderColor: colorGroup.色5,
          borderWidth: 1.5
        },
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
        ]
      },
      {
        name: '城市轨道交通',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 万人';
          }
        },
        itemStyle: {
          color: colorGroup.色1 + '4f',
          borderColor: colorGroup.色1,
          borderWidth: 1.5
        },
        data: [
          2.6, 48.7, 18.8, 6.0, 2.3, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2,
        ]
      },
      {
        name: '巡游出租车',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 万人';
          }
        },
        itemStyle: {
          color: colorGroup.色4 + '4f',
          borderColor: colorGroup.色4,
          borderWidth: 1.5
        },
        data: [
          175.6, 182.2, 48.7, 18.8, 6.0, 2.3, 2.6, 5.9, 9.0, 26.4, 28.7, 70.7,
        ]
      },
    ]
  };
  let portOption = {
    title: {
      text: `港口货物、集装箱吞吐量`,
      left: 'center',
      textStyle: {
        color: "#6e7079",
        fontWeight: "500",
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
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisPointer: {
          type: 'shadow'
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '     货物吞吐量(万吨)',
        axisLabel: {
          formatter: '{value}'
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: true
        }
      },
      {
        type: 'value',
        name: '集装箱吞吐量(万TEU)                 ',
        axisLabel: {
          formatter: '{value}'
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: true
        }
      }
    ],
    grid: {
      bottom: 40,
      left: 38,
      right: 38
    },
    series: [
      {
        name: '货物吞吐量',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 万吨';
          }
        },
        itemStyle: {
          color: colorGroup.色3 + '4f',
          borderColor: colorGroup.色3,
          borderWidth: 1.5
        },
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
        ]
      },
      {
        name: '外贸货物吞吐量',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 万吨';
          }
        },
        itemStyle: {
          color: colorGroup.色5 + '4f',
          borderColor: colorGroup.色5,
          borderWidth: 1.5
        },
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
        ]
      },
      {
        name: '集装箱吞吐量',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 万TEU';
          }
        },
        itemStyle: {
          color: colorGroup.色3 + '5f',
          borderWidth: 1
        },
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      }
    ]
  };
  let rateOption = {
    color: [
      colorGroup.色1,
      colorGroup.色5,
      colorGroup.色3,
    ],
    title: {
      text: '运输方式总体比率',
      left: 'center',
      textStyle: {
        color: "#6e7079",
        fontWeight: "500",
        fontSize: 16,
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
      position: 'inside',
      show: false
    },
    series: [
      {
        name: '客运',
        type: 'pie',
        selectedMode: 'single',
        radius: ['35%', '50%'],
        top: -30,
        bottom: -60,
        left: 20,
        right: 20,
        labelLine: {
          show: false
        },
        label: {
          position: 'center',
          formatter: '',
          show: true,
          fontSize: "30",
          fontWeight: "bold",
          // formatter: `{b} \n {d}%`,
          textStyle: {
            color: colorGroup.色1,
          },
        },
        emphasis: {
          label: {
            formatter: '{a|{a}-}{b|{b}} \n {d|{d}%}  \n {c|{c}万吨}  ',
            show: true,
            fontSize: "30",
            fontWeight: "bold",
            // formatter: `{b} \n {d}%`,
            textStyle: {
              color: colorGroup.色1,
            },
            rich: {
              a: {
                fontSize: 16,
                align: 'center',
                lineHeight: 38,
                color: colorGroup.色1 + "df",
              },
              b: {
                fontSize: 16,
                color: colorGroup.色1,
                fontWeight: 600
              },
              c: {
                fontSize: 18,
                color: colorGroup.色1 + "df",
                lineHeight: 30,
              },
              d: {
                fontSize: 35,
                shadowBlur: 10,
                fontWeight: 600

              },
            }
          },
        },
        data: [
          {
            value: 1548, name: '公路',
            itemStyle: {
              color: colorGroup.色1 + '5f',
              borderColor: colorGroup.色1,
              borderWidth: 2
            },
          },
          {
            value: 775, name: '水路',
            itemStyle: {
              color: colorGroup.色4 + '5f',
              borderColor: colorGroup.色4,
              borderWidth: 2
            },
          },
        ]
      },
      {
        name: '货运',
        type: 'pie',
        radius: ['60%', '65%'],
        labelLine: {
          length: 30
        },
        top: -30,
        bottom: -60,
        left: 40,
        right: 40,
        label: {
          formatter: '{b|{b}}{a|{a}}  \n {d|{d}%}  \n  {c|{c}万吨} ',
          show: true,
          overflow: 'none',
          rich: {
            a: {
              color: colorGroup.色1 + 'af',
              lineHeight: 24,
              fontSize: 14,
              align: 'center',
            },
            b: {
              color: colorGroup.色1,
              lineHeight: 24,
              fontSize: 14,
              align: 'center',
            },
            c: {
              color: colorGroup.色2,
              fontSize: 16,
              align: 'center',
              lineHeight: 24,
            },
            d: {
              color: colorGroup.色4,
              fontSize: 24,
              lineHeight: 24,
              align: 'center',
            }
          }
        },
        data: [
          {
            value: 1048, name: '公路',
            itemStyle: {
              color: colorGroup.色1 + '5f',
              borderColor: colorGroup.色1 + 'af',
              borderWidth: 1.5
            },
          },
          {
            value: 335, name: '水路',
            itemStyle: {
              color: colorGroup.色4 + '5f',
              borderColor: colorGroup.色4 + 'af',
              borderWidth: 1.5
            },
          },
          {
            value: 310, name: '港口',
            itemStyle: {
              color: colorGroup.色5 + '5f',
              borderColor: colorGroup.色5 + 'af',
              borderWidth: 1.5
            },
          },
        ]
      }
    ]
  };
  let grownOption = {
    color: [colorGroup.色5, 'rgb(255 255 255 / 22.5%)', colorGroup.色1],
    title: [
      {
        text: '不同运输方式每月增长速率',
        left: 'center',
        textStyle: {
          color: "#6e7079",
          fontWeight: "500",
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
      top: i > 5 ? '80%' : "43%",
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
      radius: ['19%', '25%'],
      center: ['0%', i > 5 ? '72%' : "35%"],
      data: data,
      label: { //  饼图图形上的文本标签
        normal: { // normal 是图形在默认状态下的样式
          show: true,
          position: 'center',
          fontWeight: 'bold',
          // formatter: ' {a|{c}%}', // {b}:数据名； {c}：数据值； {d}：百分比，可以自定义显示内容，
          rich: {
            a: {
              color: colorGroup.色1,
              padding: [0, 10],
              fontSize: 15
            },
            b: {
              color: colorGroup.色4,
              padding: [0, 10],
              fontSize: 15
            },
          },
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      left: parseFloat((i % 6 / 6 + 8 / 100) * 100).toFixed(5) + '%',
      right: -1000,
      top: 0,
      bottom: 0
    })
  }

  // 创建echartModule对象
  function createEchartsModule() {
    mapModule = new EchartModule(mapRef.current, mapOption)
    centerCityModule = new EchartModule(centerCityRef.current, centerCityOption)
    road1Module = new EchartModule(road1Ref.current, road1Option)
    road2Module = new EchartModule(road2Ref.current, road2Option)
    water1Module = new EchartModule(water1Ref.current, water1Option)
    water2Module = new EchartModule(water2Ref.current, water2Option)
    turnover1Module = new EchartModule(turnover1Ref.current, turnover1Option)
    turnover2Module = new EchartModule(turnover2Ref.current, turnover2Option)
    portModule = new EchartModule(portRef.current, portOption)
    rateModule = new EchartModule(rateRef.current, rateOption)
    grownModule = new EchartModule(grownRef.current, grownOption)
  }

  // 初始化生成Echarts
  function initEcharts() {
    mapModule.createChart()
    centerCityModule.createChart()
    road1Module.createChart()
    road2Module.createChart()
    water1Module.createChart()
    water2Module.createChart()
    turnover1Module.createChart()
    turnover2Module.createChart()
    portModule.createChart()
    rateModule.createChart()
    grownModule.createChart()
  }

  // 更新Echarts
  function updateEcharts() {
    mapModule.updateChart()
    centerCityModule.updateChart()
    road1Module.updateChart()
    road2Module.updateChart()
    water1Module.updateChart()
    water2Module.updateChart()
    turnover1Module.updateChart()
    turnover2Module.updateChart()
    portModule.updateChart()
    rateModule.updateChart()
    grownModule.updateChart()
  }

  function changeActiveProvince(province) {
    let targetProvince = china.features.find(item => item.properties.name == province)
    mapModule.option.series[0].data = [[...targetProvince.properties.cp, 200]]
    mapModule.updateChart()
  }

  useEffect(() => {

    // 创建echartModule对象
    createEchartsModule()
    // 初始化生成Echarts
    initEcharts()
    changeActiveProvince(province)
    updateProvince(province)


    // 地图点击事件
    mapModule.chart.on('click', params => {
      changeActiveProvince(params.name)
      setProvince(params.name)
      updateProvince(params.name)
      // updateEcharts()
    })
  }, [])

  function updateProvince(province) {
    getProvinceData(province).then(res => {
      console.log('res', res)
      let { data } = res;

      // 1.公路客运运输量
      road1Module.option.series[0].data = data.roadGuestData.map(item => item.data_content)
      // 2.公路货运运输量
      road2Module.option.series[0].data = data.roadGoodsData.map(item => item.data_content)
      // 3.水路客运运输量
      water1Module.option.series[0].data = data.waterGuestData.map(item => item.data_content)
      // 4.水路货运运输量
      water2Module.option.series[0].data = data.waterGoodsData.map(item => item.data_content)
      // 5.公路&水路客运周转量
      turnover1Module.option.series[0].data = data.guestTurnoverData.water.map(item => item.data_content)
      turnover1Module.option.series[1].data = data.guestTurnoverData.road.map(item => item.data_content)
      // 6.公路&水路货运周转量
      turnover2Module.option.series[0].data = data.goodsTurnoverData.water.map(item => item.data_content)
      turnover2Module.option.series[1].data = data.goodsTurnoverData.road.map(item => item.data_content)
      // 7.中心城市客运
      centerCityModule.option.series[0].data = data.centerCityData.total.map(item => item.data_content)
      centerCityModule.option.series[1].data = data.centerCityData.bus.map(item => item.data_content)
      centerCityModule.option.series[2].data = data.centerCityData.rail.map(item => item.data_content)
      centerCityModule.option.series[3].data = data.centerCityData.taxi.map(item => item.data_content)
      // 8.总体运输方式比率
      let totalPortGoods = data.totalData.portGoods[0]?.data_content;
      let totalRoadGuest = data.totalData.roadGuest[0]?.data_content;
      let totalRoadGoods = data.totalData.roadGoods[0]?.data_content;
      let totalWaterGuest = data.totalData.waterGuest[0]?.data_content;
      let totalWaterGoods = data.totalData.waterGoods[0]?.data_content;
      setTotalData({
        portGoods: totalPortGoods,
        roadGuest: totalRoadGuest,
        roadGoods: totalRoadGoods,
        waterGuest: totalWaterGuest,
        waterGoods: totalWaterGoods,
      })
      // 9.不同运输方式每月增长速率
      rateModule.option.series[0].data = [
        {
          value: totalRoadGuest, name: '公路',
          itemStyle: {
            color: colorGroup.色1 + '5f',
            borderColor: colorGroup.色1,
            borderWidth: 2
          },
        },
        {
          value: totalWaterGuest, name: '水路',
          itemStyle: {
            color: colorGroup.色4 + '5f',
            borderColor: colorGroup.色4,
            borderWidth: 2
          },
        },
      ]
      rateModule.option.series[1].data  = [
        {
          value: totalRoadGoods, name: '公路',
          itemStyle: {
            color: colorGroup.色1 + '5f',
            borderColor: colorGroup.色1 + 'af',
            borderWidth: 1.5
          },
        },
        {
          value: totalWaterGoods, name: '水路',
          itemStyle: {
            color: colorGroup.色4 + '5f',
            borderColor: colorGroup.色4 + 'af',
            borderWidth: 1.5
          },
        },
        {
          value: totalPortGoods, name: '港口',
          itemStyle: {
            color: colorGroup.色5 + '5f',
            borderColor: colorGroup.色5 + 'af',
            borderWidth: 1.5
          },
        },
      ]
      grownModule.option.series=[]
      for (var i = 0; i < 12; i++) {
        let rate = Number(data.grownData.roadGoods[i].data_content)
        // let rate = 3
        let isPositive = rate > 0
        let rates = rate > 0 ?
          [{ name: 1, value: rate }, { name: 2, value: 100 - rate }, { name: 3, value: 0 }] :
          [{ name: 1, value: 0 }, { name: 2, value: 100 + rate }, { name: 3, value: -rate }]
        grownModule.option.series.push({
          type: 'pie',
          radius: ['19%', '25%'],
          center: ['0%', i > 5 ? '72%' : "35%"],
          data: rates,
          label: {
            show: false,
            formatter: rate > 0 ? `{b|${rate}}` : `{a|${rate}}`
          },
          left: parseFloat((i % 6 / 6 + 8 / 100) * 100).toFixed(5) + '%',
          right: -1000,
          top: 0,
          bottom: 0
        })
      }
      // 10.港口货物集中向吞吐量
      portModule.option.series[0].data = data.portData.total.map(item => item.data_content)
      portModule.option.series[1].data = data.portData.container.map(item => item.data_content)
      portModule.option.series[2].data = data.portData.foreign.map(item => item.data_content)


      // 初始化生成Echarts
      initEcharts()
    })
  }

  return (
    <div className="province-count">
      <div className="top-nav">
        2021年{province}交通运输数据统计
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
            <div className="total-numbers cols">
              {totalData.roadGuest &&
                <div>
                  <div className="number">{totalData.roadGuest}<span>万人</span></div>
                  <div className="text">公路客运量</div>
                </div>
              }
              {totalData.roadGoods &&
                <div>
                  <div className="number">{totalData.roadGoods}<span>万吨</span></div>
                  <div className="text">公路货运量</div>
                </div>
              }
              {totalData.waterGuest &&
                <div>
                  <div className="number">{totalData.waterGuest}<span>万人</span></div>
                  <div className="text">水路客运量</div>
                </div>
              }
              {totalData.waterGoods &&
                <div>
                  <div className="number">{totalData.waterGoods}<span>万吨</span></div>
                  <div className="text">水路货运量</div>
                </div>
              }
              {totalData.portGoods &&
                <div>
                  <div className="number">{totalData.portGoods}<span>万吨</span></div>
                  <div className="text">港口货运量</div>
                </div>
              }
              {/* {totalData.roadGoods &&
                <div>
                  <div className="number">0<span>万吨</span></div>
                  <div className="text">中心城市客运量</div>
                </div>
              } */}
            </div>
          </div>
          <div className="row-2" style={{ position: "relative", zIndex: 100 }}>
            <div id="centerCity" style={{ width: '100%', height: "100%" }} ref={centerCityRef}></div>
          </div>
        </div>
        {/* 第三列 */}
        <div className="col-1 rows">
          <div className="row-5">
            <div id="total-rate" style={{ width: '100%', height: "100%" }} ref={rateRef}></div>
          </div>
          <div className="row-3">
            <div id="grown" style={{ width: '100%', height: "100%" }} ref={grownRef}></div>
          </div>
          <div className="row-3">
            <div id="port" style={{ width: '100%', height: "100%", position: 'relative' }} ref={portRef}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index;
