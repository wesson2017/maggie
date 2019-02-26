<template>
	<view class="body">
		<view class="scan">{{code}}</view>
		<view class="uni-list-cell">
			<view>Box Scan</view>
			<switch :checked="showbox" @change="changeScan"/>
		</view>
		<view class="uni-list-cell">
			<view>Auto Total</view>
			<switch :checked="auto" @change="autototal"/>
		</view>
		<view class="result" v-show="showgoods">
			<text class="title">Goods Info：</text>
			<view class="nav-right-item">
				<text class="first">SKU:</text>
				<text>{{good.sku}}</text>
			</view>
			<view class="nav-right-item">
				<text class="first">Des:</text>
				<text>{{good.description}}</text>
			</view>
			<view class="nav-right-item">
				<text class="first">Asin:</text>
				<text>{{good.asin}}</text>
			</view>
			<view class="nav-right-item">
				<text class="first">Size:</text>
				<text>{{good.size}}</text>
			</view>
			<view class="nav-right-item">
				<text class="first">Qty:</text>
				<text>{{good.qty}}</text>
			</view>
			<view class="nav-right-item">
				<text class="first">Boxs:</text>
				<text>{{good.box_count}}</text>
			</view>
			<view class="nav-right-item">
				<text class="first">BoxNo:</text>
				<text>#{{good.boxno}}</text>
			</view>
		</view>
		<view class="result" v-show="showbox">
			<text class="title">Box Info:</text>
			<view class="nav-right-item">
				<text class="first">SKU:</text>
				<text>{{box.siglesku}}</text>
			</view>
			<view class="nav-right-item">
				<text class="first">BoxNo:</text>
				<text>#{{box.boxno}}</text>
			</view>
			<view class="nav-right-item">
				<text class="first">Qty:</text>
				<text>{{box.qty}}</text>
			</view>
			<view class="nav-right-item">
				<text class="first">Info:</text>
				<text>{{box.info}}</text>
			</view>
		</view>
		
		<button type="primary" @click="doScan()">扫码</button>
		<view style="height: 120upx;"></view>
		<button type="primary" v-show="!auto" @click="doTotal()">通过</button>
	</view>
</template>

<script>
	import util from "../../common/util.js";
	
	export default {
		data(){
			return {
				goods:[],
				good:[],
				box:[],
				goodsindex:0,
				boxindex:0,
				showgoods:true,
				showbox:false,
				auto:true,
				code:""
			}
		},
		onLoad:function(){
			this.goods=util.getData();
		},
		onUnload:function(){
			util.savedata(this.goods);
		},
		onHide:function(){
			util.savedata(this.goods);
		},
		methods:{
			doScan:function(){
				uni.scanCode({
					success:function(res){
						this.code=res.result;
						let haveresult=false;
						if(this.showgoods){
							for (let i = 0; i < this.goods.length; i++) {
								if(this.goods[i].asin.trim() == this.code.trim()){
									this.good=this.goods[i];
									this.goodsindex=i;
									//this.goods[i].qty_check+=1;
									haveresult=true;
									break;
								}
							}
						}else{
							for (let i = 0; i < this.goods.length; i++) {
								let boxobj=this.goods[i].boxs;
								for (let j = 0; j < boxobj.length; j++) {
									if(boxobj[j].asin.trim() == this.code.trim()){
										this.goodsindex=i;
										this.boxindex=j;
										this.box=boxobj[j];
										//this.goods[i].box_count_check+=1;
										//this.goods[i].boxs[j].checked=true;
										haveresult=true;
										break;
									}
								}
								if(haveresult){
									break;
								}
							}
						}
						if(!haveresult){
							this.good=[];
							this.box=[];
							uni.showToast({
								icon:"none",
								title:"没有找到数据"
							});
						}else{
							if(this.auto){
								this.doTotal();
							}
						}
					}.bind(this)
				})
			},
			changeScan:function(e){
				if(e.detail.value){
					this.showbox=true;
					this.showgoods=false;
				}else{
					this.showbox=false;
					this.showgoods=true;
				}
			},
			doTotal:function(e){
				if(this.showbox){
					this.goods[this.goodsindex].box_count_check+=1;
					this.goods[this.goodsindex].boxs[this.boxindex].checked=true;
				}else{
					this.goods[this.goodsindex].qty_check+=1;
				}
				uni.showToast({
					icon:"none",
					title:"检查通过成功"
				});
			},
			autototal:function(e){
				if(e.detail.value){
					this.auto=true;
				}else{
					this.auto=false;
				}
			}
		}
	}
</script>

<style>

	.body{
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	switch{
		zoom: 80%;
	}
	.scan{
		width: 100%;
		font-size: 48upx !important;
		justify-content: center;
		color: #007AFF;
		height: 150upx;
		line-height: 150upx;
	}
	
	.result{
		width: 100%;
		padding:20upx 20upx;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	
	.nav-left-item {
		height: 80upx;
		border-bottom: solid 1upx #E0E0E0;
		font-size: 30upx !important;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.nav-right-item .first{
		padding-right: 20upx;
		color: #007AFF !important;
	}
	
	.title{
		font-size: 48upx !important;
		color: red !important;
	}
	
	.uni-list-cell {
		width: 80%;
		line-height: 60upx;
		justify-content: space-between;
		align-items: center;
	}
</style>
