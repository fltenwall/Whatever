<template>
  <div id="content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <v-chart :options="polar" id="charts"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/scatter'
  import 'echarts/lib/component/polar'

  export default {
    components: {
      'v-chart': ECharts
    },
    name:'Charts2',
    props:['recordData'],
    data () {
      this.data1  = [[5,1,4],[3,2,8],[1,1,5]];
      this.data2  = [[3,1,4],[4,3,8],[2,3,10]];
      this.ydata = ["方案阶段","初样阶段","试样阶段","研制阶段","设计定型阶段","生产定型阶段","其他"];
      // this.ydata = this.recordData.data.shijiexulie[0].jieduan;
      this.xdata = ['2019-9','2019-10','2019-11','2019-12','2020-1','2020-2'];
      return {
        polar:{
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {
            trigger:'item',
            position: ['50%', '30%'],
            formatter: function (params) {
              var res=
                '<div style="border:1px solid #000;width:500px;height:300px;">' +
                '<h1 style="border-bottom: 1px solid #ccc;background-color: #eee;margin: 0;padding:20px">设计</h1>'+
                '<div style="width:400px;height:200px;background-color:#e8e8e8;margin: 20px auto;">' +
                '<table border="1" cellspacing="0" style="width: 100%;height: 100%;">' +
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
                '</table>'+
                '</div>'+
                '</div>';
              for(var i=0;i<params.length;i++){
                res+='<p>'+params[i].seriesName+':'+params[i].data+'</p>'
              }
              return res;
            },
            extraCssText:'width:400px;height:80px;background:#fff;color:#000'
          },
          legend: {
            data:['设计', '软件', '操作', '工艺', '元器件']
          },
          xAxis: {
            data: this.xdata,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#ccc',
                type: 'solid'
              }
            },
          },
          yAxis: {
            data: this.ydata,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#ccc',
                type: 'solid'
              }
            },
          },
          series: [
            {
              name: '设计',
              type: 'scatter',
              symbolSize: function (val) {
                return val[2] * 2;
              },
              data: this.data1,
              animationDelay: function (idx) {
                return idx * 5;
              }
            },
            {
              name: '软件',
              type: 'scatter',
              symbolSize: function (val) {
                return val[2] * 2;
              },
              data: this.data2,
              animationDelay: function (idx) {
                return idx * 5;
              }
            },

          ]
        },
        activeName: 'first'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
  }
</script>

<style scoped>
  #content{
    width: 100%;
    height: 100%;
    /*background-color: red;*/
    /*display: flex;*/
  }
  #charts{
    flex:1;
    height: 600px;
    width: 100%;
    /*background-color: red;*/
  }
</style>
