<template>
  <div id="env">
      <div class="imgBox" style="padding: 0.5rem;">
          {{farmInfo.province}} {{farmInfo.city}} {{farmInfo.county}} {{farmInfo.address}}
          <a href="javascript:;" @click="wxAdr" class="findMap">查看地图</a>
        </div>
        <img :src="item" v-for="item in farmImg">
        <div class="introBox">
          <span></span>
          {{farmInfo.farmDesc}}
          
        </div>
        <img :src="item" v-for="item in farmFile">
         <img :src="item" v-for="item in foodContent">
        <div style="padding: 0.5rem;">
          {{farmInfo.foodDesc}}
        </div>


        <img :src="item" v-for="item in meatFile">
        <div style="padding: 0.5rem;">
          {{farmInfo.meatDesc}}
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
      farmFile:[],
      farmImg:[],
      meatFile:[],
      foodContent:[]
      
    }
  },
  created(){
    this.id = this.$route.query.id;
    this.getInfo();
  },
  mounted() {
    document.title="环境情况";  
  },
  methods: {
    getInfo(){
      var self=this;
      Indicator.open();
        this.axios.get(api.farmInfo, {params: {id:self.id}}).then(function (res) {
            Indicator.close();
            if(res.data.code==200){
              self.farmInfo=res.data.result;
              self.farmImg=self.farmInfo.farmImg.split(",");
              self.farmFile=self.farmInfo.farmFile.split(",");
              self.meatFile=self.farmInfo.meatFile.split(",");
              self.foodContent=self.farmInfo.foodContent.split(",");
            }else{
              Toast(res.data.message);
            }
            
          }).catch(function (error) {
          　　Toast(error);
          });

    },
      wxAdr:function(){
        var self=this;
        wx.openLocation({
          latitude: self.farmInfo.latitude, // 纬度，浮点数，范围为90 ~ -90
          longitude: self.farmInfo.longitude, // 经度，浮点数，范围为180 ~ -180。
          name: self.farmInfo.name, // 位置名
          address: self.farmInfo.address, // 地址详情说明
          scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
          infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        });
      },
 
   
  }
}
</script>
<style lang="scss">
#env{
  background: #fff;
  .findMap{
      display: block;
      margin:0.5rem auto;
      text-align:center;
      text-decoration: none;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.38rem;
      color: #fff;
      background: #0fc1e7;
      border-radius: 0.05rem;
    }
    img{
      display: block;
      margin:0 auto;
      width: 9.8rem;
    }
    .imgBox{
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