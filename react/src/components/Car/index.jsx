import React, { useRef, useEffect, useState } from 'react'
import "./index.less"

function index(props) {
  let submoduleEntryAreas = props.submoduleEntryAreas
  let currentSubmodule = null

  // 获取汽车dom元素
  const carRef = useRef(null)

  // 0.汽车基础属性
  let direct = props.direct  // 汽车前后方向 - 朝路中心是前，反之则为后
  let forwardOrient = props.forwardOrient // 汽车向前时，汽车的上下左右朝向
  let reverseOrientMap = { // 汽车反向
    "topRight": "bottomLeft",
    "bottomLeft": "topRight",
    "bottomRight": "topLeft",
    "topLeft": "bottomRight"
  }
  let [orient, setOrient] = useState(direct == "forward" ? forwardOrient : reverseOrientMap[forwardOrient]) // 汽车朝向
  let orientImgMap = { // 朝向对应的汽车图片
    topRight: "./image/car/上-右.png",
    topLeft: "./image/car/上-左.png",
    bottomRight: "./image/car/下-右.png",
    bottomLeft: "./image/car/下-左.png",
  }
  let forwardOrient2Transform = {
    topRight: "rotateX(237deg) rotateY(155deg) rotateZ(120deg)",
    topLeft: "rotateX(127deg) rotateY(154deg) rotateZ(242deg)",
    bottomRight: "rotateX(127deg) rotateY(154deg) rotateZ(60deg)",
    bottomLeft: "rotateX(237deg) rotateY(155deg) rotateZ(300deg)",
  }// forwardOrient to transform，不同forwardOrient对应不同小车transform

  // 动态变量数值
  let runSpeed = 0; //行驶速度
  let runStatus = 'stop'; //行驶状态
  let x = 0; //汽车x轴位置
  let y = 0; //汽车y轴位置

  // 固定数值变量
  // 初始坐标
  let initX = 180
  let initY = 1300

  // 速度数值
  let increaseSpeed = 0.01 //加速度
  let reduceSpeed = 0.005 //减速度
  let maxForwardSpeed = 1.75 //最高前进速度
  let maxBackSpeed = -1.5 //最高后退速度
  let turnSpeed = 0.8 // 左右转的速度

  // 前后左右边界
  let leftBorder = 66;
  let rightBorder = 285;
  let backBorder = 900
  let forwardBorder = 2239

  // 根据小车行驶方向，更改基础参数
  if (direct == "back") {
    // 初始坐标
    initX = -17;
    initY = 2150;
    // 边界
    leftBorder = -53;
    rightBorder = -8;
  }



  // 初始化小汽车入场
  // 实现方法：初始化小车以最高速度行驶入场
  // let isInitCar = true;
  useEffect(() => {
    // 初始化小车以最高速度行驶y轴移动305px去实现入场动画，这会使得小车初始偏移目标位置；
    // 所以把目标y轴距离减去305px，就是初始小车的y轴应在位置。
    y = initY + (direct == "forward" ? -305 : 305)
    x = initX
    runSpeed = maxForwardSpeed;

    setTimeout(() => {
      runCar()
    }, 750)

    return function onDestory() {
      setOrient = () => false
      clearInterval(timer)
      timer = null
    }
  }, [])

  let timer = null;
  // 1.小车运行
  function runCar() {
    timer = setInterval(() => {
      // console.log('x,y', x, y)

      // 根据汽车行驶状态，执行对应事件
      switch (runStatus) {
        case 'stop':
          speedStop()
          break;

        case 'up':
          speedUp()
          break;

        case 'down':
          speedDown()
          break;

        case 'up-left':
          speedUp()
          turnLeft()
          break;

        case 'up-right':
          speedUp()
          turnRight()
          break;

        case 'down-left':
          speedDown()
          turnLeft()
          break;

        case 'down-right':
          speedDown()
          turnRight()
          break;
      }
      // 判断x,y是否越过边界
      // 左边界
      if (x <= leftBorder) {
        x = leftBorder
      }
      // 右边界
      if (x >= rightBorder) {
        x = rightBorder
      }
      // 下边界
      if (y <= backBorder) {
        // 转向
        if (direct == "forward") {
          direct = "back"
          setOrient(prev => reverseOrientMap[prev])
          x = -23;
          leftBorder = -53;
          rightBorder = -8;
        } else if (direct == "back") {
          direct = "forward"
          setOrient(prev => reverseOrientMap[prev])
          x = 180
          leftBorder = 66;
          rightBorder = 285;
        }
      }
      // 上边界
      if (y >= forwardBorder && direct == "forward") toNextRoad()

      // 判断是否在模块进入点周围
      if (direct == "back" || x >= 170) { // 判断x轴位置是否在路边
        // 判断y轴位置是否有模块进入点
        let entryAreas = submoduleEntryAreas[direct]
        let targetSubmodule = null;
        for (var i = 0; i < entryAreas.length; i++) {
          if (y > entryAreas[i].y1 && y < entryAreas[i].y2) {
            targetSubmodule = entryAreas[i].name
          }
        }
        if (targetSubmodule != currentSubmodule) {
          currentSubmodule = targetSubmodule
          // 触发进入模块事件
          props.showSubmodule(currentSubmodule)
        }
      }

      // 设置style
      carRef.current.style.left = x + 'px'
      carRef.current.style.bottom = y + 'px'
      // 转动轮胎
      rotateWheel()

    }, 3)
  }
  // runCar()

  // 轮毂旋转
  let wheelRate = 0
  const wheelSpeed = 5 // 轮胎转速
  let wheel_1 = useRef(null)
  let wheel_2 = useRef(null)
  function rotateWheel() {
    switch (forwardOrient) {
      case "topRight":
        wheel_1.current.style.transform = `rotateX(42deg) rotateY(316deg) rotateZ(${wheelRate}deg)`
        wheel_2.current.style.transform = `rotateX(33deg) rotateY(313deg) rotateZ(${wheelRate + 30}deg)`
        wheelRate += runSpeed * (direct == "forward" ? wheelSpeed : -wheelSpeed);
        break;

      case "bottomLeft":
        wheel_1.current.style.transform = `rotateX(42deg) rotateY(316deg) rotateZ(${wheelRate}deg)`
        wheel_2.current.style.transform = `rotateX(33deg) rotateY(313deg) rotateZ(${wheelRate + 30}deg)`
        wheelRate += runSpeed * (direct == "forward" ? -wheelSpeed : wheelSpeed);
        break;

      case "topLeft":
        wheel_1.current.style.transform = ` rotateX(41deg) rotateY(51deg) rotateZ(${wheelRate}deg)`
        wheel_2.current.style.transform = ` rotateX(41deg) rotateY(43deg) rotateZ(${wheelRate + 30}deg)`
        wheelRate += runSpeed * (direct == "forward" ? -wheelSpeed : wheelSpeed);
        break;

      case "bottomRight":
        wheel_1.current.style.transform = ` rotateX(41deg) rotateY(51deg) rotateZ(${wheelRate}deg)`
        wheel_2.current.style.transform = ` rotateX(41deg) rotateY(43deg) rotateZ(${wheelRate + 30}deg)`
        wheelRate += runSpeed * (direct == "forward" ? wheelSpeed : -wheelSpeed);
        break;
    }
  }

  // 静止状态
  function speedStop() {
    if (runSpeed >= -0.015 && runSpeed <= 0.015) {
      runSpeed = 0;
      return false;
    }
    // 自然减速
    runSpeed += (runSpeed <= 0) ? reduceSpeed : -reduceSpeed;
    y += (direct == "forward") ? runSpeed : -runSpeed
  }
  // 加速
  function speedUp() {
    // 加速
    runSpeed += increaseSpeed
    // 设置最高速度限制
    if (runSpeed >= maxForwardSpeed) {
      runSpeed = maxForwardSpeed
    }
    // 设置x,y
    y += (direct == "forward") ? runSpeed : -runSpeed
  }
  // 减速
  function speedDown() {
    // 减速
    runSpeed -= runSpeed <= 0 ? reduceSpeed : reduceSpeed * 2
    // 设置最高速度限制
    if (runSpeed <= maxBackSpeed) {
      runSpeed = maxBackSpeed
    }
    y += (direct == "forward") ? runSpeed : -runSpeed

  }

  // 左转
  function turnLeft() {
    if (direct == "forward") {
      x -= turnSpeed * (runSpeed / maxForwardSpeed)
    } else if (direct == "back") {
      x += turnSpeed * (runSpeed / maxForwardSpeed)
    }
  }
  // 右转
  function turnRight() {
    if (direct == "forward") {
      x += turnSpeed * Math.abs(runSpeed / maxForwardSpeed)
    } else if (direct == "back") {
      x -= turnSpeed * Math.abs(runSpeed / maxForwardSpeed)
    }
  }

  // 2.键盘事件
  // 键值 to 方向
  let key2Direction = {
    37: 'left', 38: 'up', 39: 'right', 40: 'down',
    65: 'left', 87: 'up', 68: 'right', 83: 'down'
  }
  // 各个方向键盘是否按下
  let keyStatus = { 'left': false, 'up': false, 'right': false, 'down': false }
  // keydown按下按键事件
  document.addEventListener("keydown", (e) => {
    // 根据按键方向，改变键盘状态
    switch (key2Direction[e.keyCode]) {
      case 'up':
        keyStatus['up'] = true;
        keyStatus['down'] = false;
        break;

      case 'down':
        keyStatus['down'] = true;
        keyStatus['up'] = false;
        break;

      case 'left':
        keyStatus['left'] = true;
        keyStatus['right'] = false;
        break;

      case 'right':
        keyStatus['right'] = true;
        keyStatus['left'] = false;
        break;

      default:
        break;
    }
    // 根据键盘状态，确认小车方向状态
    defermineDirection()

  })
  // 根据键盘状态，确认小车方向状态
  function defermineDirection() {
    if (keyStatus['up'] && keyStatus['left']) runStatus = 'up-left'
    else if (keyStatus['up'] && keyStatus['right']) runStatus = 'up-right'
    else if (keyStatus['up']) runStatus = 'up'
    else if (keyStatus['down'] && keyStatus['left']) runStatus = 'down-left'
    else if (keyStatus['down'] && keyStatus['right']) runStatus = 'down-right'
    else if (keyStatus['down']) runStatus = 'down'
    else runStatus = 'stop'
  }

  // keyup抬起按键事件
  document.addEventListener("keyup", (e) => {
    switch (key2Direction[e.keyCode]) {
      case 'up':
        keyStatus['up'] = false;
        break;

      case 'down':
        keyStatus['down'] = false;
        break;

      case 'left':
        keyStatus['left'] = false;
        break;

      case 'right':
        keyStatus['right'] = false;
        break;

      default:
        break;
    }
    defermineDirection()
  })
  // 按回车时触发enterSubmodule事件
  window.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) props.enterSubmodule(currentSubmodule)
  })

  // 三条路的x轴位置
  const leftRoad = [56, 134]
  const forwardRoad = [134, 220]
  const rightRoad = [220, 293]
  // 通往下一条路
  function toNextRoad() {
    clearInterval(timer)
    timer = null
    if (x >= leftRoad[0] && x < leftRoad[1]) {
      props.toNextRoad("leftRoad")
    } else if (x >= forwardRoad[0] && x < forwardRoad[1]) {
      props.toNextRoad("forwardRoad")
    } else if (x >= rightRoad[0] && x < rightRoad[1]) {
      props.toNextRoad("rightRoad")
    }
  }

  return (
    <div className={`car ${orient}`} style={{ transform: forwardOrient2Transform[forwardOrient] }} ref={carRef}>
      <img className="car_image" src={orientImgMap[orient]} alt="" />
      <img className="wheel wheel_1" src="./image/car/轮毂.png" alt="" ref={wheel_1} />
      <img className="wheel wheel_2" src="./image/car/轮毂.png" alt="" ref={wheel_2} />
    </div>
  )
}

export default index
