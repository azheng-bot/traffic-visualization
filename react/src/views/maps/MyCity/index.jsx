import React, { Component } from 'react'
import "./index.less"
import Car from "../../../components/Car/index"
import LeftArrow from "../../../components/arrows/LeftArrow"
import ForwardArrow from "../../../components/arrows/ForwardArrow"
import RightArrow from "../../../components/arrows/RightArrow"
import DoubleYellow from "../../../components/lines/DoubleYellow"
import SingleWhite from "../../../components/lines/SingleWhite"
import ZebraCrossing from "../../../components/lines/ZebraCrossing"
import DottedLine from "../../../components/lines/DottedLine"

export class index extends Component {
  render() {
    return (
      <div className="my-city">
        {/* 小车行驶区域 */}
        <div className="visible-area">
          {/* 马路 */}
          <div className="road">
            {/* 斑马线 */}
            <div className="zebra" style={{}} >
              <ZebraCrossing width="100%" height="120px" lineNum="25" />
            </div>
            {/* 行驶区 */}
            <div className="driving-area">
              <SingleWhite width="5px" height="100%" />
              {/* 双黄线左边道路 */}
              <div className="left-road">
                  <div className="arrow">
                    <ForwardArrow />
                  </div>
              </div>
              <DoubleYellow width="18px" height="100%"></DoubleYellow>
              {/* 双黄线右边道路 */}
              <div className="right-road">
                <div className="left">
                  <div className="arrow">
                    <LeftArrow />
                  </div>
                  <div className="road-name">
                    深入交通
                  </div>

                </div>
                <DottedLine width="7px" height="100%" lineNum="15" />
                <div className="forward">
                  <div className="arrow">
                    <ForwardArrow />
                  </div>
                  <div className="road-name">
                    深入交通
                  </div>
                </div>
                <DottedLine width="7px" height="100%" lineNum="15" />
                <div className="right">
                  <div className="arrow">
                    <RightArrow />
                  </div>
                  <div className="road-name">
                    深入交通
                  </div>

                </div>
              </div>
              <SingleWhite width="5px" height="100%" />
            </div>
          </div>
          <Car></Car>
        </div>
      </div>
    )
  }
}

export default index
