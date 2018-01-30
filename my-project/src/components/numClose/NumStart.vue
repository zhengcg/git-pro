<template>
	<div id="numStart">
      <div class="numHead"></div>
      <div class="mainBox">
        <img src="../../assets/icon/bg.jpg">
        <div class="sgHead">
          <span>正品数关</span><!-- <i><img src="../../assets/icon/icon19.png"></i> -->
        </div>
        <div class="payTip">
          <span></span>
        </div>
        <h4>为您的购物保驾护航</h4>
        <p>扫描鸡脚上的二维码，用正品数关进行收货验证</p>
        <p>正品数关验证不通过无条件退换</p>
        <img src="../../assets/icon/num.png" style="width: 9.02rem;height:5.02rem;display: block;margin-top: 0.8rem;
        margin-left: auto;margin-right: auto">
        <a href="javascript:;" class="btn" @click="gotoCode">启动正品数关</a>
        
      </div>
	</div>
</template>
<script>
export default {
  name: 'hello',
  data() {
    return {
      
    }
  },
  mounted() {
    document.title="正品数关"
    
  },
  methods: {
    gotoCode:function(){
      var self=this;
       wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
              var length1 = res.resultStr.split("/").length;
              var aa = res.resultStr.split("/")[length1-1];
              if(res.errMsg === "scanQRCode:ok"){
              self.$router.push({name:'numClose',query:{codeId:res.resultStr}})
              } 
              
          }
        });
        
    }
   
  }
}
</script>
<style lang="scss">
#numStart{
  .numHead{
    height: 2.5rem;
    background: #ff4b4c;
  }
  .mainBox{
    width: 9.8rem;
    margin-top: -1.85rem;
    margin-left: auto;
    margin-right: auto;
    background: #fff;
    border-radius: 0.2rem;
    padding-bottom: 2.5rem;
    overflow: hidden;
    position: relative;
    .btn{
      display: block;
      width: 100%;
      position: absolute;
      bottom: 0;left: 0;
      height: 1.2rem;
      line-height: 1.2rem;
      text-align: center;
      color: #fff;
      background:#ff4b4c;
      text-decoration: none;
      font-size: 0.5rem;
    }
    >img{
      width: 100%;
      display: block;
      margin: 0 auto;
    }
    .sgHead{
      height: 1.2rem;
      line-height: 1.2rem;
      text-align: center;
      font-size: 0.3916rem;
      margin-top: 0.3rem;
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
    h4{
      text-align:center;
      font-size: 0.33rem;
      color: #666;
      margin-top: 1rem;
      margin-bottom: 0.2rem;
      font-weight: normal;
    }
    p{
      font-size: 0.33rem;
      color: #999;
      text-align:center;
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

  }

}
  
</style>