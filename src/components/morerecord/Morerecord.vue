<template>
  <div>
    <Header  />
    <Middle/>
    <Footer v-bind:recodeData = "recordData" />
  </div>
</template>

<script>
    import Header from "./Header";
    import Middle from "./Middle";
    import Footer from "./Footer";

    export default {
        components:{
          Header,
          Middle,
          Footer
        },
        name: "Morerecord",
        data(){
            // this.recordData = null;
            return {
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
