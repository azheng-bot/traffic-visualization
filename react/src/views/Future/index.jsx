import React, { useState } from 'react'
import { useLocation, Outlet, useNavigate } from 'react-router-dom'
import "./index.less"
// 引入小车
import Car from "../../components/Car/index"
// 引入交通地线
import LeftArrow from "../../components/arrows/LeftArrow"
import ForwardArrow from "../../components/arrows/ForwardArrow"
import RightArrow from "../../components/arrows/RightArrow"
import DoubleYellow from "../../components/lines/DoubleYellow"
import SingleWhite from "../../components/lines/SingleWhite"
import ZebraCrossing from "../../components/lines/ZebraCrossing"
import DottedLine from "../../components/lines/DottedLine"
// 引入子模块进入点
import SubmoduleEntry from "../../components/SubmoduleEntry"
// 引入路标
import RoadSign from "../../components/RoadSign"

function index(props) {
  // 左边景观的图片与样式
  const leftSceneries = [];
  (function createLeftSceneries() {
    // 添加灌木丛样式
    let bushNum = 24, initBushLeft = -594, initBushTop = 726, initBushZIndex = 100 + bushNum;
    for (var i = 0; i <= bushNum; i++) {
      // 中间少两个灌木，去添加特殊景观
      if (i == 11) {
        initBushLeft += 75 * 2
        initBushTop -= 42 * 2
      }
      leftSceneries.push({
        src: "/image/tree/bush-1.png",
        left: initBushLeft += 75,
        top: initBushTop -= 42,
        zIndex: initBushZIndex--
      })
    }

    // 添加不规则小树样式
    let treeNum = 25, initTreeLeft = -700, initTreeTop = 670;
    for (var i = 0; i <= treeNum; i++) {
      leftSceneries.push({
        src: "/image/tree/tree-1.png",
        width: 76,
        left: initTreeLeft += 80,
        top: initTreeTop -= 45,
        zIndex: 50
      })
    }

    // 添加大型树木1
    let bigTree1Num = 18, initBigTree1Left = -800, initBigTree1Top = 450;
    for (var i = 0; i <= bigTree1Num; i++) {
      leftSceneries.push({
        src: "/image/tree/bigtree-1.png",
        left: initBigTree1Left += 112,
        top: initBigTree1Top -= 63,
        zIndex: 45
      })
    }

    // 添加大型树木2
    let bigTree2Num = 25, initBigTree2Left = -950, initBigTree2Top = 400;
    for (var i = 0; i <= bigTree2Num; i++) {
      leftSceneries.push({
        src: "/image/tree/bigtree-1.png",
        left: initBigTree2Left += 80,
        top: initBigTree2Top -= 45,
        zIndex: 40
      })
    }

    // 添加大型树木3
    let bigTree3Num = 16, initBigTree3Left = -1050, initBigTree3Top = 350;
    for (var i = 0; i <= bigTree3Num; i++) {
      leftSceneries.push({
        src: "/image/tree/bigtree-4.png",
        left: initBigTree3Left += 128,
        top: initBigTree3Top -= 72,
        zIndex: 35
      })
    }
    // 添加大型树木4
    let bigTree4Num = 16, initBigTree4Left = -1150, initBigTree4Top = 250;
    for (var i = 0; i <= bigTree4Num; i++) {
      leftSceneries.push({
        src: "/image/tree/bigtree-4.png",
        left: initBigTree4Left += 128,
        top: initBigTree4Top -= 72,
        zIndex: 30
      })
    }

  })();

  // 右边景观的图片与样式
  const rightSceneries = [];
  (function createRightSceneries() {
    // 添加灌木丛样式
    let bushNum = 24, initBushRight = 1180, initBushBottom = -348, initBushZIndex = bushNum + 20;
    for (var i = 0; i <= bushNum; i++) {
      // 中间少两个灌木，去添加特殊景观
      if (i == 11) {
        initBushRight -= 75 * 2
        initBushBottom += 42 * 2
      }
      rightSceneries.push({
        src: "/image/tree/bush-1.png",
        right: initBushRight -= 75,
        bottom: initBushBottom += 42,
        zIndex: initBushZIndex--
      })
    }

    // 添加不规则小树样式
    let treeNum = 25, initTreeRight = -740, initTreeBottom = 670;
    for (var i = 0; i <= treeNum; i++) {
      rightSceneries.push({
        src: "/image/tree/tree-1.png",
        width: 76,
        right: initTreeRight += 80,
        bottom: initTreeBottom -= 45,
        zIndex: 50
      })
    }

    // 添加大型树木1
    let bigTree1Num = 18, initBigTree1Right = -750, initBigTree1Bottom = 500;
    for (var i = 0; i <= bigTree1Num; i++) {
      rightSceneries.push({
        src: "/image/tree/bigtree-1.png",
        right: initBigTree1Right += 112,
        bottom: initBigTree1Bottom -= 63,
        zIndex: 55
      })
    }

    // 添加大型树木2
    let bigTree2Num = 25, initBigTree2Right = -950, initBigTree2Bottom = 450;
    for (var i = 0; i <= bigTree2Num; i++) {
      rightSceneries.push({
        src: "/image/tree/bigtree-1.png",
        right: initBigTree2Right += 80,
        bottom: initBigTree2Bottom -= 45,
        zIndex: 60
      })
    }

    // 添加大型树木3
    let bigTree3Num = 12, initBigTree3Right = -1050, initBigTree3Bottom = 350;
    for (var i = 0; i <= bigTree3Num; i++) {
      rightSceneries.push({
        src: "/image/tree/bigtree-4.png",
        right: initBigTree3Right += 150,
        bottom: initBigTree3Bottom -= 84,
        zIndex: 65
      })
    }

    // 添加大型树木4
    let bigTree4Num = 16, initBigTree4Right = -1150, initBigTree4Bottom = 250;
    for (var i = 0; i <= bigTree4Num; i++) {
      rightSceneries.push({
        src: "/image/tree/bigtree-4.png",
        right: initBigTree4Right += 128,
        bottom: initBigTree4Bottom -= 72,
        zIndex: 70
      })
    }
    console.log(bigTree4Num)

    // // 添加座椅和路灯
    // rightSceneries.push({
    //   src: "/image/tree/bigtree-4.png",
    //   right: initBigTree3Right += 150,
    //   bottom: initBigTree3Bottom -= 84,
    //   zIndex: 65
    // })

  })();

  // 特殊景观
  (function createSpecialSceneries() {
    // 左边
    // 凳子
    leftSceneries.push({
      src: "/image/scenery/chair-1.png",
      width: 60,
      left: 371,
      top: 217,
      zIndex: 50
    })
    // 路灯
    leftSceneries.push({
      src: "/image/scenery/light-1.png",
      width: 20,
      left: 355,
      top: 170,
      zIndex: 50
    })
    // 女孩儿
    leftSceneries.push({
      src: "/image/scenery/people-2.png",
      left: 40,
      top: 140,
      zIndex: 40
    })

    // 右边
    // 凳子
    rightSceneries.push({
      src: "/image/scenery/chair-1.png",
      width: 60,
      right: 267,
      bottom: 182,
      zIndex: 40
    })
    // 路灯
    rightSceneries.push({
      src: "/image/scenery/light-1.png",
      width: 20,
      right: 248,
      bottom: 215,
      zIndex: 40
    })
  })();

  // 小车的朝向
  const forwardOrient = "topLeft"
  const drivingDirect = "back"

  // 模块进入点区域
  const [submoduleEntrys, setSubmoduleEntrys] = useState([
    {
      active: false,
      name: "covid",
      title: "疫情",
      image: "/image/modules/colorful/covid.png",
      intro: "通过可视化图表与文字，对当下疫情对于交通的影响进行分析，以及后疫情时代交通的展望。",
      left: 940,
      top: 168
    },
    {
      active: false,
      name: "carbon",
      title: "碳中和",
      image: "/image/modules/colorful/carbon.png",
      intro: "通过可视化图表与文字，对于碳中和政策对交通的影响进行分析。",
      left: 491,
      top: 419
    },
    {
      active: false,
      name: "ai",
      title: "人工智能",
      image: "/image/modules/colorful/ai.png",
      intro: "人工智能的发展对于交通以及交通参与者的影响。",
      left: -35,
      top: 235
    },
    {
      active: false,
      name: "itms",
      title: "智慧交通",
      image: "/image/modules/colorful/itms.png",
      intro: "对现行的智慧交通策略进行分析，以及对于未来智慧交通系统进行展望。",
      left: 350,
      top: 18
    },
  ])

  // 模块进入点区域 - 对应小车y轴区间
  const submoduleEntryAreas = {
    back:
      [
        { name: "covid", y1: 1850, y2: 2050 },
        { name: "carbon", y1: 1500, y2: 1700 },
      ],
    forward:
      [
        { name: "ai", y1: 1375, y2: 1575 },
        { name: "itms", y1: 1675, y2: 1875 },
      ]
  }

  // 显示子模块详细信息
  function showSubmodule(submodule) {
    if (submodule == null) {
      setSubmoduleEntrys(
        submoduleEntrys.map(item => {
          item.active = false;
          return item
        })
      )
    } else {
      setSubmoduleEntrys(
        submoduleEntrys.map(item => {
          if (item.name == submodule) item.active = true;
          else item.active = false;
          return item;
        })
      )
    }
  }

  // 键入回车键，进入子模块
  function enterSubmodule(submodule) {
    if (submodule == null) return
    navigate("/future/" + submodule)
  }

  // 小车进入下一条路
  const roadMap = { leftRoad: "/mycity", forwardRoad: "/knowledge", rightRoad: "/deep" }
  let navigate = useNavigate()
  const [futureVisible, setFutureVisible] = useState(true)
  function toNextRoad(road) {
    setFutureVisible(false)
    setTimeout(() => {
      navigate(roadMap[road])
    }, 250)
  }


  return (
    <div className={futureVisible ? "future" : "future hide"}>
      {/*  可视区域 */}
      <div className="visible-area" >
        {/* 路标 */}
        <RoadSign style={{ left: -229, bottom: 73 }} cnName={"未来展望路"} enName={"Future Road"} reserve={true}></RoadSign>
        {/* 左侧树木&景观 */}
        <div className="scenery-left">
          {leftSceneries.map((item, index) => <img
            className="scenery-item"
            key={index}
            src={item.src}
            style={{
              left: item.left + 'px',
              top: item.top + 'px',
              zIndex: item.zIndex || 0,
              width: item.width ? item.width + "px" : 'auto',
              height: item.height ? item.height + "px" : 'auto',
            }}
          />)}
        </div>
        {/* 路边-左侧 */}
        <div className="road-aside-left"></div>
        {/* 马路 */}
        <div className="road">
          {/* 小车 */}
          <Car forwardOrient={forwardOrient} direct={drivingDirect} submoduleEntryAreas={submoduleEntryAreas} showSubmodule={showSubmodule} enterSubmodule={enterSubmodule} toNextRoad={toNextRoad}></Car>
          {/* 斑马线 */}
          <div className="zebra" >
            <ZebraCrossing width="100%" height="120px" lineNum="25" />
          </div>
          {/* 行驶区 */}
          <div className="driving-area">
            <SingleWhite width="5px" height="100%" />
            {/* 双黄线左边道路 */}
            <div className="left-road">
              <div className="arrow">
                <ForwardArrow />
              </div>
            </div>
            {/* 双黄线右边道路 */}
            <div className="right-road">
              <DoubleYellow width="18px" height="100%"></DoubleYellow>
              <div className="left">
                <div className="arrow">
                  <LeftArrow />
                </div>
                <div className="road-name">
                  我的城市路
                </div>
              </div>
              <DottedLine width="7px" height="100%" lineNum="15" />
              <div className="forward">
                <div className="arrow">
                  <ForwardArrow />
                </div>
                <div className="road-name">
                  初识交通路
                </div>
              </div>
              <DottedLine width="7px" height="100%" lineNum="15" />
              <div className="right">
                <div className="arrow">
                  <RightArrow />
                </div>
                <div className="road-name">
                  深入交通路
                </div>
              </div>
            </div>
            <SingleWhite width="5px" height="100%" />
          </div>
        </div>
        {/* 路边-右侧 */}
        <div className="road-aside-right"></div>
        {/* 右侧树木&景观 */}
        <div className="scenery-right">
          {rightSceneries.map((item, index) => <img
            className="scenery-item"
            key={index}
            src={item.src}
            style={{
              right: item.right + 'px',
              bottom: item.bottom + 'px',
              zIndex: item.zIndex || 0,
              width: item.width ? item.width + "px" : 'auto',
              height: item.height ? item.height + "px" : 'auto',
            }}
          />)}
        </div>
        {/* 子模块进入装置 */}
        <div className="submodule-enter-btns">
          {submoduleEntrys.map((item, index) => (
            <SubmoduleEntry key={index} reserve={true} submoduleInfo={item}></SubmoduleEntry>
          ))}
        </div>
      </div>
      {/* 子页面 */}
      <Outlet style={{ width: '100%', height: '100%', position: "absolute", left: 0, top: 0 }}></Outlet>
    </div>
  )
}

export default index
