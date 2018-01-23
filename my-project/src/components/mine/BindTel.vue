<template>
  <div id="bindTel">
      <p style="height: 0.9rem;line-height: 0.9rem;color: #666;padding: 0 0.5rem;font-size: 0.3rem;">绑定手机号</p>
      <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="form.mobile" :attr="{ maxlength: 11 }"></mt-field>
          <mt-field label="验证码" v-model="form.code" type="tel" placeholder="输入验证码" :attr="{ maxlength: 6 }">
            <a href="javascript:;" style="text-decoration: none" @click="validateMobile">{{text}}</a>
          </mt-field>
          <a href="javascript:;" class="saveBtn" @click="bindTel">提交</a>
  </div>
</template>

<script>
import api from '../../api/api';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  name: 'bindTel',
  data () {
    return {
      text:'发送验证码',
      flag:true,
      form:{
        mobile:'',
        code:''
      }
      
      
    }
  },
  mounted(){
    document.title="绑定手机号"
  },
  methods:{
    checkMobile:function(){ 
     var sMobile = this.form.mobile 
     if(!(/^1[34578]\d{9}$/.test(sMobile))){      
      return false; 
     }else{
      return true; 
     }
    },
    validate(){
      var self=this;
      if(!self.form.mobile){
        Toast("手机号不能为空");
        return false;
      }else if(!self.form.code){
        Toast("验证码不能为空");
        return false;
      }else{
        return true;
      }

    },
    validateMobile:function(){
      var self=this;
      if(self.form.mobile){

        if(self.checkMobile()){
          self.axios.get(api.validateMobile,{params: {mobile:self.form.mobile}}).then(function (res) {
            // 验证手机号是否已绑定   
            if(res.data){
              if(self.flag){

                self.axios.get(api.sendValidateCode,{params:{mobile:self.form.mobile}}).then(function (res) {
                  if(res.data.code==200){
                     Toast(res.data.message);
                     self.flag=false
                     var i=60                     
                     self.countDown(i)

                  }else{
                    Toast(res.data.message);
                  }     
                }).catch(function (error) {
                　　Toast(error);
                }); 

              }                             
            }else{
              Toast("该手机号已被绑定");                 
            }                      
          }).catch(function (error) {
          　Toast(error);
          }); 
        }else{
          Toast("请输入正确的手机号码！");
        }
      }else{
        Toast("手机号不能为空");
      }   
    },
    countDown:function(i){
      var self=this;
      setTimeout(function(){
        if(i>0){
          i--;
          self.countDown(i);
          self.text=i+"秒后重新发送";
        }else{
          self.text='发送验证码';
          self.flag=true;
        }
      },1000)
                        
    },
    bindTel:function(){
      var self=this;
      if(self.validate()){
          self.axios.get(api.validateMobileCode,{params:{mobile:self.form.mobile,code:self.form.code}}).then(function (res) {
                  if(res.data){
                        self.axios.get(api.bindMobile,{params:{mobile:self.form.mobile}}).then(function (res) {
                              Toast(res.data.message);
                              if(res.data.code==200){
                                self.$router.push({
                                  path: '/account'
                                })
                              }else{
                                Toast(res.data.message);
                              }
                              
                            }).catch(function (error) {
                            　　Toast(error);
                            });                    

                  }else{
                    Toast("验证码不正确！");
                  }     
                }).catch(function (error) {
                　　Toast(error);
                });

      }

    }

  }
}
</script>

<style lang="scss">
#bindTel{
  .mint-cell-wrapper{
    padding: 0 0.5rem!important;
    font-size: 0.39rem;
    border:none!important;
  }
  .mint-field-other a{
    color: #0fc1e7;
    padding-left:0.5rem;
    padding-top: 0.15rem;
    padding-bottom: 0.15rem;
    border-left: 1px solid #d9d9d9
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
