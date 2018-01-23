<template>
	<div id="environment">
		<div class="rankList">
			<div class="rank">
				<div class="rankBang" v-for="(item,index) in listBang">
					<router-link :to="{name:'details', query: { id:item.id}}">
						<div class="imgBox">
							<img :src="item.thumbnail" alt="冠军">
						</div>
						<h3>{{item.goodsCategory.name}}</h3>
						<div class="hj">
						<img src="../../assets/icon/hj01.png" alt="" v-if="item.farmInfo.environmentLevel==1">
						<img src="../../assets/icon/hj02.png" alt="" v-if="item.farmInfo.environmentLevel==2">
						<img src="../../assets/icon/hj03.png" alt="" v-if="item.farmInfo.environmentLevel==3">
						<img src="../../assets/icon/hj04.png" alt="" v-if="item.farmInfo.environmentLevel==4">
						<img src="../../assets/icon/hj05.png" alt="" v-if="item.farmInfo.environmentLevel==5">
						<img src="../../assets/icon/hj06.png" alt="" v-if="item.farmInfo.environmentLevel==6">
						</div>
						<p v-if="item.farmInfo.environmentLevel==1">一级环境</p>
						<p v-if="item.farmInfo.environmentLevel==2">二级环境</p>
						<p v-if="item.farmInfo.environmentLevel==3">三级环境</p>
						<p v-if="item.farmInfo.environmentLevel==4">四级环境</p>
						<p v-if="item.farmInfo.environmentLevel==5">五级环境</p>
						<p v-if="item.farmInfo.environmentLevel==6">六级环境</p>
						
					</router-link>
				</div>
			</div>
		</div>
		<ul
		  v-infinite-scroll="loadMore2"
		  infinite-scroll-disabled="loading2"
		  infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
		  <li class="list" v-for="(item,index) in listYu">
		  	<router-link :to="{name:'details', query: { id:item.id}}" class="clearfix">
		  		<div class="listItem">
		  			<div class="ids">{{index+4}}</div>
		  			<div class="img">
		  				<img :src="item.thumbnail" alt="小鸡儿">
		  			</div>
		  			<div class="con">
		  				<div class="tit">{{item.goodsCategory.name}}</div>
		  				<div class="adr">{{item.farmInfo.name}}</div>
		  				<div class="logistics">顺丰包邮/坏单包赔</div>
		  			</div>
		  			<div class="info">
		  				<!-- <div class="info1">环境检测</div> -->
		  				<div class="info2" v-if="item.farmInfo.environmentLevel==1">一级环境<img src="../../assets/icon/hj01.png" alt=""></div>
		  				<div class="info2" v-if="item.farmInfo.environmentLevel==2">二级环境<img src="../../assets/icon/hj02.png" alt=""></div>
		  				<div class="info2" v-if="item.farmInfo.environmentLevel==3">三级环境<img src="../../assets/icon/hj03.png" alt=""></div>
		  				<div class="info2" v-if="item.farmInfo.environmentLevel==4">四级环境<img src="../../assets/icon/hj04.png" alt=""></div>
		  				<div class="info2" v-if="item.farmInfo.environmentLevel==5">五级环境<img src="../../assets/icon/hj05.png" alt=""></div>
		  				<div class="info2" v-if="item.farmInfo.environmentLevel==6">六级环境<img src="../../assets/icon/hj06.png" alt=""></div>
		  				<div class="info3">库存：{{item.storageNumber}}</div>
		  			</div>
		  			<div class="arr">
		  				<img src="../../assets/icon/icon01.png">
		  			</div>
		  		</div>
		  	</router-link>
		  </li>
		</ul>
	</div>
