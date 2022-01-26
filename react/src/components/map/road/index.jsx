import React from 'react'
import ForwardArrow from './arrows/ForwardArrow';




function index() {
  const roads = [
    {currentRoad:"MyCity",turnLeft:"Knowledge",goForward:"Deep",turnRight:"Future"},
    {currentRoad:"Knowledge",turnLeft:"Deep",goForward:"Future",turnRight:"MyCity"},
    {currentRoad:"Deep",turnLeft:"Future",goForward:"MyCity",turnRight:"Knowledge"},
    {currentRoad:"Future",turnLeft:"MyCity",goForward:"Knowledge",turnRight:"Deep"},
  ]
  const en2cn = {
    "MyCity":"我的城市",
    "Knowledge":"基础通识",
    "Deep":"深入交通",
    "Future":"未来展望",
  }
  let current = "MyCity"

  return (
    <div className="road">
      <div className="single-white"></div>
      <div className="left-road">

      </div>
      <div className="double-yellow"></div>
      <div className="right-road">
        <div className="left">

        </div>
        <div className="zero-crossing"></div>
        <div className="forward">

        </div>
        <div className="zero-crossing"></div>
        <div className="right">

        </div>
      </div>
    </div>
  )
}

export default index
