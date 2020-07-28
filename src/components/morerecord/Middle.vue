<template>
    <div id="middle">
        <div id="middle-left">
            <Table/>
<!--            <PureTable/>-->
        </div>
        <div id="middle-right">
  <!--        <Table/>-->
            <Pie/>
<!--            <Graph/>-->
        </div>
    </div>
</template>

<script>
    import Table from "./components/Table";
    import Pie from "./components/Pie";
    // import PureTable from "./components/PureTable";
    // import Graph from "./components/Graph"
    export default {
        components:{
          Table,
          Pie,
          // PureTable,
          // Graph
        },
      name: "Middle",

    }
</script>

<style scoped lang="less">
  #middle{
    width: 95%;
    height: 300px;
    margin: 0 auto;
    padding:20px 0;
    /*background-color: lightpink;*/
    /*border: 1px solid #cccccc;*/
    border-radius: 5px;
    font-size: 16px;
  }
  #middle-left,#middle-right{
    width: calc(49% - 2px);
    height: 100%;
    float: left;
    border: 1px solid #cccccc;
  }
  #middle-left{
    margin-right: 2%;
  }
</style>
