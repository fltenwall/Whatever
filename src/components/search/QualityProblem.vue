<template>
  <div>
    <div class="div_border">
      <div class="marginBootom">相关推荐</div>
      <div class="marginBootom marginBootom1">
        <span
          :title="mode.tj"
          class="show show1"
          v-for="mode in qualityproblemlist.xiangguantuijian"
          :key="mode.tj"
        >{{mode.tj}}</span>
      </div>
    </div>
    <div class="div_border">
      <div class="marginBootom">构成器件</div>
      <el-row v-if="isMponentHide">
        <el-col :span="23">
          <div class="summary">
            <el-popover
              placement="bottom"
              class="show"
              width="400"
              trigger="hover"
              v-for="model in qualityproblemlist.gouchengqijjian"
              :key="model.chanpin"
            >
              <div>
                <div v-for="m in model.data" :key="m.qualityid" class="date">
                  <a
                    href="#"
                    class="a_popover"
                    @click.prevent="showPreviewbyid(m.qualityid)"
                  >{{m.zhiliangwenti}}</a>
                  <span>{{m.fashengwentishijian}}</span>
                </div>
              </div>
              <el-button slot="reference" type="text">{{model.chanpin}}</el-button>
            </el-popover>
          </div>
        </el-col>
        <el-col :span="1" v-if="qualityproblemlist.gouchengqijjian.length>0">
          <!-- 绑定点击事件onShow，点击展开全文 -->
          <a href="#" @click.stop.prevent="onMShow">
            <img src="@/images/u_up.png" class="arrow_img" />
            <!-- 向下的角箭头符号，用css画 -->
            <!-- <span class="downArrow"></span> -->
          </a>
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="23">
          <el-popover
            placement="bottom"
            class="show"
            width="400"
            trigger="hover"
            v-for="model in qualityproblemlist.gouchengqijjian"
            :key="model.chanpin"
          >
            <div>
              <div v-for="m in model.data" :key="m.qualityid">
                <a
                  href="#"
                  class="a_popover"
                  @click.prevent="showPreviewbyid(m.qualityid)"
                >{{m.zhiliangwenti}}</a>
              </div>
            </div>
            <el-button slot="reference" type="text">{{model.chanpin}}</el-button>
          </el-popover>
        </el-col>
        <el-col :span="1" v-if="qualityproblemlist.gouchengqijjian.length>0">
          <a href="#" @click.stop.prevent="onMHide">
            <img src="@/images/u_up.png" class="arrow_img upArrow" />
            <!-- 向上的角箭头符号 -->
            <!-- <span class="upArrow"></span> -->
          </a>
        </el-col>
      </el-row>
    </div>
    <div class="div_border">
      <div class="marginBootom">阶段分布</div>
      <el-row v-if="isFaultHide">
        <el-col :span="23">
          <div class="summary">
            <el-popover
              placement="bottom"
              class="show"
              width="400"
              trigger="hover"
              v-for="model in qualityproblemlist.guzhangjieduan"
              :key="model.jieduan"
            >
              <div>
                <div v-for="m in model.data" :key="m.qualityid" class="date">
                  <a
                    href="#"
                    class="a_popover"
                    @click.prevent="showPreviewbyid(m.qualityid)"
                  >{{m.zhiliangwenti}}</a>
                  <span>{{m.fashengwentishijian}}</span>
                </div>
              </div>
              <el-button slot="reference" type="text">{{model.jieduan}}</el-button>
            </el-popover>
          </div>
        </el-col>
        <el-col :span="1" v-if="qualityproblemlist.guzhangjieduan.length>0">
          <a href="#" @click.stop.prevent="onFShow">
            <img src="@/images/u_up.png" class="arrow_img arrow_img_Position" />
            <!-- 向上的角箭头符号 -->
            <!-- <span class="downArrow"></span> -->
          </a>
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="23">
          <el-popover
            placement="bottom"
            class="show"
            width="400"
            trigger="hover"
            v-for="model in qualityproblemlist.guzhangjieduan"
            :key="model.jieduan"
          >
            <div>
              <div v-for="m in model.data" :key="m.qualityid" class="date">
                <a
                  href="#"
                  @click.prevent="showPreviewbyid(m.qualityid)"
                  class="a_popover"
                >{{m.zhiliangwenti}}</a>
                <span>{{m.fashengwentishijian}}</span>
              </div>
            </div>
            <el-button slot="reference" type="text">{{model.jieduan}}</el-button>
          </el-popover>
        </el-col>
        <el-col :span="1" v-if="qualityproblemlist.guzhangxianxiang.length>0">
          <a href="#" @click.stop.prevent="onFHide">
            <img src="@/images/u_up.png" class="arrow_img upArrow" />
            <!-- 向上的角箭头符号 -->
            <!-- <span class="upArrow"></span> -->
          </a>
        </el-col>
      </el-row>
    </div>
    <div
      v-for="item in qualityproblemlist.content.datas"
      @mouseenter="getReport(item.enetityvalue)"
      class="model_info"
      :key="item.enetityid"
    >
      <el-row class="div_border model_info_title">
        <el-col
          :span="24"
          class="col_conent"
        >【{{modelid=item.enetitylabel}}】{{productid=item.enetityvalue}}</el-col>
      </el-row>
      <el-row class="content_left">
        <el-row>
          <el-col :span="4" class="marginBootom">
            <img src="@/images/problem.png" class="u262_img" />
          </el-col>
          <el-col :span="19" class="marginBootom">
            <el-row>
              <el-col :span="8" class="col_conent">主键：{{item.entitykey}}</el-col>
              <el-col :span="8" class="col_conent">名称：{{item.enetityvalue}}</el-col>
              <el-col :span="7" class="col_conent">型号名称:{{item.enetityvalue}}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <a href="#" @click.prevent="showPreview(item.enetitylabel,item.enetityvalue)">
              <el-button type="text">归零报告{{item.guilingquanlity}}篇</el-button>
            </a>
          </el-col>
          <!-- <el-col :span="4">
            <a href="#" @click="showPreview()">质量问题{{item.wentiquanlity}}个</a>
          </el-col>-->
          <el-col :span="4">
            <el-popover placement="bottom" class="show" width="400" trigger="hover">
              <div>
                <div v-for="m in datalist" :key="m.qualityid" class="date">
                  <a
                    href="#"
                    class="a_popover"
                    @click.prevent="showPreview(item.enetitylabel,item.enetityvalue)"
                  >{{m.zhiliangwenti}}</a>
                  <span>{{m.fashengwentishijian}}</span>
                </div>
              </div>
              <el-button slot="reference" type="text">质量问题{{item.wentiquanlity}}个</el-button>
            </el-popover>
          </el-col>
          <!-- <el-col :span="4">关联产品{{item.chanpinquanlity}}个</el-col> -->
        </el-row>
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
        :total="qualityproblemlist.content.count"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    searchkey: String
    // qualityproblemlist: Object
  },
  data() {
    return {
      datalist: null,
      modelid: '',
      productid: '',
      qualityproblemlist: null,
      isMponentHide: true,
      isFaultHide: true,
      // 获取列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      total: 0
    }
  },
  mounted() {
    //事件监听
    this.$on('qualityproblemSearch', function() {
      this.getSearch()
      this.getSearch()
    })
    //  test();
    // this.getSearch()  //搜索
  },
  methods: {
    //最下面质量问题的展示
    async getReport(value) {
      const data = await this.$ajax.get(`http://192.168.43.228:8081/api/filenumWT/${this.modelid}/${value}`)
      if (data.status !== 200) {
        return this.$message.error('获取报告失败！')
      }
      console.log(data, '质量报告111111')

      this.datalist = data.data
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
    showPreview(modelid, productid) {
      this.$router.push({ path: '/preview', query: { flag: 1, modelid: modelid, productid: productid } })
      // this.$router.push({name: 'preview', params: {id: id}})
      // this.$router.replace({name:'preview', params: {}}, () => { this.warning('test!') }, () => { this.warning('test!') })
      // let routeData = this.$router.resolve({ path: '/preview', query: { id: 1 } })
      // window.open('preview', '_blank')
    },
    showPreviewbyid(id) {
      this.$router.push({ path: '/preview', query: { flag: 0, id: id } })
      // this.$router.push({name: 'preview', params: {id: id}})
      // this.$router.replace({name:'preview', params: {}}, () => { this.warning('test!') }, () => { this.warning('test!') })
      // let routeData = this.$router.resolve({ path: '/preview', query: { id: 1 } })
      // window.open('preview', '_blank')
    },
    async getSearch() {
      const data = await this.$ajax.get(`http://192.168.43.228:8081/api/searchCategory/质量问题/${this.searchkey}?size=${this.queryInfo.pagesize}&page=${this.queryInfo.pagenum}`)
      if (data.status !== 200) {
        return this.$message.error('获取检索结果失败！')
      }
      console.log(data, '质量问题panel')
      // this.getReport()
      this.qualityproblemlist = data.data
      console.log(this.qualityproblemlist)
      this.total = this.qualityproblemlist.content.count
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
</style>
