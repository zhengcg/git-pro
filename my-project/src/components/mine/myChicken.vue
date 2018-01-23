<template>
	<div id="myChicken" v-infinite-scroll="loadMoreJ"
      infinite-scroll-disabled="loadingJ"
      infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
    <div v-for="(item,index) in list">
      <router-link :to="{name:'orderDetail',query:{id:item.uuid}}" class="chickenList" v-for="jtem in item.orderItems" :key="jtem.id">
        <div class="chickenHead">
          <i><img src="../../assets/icon/icon16.png"></i><span>{{jtem.farmName}}</span>
          <em v-if="item.step==1">已下单</em>
          <em v-if="item.step==2">已支付</em>
          <em v-if="item.step==3">已发货</em>
          <em v-if="item.step==4">已收货</em>
          <em v-if="item.step==5">已关闭</em>
        </div>
        <div class="chickBody">
          <div class="jiBox"><img :src="jtem.thumbnail"></div>
          <div class="jiCon">
            <h3>{{jtem.title}}</h3>
            <p>购买时间：{{item.orderCreateDate}}</p>
            <p>预计出栏时间：{{jtem.presaleDate}}</p>
          </div>
          <div class="jiPrice">
            <h3>￥{{jtem.finalPrice}}</h3>
            <p>x{{jtem.quantity}}</p>
          </div>
          
        </div>
        <div class="chickFoot">
          共{{jtem.quantity}}件商品<span>合计：￥{{jtem.finalAmount}}（包邮）</span>
        </div>
        <div class="payBtn" v-if="item.step==1">
          <a href="javascript:;" @click.stop="payFn(item.uuid)">付款</a>
        </div>
      </router-link>
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
      list:[],
      pageSize:10,
      pageNo:1,
      totalPage:0  
      
    }
  },
  mounted() {
    document.title="我的鸡";
    this.getList(1)
    
  },
  methods: {
  	payFn:function(id){
      var self=this;
      self.$router.push({
                path: '/orderDetail',
                query:{id:id}
              })
    },
    loadMoreJ(){
      var self=this;
      if (self.pageNo<self.totalPage) {
        if(!self.loadingJ){
          Indicator.open(); 
          self.loadingJ=true;
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
        this.axios.get(api.orderList, {
      　　params: {pageSize:self.pageSize,pageNo:pageNo}
      }).then(function (res) {
        Indicator.close();
        self.totalPage= Math.ceil(res.data.result.count/self.pageSize)
        for(var i=0;i<res.data.result.orders.length;i++){
          self.list.push(res.data.result.orders[i]) ;
        } 
        self.loadingJ = false;        
      }).catch(function (error) {
      　　Toast(error);
      });
      
    }
  }
}
</script>
<style lang="scss">
#myChicken{
  padding-top: 0.2rem;
  background:#efefef;
  .chickenList{
    margin-bottom: 0.2rem;
    
    text-decoration: none;
    display: block;
    .chickenHead{
      background: #fff;
      height: 1.1rem;
      line-height: 1.1rem;
      padding: 0 0.5rem;
      i{
        vertical-align: middle;
        margin-right: 0.32rem;
        img{
          width: 0.39rem;
          height:0.39rem;
          vertical-align: middle;
        }
      }
      span{
        vertical-align: middle;
        color: #333;
        font-size: 0.39rem;
        display: inline-block;
        width: 5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      em{
        font-weight: normal;
        font-style: normal;
        color: #ff4b4c;
        float: right;
        font-size: 0.33rem;
      }


    }
    .chickBody{
      background: #f6f6f6;
      padding: 0.4rem 0.5rem;
      display: -webkit-flex; /* Safari */
      display: flex;
      align-items:flex-start;
      .jiBox{
        width: 2.1rem;
        height: 2.1rem;
        margin-right: 0.45rem;
        img{
          width: 2.1rem;
          height: 2.1rem;
        }
      }
      .jiCon{
        width: 5.7rem;
        h3{
          color: #333;
          font-size: 0.36rem;
          font-weight: normal;
          margin-bottom: 0.2rem;
        }
        p{
          color: #999;
          font-size: 0.36rem;
        }
      }
      .jiPrice{
        text-align: right;
        width: 2.55rem;
        h3{
          color: #333;
          font-size: 0.36rem;
          font-weight: normal;
          margin-bottom: 0.2rem;
        }
        p{
          color: #999;
          font-size: 0.36rem;
        }

      }
    }
    .chickFoot{
      text-align: right;
      height: 0.7rem;
      line-height: 0.7rem;
      color: #333;
      font-size: 0.33rem;
      padding: 0 0.5rem;
      background:#fff;
      border-bottom: 1px solid #eaeaea;
      span{
        margin-left: 0.33rem;
      }
    }
    .payBtn{
      background: #fff;
      height: 0.8rem;
      padding: 0 0.5rem;
      line-height: 0.8rem;
      a{
        float: right;
        font-size: 0.33rem;
        display: block;
        height: 0.5rem;
        line-height: 0.5rem;
        width: 1.15rem;
        text-align: center;
        color: #fff;
        text-decoration: none;
        background: #ff3036;
        border-radius: 0.25rem;
        margin-top: 0.15rem;
      }
    }
  }
   
}
 
</style>