<template>
	<div id="details">
    <div class="head">
      <!-- <img :src="goodsImages[0]" alt=""> -->
      <mt-swipe :auto="0"  class="myswipe">
        <mt-swipe-item v-for="i in goodsImages" :key="i" class="swiper-slide"><img :src="i" alt=""></mt-swipe-item>        
      </mt-swipe>
      <div class="priceBox">￥{{goods.price}}</div>
    </div>
    <div class="detT clearfix">
      <span style="position: relative">{{goods.goodsCategory.name}}<i style="color: #ccc;position: absolute;right: 0.2rem;font-style:normal ">|</i></span><em @click="showNC"  style="position: relative;width: 38.333%">{{goods.farmInfo.name}}<i style="color: #ccc;position: absolute;right: 0.2rem;font-style:normal">|</i></em><span style="color: #999;font-size: 0.33rem;width: 28.33333%">库存：{{goods.storageNumber}}</span>
    </div>
    <div style="clear: both;"></div>
    <div class="detSum">
      <div class="det det1">
        <h3>预计出栏时间</h3>
        <p>{{goods.presaleDate}}</p>
      </div>
      <div class="det det2">
        <h3>累计步数</h3>
        <p v-if="goods.goodsStep">{{(goods.goodsStep.totalNumber/10000).toFixed(2)}}万步</p>
        <p v-else>0万步</p>
        
      </div>
      <div class="det det3">
        <h3>日均步数</h3>
        <p v-if="goods.goodsStep">{{goods.goodsStep.avgNumber}}步</p>
        <p v-else>0步</p>
        
      </div>
      <div class="det det4" @click="showHJ" v-if="goods.farmInfo.environmentLevel==1">
        <h3>1级环境</h3>
        <i><img src="../../assets/icon/hj01.png"></i>       
      </div>
      <div class="det det4" @click="showHJ" v-if="goods.farmInfo.environmentLevel==2">
        <h3>2级环境</h3>
        <i><img src="../../assets/icon/hj02.png"></i>       
      </div>
      <div class="det det4" @click="showHJ" v-if="goods.farmInfo.environmentLevel==3">
        <h3>3级环境</h3>
        <i><img src="../../assets/icon/hj03.png"></i>       
      </div>
      <div class="det det4" @click="showHJ" v-if="goods.farmInfo.environmentLevel==4">
        <h3>4级环境</h3>
        <i><img src="../../assets/icon/hj04.png"></i>       
      </div>
      <div class="det det4" @click="showHJ" v-if="goods.farmInfo.environmentLevel==5">
        <h3>5级环境</h3>
        <i><img src="../../assets/icon/hj05.png"></i>       
      </div>
      <div class="det det4" @click="showHJ" v-if="goods.farmInfo.environmentLevel==6">
        <h3>6级环境</h3>
        <i><img src="../../assets/icon/hj06.png"></i>       
      </div>
    </div>   
    <div class="chartBox"  v-show="dataRight">
      <ul class="clearfix">
        <li><a href="javascript:;" @click="spliceFn(1,20)" :class="{ active: defaultBtn==1 }">近30日</a></li>
        <li><a href="javascript:;" @click="spliceFn(2,15)" :class="{ active: defaultBtn==2 }">近15日</a></li>
        <li><a href="javascript:;" @click="spliceFn(3,7)" :class="{ active: defaultBtn==3 }">近7日</a></li>
        <li><a href="javascript:;" @click="open('picker')" :class="{ active: defaultBtn==4 }">自定义</a></li>
      </ul>
      <div id="myChart"></div>
    </div>     
    <div class="tipBox" v-if="!dataRight" @click="gotoBuy">想看更多数据？立刻购买数据服务</div>
    <div class="detTitle">商品详情</div>
    <div class="detCon" v-html="goods.content">
    <!-- {{}} -->
    </div>
    <div style="height:1.4rem;"></div>
    <a href="javascript:;" class="purchase" @click="gotoOrder" v-if="goods.storageNumber>0">立即购买</a>
    <a href="javascript:;" class="purchase" style="background: #ddd" v-else>立即购买</a>
    <!-- 开始日期 -->
    <mt-datetime-picker
      ref="picker"
      v-model="pickerVisible"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日" 
      :startDate="startDate"
      :endDate="endDate"
       @confirm="handleChange">
    </mt-datetime-picker>
    <!-- 结束日期 -->
    <mt-datetime-picker
      ref="picker1"
      v-model="pickerVisible1"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日" 
      :startDate="startDate1"
      :endDate="endDate"
       @confirm="handleChange1">
    </mt-datetime-picker>
	</div>
