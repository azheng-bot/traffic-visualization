import react, { useState, useEffect, useRef } from "react";
import "./index.less";
import { getLaws } from "../../../api/knowLedgeModule";

// echarts
import * as echarts from 'echarts';
// import 'echarts-wordcloud';

function Index() {
  let ref1 = useRef()
  let ref2 = useRef()
  const [currentPage, setCurrentPage] = useState(-1)
  const totalPage = 6


  class chartModule {
    constructor() {
      this.data = {};
      this.chart = {};
      this.option = {};
      this.ref = {}
    }
    initChart() {
      this.chart = echarts.init(this.ref.current)
      this.chart.setOption(this.option)
    }
  }
  class chartModules {
    constructor() {
      this.modules = {}
    }
    initCharts() {
      for (let key in this.modules) {
        this.modules[key].initChart()
      }
    }
    clearCharts() {
      for (let key in this.modules) {
        this.modules[key].chart.clear()
      }

    }
  }

  // page2 碳排放比率
  let page2Modules = new chartModules()
  page2Modules.modules['carbonSource'] = new chartModule()
  page2Modules.modules['totalCarbon'] = new chartModule()
  // ref dom元素
  page2Modules.modules['carbonSource'].ref = ref1
  page2Modules.modules['totalCarbon'].ref = ref2
  // echarts option
  page2Modules.modules['carbonSource'].option = {
    color: ['#108ee9', '#399acf', '#45a5b4', '#46b199', '#41b987',],
    title: {
      text: '2020年全年碳排放来源构成',
      // subtext: '单位：%',
      left: 'center',
      textStyle: {
        fontFamily: 'font1',
        fontSize: 30
      }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '70%',
        top: 20,
        bottom: -30,
        label: {
          overflow: 'breakAll',
          fontSize: 18,
          fontFamily: 'font7',
          formatter: function (value) {
            return `${value.name} \n ${value.value}%`
          },
          textAlign: 'center'
        },
        data: [
          { value: 43, name: '能源发电与供热' },
          { value: 26, name: '交通运输' },
          { value: 17, name: '制造业与建筑业' },
          { value: 14, name: '其他' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  page2Modules.modules['totalCarbon'].option = {
    color: ['#108ee9', '#399acf', '#45a5b4', '#46b199', '#41b987',],
    title: {
      text: '2020年全球碳排放总量按地区构成',
      // subtext: '单位：%',
      left: 'center',
      textStyle: {
        fontFamily: 'font1',
        fontSize: 30
      }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '70%',
        top: 20,
        bottom: -30,
        label: {
          overflow: 'breakAll',
          fontSize: 18,
          fontFamily: 'font7',
          formatter: function (value) {
            return `${value.name} \n ${value.value}%`
          },
          textAlign: 'center'
        },
        data: [
          { value: 21.3, name: '亚太地区（除中国' },
          { value: 30.7, name: '中国' },
          { value: 16.6, name: '北美地区' },
          { value: 11.1, name: '欧洲' },
          { value: 20.3, name: '其他地区' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };


  // page3 世界行动
  const [worldTab, setWorldTab] = useState(-1)


  // page4 中国行动
  const [chinaTab, setChinaTab] = useState(-1)
  const [isLoadingCards, setIsLoadingCards] = useState(true)
  const [isShowingCards, setIsShowingCards] = useState(false)
  function showChinaCard(idx) {
    setChinaTab(idx)
    setTimeout(() => {
      setIsShowingCards(true);
    }, 0)
  }
  function closeChinaCard(e) {
    e.stopPropagation();
    setIsShowingCards(false);
    setTimeout(() => {
    setChinaTab(-1)
    },200)
  }

  // page5 未来
  const [futureTab, setFutureTab] = useState(-1)


  useEffect(() => {
    setCurrentPage(3)
  }, [])
  useEffect(() => {
    switch (currentPage) {
      case 1:
        // 重置饼状图，使其重新进行加载动画
        page2Modules.initCharts()
        page2Modules.clearCharts()
        setTimeout(() => {
          page2Modules.initCharts()
          // 设置默认高亮
          page2Modules.modules['carbonSource'].chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 1
          });
          page2Modules.modules['totalCarbon'].chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 1
          });
        }, 1000)
        break;

      case 3:
        setTimeout(() => {
          setIsLoadingCards(false)
        }, 3000)
        break;


      default:
        // 清除状态
        setIsLoadingCards(true)

        break
    }
  }, [currentPage])

  return (
    <div className="future-carbon">
      <div className={["prev-btn", currentPage == 0 ? 'disable' : ''].join(' ')} onClick={() => currentPage != 0 && setCurrentPage(currentPage - 1)}>
        <img src="/image/others/next.png" alt="" />
      </div>
      <div className={["next-btn", currentPage == totalPage - 1 ? 'disable' : ''].join(' ')} onClick={() => currentPage != totalPage - 1 && setCurrentPage(currentPage + 1)}>
        <img src="/image/others/next.png" alt="" />
      </div>

      {/* Page-1 概念*/}
      <div className={["page-1", currentPage == 0 ? 'active' : ''].join(' ')}>
        <div className="title">
          <div className="hero"><span className="importent">碳中和</span></div>
          <div className="subtitle">一场不得不走的 <br /> 人类自我解救之路</div>
        </div>
        <div className="center-image complete-center">
          <img src="/image/future/carbon/earth.png" alt=" " />
        </div>
        <div className="left-content">
          <div className="intro intro-1">
            <div className="intro-title">碳中和</div>
            <div className="intro-content">
              碳中和（carbon neutrality）是指国家、企业、产品、活动或个人在一定时间内直接或间接产生的二氧化碳或温室气体排放总量，通过植树造林、节能减排等形式，以抵消自身产生的二氧化碳或温室气体排放量，实现正负抵消，达到相对“零排放”。
            </div>
          </div>
          <div className="intro intro-2">
            <div className="intro-title">碳达峰</div>
            <div className="intro-content">
              碳达峰（peak carbon dioxide emissions）  就是指在某一个时点，二氧化碳的排放不再增长达到峰值，之后逐步回落。碳达峰是二氧化碳排放量由增转降的历史拐点，标志着碳排放与经济发展实现脱钩，达峰目标包括达峰年份和峰值。
            </div>
          </div>
        </div>
        <div className="right-content">
          <div className="intro intro-1">
            <div className="intro-title">为什么要碳中和？</div>
            <div className="intro-content">
              在谈论我们为什么要做碳中和这个话题前，首先我们要知道一个基本共识：联合国政府间气候变化专门委员会（IPCC）测算，若实现《巴黎协定》2℃控温目标，全球必须在2050年达到二氧化碳净零排放（又称“碳中和”），即每年二氧化碳排放量等于其通过植树等方式减排的抵消量；在2067年达到温室气体净零排放（又称“温室气体中和或气候中性”），即除二氧化碳外，甲烷等温室气体的排放量与抵消量平衡。
              2021年1月，世界气象组织宣布2020年全球平均气温约为14.9℃，较工业化前水平高出1.2℃，留给我们的温升空间已经不多了，如果温升超过2℃，地球和人类将面临不可逆的气候灾难，这就是我们需要碳中和的原因！
            </div>
          </div></div>
      </div>

      {/* Page-2 碳排放比率*/}
      <div className={["page-2", currentPage == 1 ? 'active' : ''].join(' ')}>
        <div className="wrapper">
          <div className="col-1">
            <div className="chart" ref={ref1}></div>
            <div className="intro">
              <div className="intro-title">能源发电是碳排放主要来源
              </div>
              <div className="intro-content">
                地球上的碳一直在参与碳循环过程，在这个过程中，人类活动的影响至关重要，燃烧化石能源会加大向大气中释放CO2，而毁林开荒等行为则会减弱碳汇过程，从而造成平衡的破坏，导致大气中的CO2浓度过高，气温升高。据国际能源署(IEA)统计数据显示，2020年，全球碳排放主要来自能源发电与供热、交通运输、制造业与建筑业三个领域，分别占比43%、26%、17%。
                <span className="importent">
                  交通运输是除能源发电以外的占比最大的碳排放来源。
                </span>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="intro">
              <div className="intro-title">亚太地区碳排放占比过半</div>
              <div className="intro-content">
                从各地区排放情况来看，目前，亚太地区碳排放量在全球占比较大。据英国石油公司(BP)发布的《世界能源统计年鉴(第70版)》统计数据显示，2020年，亚太地区碳排放量占全球总排放量的一半以上，合计占比达52%，<span className="importent">其中中国占比30.7%，远超其他地区</span>;北美地区碳排放量占比为16.6%;欧洲地区碳排放量占比为11.1%。

              </div>
            </div>
            <div className="chart" ref={ref2}></div>
          </div>
        </div>
      </div>

      {/* Page-3 世界行动*/}
      <div className={["page-3", currentPage == 2 ? 'active' : '', worldTab == -1 ? '' : 'show-intro'].join(' ')}>
        <div className="title">交通碳中和的<span className="importent">国际行动</span></div>
        <div className="tabs">
          <div className={["tab-item", worldTab == 0 ? 'active' : ''].join(' ')} style={{ backgroundImage: 'url(/image/future/carbon/uk.png)' }} onClick={() => { setWorldTab(0) }}></div>
          <div className={["tab-item", worldTab == 1 ? 'active' : ''].join(' ')} style={{ backgroundImage: 'url(/image/future/carbon/europe.jpeg)' }} onClick={() => { setWorldTab(1) }}></div>
          <div className={["tab-item", worldTab == 2 ? 'active' : ''].join(' ')} style={{ backgroundImage: 'url(/image/future/carbon/japan.png)' }} onClick={() => { setWorldTab(2) }}></div>
          <div className={["tab-item", worldTab == 3 ? 'active' : ''].join(' ')} style={{ backgroundImage: 'url(/image/future/carbon/earth1.png)' }} onClick={() => { setWorldTab(3) }}></div>
        </div>
        <div className="intros">
          <div className={["intro-item", worldTab == 0 ? 'active' : ''].join(' ')}>
            <span className="importent">英国交通部今年发布了《交通脱碳：更好、更绿色的英国》</span> ，明确 2050 年实现本国交通领域碳中和的愿景、行动和时间表，这也是全球首个专门针对交通领域的碳中和路线图。在英国的规划中，共享交通、零排放载具和MaaS（(Mobility as a Service， MaaS，出行即服务）是实现脱碳的关键点。
          </div>
          <div className={["intro-item", worldTab == 1 ? 'active' : ''].join(' ')}>
            欧盟则计划利用数字技术建立统一票务系统或者部署交通系统，例如将<span className="importent">注入近 22 亿欧元大力投资 140 个关键运输项目</span>，欧洲也正共建全球首个货运无人机网络和机场以降低碳排放量、节省运输时间和成本。
          </div>
          <div className={["intro-item", worldTab == 2 ? 'active' : ''].join(' ')}>
            日本也明确提出了“脱碳”时间表，预计在 2050 年实现“碳中和”，并将智慧交通作为经济增长的重要路径，利用数字通信、人工智能、自动化、大数据等技术推动城市交通结构优化。
          </div>
          <div className={["intro-item", worldTab == 3 ? 'active' : ''].join(' ')}>
            无论是英国、欧盟还是日本等其他各国，在城市交通运营方面的减碳措施主要呈现两大趋势：一是聚焦于提高绿色出行品质，在出行空间、路权配置等方面给予公共交通更高的优先权；二是依托MaaS促进绿色出行全链条服务体验的提升，依托科技创新不断优化城市交通结构与模式。<span className="importent">碳中和这一全球性任务，正在世界范围内火热展开，除了需要国家力量外，还需要社会、企业和个人等力量的参与。</span>
          </div>
        </div>
      </div>

      {/* Page-4 中国行动&政策*/}
      <div className={["page-4", currentPage == 3 ? 'active' : '', isLoadingCards ? 'loading-cards' : '', chinaTab == -1 ? '' : 'show-card'].join(' ')}>
        <div className="title">
          <div className="hero">
            <span className="importent">中国</span>针对于交通的碳中和政策

          </div>
          <div className="legend">
            交通部门主要减排措施可归结为 <span className="importent">交通运输结构优化、替代燃料技术发展、颠覆性技术</span>和<span className="importent">交通工具高效化</span>四大类。
          </div>
        </div>
        <div className="card-list">
          <div className={["card", chinaTab == 0 ? 'up-card' : '', (chinaTab == 0 && isShowingCards) ? 'unfold-card' : ''].join(' ')} onClick={() => { showChinaCard(0) }}>
            <div className="card-wrapper">
              <div className="card-title">交通运输结构优化</div>
              <div className="card-content"></div>
              <div className="card-close" onClick={(e) => closeChinaCard(e)}>+</div>
            </div>
          </div>
          <div className={["card", chinaTab == 1 ? 'up-card' : '', (chinaTab == 1 && isShowingCards) ? 'unfold-card' : ''].join(' ')} onClick={() => { showChinaCard(1) }}>
            <div className="card-wrapper">
              <div className="card-title">替代燃料技术发展</div>
              <div className="card-content"></div>
              <div className="card-close" onClick={(e) => closeChinaCard(e)}>+</div>
            </div>
          </div>
          <div className={["card", chinaTab == 2 ? 'up-card' : '', (chinaTab == 2 && isShowingCards) ? 'unfold-card' : ''].join(' ')} onClick={() => { showChinaCard(2) }}>
            <div className="card-wrapper">
              <div className="card-title">颠覆性技术和新兴行为模式</div>
              <div className="card-content"></div>
              <div className="card-close" onClick={(e) => closeChinaCard(e)}>+</div>
            </div>
          </div>
          <div className={["card", chinaTab == 3 ? 'up-card' : '', (chinaTab == 3 && isShowingCards) ? 'unfold-card' : ''].join(' ')} onClick={() => { showChinaCard(3) }}>
            <div className="card-wrapper">
              <div className="card-title">交通工具能效提升</div>
              <div className="card-content"></div>
              <div className="card-close" onClick={(e) => closeChinaCard(e)}>+</div>
            </div>
          </div>
        </div>
      </div>

      {/* Page-5 未来*/}
      <div className={["page-5", currentPage == 4 ? 'active' : ''].join(' ')}>
      </div>
    </div>
  )
}

export default Index;
