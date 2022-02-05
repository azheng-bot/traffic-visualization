import React, { useRef, useEffect, useState } from 'react'
import "./index.less"

function index(props) {
  // 模态框是否显示
  const [isModalVisiable, setIsModalVisiable] = useState(false);

  console.log(props.isModalVisiable)
  useEffect(() => {
    // console.log(props.isModalVisiable)
  }, [props.isModalVisiable])

  return (
    <div className="modal-box">
      {/* 遮罩层 */}
      <div className={props.isModalVisiable ? "mask active" : 'mask'} onClick={() => setIsModalVisiable(false)}></div>
      {/* 模态框 */}
      <div className={props.isModalVisiable ? "modal  active" : 'modal'}>
        {/* 关闭按钮 */}
        <div className="close" onClick={() => setIsModalVisiable(false)}>+</div>
        {/* 插槽 */}
        {props.children}
      </div>
    </div>

  )
}

export default index;
