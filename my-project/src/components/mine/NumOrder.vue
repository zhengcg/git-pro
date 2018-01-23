<template>
	<div id="numOrder">
      <div class="numBox">
        <p>服务次数：{{info.count}}次</p>
        <p>服务内容：{{info.serviceContent}}</p>
        <p>服务期限：{{info.expireDate}}</p>
        <p>服务价格：<span style="color: #ff4b4c">￥{{info.finalAmount}}</span></p>
      </div>
      <div class="zfBox">
        订单金额：<span>￥{{info.finalAmount}}</span>
        <a href="javascript:;" @click="showPay">立即支付</a>
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
      info:{},
      timestamp:'',
      nonceStr:''

    }
  },
  mounted() {
    document.title="数据服务"
    this.getInfo();
    this.getConfig();
    
  },
  methods: {
    getInfo(){
      var self=this;
      Indicator.open();
        this.axios.get(api.numOrder).then(function (res) {
            Indicator.close();
            if(res.data.code==200){
              self.info=res.data.result;
            }else{
              Toast(res.data.message);
            }
            
          }).catch(function (error) {
          　　Toast(error);
          });
    },
    getConfig(){
        var self=this;
        self.axios.get(api.configApi,{params: {currentUrl:location.href}}).then(function (res){
            if(res.data.code==200){
              self.timestamp=res.data.result.timestamp;
              self.nonceStr=res.data.result.nonceStr;
                wx.config({
                  /*debug: true,*/ // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
    showPay:function(){
      var self=this;
        Indicator.open();               
        this.axios.get(api.payNum,{params:{timestamp:self.timestamp,nonceStr:self.nonceStr}}).then(function (res) {
        Indicator.close();
        if(res.data.code==200){
          
          self.payFn(res.data.result)
        }else{
          Toast(res.data.message);
        }      
      }).catch(function (error) {
      　　Toast(error);
      });
      
    },
    payFn:function(obj){
      var self=this;
         /*wx.chooseWXPay({
          appId:obj.appId,
          timestamp: obj.timestamp, 
          nonceStr: obj.nonceStr, 
          package: obj.package, 
          signType: obj.signType,
          paySign: obj.paySign, 
          success: function (res) {
            self.$router.push({
                path: '/numSuc'
              })
            }
          });*/ 

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
                      path: '/numSuc'
                    })
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                    Toast("支付过程中用户取消");
                } else {
                  //支付失败
                  Toast(res.err_msg);                
                }  
            }    
        );     




    }
   
  }
}
</script>
<style lang="scss">
#numOrder{
  padding-top: 0.5rem;
  .numBox{
    width: 9.8rem;
    border-radius: 0.1rem;
    background: #fff url("../../assets/border.png") no-repeat top left;
    background-size: 9.8rem auto;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0.6rem;
    font-size: 0.39rem;
    color: #333;
    line-height: 1rem;
    overflow: hidden;
    
  }
  .zfBox{
    height: 1.4rem;
    background:#fff;
    font-size:0.39rem;
    color: #333;
    line-height: 1.4rem;
    position: fixed;
    bottom: 0;
    width: 10.8rem;
    left: 50%;
    margin-left: -5.4rem;
    padding: 0 0.5rem;
    box-sizing: border-box;
    span{
      color: #ff4b4c;
    }
    a{
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      height: 1.4rem;
      text-align: center;
      line-height: 1.4rem;
      background:#ff4b4c;
      color: #fff;
      text-decoration: none;
      width: 4.05rem;
    }
  }
 
}
  
</style>