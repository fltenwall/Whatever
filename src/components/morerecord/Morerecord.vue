<template>
  <div>
    <div v-if="status">
      <RecordSearch/>
    </div>

    <div v-else>
      <Header  />
      <Middle/>
      <Footer v-bind:recodeData = "recordData" />
    </div>



  </div>
</template>

<script>
    import Header from "./Header";
    import Middle from "./Middle";
    import Footer from "./Footer";
    import RecordSearch from "./components/RecordSearch";

    export default {
        components:{
          Header,
          Middle,
          Footer,
          RecordSearch
        },
        name: "Morerecord",
        data(){
            return {
              status:true,
              recordData:{},
            }
        },
        methods:{
            getData(){
              this.$ajax({url:'http://192.168.43.228:8081/neo/qxGetEntity/型号/aa1/'})
                .then(response => (this.recordData = response.data))
                .then(()=>console.log(this.recordData));
            }
        },
        mounted() {
          this.getData();
        }
    }
</script>

<style scoped lang="less">

</style>
