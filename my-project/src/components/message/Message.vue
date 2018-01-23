<template>
	<div id="message" v-infinite-scroll="loadMoreM"
		  infinite-scroll-disabled="loadingM"
		  infinite-scroll-distance="10"
		  infinite-scroll-immediate-check="false">
		<div class="msgList" v-for="item in msgList">
			<div class="msgTitle clearfix">
				<i v-if="item.isRead==0"></i>
				<em>{{item.title}}</em>
				<span>{{item.createDate}}</span>
			</div>
			<div class="msgCon">
				<div class="msg" v-html="item.content">
				</div>
				<div class="msgImg">
					<img :src="item.file">
				</div>
			</div>
		</div>	
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
    	totalPage:0
    }
  },
  mounted() {
    document.title="消息";
    this.getMsg(1)
  },
  methods: {
  	loadMoreM(){
  		var self=this;
  		if (self.pageNo<self.totalPage) {
  			if(!self.loadingM){
  				Indicator.open(); 
  				self.loadingM=true;
  				self.pageNo++
  				setTimeout(function(){
  					self.getMsg(self.pageNo);
  				},500)		  	
			  	
  			}  				
						  	       		
		    }
  	},
  	getMsg(pageNo){  		
  		var self=this;
  		 Indicator.open(); 		 			
		self.axios.get(api.messageList, {
		　　params: {pageSize:self.pageSize,pageNo:pageNo}
		}).then(function (res) {
			Indicator.close();
			self.totalPage= Math.ceil(res.data.result.count/self.pageSize)
			for(var i=0;i<res.data.result.messageList.length;i++){
				self.msgList.push(res.data.result.messageList[i]) ;
			} 

			self.loadingM=false;			
					
		}).catch(function (error) {
		　　Toast(error);
		});

  										
		    
			
  	}

   
  }
}
</script>
<style lang="scss">
#message{
	padding-top: 0.38rem;
	background: #efefef;
	padding-bottom: 0.38rem;
	.msgList{
	background: #fff;
	width: 9.8rem;
	margin: 0 auto 0.38rem auto;
	border-radius: 0.2rem;
	box-sizing: border-box;
	padding: 0.4rem;
	
	.msgTitle{
		line-height: 0.7rem;
		height: 0.7rem;
		position: relative;
		i{
			display: block;
			position: absolute;
			width: 0.15rem;
			height: 0.15rem;
			border-radius:50%;
			background: #ff4b4c;
			top: 0.275rem;
			left: -0.275rem;
		}
		em{
			float: left;
			color: #333;
			font-size: 0.42rem;
			font-style: normal;
		}
		span{
			float: right;
			font-size: 0.33rem;
			color: #999;
		}
	}
	.msgCon{
		display: -webkit-flex; /* Safari */
        display: flex;
        align-items:flex-end;
        justify-content:center;
        height: 1.5rem;
        .msg{
        	width: 7.5rem;
        	h3{
        		font-size: 0.36rem;
        		color: #666;
        		font-weight: normal;
        		margin-bottom: 0.15rem;
        	}
        	p{
        		color: #999;
        		font-size: 0.33rem;
        	}
        }
        .msgImg{
        	width: 1.5rem;
        	height: 1.5rem;
        	img{
        		width: 1.5rem;
        		height: 1.5rem;
        	}
        }
	}
}
}


</style>