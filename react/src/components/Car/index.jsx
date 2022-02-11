import React, { useRef, useEffect } from 'react'
import "./index.less"

function index(props) {
  // 获取汽车dom元素
  const carRef = useRef(null)

  // 0.汽车基础属性
  let direct = props.direct  // 汽车前后方向 //朝路中心是前，反之则为后
  let orient = (direct == "forward") ? "topRight" : "bottomLeft" // 汽车朝向
  let orientImgMap = {
    topRight: "./image/car/上-右.png",
    topLeft: "./image/car/上-左.png",
    bottomRight: "./image/car/下-右.png",
    bottomLeft: "./image/car/下-左.png",
  }

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
  let turnSpeed = 0.4 // 左右转的速度

  // 前后左右边界
  let leftBorder = 66;
  let rightBorder = 292;
  let backBorder = 1000
  let forwardBorder = 2239

  // 根据小车行驶方向，更改基础参数
  if (direct == "back") {
    // 初始坐标
    initX = -17;
    initY = 2239;
    // 边界
    leftBorder = -8;
    rightBorder = -53;
  }



  // 初始化小汽车入场
  // 实现方法：初始化小车以最高速度行驶500ms入场
  let isInitCar = true;
  useEffect(() => {
    // 初始化小车移动500ms，500ms小车y轴移动305px去实现入场动画，这会使得小车初始偏移目标位置；
    // 所以把目标y轴距离减去500ms内小车移动的距离，就是初始小车的y轴应在位置。
    y = initY + (direct == "forward" ? -305 : 305)
    x = initX
    runSpeed = maxForwardSpeed;

    setTimeout(() => {
      isInitCar = false;
    }, 500)

    runCar()
  }, [])

  let timer = null;
  // 1.小车运行
  function runCar() {
    timer = setInterval(() => {
      // console.log('x,y', runStatus, x, y)

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
      carRef.current.style.left = x + 'px'
      carRef.current.style.bottom = y + 'px'
      rotateWheel()

      if (y >= forwardBorder && direct == "forward") toNextRoad()
    }, 3)
  }
  // runCar()

  // 轮毂旋转
  let wheelRate = 0
  const wheelSpeed = direct == "forward" ? 5 : -5 // 轮胎转速
  let wheel_1 = useRef(null)
  let wheel_2 = useRef(null)
  function rotateWheel() {
    wheelRate += runSpeed * wheelSpeed;
    if (orient == "topRight" || orient == "bottomLeft") {
      wheel_1.current.style.transform = `rotateX(42deg) rotateY(316deg) rotateZ(${wheelRate}deg)`
      wheel_2.current.style.transform = `rotateX(33deg) rotateY(313deg) rotateZ(${wheelRate + 30}deg)`
    }
    else if (orient == "topLeft" || orient == "bottomRight") {
      wheel_1.current.style.transform = ` rotateX(41deg) rotateY(51deg) rotateZ(${wheelRate}deg)`
      wheel_2.current.style.transform = ` rotateX(41deg) rotateY(43deg) rotateZ(${wheelRate + 30}deg)`
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
      x -= turnSpeed
      if (x <= leftBorder) {
        x = leftBorder
      }
    } else if (direct == "back") {
      x += turnSpeed
      if (x >= leftBorder) {
        x = leftBorder
      }
    }
  }
  // 右转
  function turnRight() {
    if (direct == "forward") {
      x += turnSpeed
      if (x >= rightBorder) {
        x = rightBorder
      }
    } else if (direct == "back") {
      x -= turnSpeed
      if (x <= rightBorder) {
        x = rightBorder
      }
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

  // 三条路的x轴位置
  const road1 = [56, 134]
  const road2 = [134, 220]
  const road3 = [220, 293]
  // 通往下一条路
  function toNextRoad() {
    clearInterval(timer)
    timer = null
    if (x >= road1[0] && x < road1[1]) {
      window.alert("To 通识 road")
    } else if (x >= road2[0] && x < road2[1]) {
      window.alert("To 深入 road")
    } else if (x >= road3[0] && x < road3[1]) {
      window.alert("To 展望 road")
    }
  }

  return (
    <div className={["car", orient].join(" ")} ref={carRef}>
      <img className="car_image" src={orientImgMap[orient]} alt="" />
      <img className="wheel wheel_1" src="./image/car/轮毂.png" alt="" ref={wheel_1} />
      <img className="wheel wheel_2" src="./image/car/轮毂.png" alt="" ref={wheel_2} />
    </div>
  )
}

export default index
