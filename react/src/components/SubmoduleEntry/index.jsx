import React, { createRef, useEffect, useState } from 'react'
import "./index.less"

function index(props) {
  const [active, setActive] = useState(false)
  // setActive(props.show || false)

  const submoduleInfo = props.submoduleInfo

  return (
    <div className={submoduleInfo.active ? "submodule-entry active" : "submodule-entry"} style={{left:submoduleInfo.left+'px',top:submoduleInfo.top+'px'}} onMouseEnter={() => setActive(true)} onMouseOut={() => setActive(false)} >
      <div className="media">
        <div className="img-intro">
          <img src={submoduleInfo.image} alt=" " />
          <div className="guide-line">
            <div className="line"></div>
            <div className="point"></div>
          </div>
          <div className="intro">
            <p className="submodule-name">{submoduleInfo.name}</p>
            <p className="detail-intro">{submoduleInfo.intro}</p>
          </div>
        </div>
      </div>
      <div className="light"></div>
      <div className="phone">
        <img src="./image/others/iphone.png" alt="" />
      </div>
    </div>

  )
}

export default index
