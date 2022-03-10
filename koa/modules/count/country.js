const query = require("../../utils/query")

// 1.获取公路客运量数据
// 2.获取公路货运量数据
// 3.获取公路客运周转量数据
// 4.获取公路货运周转量数据
// 5.获取水路客运量数据
// 6.获取水路货运量数据
// 7.获取水路客运周转量数据
// 8.获取水路货运周转量数据
// 9.获取港口货运数据
// 10.获取航空货运数据
// 11.获取中心城市客运数据
// 12.获取各省水路、公路、港口&客运、货运数据


async function getSimpleData(tableName, topLabel, topParentLabel, leftLabel) {
  let sql = `
  select 
  dm.domain_name,
  tm.year,tm.month,
  ll.label_name,
  dt.data_content 
  from 
  transport_time tm,
  transport_domain dm,
  transport_top_label tl,
  transport_left_label ll,
  transport_data dt
  where 
  dm.domain_name = '${tableName}' 
  and dm.domain_id = tm.domain_id 
  and tm.year = 2021
  and tl.time_id = tm.time_id
  and ll.time_id = tm.time_id
  and tl.label_name = '${topLabel}' 
  and ll.label_name = '${leftLabel}' 
  and tl.parent_label_id = (select label_id from transport_top_label where label_name = '${topParentLabel}' and transport_top_label.time_id = tm.time_id) 
  and dt.top_label_id = tl.label_id 
  and dt.left_label_id = ll.label_id
  `
  let data = await query(sql)
  return data
}

// 1.获取公路客运量数据
module.exports.getRoadGuest = async () => {
  let data = await getSimpleData('公路旅客运输量', '本月', '客运量', '总计');
  return data

}
// 2.获取公路货运量数据
module.exports.getRoadGoods = async () => {
  let data = await getSimpleData('公路货物运输量', '本月', '货运量', '总计');
  return data

}
// 3.获取公路客运周转量数据
module.exports.getRoadGuestTurnover = async () => {
  let data = await getSimpleData('公路旅客运输量', '本月', '旅客周转量', '总计');
  return data

}
// 4.获取公路货运周转量数据
module.exports.getRoadGoodsTurnover = async () => {
  let data = await getSimpleData('公路货物运输量', '本月', '货物周转量', '总计');
  return data
}
// 5.获取水路客运量数据
module.exports.getWaterGuest = async () => {
  let data = await getSimpleData('水路旅客运输量', '本月', '客运量', '总计');
  return data

}
// 6.获取水路货运量数据
module.exports.getWaterGoods = async () => {
  let data = await getSimpleData('水路货物运输量', '本月', '货运量', '总计');
  return data

}
// 7.获取水路客运周转量数据
module.exports.getWaterGuestTurnover = async () => {
  let data = await getSimpleData('水路旅客运输量', '本月', '旅客周转量', '总计');
  return data

}
// 8.获取水路货运周转量数据
module.exports.getWaterGoodsTurnover = async () => {
  let data = await getSimpleData('水路货物运输量', '本月', '货物周转量', '总计');
  return data

}
// 9.获取港口货运数据
module.exports.getPortData = async () => {
  let total = await getSimpleData('全国港口货物、集装箱吞吐量', '本月', '货物吞吐量', '全国总计');
  let foreign = await getSimpleData('全国港口货物、集装箱吞吐量', '本月', '外贸货物吞吐量', '全国总计');
  let container = await getSimpleData('全国港口货物、集装箱吞吐量', '本月', '集装箱吞吐量', '全国总计');
  return {
    total,
    foreign,
    container,
  }
}
// 10.获取航空货运数据
module.exports.getAirData = async () => {
  async function getAirData(tableName, topLabel, topParentLabel, leftLabel, leftParentLabel) {
    let sql = `
      select 
      dm.domain_name,
      tm.year,tm.month,
      ll.label_name,
      dt.data_content 
      from 
      transport_time tm,
      transport_domain dm,
      transport_top_label tl,
      transport_left_label ll,
      transport_data dt
      where 
      dm.domain_name = '${tableName}' 
      and dm.domain_id = tm.domain_id 
      and tm.year = 2021
      and tl.time_id = tm.time_id
      and ll.time_id = tm.time_id
      and tl.label_name = '${topLabel}' 
      and ll.label_name = '${leftLabel}' 
      and tl.parent_label_id = (select label_id from transport_top_label where label_name = '${topParentLabel}' and transport_top_label.time_id = tm.time_id) 
      and ll.parent_label_id = (select label_id from transport_left_label where label_name = '${leftParentLabel}' and transport_left_label.time_id = tm.time_id) 
      and dt.top_label_id = tl.label_id 
      and dt.left_label_id = ll.label_id
      `
    let data = await query(sql)
    return data
  }

  let countryGuest = await getAirData('中国民航主要生产指标统计', '实际完成数', '本月', '国内航线', '旅客运输量');
  let countryGoods = await getAirData('中国民航主要生产指标统计', '实际完成数', '本月', '国内航线', '货邮运输量');
  let worldGuest = await getAirData('中国民航主要生产指标统计', '实际完成数', '本月', '国际航线', '旅客运输量');
  let worldGoods = await getAirData('中国民航主要生产指标统计', '实际完成数', '本月', '国际航线', '货邮运输量');
  return {
    countryGuest,
    countryGoods,
    worldGuest,
    worldGoods,
  }

}
// 11.获取中心城市客运数据
module.exports.getCenterCity = async () => {
  let total = await getSimpleData('中心城市客运量', '本月', '客运总量', '总计');
  let bus = await getSimpleData('中心城市客运量', '本月', '公共汽电车', '总计');
  let rail = await getSimpleData('中心城市客运量', '本月', '轨道交通', '总计');
  let taxi = await getSimpleData('中心城市客运量', '本月', '巡游出租汽车', '总计');
  return {
    total,
    bus,
    rail,
    taxi,
  }
}

// 12.获取各省水路、公路、港口&客运、货运数据
module.exports.getProvinceTotalData = async () => {
  async function getTotalData(tableName, topLabel, topParentLabel) {
    let sql = `
      select 
      dm.domain_name,
      tm.year,tm.month,
      ll.label_name,
      dt.data_content 
      from 
      transport_time tm,
      transport_domain dm,
      transport_top_label tl,
      transport_left_label ll,
      transport_data dt
      where 
      dm.domain_name = '${tableName}' 
      and dm.domain_id = tm.domain_id 
      and tm.year = 2021
      and tm.month = 12
      and tl.time_id = tm.time_id
      and ll.time_id = tm.time_id
      and tl.label_name = '${topLabel}' 
      and tl.parent_label_id = (select label_id from transport_top_label where label_name = '${topParentLabel}' and transport_top_label.time_id = tm.time_id) 
      and dt.top_label_id = tl.label_id 
      and dt.left_label_id = ll.label_id
      `
    let data = await query(sql)
    return data
  }

  let roadGoods = await getTotalData('公路货物运输量', '自年初累计', '货运量');
  let roadGuest = await getTotalData('公路旅客运输量', '自年初累计', '客运量');
  let waterGoods = await getTotalData('水路货物运输量', '自年初累计', '货运量');
  let waterGuest = await getTotalData('水路旅客运输量', '自年初累计', '客运量');
  let portGoods = await getTotalData('全国港口货物、集装箱吞吐量', '自年初累计', '货物吞吐量');

  return {
    roadGoods,
    roadGuest,
    waterGoods,
    waterGuest,
    portGoods
  }
}
