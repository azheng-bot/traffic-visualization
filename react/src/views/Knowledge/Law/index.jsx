import react, { useEffect, useState } from "react";
import { getLaws } from "../../../api/knowLedgeModule";
import "./index.less";
function Laws() {
  // 数据
  const [lawList, setLawList] = useState([]);
  // 显示那个
  const [active, setActive] = useState(1);
  useEffect(() => {
    getLaws().then((res) => {
      setLawList(res.laws[0]);
      console.log(res.laws);
    });
  }, []);
  const lawClick = (id) => {
    setActive(id);
  };
  return (
    <div className="box">
      <div className="law_name">{lawList.law_name}</div>
      <div className="law_body">
        <ul>
          {lawList.chapters
            ? lawList.chapters.map((item) => (
                <li
                  className={item.chap_id === active ? "active" : ""}
                  key={item.chap_id}
                >
                  {item.chap_id === active ? (
                    <div className="law_text">
                      <div className="title">
                        {item.chap_name} &nbsp;&nbsp;
                        <span>{item.chap_title}</span>
                      </div>
                      {item.chapters.map((key) => (
                        <div className="law_text_item" key={key.item_id}>
                          {key.item_name}&nbsp;&nbsp;&nbsp;
                          <span
                            dangerouslySetInnerHTML={{
                              __html: key.item_content,
                            }}
                          ></span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className="law_item"
                      onClick={() => {
                        lawClick(item.chap_id);
                      }}
                    >
                      {item.chap_name} ---- <span>{item.chap_title}</span>
                    </div>
                  )}
                </li>
              ))
            : ""}
        </ul>
      </div>
    </div>
  );
}

export default Laws;
