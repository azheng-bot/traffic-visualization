import React, { useRef, useEffect, useState } from 'react'
import "./index.less"

function index(props) {
  const moduleList = [
    {
      name: "我的城市",
      children: [
        { name: "城市公交", route: "/mycity/bus", icon: "../image/modules/colorful/intro.png", _icon: "../image/modules/colorful/_intro.png" },
        { name: "城市地铁", route: "/mycity/subway", icon: "", _icon: "" },
      ]
    },
    {
      name: "交通通识",
      children: [
        { name: "交通图标", route: "/knowledge/sign", icon: "", _icon: "" },
        { name: "交通工具", route: "/knowledge/tool", icon: "", _icon: "" },
        { name: "交通法规", route: "/knowledge/law", icon: "", _icon: "" },
        { name: "交通历史", route: "/knowledge/history", icon: "", _icon: "" },
      ]
    },
    {
      name: "深入交通",
      children: [
        { name: "交通现状", route: "/deep/now", icon: "", _icon: "" },
        { name: "违法统计", route: "/deep/illegal", icon: "", _icon: "" },
        { name: "车辆统计", route: "/deep/vehicle", icon: "", _icon: "" },
        { name: "最新新闻", route: "/deep/news", icon: "", _icon: "" },
      ]
    },
    {
      name: "交通展望",
      children: [
        { name: "疫情", route: "/future/covid", icon: "", _icon: "" },
        { name: "碳中和", route: "/future/carbon", icon: "", _icon: "" },
        { name: "人工智能", route: "/future/ai", icon: "", _icon: "" },
        { name: "智慧交通", route: "/future/itms", icon: "", _icon: "" },
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
  const [navigatorVisible, setNavigatorVisible] = useState(true)

  function unfold() {
    setNavigatorVisible(!navigatorVisible)
  }
  function changeSelect(index) {

  }

  return (
    <div className={["navigator", navigatorVisible ? "active" : ""].join(" ")} >
      {/* logo */}
      <div className="logo">
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
            <li className="module" key={index} onMouseEnter={() => setModuleIndex(index) || setSelectVisible(true)}  >
              <a href="#" className="text">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
          <ul
            className={["select-list", selectVisible ? "show" : "hide"].join(" ")}
            style={{
              width: (moduleList[moduleIndex].children.length * 175) + 'px',
              left: moduleIndex * 150 - (moduleList[moduleIndex].children.length * 175) / 2 + 75 + 'px'
            }}
            onMouseLeave={() => setSelectVisible(false)}>
            {moduleList[moduleIndex].children.map((item, index) => (
              <li key={index}>
                <img className="icon" src={item.icon} alt=" " />
                <img className="_icon" src={item._icon} alt=" " />
                <p className="name">{item.name}</p>
              </li>
            ))}
          </ul>
      </div>
    </div>
  )
}

export default index;
