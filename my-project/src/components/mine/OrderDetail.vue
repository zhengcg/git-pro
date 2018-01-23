<template>
	<div id="orderDetail">
    <div class="orderHead">
      <h1 v-if="info.step==1">已下单</h1>
      <h1 v-if="info.step==2">已支付</h1>
      <h1 v-if="info.step==3">已发货</h1>
      <h1 v-if="info.step==4">已收货</h1>
      <h1 v-if="info.step==5">已关闭</h1>
      <p v-if="info.saleDays>0">距出栏还有{{info.saleDays}}天，请耐心等待</p>
      <p v-else>该鸡已经出栏了</p>
      <p v>您还可以每天关注鸡的运动情况</p>
      
      <router-link :to="{name:'telSer'}">联系客服</router-link>
    </div>
    <div class="chickenList" v-for="item in info.goodsList" :key="item.goodsId">
      <div class="chickenHead">
        <i><img src="../../assets/icon/icon16.png"></i><span>{{item.farmName}}</span>
        <router-link :to="{name:'details',query:{id:item.goodsId}}">去看鸡</router-link>
      </div>
      <div class="chickBody" @click="gotoDetail(item.goodsId)">
        <div class="jiBox"><img :src="item.thumbnail"></div>
        <div class="jiCon">
          <h3>{{item.goodsName}}</h3>
          <p>购买时间：{{info.createTime}}</p>
          <p>预计出栏时间：{{item.presaleDate}}</p>
        </div>
        <div class="jiPrice">
          <h3>￥{{item.goodsPrice}}</h3>
          <p>x{{item.quantity}}</p>
        </div>
        
      </div>
      <div class="chickFoot">
        共{{info.goodsCount}}件商品<span>合计：￥{{info.finalAmount}}（包邮）</span>
      </div>
      <div class="payBtn" v-show="s>0">
        <em>剩余时间<span v-text="hour"></span>时<span v-text="min"></span>分<span v-text="second"></span>秒</em>
        <a href="javascript:;" @click.stop="payFn">付款</a>
      </div>
    </div>
    <div class="sgBox">
      <div class="sgHead">
        <span>正品数关</span><!-- <i><img src="../../assets/icon/icon19.png"></i> -->
      </div>
      <div class="payTip">
        <span></span>
      </div>
      <ol>
        <li>1.平均步数大于1万步</li>
        <li>2.健康状况良好</li>
        <li>3.环境情况良好</li>
      </ol>
    </div>
    <div class="fwBox">
      <ul>
        <li>数据服务：<span>{{info.serviceCount}}次</span></li>
        <li>配送方式：<span>{{info.express}}</span></li>
        <li>实付款（含运费）：<span style="color: #ff4b4c">￥{{info.realAmount}}</span></li>
      </ul>
    </div>
    <div class="ddBox">
      <p>订单编号：{{info.orderNumber}}</p>
      <p>创建时间：{{info.createTime}}</p>
      <p>付款时间：{{info.payTime}}</p>
      <p v-if="info.step==1">发货状态：已下单</p>
      <p v-if="info.step==2">发货状态：已支付</p>
      <p v-if="info.step==3">发货状态：已发货</p>
      <p v-if="info.step==4">发货状态：已收货</p>
      <p v-if="info.step==5">发货状态：已关闭</p>
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
      id:'',
      hour:0,
      min:0,
      second:0,
      s:0,
      info:{

      },
      timestamp:'',
      nonceStr:''

      
    }
  },
  created(){
    this.id = this.$route.query.id;
    this.getInfo(this.id);
  },
  mounted() {
    document.title="订单详情";
    this.getConfig();
    
  },
  methods: {
    // 微信公众号配置
    getConfig(){
        var self=this;
        self.axios.get(api.configApi,{params: {currentUrl:location.href}}).then(function (res){
            if(res.data.code==200){
              self.timestamp=res.data.result.timestamp;
              self.nonceStr=res.data.result.nonceStr;
                wx.config({
                  appId: res.data.result.appId, // 必填，公众号的唯一标识
                  timestamp:res.data.result.timestamp , // 必填，生成签名的时间戳
                  nonceStr:res.data.result.nonceStr, // 必填，生成签名的随机串
                  signature:res.data.result.sign,// 必填，签名，见附录1
                  jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });
                wx.error(function(res){
                Toast({
                      message: '微信签名失败',
                      position: 'middle',
                      duration: 1000
                    });
              })
            }else{
              Toast(res.data.message);
            }

          }).catch(function (error) {
          　　Toast(error);
          });
             
      },
    // 格式化倒计时
    formatCount(s){
      var i=Math.floor(s/60)
      this.second=s-(i*60);
      this.min=i-(Math.floor(i/60)*60);
      this.hour=Math.floor(i/60);
      this.countDown();

    },
    // 倒计时操作
    countDown(){
      var self=this;
      setTimeout(function(){
        if(self.s>0){
          self.formatCount(--self.s);


        }else{
          self.info.step=5;
          /*Toast("订单已过期")
          setTimeout(function(){
            self.$router.push({
                path: '/myChicken'
              })
          },2000)*/
          
        }

      },1000)

    },
    payFn:function(){
      var self=this;
      Indicator.open();               
        this.axios.get(api.payAgain,{params:{orderNumber:self.info.orderNumber,timestamp:self.timestamp,nonceStr:self.nonceStr}}).then(function (res) {
        Indicator.close();
        if(res.data.code==200){          
          self.payAgain(res.data.result)
        }else{
          Toast(res.data.message);
        }      
      }).catch(function (error) {
      　　Toast(error);
      });
    },
    payAgain:function(obj){
      var self=this;
          WeixinJSBridge.invoke(    
            'getBrandWCPayRequest', {    
                "appId" : obj.appId,     //公众号名称，由商户传入         
                "timeStamp": obj.timeStamp+"",         //时间戳，自1970年以来的秒数         
                "nonceStr" : obj.nonceStr, //随机串         
                "package" : obj.package,         
                "signType" : obj.signType,         //微信签名方式:         
                "paySign" : obj.paySign    //微信签名     
            },    
                
            function(res){         
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {    
                   self.$router.push({
                        path: '/jiSuc',
                        query:{id:self.id}
                    })
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                    Toast("支付过程中用户取消");
                } else {
                  //支付失败
                  Toast(res.err_msg);                
                }  
            }    
        );     

    },
    getInfo(id){
      var self=this;
        Indicator.open();               
        this.axios.get(api.orderDetail, {
      　　params: {uuid:id}
      }).then(function (res) {
        Indicator.close();
        if(res.data.code==200){
          self.info=res.data.result;
          if(self.info.step==1){
            self.s=self.info.expireTime;
            self.formatCount(self.s)
          }
          
        }else{
          Toast(res.data.message);
        }     
      }).catch(function (error) {
      　　Toast(error);
      });
      
    },
    gotoDetail(id){
      this.$router.push({
                        path: '/details',
                        query:{id:id}
                    })
    }
  	
   
  }
}
</script>
<style lang="scss">
#orderDetail{
  .orderHead{
    position: relative;
    height: 2.68rem;
    background: #ff4b4c;
    color: #fff;
    margin-bottom: 0.2rem;
    h1{
      font-weight: normal;
      font-size: 0.42rem;
      padding-left: 1rem;
      padding-top: 0.35rem;
      height: 0.8rem;
      line-height: 0.85rem;
    }
    p{
        font-size: 0.3rem;
        padding-left: 1rem;
        line-height: 0.45rem;
      }
    a{
      display: block;
      width: 1.8rem;
      height: 0.5rem;
      padding-top:1.8rem;
      line-height:0.5rem;
      text-align: center;
      position: absolute;
      top:0.19rem;
      right: 1.2rem;
      color: #fff;
      text-decoration: none;
      background: url("../../assets/icon/icon18.png") no-repeat top center;
      background-size: 1.8rem 1.8rem;
    }

  }
  .chickenList{
    margin-bottom: 0.2rem;
    
    text-decoration: none;
    display: block;
    .chickenHead{
      background: #fff;
      height: 1.1rem;
      line-height: 1.1rem;
      padding: 0 0.5rem;
      position: relative;
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
      a{
        box-sizing:border-box;
        color: #ff4b4c;
        font-size: 0.33rem;
        text-decoration: none;
        display: block;
        height: 0.6rem;
        line-height: 0.6rem;
        width: 1.45rem;
        text-align: center;
        border-radius: 0.3rem;
        border:1px solid #ff4b4c;
        position: absolute;
        right: 0.5rem;
        top: 0.3rem;
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
      em{
        font-style: normal;
        color:#ff4b4c;
      }
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
  .sgBox{
    background:#fff;
    margin-bottom: 0.2rem;
    border-bottom: 1px solid #eaeaea;
    .sgHead{
      height: 1.2rem;
      line-height: 1.2rem;
      text-align: center;
      font-size: 0.3916rem;
      color: #333;
      i{
        vertical-align: middle;
        display: inline-block;
        img{
          vertical-align: middle;
          width: 0.45rem;
          height: 0.45rem;
        }
      }
      span{
        vertical-align: middle;
        // margin-right: 0.21rem;
      }
    }
    .payTip{      
      position: relative;
      height: 0.15rem;
      border-bottom: 0.03rem solid #d1a836;
      margin-bottom: 0.4rem;
      span{
        display: block;
        position: absolute;
        width: 1.21rem;
        height: 0.41rem;
        /* line-height: 0.41rem;
        text-align: center;
        color: #fff;
        font-size: 0.3rem;
        border-radius: 0.205rem;
        background: #d1a836; */
        left: 50%;
        margin-left: -0.605rem;
        bottom: -0.23rem;
        background:url("../../assets/icon/icon31.png") no-repeat center;
        background-size: 1.21rem 0.41rem;
      }

    }
    ol{
      li{
        height: 1.13rem;
        line-height: 1.13rem;
        border-bottom: 1px solid #eaeaea;
        padding: 0 0.5rem;
        color: #666;
        font-size: 0.36rem;
      }
      li:last-of-type{
        border:none;
      }
    }
  }
  .fwBox{
    background:#fff;
    margin-bottom: 0.2rem;
    ul{
      li{
        padding: 0 0.5rem;
        border-bottom: 1px solid #eaeaea;
        height: 1.13rem;
        line-height: 1.13rem;
        color: #333;
        font-size: 0.39rem;
        span{
          float: right;
        }

      }
    }
  }
  .ddBox{
    padding: 0.15rem 0.5rem;
    background:#fff;
    color: #999;
    font-size: 0.36rem;
    p{
      line-height: 0.7rem;
    }
  }
  
}
 
</style>