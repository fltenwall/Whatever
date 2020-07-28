// 客户端传入需要可视化的数据，然后实时更新知识图谱可视化效果
// serverD:客户端请求的节点数据
// serverE:客户端请求的关系数据
import * as d3 from 'd3';
export function update(serverD, serverE) {
    // 先清空布局中的图形元素
    d3.selectAll("svg").remove();
    // nodes,edges

}
