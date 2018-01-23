<template>
	<div id="rank">
		<iframe src="http://www.baidu.com" id="myiframe" scrolling="no" frameborder="0"></iframe>

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
    document.title="排行榜";
    
  },
  methods: {

  }
}
</script>
<style lang="scss">
#rank{
	background:#fff;
	position: absolute;
	top: 0;
	left:0;
	right: 0;
	bottom: 1.6rem;
	#myiframe{
	width: 100%;
	height: 100%
	}
}



</style>