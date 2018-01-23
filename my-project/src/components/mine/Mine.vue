<template>
	<div id="mine">
		  <div class="mineBox">
        <div class="a">
          <div class="head">
            <img :src="myInfo.avatar" alt="头像">
          </div>
          <!-- <div class="username" style="display: none">登录</div> -->
          <div class="username">
            {{myInfo.nikeName}}
            <p>{{myInfo.mobile}}</p>
          </div>
          
        </div>  
      </div>
      <ul id="mineList">
        <li>
          <a href="javascript:;" @click="numServer">
            <div class="icon"><img src="../../assets/icon/icon02.png" alt=""></div>
            <div class="mineName">数据服务</div>
            <div class="mineInfo"><span v-if="myInfo.serviceCount==0 ">立刻开通</span><span v-else>有效期至{{myInfo.expireDate}}，{{myInfo.serviceCount}}次服务</span></div>
            <div class="mineArr"><img src="../../assets/icon/icon01.png"></div>
          </a>
        </li>
        <li>
          <a href="javascript:;" @click="myChicken">
            <div class="icon"><img src="../../assets/icon/icon03.png" alt=""></div>
            <div class="mineName">我的鸡</div>
            <div class="mineInfo"></div>
            <div class="mineArr"><img src="../../assets/icon/icon01.png"></div>
          </a>
        </li>
        <li>
          <a href="javascript:;" @click="message">
            <div class="icon"><img src="../../assets/icon/icon27.png" alt=""></div>
            <div class="mineName">消息</div>
            <div class="mineInfo"><span v-show="myInfo.unreadCount>0">{{myInfo.unreadCount}}</span></div>
            <div class="mineArr"><img src="../../assets/icon/icon01.png"></div>
          </a>
        </li>
        <li>
          <a href="javascript:;" @click="set">
            <div class="icon"><img src="../../assets/icon/icon04.png" alt=""></div>
            <div class="mineName">设置</div>
            <div class="mineInfo"></div>
            <div class="mineArr"><img src="../../assets/icon/icon01.png"></div>
          </a>
        </li>
      </ul>
	</div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import api from '../../api/api';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  name: 'hello',
  data() {
    return {
      myInfo:{}
      
    }
  },
  mounted() {
    document.title="我的";
    this.getInfo();   
  },
  methods: {
    getInfo(){
      var self=this;
      Indicator.open();
        this.axios.get(api.myInfo).then(function (res) {
            Indicator.close();
            if(res.data.code==200){
              self.myInfo=res.data.result;
            }else{
              Toast(res.data.message);
            }
            
          }).catch(function (error) {
          　　Toast(error);
          });

    },
  	logout(){
            this.$store.commit(types.LOGOUT)
            this.$router.push({
              path: '/'
            })
          },
    message(){
      this.$router.push(
              {name:'message'}
            )
    },
    set(){
       this.$router.push({
              path: '/set'
            })
    },
    numServer(){
      var self=this;
      if(this.myInfo.mobile){
        if(this.myInfo.serviceCount==0){
          this.$router.push({
                path: '/numServer'
              })
        }else{
          this.$router.push({
                path: '/numServer'
              })
        }

      }else{
        MessageBox.confirm('请先绑定手机号').then(function(){
          self.$router.push({
                path: '/bindTel'
              })
         
        },function(){
        });
      }
      
      
    },
    myChicken(){
      this.$router.push({
              path: '/myChicken'
            })
    }
   
  }
}
</script>
<style lang="scss">
#mine{
   .mineBox{
    height: 6.5rem;
    background: url("../../assets/mineBg.png") no-repeat center;
    background-size: contain;
    div.a{
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      padding-top: 1.2rem;
      box-sizing: border-box;
      text-decoration: none;
      .username{
        text-align: center;
        color: #fff;
        font-size: 0.42rem;
        padding-top: 0.3rem;
        line-height: 0.8rem;
        p{
          font-size: 0.39rem;
          line-height:0.45rem;
        }
      }
      .head{
        width: 2.42rem;
        height: 2.42rem;
        background:#fff;
        border-radius: 50%;
        border: 0.05rem solid #fff;
        margin: 0 auto;
        overflow: hidden;
        img{
          width: 2.42rem;
          height: 2.42rem;
        }
      }
    }
  }
  #mineList{
    background:#fff;
    li{
      border-bottom: 1px solid #eaeaea;
      display: inherit;
      a{
        display: -webkit-flex; /* Safari */
        display: flex;
        align-items:center;
        justify-content:center;
        height: 1.3rem;
        text-decoration: none;
        .icon{
          margin-left: 0.5rem;
          width: 0.54rem;
          img{
            width: 0.54rem;
          }
        }
        .mineName{
          margin-left: 0.3rem;
          width: 1.7rem;
          color: #333;
          font-size: 0.39rem;
        }
        .mineInfo{
          width: 7rem;
          text-align: right;
          color: #999;
          font-size: 0.36rem;
        }
        .mineArr{
          margin-left: 0.3rem;
          width: 0.7rem;
          img{
            height: 0.4rem;
          }
        }
      }
    }
  }
}
 
</style>