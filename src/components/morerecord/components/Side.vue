<template>
  <div class="tran">
    <div class="a-left" :class="{'b-left':hidden}">
      <div class="row-sr a-left-tab" :class="{'b-left-tab':hidden}">
        <el-tabs v-model="activeName" class="tabs-scrool" @tab-click="handleClick" stretch>
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
              <div class="result">搜索结果</div>
              <!-- 初始化搜索 -->
              <div class="seachM" v-if="listData.length==0">暂无搜索内容</div>
              <div class="seaShow">
                <div class="row-sr" v-for="item of listData" :key="item.name">
                  <div @click="nodeSearch(item.entityvalue,item.entitylabel)">
                    <el-col :span="6">
                      <img src="@/images/u262x.png" class="img_size1" />
                    </el-col>
                    <el-col :span="18">
                      <div style="margin-bottom:5px;">{{item.entityvalue}}</div>
                      <div style="margin-bottom:5px;">
                        <span class="spn">主键：</span>
                        {{item.entitykey}}
                      </div>
                      <div>
                        <span class="spn">本体：</span>
                        {{item.entitylabel}}
                      </div>
                    </el-col>
                  </div>
                </div>
              </div>
            </div>

            <div class="paget" v-if="!hidden">
              <!-- 分页区域 -->
              <el-pagination
                background
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
                <el-button
                  type="primary"
                  icon="el-icon-search"

                  size="mini"
                  @click="getShortestPath"
                >检索</el-button>
              </div>
              <el-divider style="background-color:#DBECFF;"></el-divider>
              <div class="top">
                <div class="title1">实体检索</div>
                <el-input
                  style="margin-bottom:10px;"
                  clearable
                  size="small"
                  v-model="ent.input"
                  placeholder="请输入实体"
                ></el-input>

                <el-button
                  type="primary"
                  icon="el-icon-search"

                  size="mini"
                  @click="nodeSearch(ent.input)"
                >检索</el-button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="tran-le" @click="hidden = !hidden">
      <div class="trangle" :class="{'trangle1':hidden}"></div>
    </div>
  </div>
</template>

