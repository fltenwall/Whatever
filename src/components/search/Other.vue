<template>
  <div>

    <div class="div_border" v-for="(item,index) in otherlist.content.datas" :key="index">
      <!-- <div class="marginBootom">{{item.filetittle}}</div> -->
      <div style="position: relative;">
<a href="#"  width="400" @click.prevent="showPreviewbyid(item.fileid)" v-html="item.filetittle">{{item.filetittle}}</a>
      <!-- 向下的角箭头符号，用css画 -->
       <img src="@/images/u_up.png" class="arrow_img1" :class="{arrow_img2:index==active}" @click="onIsShow(index)" />
       <!-- 向上的角箭头符号 -->
       <!-- <img src="@/images/u_up.png" class="arrow_img2" v-else  @click="onIsShow('wo')" /> -->
      </div>
      <el-row class="row">
        <el-col :span="23">
          <div class="txtHide" >
             <div v-html="item.filecontent"  class="summary" :class="{summary1:index==active}"></div>
          </div>
            <!-- <div class="txtShow" v-else>
             <div v-html="item.filecontent"  class="summary1"></div>
          </div> -->
             
        </el-col>
      </el-row>
    </div>

    <div class="pagination_d">
      <!-- 分页区域 -->
      <el-pagination
        :current-page="1"
        :page-sizes="[2,5,10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :total="otherlist.content.count"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    searchkey: String ,
    // otherlist: Array
  },
  data() {
    return {
      active:999,
      isShow:true,
      otherlist:null,
      isMponentHide: true,
      isFaultHide: true,
       // 获取列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5
      },
      total: 0
    }
  },
  mounted() {
    //事件监听
        this.$on('otherSearch', function () {
          this.getSearch();
        })
    //  test();
    // this.getSearch()  //点击panel的分布显示
  },
  methods: {
    onIsShow(index){
      if(index==this.active){
        this.active=999
        return
      }
      this.active=index
this.isShow=!this.isShow
    },
    onMShow: function() {
      this.isMponentHide = false //点击onShow切换为false，显示为展开画面
    },
    onMHide: function() {
      this.isMponentHide = true //点击onHide切换为true，显示为折叠画面
    },
    onFShow: function() {
      this.isFaultHide = false
    },
    onFHide: function() {
      this.isFaultHide = true
    },
    showPreviewbyid(id) {
      this.$router.push({ path: '/preview', query: { flag: 0, id: id } })
      // this.$router.push({name: 'preview', params: {id: id}})
      // this.$router.replace({name:'preview', params: {}}, () => { this.warning('test!') }, () => { this.warning('test!') })
      // let routeData = this.$router.resolve({ path: '/preview', query: { id: 1 } })
      // window.open('preview', '_blank')
    },

    async getSearch() {
      const data = await this.$ajax.get(`http://192.168.43.228:8081/api/searchCategory/others/${this.searchkey}?size=${this.queryInfo.pagesize}&page=${this.queryInfo.pagenum}`)
      if (data.status !== 200) {
        return this.$message.error('获取检索结果失败！')
      }
      this.otherlist=data.data;
      console.log(this.otherlist);
      this.total = this.otherlist.content.count
    },

    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getSearch()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getSearch()
    }
  }
}
</script>
<style lang="less"  scoped>
@import '@/assets/css/search.less';
.summary1{
  overflow: hidden;
    text-overflow: clip;
    display: -webkit-box;
    -webkit-box-orient: inherit;
    -webkit-line-clamp: 2;
}
.arrow_img1 {
  width: 25px;
  height: 10px;
  position: absolute;
  top: 5px;
  right: 20px;
  cursor: pointer;
}
.arrow_img2 {
  width: 25px;
  height: 10px;
  position: absolute;
  top: 5px;
  right: 20px;
  cursor: pointer;
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
</style>
