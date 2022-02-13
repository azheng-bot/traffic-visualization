import React, { createRef, useEffect } from 'react'
import "./index.less"

function index(props) {
  const lineNum = props.lineNum || 5

  let lines = [];
  for (var i = 0; i < lineNum; i++) {
    lines.push(<div className="line" key={i}></div>)
  }

  return (
    <div style={{ width: props.width || "30px", height: props.height || "200px" }} className="dotted-line">
      {lines}
    </div>
  )
}

export default index
