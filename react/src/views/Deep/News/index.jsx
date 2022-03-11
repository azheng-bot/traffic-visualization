import react, { useEffect, useState } from "react";
import "./index.less";

import "https://unpkg.com/swiper/swiper-bundle.min.js";

import { getNewList } from "../../../api/deepModule";
// Loading 组件
import Loading from "../../../components/Loading";
function New() {
  const [newList, setNewList] = useState([]);
  const [scrollList, setScrollList] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const [newFlag, setNewFlag] = useState(true);
  const swiperScorll = (e, index) => {
    scrollList[index] = e.target.scrollTop;
    setScrollList([...scrollList]);
  };
  useEffect(() => {
    getNewList()
      .then((res) => {
        setNewFlag(false);
        setNewList(res.news);
      })
      .then(() => {
        var interleaveOffset = 0.5; //视差比值
        var swiperOptions = {
          speed: 1000,
          grabCursor: true,
          watchSlidesProgress: true,
          mousewheelControl: true,
          keyboardControl: true,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          on: {
            progress: function (swiper) {
              for (var i = 0; i < swiper.slides.length; i++) {
                var slideProgress = swiper.slides[i].progress;
                var innerOffset = swiper.width * interleaveOffset;
                var innerTranslate = slideProgress * innerOffset;
                swiper.slides[i].querySelector(".slide-inner").style.transform =
                  "translate3d(" + innerTranslate + "px, 0, 0)";
              }
            },
            touchStart: function (swiper) {
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
              }
            },
            setTransition: function (swiper, speed) {
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = speed + "ms";
                swiper.slides[i].querySelector(
                  ".slide-inner"
                ).style.transition = speed + "ms";
              }
            },
          },
        };

        var swiper = new Swiper(".swiper-container", swiperOptions);
      });
  }, []);
  return (
    <div className="new_box">
      <Loading flagLoading={newFlag} />
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {newList.map((item, index) => (
            <div key={item.news_id} className="swiper-slide">
              {/* 新闻内容 */}
              <div
                className={[
                  "wrapper slide-inner",
                  scrollList[index] > 0 ? "show-content" : "show-image",
                ].join(" ")}
                onScroll={(e) => {
                  swiperScorll(e, index);
                }}
              >
                {/* 新闻标题 */}
                <p className="news_title">
                  <span className="number">
                    {(index + 1).toString().padStart(1, "0")}、
                  </span>
                  {item.title}
                </p>
                {/* 新闻图片 */}
                <div
                  style={{
                    backgroundImage: "url(" + item.image + ")",
                  }}
                  className="news_image"
                ></div>
                <div className="item_content">
                  <ul>
                    {item.paragraphs.map((key) => (
                      <li key={key.para_id}>{key.para_content}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="swiper-pagination swiper-pagination-white"></div>

        <div className="swiper-button-next swiper-button-white"></div>
        <div className="swiper-button-prev swiper-button-white"></div>
      </div>
    </div>
  );
}

export default New;
