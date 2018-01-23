<template>
	<div id="custom">


    <ul
              v-infinite-scroll="loadMore5"
              infinite-scroll-disabled="loading5"
              infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
              <li class="list" v-for="(item,index) in list">
        <router-link :to="{name:'details', query: { id:item.id}}" class="clearfix">
                  <div class="listItem">
                    <!-- <div class="ids">{{index+1}}</div> -->
                    <div class="img">
                      <img :src="item.thumbnail" alt="小鸡儿">
                    </div>
                    <div class="con">
                      <div class="tit">{{item.goodsCategory.name}}</div>
                      <div class="adr">{{item.farmInfo.name}}</div>
                      <div class="logistics">顺丰包邮/坏单包赔</div>
                    </div>
                    <div class="info">
                      <div class="info1">数关检测</div>
                      <div class="info2">通过</div>
                    </div>
                    <div class="arr">
                      <img src="../../assets/icon/icon01.png">
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
    
	</div>
</template>
<script>
import { Range } from 'mint-ui';
import api from '../../api/api';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  name: 'hello',
  data() {
    return {
      pageSize:10,
      pageNo:1,
      totalPage:0,
      custom:true,
      minStep:10000,
      maxStep:10000,
      envValue:1,
      minLevel:1,
      maxLevel:6,
      list: [],
      minPrice:'',
      maxPrice:'',
      priceDefault:0,
      goodsCategory:''
    }
  },
  
  mounted() {
    this.maxStep = this.$route.query.maxStep;
    this.minPrice=this.$route.query.minPrice;
    this.maxPrice=this.$route.query.maxPrice;
    this.minLevel=this.$route.query.minLevel;
    this.goodsCategory=this.$route.query.goodsCategory
    this.getList(1);   
  },
  watch:{
        '$route.query':function (val) {
            this.maxStep = val.maxStep;
            this.minPrice=val.minPrice;
            this.maxPrice=val.maxPrice;
            this.minLevel=val.minLevel;
            this.goodsCategory=val.goodsCategory;
            this.list=[];
            this.getList(1);
        }
    },
  methods: {   
    loadMore5() {
      var self=this;
        if (self.pageNo<self.totalPage) {
        if(!self.loading5){
          Indicator.open(); 
          self.loading5=true;
          self.pageNo++
          setTimeout(function(){
            self.getList(self.pageNo);
          },500)       
          
          }
        }         
  },
  getList(pageNo){
    var self=this;
        Indicator.open();               
        this.axios.get(api.goodsList, {
      　　params: {pageSize:self.pageSize,pageNo:pageNo,goodsCategoryIds:self.goodsCategory,minStep:self.minStep,maxStep:self.maxStep,minPrice:self.minPrice,maxPrice:self.maxPrice,minLevel:self.minLevel,maxLevel:6}
      }).then(function (res) {
        Indicator.close();
        if(res.data.code==200){
          self.totalPage= Math.ceil(res.data.result.count/self.pageSize)
          for(var i=0;i<res.data.result.list.length;i++){
            self.list.push(res.data.result.list[i]);         
          }        
          self.loading5 = false;
        }else{
          Toast(res.data.message)
        }
                
      }).catch(function (error) {
      　　Toast(error);
      });

  }
   
  }
}
</script>

<style lang="scss">
#custom{
  .list{
  display: inherit;
  border-bottom:1px solid #eaeaea;
  background:#fff;}
  .list a{text-decoration: none!important;display: block;width: 100%;overflow: hidden;}
.listItem{
  display: -webkit-flex; /* Safari */
    display: flex;
     align-items:center;
     justify-content:center;
     height: 1.5rem;
     padding: 0.4rem 0;
     border:none;
    .ids{text-align: center;color: #999;font-size: 0.42rem;width: 1.1rem;}
  .img{
    width:1.5rem;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 0.5rem;
    img{width: 1.5rem;height: 1.5rem;}
  }
  .con{
    width:5.32rem;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    box-sizing: border-box;
    .tit{font-size: 0.3915rem;color: #333;margin-bottom: 0.1rem;}
    .adr{
      font-size: 0.3313rem;color: #999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow:ellipsis;
    }
    .logistics{font-size: 0.271rem;color: #999;}
  }
  .info{
    width:2.17rem;
    .info1{font-size: 0.3915rem;color: #333;margin-bottom: 0.1rem;}
    .info2{font-size: 0.3313rem;color: #999;}
    .info3{font-size: 0.271rem;color: #5aceec;}
  }
  .arr{width:0.7rem;img{width: 0.22rem;}}
}
  
  
}

</style>