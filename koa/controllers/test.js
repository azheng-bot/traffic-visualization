const fs = require("fs")


// 各省数据
async function createProvinceJson() {
  const {
    getRoadGuestData,
    getRoadGoodsData,
    getWaterGoodsData,
    getWaterGuestData,
    getGoodsTurnoverData,
    getGuestTurnoverData,
    getCenterCityData,
    getGrownData,
    getPortData,
    getTotalData
  } = require("../modules/count/province")
  async function getData() {
    let provinces = ['北京', '天津',
      '上海', '重庆',
      '河北', '山西',
      '台湾', '辽宁',
      '吉林', '黑龙江',
      '江苏', '浙江',
      '安徽', '福建',
      '江西', '山东',
      '河南', '湖北',
      '湖南', '广东',
      '甘肃', '四川',
      '贵州', '海南',
      '云南', '青海',
      '陕西', '广西',
      '西藏', '宁夏',
      '新疆', '内蒙古'
    ]

    for (var i = 0; i < provinces.length; i++) {
      let prov_name = provinces[i]
      // 1.公路客运运输量
      let { data: roadGuestData } = await getRoadGuestData(prov_name)
      // 2.公路货运运输量
      let { data: roadGoodsData } = await getRoadGoodsData(prov_name)
      // 3.水路客运运输量
      let { data: waterGuestData } = await getWaterGuestData(prov_name)
      // 4.水路货运运输量
      let { data: waterGoodsData } = await getWaterGoodsData(prov_name)
      // 5.公路&水路客运周转量
      let { data: guestTurnoverData } = await getGuestTurnoverData(prov_name)
      // 6.公路&水路货运周转量
      let { data: goodsTurnoverData } = await getGoodsTurnoverData(prov_name)
      // 7.中心城市客运
      let { data: centerCityData } = await getCenterCityData(prov_name)
      // 8.不同运输方式每月增长速率
      let { data: grownData } = await getGrownData(prov_name)
      // 9.港口货物集中向吞吐量
      let { data: portData } = await getPortData(prov_name)
      // 10.总体运输方式数据
      let { data: totalData } = await getTotalData(prov_name)

      return {
        roadGuestData,
        roadGoodsData,
        waterGuestData,
        waterGoodsData,
        guestTurnoverData,
        goodsTurnoverData,
        centerCityData,
        grownData,
        portData,
        totalData
      }
    }
  }
  let data = await getData();
  fs.writeFile(`../json/${provinces[i]}.json`, JSON.stringify(data), res => console.log(res))
}


// 全国数据
async function createCountryJson() {
  const {
    getAirData,
    getCenterCity,
    getPortData,
    getRoadGoods,
    getRoadGoodsTurnover,
    getRoadGuest,
    getRoadGuestTurnover,
    getWaterGoods,
    getWaterGoodsTurnover,
    getWaterGuest,
    getWaterGuestTurnover,
    getProvinceTotalData
  } = require("../modules/count/country")

  async function getData() {
    let roadGoods = await getRoadGoods()
    let roadGoodsTurnover = await getRoadGoodsTurnover()
    let roadGuest = await getRoadGuest()
    let roadGuestTurnover = await getRoadGuestTurnover()
    let waterGoods = await getWaterGoods()
    let waterGoodsTurnover = await getWaterGoodsTurnover()
    let waterGuest = await getWaterGuest()
    let waterGuestTurnover = await getWaterGuestTurnover()
    let airData = await getAirData()
    let centerCityData = await getCenterCity()
    let portData = await getPortData()
    let provinceTotalData = await getProvinceTotalData()

    return {
      roadData: {
        roadGoods,
        roadGoodsTurnover,
        roadGuest,
        roadGuestTurnover,
      },
      waterData: {
        waterGoods,
        waterGoodsTurnover,
        waterGuest,
        waterGuestTurnover
      },
      airData,
      centerCityData,
      portData,
      provinceTotalData,
    }
  }

  let data = await getData();
  fs.writeFile(`../json/全国.json`, JSON.stringify(data), res => console.log(res))
}

// createProvinceJson()   
createCountryJson();
