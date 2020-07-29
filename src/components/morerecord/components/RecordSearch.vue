<template>
    <div class="div">
      <img src="@/images/u124.png" class="img" />
      <div class="input">
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入内容" v-model="inputV" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" v-on:click="changeAllStatus">搜索</el-button>
          </el-input>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "RecordSearch",
    data(){
      return {
        inputV: '',
      }
    },
    methods : {
      changeAllStatus(){
        this.$emit('changeStatus',this.inputV);
      }
    }
  }
</script>

<style scoped lang="less">
  .div {
    width: 100%;
    height: 600px;
    text-align: center;
    margin-top: 20px;
    /*background-color:red;*/
  }
  .img {
    width: 454px;
    height: 277px;
    margin-bottom: 20px;
  }
  .input{
    width: 60%;
    height: 50px;
    margin:0 auto;
    margin-bottom: 20px;
  }
  .el-select .el-input {
    width: 60%;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
