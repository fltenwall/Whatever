<template>
    <div id="pie">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="原因分类统计" name="first">
          <ve-Pie :data="chartData" id="pieChart" :settings="chartSettings"></ve-Pie>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
    import VePie from 'v-charts/lib/pie.common'
    export default {
        components:{VePie},
        name: "Pie",
        data () {
          this.chartSettings = {
            radius: 100,
            labelLine:{
                show:false
            },
            label:{
                show:false
            },
            offsetY:140
          };
          return {
            chartData: {
              columns: ['日期', '访问用户'],
              rows: [
                { '日期': '1/1', '访问用户': 1393 },
                { '日期': '1/2', '访问用户': 3530 },
                { '日期': '1/3', '访问用户': 2923 },
                { '日期': '1/4', '访问用户': 1723 },
                { '日期': '1/5', '访问用户': 3792 },
                { '日期': '1/6', '访问用户': 4593 }
              ]
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

<style scoped lang="less">
    #pie{
      height: 100%;
    }
    #pieChart{

    }
</style>