</template>
<script>
let echarts = require('echarts')
import { MessageBox } from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';
import { Popup } from 'mint-ui';
import api from '../../api/api';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  name: 'hello',
  data() {
    return {
      id:'',
      goods:{
        deviceBatch:{},
        farmInfo:{},
        goodsCategory:{},
        goodsStep:{}
      },
      goodsImages:[],     
      goodsSteps:[],
      dataRight:false,
      mobileBindStatus:false,
      farmInfo:{},
      defaultBtn:3,
      pickerVisible:'',
      pickerVisible1:'',
      startDate: new Date('2017-12-01'),
      startDate1: new Date('2017-12-01'),
      endDate: new Date(),
      dataAxis:['2017/5/1','2017/5/2','2017/5/3','2017/5/4','2017/5/5','2017/5/6','2017/5/7','2017/5/8','2017/5/9','2017/5/10','2017/5/11','2017/5/12','2017/5/13','2017/5/14','2017/5/15','2017/5/16','2017/5/17','2017/5/18','2017/5/19','2017/5/20','2017/5/21','2017/5/22','2017/5/23','2017/5/24','2017/5/25','2017/5/26','2017/5/27','2017/5/28','2017/5/29','2017/5/30'],
      stepData:[10000, 15000, 50000, 36000, 40000, 32000, 28000,10000, 15000, 20000, 30000, 40000, 32000, 28000,10000, 15000, 50000, 36000, 40000, 32000, 28000,10000, 15000, 20000, 30000, 40000, 32000, 28000, 32000, 28000],
      airData:[25, 29, 28, 19, 12, 6, 20,10, 29, 28, 19, 12, 6, 20,25, 29, 28, 19, 12, 6, 20,10, 29, 28, 19, 12, 6, 20, 6, 20],
      start:0,
      end:6
    }
  },
  created(){
    this.id = this.$route.query.id;
    this.getDetail();  
  },
  mounted() {
    
       
  },
  methods: {
      getDetail(){
        var self=this;
        Indicator.open();               
        this.axios.get(api.detail, {params: {id:self.id}}).then(function (res) {
          Indicator.close();
          if(res.data.code==200){
            self.goods=res.data.result.goods;
          self.goodsSteps=res.data.result.goodsSteps; 
          self.dataRight=res.data.result.dataRight;
          self.mobileBindStatus=res.data.result.mobileBindStatus;
          self.goodsImages=self.goods.images.split(",");
          if(self.dataRight){
              self.spliceFn(3,7); 
            }

          }else{
            Toast(res.data.message)
          }
          

        }).catch(function (error) {
        　　Toast(error);
        });

      },
      open(picker) {
        this.$refs[picker].open();
      },
      handleChange(value) {
        this.startDate1=value
        this.open('picker1')
      },
      handleChange1(value) {
        console.log(this.pickerVisible+"-"+this.pickerVisible1);
      },
      spliceFn(index,num){
        var self=this;
        self.defaultBtn=index;
        var l=self.dataAxis.length;
        self.start=l-num;
        self.end=l-1
        self.drawLine()
      },
    drawLine() {
            // 基于准备好的dom，初始化echarts实例
            var self=this;
            let myChart = echarts.init(document.getElementById('myChart'))
            // 绘制图表
            var option = {
              baseOption:{
                tooltip: {
                    trigger: 'axis',
                      axisPointer: {
                          type: 'cross',
                          crossStyle: {
                              color: '#d9d9d9'
                          }
                      }
                  },  
                  legend: {
                      data:['运动数量','最高气温'],
                      left:'center',
                      bottom:0
                       
                  },              

                  dataZoom: [
                        {
                            show: true,
                            realtime: true,
                            startValue: self.start,
                            endValue:self.end,
                            type: 'inside'
                        }
                    ],
                    grid: { 
                          x2:40                          
                       },
                  xAxis: [

                      {
                          
                          type: 'category',
                          data: self.dataAxis,
                          axisPointer: {
                              type: 'line'
                          },
                       
                          axisLine: {
                              lineStyle: {
                                  type: 'dotted',
                                  color: '#d9d9d9',//左边线的颜色
                                  width:'1'//坐标线的宽度
                              }
                          },
                          axisLabel: {
                              textStyle: {
                                  color: '#666',//坐标值得具体的颜色
                                  fontSize:10
           
                              }
                          }
                      }
                  ],
                  yAxis: [
                      {
                          type: 'value',
                          name: '温度（°C）',
                          interval: 5,
                          axisLine: {
                              lineStyle: {
                                  type: 'solid',
                                  color: '#d9d9d9',//左边线的颜色
                                  width:'1'//坐标线的宽度
                              }
                          },
                            splitLine:{  
                              lineStyle: {
                                  type: 'dotted',
                                  color: '#d9d9d9',//左边线的颜色
                                  width:'1'//坐标线的宽度
                              }  
                        　　},
                          axisLabel: {
                            formatter: '{value}',
                              textStyle: {
                                  color: '#666',//坐标值得具体的颜色
                                  fontSize:10
           
                              }
                          }
                          
                      },
                      {
                          type: 'value',
                          name: '运动数量',
                          interval: 10000,
                          axisLine: {
                              lineStyle: {
                                  type: 'solid',
                                  color: '#d9d9d9',//右边线的颜色
                                  width:'1'//坐标线的宽度
                              }
                          },
                          splitLine:{  
                        　　　　show:false  
                        　},
                          axisLabel: {
                              formatter: '{value}',
                              textStyle: {
                                  color: '#666',//坐标值得具体的颜色
                                  fontSize:10
           
                              }
                          }
                      }
                  ],
                  series: [ 
                      {
                          name:'运动数量',
                          type:'bar',
                          yAxisIndex: 1,
                          data:self.stepData,
                          barWidth : 10,
                          itemStyle:{ 
                           normal:{barBorderRadius: 50,color:'#999'},
                         }

                      },                   
                      
                      {
                          name:'最高气温',
                          type:'line',                         
                          data:self.airData,
                          itemStyle:{ 
                           normal:{color:'#ff4b4c'}
                           
                         }
                      }                                            
                  ]

              }                 
            };

            myChart.setOption(option);
          },
    showNC(){
      var self=this;
      this.$router.push(
              {
                name:'farm',
                query:{
                  id:self.goods.farmInfo.id
                }
              }

            )
      // this.nc=true;
      
    },
    showHJ(){
      var self=this;
      this.$router.push(
              {
                name:'env',
                query:{
                  id:self.goods.farmInfo.id
                }
              }

            )
      // this.hj=true
    },
    gotoBuy(){
      var self=this;
      self.$router.push({
                        path: '/numOrder'
                      })

    },
    gotoOrder(){
      var self=this;
      if(self.mobileBindStatus){
           if(self.dataRight){
                self.$router.push({
                      path: '/order',
                      query:{id:self.id}
                    })
              }else{
                MessageBox.confirm('请先购买数据服务，然后才能开始买鸡。','无数据服务权限').then(function(){
                  self.$router.push({
                        path: '/numOrder'
                      })
                 
                },function(){
                });

              }

      }else{

         MessageBox.confirm('请先绑定手机号').then(function(){
            self.$router.push({
                  path: '/bindTel'
                })
           
          },function(){
          });

      }
     
      
    }

  }
}
</script>

