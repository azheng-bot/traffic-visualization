import React, { useEffect, useState } from "react";
import { getSign } from "../../../api/deepModule";
import "./index.less";
function Sign() {
  // 标志图标分类
  const [list, setList] = useState([]);
  // 控制那个标志图标内容显示
  const [flag, setFlag] = useState(1);
  useEffect(() => {
    getSign().then((res) => {
      setList(res.signCategaries);
      console.log(list);
    });
  }, []);

  return (
    <ul className="traffic-sign">
      {list.map((item) => (
        <li
          className={item.cate_id === flag ? "active sign-module" : "sign-module"}
          key={item.cate_id}
          onClick={() => setFlag(item.cate_id)}
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
                <div className="sign-item" key={key.sign_id}>
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
  );
}

export default Sign;
