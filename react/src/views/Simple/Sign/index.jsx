import React, { useEffect, useState } from "react";
import { getSign } from "../../../api/knowLedgeModule";
import "./index.less";
// Loading
import Loading from "../../../components/Loading";
function Sign() {
  // 数据列表
  const [list, setList] = useState([]);
  // 当前选中分类
  const [currentCate, setCurrentCate] = useState(1);
  // 当前选中图标
  const [currentSign, setCurrentSign] = useState(1);
  // 模态框是否显示
  const [isModalVisiable, setIsModalVisiable] = useState(false);
  // 数据是否加载完成
  let [listFlag, setListFlag] = useState(true);
  // 初始化获取数据
  useEffect(() => {
    getSign().then((res) => {
      setListFlag(false);
      setList(res.signCategaries);
      // console.log('res.signCategaries.find(item => item.cate_id == 1)', res.signCategaries);
      setCurrentCate(res.signCategaries.find((item) => item.cate_id == 1));
    });
  }, []);

  return (
    <div className="traffic-sign">
      <Loading flagLoading={listFlag} />
      <ul>
        {list.map((item) => (
          <li
            className={
              item.cate_id === currentCate.cate_id
                ? "active sign-module"
                : "sign-module"
            }
            key={item.cate_id}
            onClick={() => setCurrentCate(item)}
          >
            <div className="module-title complete-center">
              <span>{item.cate_name}</span>
              <img src={item.signList[4].sign_url} alt="" />
            </div>
            <div className="module-content">
              <div className="title">
                <span>{item.cate_name}</span>
                <img src={item.signList[4].sign_url} alt="" />
              </div>
              <div className="sign-list">
                {item.signList.map((key) => (
                  <div
                    className="sign-item"
                    title={key.sign_name}
                    key={key.sign_id}
                    onClick={() =>
                      setCurrentSign(key) || setIsModalVisiable(true)
                    }
                  >
                    <img src={key.sign_url} title={key.sign_name}></img>
                    <br />
                    <span>{key.sign_name}</span>
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div
        className={isModalVisiable ? "mask active" : "mask"}
        onClick={() => setIsModalVisiable(false)}
      ></div>
      <div className={isModalVisiable ? "modal  active" : "modal"}>
        <div className="picture">
          <img src={currentSign.sign_url} alt="" />
        </div>
        <div className="name">{currentSign.sign_name}</div>
        <div className="module-name">
          <span>{currentCate.cate_name}</span>
        </div>
        <div className="close" onClick={() => setIsModalVisiable(false)}>
          +
        </div>
      </div>
    </div>
  );
}

export default Sign;
