<template>
	<div id="login">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">用户登录</mt-tab-item>
      <mt-tab-item id="2">快速登录</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
          <div style="height: 0.5rem;"></div>
          <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="form1.phone"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="form1.password"></mt-field>

          <div style="margin:0.5rem auto 0 auto;width: 10.4rem;">
            <mt-button type="primary" style="width: 100%" @click.native="login">登录</mt-button>
          </div>
          
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
          <div style="height: 0.5rem;"></div>
          <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="form2.phone"></mt-field>
          <mt-field label="验证码" v-model="form2.captcha" placeholder="输入验证码">
            <a href="javascript:;" style="text-decoration: none">发送验证码</a>
          </mt-field>
          <div style="margin:0.5rem auto 0 auto;width: 10.4rem;">
            <mt-button type="primary" style="width: 100%" @click.native="login">登录</mt-button>
          </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <router-link :to="{name:'register'}" id="goRegister">没有账号？立即注册</router-link>
	</div>
</template>
<script>
import * as types from '../../store/types'
export default {
  name: 'hello',
  data() {
    return {
      selected:"1",
      form1:{
        phone:'',
        password:''
      },
      form2:{
        phone:'',
        captcha:''
      },
      token:'12345678'
    }
  },
  mounted() {
    
  },
  methods: {
    login(){
        if (this.token) {
          this.$store.commit(types.LOGIN, this.token)
          let redirect = decodeURIComponent(this.$route.query.redirect || '/');
          this.$router.push({
            path: redirect
          })
        }
      }
   
  }
}
</script>

<style lang="scss">
#goRegister{
  font-size: 0.4rem;
  float: right;
  margin: 0.5rem 0.2rem;
  text-decoration: none;
}
</style>