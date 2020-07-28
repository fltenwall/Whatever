<template>
  <div type="flex" justify="space-around" class="atlas">
     <!-- <el-button @click="hidden = !hidden">Click Me</el-button> -->
     <el-switch
  v-model="hidden"
  >
</el-switch>
 <transition name="slide-fade">
    <div class="a-left"  :class="{'a-left':hidden}">
      <div class="row-sr a-left-tab" :class="{'b-left-tab':hidden}" >
        <el-tabs v-model="activeName" class="tabs-scrool" @tab-click="handleClick" type="border-card" stretch>
          <el-tab-pane label="知识检索" name="first">
            <div class="middel">
              <el-row class="row-sr">
                <el-col>
                  <el-input
                    placeholder="输入关键字搜索"
                    size="small"
                    suffix-icon="el-icon-search"
                    v-model="state"
                    @change="changeValue"
                  ></el-input>
                </el-col>
              </el-row>

              <el-row class="row-sr" v-for="item of listData" :key="item.name">
                <div @click="nodeSearch(item.name)">
                  <el-col :span="6">
                    <img src="@/images/u262x.png" class="img_size1" />
                  </el-col>
                  <el-col :span="18">
                    <div style="margin-bottom:5px;">{{item.entitylabel}}</div>
                    <div style="margin-bottom:5px;">
                      <span class="spn">主键：</span>
                      {{item.entitykey}}
                    </div>
                    <div>
                      <span class="spn">本体：</span>
                      {{item.entityvalue}}
                    </div>
                  </el-col>
                </div>
              </el-row>
            </div>

            <div class="paget" v-if="!hidden">
              <!-- 分页区域 -->
              <el-pagination
                small
                @current-change="handleCurrentChange"
                :current-page="page.current"
                :pager-count="5"
                :page-size="page.pageSize"
                layout="prev, pager, next"
                :total="total"
              ></el-pagination>
            </div>
          </el-tab-pane>
          <!-- 关系检索========================================================== -->
          <el-tab-pane label="图谱检索" name="second">
            <div class="middel1">
              <div class="top">


                  <div class="title1">关系检索</div>
                  <el-input
                    style="margin-bottom:10px;"
                    clearable
                    size="small"
                    v-model="relation.inputScor"
                    placeholder="请输入实体"
                  ></el-input>
                  <el-input
                    style="margin-bottom:10px;"
                    clearable
                    size="small"
                    v-model="relation.inputTage"
                    placeholder="请输入实体"
                  ></el-input>
                  <el-button type="primary" icon="el-icon-search" round size="mini" @click="getShortestPath">检索</el-button>
            </div>
              <el-divider></el-divider>
             <div class="top">
               <div  class="title1">实体检索</div>
              <el-input
                style="margin-bottom:10px;"
                clearable
                size="small"
                v-model="ent.input"
                placeholder="请输入实体"
              ></el-input>

              <el-button type="primary" icon="el-icon-search" round size="mini" @click="nodeSearch(ent.input)">检索</el-button>
            </div>

             </div>
          </el-tab-pane>



        </el-tabs>
      </div>
    </div>
