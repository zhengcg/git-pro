<template>
  <div id="telSer">
  <img src="../../assets/icon/icon20.png" alt="">
  <div style="margin-top: 1.1rem;font-size: 0.6rem;color: #666;text-align: center;margin-bottom: 0.3rem;">客服热线</div>
  <a href="tel:15600853039">15600853039</a>
  </div>
</template>

<script>
export default {
  name: 'telSer',
  data () {
    return {
      
    }
  },
  mounted(){
    document.title="客服中心"
  },
  methods:{

  }
}
</script>

<style lang="scss">
#telSer{
  padding-top: 1.7rem;
  img{
    margin: 0 auto;
    display: block;
    width: 4rem;
    height: 4rem;
  }
  a{
    display: block;
    text-align: center;
    color: #666;
    text-decoration: none;
    font-size: 0.6rem;
  }


}
</style>
