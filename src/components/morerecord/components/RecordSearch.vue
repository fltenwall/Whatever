<template>
    <div class="div">
      <img src="@/images/u124.png" class="img" />
<!--      <div>-->
<!--        <el-autocomplete-->
<!--          class="inline-input autocomplete"-->
<!--          v-model="searchKeyword"-->
<!--          :fetch-suggestions="querySearch"-->
<!--          placeholder="请输入内容"-->
<!--          @select="handleSelect"-->
<!--          @input="getKwos"-->
<!--          :debounce="300"-->
<!--          @keyup.enter.native="search"-->
<!--        >-->
<!--          <label-->
<!--            v-for="(item,index) in categories"-->
<!--            :key="index"-->
<!--            class="el-input__icon"-->
<!--            slot="suffix"-->
<!--          >[{{item}}]</label>-->
<!--          <template slot-scope="{ item }">-->
<!--            <el-row>-->
<!--              <el-col :span="22">-->
<!--                <div>{{ item.value=item.name }}</div>-->
<!--              </el-col>-->
<!--              <el-col style="text-align:right" :span="2">-->
<!--                <div>{{item.quality}}</div>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--          </template>-->
<!--        </el-autocomplete>-->
<!--        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>-->
<!--      </div>-->
    </div>
</template>

<script>
  export default {
    name: "RecordSearch",
    data(){

    }
  }
</script>

<style scoped lang="less">
  .div {
    width: 100%;
    height: 300px;
    text-align: center;
    margin-top: 20px;
    /*background-color:red;*/
  }
  .img {
    width: 454px;
    height: 277px;
    margin-bottom: 20px;
  }
  .autocomplete {
    width: 640px;
  }
</style>
