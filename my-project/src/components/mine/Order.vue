<template>
	<div id="order">
      <!-- <div class="countDown" v-show="s>0"><span v-text="hour"></span>时<span v-text="min"></span>分<span v-text="second"></span>秒后取消订单</div> -->
      <div class="adressBox" @click="selectAdr" v-show="listM.receiverPhone">
        <div class="tit">
          <em>{{listM.receiver}}</em>
          <span>{{listM.receiverPhone}}</span>
        </div>
        <div class="bot">
          <span><img src="../../assets/icon/icon15.png"></span>
          <em>{{listM.province}}&emsp;{{listM.city}}&emsp;{{listM.county}}&emsp;{{listM.detailAddress}}</em>
        </div>
        <div class="arr"><img src="../../assets/icon/icon01.png"></div>
      </div>
      <div class="adressBox"  @click="selectAdr" v-show="!listM.receiverPhone" style="height:1rem;line-height:1rem;padding-left: 0.5rem;color: #999;font-size: 0.39rem;">
        请添加收货地址
        <div class="arr"><img src="../../assets/icon/icon01.png"></div>
      </div>
      <div class="orderBox">
        <div class="orderTit">
          <i><img src="../../assets/icon/icon16.png"></i><span v-text="info.farmName">广东秀德农场</span>
        </div>
        <div class="orderJi">
        <div class="jiImg"><img :src="info.thumbnail
"></div>
        <div class="jiCon">
          <h3>{{info.goodsName}}</h3>
          <p>预计出栏时间：{{info.presaleDate}}</p>
        </div>
        <div class="jiPrice">
          <h3>￥{{info.price}}</h3>
          <p>x1<!-- {{info.finalAmount}} --></p>
        </div>
      </div>
      <div class="sjBox">
        <em>数据服务：</em>
        <span>{{info.dataServiceCount}}次</span>
      </div>
      <div class="psBox">
        <em>配送方式：</em>
        <span>{{info.express}}</span>
      </div>
      </div>

      <div class="zfBox">
        订单金额：<span>￥{{info.price}}</span>
        <a href="javascript:;" v-if="isN" style="background: #ddd;">立即支付</a>
        <a href="javascript:;" @click="showPay" v-else>立即支付</a>
      </div>
      <!-- 立即支付 -->
      <mt-popup
        v-model="zf"
        position="middle">
        <div class="payBox">
           <div class="payHead">
             正品数关
             <a href="javascript:;" @click="closePay"><img src="../../assets/icon/icon17.png" ></a>
           </div>
           <div class="payTip">
             请确认以下您定义的数关条件，收到货物时，可以扫码验证
             <span><!-- 条件 --></span>
           </div>
           <div class="payList">
             <p>1.平均步数大于1万步</p>
             <p>2.健康状况良好</p>
             <p>3.环境情况良好</p>
           </div>
           <div class="submit">
             <a href="javascript:;" @click="submit">确定</a>
           </div>
        </div>
        
      </mt-popup>
      <mt-popup v-model="changeAdr" position="bottom" class="changeAdr">
        <div style="width: 10.8rem;height:0"></div>
        <ul v-if="list.length>0">
          <li v-for="(item,index) in list" @click="setArr(index)">
            <a href="javascript:;">
              <h3>{{item.receiver}}<em>{{item.receiverPhone}}</em></h3>
              <p>{{item.province}}&emsp;{{item.city}}&emsp;{{item.county}}&emsp;{{item.detailAddress}}</p>
            </a>
          </li>
        </ul>
        <a href="javascript:;" class="newAdr" @click="newAdr">新增地址</a>
        <a href="javascript:;" class="cancelAdr" @click="cancelAdr">取消</a>
    </mt-popup>

    <mt-popup v-model="addAdr" position="bottom" class="addAdr">
        <div style="width: 10.8rem;height:0"></div>
        <div class="addHead"><a href="javascript:;" @click="closeAdr"><img src="../../assets/icon/icon17.png" alt=""></a>编辑地址</div>
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
      <a href="javascript:;" class="newAdr" @click="saveAdr">保存</a>

    </div>
    </mt-popup>

      
      
	</div>
