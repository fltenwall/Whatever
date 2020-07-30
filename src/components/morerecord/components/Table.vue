<template>
<!--    <el-tabs v-model="activeName" @tab-click="handleClick" v-for="item in tableData" :key="item[1].name">-->
<!--      <el-tab-pane :label="item[0].label" :name="item[1].name">-->
<!--        <el-table-->
<!--          :data="item[2]  "-->
<!--          style="width: 95%;margin: 0 auto"-->
<!--          height="240"-->
<!--          border-->
<!--        >-->
<!--          <el-table-column-->
<!--            fixed-->
<!--            prop="id"-->
<!--            label="序号"-->
<!--            width="150">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="name"-->
<!--            label="质量问题名称"-->
<!--            width="120">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="time"-->
<!--            label="故障发生时间"-->
<!--            width="120">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="unit"-->
<!--            label="故障部位"-->
<!--            width="120">-->
<!--          </el-table-column>-->
<!--        </el-table>-->
<!--      </el-tab-pane>-->
<!--    </el-tabs>-->
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="设计" name="design">
      <el-table
        :data="this.design[2]"
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
          prop="name"
          label="质量问题名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="time"
          label="故障发生时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="故障部位"
          width="120">
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="元器件" name="electron">
      <el-table
        :data="this.design[2]"
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
          prop="name"
          label="质量问题名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="time"
          label="故障发生时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="故障部位"
          width="120">
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
    export default {
      name: "Table",
      props:['fenlei'],
      data() {
        return {
          tableData: [],
          activeName: 'design',
          design:[{label:"设计"},{name:"first"},[]],
          software:[{label:"软件"},{name:"second"},[]],
          handle:[{label:"操作"},{name:"thrid"},[]],
          art:[{label:"工艺"},{name:"fourth"},[]],
          electron : [{label:"元器件"},{name:"fifth"},[]]
        }
      },
      methods:{
        handleClick:function(){
          console.log(11);
        },
        getData(data){
          data.forEach((item,index)=>{
            let obj = {
              id : index,
              name: item.data[0].zhiliangwenti,
              unit : item.data[0].wentibujian,
              time : item.data[0].fashengwentishijian
            };

            switch (item.yuanyinfenlei1) {
              case "设计":
                this.design[2].push(obj);
                break;
              case "软件":
                this.software[2].push(obj);
                break;
              case "操作":
                this.handle[1].push(obj);
                break;
              case "工艺":
                this.art[2].push(obj);
                break;
              case "元器件":
                this.electron[2].push(obj);
                break;
            }
          });
          this.tableData = [this.design,this.software,this.handle,this.art,this.electron];
        }
      },
      mounted() {
        this.getData(this.fenlei);
      }
    }
</script>

<style scoped lang="less">

</style>
