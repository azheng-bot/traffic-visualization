import React, { useRef, useEffect, useState } from 'react'
import { useNavigate,  } from 'react-router-dom';
import "./index.less"

function index(props) {
  const navigate = useNavigate()

  // 返回按钮点击事件
  function back(e) {
    navigate(-1)
    // window.history.back()
  }

  return (
    <div className="back-btn" onClick={e => back(e)}>
      <img src="/image/others/back.png" alt="" />
    </div>
  )
}

export default index;
