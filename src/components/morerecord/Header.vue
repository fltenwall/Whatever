<template>
    <div id="header">
      <Info/>
<!--      <ReportTitle/>-->
    </div>
</template>

<script>
    import ReportTitle from "./components/ReportTitle";
    import Info from "./components/Info";
    export default {
      name: "Header",
      components:{
        Info,
        // ReportTitle
      }
    }
</script>

<style scoped lang="less">
  #header{
    width: 95%;
    height: 200px;
    margin:20px auto;
    font-size: 16px;
    border: 1px solid #cccccc;
    /*background-color: lightblue;*/
  }
</style>
