import { useEffect, useState, useRef } from "react";
import "./index.less";

// arco design
import { Select, Message, Space, Radio } from '@arco-design/web-react';
const Option = Select.Option;
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];
const RadioGroup = Radio.Group;

// echarts
import * as echarts from 'echarts/core';
import { LegendComponent, GridComponent, ToolboxComponent, TitleComponent, TooltipComponent, GeoComponent } from 'echarts/components';
import { LineChart, BarChart, ScatterChart, EffectScatterChart, PieChart } from 'echarts/charts';
import { UniversalTransition, LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// china.json
import china from "./china.json"
console.log('china', china)

echarts.use([
  LegendComponent,
  BarChart,
  LineChart,
  GridComponent,
  ToolboxComponent,
  TitleComponent,
  TooltipComponent,
  ScatterChart,
  EffectScatterChart,
  CanvasRenderer,
  UniversalTransition,
  PieChart,
  LabelLayout,
  GeoComponent
]);


function Index() {
  // document.body.setAttribute('arco-theme', 'dark');
  let allProvBarChart = {
    option: {},
    dom: {},
    chart: {}
  }
  let allProvMapChart = {
    option: {},
    dom: {},
    chart: {}
  }
  let eachProvCircleChart = {
    option: {},
    dom: {},
    chart: {}
  }
  let chart1 = useRef()
  let chart2 = useRef()
  let chart3 = useRef()

  // 初始化
  useEffect(() => {
    const myecharts = echarts.init(document.getElementById("allProvMapChart"))
    echarts.registerMap("china", china)//第一个参数是你定义的字符串，下面map要用到，第二个就是你刚刚引入的china.json
    var option
    myecharts.setOption(option = {
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
    })

    allProvBarChart.dom = chart1.current
    allProvMapChart.dom = chart2.current
    eachProvCircleChart.dom = chart3.current


    // 柱状图
    allProvBarChart.option = {
      title: {
        text: "各省份每月公路客运量",
        textStyle: {
          color: '#fff',
          fontWeight: '200'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#fff',
          }
        }
      },
      // toolbox: {
      //   feature: {
      //     dataView: { show: true, readOnly: false },
      //     magicType: { show: true, type: ['line', 'bar'] },
      //     restore: { show: true },
      //     saveAsImage: { show: true }
      //   }
      // },
      legend: {
        data: ['Evaporation', 'Precipitation', 'Temperature'],
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Precipitation',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} ml'
          }
        },
        {
          type: 'value',
          name: 'Temperature',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value} °C'
          }
        }
      ],
      series: [
        {
          name: 'Evaporation',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' ml';
            }
          },
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
          ]
        },
        {
          name: 'Precipitation',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' ml';
            }
          },
          data: [
            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
          ],
        },
        {
          name: 'Temperature',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value + ' °C';
            }
          },
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
      ]
    };
    allProvBarChart.chart = echarts.init(allProvBarChart.dom)
    allProvBarChart.chart.setOption(allProvBarChart.option)


    // 地图
    allProvMapChart.option = {}
    allProvMapChart.chart = echarts.init(allProvMapChart.dom)
    allProvMapChart.chart.setOption(allProvMapChart.option)


    // 环形图
    eachProvCircleChart.option = {
      color: ['#e24e5b', '#e14d58', 'rgb(255 255 255 / 22.5%)'],
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
      eachProvCircleChart.option.title.push({
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
        [{ name: 1, value: data }, { name: 2, value: 0 }, { name: 3, value: 100 - data }] :
        [{ name: 1, value: 0 }, { name: 2, value: -data }, { name: 3, value: 100 + data }]
      eachProvCircleChart.option.series.push({
        type: 'pie',
        radius: ['30%', '40%'],
        center: ['50%', '45%'],
        data: data,
        label: {
          show: false
        },
        left: parseFloat((i / 13 + 1 / 19) * 200 - 100).toFixed(5) + '%',
        top: 0,
        bottom: 0
      })
    }
    console.log('eachProvCircleChart.option', eachProvCircleChart.option)
    eachProvCircleChart.chart = echarts.init(eachProvCircleChart.dom)
    eachProvCircleChart.chart.setOption(eachProvCircleChart.option)
  }, [])

  function createMap() {
    var map = new AMap.Map('allProvMapChart', {
      zoom: 4.8,
      showLabel: false,
      viewMode: '3D',
      center: [105.601, 35.32],
      mapStyle: 'amap://styles/45311ae996a8bea0da10ad5151f72979',
    });

    var tool = new AMap.ToolBar();
    tool.addTo(map);

    var loca = new Loca.Container({
      map,
    });

    var pl = window.pl = new Loca.PointLayer({
      zIndex: 10,
      opacity: 1,
      blend: 'normal',
    });

    var geo = new Loca.GeoJSONSource({
      url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/gdp.json',
    });
    pl.setSource(geo);
    var colors = [
      'rgba(254,255,198,0.95)',
      'rgba(255,238,149,0.95)',
      'rgba(255,217,99,0.95)',
      'rgba(255,175,43,0.95)',
      'rgba(255,135,24,0.95)',
      'rgba(234,10,0,0.95)',
      'rgba(195,0,0,0.95)',
      'rgba(139,0,0,0.95)',
    ];

    var style = {
      unit: 'meter',
      radius: (index, f) => {
        var n = f.properties['人口'];
        return n * 100;
      },
      color: (index, f) => {
        var n = Math.min(7, ~~(f.properties['人均GDP'] / 10000));
        return colors[n];
      },
      borderWidth: 0,
      blurRadius: -1,
    }

    pl.setStyle(style)
    loca.add(pl);

    // 图例
    var lengend = new Loca.Legend({
      loca: loca,
      title: {
        label: '人均GDP',
        fontColor: 'rgba(255,255,255,0.4)',
        fontSize: '16px',
      },
      style: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        left: '20px',
        bottom: '40px',
        fontSize: '12px',
      },
      dataMap: [
        { label: '> 8万', color: colors[7] },
        { label: '< 7万', color: colors[6] },
        { label: '< 6万', color: colors[5] },
        { label: '< 5万', color: colors[4] },
        { label: '< 4万', color: colors[3] },
        { label: '< 3万', color: colors[2] },
        { label: '< 2万', color: colors[1] },
        { label: '< 1万', color: colors[0] },
      ],
    });

    var dat = new Loca.Dat();
    dat.addLayer(pl, 'GDP');

    // 动画
    map.on('complete', function () {
      pl.addAnimate({
        key: 'radius',
        value: [0, 1],
        duration: 2000,
        easing: 'ElasticOut',
        // yoyo: false,
        // repeat: 1,
      });
      pl.show(600);
    });

    map.on('mousemove', (e) => {
      const feat = pl.queryFeature(e.pixel.toArray());

      if (feat) {
        pl.setStyle({
          unit: 'meter',
          radius: (index, f) => {
            var n = f.properties['人口'] * 100;
            if (f === feat) {
              return n + 30000;
            }
            return n;
          },
          color: (index, f) => {
            var n = Math.min(7, ~~(f.properties['人均GDP'] / 10000));
            return colors[n];
          },
          borderWidth: (index, f) => {
            return f === feat ? 20000 : 0;
          },
          blurWidth: -1,
        });
      }
    });
  }

  return (
    <div className="road-freight">
      <div className="top">
        <div className="left">
          <div className="title">
            <div className="text">公路旅客运输量</div>
          </div>
          <div className="bar-chart">
            <div className="chart-label">
              <Select
                placeholder='Please select'
                style={{ width: 154, float: "right" }}
                onChange={(value) => Message.info({ content: `You select ${value}.`, showIcon: true })}
              >
                {options.map((option, index) => (
                  <Option key={option} disabled={index === 3} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="content" id="allProvBarChart" ref={chart1}></div>
          </div>
        </div>
        <div className="right">
          <div className="map" id="allProvMapChart" style={{ width: "100%", height: "100%" }} ref={chart2}></div>
        </div>
        {/* 标题 */}
      </div>
      <div className="bottom">
        {/* 增速比率 - 环形图 */}
        <div className="circle-chart">
          <div className="chart-label">
            <Select
              placeholder='Please select'
              style={{ width: 154, float: "right" }}
              onChange={(value) => Message.info({ content: `You select ${value}.`, showIcon: true })}
            >
              {options.map((option, index) => (
                <Option key={option} disabled={index === 3} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </div>
          <div className="content" id="allProvBarChart" ref={chart3}></div>
        </div>
      </div>
    </div >
  )
}

export default Index;
