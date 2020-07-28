<template>
    <div id="info">
      <div id="info-left">
        <img src="../../../images/u1026.png" alt="">
      </div>
      <div id="info-right">
        <div id="info-right-title">
          <p>质量归零报告</p>
        </div>
        <div id="info-right-content">
          <span>主键：xxx故障</span>
          <span>主键：xxx故障</span>
          <span>主键：xxx故障</span>
          <span>主键：xxx故障</span>
          <span>主键：xxx故障</span>
          <span>主键：xxx故障</span>
          <span>主键：xxx故障</span>
          <span>主键：xxx故障</span>
          <span>主键：xxx故障</span>
          <span>主键：xxx故障</span>
          <span>主键：xxx故障</span>
          <span>主键：xxx故障</span>
          <span>主键：xxx故障</span>
          <span>主键：xxx故障</span>
          <span>主键：xxx故障</span>
          <span>主键：xxx故障</span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Info"
    }
</script>

<style scoped>
  #info{
    display: flex;
    height: 100%;
    /*border: 1px solid #cccccc;*/
  }
  #info-left{
    width: 20%;
    border-right: 1px solid #cccccc;
    display: flex;
  }
  #info-left img{
    width: 80%;
    flex:1;
    margin: 10%;
  }
  #info-right{
    flex:1;
    padding-left:5%;
  }
  #info-right-title{
    height: 20%;
  }
  #info-right-content{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  #info-right-content span{
    flex:1;
    width: 25%;
    min-width: 25%;
    max-width: 25%;
  }
</style>
