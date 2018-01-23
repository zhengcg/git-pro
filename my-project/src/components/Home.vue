<template>
  <div id="home">
    <router-view/>
    <div style="height: 1.5rem;"></div>
    <footer>
      <ul class="clearfix">
        <li><router-link :to="{name:'index'}" activeClass="active"><i class="home"></i>首页</router-link><span @click.stop="gotoIndex"></span></li>
        <li><router-link :to="{name:'rank'}" activeClass="active"><i class="mes"></i>排行榜</router-link></li>
        <li><router-link :to="{name:'numClose'}" activeClass="active"><i class="sum"></i>数关</router-link><span @click.stop="gotoNum"></span></li>
        <li><router-link :to="{name:'mine'}" activeClass="active"><i class="mine"></i>我的</router-link></li>
      </ul>
    </footer>

  </div>
</template>

<script>
import api from '../api/api';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  name: 'home',
  data () {
    return {

    }
  },
  mounted(){
    this.getConfig()
  },
  methods:{
      gotoIndex(){
        var self=this;
        self.$router.push(
            {name:'steps'}
        )
      },
      gotoNum(){
        var self=this;
        self.$router.push({name:'numStart'})
      },
      getConfig(){
        var self=this;
        self.axios.get(api.configApi,{params: {currentUrl:location.href}}).then(function (res){
            if(res.data.code==200){
                wx.config({                 
                  appId: res.data.result.appId, // 必填，公众号的唯一标识
                  timestamp:res.data.result.timestamp , // 必填，生成签名的时间戳
                  nonceStr:res.data.result.nonceStr, // 必填，生成签名的随机串
                  signature:res.data.result.sign,// 必填，签名，见附录1
                  jsApiList: ['chooseWXPay','scanQRCode','openLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
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
             
      }
  }
}
</script>

<style lang="scss">
#home{
  footer{position: fixed;bottom: 0;left: 50%;margin-left: -5.4rem;width: 10.8rem;box-sizing: border-box;border-top: 0.02rem solid #e0e0e0;background: #fff;}
footer li{float: left;width: 25%;list-style-type: none;position:relative}
footer li span{position:absolute;display:block;width:100%;height:100%;left:0;top:0;}
footer li a{display: block;height: 1.4rem;text-decoration: none;font-size: 0.39rem;text-align: center;color: #999;padding-top: 0.25rem;}
footer li a i{display: block;height: 0.56rem;margin-bottom: 0.1rem;}
footer li a i.home{background: url("../assets/icon/homeW.png") no-repeat center;background-size:auto 0.56rem;}
footer li a.active i.home{background: url("../assets/icon/home.png") no-repeat center;background-size:auto 0.56rem;}
footer li a i.mes{background: url("../assets/icon/mesW.png") no-repeat center;background-size:auto 0.56rem;}
footer li a.active i.mes{background: url("../assets/icon/mes.png") no-repeat center;background-size:auto 0.56rem;}
footer li a i.sum{background: url("../assets/icon/sumW.png") no-repeat center;background-size:auto 0.56rem;}
footer li a.active i.sum{background: url("../assets/icon/sum.png") no-repeat center;background-size:auto 0.56rem;}
footer li a i.mine{background: url("../assets/icon/mineW.png") no-repeat center;background-size:auto 0.56rem;}
footer li a.active i.mine{background: url("../assets/icon/mine.png") no-repeat center;background-size:auto 0.56rem;}
footer li a.active{color: #ff3036;}
.clearfix:after{clear: both;content: '';display: block;height: 0;}
input[type="text"] {
-webkit-appearance: none;
}
input[type="tel"] {
-webkit-appearance: none;
}
textarea{
-webkit-appearance: none;
}

}

</style>
