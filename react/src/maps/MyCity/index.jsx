import React, { Component } from 'react'
import "./index.less"
import MyCityRoad from "../components/road/index"
import Car from "../components/car/index"

export class index extends Component {
  render() {
    return (
      <div className="my-city">
        <div className="visible-area">
          <MyCityRoad></MyCityRoad>
      <Car></Car>
        </div>
      </div>
    )
  }
}

export default index
