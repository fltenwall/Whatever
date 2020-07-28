<template>
    <div id="footer">
<!--      <Charts/>-->
<!--        <PureWord/>-->
<!--        <PureTable/>-->
<!--          <Graph/>-->
      <Charts2 :recodeData="recordData" />
    </div>
</template>

<script>
    // import Charts from "./components/Charts";
    // import PureWord from "./components/PureWord";
    // import PureTable from "./components/PureTable";
    // import Graph  from "./components/Graph"

    import Charts2 from "./components/Charts2";
    export default {
        props:['recordData'],
        components:{
            // Charts,
            // PureWord,
            // PureTable
            // Graph,
            Charts2
      },
        name: "Footer",
        methods:{
          getData(){
            console.log(this.recordData);
          }
        },
        mounted() {
          this.getData()
        }
    }
</script>

<style scoped lang="less">
    #footer{
        width: 95%;
        height: 650px;
        margin: 20px auto;
        border: 1px solid #cccccc;
        font-size: 16px;
    }
</style>
