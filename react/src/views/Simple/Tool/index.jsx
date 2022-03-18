import React, { useEffect, useState } from "react";
import { getTools } from "../../../api/knowLedgeModule";
import "./index.less";
import * as echarts from "echarts/core";
import { TooltipComponent } from "echarts/components";
import { TreeChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import Loading from "../../../components/Loading";
echarts.use([TooltipComponent, TreeChart, CanvasRenderer]);

function Index() {
  // 基础数据
  const [tabIdx, setTabIdx] = useState(0);
  const [zoneCate, setZoneCate] = useState({});
  const [energyCate, setEnergyCate] = useState({});
  const [tools, setTools] = useState({});
  // 控制Loading显示
  const [toolFlag, setToolFlag] = useState(true);
  // Echarts数据
  var myChart;
  var option;
  const [rich, setRich] = useState({});

  function createEcharts(data) {
    myChart = echarts.init(window.document.getElementById("echarts"));
    myChart.setOption(
      (option = {
        series: [
          {
            data: [data],
          },
        ],
      })
    );
  }

  useEffect(() => {
    // 初始化echarts

    // 获取数据
    getTools().then((res) => {
      setToolFlag(false);
      // 设置数据
      setZoneCate(res.categaries[0]);
      setEnergyCate(res.categaries[1]);
      setTools(res.tools);

      // 设置echarts
      myChart = echarts.init(window.document.getElementById("echarts"));
      // echarts富文本样式
      let rich = {
        name: {},
      };
      res.tools.forEach((item) => {
        rich[item.tool_id] = {
          backgroundColor: {
            image: "/image/tools/" + item.tool_name + ".png",
          },
          width: 25,
          height: 25,
        };
      });
      myChart.setOption(
        (option = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove",
          },
          series: [
            {
              type: "tree",
              data: [res.categaries[0]],
              top: "1%",
              left: "0.5%",
              bottom: "1%",
              right: "20%",
              symbol: "circle",
              symbolSize: 7,
              label: {
                position: "left",
                verticalAlign: "middle",
                align: "right",
                fontSize: 18,
              },
              leaves: {
                label: {
                  position: "right",
                  verticalAlign: "middle",
                  align: "left",
                  fontSize: 20,
                  // 在文本中，可以对部分文本采用 rich 中定义样式。
                  // 这里需要在文本中使用标记符号：
                  // `{styleName|text content text content}` 标记样式名。
                  // 注意，换行仍是使用 '\n'。
                  formatter: function (value) {
                    return `{${value.data.tool_id}|}  {name|${value.data.tool_name}}`;
                  },
                  rich,
                },
              },
              emphasis: {
                focus: "descendant",
              },
              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750,
            },
          ],
          axisPointer: [
            {
              z: 50,
              x: 40,
              y: 30,
            },
          ],
          textStyle: {
            fontSize: 16,
          },
        })
      );
      // 给echarts添加数据
      // createEcharts(res.categaries[0])
    });
  }, []);

  useEffect(() => {
    if (tabIdx == 0) {
      createEcharts(zoneCate);
    } else if (tabIdx == 1) {
      createEcharts(energyCate);
    }
  }, [tabIdx]);

  return (
    <div className="traffic-tool">
      <Loading isLoading={toolFlag} />
      <div className="wrapper">
        <div className="aside">
          <ul
            className="complete-center"
            style={{ marginTop: 64 - tabIdx * 60 + "px" }}
          >
            <li
              className={tabIdx == 0 ? "active" : ""}
              onClick={() => setTabIdx(0)}
            >
              行驶区域划分
            </li>
            <li
              className={tabIdx == 1 ? "active" : ""}
              onClick={() => setTabIdx(1)}
            >
              动力方式划分
            </li>
            <li
              className={tabIdx == 2 ? "active" : ""}
              onClick={() => setTabIdx(2)}
            >
              交通工具选择
            </li>
            {/* <li className={tabIdx == 3 ? 'active' : ''} onClick={() => setTabIdx(3)}>全部交通工具</li> */}
          </ul>
        </div>
        <div className="content">
          <div className={tabIdx == 2 ? "tool-choose active" : "tool-choose"}>
            <h1 className="h1"> 交通方式选择</h1>
            <p className="content1">
              在城市交通规划中,将人们的步行、自行车都作为一种交通方式分析，因此人们的日常工作、学习和生活的出行,可以认为是交通方式的组合。人们的日常工作和上学等的出行日常性地反复，对各人会形成到达目的地的详细信息，从而形成各人的交通方式划分理论。对这种日常性、定型的出行方式，交通方式划分容易确定。然而，问题是人们并非一成不变地利用同一种出行方式，经常因为一些原因改变其交通工具利用情况。例如，平时利用公共汽车的人们，因为行李、天气、身体等原因改用出租车等。
            </p>
            <p className="content1">
              到外地出差，由于不熟悉当地的公交线路或不了解业务单位的具体地质，常利用出租车。诸如此类的出行方式为非定型性出行方式。因为没有掌握交通信息而多利用出租车，如果事先有这方面的信息，可能会利用公交车。另外，人们的交通方式选择还与出行的时间相关，过早或过晚的出行，由于公交车不便等原因，多利用出租车。因此，
              <span className="red">
                {" "}
                影响交通方式划分的原因有多种，主要有交通特性、个人属性、家庭属性、地区属性和时间属性等。
              </span>
            </p>

            <h2 className="h2"> 交通特性</h2>
            <p className="content2">
              {" "}
              交通特性的影响主要是在一次出行的固有特性中，对交通方式选择影响的部分有：
            </p>

            <h3 className="h3">
              <span className="number">1</span>运行时间和出行距离
            </h3>
            <p className="content3">
              时间是影响交通方式选择的最普通的因素之一。在出发地到达目的地之间有几种交通方式时，各自的运行时间影响乘客的选择。对具有混合交通方式时，应该采用所利用交通方式运行时间的叠加值。根据美国伊利诺工业大学研究所的研究成果，考虑在家用轿车和铁路之间的方式选择时，分别以20%和25%的比例以时间为主要因素选择。考虑家用轿车和公共汽车之间的选择时，把时间作为公共汽车选择因素的仅有2%，而家用轿车则为44%。另外，男性(36%)较女性(25%)选择时间因素的较多。随着出行距离的增加，人们的出行按照步行、自行车、轻骑、公共汽车、轿车、铁路、飞机的顺序增加。
            </p>

            <h3 className="h3">
              <span className="number">2</span>费用
            </h3>
            <p className="content3">
              交通费用与运行时间相同，也是影响交通方式选择的主要因素之一。一般而言，要减少运行时间，必须付出更高的交通费用。因此，交通费用的大小是交通方式选择的主要因素，常与运行时间配对使用而很少作为单独的原因使用，根据美国伊利诺工业大学研究所的研究成果，公共交通方式的乘客中，42%的人将交通费用作为选择的主要因素，而家用轿车的利用者中，仅有不足1%。另外，交通费用作为主要原因考虑的没有因为年龄的不同而发生显著的变化。
            </p>

            <h3 className="h3">
              <span className="number">3</span>舒适性
            </h3>
            <p className="content3">
              交通方式选择的舒适性,是交通工具中的车座率、舒服、车中的疲劳、车内拥挤程度、有无空调等因素的综合概念。正因为如此，舒适性的评价尺度将难于制定，尤其是根据舒适性的交通方式选择，受用户个人的感受的影响很大，要预测将来的舒适性是非常困难的。根据美国伊利诺工业大学研究所的研究成果，舒适性作为交通方式选择的主要原因，在家用轿车的用户中多被认为，约占25%。在公共交通方式的乘客中，利用铁路上班者占13%、利用公共汽车上班者约占1%。被屡次公共交通方式的乘客中，42%的人将交通费用作为选择的主要因素，而家用轿车的利用者中，仅有不足1%。舒适性作为主要原因考虑的没有因为年龄的不同而发生显著的变化。然而，女性比男性将舒适性作为主要因素的比例高，分别为29%和19%。另外，随着收入水平的提高，对舒适性的要求增高。
            </p>

            <h3 className="h3">
              <span className="number">4</span>安全性
            </h3>
            <p className="content3">
              不言而喻，安全性是交通方式选择的主要原因之一。可以想象，无论多么好的交通工具，如果它的安全性差，乘客的人生安全得不到保障，不会有人利用它。然而，因为交通事故本身既有突发性，因此人们在选择交通工具时，明确地考虑安全性的比较少。但是，可以想象摩托等二轮交通工具，因为其稳定性差，将严重影响其安全性指标。在交通方式划分作业中，还没有考虑安全性指标。
            </p>

            <h3 className="h3">
              <span className="number">5</span>准时性
            </h3>
            <p className="content3">
              在交通方式选择时,到达的准确性，对于不允许迟到出行的交通方式选择的影响很大。人们上班对准时性要求高，选择不受交通阻塞影响的交通方式比例高。在日本，人们选择住宅都愿意选择在地铁或城市铁路沿线，目的就在于考虑了它们的准时性高。
            </p>

            <h3 className="h3">
              <span className="number">6</span>换乘次数和候车时间
            </h3>
            <p className="content3">
              换乘次数增加同时会肇致换乘时间增加，与等待时间相同，导致抵达目的地的时间增加，从而影响交通方式选择。同时，换乘次数和候车时间的增加还会带来身体的疲劳。
            </p>

            <h2 className="h2">个人属性</h2>
            <p className="content2">
              人是交通方式选择的主体，因此交通方式的选择理所当然因个人属性不同而异。个人属性包括职业、年龄、性别、收入、驾照持有与否、汽车保有量等。
            </p>

            <h3 className="h3">
              <span className="number">1</span>职业、性别、年龄
            </h3>
            <p className="content3">
              人们的职业是多种多样的，可以想象因职业的不同，对交通方式划分产生敏感的影响。一般而言，业务员、推销员的汽车使用率高。女性较男性的公共交通方式的利用率高。20－40岁的人汽车利用率高，其它年龄段公共汽车利用率高，并且男性比女性的汽车利用率高，收入高的人汽车利用率高。然而，西方工业国的经验表明，随着汽车化的发展，各种职业的人们购买家庭轿车的比例趋于平均化，职业对交通方式选择的影响逐渐减弱。
            </p>
            <h3 className="h3">
              <span className="number">2</span>家庭属性
            </h3>
            <p className="content3">
              出行者都是来自各自的家庭，因此应该受着家庭的行动约束。于是，人们会自然想到，以个人为基础的规划，不如以家庭为基础的规划更加稳固。家庭属性主要包括家庭支出额的多少，家用轿车的保有，家庭构成，家族数、驾驶人员数，居住结构形式等。
            </p>
            <h3 className="h3">
              <span className="number">3</span>收入
            </h3>
            <p className="content3">
              个人收入越高，汽车保有率越高，公共交通方式的利用率越低。然而，过分高的收入阶层，因为高龄者居多，汽车的保有率反而降低。
            </p>

            <h2 className="h2">地区特性</h2>
            <p className="content2">
              地区特性与交通方式选择有着较强的关系，地区特性指标主要包括居住人口密度，人口规模，交通设施水平，地形，气候，停车场和停车费用等。地区内人口密度高，公共交通利用率相对就高。
            </p>
            <p className="content2">
              城市规模大，交通设施水平就高，公共汽车利用率变高。山川、河流多，汽车、公共汽车利用率就高。雨天、雪天的公共交通方式利用率高。
            </p>

            <h2 className="h2">出行特性</h2>
            <h3 className="h3">
              <span className="number">1</span>出行时间
            </h3>
            <p className="content3">
              人们的活动，是以一天为一个周期，因此在某一时刻，人们具有类似交通目的的出行集中的倾向。相同性质的出行集中的时间段有：早高峰上班时间段、平时时间段、晚高峰回家时间段。在进行交通规划时，应该根据规划的性质选择合适的时间段。例如，进行交通管理规划时，应选择早晚高峰时间段。因为因时间段的不同道路的交通阻塞和交通目的也比较集中，当然也应该分析因时间段不同交通方式选择的变化。另外，因平日和公休日的交通目的差异很大，因此交通方式选择特性也就不同。
            </p>
            <h3 className="h3">
              <span className="number">2</span>出行目的
            </h3>
            <p className="content3">
              出行目的不同对交通方式选择的影响变化较大的原因，是因出行目的的不同，对交通方式的服务质量要求不同（例如，上班出行时间最重要，旅游时舒适性最重要），同伴的有无，经济情况，出行距离等。一般而言，上班、上学出行的汽车利用率低、公共交通方式高；
              业务出行因需要在多客户处停留，装卸货物等，所以汽车利用率高、公共交通方式低；自由出行的汽车(出租)利用率高。步行率也因出行目的不同而异。购物等短距离的出行的步行率高，上班的步行率低。
            </p>
          </div>
          <div
            id="echarts"
            className={
              tabIdx == 0 || tabIdx == 1 ? "echarts active" : "echarts"
            }
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Index;
