import { useEffect, useState, useRef } from "react";
import "./index.less";
// swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const Option = Select.Option;
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];
const RadioGroup = Radio.Group;
// arco design
import { Select, Message, Space, Radio } from '@arco-design/web-react';
// echarts
import * as echarts from 'echarts/core';
import { LegendComponent, GridComponent, ToolboxComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { LineChart, BarChart, ScatterChart, EffectScatterChart, PieChart } from 'echarts/charts';
import { UniversalTransition, LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

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
  LabelLayout
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
    allProvBarChart.dom = chart1.current
    allProvMapChart.dom = chart2.current
    eachProvCircleChart.dom = chart3.current


    // 地图
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
          ]
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
    allProvMapChart.chart = echarts.init(allProvMapChart.dom)
    allProvMapChart.chart.setOption(allProvMapChart.option)


    // 柱状图
    allProvMapChart.option = {}
    allProvBarChart.chart = echarts.init(allProvBarChart.dom)
    allProvBarChart.chart.setOption(allProvBarChart.option)


    // 环形图
    eachProvCircleChart.option = {
      color: ['green', 'red', 'rgb(255 255 255 / 22.5%)'],
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
        left: parseFloat((i / 12 + 1 / 24).toFixed(5) * 100) + '%',
        top: '75%',
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
        radius: ['30%', '50%'],
        center: ['50%', '45%'],
        data: data,
        label: {
          show: false
        },
        left: parseFloat((i / 12 + 1 / 30) * 200 - 100).toFixed(5) + '%',
        top: 0,
        bottom: 0
      })
    }
    console.log('eachProvCircleChart.option', eachProvCircleChart.option)
    eachProvCircleChart.chart = echarts.init(eachProvCircleChart.dom)
    eachProvCircleChart.chart.setOption(eachProvCircleChart.option)
  }, [])


  return (
    <div className="road-passenger">
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
