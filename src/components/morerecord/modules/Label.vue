<template>
    <div>
      <Header :content="content" />
      <Middle :fenlei="fenlei" :content="content" />
      <Footer :xulie="xulie" :content="content" />
    </div>
</template>

<script>
    import Header from "../Header";
    import Middle from "../Middle";
    import Footer from "../Footer";

    export default {
        name: "Label",
        props:['recordData'],
        data(){
          return {
            content:this.recordData.content,
            xulie:this.recordData.shijianxulie,
            fenlei:this.recordData.yuanyinfenlei
          }
        },
        components:{
          Header,
          Middle,
          Footer
        }
    }
</script>

<style scoped lang="less">

</style>
