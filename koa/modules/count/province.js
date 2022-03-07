const query = require("../../utils/query")

// 1.公路客运运输量
// 2.公路货运运输量
// 3.水路客运运输量
// 4.水路货运运输量
// 5.公路&水路客运周转量
// 6.公路&水路货运周转量
// 7.中心城市客运
// 8.总体运输方式比率
// 9.不同运输方式每月增长速率
// 10.港口货物集中向吞吐量


// 1.公路客运运输量
module.exports.getRoadGuestData = async (prov_name) => {
  prov_name = prov_name || '北京';
  let data = await getData(prov_name, '公路', '旅客', '本月', false)
  return { data }
}
// 2.公路货运运输量
module.exports.getRoadGoodsData = async (prov_name) => {
  prov_name = prov_name || '北京';
  let data = await getData(prov_name, '公路', '货物', '本月', false)
  return { data }
}
// 3.水路客运运输量
module.exports.getWaterGuestData = async (prov_name) => {
  prov_name = prov_name || '北京';
  let data = await getData(prov_name, '水路', '旅客', '本月', false)
  return { data }
}
// 4.水路货运运输量
module.exports.getWaterGoodsData = async (prov_name) => {
  prov_name = prov_name || '北京';
  let data = await getData(prov_name, '水路', '货物', '本月', false)
  return { data }
}
// 5.公路&水路客运周转量
module.exports.getGuestTurnoverData = async (prov_name) => {
  prov_name = prov_name || '北京';
  let water = await getData(prov_name, '水路', '旅客', '本月', true)
  let road = await getData(prov_name, '公路', '旅客', '本月', true)
  return {
    data: {
      water,
      road
    }
  }
}
// 6.公路&水路货运周转量
module.exports.getGoodsTurnoverData = async (prov_name) => {
  prov_name = prov_name || '北京';
  let water = await getData(prov_name, '水路', '货物', '本月', true)
  let road = await getData(prov_name, '公路', '货物', '本月', true)
  return {
    data: {
      water,
      road
    }
  }
}
// 7.中心城市客运
module.exports.getCenterCityData = async (prov_name) => {
  // 首都
  let capital = (await query(`select c.city_name from site_province p,site_city c where c.prov_id = p.prov_id and p.prov_name like '${prov_name}%' group by p.prov_id`))[0].city_name
  capital = capital.substring(0, capital.length - 1)
  console.log('capital', capital)

  function createSql(type) {
    return sql = `
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
    dm.domain_name = '中心城市客运量' 
    and dm.domain_id = tm.domain_id 
    and tm.year = 2021
    and tl.time_id = tm.time_id
    and ll.time_id = tm.time_id
    and tl.label_name = '本月' 
    and ll.label_name = '${capital}' 
    and tl.parent_label_id = (select label_id from transport_top_label where  label_name = '${type}' and transport_top_label.time_id = tm.time_id) 
    and dt.top_label_id = tl.label_id 
    and dt.left_label_id = ll.label_id
    `
  }
  let total = await query(createSql('客运总量'))
  let bus = await query(createSql('公共汽电车'))
  let rail = await query(createSql('轨道交通'))
  let taxi = await query(createSql('巡游出租汽车'))
  return {
    data: {
      total,
      bus,
      rail,
      taxi,
    }
  }
}

