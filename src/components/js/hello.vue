<!--hello.vue-->
<template>
  <div class="hello">
    <el-dialog
    :title="title"
    custom-class="infoDialog"
    :visible.sync="dialogVisible"
    @close="test"
    width="30%">
      <div class="dialogTag">
        <p>信息一</p>
        <!--<div class="dialogTag-right"></div>-->
      </div>
      <div class="rlatEvents">
        {{ text }}
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'hello',
    data () {
      return {
        text: '',
        title: '详细信息',
        dialogVisible: true
      }
    }
  }
</script>
<style scoped>
  .rlatEvents {
    margin-top: 10px;
  }
  .dialogTag {
    color: white;
    text-align: center;
    background: #4682B4;
    width: 100px;
    height: 30px;
    border-radius: 3px 0 0 3px;
  }
  .dialogTag-right {
    width: 13px;
    height: 30px;
    margin-left: 100px;
    margin-top: -30px;
    background: #4682B4;
    clip-path: polygon(0% 0%, 100% 50%, 0% 100%, 0% 100%);
  }
</style>

<style>
  .hello .infoDialog {
    font-family: myFont, sans-serif;
    font-weight: bold;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .hello .infoDialog .el-dialog__header {
    padding-top: 10px;
    /*background-color: #8B8682;*/
    background-color: #8B8989;
    border: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .hello .infoDialog .el-dialog__header .el-dialog__title {
    color: #000000;
  }

  .hello .infoDialog .el-dialog__header .el-dialog__headerbtn {
    top: 15px;
  }

  .hello .infoDialog .el-dialog__header .el-dialog__headerbtn .el-dialog__close {
    font-weight: bold;
    color: black;
  }

  .hello .infoDialog .el-dialog__body {
    padding: 20px;
    background-color: #fafafa;
  }
</style>
