export function load() {
  var dataset = [250, 210, 170, 130, 90];  //数据（表示矩形的宽度）

  var rectHeight = 25;   //每个矩形所占的像素高度(包括空白)


  var width = 300;  //画布的宽度
  var height = 300;   //画布的高度

  var svg = d3.select("#abc")     //选择文档中的body元素
    .append("svg")          //添加一个svg元素
    .attr("width", width)       //设定宽度
    .attr("height", height);    //设定高度

  svg.selectAll("rect")   //选择svg内所有的矩形
    .data(dataset)  //绑定数组
    .enter()        //指定选择集的enter部分
    .append("rect") //添加足够数量的矩形元素
    .attr("x", 20)
    .attr("y", function (d, i) {
      return i * rectHeight;
    })
    .attr("width", function (d) {
      return d;
    })
    .attr("height", rectHeight - 2)
    .attr("fill", "steelblue");
}
