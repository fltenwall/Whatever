<template>
    <div>
      <Header :content="content" />
      <D3 :content="content" />
      <PureWord :wentifenxi="wentifenxi" />

    </div>
</template>

<script>
    import Header from "../Header";
    import PureWord from "../components/PureWord";
    import D3 from  "../components/d3"
    export default {
        name: "Problem",
        props:['recordData'],
        components:{
          Header,
          D3,
          PureWord
        },
      data(){
        return {
          content:this.recordData.content,
          wentifenxi:this.recordData.wentifenxi
        }
      },
    }
</script>

<style scoped>

</style>