</template>
<script>
import api from '../../api/api';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  name: 'index',
  data () {
    return {
      pageSize:10,
      pageNo:1,
      totalPage:0,
      goodsCategory:'',
      environmentLevel:1,
      list: [],
      listBang:[],
      listYu:[],
    }
  },
  mounted(){
  	this.goodsCategory=this.$route.query.goodsCategory;
  	this.getList(1);
  },
  watch:{
        '$route.query':function (val) {
            this.goodsCategory=val.goodsCategory;
            this.list=[];
            this.getList(1);
        }
    },
  methods:{
  	loadMore2() {
  		var self=this;

		if (self.pageNo<self.totalPage) {
        if(!self.loading2){
          Indicator.open(); 
          self.loading2=true;
          self.pageNo++
          setTimeout(function(){
            self.getList(self.pageNo);
          },500)       
          
          }
        }
	},
	getList(pageNo){
		var self=this;
  			Indicator.open();								
		    this.axios.get(api.goodsList, {
			　　params: {pageSize:self.pageSize,pageNo:pageNo,environmentLevel:self.environmentLevel,goodsCategoryIds:self.goodsCategory}
			}).then(function (res) {
				Indicator.close();
				if(res.data.code==200){
					self.totalPage= Math.ceil(res.data.result.count/self.pageSize)
					for(var i=0;i<res.data.result.list.length;i++){
						self.list.push(res.data.result.list[i]);					
					}
					self.listBang=self.list.slice(0,3);
					self.listYu=self.list.slice(3);
					self.loading2 = false;	

				}else{
					Toast(res.data.message)
				}
							
			}).catch(function (error) {
			　　Toast(error);
			});

	}
	
  }
}
</script>
<style lang="scss">
#environment{
	.rankList{
	height: 6.79rem;
	background: #ff4b4c;
	padding-top: 0.43rem;
	background-size: border-box;
	.rank{
		width: 9.8rem;
		height: 5.98rem;
		margin: 0 auto;
		background: url("../../assets/rank.png") no-repeat center;
		background-size: 9.8rem 5.98rem;
		position: relative;
		text-align: center;
		h3{
			font-size: 0.39rem;
			color: #333;
			margin: 0.2rem 0;
			font-weight: normal;
		}
		h4{
			font-size: 0.42rem;
			color: #333;
			font-weight: normal;
		}
		.hj{
			text-align: center;
			margin-bottom: 0.1rem;
			img{
				width:0.48rem;
				height:0.48rem;
			}
		}
		p{
			font-size: 0.3rem;
			color: #999;
		}
		a{text-decoration: none;}
		.rankBang:nth-of-type(1){
			width: 3.44rem;
			position: absolute;
			left: 50%;
			margin-left: -1.72rem;
			top: 1.4rem;
			a{
				display: block;
				.imgBox{
					width: 1.6rem;
					height: 1.6rem;
					border-radius: 50%;
					overflow: hidden;
					margin: 0 auto;
					border: 0.1rem solid #f9d00e;
					img{
						width: 100%;
						height: 100%;
					}

				}
			}

		}
		.rankBang:nth-of-type(2){
			width: 3.18rem;
			position: absolute;
			left: 0;
			height: 4rem;
			top: 2.02rem;
			a{
				display: block;
				.imgBox{
					width: 1.5rem;
					height: 1.5rem;
					border-radius: 50%;
					overflow: hidden;
					margin: 0 auto;
					img{
						width: 100%;
						height: 100%;
					}

				}
			}
		}
		.rankBang:nth-of-type(3){
			width: 3.18rem;
			position: absolute;
			right: 0;
			height: 4rem;
			top: 2.02rem;
			a{
				display: block;
				.imgBox{
					width: 1.5rem;
					height: 1.5rem;
					border-radius: 50%;
					overflow: hidden;
					margin: 0 auto;
					img{
						width: 100%;
						height: 100%;
					}

				}
			}
		}
	}
}
.list{
	display: inherit;
	border-bottom:1px solid #eaeaea;
	background:#fff;

}
.list a{text-decoration: none!important;display: block;width: 100%;overflow: hidden;}
.listItem{
	display: -webkit-flex; /* Safari */
  	display: flex;
  	 align-items:center;
  	 justify-content:center;
  	 height: 1.5rem;
  	 padding: 0.4rem 0;
  	 border:none;
  	.ids{text-align: center;color: #999;font-size: 0.42rem;width: 1.1rem;}
	.img{
		width:1.5rem;
		border-radius: 50%;
		overflow: hidden;
		img{width: 1.5rem;height: 1.5rem;}
	}
	.con{
		width:5.26rem;
		padding-left: 0.6rem;
		padding-right: 0.6rem;
		box-sizing: border-box;
		.tit{font-size: 0.3915rem;color: #333;margin-bottom: 0.1rem;}
		.adr{
			font-size: 0.3313rem;color: #999;
			white-space: nowrap;
			overflow: hidden;
			text-overflow:ellipsis;
		}
		.logistics{font-size: 0.271rem;color: #999;}
	}
	.info{
		width:2.17rem;
		.info1{font-size: 0.3915rem;color: #333;}
		.info2{
			font-size: 0.3313rem;color: #999;margin-bottom: 0.1rem;
			img{
				width:0.48rem;
				height:0.48rem;
				vertical-align: middle;
				margin-left: 0.1rem;
			}
		}
		.info3{font-size: 0.271rem;color: #5aceec;}
	}
	.arr{width:0.7rem;img{width: 0.22rem;}}
}


}

</style>