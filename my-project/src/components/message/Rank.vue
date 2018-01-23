<template>
	<div id="rank">
		<div class="rankHead">
			<h1>排行榜</h1>
			<div class="tabBtn clearfix">
				<a href="javascript:;" :class="{active:isDay}"  @click="changeTab(1)">日榜</a>
				<a href="javascript:;" :class="{active:!isDay}"  @click="changeTab(2)">总榜</a>
			</div>
			<p>数据更新时间：2018-01-19 8小时33分8秒</p>
			<div class="headIcon" v-show="isDay">
				<img src="../../assets/test/test1.png">
			</div>
			<div class="headIcon" v-show="!isDay">
				<img src="../../assets/test/test.png">
			</div>
			<div class="rankOne">
				<img src="../../assets/icon/icon28.png">
				<span v-show="isDay">NO:00000008</span>
				<span v-show="!isDay">NO:1111118</span>
			</div>
			<p v-show="isDay">
				<span>卢氏鸡</span>
				<span>云南大山鸡场</span>
				<span>当日步数：43042</span>
			</p>
			<p v-show="!isDay">
				<span>卢氏鸡</span>
				<span>云南大山鸡场</span>
				<span>平均步数：450501</span>
				<span>跑步天数：10</span>
			</p>

		</div>
		<ul v-show="isDay">
			<li>
				<div class="num"><img src="../../assets/icon/icon29.png"></div>
				<div class="imgBox">
					<img src="../../assets/test/test1.png">
				</div>
				<div class="info">
					<h3>NO:00000001</h3>
					<p>卢氏鸡</p>
					<p>云南大山鸡场</p>
				</div>
				<div class="steps">
					<p>当日步数</p>
					<span>43214</span>					
				</div>				
			</li>
			<li>
				<div class="num"><img src="../../assets/icon/icon30.png"></div>
				<div class="imgBox">
					<img src="../../assets/test/test1.png">
				</div>
				<div class="info">
					<h3>NO:00000002</h3>
					<p>卢氏鸡</p>
					<p>云南大山鸡场</p>
				</div>
				<div class="steps">
					<p>当日步数</p>
					<span>40123</span>					
				</div>				
			</li>
			<li>
				<div class="num"><span>4</span></div>
				<div class="imgBox">
					<img src="../../assets/test/test1.png">
				</div>
				<div class="info">
					<h3>NO:00000003</h3>
					<p>卢氏鸡</p>
					<p>云南大山鸡场</p>
				</div>
				<div class="steps">
					<p>当日步数</p>
					<span>39885</span>					
				</div>				
			</li>
		</ul>
		<ul v-show="!isDay">
			<li>
				<div class="num"><img src="../../assets/icon/icon29.png"></div>
				<div class="imgBox">
					<img src="../../assets/test/test1.png">
				</div>
				<div class="info">
					<h3>NO:00000008</h3>
					<p>卢氏鸡</p>
					<p>云南大山鸡场</p>
				</div>
				<div class="steps">
					<p>当日步数</p>
					<span style="padding-top:0.1rem;">5500000</span>
					<p>跑步天数</p>
					<span style="padding-top:0.1rem;">10</span>					
				</div>				
			</li>
			<li>
				<div class="num"><img src="../../assets/icon/icon30.png"></div>
				<div class="imgBox">
					<img src="../../assets/test/test1.png">
				</div>
				<div class="info">
					<h3>NO:00000008</h3>
					<p>卢氏鸡</p>
					<p>云南大山鸡场</p>
				</div>
				<div class="steps">
					<p>当日步数</p>
					<span style="padding-top:0.1rem;">5500000</span>
					<p>跑步天数</p>
					<span style="padding-top:0.1rem;">10</span>							
				</div>				
			</li>
			<li>
				<div class="num"><span>4</span></div>
				<div class="imgBox">
					<img src="../../assets/test/test1.png">
				</div>
				<div class="info">
					<h3>NO:00000008</h3>
					<p>卢氏鸡</p>
					<p>云南大山鸡场</p>
				</div>
				<div class="steps">
					<p>当日步数</p>
					<span style="padding-top:0.1rem;">5500000</span>
					<p>跑步天数</p>
					<span style="padding-top:0.1rem;">10</span>							
				</div>				
			</li>
		</ul>
		<div style="height:0.5rem"></div>

	</div>
