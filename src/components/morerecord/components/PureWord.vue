<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="质量问题分析" name="first">
          <div id="content">
              <div id="first">
                  <h1>机理分析</h1>
                  <p>xxxxxxxxxxxx</p>
              </div>
              <div id="second">
                <h1>采取措施</h1>
                <p>xxxxxxxxxxx</p>
              </div>

              <div id="third">
                  <h1>举一反三</h1>
                  <p>xxxxxxxxxx</p>
              </div>
          </div>
      </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "PureWord",
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
    #content{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        #first,#second,#third {
            flex: 1;
            border-bottom: 1px solid #cccccc;

            h1,p{
                padding-left: 20px;
            }
        }
    }

</style>
