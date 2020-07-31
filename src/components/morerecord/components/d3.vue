<template>
  <div id="d3">
    <el-tabs v-model="activeName">
      <el-tab-pane label="质量问题管理" name="first">
        <div id="contain" ref="tuImage"></div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { update } from './update'
import { pltKg } from './archives'
const host1='http://192.168.43.228:8081';
export default {
  props:['content'],
  data() {
    return {
      input: '推进系统',
      activeName: 'first'
    }
  },
  methods: {
    //svg启动程序
    initSvg(data) {
      pltKg(data)
      // this.hidden=false
    },
    //实体检索
    nodeSearch(keyword) {
      this.backCount = 1;
      this.$ajax
        .get('http://192.168.43.228:8081/neo/neoGetEntity/'+keyword)
        // .get(host1 + '/MapDisplay/subGraph?nodeName=' + keyword)
        .then((res) => {
          this.resNode = res.data.nodes;
          // update()
          // load(res.data, 720, false)
          this.wnode = res.data;
          update();
          this.initSvg(res.data)
        })
        .catch((error) => {
          this.$alert('知识检索失败！', '错误', {
            confirmButtonText: '确定',
          });
          console.log(error)
        })
    },
  },
  mounted(){
    this.nodeSearch(this.content.enetityvalue);
  }
}
</script>

<style scoped lang="less">
#d3 {
  width: 95%;
  height: 400px;

  margin:0 auto;

  #contain{
    width: 1000px;
    /*width: 100%;*/
    height: 360px;
    margin: 0 auto;
  }
}
</style>
