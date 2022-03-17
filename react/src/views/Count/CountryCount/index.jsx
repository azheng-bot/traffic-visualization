import react, { useEffect, useState, useRef } from "react";
import "./index.less";
import { getCountryData } from "../../../api/deepModule";
import { getCityList } from "../../../api/mycityModule";
import Loading from '../../../components/Loading'

// 高德地图
import AMapLoader from '@amap/amap-jsapi-loader';

// echarts
import * as echarts from 'echarts';

// arco-design
import { Radio } from '@arco-design/web-react';
const RadioGroup = Radio.Group;
import { Select, Message, Space } from '@arco-design/web-react';
const Option = Select.Option;


// 对用到的数据全局化声明
// 地图数据
let map, loca, pl, mapDataList;
// 一般数据
let provinceList, echartsData;
// 声明模块
let roadModule// 公路模块
let waterModule// 水路模块
let portModule// 港口模块
let airModule// 航空模块
let centerCityModule// 航空模块
let rateModule// 总比率模块
// echarts配置项
let roadOption // 公路配置项
let waterOption // 水路配置项
let portOption // 港口配置项
let airOption // 航空配置项
let centerCityOption // 航空配置项
let rateOption // 总比率配置项

function Index() {
  // 总计数字
  let [totalData, setTotalData] = useState({
    portGoods: 0,
    roadGoods: 0,
    roadGuest: 0,
    waterGoods: 0,
    waterGuest: 0,
    airGoods: 0,
    airGuest: 0,
  })
  // 加载
  let [isLoading, setIsLoading] = useState(true)


  document.body.setAttribute('arco-theme', 'dark');

  // 颜色组
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

    // 更新用到的数据
    updateData(data) {
      for (var i = 0; i < data.length; i++) {
        this.option.series[i].data = data[i]
      }
    }

  }

  // 获取DOM元素
  let waterRef = useRef()
  let roadRef = useRef()
  let portRef = useRef()
  let airRef = useRef()
  let centerCityRef = useRef()
  let rateRef = useRef()


  // echarts 的创建、更新
  function createModules() {
    roadModule = new EchartModule(roadRef.current, roadOption)
    waterModule = new EchartModule(waterRef.current, waterOption)
    portModule = new EchartModule(portRef.current, portOption)
    airModule = new EchartModule(airRef.current, airOption)
    centerCityModule = new EchartModule(centerCityRef.current, centerCityOption)
    rateModule = new EchartModule(rateRef.current, rateOption)
  }
  function createOptions() {
    roadOption = {
      title: {
        text: `全国公路运量总计`,
        left: 20,
        textStyle: {
          color: "#ffffffaa",
          fontWeight: "500",
          fontSize: 16
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
          name: '运量',
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: true
          },
          // max: 500000
        },
        {
          type: 'value',
          name: '周转量',
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
        bottom: 60,
        left: 100,
        right: 50,
      },
      series: [
        {
          name: '运量',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 万';
            }
          },
          itemStyle: {
            color: colorGroup.色5 + '7f',
            borderColor: colorGroup.色5,
            borderWidth: 4
          },
          data: [
            175.6, 182.2, 48.7, 18.8, 6.0, 2.3, 2.6, 5.9, 9.0, 26.4, 28.7, 70.7,
          ]
        },
        {
          name: '周转量',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 万公里';
            }
          },
          itemStyle: {
            color: colorGroup.色1 + '8f',
            borderColor: colorGroup.色3,
            borderWidth: 4
          },
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
          ]
        },
      ]
    };
    waterOption = {
      title: {
        text: `全国水路运量总计`,
        left: 20,
        textStyle: {
          color: "#ffffffaa",
          fontWeight: "500",
          fontSize: 16
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
          name: '运量',
          axisLabel: {
            formatter: '{value} 万'
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: true
          },
          // max: 100000
        },
        {
          type: 'value',
          name: '周转量',
          axisLabel: {
            formatter: '{value} 万'
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
        bottom: 60,
        left: 100,
        right: 50,
      },
      series: [
        {
          name: '运量',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 万';
            }
          },
          itemStyle: {
            color: colorGroup.色4 + '7f',
            borderColor: colorGroup.色4,
            borderWidth: 4
          },
          data: [
            175.6, 182.2, 48.7, 18.8, 6.0, 2.3, 2.6, 5.9, 9.0, 26.4, 28.7, 70.7,
          ]
        },
        {
          name: '周转量',
          yAxisIndex: 1,
          type: 'line',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 万';
            }
          },
          itemStyle: {
            color: colorGroup.色3 + '7f',
            borderColor: colorGroup.色3,
            borderWidth: 4
          },
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
          ]
        },
      ]
    };
    portOption = {
      title: {
        text: `全国港口货物、集装箱吞吐量`,
        left: 20,
        textStyle: {
          color: "#ffffffaa",
          fontWeight: "500",
          fontSize: 16
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
        left: 100,
        right: 45,
        // top:-20
      },
      series: [
        {
          name: '货物吞吐量',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 万';
            }
          },
          itemStyle: {
            color: colorGroup.色3 + '4f',
            borderColor: colorGroup.色3,
            borderWidth: 2
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
              return value + ' 万';
            }
          },
          itemStyle: {
            color: colorGroup.色5 + '4f',
            borderColor: colorGroup.色5,
            borderWidth: 2
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
    airOption = {
      title: {
        text: `全国航空运量总计`,
        left: 40,
        top: 20,
        textStyle: {
          color: "#ffffffaa",
          fontWeight: "500",
          fontSize: 16
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
          name: '运量',
          axisLabel: {
            formatter: '{value} 万'
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
        left: 80,
        right: 50,
        top: 50
      },
      series: [
        {
          name: '国内航线',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 万';
            }
          },
          itemStyle: {
            color: colorGroup.色3 + '7f',
            borderColor: colorGroup.色3,
            borderWidth: 2,

          },
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
          ]
        },
        {
          name: '国际航线',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 万';
            }
          },
          itemStyle: {
            color: colorGroup.色4 + '7f',
            borderColor: colorGroup.色4,
            borderWidth: 3
          },
          data: [
            175.6, 182.2, 48.7, 18.8, 6.0, 2.3, 2.6, 5.9, 9.0, 26.4, 28.7, 70.7,
          ]
        },
      ]
    };
    centerCityOption = {
      title: {
        text: `全国中心城市运量`,
        left: 20,
        textStyle: {
          color: "#ffffffaa",
          fontWeight: "500",
          fontSize: 16
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
          name: '运量',
          axisLabel: {
            formatter: '{value} 万'
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
        left: 80,
        right: 40
      },
      series: [
        {
          name: '客运总量',
          type: 'line',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 万';
            }
          },
          itemStyle: {
            color: colorGroup.色3 + '8f',
            borderColor: colorGroup.色3,
            borderWidth: 2
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
              return value + ' 万';
            }
          },
          itemStyle: {
            color: colorGroup.色5 + '4f',
            borderColor: colorGroup.色5,
            borderWidth: 2
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
              return value + ' 万';
            }
          },
          itemStyle: {
            color: colorGroup.色1 + '4f',
            borderColor: colorGroup.色1,
            borderWidth: 2
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
              return value + ' 万';
            }
          },
          itemStyle: {
            color: colorGroup.色4 + '4f',
            borderColor: colorGroup.色4,
            borderWidth: 2
          },
          data: [
            175.6, 182.2, 48.7, 18.8, 6.0, 2.3, 2.6, 5.9, 9.0, 26.4, 28.7, 70.7,
          ]
        },
      ]
    };
    rateOption = {
      color: [
        colorGroup.色1,
        colorGroup.色3,
        colorGroup.色4,
        colorGroup.色5,
      ],
      title: {
        text: '运输方式总体比率',
        // left: 'center',
        right: 50,
        top: 0,
        textStyle: {
          color: "#ffffffaa",
          fontWeight: "500",
          fontSize: 16
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
              formatter: '{a|{a}-}{b|{b}} \n {d|{d}%}  \n {c|{c}万人}  ',
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
                borderWidth: 3
              },
            },
            {
              value: 775, name: '水路',
              itemStyle: {
                color: colorGroup.色4 + '5f',
                borderColor: colorGroup.色4,
                borderWidth: 3
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
                borderWidth: 3
              },
            },
            {
              value: 335, name: '水路',
              itemStyle: {
                color: colorGroup.色4 + '5f',
                borderColor: colorGroup.色4 + 'af',
                borderWidth: 3
              },
            },
            {
              value: 310, name: '港口',
              itemStyle: {
                color: colorGroup.色5 + '5f',
                borderColor: colorGroup.色5 + 'af',
                borderWidth: 3
              },
            },
            {
              value: 310, name: '航空',
              itemStyle: {
                color: colorGroup.色4 + '5f',
                borderColor: colorGroup.色4 + 'af',
                borderWidth: 3
              },
            },
          ]
        }
      ]
    };
  }
  function updateEchartsData(data) {
    let {
      roadData,
      waterData,
      airData,
      centerCityData,
      portData,
      provinceTotalData
    } = data;

    if (roadData) {
      let roadGoods = roadData.roadGoods.map(item => item.data_content)
      let roadGoodsTurnover = roadData.roadGoodsTurnover.map(item => item.data_content)
      roadModule.updateData([roadGoods, roadGoodsTurnover])
    }
    if (waterData) {
      let waterGoods = waterData.waterGoods.map(item => item.data_content)
      let waterGoodsTurnover = waterData.waterGoodsTurnover.map(item => item.data_content)
      waterModule.updateData([waterGoods, waterGoodsTurnover])
    }
    if (airData) {
      let countryGoods = airData.countryGoods.map(item => item.data_content)
      let worldGoods = airData.worldGoods.map(item => item.data_content)
      airModule.updateData([countryGoods, worldGoods])
    }
    if (centerCityData) {
      let total = centerCityData.total.map(item => item.data_content)
      let bus = centerCityData.bus.map(item => item.data_content)
      let rail = centerCityData.rail.map(item => item.data_content)
      let taxi = centerCityData.taxi.map(item => item.data_content)
      centerCityModule.updateData([total, bus, rail, taxi])
    }
    if (portData) {
      let total = portData.total.map(item => item.data_content)
      let container = portData.container.map(item => item.data_content)
      let foreign = portData.foreign.map(item => item.data_content)
      portModule.updateData([total, container, foreign])
    }
  }
  function createEcharts() {
    roadModule.createChart()
    waterModule.createChart()
    portModule.createChart()
    airModule.createChart()
    centerCityModule.createChart()
    rateModule.createChart()
  }
  function switchData(domain, value) {
    switch (domain + value) {
      case '公路货物':
        var data = echartsData.roadData.roadGoods.map(item => item.data_content)
        var turnoverData = echartsData.roadData.roadGoodsTurnover.map(item => item.data_content)
        roadModule.updateData([data, turnoverData])
        roadModule.createChart()
        break;
      case '公路旅客':
        var data = echartsData.roadData.roadGuest.map(item => item.data_content)
        var turnoverData = echartsData.roadData.roadGuestTurnover.map(item => item.data_content)
        roadModule.updateData([data, turnoverData])
        roadModule.createChart()
        break;
      case '水路旅客':
        var data = echartsData.waterData.waterGuest.map(item => item.data_content)
        var turnoverData = echartsData.waterData.waterGuestTurnover.map(item => item.data_content)
        waterModule.updateData([data, turnoverData])
        waterModule.createChart()
        break;
      case '航空货邮':
        var data = echartsData.airData.countryGoods.map(item => item.data_content)
        var worldData = echartsData.airData.worldGoods.map(item => item.data_content)
        airModule.updateData([data, worldData])
        airModule.createChart()
        break;
      case '航空旅客':
        var data = echartsData.airData.countryGuest.map(item => item.data_content)
        var worldData = echartsData.airData.worldGuest.map(item => item.data_content)
        airModule.updateData([data, worldData])
        airModule.createChart()
        break;
    }
  }

  // 可视化地图
  // selector 选项
  const selectOptions = ['公路货物运输量', '公路旅客运输量', '水路货物运输量', '水路旅客运输量', '全国港口货物、集装箱吞吐量'];
  // 加载可视化地图数据
  let domainMap = { '公路货物运输量': 'roadGoods', '公路旅客运输量': 'roadGuest', '水路货物运输量': 'waterGoods', '水路旅客运输量': 'waterGuest', '全国港口货物、集装箱吞吐量': 'portGoods' }
  function loadingMapData(domain) {
    let data = mapDataList[domainMap[domain]]
    let geoData = {
      type: "FeatureCollection",
      features: []
    }

    data.forEach(item => {
      if (item.label_name == '总计' || item.label_name == '不分地区') return false

      let targetProv = provinceList.find(prov => prov.prov_name.includes(item.label_name))
      let site = [targetProv.east_latitude, targetProv.north_latitude]
      let featureItem = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: site
        },
        properties: {
          "id": 1,
          "名称": targetProv.prov_name,
          "地址": targetProv.prov_name,
          "adcode_n": -1,
          "adcode_p": -1,
          "adcode_c": -1,
          "adcode_d": -1,
          "point_status": 0,
          "创建时间": "2021-01-27 14:45:12",
          "修改时间": "2021-01-27 14:45:12",
          "value": item.data_content,
        }
      }

      geoData.features.push(featureItem)
    })


    var geo = new Loca.GeoJSONSource({
      data: geoData
    });
    pl.setSource(geo);

    // 中界值
    let mediumNumber = 0
    // 不同模块柱状高度系数
    let heigthTimes = 1
    switch (domain) {
      case '公路旅客运输量':
        mediumNumber = 30000
        heigthTimes = 6
        break;
      case '公路货物运输量':
        mediumNumber = 30000
        heigthTimes = 1
        break;
      case '水路旅客运输量':
        mediumNumber = 30000
        heigthTimes = 80
        break;
      case '水路货物运输量':
        mediumNumber = 30000
        heigthTimes = 2
        break;
      case '全国港口货物、集装箱吞吐量':
        mediumNumber = 30000
        heigthTimes = 2
        break;

    }

    pl.setStyle({
      unit: 'meter',
      sideNumber: 60,
      topColor: (index, f) => {
        var n = f.properties['value'];
        return colorGroup.色5;
        return n > mediumNumber ? colorGroup.色5 : colorGroup.色1;
      },
      sideTopColor: (index, f) => {
        var n = f.properties['value'];
        return colorGroup.色5;
        return n > mediumNumber ? colorGroup.色5 : colorGroup.色1;
      },
      sideBottomColor: colorGroup.色5 + '60',
      radius: 32000,
      height: (index, f) => {
        var props = f.properties;
        var height = Math.max(100, props['value'] * heigthTimes * 5);
        return height;
      },
      altitude: 0,
    });


    // 点击事件处理
    var clickInfo = new AMap.Marker({
      anchor: 'bottom-center',
      position: [116.396923, 39.918203, 0],
    });
    clickInfo.setMap(map);
    clickInfo.hide();
    map.on('click', function (e) {
      var feat = pl.queryFeature(e.pixel.toArray());
      if (feat) {
        clickInfo.show();
        var props = feat.properties;
        var height = Math.max(100, Math.sqrt(props['value']) * 9000 - 50000);
        var height = Math.max(100, props['value'] * heigthTimes * 5) + 50000;
        clickInfo.setPosition([feat.coordinates[0], feat.coordinates[1], height]);
        clickInfo.setContent(
          '<div style="text-align: center; height: 20px; width: 150px; color:#fff; font-size: 18px;text-shadow: 2px 2px 0px #1485e9;font-weight:600;">' +
          feat.properties['名称'] + ': ' + feat.properties['value'] +
          '万</div>'
        );
      } else {
        clickInfo.hide();
      }
    });

    loca.add(pl);
    mapDataAnimate()
    Message.success({ content: `已加载${domain}.`, showIcon: true });
  }
  // 可视化地图数据加载动画
  function mapDataAnimate() {
    pl.show(500);
    pl.addAnimate({
      key: 'height',
      value: [0, 1],
      duration: 200,
      easing: 'Linear',
      transform: 200,
      random: true,
      delay: 2000,
    });
  }


  useEffect(() => {
    // 生成配置项
    createOptions()
    // 生成模块
    createModules()
    // 生成echarts
    createEcharts()


    // 加载可视化地图
    AMapLoader.load({
      "key": import.meta.env.VITE_WebMapKey,              // 申请好的Web端开发者Key，首次调用 load 时必填
      "version": "2.0",       // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      "plugins": [],
      "Loca": {                // 是否加载 Loca， 缺省不加载
        "version": '2.0.0'  // Loca 版本，缺省 1.3.2
      },
    })
      // 生成可视化地图
      .then((AMap) => {
        map = new AMap.Map('map', {
          zoom: 5,
          showLabel: false,
          viewMode: '3D',
          pitch: 55,
          center: [107.594884, 36.964587],
          mapStyle: 'amap://styles/grey',
        });

        loca = new Loca.Container({
          map,
        });
        loca.ambLight = {
          intensity: 0.7,
          color: '#00ffff',
        };
        loca.dirLight = {
          intensity: 0.8,
          color: '#797979',
          target: [0, 0, 0],
          position: [0, -1, 1],
        };
        loca.pointLight = {
          color: '#00ffff',
          position: [112.028276, 31.58538, 2000000],
          intensity: 3,
          // 距离表示从光源到光照强度为 0 的位置，0 就是光不会消失。
          distance: 6000000,
        };

        pl = new Loca.PrismLayer({
          zIndex: 10,
          opacity: 1,
          visible: false,
          hasSide: true,
        });


        map.on('complete', function () {
          setIsLoading(false)
          setTimeout(function () {
            pl.show(500);
            pl.addAnimate({
              key: 'height',
              value: [0, 1],
              duration: 500,
              easing: 'Linear',
              transform: 500,
              random: true,
              delay: 5000,
            });
          }, 80);
        });
        // loca.animate.start();


        // var dat = new Loca.Dat();
        // dat.addLayer(pl, 'GDP');

        // dat.addLight(loca.ambLight, loca, '环境光');
        // dat.addLight(loca.dirLight, loca, '平行光');
        // dat.addLight(loca.pointLight, loca, '点光');

      })
      // 获取省份坐标数据
      .then(getCityList)
      .then(({ provinces }) => {
        provinceList = provinces.slice();
      })
      // 获取数据
      .then(getCountryData)
      .then(({ data }) => {
        echartsData = { airData: data.airData, portData: data.portData, roadData: data.roadData, waterData: data.waterData }
        // 加载可视化地图数据
        mapDataList = Object.assign({}, data.provinceTotalData);
        // 数据处理
        let deWeight = new Set()
        mapDataList.portGoods = mapDataList.portGoods.filter(item => {
          // 去除市
          if (item.label_name.includes('合计')) {
            // 去除‘合计’
            item.label_name = item.label_name.slice(0, -2)
            // 去除'沿海', '内河'
            if (['沿海', '内河'].includes(item.label_name)) return false
            // 去重
            if (deWeight.has(item.label_name)) {
              return false
            } else {
              deWeight.add(item.label_name)
            }

            return true
          } else {
            return false
          }
        })

        loadingMapData('公路货物运输量')
        mapDataAnimate()
        // 加载echarts数据
        updateEchartsData(data)
        rateModule.option.series[0].data[0].value = data.roadData.roadGuest[11].data_content
        rateModule.option.series[0].data[1].value = data.waterData.waterGuest[11].data_content
        rateModule.option.series[1].data[0].value = data.roadData.roadGoods[11].data_content
        rateModule.option.series[1].data[1].value = data.waterData.waterGoods[11].data_content
        rateModule.option.series[1].data[2].value = data.portData.total[11].data_content
        rateModule.option.series[1].data[3].value = data.airData.countryGoods[10].data_content
        createEcharts()
        // 设置总数据
        setTotalData({
          portGoods: data.portData.total[11].data_content,
          roadGoods: data.roadData.roadGoods[11].data_content,
          roadGuest: data.roadData.roadGuest[11].data_content,
          waterGoods: data.waterData.waterGoods[11].data_content,
          waterGuest: data.waterData.waterGuest[11].data_content,
          airGoods: data.airData.countryGoods[10].data_content,
          airGuest: data.airData.countryGuest[10].data_content,
        })
      })
      .catch(e => {
        console.log(e);
      })
  }, [])

  return (
    <div className="country-count">
      <Loading isLoading={isLoading}  background={'#0a141c'} color={colorGroup.色4}></Loading>
      <div className="top-nav">
        2021年全国交通运输数据统计
      </div>
      <div className="content cols">
        <div id="map"></div>
        {/* 第一列 */}
        <div className="left-col">
          <div className="col col-1" >
            <RadioGroup
              type='button'
              name='lang'
              size='default'
              defaultValue='货物'
              style={{ position: 'absolute', right: '-10px', top: '-10px', zIndex: 10 }}
              onChange={(value) => switchData('公路', value)}
            >
              <Radio value='货物'>货物</Radio>
              <Radio value='旅客'>旅客</Radio>
            </RadioGroup>
            <div className="chart" ref={roadRef}></div>
          </div>
          <div className="col col-1" >
            <RadioGroup
              type='button'
              name='lang'
              size='default'
              defaultValue='货物'
              style={{ position: 'absolute', right: '-10px', top: '-10px', zIndex: 10 }}
              onChange={(value) => switchData('水路', value)}
            >
              <Radio value='货物'>货物</Radio>
              <Radio value='旅客'>旅客</Radio>
            </RadioGroup>
            <div className="chart" ref={waterRef}></div>
          </div>
          <div className="col col-1" >
            <div className="chart" ref={portRef}></div>
          </div>
        </div>
        {/* 第二列 */}
        <div className="center-col">
          <div className="total-numbers">
            <div>
              <div className="number">{totalData.roadGuest}<span>万人</span></div>
              <div className="text">公路客运量</div>
            </div>
            <div>
              <div className="number">{totalData.roadGoods}<span>万吨</span></div>
              <div className="text">公路货运量</div>
            </div>
            <div>
              <div className="number">{totalData.waterGuest}<span>万人</span></div>
              <div className="text">水路客运量</div>
            </div>
            <div>
              <div className="number">{totalData.waterGoods}<span>万吨</span></div>
              <div className="text">水路货运量</div>
            </div>
            <div>
              <div className="number">{totalData.airGuest}<span>万人</span></div>
              <div className="text">国内航线客运量</div>
            </div>
            <div>
              <div className="number">{totalData.portGoods}<span>万吨</span></div>
              <div className="text">港口货运量</div>
            </div>
          </div>
          <div className="selector">
            <Select
              placeholder='Please select'
              style={{ width: 154, float: 'right', marginRight: '10px' }}
              onChange={(value) => { loadingMapData(value) }}
              defaultValue='公路货物运输量'
            >
              {selectOptions.map((option, index) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        {/* 第三列 */}
        <div className="right-col">
          <div className="col col-1" >
            <RadioGroup
              type='button'
              name='lang'
              size='default'
              defaultValue='货邮'
              style={{ position: 'absolute', right: '20px', top: '20px', zIndex: 10 }}
              onChange={(value) => switchData('航空', value)}
            >
              <Radio value='货邮'>货邮</Radio>
              <Radio value='旅客'>旅客</Radio>
            </RadioGroup>
            <div className="chart" ref={airRef}></div>
          </div>
          <div className="col col-1" >
            <div className="chart" ref={rateRef}></div>
          </div>
          <div className="col col-1" >
            <div className="chart" ref={centerCityRef}></div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Index;
