import React, { useEffect, useState } from "react";
import { getIcon } from "../../../api/deepModule";
import "./index.less";
function Icon() {
  // 标志图标分类
  const [list, setList] = useState([]);
  // 控制那个标志图标内容显示
  const [flag, setFlag] = useState(1);
  useEffect(() => {
    getIcon().then((res) => {
      setList(res.signCategaries);
      console.log(list);
    });
  }, []);

  return (
    <div className="box">
      <ul>
        {list.map((item) => (
          <li
            className={item.cate_id === flag ? "icon_width icon" : "icon"}
            key={item.cate_id}
          >
            <div className="icon_word" onClick={() => setFlag(item.cate_id)}>
              <span>{item.cate_name}</span>
            </div>
            {flag === item.cate_id ? (
              <div className="icon_item">
                <div className="icon_item_title">{item.cate_name}</div>
                {item.signList.map((key) => (
                  <div className="icon_item_box" key={key.sign_id}>
                    <img src={key.sign_url} title={key.sign_name}></img>
                    <br />
                    <span>{key.sign_name}</span>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Icon;
