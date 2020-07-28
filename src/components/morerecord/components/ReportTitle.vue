<template>
    <div id="title">
        <div id="first">
            <div id="first-left">
              <img src="../../../images/u1449.png" alt="">
            </div>
            <div id="first-right">
                <span>基本信息</span>
                <span>便签统计</span>
                <span>标签统计</span>
            </div>
        </div>
        <div id="second">
            <div id="second-left">
              <img src="../../../images/u1449.png" alt="">
            </div>
            <div id="second-right">
                <span>关系信息</span>
                <span>直接关系</span>
            </div>
        </div>
        <div id="third">
            <div id="third-left">
              <img src="../../../images/u1449.png" alt="">
            </div>
            <div id="third-right">
                <span>事件信息</span>
                <span>最新发生事件</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ReportTitle"
    }
</script>

<style scoped  lang="less">
    #title{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #first,#second,#third{
        flex:1;
        display:flex;
        /*height: 100%;*/
        /*border-right:1px solid #cccccc;*/
        /*margin-left: 20px;*/

        #first-left,#second-left,#third-left{
            width: 45%;
            /*border: 1px solid red;*/
            img{
                  width: 120px;
                  padding-left: 20px;
                }
        }

        #first-right,#second-right,#third-right{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }
    }

</style>
