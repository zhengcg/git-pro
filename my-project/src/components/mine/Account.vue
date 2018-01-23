<template>
  <div id="account">
      <div class="acountHead">
        头像
        <img :src="info.avatar">
      </div>
      <ul>
        <li>
        <a href="javascript:;">
          昵称
          <em>{{info.nikeName}}</em>
          </a>
        </li>
        <li>
          <a href="javascript:;" @click="gotoTel">
            手机号
                   
            <span v-show="!info.mobile"></span>
            <em style="margin-right:0.2rem;">{{info.mobile}}</em>    
          </a>
        </li>
      </ul>
  </div>
</template>

<script>
import api from '../../api/api';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  name: 'account',
  data () {
    return {
      info:{}      
      
    }
  },
  mounted(){
    document.title="账号设置"
    this.getInfo()
  },
  methods:{
    getInfo(){
      var self=this;
      Indicator.open();
        this.axios.get(api.setting).then(function (res) {
            Indicator.close();
            self.info=res.data.result;
          }).catch(function (error) {
          　　Toast(error);
          });
    },
    gotoTel(){
      var self=this;
      if(!self.info.mobile){
        self.$router.push({
                path: '/bindTel'
              })
      }
    }

  }
}
</script>

<style lang="scss">
#account{
  .acountHead{
    height: 1.5rem;
    padding: 0.4rem 0.5rem;
    line-height: 1.5rem;
    color: #333;
    font-size: 0.39rem;
    background: #fff;
    margin-bottom: 0.2rem;
    img{
      float: right;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
    }
  }
  ul{
    background: #fff;
    li{
      height: 1.2rem;
      line-height: 1.2rem;
      color: #333;
      font-size: 0.39rem;
      border-bottom: 1px solid #d9d9d9;
      em{
        font-style: normal;
        float: right;
      }
      a{
        display: block;
        text-decoration: none;
        color: #333;
        font-size: 0.39rem;
        height: 1.2rem;
        line-height: 1.2rem;
        padding: 0 0.5rem;
        span{
          float: right;
          display: block;
          height: 1.2rem;
          width: 0.24rem;
          background: url("../../assets/icon/icon01.png") no-repeat center;
          background-size: 0.24rem 0.43rem;

        }
      }
    }
  }
  
  
}
</style>