<style lang="scss">
   @media screen and (max-width:375px){
      #myChart{      
      width: 280px;
      height: 200px;
      margin:0 auto;
      }
    }
    @media screen and (min-width:375px) and (max-width:410px){
      #myChart{      
      width: 320px;
      height: 220px;
      margin:0 auto;
      }
    }
    @media screen and (min-width:410px) and (max-width:600px){
      #myChart{      
      width: 360px;
      height: 250px;
      margin:0 auto;
      }
    }
    @media screen and (min-width:600px) and (max-width:768px){
      #myChart{      
      width: 540px;
      height: 380px;
      margin:0 auto;
      }
    }
    @media screen and (min-width:768px){
      #myChart{      
      width: 680px;
      height: 480px;
      margin:0 auto;
      }
    }   
#details{
  background:#fff;
  .chartBox{
    width:9.8rem;
    height:7rem;
    margin: 0.3rem auto;
    border-radius:0.1rem;
    border:1px solid #d9d9d9;
    position: relative;
    padding-top: 1rem;
    // box-shadow: 0 3px 3px rgba(86, 96,117,0.3);
    ul{
      border-radius: 0.01rem;
      overflow: hidden;
      position: absolute;     
      right: 0.5rem;
      top: 0.5rem;
      li{
        float: left;
        list-style: none;
        a{
          display: table-cell;
          border:1px solid #d9d9d9;
          border-right:none;
          color: #666;
          text-decoration: none;
          height: 0.58rem;
          line-height: 0.58rem;
          padding: 0 0.2rem;
          white-space: nowrap;
          font-size: 0.27rem;
        }
        a.active{
          background:#d9d9d9;
          color: #fff;
        }
        

      }
      li:last-of-type a{
          border-right: 1px solid #d9d9d9;
        }
    }
   
  }

  .head{
    position: relative;
    height:10.8rem;
    box-shadow: 0 0 3px rgba(86, 96, 117, 0.3);
    img{
      width:10.8rem;
      height:10.8rem;
    }
    .priceBox{
      color: #fff;
      font-size: 0.51rem;
      height:0.9rem;
      line-height: 0.9rem;
      padding: 0 0.5rem;
      border-radius: 0.45rem;
      position:absolute;
      bottom: -0.45rem;
      right: 0.5rem;
      background: #ff4b4c;
    }
  }
  .detT{
    height:1.9rem;
    line-height:1.9rem;
    text-align:center;
    font-size:0.4242rem;
    span{
      width: 33.3333%;
      text-align: left;
      display: block;
      float: left;
      box-sizing: border-box;
      padding: 0 0.5rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow:hidden;

      // display:
      /* color:#b2b2b2;
      color:#eee;
      font-size:0.5rem; */
    }
    em{
      width: 33.3333%;
      text-align: left;
      display: block;
      float: left;
      box-sizing: border-box;
      padding-left: 0.55rem;
      padding-right: 0.5rem;
      background:url("../../assets/icon/icon09.png") no-repeat left center;
      background-size:0.39rem;
      font-style: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow:hidden;
    }
  }
  .detSum{
    display: -webkit-flex; /* Safari */
    display: flex;
    align-items:flex-start;
    justify-content:space-between;
    margin-bottom:0.5rem;
    .det{
      flex-grow:1;
      // border-right: 1px solid #b2b2b2;
      border-right: 1px solid #eee;
      color:#666;
      font-size:0.33rem;
      text-align:center;
      h3{
        font-weight: normal;
        font-size:0.33rem;
        margin-bottom: 0.2rem;
      }
      p{
        font-size:0.33rem;
      }
    }
    
    .det4{
      border:none;
      position:relative;
      i{
        display:block;
        width:0.48rem;
        height:0.48rem;
        position:absolute;
        left:50%;
        margin-left:-0.24rem;
        // top:0.8rem;
        img{
          width:0.48rem;
          height:0.48rem;
        }
      }
    }
  }
  .tipBox{
    height:0.5rem;
    line-height:0.5rem;
    text-align:center;
    background:#e1f8fc;
    color:#2ac5e8;
    font-size:0.27rem;
  }
  .detTitle{
    font-size:0.42rem;
    color:#333;
    height:1.1rem;
    line-height:1.1rem;
    width:1.8rem;
    text-align:center;
    border-bottom: 0.02rem solid #333;
    margin:0 auto;
  }
  .detCon{
    padding:0.5rem;
    color:#666;
    overflow: hidden;
    img{
      display:block!important;
      width:9.8rem!important;
      margin:0 auto!important;
    }
  }
  .detCon *{
    max-width: 9.8rem!important;

  }
  .purchase{
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
    .titleHead{
    position: fixed;
    width: 100%;
    top: 0;
    background:#ff4b4c;
    color: #fff;
    text-align: center;
    height:1.2rem;
    line-height:1.2rem;
    font-size: 0.42rem;
    a{
      display: block;
      width: 0.38rem;
      height:0.38rem;
      position:absolute;
      top: 0.41rem;
      right:0.5rem;
      img{
        width: 0.38rem;
        height:0.38rem;
        display:block;
        vertical-align: middle;
        margin:0 auto;
      }
    }

  }
  
}

</style>