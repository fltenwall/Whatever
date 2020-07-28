import * as d3 from 'd3';
import { lens } from './fisheye.js'
import axios from 'axios';

export function pltKg(datases) {
  const margin = {
    top: 30,
    right: 30,
    bottom: 5,
    left: 5
  }
  var width = window.sessionStorage.getItem('w') || 800
  var height = 600
  var colorScale = d3.scaleOrdinal() //=d3.scaleOrdinal(d3.schemeSet2)
    .domain(d3.range(datases.nodes.labels))
    .range(['#ff9e6d', '#86cbff', '#c2e5a0', '#fff686', '#9e79db'])

  window.simulation = d3.forceSimulation()
    .force("link", d3.forceLink() // This force provides links between nodes,链接力
      .id(d => d.id) // This sets the node id accessor to the specified function. If not specified, will default to the index of a node.
      .distance(150)
      .strength(1)
    )
    .force("charge", d3.forceManyBody().strength(-300)) // This adds repulsion (if it's negative) between nodes.万有引力
    .force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area,用指定的x坐标和y坐标创建一个居中力。
    // 控制力学模拟衰减率，[0-1] ,设为0则不停止 ， 默认0.0228，直到0.001
    .alphaDecay(0.0228)
    //碰撞作用力，为节点指定一个radius区域来防止节点重叠，设置碰撞力的强度，范围[0,1], 默认为0.7。设置迭代次数，默认为1，迭代次数越多最终的布局效果越好，但是计算复杂度更高
    .force("collide", d3.forceCollide(60).strength(0.2).iterations(5));
  window.container = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  window.svg = container
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  //appending little triangles, path object, as arrowhead
  //The <defs> element is used to store graphical objects that will be used at a later time
  //The <marker> element defines the graphic that is to be used for drawing arrowheads or polymarkers on a given <path>, <line>, <polyline> or <polygon> element.
  var defs = svg.append('defs')

  // var marker=defs
  //   .append("marker")
  //   .attr('id', "marker")
  //   .attr("markerWidth", 20)    //marker视窗的宽
  //   .attr("markerHeight", 20)   //marker视窗的高
  //   .attr("refX", 35)            //refX和refY，指的是图形元素和marker连接的位置坐标
  //   .attr("refY", 0)
  //   .attr("orient", "auto")     //orient="auto"设置箭头的方向为自动适应线条的方向
  //   .attr("markerUnits", "userSpaceOnUse")  //marker是否进行缩放 ,默认值是strokeWidth,会缩放
  //   .append("path")
  //   .attr("d", "M 0 0 8 4 0 8Z")    //箭头的路径 从 （0,0） 到 （8,4） 到（0,8）
  //   .attr("fill", "steelblue");

  defs.append('marker')
    .attr("id", 'arrowhead')
    .attr('viewBox', '-0 -5 10 10') //the bound of the SVG viewport for the current SVG fragment. defines a coordinate system 10 wide and 10 high starting on (0,-5)
    .attr('refX', 33) // x coordinate for the reference point of the marker. If circle is bigger, this need to be bigger.
    .attr('refY', 0)
    .attr('orient', 'auto')
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    // .attr('xoverflow', 'visible')
    .append('svg:path')
    .attr("markerUnits", "userSpaceOnUse")
    .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
    .attr('fill', '#999')
    .style('stroke', 'none')
    .attr("fill", "steelblue");

  // 3.2 添加多个头像图片的 <pattern>
  var patterns = defs
    .selectAll("pattern.patternclass")
    .data(datases.nodes)
    .enter()
    .append("pattern")
    .attr("class", "patternclass")
    .attr("id", function (d, index) {
      return 'image' + d.id;
    })
    // 两个取值userSpaceOnUse  objectBoundingBox
    .attr('patternUnits', 'objectBoundingBox')
    // <pattern>，x、y值的改变决定图案的位置，宽度、高度默认为pattern图案占填充图形的百分比。
    .attr("x", "0")
    .attr("y", "0")
    .attr("width", "1")
    .attr("height", "1");

  // 3.3 向<defs> - <pattern>添加 头像
  patterns.append("image")
    .attr("class", "circle")
    .attr("xlink:href", function (d) {
      return require("@/images/"+92 + ".png"); // 修改节点头像
    })
    .attr("src", function (d) {
      console.log(d)
      return require("@/images/"+92 + ".png"); // 修改节点头像
    })
    // .attr("background-image", 'url(../)')
    .attr("height", 30*2)
    .attr("width", 30*2)
    .attr("preserveAspectRatio", "xMidYMin slice");

  container.call(d3.zoom() // 自动创建事件侦听器
    .scaleExtent([0.1, 10]) // 缩放允许的级数
    .on("zoom", zoom)
  )
    .on("dblclick.zoom", null);

  function zoom() {
    svg.attr("transform", d3.event.transform);
    // translate变换矢量（使用二元组标识）scale当前尺度的数字
    // svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"); // 画布缩放与移动
    // svg.attr("transform", "scale(" + d3.event.scale + ")"); // 画布缩放
  }

  //create some data
  let dataset =datases
  // var dataset = {
  //   nodes: [
  //     { id: 1, name: 'AGGR', label: 'Aggregation', group: 'Team C', runtime: 20 },
  //     { id: 2, name: 'ASMT', label: 'Assessment Repository', group: 'Team A', runtime: 60 },
  //     { id: 3, name: 'CALC', label: 'Final Calc', group: 'Team C', runtime: 30 },
  //     { id: 4, name: 'DEMO', label: 'Demographic', group: 'Team B', runtime: 40 },
  //     { id: 5, name: 'ELIG', label: 'Eligibility', group: 'Team B', runtime: 20 },
  //     { id: 6, name: 'GOAL', label: 'Goal Setting', group: 'Team C', runtime: 60 },
  //     { id: 7, name: 'GROW', label: 'Growth Model', group: 'Team C', runtime: 60 },
  //     { id: 8, name: 'LINK', label: 'Linkage', group: 'Team A', runtime: 100 },
  //     { id: 9, name: 'MOSL', label: 'MOSL', group: 'Team A', runtime: 80 },
  //     { id: 10, name: 'MOTP', label: 'MOTP', group: 'Team A', runtime: 20 },
  //     { id: 11, name: 'REPT', label: 'Reporting', group: 'Team E', runtime: 240 },
  //     { id: 12, name: 'SEDD', label: 'State Data', group: 'Team A', runtime: 30 },
  //     { id: 13, name: 'SNAP', label: 'Snapshot', group: 'Team A', runtime: 40 }
  //   ],
  //   links: [
  //     { source: 1, target: 3, type: 'Next -->>' },
  //     { source: 6, target: 1, type: 'Next -->>' },
  //     { source: 7, target: 1, type: 'Next -->>' },
  //     { source: 9, target: 1, type: 'Next -->>' },
  //     { source: 2, target: 4, type: 'Next -->>' },
  //     { source: 2, target: 6, type: 'Next -->>' },
  //     { source: 2, target: 7, type: 'Next -->>' },
  //     { source: 2, target: 8, type: 'Next -->>' },
  //     { source: 2, target: 9, type: 'Next -->>' },
  //     { source: 10, target: 3, type: 'Next -->>' },
  //     { source: 3, target: 11, type: 'Next -->>' },
  //     { source: 8, target: 5, type: 'Go to ->>' },
  //     { source: 8, target: 11, type: 'Go to ->>' },
  //     { source: 6, target: 9, type: 'Go to ->>' },
  //     { source: 7, target: 9, type: 'Go to ->>' },
  //     { source: 8, target: 9, type: 'Go to ->>' },
  //     { source: 9, target: 11, type: 'Go to ->>' },
  //     { source: 12, target: 9, type: 'Go to ->>' },
  //     { source: 13, target: 11, type: 'Go to ->>' },
  //     { source: 13, target: 2, type: 'Go to ->>' },
  //     { source: 13, target: 4, type: 'This way>>' },
  //     { source: 13, target: 5, type: 'This way>>' },
  //     { source: 13, target: 8, type: 'This way>>' },
  //     { source: 13, target: 9, type: 'This way>>' },
  //     { source: 13, target: 10, type: 'This way>>' },
  //     { source: 4, target: 7, type: 'Next -->>' },
  //     { source: 4, target: 2, type: 'Next -->>' }
  //   ]
  // };

  // console.log("dataset is ...", dataset);

  var adjlist = [];

  dataset.links.forEach(function (d) {
    console.log("++++++++++")
    console.log(d)
    adjlist[d.source + "-" + d.target] = true;
    adjlist[d.target + "-" + d.source] = true;
  });

  function neigh(a, b) {
    return a == b || adjlist[a + "-" + b];
  }

  // Initialize the links
  window.link = svg.selectAll(".links")
    .data(dataset.links)
    .enter()
    .append("line")
    .attr("class", "links")
    .attr("stroke", "#aaa")
    .style("stroke-width", 2)
    .attr('marker-end', 'url(#arrowhead)') //The marker-end attribute defines the arrowhead or polymarker that will be drawn at the final vertex of the given shape.
    .on('mouseover', function () {
      d3.select(this).selectAll('.links').style('stroke-width', 4);
    })
    .on('mouseout', function () {
      d3.select(this).selectAll('.links').style('stroke-width', 2);
    })


  //The <title> element provides an accessible, short-text description of any SVG container element or graphics element.
  //Text in a <title> element is not rendered as part of the graphic, but browsers usually display it as a tooltip.
  link.append("title")
    .text(d => d.type);

  window.edgepaths = svg.selectAll(".edgepath") //make path go along with the link provide position for link labels
    .data(dataset.links)
    .enter()
    .append('path')
    .attr('class', 'edgepath')
    .attr('fill-opacity', 0)
    .attr('stroke-opacity', 0)
    .attr('id', function (d, i) {
      return 'edgepath' + i
    })
    .style("pointer-events", "none");

  window.edgelabels = svg.selectAll(".edgelabel")
    .data(dataset.links)
    .enter()
    .append('text')
    .style("pointer-events", "none")
    .attr('class', 'edgelabel')
    .attr('id', function (d, i) {
      return 'edgelabel' + i
    })
    .attr('font-size', 12)
    .attr('fill', '#aaa');

  edgelabels.append('textPath') //To render text along the shape of a <path>, enclose the text in a <textPath> element that has an href attribute with a reference to the <path> element.
    .attr('xlink:href', function (d, i) {
      return '#edgepath' + i
    })
    .style("text-anchor", "middle")
    // .attr("x", function (d) {
    //   return (d.source.x + d.target.x) / 2
    // })
    // .attr("y", function (d) {
    //   return (d.source.y + d.target.y) / 2
    // })
    .style("pointer-events", "none")
    .attr("startOffset", "50%")
    .text(d => d.name);

  window.node = svg.selectAll(".nodes")
    .data(dataset.nodes)
    .enter()
    .append("g")
    .attr("class", "nodes")
    .call(d3.drag() //sets the event listener for the specified typenames and returns the drag behavior.
      .on("start", dragstarted) //start - after a new pointer becomes active (on mousedown or touchstart).
      .on("drag", dragged)      //drag - after an active pointer moves (on mousemove or touchmove).
      .on("end", dragended)     //end - after an active pointer becomes inactive (on mouseup, touchend or touchcancel).
    );
  //圆环边线颜色
  window.nodeCicles = node.append("circle")
    .attr("r", d => 30)//+ d.runtime/20 )
      //这居然这么关键？+++++++++++++++
    // .attr("cx", function (d) { return d.x; })
    // .attr("cy", function (d) { return d.y; })
    .style("stroke", d => colorScale(d.labels))
    // .style("stroke-opacity", 0.3)
    .style("stroke-width", d => 5)  //.style("stroke-width", d => d.runtime / 10)
    .style("fill", function (d) {
      return ("url(#image" + d.id+ ")");})
    .on("mouseover", function (d) {
      d3.select(this).style('stroke-width', 8);
    })
    .on("mouseout",function (d) {
      d3.select(this).style('stroke-width', 3);
    })
  //球悬浮title
  node.append("title")
    .text(d => d.name);

  window.nodeText = node.append('text')
    .attr("dy", 5)
    .attr("x", 35)
    // .text(d => d.name.length > 6 ? d.name.slice(0,5)+"..." : d.name)
  let strs = []
  dataset.nodes.forEach((val) => {
    strs.push(val.name)
  })
  nodeText.selectAll("tspan")
    .data(function(d){
      let nameStr = []
      if(d.name.length>11){
        nameStr[0] = d.name.slice(0,5).toString();
        nameStr[1] = d.name.slice(5,10).toString() + "...";
        return nameStr;
      }else {
        nameStr[0] = d.name.slice(0,5).toString();
        nameStr[1] = d.name.slice(5,).toString();
        return nameStr;
      }})
    .enter()
    .append("tspan")
    .attr("x",nodeText.attr('x'))
    .attr("dy","1.3em")
    .text(d => d);
  // node.append("text")
  //   .attr("dy", 12)
  //   .attr("dx", -8)
  //   .text(d => d.runtime);

  node.on("click", drawCircle)

  //Listen for tick events to render the nodes as they update in your Canvas or SVG.
  simulation
    .nodes(dataset.nodes)
    .on("tick", ticked);

  simulation.force("link")
    .links(dataset.links)


  // This function is run at each iteration of the force algorithm, updating the nodes position (the nodes data array is directly manipulated).
  function ticked() {
    link.attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node.attr("transform", d => "translate(" + d.x + "," + d.y + ")")

    edgepaths.attr('d', d => 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y);
  }

  //When the drag gesture starts, the targeted node is fixed to the pointer
  //The simulation is temporarily “heated” during interaction by setting the target alpha to a non-zero value.
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();//sets the current target alpha to the specified number in the range [0,1].
    d.fy = d.y; //fx - the node’s fixed x-position. Original is null.
    d.fx = d.x; //fy - the node’s fixed y-position. Original is null.
    d3.select("#eee").remove(); // 删除节点扇形
  }

  //When the drag gesture starts, the targeted node is fixed to the pointer
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  //the targeted node is released when the gesture ends
    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

  //drawing the legend
  const legend_g = container.append("svg").selectAll(".legend")
    .data(colorScale.domain())
    .enter().append("g")
    .attr("transform", (d, i) => `translate(${width-50},${i * 20+10})`);

  legend_g.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 5)
    .attr("fill", colorScale);

  legend_g.append("text")
    .attr("x", 10)
    .attr("y", 5)
    .text(d => d);

  // //drawing the second legend
  // const legend_g2 = svg.append("g")
  //   //.attr("transform", (d, i) => `translate(${width},${i * 20})`);
  //   .attr("transform", `translate(${width}, 120)`);

  // legend_g2.append("circle")
  //   .attr("r", 5)
  //   .attr("cx", 0)
  //   .attr("cy", 0)
  //   .style("stroke", "grey")
  //   .style("stroke-opacity", 0.3)
  //   .style("stroke-width", 15)
  //   .style("fill", "black")
  // legend_g2.append("text")
  //   .attr("x", 15)
  //   .attr("y", 0)
  //   .text("long runtime");

  // legend_g2.append("circle")
  //   .attr("r", 5)
  //   .attr("cx", 0)
  //   .attr("cy", 20)
  //   .style("stroke", "grey")
  //   .style("stroke-opacity", 0.3)
  //   .style("stroke-width", 2)
  //   .style("fill", "black")
  // legend_g2.append("text")
  //   .attr("x", 15)
  //   .attr("y", 20)
  //   .text("short runtime");
  //圆环数据
  const nodeData = {
    "name": "TOPICS", "children": [{
      "name": "TopicC", "icon": "\ue62a", "iconName": "拓展节点",
      "children": [{ "name": "Sub C1", "icon": "全部", "icon2": "拓展", "size": 3 }, { "name": "Sub C2", "icon": "条件", "icon2": "拓展", "size": 3 }]
    }, {
      "name": "TopicD", "icon": "\ue62c", "iconName": "删除节点",
      "children": [{ "name": "Sub D1", "icon": "删除", "icon2": "节点", "size": 3 }, { "name": "Sub D2", "icon": "删除", "icon2": "链路", "size": 3 }]
    },  {
      "name": "TopicG", "icon": "\ue624", "size": 6, "iconName": "查看档案",
      // "children": [{ "name": "Sub D1", "icon": "删除", "icon2": "节点", "size": 3 }, { "name": "Sub D2", "icon": "删除", "icon2": "链路", "size": 3 }]
    },
      {
      //锁定
      "name": "TopicE", "icon": "\ue6a0", "size": 6, "iconName": "锁定节点",
      // "children": [{ "name": "Sub E1", "icon": "加载", "size": 3 }, { "name": "Sub E2", "icon": "扩展", "size": 3 }]
    }, {
      "name": "TopicA", "size": 6, "icon": "\ue684", "iconName": "解锁节点",
      // "children": [{"name": "Sub A1", "size": 4}, {"name": "Sub A2", "size": 4}]
    }, {
      "name": "TopicF", "size": 6, "icon": "\ue621", "iconName": "取消蒙版",
      // "children": [{"name": "Sub A1", "size": 4}, {"name": "Sub A2", "size": 4}]
    }, {
      "name": "TopicB", "icon": "\ue64c", "iconName": "查看模式",
      "children": [{ "name": "Sub B1", "icon": "普通", "icon2": "查看","size": 2 }, { "name": "Sub B2", "icon": "查看", "icon2": "直连", "size": 2 }, {
        "name": "Sub B3", "icon": "查看", "icon2": "链路", "size": 2
      }]
    }
    ]
  }
  let showModel = 0
  //圆环入口
  function drawCircle(nd) {
    // Variables
    var width1 = 250;
    var height1 = 250;
    var radius = 150;
    // var color = d3.scaleOrdinal(d3.schemeCategory20b);

    // Create primary <g> element
    var g = svg.append('g')
      .attr("id", "eee")
      .attr('transform', 'translate(' + nd.x + ',' + nd.y + ')')

    // Data strucure
    var partition = d3.partition()
      .size([2 * Math.PI, radius]);

    // Find data root
    var root = d3.hierarchy(nodeData)
      .sum(function (d) { return d.size });

    // g.append("circle")
    //   .attr("r", 100)
    //   .attr("cx", nd.x)
    //   .attr("cy", nd.y)
    //   .style("stroke","blue")
    //
    // g.append("circle")
    //   .attr("r", 150)
    //   .attr("cx", nd.x)
    //   .attr("cy", nd.y)
    //   .style("stroke","blue")

    // Size arcs
    partition(root);
    var arc = d3.arc()
      .startAngle(function (d) { return d.x0 })
      .endAngle(function (d) { return d.x1 })
      .innerRadius(function (d) { return d.y0 })
      .outerRadius(function (d) { return d.y1 });

    // Put it all together
    var path = g.selectAll('path')
      .data(root.descendants())
      .enter().append('path')
      .attr("display", function (d) {
        return d.depth == 1 ? null : "none";
      })
      .attr("d", arc)
      // .attr("fill-opacity", 0.8)
      .style("fill", function (d) {
        return d.depth == 1 ? "#F0F6FE" : "#45A5EF";
      })
      .attr("class", function (d) {
        return d.depth == 2 ? "hiddenUp" : null;
      })
      .style("opacity", function (d) {
        return d.depth == 2 ? 0.7 : 1;})
      .style("cursor", "pointer")
      .on("mouseenter", function (d) {
        d3.select(this).style("fill", function (d) {
          return d.depth == 1 ? "#F0F6F0" : "#45A5B0";
        })
        const dd = d.children
        path
          .filter(d => dd === undefined ? false : dd.indexOf(d) > -1)
          .attr("display", null)
          .attr("class", "showUp")

        iconsLab.filter(d => dd === undefined ? false : dd.indexOf(d) > -1)
          .attr("display", null)
          .attr("class", "visUp")
      })
      .on("mouseleave", function (d) {
        d3.select(this).style("fill", function (d) {
          return d.depth == 1 ? "#F0F6FE" : "#45A5EF";
        })
      })
      .on("mouseover", function (d) {
        let showed = d3.selectAll(".showUp")
        if (!showed.empty()) {
          if (showed.datum().parent.children.indexOf(d) == -1 && d.data.name !== showed.datum().parent.data.name) {
            d3.selectAll(".showUp")
              .attr("display", "none")
              .attr("class", "hiddenUp")
            d3.selectAll(".visUp")
              .attr("display", "none")
              .attr("class", "hidUp")
          }
        }
      })

    g.on("mouseleave", d => d3.select("#eee").remove())
    // path.on("mouseout", function (d) {
    //   var array = printPosition();
    //   var distance = Math.sqrt(Math.pow((nd.x - array[0]), 2) + Math.pow((nd.y - array[1]), 2));
    //   if (d.data.name == "TopicA" || d.data.name == "TopicE" || d.data.name == "TopicF") {
    //     if (distance > radius / 2) {
    //       d3.select("#eee").remove(); // 删除节点扇形
    //     }
    //   } else {
    //     if (distance > radius) {
    //       d3.select("#eee").remove(); // 删除节点扇形
    //     }
    //   }
    // });

    path.on("click", function (d) {
      switch (d.data.name) {
        case "TopicA":
          startForce();
          d3.select("#eee").remove();
          console.log("您点击的是TopicA按钮");
          break;
        case "TopicB":
          console.log("您点击的是TopicB按钮");
          break;
        case "TopicC":
          console.log("您点击的是TopicC按钮");
          break;
        case "TopicD":
          console.log("您点击的是TopicD按钮");
          break;
        case "TopicE":
          stopForce()
          d3.select("#eee").remove()
          console.log("您点击的是TopicE按钮");
          break;
        case "TopicF":
          unfocus();
          d3.select("#eee").remove();
          console.log("您点击的是TopicA按钮");
          break;
        case "TopicG":
          unfocus();
          d3.select("#eee").remove();
          console.log("您点击的是TopicG按钮");
          break;
        case "Sub B1":
          showModel = 0;
          d3.select("#eee").remove()
          console.log("您点击的是Sub B1按钮");
          break;
        case "Sub B2":
          showModel = 1;
          d3.select("#eee").remove()
          console.log("您点击的是Sub B2按钮");
          break;
        case "Sub B3":
          showModel = 2;
          d3.select("#eee").remove()
          console.log("您点击的Sub B3按钮");
          break;
        case "Sub C1":
          myExtendNode(nd.name);
          d3.select("#eee").remove();
          console.log("您点击的是Sub C1按钮");
          break;
        case "Sub C2":
          console.log("您点击的是Sub C2按钮");
          break;
        case "Sub D1":
          deleteNode(nd)
          d3.select("#eee").remove()
          console.log("您点击的是Sub D1按钮");
          break;
        case "Sub D2":
          deleteLink(nd)
          d3.select("#eee").remove()
          console.log("您点击的是Sub D2按钮");
          break;
        case "Sub E1":
          console.log("您点击的是Sub E1按钮");
          break;
        case "Sub E2":
          console.log("您点击的是Sub E2按钮");
          break;
        default:
          console.log("您未点击有效按钮");
      }
    })

    let iconsLab = g.append("g")
      .selectAll("text")
      .data(root.descendants())
      .join("text")
      // .attr("fill-opacity", 0.3)
      .attr("transform", function (d) {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        return `rotate(${x - 90}) translate(${y},0) rotate(${90-x})`;
      })
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('class', d => d.depth > 0 ? (d.depth == 1 ? 'iconfont' : "hidUp") : null)
      .attr("display", d => d.depth > 0 ? (d.depth == 1 ? null : "none") : null)
      // .attr('style', "color:#ff00ff;")
      .attr('font-size', '10px')
      .style("cursor", "pointer")
      .text(d => d.depth >0 ? d.data.icon : null);

    iconsLab.append("tspan")
      .attr("x",0)
      .attr("dy","1.3em")
      .attr('font-size', '10px')
      .text(d => d.data.iconName)

    iconsLab.append("tspan")
      .attr("x",0)
      .attr("dy","1.3em")
      .attr('font-size', '10px')
      .text(d => d.data.icon2)

    iconsLab.on("mouseenter", function (d) {
        const dd = d
        path.filter(d => dd == d).style("fill", function (d) { return d.depth == 1 ? "#F0F6F0" : "#45A5B0"; })
      })
      .on("mouseleave", function (d) {
        const ddd = d
        path.filter(d => ddd == d)
          .style("fill", function (d) {
            return d.depth == 1 ? "#F0F6FE" : "#45A5EF";
          })
      })

    iconsLab.on("click", function (d) {
      switch (d.data.name) {
        case "TopicA":
          startForce();
          d3.select("#eee").remove();
          console.log("您点击的是TopicA按钮");
          break;
        case "TopicB":
          console.log("您点击的是TopicB按钮");
          break;
        case "TopicC":
          console.log("您点击的是TopicC按钮");
          break;
        case "TopicD":
          console.log("您点击的是TopicD按钮");
          break;
        case "TopicE":
          stopForce()
          d3.select("#eee").remove()
          console.log("您点击的是TopicE按钮");
          break;
        case "TopicF":
          unfocus();
          d3.select("#eee").remove();
          console.log("您点击的是TopicA按钮");
          break;
        case "TopicG":
          unfocus();
          d3.select("#eee").remove();
          console.log("您点击的是TopicG按钮");
          break;
        case "Sub B1":
          showModel = 0;
          d3.select("#eee").remove()
          console.log("您点击的是Sub B1按钮");
          break;
        case "Sub B2":
          showModel = 1;
          d3.select("#eee").remove()
          console.log("您点击的是Sub B2按钮");
          break;
        case "Sub B3":
          showModel = 2;
          d3.select("#eee").remove()
          console.log("您点击的Sub B3按钮");
          break;
        case "Sub C1":
          myExtendNode(nd.name);
          d3.select("#eee").remove();
          console.log("您点击的是Sub C1按钮");
          break;
        case "Sub C2":
          console.log("您点击的是Sub C2按钮");
          break;
        case "Sub D1":
          deleteNode(nd)
          d3.select("#eee").remove()
          console.log("您点击的是Sub D1按钮");
          break;
        case "Sub D2":
          deleteLink(nd)
          d3.select("#eee").remove()
          console.log("您点击的是Sub D2按钮");
          break;
        case "Sub E1":
          console.log("您点击的是Sub E1按钮");
          break;
        case "Sub E2":
          console.log("您点击的是Sub E2按钮");
          break;
        default:
          console.log("您未点击有效按钮");
      }
    })
  }

  //鼠标位置,获取画布坐标
  function printPosition() {
    var position = d3.mouse(svg.node());
    return position;
  }


  function stopForce() {
    for (var i = 0; i < node.length; i++) {
      var obj = node[i];
      obj.fixed = true;
    }
    simulation.stop();
  }

  // 全局开始力作用之间的影响
  function startForce() {
    for (var i = 0; i < node.length; i++) {
      var obj = node[i];
      obj.fixed = false;
    }
    simulation.restart();
  }

  function deleteNode(nd) {
    console.log("原始数据")
    console.log(nd)
    let newNodes = [];
    let newLinks = [];
    var index = nd.id;
    node.each((o) => {
      return index == o.id ? null : newNodes.push(o);
    })
    link.each((o) => {
      return o.source.id == index || o.target.id == index ? null : newLinks.push(o);
    })
    dataset = { nodes: newNodes, links: newLinks }

    svg.selectAll(".nodes")
      .data(dataset.nodes, (d) => { return d.id })
      .exit()
      .remove()

    svg.selectAll(".links")
      .data(dataset.links, (d) => { return d.index })
      .exit()
      .remove()

    svg.selectAll(".edgepath") //make path go along with the link provide position for link labels
      .data(dataset.links, (d) => { return d.index })
      .exit()
      .remove()

    svg.selectAll(".edgelabel")
      .data(dataset.links, (d) => { return d.index })
      .exit()
      .remove()
  }

  function deleteLink(nd) {
    let ind = nd.id
    let newNodes = [];
    let newLinks = [];
    var childLinkList = []
    var childNodeList = []
    var sourceList = []
    var targetList = []
    dataset.links.forEach((val) => {
      sourceList.push(val.source.id);
      targetList.push(val.target.id)
    })

    function findChild(data, id) {
      data.forEach((item) => {
        if (item.source.id == id) {
          childLinkList.push(item.index)
          childNodeList.push(item.target)
          id = item.target.id
          findChild(data, id);
        }
      })
    }
    findChild(dataset.links, ind)
    childNodeList.push(nd)
    newNodes = dataset.nodes
    childNodeList.forEach((val) => {
      let inx = newNodes.indexOf(val)
      if (inx > -1) {
        newNodes.splice(inx, 1)
      }
      // node.each((o) => {
      //   console.log(val)
      //   return o.id == val.id  ? null : (newNodes.indexOf(o) < 0 ? newNodes.push(o) : null);
      // })

      link.each((o) => {
        return o.source.id == val.id || o.target.id == val.id ? newLinks.push(o) : null;
      });
    })
    let temLink = dataset.links
    newLinks.forEach((val) => {
      let inde = temLink.indexOf(val);
      if (inde > -1) {
        temLink.splice(inde, 1)
      }
    })
    dataset = { nodes: newNodes, links: temLink }
    svg.selectAll(".nodes")
      .data(dataset.nodes, (d) => { return d.id })
      .exit()
      .remove()

    svg.selectAll(".links")
      .data(dataset.links, (d) => { return d.index })
      .exit()
      .remove()

    svg.selectAll(".edgepath") //make path go along with the link provide position for link labels
      .data(dataset.links, (d) => { return d.index })
      .exit()
      .remove()

    svg.selectAll(".edgelabel")
      .data(dataset.links, (d) => { return d.index })
      .exit()
      .remove()
  }

  function focus(d) {
    var index = d3.select(d3.event.target).datum().id;
    node.style("opacity", function (o) {
      return neigh(index, o.id) ? 1 : 0.1;
    });
    edgelabels.attr("display", function (o) {
      return o.source.id == index || o.target.id == index ? "block" : "none";
    });
    link.style("opacity", function (o) {
      return o.source.id == index || o.target.id == index ? 1 : 0.1;
    });
  }

  function unfocus(d) {
    node.style("opacity", 1);
    edgelabels.attr("display", "block");
    link.style("opacity", 1);
  }

  function focusLink(d) {
    var ind = d3.select(d3.event.target).datum().id;

    var childLinkList = []
    var childNodeList = []
    var parentLinkList = []
    var parentNodeList = []
    var PnameList = []
    var sourceList = []
    var targetList = []
    dataset.links.forEach((val) => {
      sourceList.push(val.source.id);
      targetList.push(val.target.id)
    })

    function findChild(data, id) {
      data.forEach((item) => {
        if (item.source.id == id) {
          childLinkList.push(item.index)
          childNodeList.push(item.target.id)
          id = item.target.id
          findChild(data, id);
        }
      })
    }
    findChild(dataset.links, ind)

    function findParent(data, id) {
      data.forEach((item) => {
        if (item.target.id == id) {
          PnameList.push(item.source.name)
          parentLinkList.push(item.index)
          parentNodeList.push(item.source.id)
          id = item.source.id
          findParent(data, id);
        }
      })
    }
    findParent(dataset.links, ind)
    const nodeList = parentNodeList.concat(childNodeList);
    const linkList = parentLinkList.concat(childLinkList)
    node.style("opacity", function (o) {
      return nodeList.indexOf(o.id) > -1 || o.id == ind ? 1 : 0.1;
    });
    edgelabels.attr("display", function (o) {
      return linkList.indexOf(o.index) > -1 ? "block" : "none";
    });
    link.style("opacity", function (o) {
      return linkList.indexOf(o.index) > -1 ? 1 : 0.1;
    });
  }

  // function unfocusLink(d) {
  //   node.style("opacity", 1);
  //   edgelabels.attr("display", "block");
  //   link.style("opacity", 1);
  // }

  //显示链路、直接相连、普通模式
  node.on("mouseover", (d) => {
    showModel == 0 ? null : (showModel == 1 ? focus(d) : focusLink(d))
  })
    .on("mouseout", (d) => {
      showModel == 0 ? null : unfocus(d)
    });

  d3.select("#deleteG").on("click", function () {
    dataset.nodes = null
    dataset.links = null
    d3.select("svg").remove()
  })

  function isInArray(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if (value === arr[i].name) {
        return true;
      }
    }
    return false;
  }

  // 判断元素是否在ARRAY中
  function EdgeIsInArray(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if ((value.source === arr[i].target) && (value.target === arr[i].source)) {
        return true;
      }
    }
    return false;
  }
  //拓展
  function myExtendNode(name) {
    axios.get('http://192.168.191.3:8023/MapDisplay/subGraph?nodeName=' + name)
      .then(res=>{
        let comData = res.data
        var arrEdges = [], arrNodes = [];

        // comData.nodes.forEach((val) => {
        //   if(dataset.nodes.indexOf(val)<0){
        //     arrNodes.push(val)
        //   }
        // })
        //
        // comData.links.forEach((val)=>{
        //   if(dataset.links.indexOf(val)<0){
        //     arrEdges.push(val)
        //   }
        // })

        for (let i=0;i<comData.nodes.length;i++) {
          if (!isInArray(datases.nodes, comData.nodes[i].name)){
            arrNodes.push(comData.nodes[i])
          }
        }
        // nodes = dataset.nodes.concat(arrNodes)
        // console.log(nodes)
        for (let i=0;i<comData.links.length;i++) {
          let obj2 = comData.links[i]
          if (!EdgeIsInArray(datases.links, comData.links[i])){
            arrEdges.push(obj2)
          }
        }

        dataset = {nodes: datases.nodes.concat(arrNodes),links: datases.links.concat(arrEdges)}

        d3.selectAll("svg").remove();
        pltKg(dataset)
        }
      )
  }

}
export function magLens(ob) {
  if (ob) {
    // if (!d3.event.active) simulation.alphaTarget(0.3).restart();//sets the current target alpha to the specified number in the range [0,1].
    var fisheye = lens().circular()
      .radius(100)
      .distortion(5);

    var glass = svg.append("circle")
      .attr("class", "glass")
      .attr("r", fisheye.radius())
      .style("stroke-opacity", 0.6)
      .attr("stroke", "gray")
      .attr("stroke-width", 2)
      .attr("fill", "none")

    //鼠标进入
    window.svg.on("mousemove", function () {
      fisheye.focus(d3.mouse(this));

      var mouseX = d3.mouse(this)[0];
      var mouseY = d3.mouse(this)[1];
      var r = fisheye.radius();

      glass.attr("cx", mouseX)
        .attr("cy", mouseY);

      window.nodeCicles.each(function (d) {
        d.fisheye = fisheye(d);
      });

      window.nodeCicles
        // .attr("transform", d => `translate(${d.fisheye.x - d.x},${d.fisheye.y - d.y})`)
        .attr("cx", function (d) {
          return d.fisheye.x - d.x;
        })
        .attr("cy", function (d) {
          return d.fisheye.y - d.y;
        })
        .attr("r", function (d) {
          return d.fisheye.z * 30;
        });

      window.nodeText
        .attr("dx", function (d) {
          return d.fisheye.x - d.x;
        })
        .attr("dy", function (d) {
          return d.fisheye.y - d.y;
        });

      window.edgepaths.attr('d', d => 'M ' + d.source.fisheye.x + ' ' + d.source.fisheye.y + ' L ' + d.target.fisheye.x + ' ' + d.target.fisheye.y);

      // edgelabels.attr("x", function (d) {
      //   return (d.source.fisheye.x + d.target.fisheye.x-d.source.x-d.target.x) / 2
      // })
      //   .attr("y", function (d) {
      //     return (d.source.fisheye.y + d.target.fisheye.y-d.source.y-d.target.y) / 2
      //   })

      window.link.attr("x1", function (d) {
        return d.source.fisheye.x;
      })
        .attr("y1", function (d) {
          return d.source.fisheye.y;
        })
        .attr("x2", function (d) {
          return d.target.fisheye.x;
        })
        .attr("y2", function (d) {
          return d.target.fisheye.y;
        });
    });
  } else {
    // if (!d3.event.active) simulation.alphaTarget(0);
    d3.select(".glass").remove()
    window.svg.on("mousemove", null)
    // window.nodeCicles
    // // .attr("transform", d => `translate(${d.fisheye.x - d.x},${d.fisheye.y - d.y})`)
    //   .attr("cx", function (d) {
    //     return d.fisheye.x - d.x;
    //   })
    //   .attr("cy", function (d) {
    //     return d.fisheye.y - d.y;
    //   })
    //   .attr("r", function (d) {
    //     return  30;
    //   });
    //
    // link.attr("x1", d => d.source.x)
    //   .attr("y1", d => d.source.y)
    //   .attr("x2", d => d.target.x)
    //   .attr("y2", d => d.target.y);
    //
    // node.attr("transform", d => `translate(${d.x},${d.y})`)
    //
    // edgepaths.attr('d', d => 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y);
  }
}

export function locateNode(nodeName) {
  let nodeNameList = []
  node.each((val) => {
    nodeNameList.push(val.name)
  })
  let finded = nodeNameList.indexOf(nodeName) > -1 ? true : false;
  if (finded) {
    node.style("opacity", function (o) {
      return o.name == nodeName ? 1 : 0.1;
    });
    edgelabels.attr("display", "none");
    link.style("opacity", 0.1);
  }
  return finded
}
