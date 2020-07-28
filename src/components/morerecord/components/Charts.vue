<template>
    <div id="charts">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          <ve-Scatter
            :data="chartData"
            :settings="chartSettings"
            :legend="chartLegend"
            :events="chartEvents"
          >
          </ve-Scatter>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import VeScatter from 'v-charts/lib/scatter.common';
  // import 'echarts/lib/component/dataZoom';

  export default {
    components: { VeScatter },
    name: "charts",
    data () {
      this.chartSettings = {
        labelMap: {
          '访问用户': 'PV'
        },
        yAxisName:'研制阶段',
        min:1,
        max:8,
        axisSite: { right: ['访问用户'] },

      };
      this.chartLegend = {
        right:10,

        //样式
        textStyle : {

        }
      };
      var self = this;
      this.chartEvents = {
        mouseover: function (e) {
          self.name = e.name;
          // e.dimensionNames = [
          //   {}
          // ];
          // e.marker = "<span style='display:inline-block;background: red;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#fa6e86;'></span>";
          e.color = '#f00';

          console.log(e);
          console.log(e.marker);

          return e;
        }
      };

      return {
        chartData: {
          columns: ['日期','阶段','访问用户', '下单用户', '年龄'],
          rows: {
            '设计': [
              { '日期': '1/1', '访问用户': 123, '年龄': 3, '下单用户': 1244,'阶段':1},
              { '日期': '1/2', '访问用户': 1223, '年龄': 6, '下单用户': 2344,'阶段':2},
              { '日期': '1/3', '访问用户': 7123, '年龄': 9, '下单用户': 3245,'阶段':3},
              { '日期': '1/4', '访问用户': 4123, '年龄': 12, '下单用户': 4355,'阶段':5},
              { '日期': '1/5', '访问用户': 3123, '年龄': 15, '下单用户': 4564,'阶段':6},
              { '日期': '1/6', '访问用户': 2323, '年龄': 20, '下单用户': 6537,'阶段':1}
            ],
            '软件': [
              { '日期': '1/1', '访问用户': 123, '年龄': 3, '下单用户': 1244,'阶段':3},
              { '日期': '1/2', '访问用户': 1273, '年龄': 6, '下单用户': 2344,'阶段':7 },
              { '日期': '1/3', '访问用户': 3123, '年龄': 15, '下单用户': 4564,'阶段':4},
              { '日期': '1/4', '访问用户': 2123, '年龄': 9, '下单用户': 3245,'阶段':4},
              { '日期': '1/5', '访问用户': 4103, '年龄': 12, '下单用户': 4355,'阶段':4},
              { '日期': '1/6', '访问用户': 7123, '年龄': 10, '下单用户': 3567,'阶段':2 }
            ],
            '操作': [
              { '日期': '1/1', '访问用户': 123, '年龄': 3, '下单用户': 1244,'阶段':4},
              { '日期': '1/2', '访问用户': 1223, '年龄': 6, '下单用户': 2344,'阶段':2},
              { '日期': '1/3', '访问用户': 2123, '年龄': 30, '下单用户': 3245,'阶段':2},
              { '日期': '1/5', '访问用户': 4123, '年龄': 12, '下单用户': 4355,'阶段':3},
              { '日期': '1/4', '访问用户': 5123, '年龄': 18, '下单用户': 4564,'阶段':3},
              { '日期': '1/6', '访问用户': 3843, '年龄': 30, '下单用户': 4850,'阶段':6}
            ]
          }
        },
        activeName: 'first'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style scoped>
  #charts{
    height: 300px;
  }
</style>
