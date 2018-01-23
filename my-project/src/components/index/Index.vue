<template>
	<div id="index">
		<ul class="clearfix nav">
			<li><router-link :to="{name:'steps'}" activeClass="active" >步数</router-link><em @click.stop="gotoStep"></em></li>
			<li><router-link :to="{name:'environment'}" activeClass="active">环境</router-link><em @click.stop="gotoEnv"></em></li>
			<li><router-link :to="{name:'price'}" activeClass="active">价格<i v-show="finalPrice==1">↓</i><i v-show="finalPrice==0">↑</i></router-link><em @click.stop="selectPrice"></em></li>		
			
			<li v-if="hasDataService&&isBindMobile"><router-link :to="{name:'custom'}" activeClass="active">自定义</router-link><em @click.stop="selectCustom"></em></li>
			<li v-else><router-link :to="{name:'custom'}" activeClass="active">自定义</router-link><em @click.stop="gotoBuy"></em></li>
			<li><a href="javascript:;" @click="screenFn" class="lastR">筛选<span></span></a></li>			
		</ul>
		<div style="height: 1.22rem;"></div>
		<!-- 价格筛选 -->
		<mt-popup v-model="price" position="top" class="priceL" >
		    <div style="height: 1.22rem;width: 10.8rem;"></div>
	       <a href="javascript:;" :class="{'active':isActive==2}" @click="routePrice(0)"><span></span>价格由低到高</a>
		    <a href="javascript:;" :class="{'active':isActive==3}" @click="routePrice(1)"><span></span>价格由高到低</a>

		    
		</mt-popup>
		<!-- 品种筛选 -->
		<mt-popup v-model="screen" position="top" class="screenL">
		    <div style="height: 1.22rem;width: 10.8rem;"></div>
		    <div class="screenTitle clearfix">
		    	<em>鸡种（可多选）</em>
		    	<a href="javascript:;" class="reset" @click="reset">重置</a>
		    	<a href="javascript:;" class="submit" @click="submit">确定</a>
		    </div>
		    <mt-checklist
			  v-model="value"
			  :options="options">
			</mt-checklist>
		</mt-popup>
		<!-- 自定义筛选 -->
		<mt-popup v-model="custom" position="top" class="customL">
	        <div style="width: 10.8rem;height: 1.22rem;"></div>
	        <div class="screenTitle clearfix">
	          <a href="javascript:;" class="reset" @click="resetC">重置</a>
	          <a href="javascript:;" class="submit" @click="submitC">确定</a>
	        </div>
	        <div class="customBox">
	            <div class="customDiv">
	              <p>价格区间</p>
	              <div>
	                <div class="priceInput">
	                  <input type="tel" placeholder="最低价" style="left:0.55rem;" v-model="minPrice">
	                  <span></span>
	                  <input type="tel" placeholder="最高价" style="right: 0.55rem;" v-model="maxPrice">
	                </div>
	                <div class="priceSelect clearfix">
	                  <a href="javascript:;" :class="{active: priceDefault==1}" @click="priceRange(90,100,1)">90-100<p>39%的选择</p></a>
	                  <a href="javascript:;" :class="{active: priceDefault==2}"   @click="priceRange(100,120,2)">100-120<p>37%的选择</p></a>
	                  <a href="javascript:;" :class="{active: priceDefault==3}"   @click="priceRange(120,150,3)">120-150<p>9%的选择</p></a>
	                </div>
	              </div>
	            </div>
	            <div class="customDiv">
	              <p>步数</p>
	              <div style="position: relative;margin-left: 18px;">
	                <p style="height: 20px;line-height: 20px;text-align: center;color: #999;font-size: 0.3rem;margin-left: -18px;">10000-无限</p>
	                <span class="leftR"></span>
	                <mt-range
	                  v-model="maxStep"
	                  :min="10000"
	                  :max="50000"
	                  :step="1"
	                  :bar-height="3">
	                </mt-range>
	                <span class="rightR"></span>
	                <p style="color: #0fc1e7;font-size: 0.3rem;margin-left: -18px;margin-top: 10px;text-align: center"><em style="font-style: normal;float: left">10000</em>当前值：{{maxStep<50000?maxStep:"无限"}}<em style="font-style: normal;float: right">无限</em></p>
	              </div>
	            </div>
	            <div class="customDiv">
	              <p>环境</p>
	              <div style="position: relative;margin-left: 18px;">
	                <p style="height: 20px;line-height: 20px;text-align: center;color: #999;font-size: 0.3rem;margin-left: -18px;">6-1</p>
	                <span class="leftR"></span>
	                <mt-range
	                  v-model="envValue"
	                  :min="1"
	                  :max="6"
	                  :step="1"
	                  :bar-height="3">
	                </mt-range>
	                <span class="rightR"></span>
	                <p style="color: #0fc1e7;font-size: 0.3rem;margin-left: -18px;margin-top: 10px;text-align: center">
	                  <em style="font-style: normal;float: left">
	                    <img src="../../assets/icon/hj06.png" style="width: 0.5rem;">
	                  </em>
	                  当前值：{{envValueL}}
	                  <em style="font-style: normal;float: right">
	                    <img src="../../assets/icon/hj01.png" style="width: 0.5rem;">
	                  </em>
	                </p>
	              </div>
	            </div>        
	        </div>

    	</mt-popup>

				
		<!-- <div v-show="isFirst">首次进来能看到</div>
		<a href="javascript:;" @click="cancelFirst">看首次</a> -->
		<router-view/>
		
	</div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import api from '../../api/api';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Popup } from 'mint-ui';
