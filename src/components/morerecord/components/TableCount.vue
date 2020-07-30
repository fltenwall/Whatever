<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" >
    <el-tab-pane label="原因分类统计" name="first">
      <el-table
        :data="tableData"
        style="width: 95%;margin: 0 auto"
        height="240"
        border
      >
        <el-table-column
          fixed
          prop="id"
          label="序号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="classify"
          label="原因分类"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sum"
          label="发生次数"
          width="120">
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
    export default {
      name: "TableCount",
      props:['fenlei'],
      data() {
        return {
          tableData: [],
          activeName: 'first'
        }
      },
      methods:{
        handleClick:function(){
          console.log(11);
        },
        getData(data){
          data.forEach((item,index)=>{
            let obj = {
              id:index,
              classify:item.yuanyinfenlei1,
              sum:item.sum
            };
            this.tableData.push(obj);
          });
        }
      },
      mounted() {
        this.getData(this.fenlei);
      }
    }
</script>

<style scoped>

</style>
