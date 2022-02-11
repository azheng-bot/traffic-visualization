import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
;

import "./index.less"

function index(props) {
  const navigate = useNavigate()
  const moduleList = [
    {
      name: "我的城市",
      route: "/mycity",
      children: [
        { name: "城市公交", route: "/mycity/bus", icon: "../image/modules/colorless/bus.png", _icon: "../image/modules/colorless/_bus.png" },
        { name: "城市地铁", route: "/mycity/subway", icon: "../image/modules/colorless/subway.png", _icon: "../image/modules/colorless/_subway.png" },
      ]
    },
    {
      name: "交通通识",
      route: "/knowledge",
      children: [
        { name: "交通图标", route: "/knowledge/sign", icon: "../image/modules/colorless/sign.png", _icon: "../image/modules/colorless/_sign.png" },
        { name: "交通工具", route: "/knowledge/tool", icon: "../image/modules/colorless/tool.png", _icon: "../image/modules/colorless/_tool.png" },
        { name: "交通法规", route: "/knowledge/law", icon: "../image/modules/colorless/law.png", _icon: "../image/modules/colorless/_law.png" },
        { name: "交通历史", route: "/knowledge/history", icon: "../image/modules/colorless/history.png", _icon: "../image/modules/colorless/_history.png" },
      ]
    },
    {
      name: "深入交通",
      route: "/deep",
      children: [
        { name: "交通现状", route: "/deep/now", icon: "../image/modules/colorless/now.png", _icon: "../image/modules/colorless/_now.png" },
        { name: "违法统计", route: "/deep/illegal", icon: "../image/modules/colorless/illegal.png", _icon: "../image/modules/colorless/_illegal.png" },
        { name: "车辆统计", route: "/deep/cars", icon: "../image/modules/colorless/cars.png", _icon: "../image/modules/colorless/_cars.png" },
        { name: "最新新闻", route: "/deep/news", icon: "../image/modules/colorless/news.png", _icon: "../image/modules/colorless/_news.png" },
      ]
    },
    {
      name: "交通展望",
      route: "/future",
      children: [
        { name: "疫情", route: "/future/covid", icon: "../image/modules/colorless/covid.png", _icon: "../image/modules/colorless/_covid.png" },
        { name: "碳中和", route: "/future/carbon", icon: "../image/modules/colorless/carbon.png", _icon: "../image/modules/colorless/_carbon.png" },
        { name: "人工智能", route: "/future/ai", icon: "../image/modules/colorless/ai.png", _icon: "../image/modules/colorless/_ai.png" },
        { name: "智慧交通", route: "/future/itms", icon: "../image/modules/colorless/itms.png", _icon: "../image/modules/colorless/_itms.png" },
      ]
    },
  ]
  // 详细模块下拉菜单 - 是否显示
  const [selectVisible, setSelectVisible] = useState(false)
  // 详细模块下拉菜单 - index索引
  const [moduleIndex, setModuleIndex] = useState(1)
  // 详细模块下拉菜单 - 每个模块的下拉菜单的left属性
  const selectLeftMap = { 0: 10, 1: 10, 2: 10 }
  // navigator导航栏 - 是否显示
  const [navigatorVisible, setNavigatorVisible] = useState(false)

  function unfold() {
    setNavigatorVisible(!navigatorVisible)
  }
  function changeSelect(index) {

  }

  return (
    <div className={["navigator", navigatorVisible ? "active" : ""].join(" ")} >
      {/* 半透明背景 */}
      <div className="mask"></div>
      {/* logo */}
      <div className="logo" onClick={() => navigate("/")}>
        <img src="../image/favicon.svg" alt="" />
        <span className="text">视觉交通</span>
      </div>
      {/* 收起按钮 */}
      <div className="fold" onClick={unfold}>
        <img src="../image/others/fold.svg" alt="" />
      </div>
      {/* 展开按钮 */}
      <div className={["unfold", navigatorVisible ? "" : "active"].join(" ")} onClick={unfold}>
        <img className="complete-center" src="../image/others/fold.svg" alt="" />
      </div>
      <div className="module-list">
        <ul className="modules">
          {moduleList.map((item, index) => (
            <li className="module" key={index} onMouseEnter={() => setModuleIndex(index) || setSelectVisible(true)}  onClick={() => navigate(item.route)} >
              <a href="#" className="text">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <ul
          className={["select-list", selectVisible ? "show" : "hide"].join(" ")}
          style={{
            width: (moduleList[moduleIndex].children.length * 195) + 'px',
            left: moduleIndex * 150 - (moduleList[moduleIndex].children.length * 195) / 2 + 75 + 'px'
          }}
          onMouseLeave={() => setSelectVisible(false)}>
          {moduleList[moduleIndex].children.map((item, index) => (
            <li key={index} onClick={() => navigate(item.route)}>
              <img className="_icon" src={item._icon} alt=" " />
              <img className="icon" src={item.icon} alt=" " />
              <p className="name">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default index;
