<template>
    <el-tabs v-model="activeName" @tab-click="handleClick" id="container">
      <el-tab-pane label="质量问题分析" name="first" >
          <div id="content">
              <div class="info">
                  <h1>采取措施</h1>
                  <p>{{wentifenxi[0].caiqucuoshi}}</p>
              </div>
              <div class="info">
                <h1>发生时间</h1>
                <p>{{wentifenxi[0].fashengwentishijian}}</p>
              </div>
              <div class="info">
                <h1>问题现象</h1>
                <p>{{wentifenxi[0].wentixianxiang}}</p>
              </div>
              <div class="info">
                <h1>异常描述</h1>
                <p>{{wentifenxi[0].yichangmiaoshu}}</p>
              </div>
              <div class="info">
                <h1>质量问题</h1>
                <p>{{wentifenxi[0].zhiliangwenti}}</p>
              </div>
          </div>
      </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "PureWord",
        props:['wentifenxi'],
        data() {
          return {
            activeName: 'first'
          };
        },
        methods: {
          handleClick(tab, event) {
            console.log(tab, event);
          }
        }
    }
</script>

<style scoped lang="less">
    #container{
      width: 95%;
      margin:20px auto;
      font-size: 16px;
      /*background-color:red;*/
    }
    #content{
        width: 100%;
        /*width: 1000px;*/
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .info {
            flex: 1;
            border-bottom: 1px solid #cccccc;

            h1,p{
                padding-left: 20px;
            }
        }
    }

</style>
