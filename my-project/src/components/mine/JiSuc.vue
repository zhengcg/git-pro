<template>
  <div id="jiSuc">
  <div class="sucBox">
    <img src="../../assets/suc.png" alt="">
  </div>
  <p>已享受新人福利，本次数据服务免费</p>
  <p>戳下面按钮监控小鸡跑步情况</p>
  <a href="javascript:;" class="purchase" @click="gotoDetail">查看详情</a>
  </div>
</template>

<script>
export default {
  name: 'jiSuc',
  data () {
    return {
      id:''
      
    }
  },
  created(){
    this.id = this.$route.query.id;
  },
  mounted(){
    document.title="购买成功"
  },
  methods:{
    gotoDetail:function(){
      var self=this;
      self.$router.push({
                        path: '/orderDetail',
                        query:{id:self.id}
                    })
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
