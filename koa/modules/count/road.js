const query = require("../../utils/query")

// 1.1 某省公路客运同比增速
module.exports.getGrownRate = async (prov_name, type) => {
  prov_name = prov_name || '北京';
  type = type || '旅客周转量';

  let getRoadPassengerGrownRateSql = `
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
  dm.domain_name = '公路旅客运输量' 
  and dm.domain_id = tm.domain_id 
  and tm.year = 2021
  and tl.time_id = tm.time_id
  and ll.time_id = tm.time_id
  and tl.label_name = '同比增速' 
  and ll.label_name = '${prov_name}' 
  and tl.parent_label_id = (select label_id from transport_top_label where label_name = '${type}' and transport_top_label.time_id = tm.time_id) 
  and dt.top_label_id = tl.label_id 
  and dt.left_label_id = ll.label_id
  `
  let roadGrownRateData = await query(getRoadPassengerGrownRateSql)
  return { data: roadGrownRateData }
}

// 2 某省公路客运数据
module.exports.getNumberData = async (prov_name, type) => {
  prov_name = prov_name || '北京';
  type = type || '旅客周转量';

  let getNumberDataSql = `
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
  dm.domain_name = '公路旅客运输量' 
  and dm.domain_id = tm.domain_id 
  and tm.year = 2021
  and tl.time_id = tm.time_id
  and ll.time_id = tm.time_id
  and tl.label_name = '本月' 
  and ll.label_name = '${prov_name}' 
  and tl.parent_label_id = (select label_id from transport_top_label where label_name = '${type}' and transport_top_label.time_id = tm.time_id) 
  and dt.top_label_id = tl.label_id 
  and dt.left_label_id = ll.label_id
  `
  let numberData = await query(getNumberDataSql)
  return { data: numberData }
}

// 3 全国/所有省公路客运总和数据
module.exports.getTotalData = async (prov_name, type) => {
  prov_name = prov_name || '北京';
  type = type || '旅客周转量';

  let getTotalDataSql = `
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
  dm.domain_name = '公路旅客运输量' 
  and dm.domain_id = tm.domain_id 
  and tm.year = 2021
  and tm.month = 12
  and tl.time_id = tm.time_id
  and ll.time_id = tm.time_id
  and tl.label_name = '自年初累计' 
  and tl.parent_label_id = (select label_id from transport_top_label where label_name = '${type}' and transport_top_label.time_id = tm.time_id) 
  and dt.top_label_id = tl.label_id 
  and dt.left_label_id = ll.label_id
  `
  let data = await query(getTotalDataSql)
  console.log('data', data)

  return { data }
}