<template>
  <div ref="imageTofile">
    <el-form
      :model="themeForm"
      :rules="rules"
      ref="themeForm"
      label-width="80px"
      class="demo-ruleForm"
      label-position="right"
    >
      <el-row class="bottom-w">
        <el-col :span="10">
          <img src="../images/u1510.png" />
        </el-col>
        <el-col :span="14">
          <el-form-item label="截图">
            <el-input v-model="themeForm.file" class="input-w"></el-input>
            <el-button @click="toImage">截图</el-button>
            <!--<el-select class="input-w">-->
              <!--<el-option label="仅自己可见" value="shanghai"></el-option>-->
              <!--<el-option label="新建主题" value="beijing"></el-option>-->
            <!--</el-select>-->
          </el-form-item>
          <el-form-item label="图名称">
            <el-input v-model="themeForm.name" class="input-w"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row>-->
        <!--<el-col :span="24">-->
          <!--<el-form-item label="图片ID">-->
            <!--<el-input type="input-w" v-model="themeForm.picId"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <el-row>
        <el-form-item label="成员分享">
          <el-transfer
            class="el-input-t"
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入成员"
            v-model="value"
            :data="data"
          ></el-transfer>
        </el-form-item>
      </el-row>
      <el-row class="conent-right">
        <el-button @click="sendUrl">确认</el-button>
        <el-button @click="colseD">取消</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
const host1='http://192.168.191.3:8023'
// 引入html2canvas
import html2canvas from 'html2canvas'
export default {
  props:['haoba'],
  data() {
    const generateData = _ => {
      const data = []
      const cities = ['100011', '100012', '100013', '100014', '100015', '100016', '100017']
      const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu']
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        })
      })
      return data
    }
    return {
      themeForm: {
        file: '',
        name: '',
        userId: ''
      },
      citiesId: ['100011', '100012', '100013', '100014', '100015', '100016', '100017'],
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
        date1: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }]
      },
      data: generateData(),
      value: [],
      htmlUrl: File,
      showFlag: false,
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1
      }
    }
  },
  methods: {
    toImage () {
      // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
      html2canvas(this.haoba, {
        backgroundColor: null,
        useCORS: true // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
      }).then((canvas) => {
        console.log(canvas,'=====================================');
        let url = canvas.toDataURL('image/png')
        let filename = `${new Date().getTime()}.jpg`
        this.htmlUrl = this.dataUrltoFile(url, filename)
        this.themeForm.file = filename
      })
    },
    dataUrltoFile(dataurl,curImgName){
      let filename=curImgName
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
      while(n--){
        u8arr[n] = bstr.charCodeAt(n)
      }
      let imageFile = new File([u8arr], filename, {type:mime})
      return imageFile

      // var fd = new FormData(document.getElementById('imgUpload'));
      // fd.set('imgFile',file);
      // this.compressedFile = fd;
    },
    sendUrl () {
      // 如果图片需要formData格式,就自己组装一下,主要看后台需要什么参数
      const formData = new FormData()
      formData.append('pictureFile', this.htmlUrl)
      formData.append('name', this.themeForm.name)

      let userIdList = []
      this.themeForm.userId.split(',').forEach((val)=>{
        userIdList.push(this.citiesId[val])
      })
      formData.append('userId', userIdList.toString())
      // formData.append('picId', this.themeForm.picId)
      this.$ajax({
        url: host1+'/upload/pic/addImage',
        method: 'post',
        data: formData
      }).then(res => {
        console.log(res.data)
      })
      this.themeForm.file = ''
      this.themeForm.name = ''
      this.themeForm.userId = ''
      // this.themeForm.picId = ''
      this.$emit('flag', this.showFlag)
    },
    colseD() {
      console.log(this.showFlag)
      this.themeForm.file = ''
      this.themeForm.name = ''
      this.themeForm.userId = ''
      // this.themeForm.picId = ''
      this.$emit('flag', this.showFlag)
    }
  }
}
</script>
<style lang="less" scoped>
.input-w {
  width: 245px;
}
.bottom-w {
  margin-bottom: 30px;
}
.conent-right {
  text-align: right;
}
.el-transfer-panel__filter{
  &> input {
    width: 168px;
  }
}
.el-input__inner, .el-transfer-panel__filter{
  width: 168px !important
}
</style>