export default {
  name: 'index',
  data () {
    return {
      screen:false,
      options:[],
	  value:[],

	  price:false,
	  isActive:1,

	  custom:false,
      minStep:10000,
      maxStep:10000,
      envValue:1,
      minPrice:'',
      maxPrice:'',
      priceDefault:0,
      finalPrice:0,
      hasDataService:false,
      isBindMobile:false
    }
  },
  computed:{
  	// 环境
    envValueL:function(){
      return 7-this.envValue
    }
  },
  mounted(){
  	document.title="神鸡营" 	

  	var query=this.$route.query
  	if(query.finalPrice==0||query.finalPrice==1){
  		this.isActive=parseInt(query.finalPrice)+2
  	}else{
  		this.isActive=1
  	}

  	this.maxStep=parseInt(query.maxStep)||10000;
  	this.minPrice=parseInt(query.minPrice)||'';
  	this.maxPrice=parseInt(query.maxPrice)||'';
  	this.envValue=parseInt(query.envValue)||1;
  	this.priceDefault=parseInt(query.priceDefault)||0;
  	if(query.goodsCategory){
  		this.value=query.goodsCategory.split(",")
  	}else{
  		this.value=[]
  	}
  	
  	this.getList();
  },

  methods:{
  	gotoBuy(){
      var self=this;
      if(self.isBindMobile){
      	MessageBox.confirm('购买数据服务，才能使用本功能','无数据服务权限').then(function(){
                  self.$router.push({
                        path: '/numOrder'
                      })
                 
                },function(){
                });

      }else{
      	MessageBox.confirm('请先绑定手机号').then(function(){
            self.$router.push({
                  path: '/bindTel'
                })
           
          },function(){
          });
      }
      
    },
	// 点击筛选弹出筛选列表
	screenFn:function(){
		var self=this;
		this.screen=true;
		self.price=false;
    	self.custom=false;
	},
	// 重置筛选
	reset:function(){
		this.value=[];
	},
	// 提交筛选
	submit:function(){
		var self=this;
		this.screen=false;
		var path=this.$router.currentRoute.fullPath;
		console.log(path);
		this.$router.push(
              {
              	path:path,
              	query:{
              		goodsCategory:self.value.toString()
              	}
              }
           )
		
	},
	selectPrice:function(){
		var self=this;
		// this.price=true;
    	self.custom=false;
    	self.screen=false;
    	if(self.finalPrice==0){
    		self.finalPrice=1;
    	}else{
    		self.finalPrice=0;
    	}
    	// alert(self.finalPrice)
    	this.$router.push(
              {
              	name:'price',
              	query:{
              		finalPrice:self.finalPrice,
              		goodsCategory:self.value.toString()
              	}
              }
           )
	},
	routePrice:function(i){
		var self=this;
		this.isActive=i+2;
		this.price=false;
		this.$router.push(
              {
              	name:'price',
              	query:{
              		finalPrice:i,
              		goodsCategory:self.value.toString()
              	}
              }
           )

	},


	// 自定义相关
	selectCustom(){
		var self=this;
		this.custom=true;
		self.price=false;
    	self.screen=false;
	},
	resetC:function(){
      this.minPrice="";
      this.maxPrice="";
      this.priceDefault=0;
      this.maxStep=10000;
      this.envValue=1;

    },
    submitC(){
      var self=this;
      this.custom=false;
      this.$router.push(
              {
              	name:'custom',
              	query:{
              		maxStep:self.maxStep,
              		minPrice:self.minPrice,
              		maxPrice:self.maxPrice,
              		minLevel:(7-self.envValue),
              		priceDefault:self.priceDefault,
              		envValue:self.envValue,
              		goodsCategory:self.value.toString()
              	}
              }
           )
    },
    gotoStep(){
    	var self=this;
    	self.price=false;
    	self.custom=false;
    	self.screen=false;
    	 this.$router.push(
              {
              	name:'steps',
              	query:{              		
              		goodsCategory:self.value.toString()
              	}
              }
           )


    },
    gotoEnv(){
    	var self=this;
    	self.price=false;
    	self.custom=false;
    	self.screen=false;
    	 this.$router.push(
              {
              	name:'environment',
              	query:{              		
              		goodsCategory:self.value.toString()
              	}
              }
           )

    },
    priceRange:function(i,j,z){
      this.minPrice=i;
      this.maxPrice=j;
      this.priceDefault=z;

    },

	getList(){
		var self=this;
  			Indicator.open();								
		    this.axios.get(api.categoryList).then(function (res) {
				Indicator.close();
				if(res.data.code==200){
					for(var i=0;i<res.data.result.categories.length;i++){
					var obj={
						label: res.data.result.categories[i].name,
				    	value: res.data.result.categories[i].id
					}
					self.options.push(obj);					
					}
					self.hasDataService=res.data.result.hasDataService;
					self.isBindMobile=res.data.result.isBindMobile;		
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
#index{
	.screenL{
		max-height: 13rem;
    overflow: auto;
	}
	.customBox{
    background: #fff;
    padding: 0.5rem;
    border-top: 1px solid #d9d9d9;
    .customDiv{
      >p{
        color: #333;
        font-size: 0.33rem;
      }
      >div{
        padding-left: 1.8rem;
        margin-bottom: 0.4rem;
        .priceInput{
          background: #ffeae9;
          height: 0.8rem;
          position: relative;
          input{
            box-sizing: border-box;
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
            border:0.02rem solid #ff3036;
            border-radius: 0.05rem;
            width: 2.3rem;
            background: #ffeae9;
            position: absolute;
            top: 0.1rem;
            font-size: 0.3rem;
            box-shadow: none;
          }
          span{
            display: block;
            width: 1.2rem;
            height: 0.4rem;
            border-bottom: 0.01rem solid #ff3036;
            top: 0;
            left: 50%;
            margin-left: -0.6rem;
            position: absolute;
          }
        }
        .priceSelect{
          margin-top: 0.3rem;
          a{
            display: block;
            float: left;
            width: 2.25rem;
            box-sizing: border-box;
            padding: 0.15rem 0;
            border:0.03rem solid #ffeae9;
            border-radius: 0.03rem;
            text-align: center;
            margin-right: 0.62rem;
            text-decoration: none;
            font-size: 0.305rem;
            color: #666;
          }
          a.active{
            color: #fff;
            border:0.03rem solid #ff4b4c;
            background:#ff4b4c;
          }
          a:last-of-type{
            margin: 0;
          }

        }
        .leftR{
          display: block;
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ff4b4c;
          z-index: 1000;
          top: 25px;
          margin-left: -18px;
        }
        .rightR{
          display: block;
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          z-index: 1000;
          top: 25px;
          right: 0;
          box-sizing: border-box;
          border:1px solid #ff4b4c;
        }
      }

    }
  }

	.closeGao{
		display: block;
		margin: 0.6rem auto 0 auto;
		width: 0.75rem;
		height: 0.75rem;
		img{
			width: 0.75rem;
			height: 0.75rem;
		}
	}
	.nav{position: fixed;height: 1.22rem;top: 0;left: 50%;margin-left: -5.4rem;width: 10.8rem;border-top: 0.02rem solid #dbdbdb;background: #fff;box-shadow: 0 0 3px rgba(86, 96,117,0.3);z-index: 10000;}
.nav li{
	float: left;
	width: 20%;	
	list-style-type: none;
	position:relative;

}
.nav li i{
	font-style: normal;
}
.nav li em{
	position:absolute;
	display:block;
	width:100%;
	height:100%;
	left:0;
	top:0;
}
.nav li a{
	display: block;
	text-align: center;
	font-size: 0.36rem;
	color: #333;
	height: 1.22rem;
	line-height: 1.22rem;
	text-decoration: none;

}
.nav li a.lastR{
	border-left: 1px solid #d9d9d9;
	span{
		display:inline-block;
		vertical-align: middle;
		height:1.22rem;
		width:0.37rem;
		background:url("../../assets/icon/icon11.png") no-repeat center;
		background-size: 0.37rem auto;
		margin-left: 0.1rem;
	}
}
.nav li a.active{
	background: #eee;
	// color: #2cc4e7;
}
.mint-checklist-title{display: none;}
.screenTitle{
	height: 1.33rem;
	line-height: 1.33rem;
	color: #333;
	font-size: 0.33rem;
	padding: 0 0.5rem;
	text-align: right;
	em{
		float: left;
		font-style: normal;
	}
	a{
		text-decoration: none;
		display: inline-block;
		width: 1.16rem;
		height: 0.5rem;
		text-align: center;
		line-height: 0.5rem;
		border-radius: 0.25rem;
		box-sizing: border-box;
	}
	a.reset{
		color: #ff3036;
		border: 1px solid #ff3036;
		margin-right: 0.3rem;
	}
	a.submit{
		background: #ff3036;
		color: #fff;
		border: 1px solid #ff3036;
	}
	
}
}

</style>