<template>
	<div id="out">
		  <div class="outBox">
        <div class="outHead">关注有惊喜</div>
        <p>您正访问神鸡营，请先关注我们的微信公众号.</p>
        <p>新用户可领取价值25元的数据服务体验一次</p>
        <img src="../../assets/icon/gzh.png">
        <p>长按识别二维码快速关注</p>
      </div>
	</div>
</template>
<script>
export default {
  name: 'hello',
  data() {
    return {
      
    }
  },
  mounted() {
    $(window).scrollTop(0);
    document.title="神鸡营"; 
  },
  methods: {
   
  }
}
</script>
<style lang="scss">
#out{
  .outBox{
    width: 9.28rem;
    height: 11.9rem;
    background: #fff;
    top: 1.3rem;
    position: absolute;
    left: 50%;
    margin-left: -4.64rem;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    padding-top: 0.2rem;
    img{
      display: block;
      width: 7.3rem;
      height: 7.3rem;
      margin-top: 0.5rem;
      margin-bottom: 0.3rem;
      margin-left: auto;
      margin-right: auto;
    }
    .outHead{
      font-size: 0.42rem;
      color: #666;
      height: 1.5rem;
      line-height: 1.5rem;
      width: 3rem;
      margin: 0 auto;
      padding-left: 0.8rem;
      background: url("../../assets/icon/icon32.png") no-repeat left center;
      background-size:0.53rem 0.56rem; 
    }
    p{
      text-align: center;
      font-size: 0.3rem;
      color: #999;
      line-height: 1.5;
    }
  }

}
 
</style>