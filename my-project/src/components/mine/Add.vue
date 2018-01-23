<template>
  <div id="add">
    <div class="filedBox">
      <mt-field label="收货人姓名" placeholder="名字" v-model="formData.receiver"></mt-field>
      <mt-field label="联系方式" placeholder="手机或固定电话" type="tel" v-model="formData.receiverPhone" :attr="{ maxlength: 11 }"></mt-field>
      <ul>
      <li>
        <label>选择地区</label>
          <div>
            <select v-model="provinceValue" @change="getCity">
              <option value="" selected>选择省份</option>
              <option :value="item" v-for="item in province">{{item.name}}</option>
            </select>
            <select v-model="cityValue" @change="getArea">
              <option value=""  selected>选择城市</option>
              <option :value="item" v-for="item in city">{{item.name}}</option>
            </select>
            <select v-model="countyValue">
              <option value=""  selected>选择地区</option>
              <option :value="item" v-for="item in area">{{item.name}}</option>
            </select>
          </div>
          </li>
      </ul>
      <mt-field label="详细地址" placeholder="如街道 楼层 门牌号等" type="text" v-model="formData.detailAddress"  :attr="{ maxlength: 200 }"></mt-field>
      <mt-field label="邮政编码" placeholder="邮政编码（选填）" type="tel" v-model="formData.postCode"  :attr="{ maxlength: 10 }"></mt-field>

    </div>
    <a href="javascript:;" class="saveBtn" @click="submitFn">保存</a>
  </div>
</template>

<script>
import api from '../../api/api';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  name: 'add',
  data () {
    return {
      province:[],
      city:[],
      area:[],
      provinceValue:'',
      cityValue:'',
      countyValue:'',
      formData:{
        province:'',
        provinceId:'',
        city:'',
        cityId:'',
        county:'',
        countyId:'',
        detailAddress:'',
        postCode:'',
        receiver:'',
        receiverPhone:''
      }
      
    }
  },
  mounted(){
    document.title="添加收货地址"
    this.getProvince(0);
  },
  methods:{
    getProvince(pid){
      var self=this;
      Indicator.open();
        this.axios.get(api.getAddress, {
    　　  params: {pid:pid}
          }).then(function (res) {
            Indicator.close();
            self.province=res.data.result
          }).catch(function (error) {
          　　Toast(error);
          });
    },
    getCity(){
      var self=this;
      self.cityValue='';
      self.countyValue='';
      self.city=[];
      self.area=[];
      Indicator.open();
        this.axios.get(api.getAddress, {
    　　  params: {pid:self.provinceValue.id}
          }).then(function (res) {
            Indicator.close();
            self.city=res.data.result
          }).catch(function (error) {
          　　Toast(error);
          });
    },
    getArea(){
      var self=this;
      self.countyValue='';
      self.area=[];
      Indicator.open();
        this.axios.get(api.getAddress, {
    　　  params: {pid:self.cityValue.id}
          }).then(function (res) {
            Indicator.close();
            self.area=res.data.result
          }).catch(function (error) {
          　　Toast(error);
          });
    },
    validate(){
      var self=this;
      if(!self.formData.receiver){
        Toast("收货人不能为空");
        return false;
      }else if(!self.formData.receiverPhone){
        Toast("联系方式不能为空");
        return false;
      }else if(self.provinceValue.length==0){
        Toast("请选择省份");
        return false;
      }else if(self.cityValue.length==0&&self.city.length>0){
        Toast("请选择城市");
        return false;
      }else if(self.countyValue.length==0&&self.area.length>0){
        Toast("请选择地区");
        return false;
      }else if(!self.formData.detailAddress){
        Toast("详细地址不能为空");
        return false;
      }else{
        return true;
      }

    },
    submitFn(){
      var self=this;
      
      self.formData.province=self.provinceValue.name;
      self.formData.provinceId=self.provinceValue.id;
      self.formData.city=self.cityValue.name;
      self.formData.cityId=self.cityValue.id;
      self.formData.county=self.countyValue.name;
      self.formData.countyId=self.countyValue.id;
      if(self.validate()){
        Indicator.open();
        // this.axios.post(api.addAddress+"?t="+ Date.now(), self.formData)
        this.axios.post(api.addAddress, self.formData)
          .then(function (res) {
            Indicator.close();
            if(res.data.code==200){
              self.$router.push({
                path: '/address'
              })
            }else{
              Toast(res.data.message);
            }
            
          })
          .catch(function (error) {
            Toast(error);
          });
      }
      
    }

  }
}
</script>

<style lang="scss">
#add{
  .filedBox{
    background: #fff;
    ul{
      li{
      border-top: 1px solid #d9d9d9;
      height: 1.2rem;
      line-height: 1.2rem;
      padding: 0 0.5rem;
      list-style: none;
      label{
        display: inline-block;
        float: left;
        width: 2.15rem;
        color: #999;
        font-size: 0.39rem;
      }
      div{
        margin-left: 2.15rem;
        height: 1.2rem;
        
        select{
          width: 30%;
          border:none;
          margin-left: 2%;
          color: #333;
          font-size: 0.39rem;
          -webkit-appearance:none;
          appearance:none;
          outline:none;
          -webkit-tap-highlight-color:rgba(0,0,0,0);
          border-radius:0;
        }
      }
    }
    }
    
    .mint-cell-wrapper{
      padding: 0 0.5rem!important ;
    }
    .mint-cell-title{
          font-size: 0.39rem!important;
          color: #999!important;
          width: 2.15rem;
        }
    .mint-field .mint-cell-value{
          font-size: 0.39rem!important;
          color: #333!important;
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
