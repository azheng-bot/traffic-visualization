const { getTools } = require("../modules/tool")


// 获取所有交通工具及其分类标签
module.exports.getTools = async (ctx, next) => {
  let { tools, toolLabels, toolCategaries, toolsWithLabels } = await getTools()

  tools.forEach(item => item.name = item.tool_name)
  toolLabels.forEach(item => item.name = item.label_name)
  toolCategaries.forEach(item => item.name = item.cate_name)

  // 给所有tool&label添加其对应tool
  toolsWithLabels.forEach(tl => {
    tl.tool = tools.find(toolItem => toolItem.tool_id == tl.tool_id)
  })
  // 根据tool&label，给所有label添加上其对应的tools
  toolLabels.forEach(labelItem => {
    let targetToolsWithLabels = toolsWithLabels.filter(tl => tl.label_id == labelItem.label_id) // 对应tool&label 
    labelItem.children = targetToolsWithLabels.map(tl => tl.tool) //对应tool
  })
  // 给所有categary添加上其对应的labels
  toolCategaries.forEach(cateItem => {
    cateItem.children = toolLabels.filter(labelItem => labelItem.cate_id && labelItem.cate_id == cateItem.cate_id)
  })

  ctx.body = {
    tools,
    categaries: toolCategaries
  }
  next()
}