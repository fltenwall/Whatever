<template>
  <div id="content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="产品时序" name="first">
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
    props:['xulie'],
    name:'Charts2',
    data () {
      this.xdata = [];
      this.series0 = [];
      this.series1 = [];
      this.series2 = [];
      this.series3 = [];
      this.series4 = [];
      this.series5 = [];

      //x,y,size
      // this.data1  = [[5,1,4],[3,2,8],[1,1,5]];
      this.ydata = ["试样阶段","方案阶段","研制阶段","产品阶段","其他"];
      return {
        polar:{
          title: {
            text: ''
          },
          tooltip: {
            trigger:'item',
            position: function (pos, params, dom, rect, size) {
              // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
              var obj = {top: 60};
              obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
              return obj;
            },
            formatter: function (params) {
              var res=
                '<div style="border:1px solid #000;width:500px;height:200px;background-color:rgba(255,255,255,0.95)">' +
                '<h1 style="border-bottom: 1px solid #ccc;background-color: #eeeeee;margin: 0;padding:20px">'+params.seriesName+'</h1>'+
                '<div style="width:400px;height:100px;background-color:rgba(255,255,255,0.95);margin: 20px auto;">' +
                '<table border="1" cellspacing="0" style="width: 100%;height: 100%;text-align: center">' +
                '<tr>'+
                '<th>序号</th>'+
                '<th>质量问题名称</th>'+
                '<th>问题发生时间</th>'+
                '</tr>'+
                '<tr >'+
                '<td>'+params.data[3]+'</td>' +
                '<td>'+params.data[4]+'</td>' +
                '<td>'+params.data[5]+'</td>' +
                '</tr>'+
                '</table>'+
                '</div>'+
                '</div>';
              for(var i=0;i<params.length;i++){
                res+='<p>'+params[i].seriesName+':'+params[i].data+'</p>'
              }
              return res;
            },
            extraCssText:'width:400px;height:80px;background:rgba(255,255,255,0.95);color:#000'
          },
          legend: {
            data:['设计', '软件', '操作', '工艺', '元器件',"外协"]
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
              data: this.series0,
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
              data: this.series1,
              animationDelay: function (idx) {
                return idx * 5;
              }
            },
            {
              name: '操作',
              type: 'scatter',
              symbolSize: function (val) {
                return val[2] * 2;
              },
              data: this.series2,
              animationDelay: function (idx) {
                return idx * 5;
              }
            },
            {
              name: '工艺',
              type: 'scatter',
              symbolSize: function (val) {
                return val[2] * 2;
              },
              data: this.series3,
              animationDelay: function (idx) {
                return idx * 5;
              }
            },
            {
              name: '元器件',
              type: 'scatter',
              symbolSize: function (val) {
                return val[2] * 2;
              },
              data: this.series4,
              animationDelay: function (idx) {
                return idx * 5;
              }
            },
            {
              name: '外协',
              type: 'scatter',
              symbolSize: function (val) {
                return val[2] * 2;
              },
              data: this.series5,
              animationDelay: function (idx) {
                return idx * 5;
              }
            }
          ]
        },
        activeName: 'first'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      dataHandler(data){
        data.forEach((item)=>{
          console.log('item',item);
          this.xdata.push(item.fashengwentishijian);
        });
      },
      seriseHandler(data){
        data.forEach((item)=>{
          let x = this.xdata.indexOf(item.fashengwentishijian);
          let y = item.key;
          let size = 5;
          let id = 1;
          let name = item.zhiliangwenti;
          let time = item.fashengwentishijian;
          let singleData = [x,y,size,id,name,time];

          switch (item.yuanyinfenlei1) {
            case "设计":
              this.series0.push(singleData);
              break;
            case "软件":
              this.series1.push(singleData);
              break;
            case "操作":
              this.series2.push(singleData);
              break;
            case "工艺":
              this.series3.push(singleData);
              break;
            case "元器件":
              this.series4.push(singleData);
              break;
            case "外协":
              this.series5.push(singleData);
              break;
          }
        });
        console.log('1',this.series1);
      }
    },
    created() {
      this.dataHandler(this.xulie);
    },
    mounted() {
      this.seriseHandler(this.xulie);
    }
  }
</script>

<style scoped>
  #content{
    width: 100%;
    height: 100%;
  }

  #charts{
    height: 400px;
    width: 1000px;
    /*width: 100%;*/
    margin: 0 auto;
  }
</style>
