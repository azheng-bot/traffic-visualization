import react, { useEffect, useState, useRef } from "react";
import "./index.less";
import { getProvinceData } from "../../../api/deepModule";

// 高德地图
import AMapLoader from '@amap/amap-jsapi-loader';

// echarts
import * as echarts from 'echarts';
// china.json
import china from "./china.json"
console.log('china', china)
echarts.registerMap('china', china)

function Index() {
  let [totalData, setTotalData] = useState({
    portGoods: 0,
    roadGoods: 0,
    roadGuest: 0,
    waterGoods: 0,
    waterGuest: 0
  })

  // document.body.setAttribute('arco-theme', 'dark');

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

    // 更新
    updateChart() {
      this.chart.setOption(Object.assign({}, this.option))
    }
  }

  // 获取DOM元素
  let waterRef = useRef()
  let roadRef = useRef()
  let portRef = useRef()
  let airRef = useRef()
  let rateRef = useRef()

  // 声明模块
  let roadModule// 公路模块
  let waterModule// 水路模块
  let portModule// 港口模块
  let airModule// 航空模块
  let rateModule// 总比率模块

  // echarts配置项
  let roadOption // 公路配置项
  let waterOption // 水路配置项
  let portOption // 港口配置项
  let airOption // 航空配置项
  let rateOption // 总比率配置项

  function createModules() {
    roadModule = new EchartModule(roadRef.current, roadOption)
    waterModule = new EchartModule(waterRef.current, waterOption)
    portModule = new EchartModule(portRef.current, portOption)
    airModule = new EchartModule(airRef.current, airOption)
    rateModule = new EchartModule(rateRef.current, rateOption)
  }
  function createOptions() {
    roadOption = {
      title: {
        text: `水路客运量&货运量`,
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
        bottom: 60,
        left: 80,
        right: 50,
      },
      series: [
        {
          name: '旅客周转量',
          type: 'line',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 万人';
            }
          },
          itemStyle: {
            color: colorGroup.色1 + '8f',
            borderColor: colorGroup.色3,
            borderWidth: 3
          },
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
          ]
        },
        {
          name: '客运量',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 万人';
            }
          },
          itemStyle: {
            color: colorGroup.色5 + '7f',
            borderColor: colorGroup.色5,
            borderWidth:2
          },
          data: [
            175.6, 182.2, 48.7, 18.8, 6.0, 2.3, 2.6, 5.9, 9.0, 26.4, 28.7, 70.7,
          ]
        },
      ]
    };
    waterOption = {
      title: {
        text: `水路客运量&货运量`,
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
        bottom: 60,
        left: 80,
        right: 50,
      },
      series: [
        {
          name: '旅客周转量',
          type: 'line',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 万人';
            }
          },
          itemStyle: {
            color: colorGroup.色3 + '7f',
            borderColor: colorGroup.色3,
            borderWidth: 3
          },
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
          ]
        },
        {
          name: '客运量',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 万人';
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
    portOption = {
      title: {
        text: `水路客运量&货运量`,
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
        bottom: 60,
        left: 80,
        right: 50,
      },
      series: [
        {
          name: '旅客周转量',
          type: 'line',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 万人';
            }
          },
          itemStyle: {
            color: colorGroup.色4 + '7f',
            borderColor: colorGroup.色4,
            borderWidth: 3
          },
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
          ]
        },
        {
          name: '客运量',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 万人';
            }
          },
          itemStyle: {
            color: colorGroup.色5 + '7f',
            borderColor: colorGroup.色5,
            borderWidth: 3
          },
          data: [
            175.6, 182.2, 48.7, 18.8, 6.0, 2.3, 2.6, 5.9, 9.0, 26.4, 28.7, 70.7,
          ]
        },
      ]
    };
    airOption = {
      title: {
        text: `水路客运量&货运量`,
        left: 40,
        top:20,
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
        left: 80,
        right: 50,
        top:100
      },
      series: [
        {
          name: '旅客周转量',
          type: 'line',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 万人';
            }
          },
          itemStyle: {
            color: colorGroup.色3,
            borderColor: colorGroup.色3,
            borderWidth:4,
          },
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
          ]
        },
        {
          name: '客运量',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 万人';
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
    rateOption = {
      color: [
        // colorGroup.色1,
        colorGroup.色3,
        colorGroup.色4,
        colorGroup.色5,
      ],
      title: {
        text: '运输方式总体比率',
        left: 'center',
        top:50,
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
          ]
        }
      ]
    };
  }
  function createEcharts() {
    roadModule.createChart()
    waterModule.createChart()
    portModule.createChart()
    airModule.createChart()
    rateModule.createChart()
  }

  useEffect(() => {
    // 生成配置项
    createOptions()
    // 生成模块
    createModules()
    // 生成echarts
    createEcharts()

    // 生成中心可视化地图
    window.movingDraw = true;
    AMapLoader.load({
      "key": import.meta.env.VITE_WebMapKey,              // 申请好的Web端开发者Key，首次调用 load 时必填
      "version": "2.0",       // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      "plugins": [],
      "Loca": {                // 是否加载 Loca， 缺省不加载
        "version": '2.0.0'  // Loca 版本，缺省 1.3.2
      },
    }).then((AMap) => {
      var map = new AMap.Map('map', {
        zoom: 5,
        showLabel: false,
        viewMode: '3D',
        pitch: 55,
        center: [107.594884, 36.964587],
        mapStyle: 'amap://styles/grey',
      });

      var loca = new Loca.Container({
        map,
      });
      loca.ambLight = {
        intensity: 0.7,
        color:'#93ffff',
      };
      loca.dirLight = {
        intensity: 0.8,
        color: '#b5b5b5',
        target: [0, 0, 0],
        position: [0, -1, 1],
      };
      loca.pointLight = {
        color: '#00ffff',
        position: [112.028276, 31.58538, 2000000],
        intensity: 3,
        // 距离表示从光源到光照强度为 0 的位置，0 就是光不会消失。
        distance: 5000000,
      };

      var pl = new Loca.PrismLayer({
        zIndex: 10,
        opacity: 1,
        visible: false,
        hasSide: true,
      });

      var geo = new Loca.GeoJSONSource({
        url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/gdp.json',
      });
      pl.setSource(geo);
      // top3 的城市增加文字
      var topConf = {
        '上海市': 'https://a.amap.com/Loca/static/loca-v2/demos/images/top-one.png',
        '北京市': 'https://a.amap.com/Loca/static/loca-v2/demos/images/top-two.png',
        '广州市': 'https://a.amap.com/Loca/static/loca-v2/demos/images/top-three.png',
      };
      pl.setStyle({
        unit: 'meter',
        sideNumber: 32,
        topColor: (index, f) => {
          var n = f.properties['GDP'];
          return n > 7000 ? '#E97091' : '#2852F1';
        },
        sideTopColor: (index, f) => {
          var n = f.properties['GDP'];
          return n > 7000 ? colorGroup.色1 : colorGroup.色5;
        },
        sideBottomColor: colorGroup.色5,
        radius: 15000,
        height: (index, f) => {
          var props = f.properties;
          var height = Math.max(100, Math.sqrt(props['GDP']) * 9000 - 50000);
          var conf = topConf[props['名称']];
          // top3 的数据，增加文字表达
          // if (conf) {
          //   map.add(
          //     new AMap.Marker({
          //       anchor: 'bottom-center',
          //       position: [f.coordinates[0], f.coordinates[1], height],
          //       content: '<div style="margin-bottom: 10px; float: left; font-size: 14px;height: 57px; width: 180px; color:#fff; background: no-repeat url(' +
          //         conf +
          //         '); background-size: 100%;"><p style="margin: 7px 0 0 35px; height: 20px; line-height:20px;">' +
          //         props['名称'] + '人口 ' + props['人口'] + '</p>' +
          //         '<p style="margin: 4px 0 0 35px; height: 20px; line-height:20px; color: #00a9ff; font-size: 13px;">' +
          //         props['GDP'] + ' 元' +
          //         '</p></div>',
          //     }),
          //   );
          // }
          return height;
          // return 60000 + n * 100;
        },
        // rotation: 360 * 100,
        altitude: 0,
      });
      loca.add(pl);
      map.on('complete', function () {
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
        }, 800);
      });
      loca.animate.start();

      var dat = new Loca.Dat();
      dat.addLayer(pl, 'GDP');

      dat.addLight(loca.ambLight, loca, '环境光');
      dat.addLight(loca.dirLight, loca, '平行光');
      dat.addLight(loca.pointLight, loca, '点光');

      // 点击事件处理
      var clickInfo = new AMap.Marker({
        anchor: 'bottom-center',
        position: [116.396923, 39.918203, 0],
      });
      clickInfo.setMap(map);
      clickInfo.hide();
      // 动画测试
      map.on('click', function (e) {
        var feat = pl.queryFeature(e.pixel.toArray());
        if (feat) {
          clickInfo.show();
          var props = feat.properties;
          var height = Math.max(100, Math.sqrt(props['GDP']) * 9000 - 50000);
          clickInfo.setPosition([feat.coordinates[0], feat.coordinates[1], height]);
          clickInfo.setContent(
            '<div style="text-align: center; height: 20px; width: 150px; color:#fff; font-size: 14px;">' +
            feat.properties['名称'] + ': ' + feat.properties['GDP'] +
            ' 元</div>'
          );
        } else {
          clickInfo.hide();
        }
      });
    }).catch(e => {
      console.log(e);
    })
  }, [])

  return (
    <div className="country-count">
      <div className="top-nav">
        2021年全国交通运输数据统计
      </div>
      <div className="content cols">
        <div id="map"></div>
        {/* 第一列 */}
        <div className="left-col">
          <div className="col-1" ref={roadRef}></div>
          <div className="col-1" ref={waterRef}></div>
          <div className="col-1" ref={portRef}></div>
        </div>
        {/* 第二列 */}
        <div className="total-numbers center-col">
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
            <div className="number">{totalData.portGoods}<span>万吨</span></div>
            <div className="text">港口货运量</div>
          </div>
          <div>
            <div className="number">0<span>万吨</span></div>
            <div className="text">中心城市客运量</div>
          </div>
        </div>
        {/* 第三列 */}
        <div className="right-col">
          <div className="col-1" ref={rateRef}></div>
          <div className="col-1" ref={airRef}></div>
        </div>
      </div>
    </div >
  )
}

export default Index;
