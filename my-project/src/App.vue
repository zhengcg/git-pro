<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    // import * as types from './store/types'
    // import {mapState} from 'vuex'
    import { Indicator } from 'mint-ui';
    export default {
        name: 'app',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
            }
        },
        watch:{
            '$route':function(to,from){
　　　　　　　　　　 document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0; 
           }
        },
   /*     computed: mapState({
            title: state => state.title,
            token: state => state.token
        }),*/
          
        methods: {
   
        }
    }
</script>

<style>
html,body{height: 100%;padding: 0;margin: 0;}
*{margin: 0;padding: 0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 10.8rem;
  margin: 0 auto;
  position: relative;
  height: 100%;
/*  overflow: auto;
  -webkit-overflow-scrolling : touch; */
  font-size: 0.271rem;
  background: #efefef;
}
.clearfix:after{content: '';display: block;height: 0;clear: both;-ms-zoom: 1;}
</style>
