<template>
	<div id="set">
      <ul id="mineList">
        <li>
          <router-link :to="{name:'address'}">
            <div class="mineName">地址管理</div>
            <div class="mineArr"><img src="../../assets/icon/icon01.png"></div>
          </router-link >
        </li>
        <li>
          <router-link :to="{name:'account'}">
            <div class="mineName">账号管理</div>
            <div class="mineArr"><img src="../../assets/icon/icon01.png"></div>
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'telSer'}">
            <div class="mineName">客服中心</div>
            <div class="mineArr"><img src="../../assets/icon/icon01.png"></div>
          </router-link>
        </li>
      </ul>
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
    document.title="设置"
    
  },
  methods: {
   
  }
}
</script>
<style lang="scss">
#set{
  #mineList{
    background:#fff;
    li{
      border-bottom: 1px solid #eaeaea;
      display: inherit;
      a{
        display: -webkit-flex; /* Safari */
        display: flex;
        align-items:center;
        justify-content:center;
        height: 1.3rem;
        text-decoration: none;
        .mineName{
          margin-left: 0.3rem;
          width: 9.29rem;
          color: #333;
          font-size: 0.39rem;
        }
       
        .mineArr{
          margin-left: 0.3rem;
          width: 0.7rem;
          img{
            height: 0.4rem;
          }
        }
      }
    }
  }
}
  
</style>