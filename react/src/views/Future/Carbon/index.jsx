import react, { useState, useEffect, useRef } from "react";
import "./index.less";
import { getLaws } from "../../../api/knowLedgeModule";

// echarts
import * as echarts from 'echarts';
// import 'echarts-wordcloud';

function Index() {
  const [currentPage, setCurrentPage] = useState(0)
  useEffect(() => {


  }, [])

  return (
    <div className="future-carbon">
      <div className={["prev-btn", currentPage == 0 ? 'disable' : ''].join(' ')} onClick={() => currentPage != 0 && setCurrentPage(currentPage - 1)}>
        <img src="/image/others/next.png" alt="" />
      </div>
      <div className={["next-btn", currentPage == 2 ? 'disable' : ''].join(' ')} onClick={() => currentPage != 2 && setCurrentPage(currentPage + 1)}>
        <img src="/image/others/next.png" alt="" />
      </div>

      {/* Page-1 */}
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
            <div className="intro-title">碳中和</div>
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

      {/* Page-2 */}
      <div className={["page-2", currentPage == 1 ? 'active' : ''].join(' ')}>
        <div className="title">My Page 2</div>
      </div>

      {/* Page-3 */}
      <div className={["page-3", currentPage == 2 ? 'active' : ''].join(' ')}>
        <div className="title">My Page 3</div>
      </div>
    </div>
  )
}

export default Index;
