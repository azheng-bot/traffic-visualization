import React, { Component } from 'react'
import "../../../style/variable.less"
import "./index.less"

function index(props) {
  
  return (
    <div style={{ width: props.width || "30px",height:props.height || "200px"}} className="single-white">

    </div>
  )
}

export default index
