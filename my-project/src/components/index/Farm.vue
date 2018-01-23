<template>
	<div id="farm">
  <h3 style="height: 1rem;line-height: 1rem;padding: 0 0.5rem;">{{farmInfo.name}}</h3>
    <div class="imgBox">

          <img :src="item" v-for="item in farmerImg">
        </div>
    <div class="introBox">
      <span></span>
      {{farmInfo.farmerDesc}}
    </div>
		  
	</div>
</template>
<script>
import api from '../../api/api';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  name: 'hello',
  data() {
    return {
      farmInfo:{},
      id:'',
      farmerImg:[]
      
    }
  },
  created(){
    this.id = this.$route.query.id;
    this.getInfo();
  },
  mounted() {
    document.title="农场";
       
  },
  methods: {
    getInfo(){
      var self=this;
      Indicator.open();
        this.axios.get(api.farmInfo, {params: {id:self.id}}).then(function (res) {
            Indicator.close();
            if(res.data.code==200){
              self.farmInfo=res.data.result;
              self.farmerImg=self.farmInfo.farmerImg.split(","); 
            }else{
              Toast(res.data.message);
            }
            
          }).catch(function (error) {
          　　Toast(error);
          });

    }
 
   
  }
}
</script>
<style lang="scss">
#farm{
  background: #fff;
      .imgBox{
      width: 9.8rem;
      margin: 0 auto;
      img{
        width: 100%;
      }
    }
  .introBox{
    padding: 0.5rem;
    padding-left: 0.9rem;
    position: relative;
    font-size: 0.36rem;
    color:#666;
    line-height:1.5;
    span{
        position:absolute;
        display: block;
        width: 0.1rem;
        height:0.4rem;
        background:#0fc1e7;
        top: 0.6rem;
        left: 0.5rem;

      }

    }
  
}
 
</style>