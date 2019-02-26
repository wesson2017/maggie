<template>
	<view class="body">
		<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
			<view class="nav-left-item" @click="categoryClickMain(item,index)" :key="index" :class="index==categoryActive?'active':''"
				v-for="(item,index) in goods">
				#{{item.boxno}}~{{item.sku}}
			</view>
		</scroll-view>
		<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" >
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
				<text class="first">BoxNo:</text>
				<text>#{{good.boxno}}</text>
			</view>
			<view class="nav-right-item">
				<text class="first">Qty:</text>
				<text>{{good.qty}}</text>
			</view>
			<view class="nav-right-item">
				<text class="first">QtyCheck:</text>
				<text class="red">{{good.qty_check}}</text>
			</view>
			<view class="nav-right-item">
				<text class="first">Boxs:</text>
				<text>{{good.box_count}}</text>
			</view>
			<view class="nav-right-item">
				<text class="first">BoxCheck:</text>
				<text class="red">{{good.box_count_check}}</text>
			</view>
			<view class="nav-right-item">
				<text class="first">Info:</text>
				<textarea v-model="good.info" @blur="changeInfo()" @confirm="changeInfo()"></textarea>
			</view>
			<view class="box-item">
				<view class="title">Asin-BoxNo-Qty</view>
				<view class="uni-list">
					<view class="uni-list-cell" v-for="(box,indexb) in boxs" :key="indexb">
						<view class="left">
							<text>{{box.asin}}</text>
							<text>SKU: {{box.siglesku}}</text>
							<view class="box">
								<text>BoxNo: #{{box.boxno}}</text>
								<text>Qty: {{box.qty}}</text>
							</view>
						</view>
						<switch :id="indexb" :checked="box.checked" :disabled="box.checked" @change="checkboxChange"/>
					</view>
				</view>
			</view>
			<view style="height: 50upx;">.......</view>
		</scroll-view>
	</view>
	
</template>

<script>
	import util from "../../common/util.js";
	export default {
		data() {
			return {
				goods: [],
				boxs: [],
				good:{},
				height: 0,
				categoryActive: 0,
				scrollTop: 0,
				scrollHeight: 0
			}
		},
		methods: {
			scroll:function(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			categoryClickMain:function(categroy, index) {
				this.categoryActive = index;
				this.boxs = categroy.boxs;
				this.good=categroy;
				this.scrollTop = -this.scrollHeight * index;
			},
			changeInfo:function(e){
				this.goods[this.categoryActive].info=this.good.info;
			},
			checkboxChange:function(e){
				this.goods[this.categoryActive].boxs[e.target.id].checked=e.detail.value;
				this.boxs[e.target.id].checked=e.detail.value;
			}
		},
		onLoad: function () {
			uni.setNavigationBarTitle({
				title:uni.getStorageSync("title")
			});
			this.goods=util.getData();
			this.good=this.goods[0];
			this.boxs=this.goods[0].boxs;
			this.height = uni.getSystemInfoSync().windowHeight;
		},
		onUnload:function(){
			util.savedata(this.goods);
		},
		onShow:function(){
			this.goods=util.getData();
		},
		onHide:function(){
			util.savedata(this.goods);
		}
	}
</script>

<style>
	@import "../../common/uni.css";
	
	.body{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	switch{
		zoom: 80%;
	}
	.uni-list-cell {
		line-height: 60upx;
		justify-content: space-between;
		align-items: center;
	}
	
	.uni-list-cell .left{
		flex-direction: column;
		justify-content: flex-start;
	}
	.uni-list-cell .left text{
		height: 40upx;
		line-height: 40upx;
	}
	.uni-list-cell .box{
		justify-content: space-between;
	}
	.uni-list-cell switch{
		width: 120upx !important;
		height: 40upx !important;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 35%;
		border-right: solid 1upx #E0E0E0;
	}

	.nav-left-item {
		height: 80upx;
		border-bottom: solid 1upx #E0E0E0;
		font-size: 30upx !important;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.nav-right {
		width: 65%;
		padding-left: 20upx;
	}
	
	.nav-right-item{
		width: 100%;
		line-height: 40upx;
		flex-direction: row;
		justify-content: flex-start;
		border-bottom: dotted 1upx #E0E0E0;
	}
	.nav-right-item .first{
		padding-right: 20upx;
		color: #007AFF !important;
	}
	.nav-right-item textarea{
		border: 1upx solid #E0E0E0;
	}
	.active {
		color: #007AFF;
	}
	.title{
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		color: #007AFF !important;
	}
	.checkbox{
		height: 60upx;
		line-height: 60upx;
		width: 60upx;
	}
	.box-item{
		width: 100%;
		flex-direction: column;
	}
	.red{
		color: #FF0000 !important;
	}
</style>
