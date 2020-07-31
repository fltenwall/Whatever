<template>
    <div id="footer">
      <Charts2 :xulie="xulie" />
    </div>
</template>

<script>
    import Charts2 from "./components/Charts2";
    export default {
        props:['xulie'],
        components:{
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
