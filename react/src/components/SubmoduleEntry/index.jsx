import React, { createRef, useEffect, useState } from 'react'
import "./index.less"

function index(props) {
  // setActive(props.show || false)
  const reserve = props.reserve || false;
  const submoduleInfo = props.submoduleInfo

  return (
    <div className={["submodule-entry", submoduleInfo.active ? "active" : "", reserve ? "reserve" : ""].join(" ")} style={{ left: submoduleInfo.left + 'px', top: submoduleInfo.top + 'px' }} >
      <div className="media">
        {/* <div className="img-intro"> */}
        <img src={submoduleInfo.image} alt=" " />
        <div className="tips">
          <div className="guide-line">
            <div className="line"></div>
            <div className="point"></div>
          </div>
          <div className="intro">
            <p className="submodule-name">{submoduleInfo.title}</p>
            <p className="detail-intro">{submoduleInfo.intro}</p>
            <p className="hint">
              <span className="border">ENTER</span>回车键进入模块
            </p>
          </div>
        </div>
        {/* </div> */}
      </div>
      <div className="light"></div>
      <div className="phone">
        <img src="/image/others/iphone.png" alt="" />
      </div>
    </div>

  )
}

export default index
