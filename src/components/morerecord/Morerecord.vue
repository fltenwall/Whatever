<template>
  <div>
    <div v-show="status">
      <RecordSearch @changeStatus="changeStatus" />
    </div>

    <div v-show="!status" id="container">
      <Side :val="val" v-on:result="result" />

      <div v-if=" label === '型号' " :key="this.recordData.content.enetityid">
        <div class="main">
          <Label :recordData="recordData" />
        </div>
      </div>

      <div v-else-if=" label === '质量问题' " :key="this.recordData.content.enetityid" >
        <div class="main">
          <Problem :recordData="recordData" />
        </div>
      </div>

      <div v-else-if=" label === '内部单位' " :key="this.recordData.content.enetityid">
        <div class="main">
          <Company :recordData="recordData" />
        </div>
      </div>

    </div>

  </div>
</template>

<script>
    import RecordSearch from "./components/RecordSearch";
    import Side from "./components/Side";
    import Label from "./modules/Label";
    import Problem from "./modules/Problem";
    import Company from "./modules/Company";

    export default {
        components:{
          Problem,
          RecordSearch,
          Side,
          Label,
          Company
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
          },
          isShow(){
              let label = this.recordData.content.enetitylabel;
              switch (label) {
                case "型号":
                  this.label1 = true;
                  break;
                case "质量问题":
                  this.label2 = true;
                  break;
              }
          }
        }
    }
</script>

<style scoped lang="less">
    #container{
        display: flex;
    }
  .main{
      flex: 1;
  }
</style>
