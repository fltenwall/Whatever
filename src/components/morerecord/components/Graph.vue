<template>
    <v-chart :options="polar"/>
</template>

<script>

    import ECharts from 'vue-echarts'
    import 'echarts/lib/chart/graph'
    import 'echarts/lib/component/polar'

    export default {
      components: {
        'v-chart': ECharts
      },
      name:"Graph",
      data () {
        return {
          polar: {
            title: {
              text: ''
            },
            tooltip: {
              // color:'red'
              trigger:'item',
              // backgroundColor:'red',
              // border:'1px solid green',
              formatter: function (params) {
                var res='<div style="border:1px solid #000;width:400px;height:200px;background-color:#e8e8e8;">'
                  +'<h1>时间</h1>'+
                  +'<table border="1" cellspacing="0" style="margin:60px;">' +
                  '<tr>'+
                  '<th>时间</th>'+
                  '<th>时间</th>'+
                  '<th>时间</th>'+
                  '</tr>'+
                    '<tr >'+
                      '<td>'+params[0]+'</td>' +
                      '<td>'+params[0]+'</td>' +
                      '<td>'+params[0]+'</td>' +
                    '</tr>'+
                '<tr>'+
                '<td>时间：'+params[0]+'</td>' +
                '<td>时间：'+params[0]+'</td>' +
                '<td>时间：'+params[0]+'</td>' +
                '</tr>'+
                    '<tr>'+
                  '<td>时间：'+params[0]+'</td>' +
                  '<td>时间：'+params[0]+'</td>' +
                  '<td>时间：'+params[0]+'</td>' +
                  '</tr>'+
                  '</table>'+'</div>';
                for(var i=0;i<params.length;i++){
                  res+='<p>'+params[i].seriesName+':'+params[i].data+'</p>'
                }
                console.log(params);
                // params.color = '#f00';

                return res;
              },
              extraCssText:'width:360px;height:80px;background:#fff;color:#000'
            },
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12
                },
              }
            },
            legend: {
              x: "center",
              show: false,
              data: ["1", "2", '3']
            },
            series: [

              {
                type: 'graph',
                layout: 'force',
                symbolSize: 45,
                focusNodeAdjacency: true,
                roam: true,
                categories: [{
                  name: '1',
                  itemStyle: {
                    normal: {
                      color: "#009800",
                    }
                  }
                }, {
                  name: '2',
                  itemStyle: {
                    normal: {
                      color: "#4592FF",
                    }
                  }
                }, {
                  name: '3',
                  itemStyle: {
                    normal: {
                      color: "#3592F",
                    }
                  }
                }],
                label: {
                  normal: {
                    show: true,
                    textStyle: {
                      fontSize: 12
                    },
                  }
                },
                force: {
                  repulsion: 1000
                },
                edgeSymbolSize: [4, 50],
                edgeLabel: {
                  normal: {
                    show: true,
                    textStyle: {
                      fontSize: 10
                    },
                    formatter: "{c}"
                  }
                },
                data: [{
                  name: '节点0',
                  draggable: true,
                }, {
                  name: '节点1',
                  category: 1,
                  draggable: true,
                }, {
                  name: '节点2',
                  category: 1,
                  draggable: true,
                }, {
                  name: '节点3',
                  category: 1,
                  draggable: true,
                }, {
                  name: '节点4',
                  category: 1,
                  draggable: true,
                }, {
                  name: '节点5',
                  category: 1,
                  draggable: true,
                }, {
                  name: '节点6',
                  category: 1,
                  draggable: true,
                }, {
                  name: '节点7',
                  category: 1,
                  draggable: true,
                }, {
                  name: '节点8',
                  category: 1,
                  draggable: true,
                }, {
                  name: '节点9',
                  category: 1,
                  draggable: true,
                }, {
                  name: '节点10',
                  category: 1,
                  draggable: true,
                }, {
                  name: '节点11',
                  category: 1,
                  draggable: true,
                }, {
                  name: '节点12',
                  category: 1,
                  draggable: true,
                }],
                links: [{
                  source: 0,
                  target: 1,
                  category: 0,
                  value: '0-1'
                }, {
                  source: 0,
                  target: 2,
                  value: '0-2'
                }, {
                  source: 0,
                  target: 3,
                  value: '0-3'
                }, {
                  source: 0,
                  target: 4,
                  value: '0-4'
                }, {
                  source: 1,
                  target: 2,
                  value: '1-2'
                }, {
                  source: 0,
                  target: 5,
                  value: '0-5'
                }, {
                  source: 4,
                  target: 5,
                  value: '4-5'
                }, {
                  source: 2,
                  target: 8,
                  value: '2-8'
                }, {
                  source: 0,
                  target: 12,
                  value: '0-12'
                }, {
                  source: 6,
                  target: 11,
                  value: '6-11'
                }, {
                  source: 6,
                  target: 3,
                  value: '6-3'
                }, {
                  source: 7,
                  target: 5,
                  value: '7-5'
                }, {
                  source: 9,
                  target: 10,
                  value: '9-10'
                }, {
                  source: 3,
                  target: 10,
                  value: '3-10'
                }, {
                  source: 2,
                  target: 11,
                  value: '2-11'
                }],
                lineStyle: {
                  normal: {
                    opacity: 0.9,
                    width: 1,
                    curveness: 0
                  }
                }
              }
            ]
          }
        }
      }
  }

</script>

<style scoped>
  .echarts {
    width: 100%;
    height: 100%;
  }
</style>
