import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
;

import "./index.less"

function index(props) {
  const navigate = useNavigate()
  // 返回按钮点击事件
  function back() {
    navigate(-1)
  }

  return (
    <div className="back-btn" onClick={back}>
      <img src="./image/others/back.png" alt="" />
    </div>
  )
}

export default index;
