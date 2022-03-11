import react, { useState, useEffect } from "react";
import "./index.less";
import { getLaws } from "../../../api/knowLedgeModule";
// loading 组件
import Loading from "../../../components/Loading";
function Laws() {
  // 数据
  const [lawList, setLawList] = useState([]);
  // 选中的法律列表
  const [chapList, setChapList] = useState([]);
  // 选中章节列表
  const [itemList, setItemList] = useState([]);
  // 条
  const [item, setItem] = useState([]);
  // 章节
  const [chap, setChap] = useState(0);
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
  // 数据是否加载成功
  const [flagLoading, setFlagLoading] = useState(true);
  // 初始化设置数据
  useEffect(() => {
    getLaws().then((res) => {
      setFlagLoading(false);
      setLawList(res.laws);
      // 法律
      res.laws.map((item) => {
        if (item.law_id == lawId) {
          setLawName(item.law_name);
          setChapList(item.chapters);
          item.chapters.map((key) => {
            // 章节
            if (key.chap_id == chapId) {
              setChap(key);
              setChapName(key.chap_name);
              setItemList(key.items);
              // 条目
              key.items.map((items) => {
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
  }, []);
  // law改变时，重置chapId和ItemId
  useEffect(() => {
    // 找到当前法律
    lawList.map((item) => {
      if (item.law_id == lawId) {
        // 修改章节为首个
        setChap(item.chapters[0]);
        setChapId(item.chapters[0].chap_id);
        setChapName(item.chapters[0].chap_name);
        setChapList(item.chapters);
        // 修改条目为首个
        setItemId(item.chapters[0].items[0]?.item_id);
        setItemName(item.chapters[0].items[0]?.item_name);
        setItem(item.chapters[0].items[0]);
      }
    });
  }, [lawId]);
  // chapId改变时，重置ItemId
  useEffect(() => {
    // 找到当前法律
    lawList.map((item) => {
      if (item.law_id == lawId) {
        // 找到当前章节
        item.chapters.map((key) => {
          if (key.chap_id == chapId) {
            setChap(key);
            setChapName(key.chap_name);
            setItemList(key.items);
            // 修改条目为首个
            setItemList(key.items);
            setItemId(key.items[0]?.item_id);
            setItemName(key.items[0]?.item_name);
            setItem(key.items[0]);
          }
        });
      }
    });
  }, [chapId]);
  // ItemId改变时
  useEffect(() => {
    // 找到当前法律
    lawList.map((item) => {
      if (item.law_id == lawId) {
        // 找到当前章节
        item.chapters.map((key) => {
          if (key.chap_id == chapId) {
            // 找到当前条目
            key.items.map((items) => {
              if (items.item_id == itemId) {
                setItemName(items.item_name);
                setItem(items);
              }
            });
          }
        });
      }
    });
  }, [itemId]);
  return (
    <div className="law_box">
      <Loading flagLoading={flagLoading} />
      <div className="box_law">
        <div className="box_law_list">
          <div className="law">
            <div className="title">法规</div>

            <ul>
              {lawList.map((item) => (
                <li
                  className={item.law_id == lawId ? "action" : ""}
                  key={item.law_id}
                  onClick={() => {
                    setLawId(item.law_id);
                  }}
                >
                  <p>{item.law_name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="chapter">
            <div className="title">章节</div>
            <ul>
              {chapList.map((item) => (
                <li
                  className={item.chap_id == chapId ? "action" : ""}
                  key={item.chap_id}
                  onClick={() => {
                    setChapId(item.chap_id);
                  }}
                >
                  <p>
                    {item.chap_name} {item.chap_title}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="strip">
            <div className="title"> 条目</div>
            <ul>
              {itemList.map((item) => (
                <li
                  className={item.item_id == itemId ? "action" : ""}
                  key={item.item_id}
                  onClick={() => {
                    setItemId(item.item_id);
                  }}
                >
                  <p>{item.item_name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {chap && (
          <div
            className="content"
            style={{
              backgroundImage:
                "url(/image/law-icon/" + chap.chap_icon + "2.png)",
            }}
          >
            <div className="law-name">{lawName}</div>
            <div className="chap-name">
              {chap.chap_name} {chap.chap_title}{" "}
            </div>
            <div className="item-name">{itemName}</div>
            <div
              className="item-content"
              dangerouslySetInnerHTML={{
                __html: item.item_content,
              }}
            ></div>
            {/* <img src={'/image/law-icon/' + chap.chap_icon + '.png'} alt="" /> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Laws;
