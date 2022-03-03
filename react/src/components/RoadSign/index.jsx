import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
;

import "./index.less"

function index(props) {
  const style = {
    left: props.style.left ? props.style.left + 'px' : "auto",
    right: props.style.right ? props.style.right + 'px' : "auto",
    top: props.style.top ? props.style.top + 'px' : "auto",
    bottom: props.style.bottom ? props.style.bottom + 'px' : "auto",
  }
  return (
    <div className={["road-sign", props.reserve ? "reserve" : ""].join(" ")} style={style}>
      <img src="/image/others/road-sign.png" alt="" />
      <div className="road-name">
        <div className="cn">
          {props.cnName || "XXX 路"}
        </div>
        <div className="en">
          {props.enName || "XXX Road"}
        </div>
      </div>
    </div>
  )
}

export default index;
