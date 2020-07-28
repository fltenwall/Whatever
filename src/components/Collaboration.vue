<template>
  <div>
    <el-row>
      <el-col>
        <el-date-picker
          v-model="datatime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          prefix-icon="el-icon-date"
          value-format="yyyy-MM-dd"
          @change="getTime"
        ></el-date-picker>

        <el-input
          class="input_m"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="searchKey"
        ></el-input>
      </el-col>
    </el-row>
    <el-row  v-for="(item, index) of imageList" :key="index">
      <el-col :span="5" class="content_border">
        <el-col>
          <img v-bind:src="item.picUrl" class="img_3407" />
        </el-col>
        <el-col>检索条件_时间</el-col>
        <el-col>作者：{{item.userId}}</el-col>
        <el-col :span="17">时间：2018-11-03 12:20:48</el-col>
        <el-col :span="5">[删] [编]</el-col>
      </el-col>
    </el-row>
    <div class="pagination_d">
      <!-- 分页区域 -->
      <el-pagination background layout="prev, pager, next" :total="50"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageList: [],
      datatime: '',
      searchKey: ''
    }
  },
  mounted () {
     this.getImg()
  },
  methods: {
    getTime(val){
console.log(val);
    },
getImg(){
  
 this.$ajax.get('http://192.168.191.3:8023/upload/pic/findPicById?userId=100012')
        .then(res => {
          this.imageList = res.data
          console.log(res.data)
        })
}
  }
}
</script>
<style lang="less" scoped>
.content_border {
  border: 1px;
  border-style: solid;
  padding: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
}
.el-row {
  margin-bottom: 15px;
}
.input_m {
  margin-left: 15px;
  width: 300px;
}
.pagination_d {
  text-align: right;
}

.img_3407{
  width:250px;
  height: 160px;
}
</style>
