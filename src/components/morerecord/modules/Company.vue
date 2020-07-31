<template>
  <div>
    <Header :content="content" />
    <Middle :fenlei="fenlei" :content="content" :relation="relation" />
    <Footer :xulie="xulie" />
  </div>
</template>

<script>
    import Header from "../Header";
    import Middle from "../Middle";
    import Footer from "../Footer";
    export default {
        name: "Company",
        props:['recordData'],
        components:{
          Header,
          Footer,
          Middle
        },
        data() {
          return {
            content: this.recordData.content,
            fenlei: this.recordData.yuanyinfenlei,
            xulie:this.recordData.shijianxulie,
            relation:this.recordData.gongtongzeren
          }
        }
    }
</script>

<style scoped>

</style>