</transition>
    <div   class="a-middle">
      <el-row class="a-middle-a">
        <el-col :span="20">
          <img src="@/images/u1445.png" class="img_size" @click="backShow" />
          <img src="@/images/u1447.png" class="img_size" @click="forwardShow" />
          <img src="@/images/u1449.png" class="img_size" @click="showHistoryDialog" />
          <img src="@/images/u1451.png" class="img_size" @click="showSearchDialog" />
          <img src="@/images/u1452.png" class="img_size" @click="showThemeDialog" />
          <!-- <img src="@/images/u1453.png" class="img_size" @click="removeGraph" /> -->
           <img id="deleteG" src="@/images/u1453.png" class="img_size"/>
          <span id= "mag" @click="magnifyeLens">
            <img src="@/images/fangdajing1.png" v-if="!this.magShow" class="img_size"/>
            <img src="@/images/fangdajing2.png" v-if="this.magShow" class="img_size"/>
          </span>
        </el-col>
        <!--<el-col :span="4">-->
        <!--<img src="@/images/u1022.png" class="img_size"/>-->
        <!--<img src="@/images/u1024.png" class="img_size"/>-->
        <!--</el-col>-->
      </el-row>
      <el-row>
        <el-col>
          <div id="container" ref="tuImage"></div>
          <!--<kg-plot :loadData="this.nodeData" :wide="720"></kg-plot>-->
        </el-col>
      </el-row>
    </div>
    <div  >
      <el-row class="row-sr a-bottom-tab" :class="{'b-bottom-tab':hidden}">
        <el-tabs type="border-card" stretch>
          <el-tab-pane label="统计">
            <div class="middel1 statis">
              <div class="statT">
                <div class="title">实体类别</div>
                <div class="conent">
                  <span class="one">型号</span>
                  <span>5</span>
                  <span class="pill"></span>
                  <span>5</span>
                </div>
                <div class="conent">
                  <span class="one">产品</span>
                  <span>5</span>
                  <span class="pill"></span>
                  <span>5</span>
                </div>
                <div class="conent">
                  <span class="one">系统</span>
                  <span>5</span>
                  <span class="pill"></span>
                  <span>5</span>
                </div>
              </div>
              <div class="statT">
                <div class="title">关系类别</div>
                <div class="conent">
                  <span class="one">系统 型号组</span>
                  <span>5</span>
                  <span class="pill"></span>
                  <span>5</span>
                </div>
                <div class="conent">
                  <span class="one">产品 系统组</span>
                  <span>5</span>
                  <span class="pill"></span>
                  <span>5</span>
                </div>
              </div>
              <div class="statT">
                <div class="title">属性</div>
                <div class="conent">
                  <span class="one">型号</span>
                  <span>5</span>
                  <span class="pill"></span>
                  <span>5</span>
                </div>
                <div class="conent">
                  <span class="one">产品</span>
                  <span>5</span>
                  <span class="pill"></span>
                  <span>5</span>
                </div>
                <div class="conent">
                  <span class="one">系统</span>
                  <span>5</span>
                  <span class="pill"></span>
                  <span>5</span>
                </div>
                <div class="conent">
                  <span class="one">系统 型号组</span>
                  <span>5</span>
                  <span class="pill"></span>
                  <span>5</span>
                </div>
                <div class="conent">
                  <span class="one">系统 型号组</span>
                  <span>5</span>
                  <span class="pill"></span>
                  <span>5</span>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="实体">
            <div class="middel1">
              <el-table :data="resNode">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column label="实体名称" prop="name"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="事件">
            <el-table :data="resultlist" stripe>
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column label="关系名称" prop="username"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </div>
    <!-- 搜索话框 -->
    <el-dialog title="定位搜索" :visible.sync="searchVisible" width="30%" @close="searchDialogClosed">
      <el-input v-model="searchNode" placeholder="请输入内容" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="doSearchNode"></el-button>
      </el-input>
    </el-dialog>
    <!-- 历史记录 -->
    <el-dialog title="历史记录" :visible.sync="historyVisible" width="30%">
      <el-table :data="historylist" stripe>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="导入时间" prop="datatime"></el-table-column>
        <el-table-column label="导入实体数量" prop="number"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 保存主题 -->
    <el-dialog title="分享图谱" :visible.sync="themeVisible" width="750px">
      <Theme v-on:flag="shutDialog" v-bind:haoba="this.$refs.tuImage"></Theme>
    </el-dialog>
  </div>
