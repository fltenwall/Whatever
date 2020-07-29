<template>
    <div id="footer">
<!--      <Charts/>-->
<!--        <PureWord/>-->
<!--        <PureTable/>-->
<!--          <Graph/>-->
      <Charts2 />
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
    }
</script>

<style scoped lang="less">
    #footer{
        width: 95%;
        height: 450px;
        margin: 20px auto;
        border: 1px solid #cccccc;
        font-size: 16px;
    }
</style>
