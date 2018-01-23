<template>
	<div id="login">
    <p style="line-height: 1rem;padding: 0.2rem;">用户注册</p>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="form.phone"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="form.password"></mt-field>
    <mt-field label="确认密码" placeholder="请再次输入密码" type="password" v-model="form.rePas"></mt-field>
     <mt-field label="验证码" v-model="form.captcha" placeholder="输入验证码">
            <a href="javascript:;" style="text-decoration: none">发送验证码</a>
          </mt-field>
          <div style="margin:0.5rem auto 0 auto;width: 10.4rem;">
            <mt-button type="primary" style="width: 100%">注册</mt-button>
          </div>
          <router-link :to="{name:'login'}" id="goRegister">已有账号？立刻登录</router-link>
	</div>
</template>
<script>
export default {
  name: 'hello',
  data() {
    return {
      form:{
        iphone:'',
        passowrd:'',
        rePas:'',
        captcha:''
      }
      
    }
  },
  mounted() {
    
  },
  methods: {
   
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