</template>
<script>
import { Popup } from 'mint-ui';
import api from '../../api/api';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  name: 'hello',
  data() {
    return {
      hour:0,
      min:0,
      second:0,
      // 地址列表
      list:[],
      // 默认地址
      listM:{
        receiver:'',
        receiverPhone:'',
        detailAddress:''

      },
      // 订单信息
      info:{},
      isN:false,
      // 倒计时时间
      s:0,
      zf:false,
      changeAdr:false,
      addAdr:false,
      // 新增收货地址
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
      },
      id:'',
      timestamp:'',
      nonceStr:''
      
      
    }
  },
  created(){
    this.id = this.$route.query.id;
    this.orderInfo();
    this.getConfig();
  },
  mounted() {
    document.title="订单";
    this.getList();
    this.getProvince(0);
    // this.formatCount(this.s)
    
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
      // 获取订单信息
    orderInfo:function(){
      var self=this;
      Indicator.open();
        this.axios.get(api.orderInfo,{params: {goodsId:self.id}}).then(function (res) {
            Indicator.close();
            if(res.data.code==200){
                self.info=res.data.result;
                self.isN=false;
            }else if(res.data.code==401||res.data.code==402){
                Toast(res.data.message);
                self.info=res.data.result;
                self.isN=true;
            }else{
              Toast(res.data.message);
            }
          }).catch(function (error) {
          　　Toast(error);
          });

    },
    // 选择地址
    setArr:function(index){
      this.listM=this.list[index];
      this.changeAdr=false;

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
          self.formatCount(--self.s)
        }else{
          Toast("订单已取消")
        }

      },1000)

    },
    showPay:function(){
      this.zf=true;
    },
    closePay:function(){
      this.zf=false;
    },
    // 确认支付
    submit:function(){
      this.zf=false;
      var self=this;
      if(self.listM.receiverPhone){
         Indicator.open();               
          this.axios.get(api.orderPay,{params:{goodsId:self.id,addressId:self.listM.id,timestamp:self.timestamp,nonceStr:self.nonceStr}}).then(function (res) {
          Indicator.close();
          if(res.data.code==200){          
            self.payFn(res.data.result)
          }else{
            Toast(res.data.message);
          }      
        }).catch(function (error) {
        　　Toast(error);
        });

      }else{
        Toast("请添加收货地址！");
      }
       
      
    },
    // 支付
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
                        path: '/jiSuc',
                        query:{id:obj.orderUuid}
                    })
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                    Toast("支付过程中用户取消");
                    self.$router.push({
                        path: '/myChicken'
                    })
                } else {
                  //支付失败
                  Toast(res.err_msg);                
                }  
            }    
        );     
    },
    selectAdr:function(){
      this.changeAdr=true
    },
    cancelAdr:function(){
      this.changeAdr=false
    },
    newAdr:function(){
      this.addAdr=true;
      this.formData={
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
      this.cityValue='';
      this.countyValue='';
      this.provinceValue='';    
    },
    saveAdr:function(){
      this.addAdr=false;
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
              self.getList();
            }else{
              Toast(res.data.message);
            }
            
          })
          .catch(function (error) {
            Toast(error);
          });
      }
      
    },
    closeAdr:function(){
      this.addAdr=false
    },
    // 获取地址列表
    getList(){
      var self=this;
      Indicator.open();
        this.axios.get(api.addressList).then(function (res) {
            Indicator.close();
            if(res.data.code==200){
                self.list=res.data.result;
                if(self.list.length>0){
                  self.listM=self.list[0];
                }
                
            }else{
              Toast(res.data.message);
            }
          }).catch(function (error) {
          　　Toast(error);
          });

    },
    // 新增收货地址相关函数
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

    }

   
  }
}
</script>
<style lang="scss">
#order{
  padding-top: 0.1rem;
  .mint-popup{
    border-radius: 0.15rem;
  }
  .payBox{
    width: 8.12rem;
    .payHead{
      height:1.6rem;
      line-height:1.6rem;
      position: relative;
      text-align: center;
      font-size: 0.51rem;
      color: #666;
      position: relative;
        a{
        display: block;
        width: 0.38rem;
        height:0.38rem;
        position:absolute;
        top: 50%;
        margin-top: -0.19rem;
        right:0.75rem;
        img{
          width: 0.38rem;
          height:0.38rem;
          display:block;
          vertical-align: middle;
          margin:0 auto;
        }
      }
    }
    .submit{
      a{
        display: block;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
        color: #ff4b4c;
        text-decoration: none;
        font-size: 0.42rem;
      }
    }
    .payList{
      padding: 0.5rem 0.75rem;
      border-bottom: 1px solid #d9d9d9;
      p{
        font-size: 0.36rem;
        color: #666;
        line-height: 0.9rem;
      }
    }
    .payTip{
      padding: 0.4rem 0.75rem 1rem 0.75rem;
      color: #999;
      font-size: 0.39rem;
      line-height: 1.5;
      position: relative;
      border-bottom: 0.03rem solid #d1a836;
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
  .countDown{
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    background:#ff4b4c;
    color: #fff;
    font-size: 0.33rem;
  }
  .orderBox{
    background:#fff;
    .orderTit{
        border-bottom: 1px solid #d9d9d9;
        padding: 0 0.5rem;
        height: 1.1rem;
        line-height: 1.1rem;
        i{
          vertical-align: middle;
          img{
            width: 0.39rem;
            height: 0.39rem;
            display: block;
          }
          display:inline-block;
          height: 0.39rem;
          width: 0.39rem;
        }
        span{
          vertical-align: middle;
          font-size: 0.39rem;
          color: #333;
          margin-left: 0.3rem;
        }
    }
    .orderJi{
      background:#fff;
      padding: 0.4rem 0.5rem;
      border-bottom: 1px solid #d9d9d9;
      display: -webkit-flex; /* Safari */
      display: flex;
      align-items:flex-start;
      .jiImg{
        width: 2.1rem;
        height:2.1rem;
        margin-right: 0.45rem;
        img{
          width: 2.1rem;
          height: 2.1rem;
        }
      }
      .jiCon{
        width: 5.5rem;
        h3{
          color: #333;
          font-size:0.36rem;
          margin-bottom: 0.3rem;
          font-weight: normal;        
        }
        p{
          color: #999;
          font-size: 0.36rem;
        }
      }
      .jiPrice{
        width: 1.75rem;
        text-align: right;
        h3{
          color: #333;
          font-size:0.36rem;
          margin-bottom: 0.3rem;
          font-weight: normal;        
        }
        p{
          color: #999;
          font-size: 0.36rem;
        }
      }
    }
    .sjBox{
      height: 1.2rem;
      line-height: 1.2rem;
      background:#fff;
      border-bottom: 1px solid #d9d9d9;
      text-align: right;
      color: #333;
      font-size: 0.39rem;
      padding: 0 0.5rem;
      em{
        float: left;
        font-style: normal;
        color: #666
      }
    }
     .psBox{
      height: 1.2rem;
      line-height: 1.2rem;
      background:#fff;
      text-align: right;
      color: #333;
      font-size: 0.39rem;
      padding: 0 0.5rem;
      em{
        float: left;
        font-style: normal;
        color: #666
      }
    }
  }
  .adressBox{
    margin-bottom: 0.2rem;
    background:#fff;
    padding: 0.2rem 0;
    position: relative;
    .tit{
      height:0.7rem;
      line-height:0.7rem;
      color: #333;
      font-size: 0.42rem;
      em{
        font-style: normal;
        font-weight: normal;
        padding-left: 1rem;
        padding-right: 0.5rem;
      }
    }
    .arr{
      position:absolute;
      width: 0.24rem;
      height: 0.43rem;
      right: 0.5rem;
      top: 50%;
      margin-top: -0.215rem;
      img{
        width: 0.24rem;
      height: 0.43rem;
      display: block;
      }

    }
    .bot{
      padding: 0 0.5rem;
      /* height: 0.6rem; */
      line-height: 0.6rem;
      color: #666;
      font-size: 0.33rem;
      em{
        font-style: normal;
        vertical-align: middle;
        margin-left: 0.2rem;
      }
      span{
        display: inline-block;
        vertical-align: middle;
        width: 0.35rem;
        height:0.45rem;
        img{
          width: 100%;
          height:100%
        }
      }
    }
  }
  .changeAdr{
    border-radius: 0;
    background: none;
    ul{
      background: #fff;
      li{
        padding: 0.2rem 0.5rem;
        border-bottom: 1px solid #d9d9d9;
        a{
          display: block;
          text-decoration: none;
          h3{
            font-size: 0.4182rem;
            color: #333;
            height: 0.8rem;
            line-height: 0.8rem;
            font-weight: normal;
            em{
              font-style: normal;
              margin-left: 0.5rem;
            }
          }
          p{
            font-size: 0.3285rem;
            color: #666;
            // height: 0.7rem;
            line-height: 0.7rem;
          }
        }

      }
      li:last-of-type{border:none;}
    }
    .newAdr{
      display: block;
      text-align: center;
      height: 1.2rem;
      line-height: 1.2rem;
      background: #ff4b4c;
      color: #fff;
      font-size: 0.42rem;
      text-decoration: none;
      margin-bottom: 0.2rem;
    }
    .cancelAdr{
      display: block;
      text-align: center;
      height: 1.2rem;
      line-height: 1.2rem;
      background: #fff;
      color: #333;
      font-size: 0.42rem;
      text-decoration: none;
    }
  }
  .addAdr{
    border-radius: 0;
    .addHead{
      height: 1.2rem;
      line-height: 1.2rem;
      position: relative;
      text-align: center;
      font-size: 0.42rem;
      color: #333;
      position: relative;
      a{
        position: absolute;
        display: block;
        width: 0.38rem;
        height: 0.38rem;
        left: 0.5rem;
        top: 0.41rem;
        img{
          width: 0.38rem;
          height: 0.38rem;
          display: block;
        }
      }
    }
    .newAdr{
      display: block;
      text-align: center;
      height: 1.2rem;
      line-height: 1.2rem;
      background: #ff4b4c;
      color: #fff;
      font-size: 0.42rem;
      text-decoration: none;
    }
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
        -webkit-appearance:none;appearance:none;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);border-radius:0;

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
  }
  
}
  
</style>