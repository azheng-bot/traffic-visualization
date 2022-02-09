import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import "./index.less"

export class index extends Component {
  render() {
    return (
      <div style={{width:'100%',height:'100%',position:"absolute",left:0,top:0}}>
        我的城市
        <Outlet style={{width:'100%',height:'100%'}}></Outlet>
      </div>
    )
  }
}

export default index