</template>
<script>
const host = 'http://localhost:8081'
import Theme from '../components/Theme.vue'
// import { load } from './js/graph.js'
import { update } from './js/update'
// import { getGraphData } from './js/graph.js'
// import { gethistCache } from './js/graph'
import {pltKg} from "./js/pltkg";
import {magLens} from "./js/pltkg";
import {locateNode} from "./js/pltkg"
export default {
  components: {
    Theme
  },
  mounted() {
    this.restaurants = this.loadAll()


  },
  data() {
    return {
      hidden:false,
      //实体检索input
      ent: {
        input: '中北大学'
      },
      // 关系检索input
      relation: {
        inputScor: '中北大学',
        inputTage: '北京航空航天大学'
      },
      restaurants: [],
      state: '', //多选选中值
      activeName: 'first', //左侧检索实体
      total: 10, //总数分页
      page: {
        current: 1,
        pageSize: 5
      },
      tk: 'slkdflksadflasdjf',
      resultlist: [{ username: '发射车故障' }, { username: '系统_型号组成关系' }, { username: '产品_型号组成关系' }],
      searchVisible: false,
      historyVisible: false,
      themeVisible: false,
      historylist: [
        { datatime: '2019-06-28 16:32:50', number: 3 },
        { datatime: '2019-06-26 16:32:50', number: 1 },
        { datatime: '2019-06-27 16:32:50', number: 2 }
      ],
      searchForm: {
        search: []
      },
      searchFormRules: {
        search: [{ required: true, message: '请输入查询的内容', trigger: 'blur' }]
      },
      listData: [],
      // listData:[{id:0,name:"中北大学",mainKey:"问题1",detail:"分系统1"},
      //           {id:1,name:"北京理工大学",mainKey:"问题2",detail:"分系统2"},
      //           {id:2,name:"北京航空航天大学",mainKey:"问题3",detail:"分系统3"},
      //           {id:3,name:"三部",mainKey:"问题4",detail:"分系统4"},
      //           {id:4,name:"304",mainKey:"问题5",detail:"分系统5"}],
      nodeData: Object,
      searchNode: '',
      backCount: 1,
      bf: false,
      resNode: null,
      magShow:false
    }
  },
  methods: {
    //svg启动程序
    initSvg(data){

      pltKg(data)
      // this.hidden=false
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.page.current = newPage
      this.getSearchNeoEntity(this.state)
    },
    //输入input值
    changeValue(value) {
      console.log(value, 1111111111)

      this.getSearchNeoEntity(value)
    },
    //模糊搜索接口

    async getSearchNeoEntity(value) {
      const { data } = await this.$ajax({
        url: `${host}/api/searchNeoEntity/${value}?page=${this.page.current}&size=${this.page.pageSize}`
      })
      console.log(data, 'sousuo===============')
      this.total = data.count
      this.listData = data.datas
    },
    //模糊搜索
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return state => {
        return state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    loadAll() {
      return [
        { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        { value: 'Hot honey 首尔炸鸡（仙霞路）', address: '上海市长宁区淞虹路661号' },
        { value: '新旺角茶餐厅', address: '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { value: '泷千家(天山西路店)', address: '天山西路438号' }
      ]
    },
    handleSelect(item) {
      console.log(item)
      item.value = this.state
    },
    handleIconClick(ev) {
      console.log(ev)
    },
    //检索tabs
    handleClick() {},
    searchDialogClosed() {
      this.backCount = 1
      this.$refs.addressFormRef.resetFields()
    },
    showSearchDialog() {
      this.backCount = 1
      this.searchVisible = true
    },
    showHistoryDialog() {
      this.historylist = this.doHistory()
      this.backCount = 1
      this.historyVisible = true
    },
    doHistory() {
      this.$ajax
        .get('http://localhost:8023/getHistoriesByType?type=knowledge')
        .then(res => {
          let tableData = []
          res.data.data.histories.forEach((val, index, arr) => {
            let obj = {}
            // 处理record
            let subject = val.historySubject
            let scope = val.historyScope
            obj.record = subject + '（' + scope + '）'
            // 处理time
            let date = new Date(val.createDate)
            let year = date.getFullYear()
            let month
            if (date.getMonth() + 1 < 10) {
              month = '0' + (date.getMonth() + 1)
            } else {
              month = date.getMonth() + 1
            }
            let day
            if (date.getDate() + 1 < 10) {
              day = '0' + date.getDate()
            } else {
              day = date.getDate()
            }
            let hours = date.getHours()
            let minutes
            if (date.getMinutes() + 1 < 10) {
              minutes = '0' + date.getMinutes()
            } else {
              minutes = date.getMinutes()
            }
            let seconds
            if (date.getSeconds() + 1 < 10) {
              seconds = '0' + date.getSeconds()
            } else {
              seconds = date.getSeconds()
            }
            obj.time = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
            // 处理id
            obj.historyId = val.historyId
            tableData.push(obj)
          })
          return tableData
          // this.$Loading.service().close()
          // this.$emit("listenHistories", tableData)
        })
        .catch(error => {
          console.log(error)
          this.$alert('获取历史记录失败！', '错误', {
            confirmButtonText: '确定'
          })
          // this.$Loading.service().close()
        })
    },
    showThemeDialog() {
      this.backCount = 1
      this.themeVisible = true
    },
    //处理后台返回的数据
dataCur(){

},
    //关系检索
    async getShortestPath() {
      this.backCount = 1
      const { data } = await this.$ajax({
        url: `http://localhost:8023/MapDisplay/getShortestPath`,
        params: {
          node1Name: this.relation.inputScor,
          node2Name: this.relation.inputTage
        }
      })
      console.log(data,'关系检索=============');
      this.resNode = data.nodes
       update()
      console.log(data)
      this.initSvg(data)

      // load(data, 720, false)
    },
    //知识检索，实体检索
    nodeSearch(keyword) {
      this.backCount = 1
      this.$ajax
        .get('http://localhost:8023/MapDisplay/subGraph?nodeName=' + keyword)
        .then(res => {
          this.resNode = res.data.nodes
          // update()
          // load(res.data, 720, false)
           update()
          this.initSvg(res.data)
        })
        .catch(error => {
          this.$alert('知识检索失败！', '错误', {
            confirmButtonText: '确定'
          })
          console.log(error)
        })
    },
    removeGraph() {
      this.backCount = 0
      d3.select('#svgGraph')
        .select('#svgOne')
        .selectAll('*')
        .remove() // 清空SVG中的内容
    },
    doSearchNode() {
      this.backCount = 0
      this.searchVisible = false
      var finded = locateNode(this.searchNode)
      if (!finded) {
        this.$message.warning('没有找到该实体')}
      this.searchNode = ''
    },
    backShow() {
      let histCacheData = gethistCache()
      if (this.backCount < histCacheData.length) {
        this.backCount++
      } else {
        this.backCount = histCacheData.length
      }
      console.log(histCacheData.length - this.backCount)
      update()
      load(histCacheData[histCacheData.length - this.backCount], 720, true)
    },
    forwardShow() {
      let histCacheData = gethistCache()
      if (this.backCount > 0) {
        this.backCount--
      } else {
        this.backCount = 0
      }
      update()
      load(histCacheData[this.backCount], 720, true)
    },
    shutDialog(da) {
      this.themeVisible = da
    },
     magnifyeLens() {
      this.magShow = ! this.magShow
      console.log(this.magShow)
      let ob = this.magShow
      magLens(ob)
    }
  }
}
</script>
<style lang="less" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
// .slide-fade-enter-active {
//   transition: all .3s ease;
// }
// .slide-fade-leave-active {
//   transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
// }
// .slide-fade-enter, .slide-fade-leave-to
// /* .slide-fade-leave-active for below version 2.1.8 */ {
//   transform: translateX(10px);
//   opacity: 0;
// }
.collapse-transition {
  transition: 10s width ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
}

.atlas{
  display: flex;
  padding-right: 10px;

  .a-left{

    // border-right:1px solid #ccc;
    padding-right:5px;
    transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
    .a-left-tab{
      width: 200px;
      transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
      /deep/ .tabs-scrool{
    .el-tabs__nav-wrap.is-scrollable {
    padding: 0 ;
    box-sizing: border-box;
      }
      }

    }
    .b-left-tab{
      transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
      width: 0;


    }
  }

   .b-left{
    // border:none;
    padding-right:5px;
    transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
    width: 0;
  }
  .a-middle{
margin-left:10px;
flex:1;
  }
  .a-bottom-tab{
    width: 240px;
     transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
       
    /deep/ .el-tabs__nav-wrap.is-scrollable {
    padding: 0 ;
    box-sizing: border-box;
}
      
  }
  .b-bottom-tab{
    border: none;
    width: 0;
     transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
  }
}
  @font-face {font-family: "iconfont";
    src: url('//at.alicdn.com/t/font_1925900_6ahf9ivf635.eot?t=1594021059769'); /* IE9 */
    src: url('//at.alicdn.com/t/font_1925900_6ahf9ivf635.eot?t=1594021059769#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
    url('//at.alicdn.com/t/font_1925900_6ahf9ivf635.woff?t=1594021059769') format('woff'),
    url('//at.alicdn.com/t/font_1925900_6ahf9ivf635.ttf?t=1594021059769') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
    url('//at.alicdn.com/t/font_1925900_6ahf9ivf635.svg?t=1594021059769#iconfont') format('svg'); /* iOS 4.1- */
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-shilaji:before {
    content: "\e622";
  }

  .icon-icon-test:before {
    content: "\e633";
  }

  .icon-icon-test1:before {
    content: "\e634";
  }

  .icon-icon-test2:before {
    content: "\e63d";
  }

  .icon-icon-test3:before {
    content: "\e63f";
  }

  .icon-icon-test4:before {
    content: "\e641";
  }

  .icon-icon-test5:before {
    content: "\e642";
  }

  h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}


/deep/ .el-input__suffix {
  cursor: pointer;
}
.spn {
  font-weight: 700;
}
.paget {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.middel {
  height: calc(100vh - 131px);

  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
.middel1 {
  height: calc(100vh - 121px);

  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .top{
    overflow: hidden;
    .title1{
      margin: 10px 0;
    }
    .el-button{
      margin-top: 5px;
      float: right;

    }
  }
}
.statis {
  margin: 8px;
  .statT {
    margin-bottom: 10px;
    span {
      display: inline-block;
      margin: 5px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: #6d87a7;
      margin-bottom: 10px;
    }
    .conent {
      color: cornflowerblue;
      .one {
        width: 80px;
      }
      .pill {
        width: 40px;
        border-radius: 2px;
        border: 5px cornflowerblue solid;
        margin: 0 7px;
      }
    }
  }
}
.img_size {
  width: 30px;
  height: 30px;
  margin: 3px;
}
.img_size1 {
  width: 40px;
  height: 40px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.row-sr {

  padding-top: 10px;
  padding-bottom: 15px;
  border-bottom: 0.5px;
  border-bottom-style: solid #ccc;
  border-bottom-color: #797979;
  //height: 50px;
  // border-right: 1px;
  // border-right-style: solid;

  //   border-style: solid;
  //   border-top: 0.5px;
  //   border-top-style: solid;
  //   border-top-color: #797979;
}
</style>
