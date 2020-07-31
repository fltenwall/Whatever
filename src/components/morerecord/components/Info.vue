<template>
    <div id="info">
      <div id="info-left">
        <img :src='imgUrl' alt="">
      </div>
      <div id="info-right">
        <div id="info-right-title">
          <p>{{this.content.enetityvalue}}</p>
        </div>
        <div id="info-right-content">
          <span>创建时间：{{this.content.createTime}}</span>
          <span>型号：{{this.content.enetitylabel}}</span>
          <span>ID：{{this.content.enetityid}}</span>
          <span>主键：{{this.content.entitykey}}</span>
        </div>
      </div>
    </div>
</template>

<script>
    // import xinghao from '../../../images/u262x.png'
    // import zhiliangwenti from '../../../images/u253.png'
    export default {
        name: "Info",
        props:['content'],
        data(){
            return {
              imgUrl:require('../../../images/u262x.png'),
              imgName:''
          }
        },

        methods:{
          isUrl(label){
            switch (label) {
              case "型号":
                this.imgName = 'u262x.png';
                break;
              case "质量问题":
                this.imgName = 'u253.png';
                break;
            }
          }
        },

        //动态加班图片，此处还未实现，但是进度赶得跟记得拉屎一样，么得办法，先撂这儿吧
        watch:{
            imgUrl(){
              return  require("../../../images/" + this.imgName);
            }
        },

        mounted() {
            this.isUrl(this.content.enetityvalue);
        }
    }
</script>

<style scoped>
  #info{
    display: flex;
    height: 100%;
    /*border: 1px solid #cccccc;*/
  }
  #info-left{
    width: 20%;
    border-right: 1px solid #cccccc;
    display: flex;
  }
  #info-left img{
    width: 80%;
    flex:1;
    margin: 10%;
  }
  #info-right{
    flex:1;
    padding-left:5%;
  }
  #info-right-title{
    height: 20%;
    font-weight: bold;
    font-size: 18px;
  }
  #info-right-content{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  #info-right-content span{
    flex:1;
    width: 25%;
    min-width: 25%;
    max-width: 25%;
  }
</style>
