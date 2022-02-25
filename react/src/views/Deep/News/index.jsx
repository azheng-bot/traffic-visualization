import react, { useEffect, useState } from "react";
import "./index.less";

import "https://unpkg.com/swiper/swiper-bundle.min.js";

import { getNewList } from "../../../api/deepModile";

function New() {
  const [newList, setNewList] = useState([]);
  const [imageHeight, setImageHeight] = useState("100%");
  const [toTop, settoTop] = useState(0);

  const swiperScorll = (e) => {
    settoTop(e.target.scrollTop);
    if (e.target.scrollTop > 0) {
      setImageHeight("20%");
    } else {
      setImageHeight("100%");
    }
    console.log(e.target.scrollTop);
  };
  useEffect(() => {
    getNewList()
      .then((res) => {
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
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {newList.map((item) => (
            <div key={item.news_id} className="swiper-slide">
              <span className="item_title">{item.title}</span>
              <div
                className="wrapper"
                onScroll={(e) => {
                  swiperScorll(e);
                }}
              >
                <div
                  style={{
                    backgroundImage: "url(" + item.image + ")",
                    height: imageHeight,
                  }}
                  className={
                    toTop > 0
                      ? "new_item slide-inner active"
                      : "new_item slide-inner noactive"
                  }
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