<script>
    const host = 'http://192.168.43.228:8081';
    import {update} from "../../js/update";

    export default {
        name: "Side",
        props:['val'],
        data() {
          return {
            result:{},
            wnode:null,
            hidden: false,
            hiddenRight: false,
            //实体检索input
            ent: {
              input: '推进系统'
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
            nodeData: Object,
            searchNode: '',
            backCount: 1,
            bf: false,
            resNode: null,
            magShow: false
          }
        },
        methods:{
            handleClick(){},
            //输入input值
            changeValue(value) {
              this.getSearchNeoEntity(value)
            },
            nodeSearch(entityvalue,entitylabel) {
              this.backCount = 1
              this.$ajax
                .get(`${host}/neo/qxGetEntity/${entitylabel}/${entityvalue}/`)
                .then(res => {
                  console.log(res);
                  this.result = res;
                  this.$emit("result",this.result.data);
                })
                .catch(error => {
                  this.$alert('知识检索失败！', '错误', {
                    confirmButtonText: '确定'
                  });
                  console.log(error)
                })
            },
            // 监听 页码值 改变的事件
            handleCurrentChange(newPage) {
              console.log(newPage);
              this.page.current = newPage
              this.getSearchNeoEntity(this.state)
            },
            async getShortestPath() {
            this.backCount = 1
            const { data } = await this.$ajax({
              url: `${host1}/MapDisplay/getShortestPath`,
              params: {
                node1Name: this.relation.inputScor,
                node2Name: this.relation.inputTage
              }
            })

            this.resNode = data.nodes
            this.wnode=data
            update()

            this.initSvg(data)

            // load(data, 720, false)
          },
          //模糊搜索接口

            async getSearchNeoEntity() {
              const { data } = await this.$ajax({
                url: `${host}/api/searchNeoEntity/${this.state}?page=${this.page.current}&size=${this.page.pageSize}`
              });
              console.log(data, 'sousuo===============');
              this.total = data.count;
              this.listData = data.datas
            },
        },

        watch:{
          val(value){
            this.state =  value;
            this.getSearchNeoEntity();
          }
        },

        created() {
          this.state = this.val;
        }
    }
</script>

<style scoped lang="less">
  .tran {
    display: flex;
    .tran-le {
      z-index: 1;
      cursor: pointer;
      width: 26px;
      background-color: #eff7ff;
      height: 100%;
      opacity: 1;
      border-left: 1px solid #afdcfa;
      display: flex;
      align-items: center;
      justify-content: center;
      .trangle {
        width: 0;
        height: 0;
        border-right: 10px solid #7faafd;
        border-left: 10px solid transparent;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
      }
      .trangle1 {
        width: 0;
        height: 0;
        border-left: 10px solid #7faafd;
        border-right: 10px solid transparent;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
      }
      .trangle2 {
        width: 0;
        height: 0;
        border-right: 10px solid #7faafd;
        border-left: 10px solid transparent;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
      }
    }
  }

  .a-left {
    box-shadow: 1px 2px 4px rgba(175, 220, 250, 1);

    transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
    .a-left-tab {
      width: 200px;
      transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
      /deep/ .tabs-scrool {
        padding: 5px 0px;
        .el-tabs__header {
          margin: 0;
          .el-tabs__nav-scroll {
            color: #98bff5 !important;
            .el-tabs__nav {
              border-bottom: 1px solid #afdcfa;

              .el-tabs__item {
                padding: 0;
                width: 100px !important;
              }
            }
          }
        }
        .el-tabs__content {
          padding: 13px;
          background-color: #f9f9f9;
        }

        .el-tabs__nav-wrap.is-scrollable {
          padding: 0;
          box-sizing: border-box;
        }
      }
    }
    .b-left-tab {
      transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
      width: 0;
    }

    .b-left {
      padding-right: 5px;
      transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
      width: 0;
    }
  }

  .seachM {
    margin-top: 60%;
    font-size: 18px;
    text-align: center;
    color: rgba(164, 195, 255, 1);
  }
  .seaShow{
    margin-top: 70px;
    height: calc(100% - 100px);
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .result {
    padding-left: 15px;
    font-size: 14px;
    background-color: #fff;
    color: #2a82fe;
    width: calc(100% - 15px);
    height: 35px;
    line-height: 35px;
    position: absolute;
    left: 0;
    top: 60px;
    border-top: 2px solid rgba(181, 212, 255, 1);
    border-bottom: 2px solid rgba(181, 212, 255, 1);
  }
  .middel1 {
    height: calc(100vh - 121px);

    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .top {
      overflow: hidden;
      .title1 {
        font-weight: 700;
        margin: 10px 0;
        font-size: 16px;
        color: #54677e;
      }
      .el-button {
        margin-top: 5px;
        float: right;
      }
      .el-button--primary {
        color: #fff;
        background-color: #86aefb;
        border-color: #86aefb;
      }
      .el-button:focus,
      .el-button:hover {
        color: #fff;
        border-color: #c6e2ff;
        background-color: #86aefb;
      }
      .el-button--primary.is-active,
      .el-button--primary:active {
        background: #86aefb;
        border-color: #86aefb;
        color: #fff;
      }
    }
    .el-divider {
      background-color: #afdcfa;
    }
  }
  .middel {
    /*height: calc(100vh - 131px);*/
    height: calc(100vh + 250px);
    // overflow-y: auto;

    // &::-webkit-scrollbar {
    //   display: none;
    /*// }*/
    .result {
      padding-left: 15px;
      font-size: 14px;
      background-color: #fff;
      color: #2a82fe;
      width: calc(100% - 15px);
      height: 35px;
      line-height: 35px;
      position: absolute;
      left: 0;
      top: 60px;
      border-top: 2px solid rgba(181, 212, 255, 1);
      border-bottom: 2px solid rgba(181, 212, 255, 1);
    }

    .seachM {
      margin-top: 60%;
      font-size: 18px;
      text-align: center;
      color: rgba(164, 195, 255, 1);
    }
    .seaShow{
      margin-top: 70px;
      height: calc(100% - 100px);
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
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
  }

</style>
