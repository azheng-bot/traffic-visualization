import React, { useRef, useEffect } from 'react'
import "./index.less"

function index(props) {
  const carRef = useRef(null)
  console.log(`carRef`, carRef)

  // 汽车基础属性
  let runSpeed = 0; //行驶速度
  let runStatus = 'stop'; //行驶状态
  let coafX = 1.5; //汽车行驶距离与x轴的比例
  let coafY = 1; //汽车行驶距离与x轴的比例
  let x = -150; //汽车x轴位置
  let y = -100; //汽车y轴位置

  const increaseSpeed = 0.005 //加速度
  const reduceSpeed = 0.005 //减速度
  const maxForwardSpeed = 0.75 //最高前进速度
  const maxBackSpeed = -0.5 //最高后退速度


  let isInitCar = true;

  // 初始化小汽车入场
  useEffect(() => {
    setTimeout(() => {
      isInitCar = false;
    }, 500)

    runCar()
  }, [])

  let timer = null;
  // 运行小车
  function runCar() {
    timer = setInterval(() => {
      if (isInitCar) { // 初始化小汽车入场
        speedUp()
        carRef.current.style.left = x + 'px'
        carRef.current.style.bottom = y + 'px'
        return
      }
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
    }, 3)
  }
  // runCar()

  // 轮毂旋转
  let wheelRate = 0
  let wheel_1 = useRef(null)
  let wheel_2 = useRef(null)
  console.log(`wheel_2`, wheel_2)
  function rotateWheel() {
    wheelRate += runSpeed * 8;
    wheel_1.current.style.transform = `rotateX(42deg) rotateY(316deg) rotateZ(${wheelRate}deg)`
    wheel_2.current.style.transform = `rotateX(33deg) rotateY(313deg) rotateZ(${wheelRate + 30}deg)`
  }

  // 静止状态
  function speedStop() {
    if (runSpeed >= -0.015 && runSpeed <= 0.015) {
      runSpeed = 0;
      return false;
    }
    // 自然减速
    runSpeed += runSpeed <= 0 ? reduceSpeed : -reduceSpeed
    x += coafX * runSpeed;
    y += coafY * runSpeed;
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
    x += coafX * runSpeed;
    y += coafY * runSpeed;
  }
  // 减速
  function speedDown() {
    // 减速
    runSpeed -= runSpeed <= 0 ? reduceSpeed : reduceSpeed * 2
    // 设置最高速度限制
    if (runSpeed <= maxBackSpeed) {
      runSpeed = maxBackSpeed
    }
    x += coafX * runSpeed;
    y += coafY * runSpeed;
  }
  // 左转
  function turnLeft() {
    x -= coafY * 0.2
    y += coafX * 0.2
  }
  // 右转
  function turnRight() {
    x += coafY * 0.2
    y -= coafX * 0.2
  }


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

  const handleCar = e => {
    console.log(`carRef`, carRef)
  }

  return (
    <div className="car" ref={carRef} onClick={handleCar}>
      <img className="car_image" src="./image/后-右.png" alt="" />
      <img className="wheel wheel_1" src="./image/轮毂.png" alt="" ref={wheel_1} />
      <img className="wheel wheel_2" src="./image/轮毂.png" alt="" ref={wheel_2} />
    </div>
  )
}

export default index
