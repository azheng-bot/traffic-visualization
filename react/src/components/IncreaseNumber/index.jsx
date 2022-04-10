import React, { createRef, useEffect, useState } from 'react'
import "./index.less"

function index(props) {
  const [number, setNumber] = useState(0); // 显示数字
  const targetNumber = props.number ?? 1 // 目标数字
  const duration = props.duration || 1000 // 持续时间 
  const step = props.step || 2 // 定时器step时间值
  const style = props.style || {} // 样式

  const increaseTimes = duration / step;// 递增次数
  const increaseValue = Math.ceil(targetNumber / increaseTimes);// 递增数值

  function thousandPoint(number) {
    let str = number + ''
    let len = str.length
    let res = ''
    for (var i = 0; i < len; i++) {
      if (i % 3 == 0 && i != 0) {
        res = ',' + res
      }
      res = str[len - i - 1] + res
    }
    return res
  }

  useEffect(() => {
    if (targetNumber != 0) {
      if (number < targetNumber) {
        const increaseValue = (targetNumber - number) / 70;// 递增数值
        setTimeout(() => {
          setNumber(number + increaseValue)
        }, 4)
      }
    }
  }, [number])

  return (
    <span style={style} className="increase-number">
      {/* {parseInt(number)} */}
      {props.number}
    </span>
  )
}

export default index
