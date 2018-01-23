<template>
  <div id="jiSuc">
  <div class="sucBox">
    <img src="../../assets/suc.png" alt="">
  </div>
  <p>数据服务购买成功，您可以开始选鸡了。</p>
  <router-link :to="{name:'index'}" class="purchase" @click.native="flushCom">立刻选鸡</router-link>
  </div>
</template>

<script>
export default {
  name: 'jiSuc',
  data () {
    return {
      
    }
  },
  mounted(){
    document.title="购买成功"
  },
  methods:{
    flushCom:function(){
　　　　　　window.location.reload();
　　　　}

  }
}
</script>

<style lang="scss">
#jiSuc{
  p{
    text-align: center;
    font-size: 0.3rem;
    color: #999;
    line-height: 0.5rem;
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
  .sucBox{
    width: 7.91rem;
    height: 6.43rem;
    margin: 0 auto;
    padding: 1.5rem 0 0.75rem 0;
    img{
      width: 7.91rem;
      height: 6.43rem;
    }
  }

}
</style>
