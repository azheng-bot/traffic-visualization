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
  const totalPage = 5


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
    }, 200)
  }
  function closeChinaCard(e) {
    e.stopPropagation();
    setIsShowingCards(false);
    setTimeout(() => {
      setChinaTab(-1)
    }, 500)
  }

  // page5 未来
  const [futureTab, setFutureTab] = useState(0)
  const [futureTitleTime, setFutureTitleTime] = useState(2019)
  useEffect(() => {
    let currentTime = futureTitleTime;
    let targetTime = 2025 + futureTab * 5
    let step = targetTime > futureTitleTime ? 1 : -1
    let timer = setInterval(() => {
      if (currentTime != targetTime) {
        // console.log('futureTitleTime', futureTitleTime)
        currentTime += step
        setFutureTitleTime(currentTime)
      } else {
        clearInterval(timer)
        timer = null
      }
    }, 150)
  }, [futureTab])


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
          <div className="subtitle">一场不得不走的人类自我解救之路</div>
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
              <div className="card-content">
                <div className="left-content">

                  从交通运输结构来看，客运运输结构倾向于从道路运输向更加高效的铁路运输转型。
                  <br />
                  全面推进客运和货运结构调整能够有效减少交通部门碳排放。各种运输方式完成单位运输量所消耗的能源以及产生的碳排放有较大不同，据测算，道路货运单耗约是铁路的<span className="importent">4～5倍</span>。特别是随着铁路电气化改造的推进，铁路节能技术和管理水平不断提升，铁路运输低碳化发展成效明显。交通运输结构优化将显著减少碳排放。1985-2009年间，铁路客运等低能耗方式活动水平逐渐向道路和民航转移，导致CO2排放增加了<span className="importent bad">3.7亿t</span>，约合2009年交通部门碳排放的<span className="importent bad">45.3%</span>。当道路运输在城间客运的占比从<span className="importent">34%</span>下降至<span className="importent">26%</span>、铁路在货运周转量的占比从<span className="importent">10%</span>增长到<span className="importent">18%</span>后，直接碳排放将下降<span className="importent">4亿～5亿t</span>。

                </div>
                <div className="right-content">
                  <div className="row row-1 compare">
                    <div className="compare-title">运单<span style={{ color: '#f66' }}>耗损</span></div>
                    <div className="compare-imgs">
                      <div className="left-imgs">
                        <img src="/image/future/carbon/train.png" alt="" className="train"></img>
                        <img src="/image/future/carbon/train.png" alt="" className="train"></img>
                        <img src="/image/future/carbon/train.png" alt="" className="train"></img>
                        <img src="/image/future/carbon/train.png" alt="" className="train"></img>
                      </div>
                      <div className="compare-sign">≈</div>
                      <div className="right-imgs">
                        <img src="/image/future/carbon/truck.png" alt="" className="truck" />
                      </div>
                    </div>
                    <div className="compare-intro">道路货运单耗约是铁路的 <span className="importent">4～5倍</span> , 道路货运耗损严重 </div>
                  </div>
                  <div className="row row-1">
                    <div className="time">
                      <div className="time-1">1985</div>
                      <div className="bar">/</div>
                      <div className="time-2">2009</div>
                    </div>
                  </div>
                  <div className="row row-1"></div>
                </div>
              </div>
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
        <div className="title">
          交通碳中和 <span className="importent">{futureTitleTime}</span>
        </div>
        <div className="time-line">
          <div className="times" style={{ left: 50 - futureTab * 50 + '%', marginLeft: (futureTab - 1) * 150 + 'px' }}>
            <div className={["time time-1", futureTab == 0 ? 'active' : ''].join(' ')} onClick={() => setFutureTab(0)}>2025</div>
            <div className={["time time-2", futureTab == 1 ? 'active' : ''].join(' ')} onClick={() => setFutureTab(1)}>2030</div>
            <div className={["time time-3", futureTab == 2 ? 'active' : ''].join(' ')} onClick={() => setFutureTab(2)}>2035</div>
          </div>
          <div className="line"></div>
        </div>
        <div className="content-container" style={{ left: -futureTab * 100 + '%' }}>
          <div className={["content content-1 rows", futureTab == 0 ? 'active' : ''].join(' ')}>
            {/* list-1 */}
            <div className="row row-1 cols list list-1" style={{ marginBottom: '180px' }}>
              <div className="list-item">
                <span className="importent">20%</span> 电动乘用车平均调峰电量占车辆出行用电
              </div>
              <div className="list-item">
                <span className="importent">3000万</span> 辆新能源汽车保有量
              </div>
              <div className="list-item">
                <span className="importent">100%</span> 新建智能充电桩占比
              </div>
              <div className="list-item">
                <span className="importent">30%</span> 新能源汽车渗透率
              </div>
            </div>
            {/* list-2 */}
            <div className="row row-1 cols list list-2" >
              <div className="list-item">
                <span className="importent">解决</span> 转供电交叉补贴
              </div>
              <div className="list-item">
                <span className="importent">明确</span> vGl适应的电力服务品种
              </div>
              <div className="list-item">
                2025年新售车辆 <span className="importent">全面</span> 具备智能有序充电功能
              </div>
              <div className="list-item">
                <span className="importent">推进</span> 分布式发电就近交易,减免过网费、基金、附加
              </div>
              <div className="list-item">
                <span className="importent">采用</span> 高精度双向计量智能电表和开放通信控制标准
              </div>
              <div className="list-item">
                <span className="importent">实现</span> 城市共享出行汽车在专用车道和限定区域的CA级智能化
              </div>
            </div>
          </div>
          <div className={["content content-2 rows", futureTab == 1 ? 'active' : ''].join(' ')}>
            {/* list-1 */}
            <div className="row row-1 cols list list-1" style={{ marginBottom: '180px' }}>
              <div className="list-item">
                <span className="importent">20%</span> 电动乘用车平均调峰电量占车辆出行用电
              </div>
              <div className="list-item">
                <span className="importent">3000万</span> 辆新能源汽车保有量
              </div>
              <div className="list-item">
                <span className="importent">100%</span> 新建智能充电桩占比
              </div>
              <div className="list-item">
                <span className="importent">30%</span> 新能源汽车渗透率
              </div>
            </div>
            {/* list-2 */}
            <div className="row row-1 cols list list-2" >
              <div className="list-item">
                解决转供电交叉补贴
              </div>
              <div className="list-item">
                明确vGl适应的电力服务品种
              </div>
              <div className="list-item">
                2025年新售车辆全面具备智能有序充电功能
              </div>
              <div className="list-item">
                推进分布式发电就近交易,减免过网费、基金、附加
              </div>
              <div className="list-item">
                采用高精度双向计量智能电表和开放通信控制标准
              </div>
              <div className="list-item">
                实现城市共享出行汽车在专用车道和限定区域的CA级智能化
              </div>
            </div>
          </div>
          <div className={["content content-3 rows", futureTab == 2 ? 'active' : ''].join(' ')} style={{ paddingBottom: '8%' }}>
            <div className="row row-1 cols box-container" style={{ marginBottom: '120px' }}>
              {/* box-1 */}
              <div className="col cols box">
                <div className="col col-1 box-title">
                  <span className="complete-center">
                    汽车333
                  </span>
                </div>
                <div className="col col-8 rows">
                  <div className="row row-1  cols intro">
                    <div className="col col-1 intro-title">渗透情况</div>
                    <div className="col col-8 intro-content">2025年新能源汽车渗透率约 <span className="importent">30%</span> 保有量约 <span className="importent">3000万辆</span></div>
                  </div>
                  <div className="row row-1 cols intro">
                    <div className="col col-1 intro-title">车网协同</div>
                    <div className="col col-8 intro-content">2025年新手车辆全面具备智能有序充电功能</div>
                  </div>
                  <div className="row row-1 cols intro">
                    <div className="col col-1 intro-title">互动<br />能量</div>
                    <div className="col col-8 intro-content">2025年电动乘用车平均调峰电量占车辆出行用电 <span className="importent">20%</span></div>
                  </div>
                </div>
              </div>
              {/* box-2 */}
              <div className="col cols box">
                <div className="col col-1 box-title">
                  <span className="complete-center">
                    能源
                  </span>
                </div>
                <div className="col col-8 rows">
                  <div className="row row-1  cols intro">
                    <div className="col col-1 intro-title">能源结构</div>
                    <div className="col col-8 intro-content">2025年非化石能源比例达 <span className="importent">20%</span></div>
                  </div>
                  <div className="row row-1 cols intro">
                    <div className="col col-1 intro-title">电价机制</div>
                    <div className="col col-8 intro-content">解决转供电较差补贴</div>
                  </div>
                  <div className="row row-1 cols intro">
                    <div className="col col-1 intro-title">电力市场</div>
                    <div className="col col-8 intro-content">2025年电动乘用车平均调峰电量占车辆出行用电 <span className="importent">20%</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row row-1 cols box-container">
              {/* box-3 */}
              <div className="col cols box">
                <div className="col col-1 box-title">
                  <span className="complete-center">
                    汽车
                  </span>
                </div>
                <div className="col col-8 rows">
                  <div className="row row-1  cols intro">
                    <div className="col col-1 intro-title">渗透情况</div>
                    <div className="col col-8 intro-content">2025年新能源汽车渗透率约 <span className="importent">30%</span> 保有量约 <span className="importent">3000万辆</span></div>
                  </div>
                  <div className="row row-1 cols intro">
                    <div className="col col-1 intro-title">车网协同</div>
                    <div className="col col-8 intro-content">2025年新手车辆全面具备智能有序充电功能</div>
                  </div>
                  <div className="row row-1 cols intro">
                    <div className="col col-1 intro-title">互动<br />能量</div>
                    <div className="col col-8 intro-content">2025年电动乘用车平均调峰电量占车辆出行用电 <span className="importent">20%</span></div>
                  </div>
                </div>
              </div>
              {/* box-4 */}
              <div className="col cols box">
                <div className="col col-1 box-title">
                  <span className="complete-center">
                    汽车
                  </span>
                </div>
                <div className="col col-8 rows">
                  <div className="row row-1  cols intro">
                    <div className="col col-1 intro-title">渗透情况</div>
                    <div className="col col-8 intro-content">2025年新能源汽车渗透率约 <span className="importent">30%</span> 保有量约 <span className="importent">3000万辆</span></div>
                  </div>
                  <div className="row row-1 cols intro">
                    <div className="col col-1 intro-title">车网协同</div>
                    <div className="col col-8 intro-content">2025年新手车辆全面具备智能有序充电功能</div>
                  </div>
                  <div className="row row-1 cols intro">
                    <div className="col col-1 intro-title">互动<br />能量</div>
                    <div className="col col-8 intro-content">2025年电动乘用车平均调峰电量占车辆出行用电 <span className="importent">20%</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index;
