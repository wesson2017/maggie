<script>
	import param from "./common/data.rz20190109.js";
	import util from "./common/util.js";
	
	export default {
		onLaunch: function () {
			util.init(param.goods);
			uni.setStorageSync("title",param.title);
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	
	@import "/common/icon.css"; 

	page,
	view {
		display: flex;/* uni-app默认使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。若不需要flex布局可删除本行*/
	}

	page {
		min-height: 100%;
	}
	view,text{
		font-size: 30upx!important;
	}
	image{
		width: 100%;
	}
	switch{
		width: 80upx;
		height: 40upx;
	}
	
</style>
