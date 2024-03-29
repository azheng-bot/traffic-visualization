import react, { useEffect, useState } from "react";
import "./index.less";
import Loading from "../../../components/Loading";

import "https://unpkg.com/swiper/swiper-bundle.min.js";

import { getNewList } from "../../../api/deepModule";

function New() {
  const [newList, setNewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollList, setScrollList] = useState([0,0,0,0,0,0,0,0,0,0]);


  const swiperScorll = (e,index) => {
    scrollList[index] = e.target.scrollTop;
    setScrollList([...scrollList])
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
      }).then(() =>{
        setIsLoading(false)
      });
  }, []);
  return (
    <div className="new_box">
      <Loading isLoading={isLoading} opacity={0.5}></Loading>
      <div className="swiper-container">
        <div className="swiper-wrapper"
        >
          {newList.map((item,index) => (
            <div key={item.news_id} className="swiper-slide" >
              {/* 新闻内容 */}
              <div
                className={["wrapper slide-inner",scrollList[index] > 0?'show-content':'show-image'].join(' ')} onScroll={(e) => {
                  swiperScorll(e,index);
                }}
              >
                {/* 新闻标题 */}
                <p className="news_title"><span className="number">{(index+1).toString().padStart(1,'0')}、</span>{item.title}</p>
                {/* 新闻图片 */}
                <div
                  style={{
                    // backgroundImage: "url(" + item.image + ")",
                    backgroundImage: `url(/image/news/${index+1}.jpg)`,
                  }}
                  className='news_image'
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
