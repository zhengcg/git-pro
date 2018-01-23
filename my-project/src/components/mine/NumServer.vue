<template>
	<div id="numServer">
      <div class="head">
        <div class="vipBox">
          <div class="titHead">
            <span></span><em>我的数据服务</em>
          </div>
          <!-- <mt-progress :value="20" :bar-height="5"></mt-progress> -->
          <p>为保障食用鸡品质及安全，我们采用AI溯源技术，为您提供鸡的
运动、健康、环境、食品安全等数据，以数据定义健康鸡的付费
服务产品</p>
        </div>
      </div>
      <div style="height:1rem"></div>
      <table>
        <thead>
          <tr>
            <th>会员到期</th>
            <th>会员剩余</th>
            <th>可用次数</th>
          </tr>
        </thead>
        <tbody v-infinite-scroll="loadMoreS"
      infinite-scroll-disabled="loadingS"
      infinite-scroll-distance="10">
          <tr v-for="item in serList">
            <td><i></i><em>{{item.expireDate}}</em></td>
            <td>{{item.days}}</td>
            <td><span>剩余{{item.count}}次</span></td>
          </tr>
          
        </tbody>
      </table>
      <div style="height:1.4rem;"></div>
      <router-link :to="{name:'numOrder'}" class="saveBtn">购买数据服务</router-link>
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
      serList:[],
      pageSize:10,
      pageNo:1,
      totalPage:0   
      
    }
  },
  mounted() {
    document.title="数据服务"
    this.getMsg(1)
    
  },
  methods: {
    loadMoreS(){
      var self=this;
      if (self.pageNo<self.totalPage) {
        if(!self.loadingS){
          Indicator.open(); 
          self.loadingS=true;
          self.pageNo++
          setTimeout(function(){
            self.getMsg(self.pageNo);
          },500)       
          
          }
        }
    },
    getMsg(pageNo){
      
        var self=this;
        Indicator.open();               
        this.axios.get(api.dataService, {
      　　params: {pageSize:self.pageSize,pageNo:pageNo}
      }).then(function (res) {
        Indicator.close();
        self.totalPage= Math.ceil(res.data.result.count/self.pageSize)
        if(res.data.result.count>0){
          for(var i=0;i<res.data.result.dataServiceList.length;i++){
            self.serList.push(res.data.result.dataServiceList[i]) ;
          } 
        }
        
        self.loadingS = false;        
      }).catch(function (error) {
      　　Toast(error);
      });
      
    }

   
  }
}
</script>
<style lang="scss">
#numServer{
  background: #fff;
  height:100%;
  .head{
    height: 2.5rem;
    background: #cfa634;
    position: relative;
    .vipBox{
      width: 9.8rem;
      height:3rem;
      border-radius: 0.1rem;
      background: #fff;
      box-shadow: 0 0 3px rgba(86, 96,117,0.3);
      left: 50%;
      margin-left: -4.9rem;
      top: 0.45rem;
      position: absolute;
      padding: 0.5rem;
      box-sizing: border-box;
      p{
        font-size:0.3rem;
        color:#999;
      }
      .titHead{
        height:0.6rem;
        line-height: 0.6rem;
        color:#333;
        font-size: 0.42rem;
        margin-bottom:0.4rem; 
        span{
          vertical-align: middle;
          display: inline-block;
          width: 0.59rem;
          height:0.6rem;
          background: url("../../assets/icon/icon12.png") no-repeat center;
          background-size: 0.59rem 0.53rem;
        }
        em{
          vertical-align: middle;
          margin-left: 0.25rem;
          font-style: normal;
        }
      }
    }
  }
  table{
    width: 100%;
    text-align: center;
    color:#333;
    font-size: 0.36rem;
    th{
      height:1.8rem;
      line-height:1.8rem;
      font-weight: normal;
      
    }
    td{
      height:0.9rem;
      line-height:0.9rem;
      span{
        color:#cfa634;
      }
      em{
        vertical-align:middle;
        font-style: normal;
      }
      i{
        display:inline-block;
        vertical-align:middle;
        margin-right: 0.17rem;
        width: 0.33rem;
        height:0.9rem;
        background: url("../../assets/icon/icon13.png") no-repeat center;
        background-size:0.33rem 0.33rem;
      }
    }
  }
  .saveBtn{
    height:1.4rem;
    line-height:1.4rem;
    text-decoration: none;
    font-size: 0.42rem;
    color:#fff;
    display: block;
    background:#ff4b4c;
    position: fixed;
    bottom:0;
    width: 10.8rem;
    margin-left:-5.4rem;
    left:50%;
    text-align: center;
  }
 
}
  
</style>