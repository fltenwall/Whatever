<template>
    <div id="middle">
        <div id="middle-left">
          <div v-show="status">
            <TableCount :fenlei="fenlei" />
          </div>

          <div v-show="!status">
            <RelationCount :relation="relation" />
          </div>
        </div>

        <div id="middle-right">
            <div v-show="status">
              <Table :fenlei="fenlei" />
            </div>

            <div v-show="!status">
              <Pie :fenlei="fenlei" />
            </div>
        </div>
    </div>
</template>

<script>
    import Table from "./components/Table";
    import TableCount from "./components/TableCount";
    import RelationCount from "./components/RelationCount";
    import Pie from "./components/Pie";
    export default {
        components:{
          Table,
          TableCount,
          RelationCount,
          Pie,
        },
        props:['fenlei','content','relation'],
        name: "Middle",
        data(){
          return{
            status : false
          }
        },
        methods:{
          changeStatus(){
            if(this.content.enetitylabel === '型号'){
              this.status = !this.status;
            }
          }
        },
        mounted() {
          this.changeStatus();
        }

    }
</script>

<style scoped lang="less">
  #middle{
    width: 95%;
    height: 300px;
    margin: 0 auto;
    padding:20px 0;
    /*background-color: lightpink;*/
    /*border: 1px solid #cccccc;*/
    border-radius: 5px;
    font-size: 16px;
  }
  #middle-left,#middle-right{
    width: calc(49% - 2px);
    height: 100%;
    float: left;
    border: 1px solid #cccccc;
  }
  #middle-left{
    margin-right: 2%;
  }
</style>