</template>
<script>
import api from '../../api/api';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  name: 'hello',
  data() {
    return {
    	msgList:[],
    	pageSize:10,
    	pageNo:1,
    	totalPage:0,
    	isDay:true  
    }
  },
  mounted() {
    document.title="排行榜";
    
  },
  methods: {
  	changeTab(i){
  		if(i==1){
  			this.isDay=true;
  		}else{
  			this.isDay=false;
  		}
  	}
  
  }
}
</script>
<style lang="scss">
#rank{
	background:#fff;
}
#rank .rankHead{
	height:7.76rem;
	text-align:center;
	background:url("../../assets/rankBg.jpg") no-repeat center;
	background-size:10.8rem 7.76rem;
	color: #fff;

}
#rank .rankHead h1{
	padding-top:0.2rem;
    height:0.88rem;
    line-height:0.88rem;
    width:2rem;
    margin:0 auto;
    font-size:0.42rem;
    font-weight: normal;
    border-bottom: 0.04rem solid #fff;
}
 #rank .rankHead .tabBtn{height: 0.55rem;width: 3rem;margin: 0.5rem auto 0.25rem auto;line-height: 0.55rem;border-radius: 0.03rem;overflow: hidden;}
#rank .rankHead .tabBtn a{display: block;float: left;width: 50%;box-sizing: border-box;text-align: center;border: 0.02rem solid #fff;font-size: 0.33rem;text-decoration: none;line-height:0.55rem;height:0.55rem;color:#fff}
#rank .rankHead .tabBtn a.active{color: #9219ff;background: #fff;}
#rank .rankHead p{color:#fff;font-size:0.27rem;}
#rank .rankHead .headIcon{width:2.3rem;height:2.3rem;border-radius:50%;overflow:hidden;margin:0.7rem auto 0.1rem auto;}
#rank .rankHead .headIcon img{width:2.3rem;height:2.3rem;}
#rank .rankHead .rankOne{margin:0 auto 0.2rem auto;height:0.8rem;line-height:0.8rem;text-align:center;font-size:0.42rem;}
#rank .rankHead .rankOne span{vertical-align: middle}
#rank .rankHead .rankOne img{vertical-align:middle;width:0.55rem;margin-right:0.35rem;}
#rank .rankHead p span{font-size:0.3rem;padding:0 0.15rem;}
#rank ul{background:#fff;}
#rank ul li{display: -webkit-flex; /* Safari */
  	display: flex;
  	 align-items:center;
  	 justify-content:center;padding:0.5rem;border-bottom: 1px solid #eaeaea}
#rank ul li .num{width: 1.15rem;font-size: 0.35rem;color: #333;}
#rank ul li .num span{padding-left: 0.18rem;}
#rank ul li .num img{width:0.55rem;margin-right:0.35rem;}
#rank ul li .imgBox{width: 1.65rem;height: 1.65rem;border-radius: 50%;overflow: hidden;margin-right: 0.5rem;}
#rank ul li .imgBox img{width: 1.65rem;height: 1.65rem;}
#rank ul li .info{width: 5rem;}
#rank ul li .info h3{font-size: 0.3497rem;color: #333;margin-bottom: 0.3rem;font-weight: normal;}
#rank ul li .info p{font-size: 0.3008rem;color: #666;}
#rank ul li .steps{font-size: 0.3008rem;color: #666;}
#rank ul li .steps span{color: #0fc1e7;padding-top: 0.2rem;display: block;}


</style>