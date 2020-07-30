<template>
  <div>
    <div v-show="status">
      <RecordSearch @changeStatus="changeStatus" />
    </div>

    <div v-show="!status" id="container">
      <Side :val="val" v-on:result="result" />

      <div v-if=" label === '型号' ">
        <div id="main">
<!--          <Header  />-->
<!--          <Middle />-->
<!--          <Footer />-->
              <Label :recordData="recordData" />
        </div>
      </div>

    </div>

  </div>
</template>

<script>
    // import Header from "./Header";
    // import Middle from "./Middle";
    // import Footer from "./Footer";
    import RecordSearch from "./components/RecordSearch";
    import Side from "./components/Side";
    import Label from "./modules/Label";

    export default {
        components:{
          // Header,
          // Middle,
          // Footer,
          RecordSearch,
          Side,
          Label
        },
        name: "Morerecord",
        data(){
            return {
              status:true,
              val:'',
              recordData:{},
              label:'',
            }
        },
        methods:{
           changeStatus(val){
             console.log('val',val);
             this.val = val;
             this.status = !this.status;
           },
          result(val){
            console.log('recordData',val);
            this.recordData = val;
            this.label = val.content.enetitylabel;
            console.log(this.label);
          }
        },

    }
</script>

<style scoped lang="less">
    #container{
        display: flex;
    }
</style>
