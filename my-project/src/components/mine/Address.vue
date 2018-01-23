<template>
	<div id="address">
      <div class="adrList" v-for="(item,index) in list">
        <div class="borderDiv" v-show="item.isDefault==1"></div>
        <div class="top">
          <h3>{{item.receiver}}<span>{{item.receiverPhone}}</span></h3>
          <p>{{item.province}}&emsp;{{item.city}}&emsp;{{item.county}}&emsp;{{item.detailAddress}}</p>
        </div>
        <div class="bot clearfix">
          <label :class="{active: item.isDefault==1}" @click="setDefault(item.uuid)"><span>设为默认</span></label>
          <router-link :to="{name:'edit',query:{id:item.uuid}}"><i><img src="../../assets/icon/icon08.png"></i>编辑</router-link>
          <a href="javascript:;" @click="deleteFn(index,item.uuid)"><i><img src="../../assets/icon/icon07.png"></i>删除</a>
        </div>
        <div class="borderDiv" v-show="item.isDefault==1"></div>
      </div>
      <div style="height:1.4rem;"></div>
      <router-link :to="{name:'add'}" class="addBtn">新增地址</router-link>
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
      isActive:true,
      list:[]
      
    }
  },
  mounted() {
    document.title="地址管理"
    this.getList()
    
  },
  methods: {
    getList(){
      var self=this;
      Indicator.open();
        this.axios.get(api.addressList).then(function (res) {
            Indicator.close();
            if(res.data.code==200){
                self.list=res.data.result
            }else{
              Toast(res.data.message);
            }
          }).catch(function (error) {
          　　Toast(error);
          });

    },
    deleteFn:function(index,id){
      var self=this;
      MessageBox.confirm('确认要删除该地址吗？','删除确认').then(function(){
        Indicator.open();
        self.axios.get(api.deleteAddress,{params: {uuid:id}}).then(function (res) {
            Indicator.close();
            if(res.data.code==200){
                Toast("删除成功！");
                self.list.splice(index,1)
                
            }else{
              Toast(res.data.message);
            }
          }).catch(function (error) {
          　　Toast(error);
          });
      },function(){
      });
    },
    setDefault:function(id){
      var self=this;
      Indicator.open();
      self.axios.get(api.setDefault,{params: {uuid:id}}).then(function (res) {
            Indicator.close();
            if(res.data.code==200){
                Toast("设置成功！");
                window.location.reload();
                
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
#address{
  padding-top: 0.4rem;
  .addBtn{
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
  .adrList{
    background: #fff;
    margin-bottom: 0.4rem;
    .borderDiv{
      height: 0.05rem;
      background:url("../../assets/icon/icon26.png") repeat-x left top;
      background-size: 0.62rem 0.05rem;
    }
    .top{
      border-bottom: 1px solid #d9d9d9;
      padding: 0.2rem 0.5rem;
      h3{
        color: #333;
        font-size: 0.42rem;
        font-weight: normal;
        height: 0.75rem;
        line-height: 0.75rem;
        span{
          margin-left: 0.45rem;
        }
      }
      p{
        color:#666;
        font-size:0.33rem;
        line-height:0.75rem;
      }
    }
    .bot{
      padding:0.38rem 0.5rem;
      text-align: right;
      label{
        float: left;
        padding-left: 0.53rem;
        background: url("../../assets/icon/icon22.png") no-repeat left center;
        background-size: 0.33rem 0.33rem;
        span{
          vertical-align: middle;
          font-size:0.33rem;
          color:#333;
        }
        
      }
      label.active{
        background: url("../../assets/icon/icon23.png") no-repeat left center;
        background-size: 0.33rem 0.33rem;
      }
      a{
        color:#666;
        font-size:0.33rem;
        margin-left:0.3rem;
        text-decoration: none;
        i{
          vertical-align:middle;
          height:0.31rem;
          margin-right:0.12rem;
          img{
            height:0.31rem;
          }

       
        }
        em{
          font-style: normal;
          vertical-align:middle;
          
        }

      }
    }
  }

}
</style>