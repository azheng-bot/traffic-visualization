const query = require("../utils/query")


module.exports.getTools = async () => {

  let tools = await query("select t.tool_id,t.tool_name,group_concat(l.label_name) labels from tool t,tool_label l,tool_with_label tl where t.tool_id = tl.tool_id and l.label_id = tl.label_id group by t.tool_id;")
  let toolLabels = await query("select * from tool_label")
  let toolCategaries = await query("select * from tool_category")
  let toolsWithLabels = await query("select * from tool_with_label")
 
  return { tools,toolLabels,toolCategaries,toolsWithLabels,  }
}