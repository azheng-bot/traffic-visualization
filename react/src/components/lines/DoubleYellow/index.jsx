import React, { Component } from 'react'
import "../../../style/variable.less"
import "./index.less"

function index(props) {
  
  return (
    <div style={{ width:( props.width || "30px"),height:(props.height || "200px")}} className="double-yellow">
      <div className="line-1"></div>
      <div className="line-2"></div>

    </div>
  )
}

export default index
