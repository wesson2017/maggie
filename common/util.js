export default {
	savedata:function(data){
		//#ifdef APP-PLUS
			//plus.localStorage.setItem("goods",data);
			uni.setStorageSync("goods",data);
		//#endif
		//#ifdef MP-WEIXIN
			uni.setStorageSync("goods",data);
		//#endif
	},
	getData:function(){
		//#ifdef APP-PLUS
			//return plus.localStorage.getItem("goods");
			return uni.getStorageSync("goods");
		//#endif
		//#ifdef MP-WEIXIN
			return uni.getStorageSync("goods");
		//#endif
	},
	init:function(goods){
		var data=goods.sort(function(obj1,obj2){
			var val1 = obj1.boxno;
			var val2 = obj2.boxno;
			if (val1 < val2) {
				return -1;
			} else if (val1 > val2) {
				return 1;
			} else {
				return 0;
			}     
		});
		this.savedata(data);
	}
}