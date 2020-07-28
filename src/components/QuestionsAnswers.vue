<template>
  <el-row>
    <el-col :span="4">
      <el-row class="row-sr">
        <el-col>详情</el-col>
      </el-row>
      <el-row class="row-sr">
        <el-col>
          <el-input placeholder="输入关键字搜索" suffix-icon="el-icon-search" v-model="input2"></el-input>
        </el-col>
      </el-row>
      <el-row class="row-sr">
        <el-col>搜索结果</el-col>
      </el-row>
      <el-row class="row-sr">
        <el-col :span="6">图片</el-col>
        <el-col :span="18">dsfds</el-col>
      </el-row>
      <el-row class="row-sr">
        <el-col :span="6">图片</el-col>
        <el-col :span="18">
          <div>xx-01 问题</div>
          <div>主键：xx-01 问题</div>
          <div>详情：xx-01分系统</div>
        </el-col>
      </el-row>
      <el-row class="row-sr">
        <el-col :span="6">图片</el-col>
        <el-col :span="18">
          <div>xx-01 问题</div>
          <div>主键：xx-01 问题</div>
          <div>详情：xx-01分系统</div>
        </el-col>
      </el-row>
      <el-row class="row-sr">
        <el-col :span="6">图片</el-col>
        <el-col :span="18">
          <div>xx-01 问题</div>
          <div>主键：xx-01 问题</div>
          <div>详情：xx-01分系统</div>
        </el-col>
      </el-row>
      <el-row class="row-sr">
        <el-col :span="6">图片</el-col>
        <el-col :span="18">
          <div>xx-01 问题</div>
          <div>主键：xx-01 问题</div>
          <div>详情：xx-01分系统</div>
        </el-col>
      </el-row>
      <el-row class="row-sr">
        <el-col :span="6">图片</el-col>
        <el-col :span="18">
          <div>xx-01 问题</div>
          <div>主键：xx-01 问题</div>
          <div>详情：xx-01分系统</div>
        </el-col>
      </el-row>
      <div class="pagination_d">
        <!-- 分页区域 -->
        <el-pagination
          :current-page="1"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-col>
    <el-col :span="14">
      <div class="grid-content bg-purple-light"></div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.row-sr {
  padding-left: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 0.5px;
  border-bottom-style: solid;
  border-bottom-color: #797979;
}
</style>