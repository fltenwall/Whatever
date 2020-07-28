<template>
  <el-container class="home-container">
    <el-header style="height:58px;">
      <div>
        <div class="img-home-logo"></div>
        <!-- <img src="../assets/u230.png" class="img-home-logo" alt /> -->
        <!-- <span>航天知识图谱</span> -->
      </div>
      <!-- <el-button type="info" @click="logout">退出</el-button> -->
      <i class="el-icon-s-fold" @click="fold=!fold" ></i>
       <div>
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
    </el-header>
    <el-container>
      <el-aside width="180px" :class="{asid:fold}">
        <!-- 侧边栏菜单区域 -->
        <el-menu
          class="menu"
          active-text-color="#2a82fe"
          unique-opened
          :collapse-transition="false"
          @select="handleSelected"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <!-- <i :class="iconsObj[item.id]"></i> -->
              <i class="icom"></i>
              <!-- 文本 -->
              <!-- <span>{{item.authName}}</span> -->
            </template>
          </el-submenu>
          <el-menu-item :index="item.index" v-for="item in aside_list" :key="item.index">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <img :src="require('../images/'+item.icon+'.png')" class="icom" />

              <span>{{item.title}}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <!-- <router-view></router-view> -->

        <el-tabs
          id="innerTab"
          v-model="editableTabsValue['active-tab']"
          type="card"
          closable
          @tab-remove="removeTab"
          @tab-click="clickTab"
          style="width: 100%;height: 100%;overflow-y: hidden;"
        >
          <el-tab-pane
            v-for="(item) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.title"
            style="height: 100%;"
          >
            <div
              v-if="item.menuorigin == 'remote' && item['isShow'] == 'true'"
              v-html="item.content"
            ></div>
            <div v-else class="localTabDiv">
              <router-view v-if="item['isShow'] == 'true'" class="overflow_h"></router-view>
              <!-- <keep-alive :include="keepAliveTagsList">
                <router-view v-if="item['isShow'] == 'true'" class="overflow_h"></router-view>
              </keep-alive>-->
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data() {
    return {
      fold:false,
      editableTabsValue: this.$my_editableTabsValue,
      editableTabs: this.$my_tag_list,
      default_active_index: { active: '' },

      aside_list: [
        {
          index: '/search',
          title: '智能检索',
          name: 'Search',
          icon: 'icon1',
          component: '@/components/search/Search.vue',
          path: '/search',
          menuorigin: 'local'
        },
        {
          index: 'atlasAnalysis',
          title: '图谱分析',
          name: 'AtlasAnalysis',
          icon: 'icon2',
          component: '@/components/AtlasAnalysis.vue',
          path: '/atlasAnalysis',
          menuorigin: 'local'
        },
        {
          index: 'collaboration',
          title: '协作共享',
          name: 'Collaboration',
          icon: 'icon3',
          component: '@/components/Collaboration.vue',
          path: '/collaboration',
          menuorigin: 'local'
        },
        {
          index: 'Morerecord',
          title: '全息档案',
          name: 'Morerecord',
          icon: 'icon3',
          component: '@/components/Morerecord.vue',
          path: '/morerecord',
          menuorigin: 'local'
        }
        // {
        //   index: 'test',
        //   title: 'test',
        //   name: 'HelloWorld4',
        //   icon: 'u196',
        //   component: '@/components/test.vue',
        //   path: 'test',
        //   menuorigin: 'local'
        // }
      ],
      // 左侧菜单数据
      menulist: []
    }
  },
  components: {},
  methods: {
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    /**
     * 移除Tab
     * @param targetName
     */
    removeTab(targetName) {
      // 记录移除标签的index
      let targetIndex = 0
      for (; targetIndex < this.editableTabs.length; ++targetIndex) {
        if (this.editableTabs[targetIndex].title == targetName) {
          break
        }
      }
      //如果移除的是当前Tab页，则激活当前页的上页或下页
      if (this.editableTabsValue['active-tab'] === targetName) {
        let nextTab = this.editableTabs[targetIndex + 1] || this.editableTabs[targetIndex - 1]
        if (nextTab) {
          //当前页并非最后一个tab页
          //删除目标页
          this.editableTabs.splice(targetIndex, 1)
          //调用子组件的方法，激活下一页
          this.clickTab({ name: nextTab.title })
        } else {
          //当前页是最后一个tab页
          //只需要 删除目标页
          this.editableTabs.splice(targetIndex, 1)
        }
      } else {
        ///如果移除的不是当前Tab页，只需要 删除目标页
        this.editableTabs.splice(targetIndex, 1)
      }
    },
    /*
           点击当前页
            */
    clickTab(tab) {
      let _this = this

      //查找主Tab的名称
      let childrenNode = _this.aside_list.concat()
      let tempData = { id: 0, title: '', children: childrenNode }
      let array = []
      let searchResult = { flag: false }

      this.searchMainTabName(tempData, tab.name, array, searchResult)

      //激活当前页所在的主Tab页
      _this.mainHandleSelected(array[1].index, [array[1].index])
      //选中当前页所在的左侧菜单栏的
      let key = ''
      let keyPath = ''

      for (let i = 0; i < _this.editableTabs.length; ++i) {
        if (_this.editableTabs[i].title == tab.name) {
          key = _this.editableTabs[i].key
          keyPath = _this.editableTabs[i].keyPath
          break
        }
      }

      _this.handleSelected(key, keyPath)
    },
    //切换子菜单
    mainHandleSelected: function(key, keyPath, node, aside_list) {
      if (aside_list == undefined) {
        aside_list = this.aside_list
      }
      for (let i = 0; i < aside_list.length; ++i) {
        if (aside_list[i].index == key) {
          //this.aside_list = aside_list[i].children
          this.MainTitle = aside_list[i].title
          break
        }
      }
      //this.collapse = true
    },
    //左侧菜单栏选中
    handleSelected: function(key, keyPath) {
      // this.default_active_index = key
      this.$set(this.default_active_index, 'active', key)

      let tabNode = { title: '', path: '', menuorigin: '', component: '' }
      for (let i = 0; i < this.aside_list.length; ++i) {
        if (this.aside_list[i].index == keyPath[0] && keyPath.length > 1) {
          this.aside_list[i].children.forEach(item => {
            if (item.index == keyPath[1]) {
              tabNode.title = item.title
              tabNode.path = item.path
              tabNode.menuorigin = item.menuorigin
              tabNode.component = item.component || ''
              tabNode.key = key
              tabNode.keyPath = keyPath
              tabNode.name = item.name
              return
            }
          })
        } else if (this.aside_list[i].index == keyPath[0] && keyPath.length == 1) {
          tabNode.title = this.aside_list[i].title
          tabNode.path = this.aside_list[i].path
          tabNode.menuorigin = this.aside_list[i].menuorigin
          tabNode.component = this.aside_list[i].component || ''
          tabNode.key = key
          tabNode.keyPath = keyPath
          tabNode.name = this.aside_list[i].name
          break
        }
      }
      this.addTab(tabNode)
    },
    addTab(tabNode) {
      //修改缓存信息
      let new_tab_list_keepAlive = this.$store.getters.keepAliveTagsList
      if (!new_tab_list_keepAlive.includes(tabNode.name, 0)) {
        new_tab_list_keepAlive.push(tabNode.name)
      }
      this.$store.commit('SET_KEEP_ALIVE', new_tab_list_keepAlive)

      //判断当前tab是否已存在，若存在，则直接激活即可
      let is_Existed = false
      this.$my_tag_list.forEach(item => {
        if (item.title == tabNode.title) {
          is_Existed = true
          item.isShow = 'true'
        } else {
          item.isShow = 'false'
        }
      })

      if (is_Existed) {
        this.$set(this.$my_editableTabsValue, 'active-tab', tabNode.title)

        if (tabNode.menuorigin == 'local') {
          this.$router.push(tabNode.path)
        }

        return
      }
      //当前tab不存在，添加新的tab页，并激活
      let content = ''
      if (tabNode.menuorigin == 'local') {
        this.$router.push(tabNode.path)
      } else if (tabNode.menuorigin == 'remote') {
        content = "<object type='text/html' data='" + tabNode.path + "' width='100%' height='100%'></object>"
      }

      this.$my_tag_list.push({
        title: tabNode.title,
        name: tabNode.name,
        content: content,
        menuorigin: tabNode.menuorigin,
        path: tabNode.path,
        key: tabNode.key,
        keyPath: tabNode.keyPath,
        isShow: 'true'
      })

      this.$set(this.$my_editableTabsValue, 'active-tab', tabNode.title)
    },
    // 通过子节点找到祖宗节点
    searchMainTabName(root, target, array, searchResult) {
      let _this = this
      if (searchResult.flag) {
        return
      }
      if (root.title == target) {
        array.push(root)
        this.$set(searchResult, 'flag', true)
        return
      } else {
        array.push(root)
        let children = root.children
        if (children != undefined && children != null) {
          children.forEach(item => {
            _this.searchMainTabName(item, target, array, searchResult)
          })
          if (!searchResult.flag) {
            array.pop()
          }
        } else {
          array.pop()
          return
        }
      }
    }
  },
  computed: {
    keepAliveTagsList() {
      return this.$store.getters.keepAliveTagsList
    }
  }
}
</script>
<style lang="less">
.el-menu-item.is-active {
  background-color: #c1defc !important;
  border-right: 4px solid #2a82fe;
  color: #2a82fe;
}
.menu {
  font-family: 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #868686;
}
.overflow_h {
  overflow-y: hidden;
}
.home-container {
  height: 100%;
}
.el-header {
  background-color: #1280fe;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 14px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
      font-size: 24px;
    }
  }
}
.asid{
  width: 0 !important;
  transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
}
.el-icon-s-fold{
    position: absolute;
    left: 200px;
    font-size: 16px;
    cursor: pointer;
}
.el-aside {
  transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
  .el-menu {
    border-right: none;
    .el-menu-item {
      color: rgba(109, 135, 167, 1);
      height: 46px;
      line-height: 46px;
    }
  }
  border: 1px !important;
  border-style: solid !important;
  border-color: #b1d2ff !important;

  //border-color: #C7CEDA !important;
}
.img-home-logo {
  width:170px;
  height: 30px;
  margin-left:20px;
  background-image: url('../assets/logo.png') ;
  background-size: cover;
}
.icom {
  margin-right: 10px;
  left: 0px;
  top: 0px;
  width: 20px;
  height: 20px;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 10px;
  /*overflow-y: auto;*/
  overflow-x: hidden;
  //position: absolute;
  width: 100%;
  // top: 29px;
  bottom: 0px;
}
#innerTab .el-tabs__content {
  box-sizing: border-box;
  // min-height: 100% ;
  // max-height: auto;
  //   height: calc(100% - 20px);

  //  overflow-y: auto;
  //     &::-webkit-scrollbar {
  //       display: none;
  //     }
  // overflow-y: hidden !important;
}
.localTabDiv {
  height: 98%;
  width: 100%;
  // padding-top: 5px;
  // padding-left: 10px;
  /*overflow-y: auto;*/
}
.el-main {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: 0px !important;
}
.el-tab-pane {
  //position: absolute;
  width: 100%;
  top: 0px;
  bottom: 0px;
}
.el-tabs--card > .el-tabs__header {
  border-bottom: 1px solid #b1d2ff ;
  margin: 0;
}
</style>