// 8.不同运输方式每月增长速率
module.exports.getGrownData = async (prov_name = '北京', way = '公路', detail = '旅客', isTurnover = false) => {
  let data = await getData(prov_name, way, detail, '同比增速', isTurnover)
  return { data }
}
// 9.港口货物集中向吞吐量
module.exports.getPortData = async (prov_name) => {
  if (!['上海', '天津', '上海', '重庆'].includes(prov_name)) {
    prov_name += '合计'
  }
  function createSql(type) {
    return sql = `
    select 
    dm.domain_name,
    tm.year,
    tm.month,
    ll.label_name,
    SUM(dt.data_content) data_content
    from 
    transport_time tm,
    transport_domain dm,
    transport_top_label tl,
    transport_left_label ll,
    transport_data dt
    where 
    dm.domain_name = '全国港口货物、集装箱吞吐量' 
    and dm.domain_id = tm.domain_id 
    and tm.year = 2021
    and tl.time_id = tm.time_id
    and ll.time_id = tm.time_id
    and tl.label_name = '本月' 
    and ll.label_name = '${prov_name}' 
    and tl.parent_label_id = (select label_id from transport_top_label where  label_name = '${type}' and transport_top_label.time_id = tm.time_id) 
    and dt.top_label_id = tl.label_id 
    and dt.left_label_id = ll.label_id
    group by tm.month
    `
  }
  let total = await query(createSql('货物吞吐量'))
  let container = await query(createSql('集装箱吞吐量'))
  let foreign = await query(createSql('外贸货物吞吐量'))
  return {
    data: {
      total,
      container,
      foreign,
    }
  }
}
// 10.总体运输方式数据
module.exports.getTotalData = async (prov_name) => {
  function createSql(domain, type) {
    let prov = prov_name
    if (domain == '全国港口货物、集装箱吞吐量' && !['上海', '天津', '上海', '重庆'].includes(prov_name)) {
      prov += '合计'
    }
    return sql = `
    select 
    dm.domain_name,
    tm.year,
    tm.month,
    ll.label_name,
    dt.data_content 
    from 
    transport_time tm,
    transport_domain dm,
    transport_top_label tl,
    transport_left_label ll,
    transport_data dt
    where 
    dm.domain_name = '${domain}' 
    and dm.domain_id = tm.domain_id 
    and tm.year = 2021
    and tm.month = 12
    and tl.time_id = tm.time_id
    and ll.time_id = tm.time_id
    and tl.label_name = '自年初累计' 
    and ll.label_name = '${prov}' 
    and tl.parent_label_id = (select label_id from transport_top_label where  label_name = '${type}' and transport_top_label.time_id = tm.time_id) 
    and dt.top_label_id = tl.label_id 
    and dt.left_label_id = ll.label_id
    `
  }
  let waterGoods = await query(createSql('水路货物运输量', '货运量'))
  let waterGuest = await query(createSql('水路旅客运输量', '客运量'))
  let roadGoods = await query(createSql('公路货物运输量', '货运量'))
  let roadGuest = await query(createSql('公路旅客运输量', '客运量'))
  let portGoods = await query(createSql('全国港口货物、集装箱吞吐量', '集装箱吞吐量'))
  return {
    data: {
      waterGoods,
      waterGuest,
      roadGoods,
      roadGuest,
      portGoods,
    }
  }
}


/**
 * @function 获取数据
 * @param way {String} 公路/水路
 * @param detail {String} 旅客/货物
 * @param data_type {String} 数据类型 - 总量/增长速率
 * @param isTurnover {Boolean} 是否是周转量
*/
async function getData(prov_name, way, detail, data_type, isTurnover) {
  let type;
  if (isTurnover && detail == '旅客') {
    type = '旅客周转量'
  } else if (!isTurnover && detail == '旅客') {
    type = '客运量'
  } else if (isTurnover && detail == '货物') {
    type = '货物周转量'
  } else if (!isTurnover && detail == '货物') {
    type = '货运量'
  }

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
  dm.domain_name = '${way}${detail}运输量' 
  and dm.domain_id = tm.domain_id 
  and tm.year = 2021
  and tl.time_id = tm.time_id
  and ll.time_id = tm.time_id
  and tl.label_name = '${data_type}' 
  and ll.label_name = '${prov_name}' 
  and tl.parent_label_id = (select label_id from transport_top_label where label_name = '${type}' and transport_top_label.time_id = tm.time_id) 
  and dt.top_label_id = tl.label_id 
  and dt.left_label_id = ll.label_id
  `
  let data = await query(sql)
  return data
}