import react, { useState, useEffect } from "react";
import "./index.less";
import { getLaws } from "../../../api/knowLedgeModule";
function Laws() {
  // 数据
  const [list, setList] = useState([]);
  // 选中的法律列表
  const [lawList, setLawList] = useState([]);
  // 选中章节列表
  const [chapList, setChapList] = useState([]);
  // 条
  const [item, setItem] = useState([]);
  // 选中的法律id
  const [lawId, setLawId] = useState(1);
  // 选中的章节id
  const [chapId, setChapId] = useState(1);
  // 选中的条id
  const [itemId, setItemId] = useState(0);
  // 选中的法律名称
  const [lawName, setLawName] = useState("");
  // 选中的章节名称
  const [chapName, setChapName] = useState("");
  // 选中的条名称
  const [itemName, setItemName] = useState("");
  useEffect(() => {
    getLaws().then((res) => {
      setList(res.laws);
      res.laws.map((item) => {
        if (item.law_id == lawId) {
          setLawName(item.law_name);
          console.log(item.law_name);
          setLawList(item.chapters);
          item.chapters.map((key) => {
            if (key.chap_id == chapId) {
              setChapName(key.chap_name);
              setChapList(key.chapters);
              key.chapters.map((items) => {
                if (items.item_id == itemId) {
                  setItemName(items.item_name);
                  setItem(items);
                }
              });
            }
          });
        }
      });
    });
  }, [lawId, chapId, itemId]);
  return (
    <div className="box_law">
      <div className="box_law_list">
        <div className="law">
          <ul>
            {list.map((item) => (
              <li
                className={item.law_id == lawId ? "action" : ""}
                key={item.law_id}
                onClick={() => {
                  setLawId(item.law_id);
                }}
              >
                {item.law_name}
              </li>
            ))}
          </ul>
        </div>
        <div className="chapter">
          <ul>
            {lawList.map((item) => (
              <li
                className={item.chap_id == chapId ? "action" : ""}
                key={item.chap_id}
                onClick={() => {
                  setChapId(item.chap_id);
                  setItemId(item.chapters[0].item_id);
                  console.log(item);
                }}
              >
                {item.chap_name} {item.chap_title}
              </li>
            ))}
          </ul>
        </div>
        <div className="strip">
          <ul>
            {chapList.map((item) => (
              <li
                className={item.item_id == itemId ? "action" : ""}
                key={item.item_id}
                onClick={() => {
                  setItemId(item.item_id);
                }}
              >
                {item.item_name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="content">
        <span>
          <br />
        </span>
        <ul>
          <li> {lawName}</li>
          <li> {chapName}</li>
          <li> {itemName}</li>
        </ul>
        <span
          dangerouslySetInnerHTML={{
            __html: item.item_content,
          }}
        ></span>
      </div>
    </div>
  );
}

export default Laws;
