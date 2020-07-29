<template>
    <div>
      <Header/>
      <Middle/>
      <Footer/>
    </div>
</template>

<script>
    import Header from "../Header";
    import Middle from "../Middle";
    import Footer from "../Footer";

    export default {
        name: "Label",
        components:{
          Header,
          Middle,
          Footer
        }
    }
</script>

<style scoped lang="less">

</style>
