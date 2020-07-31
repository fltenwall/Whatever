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
        props:['fenlei'],

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
              columns: ['分类', '数量'],
              rows: []
            },
            activeName: 'first'
          }
        },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        },
        getData(data){
          data.forEach((item)=>{
            let obj = {
              '分类':item.yuanyinfenlei1,
              '数量':item.sum
            };
            this.chartData.rows.push(obj);
          });
        }
      },
      created() {
          this.getData(this.fenlei);
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
