import React, { Component } from 'react'
import "../../../style/variable.less"
import "./index.less"

function index(props) {
  const width = props.width || '30px'
  const height = props.height || '200px'
  const lineNum = props.lineNum || 10

  let lines = [];
  for (var i = 0; i < lineNum; i++) {
    lines.push(<div className="line" style={{width:`calc(${width} / ${lineNum} / 2.5)`}} key={i}></div>)
  }

  return (
    <div style={{ width, height }} className="zebra-crossing">
      {lines}
    </div>
  )
}

export default index
