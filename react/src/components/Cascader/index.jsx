import React, { useContext, useEffect, useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios'
// CityInfoContext
import { cityInfoContext } from '../../utils/reducer'

import "./index.less"

function index(props) {
  let match = useLocation()

  const [city, setCity] = useState('0')
  const [temperature, setTemperature] = useState('0')
  const [weather, setWeather] = useState("晴")
  const weatherImgMap = {
    '晴': "/image/weather/晴天.png",
    '少云': "/image/weather/阴天.png",
    '晴间多云': "/image/weather/多云.png",
    '多云': "/image/weather/多云.png",
    '阴': "/image/weather/阴天.png",
    '有风': "/image/weather/雾.png",
    '平静': "/image/weather/雾.png",
    '微风': "/image/weather/雾.png",
    '和风': "/image/weather/雾.png",
    '清风': "/image/weather/雾.png",
    '强风/劲风': "/image/weather/雾.png",
    '疾风': "/image/weather/雾.png",
    '大风': "/image/weather/雾.png",
    '烈风': "/image/weather/雾.png",
    '风暴': "/image/weather/雾.png",
    '狂爆风': "/image/weather/雾.png",
    '飓风': "/image/weather/雾.png",
    '热带风暴': "/image/weather/雾.png",
    '霾': "/image/weather/雾.png",
    '中度霾': "/image/weather/雾.png",
    '重度霾': "/image/weather/雾.png",
    '严重霾': "/image/weather/雾.png",
    '阵雨': "/image/weather/阵雨.png",
    '雷阵雨': "/image/weather/雷阵雨.png",
    '雷阵雨并伴有冰雹': "/image/weather/雷阵雨.png",
    '小雨': "/image/weather/小雨.png",
    '中雨': "/image/weather/中雨.png",
    '大雨': "/image/weather/大雨.png",
    '暴雨': "/image/weather/暴雨.png",
    '大暴雨': "/image/weather/暴雨.png",
    '特大暴雨': "/image/weather/暴雨.png",
    '强阵雨': "/image/weather/暴雨.png",
    '强雷阵雨': "/image/weather/雷阵雨.png",
    '极端降雨': "/image/weather/暴雨.png",
    '毛毛雨/细雨': "/image/weather/小雨.png",
    '雨': "/image/weather/小雨.png",
    '小雨-中雨': "/image/weather/小雨.png",
    '中雨-大雨': "/image/weather/小雨.png",
    '大雨-暴雨': "/image/weather/大雨.png",
    '暴雨-大暴雨': "/image/weather/大雨.png",
    '大暴雨-特大暴雨': "/image/weather/暴雨.png",
    '雨雪天气': "/image/weather/小雪.png",
    '雨夹雪': "/image/weather/小雪.png",
    '阵雨夹雪': "/image/weather/小雪.png",
    '冻雨': "/image/weather/中雨.png",
    '雪': "/image/weather/小雪.png",
    '阵雪': "/image/weather/阵雪.png",
    '小雪': "/image/weather/小雪.png",
    '中雪': "/image/weather/中雪.png",
    '大雪': "/image/weather/大雪.png",
    '暴雪': "/image/weather/暴雪.png",
    '小雪-中雪': "/image/weather/中雪.png",
    '中雪-大雪': "/image/weather/大雪.png",
    '大雪-暴雪': "/image/weather/暴雪.png",
    '浮尘': "/image/weather/扬尘.png",
    '扬沙': "/image/weather/扬尘.png",
    '沙尘暴': "/image/weather/沙尘暴.png",
    '强沙尘暴': "/image/weather/沙尘暴.png",
    '龙卷风': "/image/weather/沙尘暴.png",
    '雾': "/image/weather/雾.png",
    '浓雾': "/image/weather/雾.png",
    '强浓雾': "/image/weather/雾.png",
    '轻雾': "/image/weather/雾.png",
    '大雾': "/image/weather/雾.png",
    '特强浓雾': "/image/weather/雾.png",
    '热': "/image/weather/晴天.png",
    '冷': "/image/weather/小雪.png",
    '未知': "/image/weather/无数据.png",
  }

  const WebAPIKey = import.meta.env.VITE_WebKey
  let { state, dispatch } = useContext(cityInfoContext)
  useEffect(() => {
    // 给reducer全局变量设置上城市信息cityInfo
    let cityInfo = {}
    axios.get(`https://restapi.amap.com/v5/ip?parameters`, { params: { key: WebAPIKey, type: 4, ip: returnCitySN.cip } }).then(
      // 根据ip，获取高德Web API地址信息
      res => {
        setCity(res.data.city)
        cityInfo.cityName = res.data.city
        return axios.get("http://localhost:8800/city/adcode", { params: { city: res.data.city } })
      }
    ).then(
      // 根据城市，获取城市adcode
      res => {
        let adcode = res.data.adcode
        cityInfo.adcode = res.data.adcode
        dispatch({ type: "setCityInfo", payload: { cityInfo } })
        return axios.get(`https://restapi.amap.com/v3/weather/weatherInfo?parameters`, { params: { key: WebAPIKey, city: adcode } })
      }
    ).then(
      // 根据adcode，获取高德Web API天气信息
      res => {
        // console.log('state', state)
        let weatherInfo = res.data.lives[0];
        setTemperature(weatherInfo.temperature);
      }
    ).catch(err => console.log(err))
  }, [])


  return (
    <div className="weather-tips" style={{ display: (match.pathname == '/' || match.pathname == "/mycity") ? "block" : "none" }}>
      <div className="city">{city}</div>
      <div className="point">·</div>
      {/* <div className="city-select"></div> */}
      <div className="weather">
        <span>{weather}</span>
        <img src={weatherImgMap[weather]} alt="" />
      </div>
      <div className="point">·</div>
      <div className="temperature">
        {`${temperature}℃`}
      </div>
    </div>
  )
}

export default index;
