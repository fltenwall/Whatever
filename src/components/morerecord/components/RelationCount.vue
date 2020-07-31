<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" >
    <el-tab-pane label="共同责任关系" name="first">
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
          width="80">
        </el-table-column>
        <el-table-column
          prop="jieduan"
          label="阶段"
          width="120">
        </el-table-column>
        <el-table-column
          prop="waibuzerendanwei"
          label="外部责任单位"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zhiliangwenti"
          label="质量问题"
          width="120">
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    name: "TableCount",
    props:['relation'],
    data() {
      return {
        tableData: [],
        activeName: 'first',

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
            jieduan:item.jieduan,
            waibuzerendanwei:item.waibuzerendanwei,
            zhiliangwenti:item.zhiliangwenti
          };
          this.tableData.push(obj);
        });
      }
    },
    mounted() {
      this.getData(this.relation);
    }
  }
</script>

<style scoped>

</style>
