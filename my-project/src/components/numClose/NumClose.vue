<template>
  <div id="numClose">
    <!-- <a href="javascript:;" @click="login">去登陆</a> -->
    <div class="numHead clearfix">
      <div class="imgBox"><img :src="goods.images"></div>
      <div class="con">
        <h3>{{goods.title}}</h3>
        <p>鸡种：{{deviceBatch.breedName}}</p>
        <p>重量：1KG</p>
        <p>养殖周期：半年</p>
        <p>预计出栏时间：{{deviceBatch.endDate}}</p>
      </div>
    </div>
    <div class="sg">
      <div class="sgHead">
        <span>正品数关</span>
      </div>
      <div class="payTip">
        <span></span>
      </div>
      <ul>
        <li>
          <i><img src="../../assets/icon/icon24.png"></i>
          <span>平均步数{{jiaoHuanData.avgStep}}</span>
          <em>通过正品数关验证</em>
        </li>
        <li>
          <i><img src="../../assets/icon/icon24.png"></i>
          <span>健康状况良好</span>
          <em>通过正品数关验证</em>
        </li>
        <li>
          <img src="../../assets/icon/icon24.png">
          <span>环境情况良好</span>
          <em>通过正品数关验证</em>
        </li>
      </ul>
    </div>
    <div class="sportBox">
      <div class="sportHead">运动状况</div>
      <div class="chartBox">
        <div id="myChart"></div>
      </div>     
      <p><span>脚环安装 {{deviceBatch.startDate}}</span><span>脚环取下 {{deviceBatch.endDate}}</span></p>
      <p>总共运动<em>{{jiaoHuanData.totalStep}}万</em>步，处于整个农场的前<em>50%</em></p>
    </div>
    <div style="height:0.3rem"></div>
    
  </div>
</template>
<script>
    // 引入基本模板
  let echarts = require('echarts')
  // import * as types from '../../store/types'
  import api from '../../api/api';
  import { Indicator } from 'mint-ui';
  import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
              dataAxis:[],
              stepData:[],
              airData:[],
              weather:[],
              start:0,
              end:6,
              codeId:'',
              deviceBatch:{},
              goods:{},
              jiaoHuanData:{}
              
            }
        },
        created(){
          var self=this;
          this.codeId = this.$route.query.codeId;
          this.getInfo()

        },
        mounted () {
          document.title="正品数关"
          var self=this;          
                   
        },
        methods: {
          getInfo(){
            var self=this;
            Indicator.open();
            this.axios.get(api.scanRecord,{params: {codeId:self.codeId}}).then(function (res) {
                Indicator.close();
                if(res.data.code==200){
                  self.goods=res.data.result.goods;
                  self.deviceBatch=res.data.result.deviceBatch;
                  self.jiaoHuanData=res.data.result.jiaoHuanData;
                  if(res.data.result.jiaoHuanData.steps){
                    for(var i=0;i<self.jiaoHuanData.steps.length;i++){
                      self.dataAxis.push(self.jiaoHuanData.steps[i].stepDate);
                      self.stepData.push(self.jiaoHuanData.steps[i].stepCounts);
                      self.airData.push(self.jiaoHuanData.steps[i].temp);
                      self.weather.push(self.jiaoHuanData.steps[i].weather);                    
                    }
                  self.spliceFn(7);
                  }
                  
                  
                }else{
                  Toast(res.data.message);
                }
                
              }).catch(function (error) {
              　　Toast(error);
              });

          },
          spliceFn(num){
            var self=this;
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
          }
         /* 
          login(){
            this.$store.commit(types.LOGOUT)
            this.$router.push({
              path: '/login',
              query: {redirect: this.$router.currentRoute.fullPath}
            })
          }*/

         
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
#numClose{
  padding-top: 0.2rem;
  .chartBox{
    width:9.8rem;
    height:7rem;
    margin: 0.3rem auto;
    border-radius:0.1rem;
    border:1px solid #d9d9d9;
    // box-shadow: 0 3px 3px rgba(86, 96,117,0.3);
  }
  
  .numHead{
    background: #fff;
    padding:0.6rem 0.5rem;
    margin-bottom: 0.2rem;
    .imgBox{
      width: 2.6rem;
      height: 2.6rem;
      float: left;
      img{
        width:2.6rem;
        height:2.6rem;
      }
    }
    .con{
      margin-left: 3rem;
      h3{
        font-size: 0.39rem;
        color: #333;
        font-weight: normal;
        margin-bottom:0.2rem;
      }
      p{
        font-size:0.33rem;
        color:#999;
        line-height: 0.5rem;
      }
    }
  }
  .sg{
    background:#fff;
    margin-bottom:0.2rem;
    .sgHead{
      height: 1.2rem;
      line-height: 1.2rem;
      text-align: center;
      font-size: 0.3916rem;
      color: #333;
      i{
        vertical-align: middle;
        display: inline-block;
        img{
          vertical-align: middle;
          width: 0.45rem;
          height: 0.45rem;
        }
      }
      span{
        vertical-align: middle;
        // margin-right: 0.21rem;
      }
    }
    .payTip{      
      position: relative;
      height: 0.15rem;
      border-bottom: 0.03rem solid #d1a836;
      margin-bottom: 0.4rem;
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
    ul{
      li{
        height:1.15rem;
        line-height:1.15rem;
        border-bottom:1px solid #d9d9d9;
        font-size:0.36rem;
        color:#666;
        padding:0 0.5rem;
        display: -webkit-flex; /* Safari */
        display: flex;
        align-items:center;
        // justify-content:center;
          
          img{
            width:0.4rem;
            height:0.4rem;
            vertical-align:middle;
            margin-right: 0.3rem;
          }
        span{
          width:3.5rem;
          margin-right:0.3rem;
        }
        em{
          font-style: normal;
        }
      }
    }
  }
  .sportBox{
    background:#fff;
    padding:0 0.5rem 0.3rem 0.5rem;
    margin-bottom:0.2rem;
    .sportHead{
      text-align:center;
      height:1.15rem;
      line-height:1.15rem;
      color:#333;
      font-size:0.3916rem;
    }
    p{
      font-size:0.2996rem;
      color:#666;
      text-align:center;
      line-height:0.7rem;
      span{
        padding:0 0.27rem;
      }
      em{
        color:#ff4b4c;
        font-style:normal;
      }
    }
  }
  

}
</style>