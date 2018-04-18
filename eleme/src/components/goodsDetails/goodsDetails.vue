<template>
	<transition name='show'>
		<div class="goodsDetails" v-show="isShow" ref='goodsDetails'>
			<div class="content-wrapper">
				<div class="banner">
					<img :src="food.image"/>
					<span class="icon-arrow_lift back" @click="back"></span>
				</div>
				<div class="header clearfix">
					<h1 class="header-h1">{{food.name}}</h1>
					<p class="header-p-01"><span class="header-p-01-span">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span></p>
					<div class="header-div-01 fl">
						<span>¥</span>{{food.price}}
					</div>
					<div class="header-div-02 fl" v-show="food.oldPrice">
						<span>¥</span>{{food.oldPrice}}
					</div>	
					<transition name='fade'>
						<div class="addToCart" v-show="(!food.count) || (food.count === 0)" @click.stop="addFood">
							加入购物车
						</div>
					</transition>					
					<div class="purchaseButton-wrapper" v-show="food.count > 0">
						<purchasebutton :food='food'></purchasebutton>
					</div>
				</div>
				<div class="goods-intr" v-show="food.info">
					<h2 class="goods-intr-h2">商品介绍</h2>
					<p class="goods-intr-p">{{food.info}}</p>
				</div>
			</div>
		</div>
	</transition>
	
</template>

<script>
	import Vue from 'vue';
	import Bus from '../../common/js/bus.js';
	import BetterScroll from 'better-scroll';
	import PurchaseButton from '../purchaseButton/purchaseButton';	
	export default {
		name: 'GoodsDetails',
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				isShow: false
			};
		},
		methods: {
			show() {
				this.isShow = true;
				this.$nextTick(() => {
					if (!this.scroll){
						this.scroll = new BetterScroll(this.$refs.goodsDetails,{
							click: true
						});
					} else {
						this.scroll.refresh();
					}					
				});
			},
			back() {
				this.isShow = false;
			},
			addFood() {
				if (!this.food.count){
					Vue.set(this.food,'count',1);
				} else {
					this.food.count++;
				}
				this.submitData();
			},
			submitData() {
				Bus.$emit('val', this.food);
			}
		},
		components: {
			'purchasebutton': PurchaseButton
		}
	};
</script>

<style scoped="scoped">
	@import url("../../common/css/style.css");
	.goodsDetails{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0.48rem;
		background: rgb(243,245,247);
		z-index: 90;
		width: 100%;
	}
	.show-enter-active,.show-leave-active,.fade-enter-active,.fade-leave-active{
		transition: 0.5s;
	}
	.show-enter,.show-leave-to{
		transform: translate3d(100%,0,0);
	}
	.fade-enter,.fade-leave-to{
		opacity: 0;
	}
	.banner{
		position: relative;
	}
	.back{
		position: absolute;
		top: 0.1rem;
		left: 0.1rem;
		font-size: 0.2rem;
		color: rgb(255,255,255);
	}
	.header,.goods-intr{
		padding: 0 0.18rem;
		background: rgb(255,255,255);
		border-bottom: 1px solid rgba(7,17,27,0.1);
		margin-bottom: 0.16rem;
		position: relative;
	}
	.header-h1,.goods-intr-h2{
		font-size: 0.14rem;
		line-height: 0.14rem;
		padding: 0.18rem 0 0.08rem;
		font-weight: bold;
		color: rgb(7,17,27);
	}
	.header-p-01{
		font-size: 0.1rem;
		line-height: 0.1rem;
		color: rgb(147,153,159);
		padding-bottom: 0.23rem;
	}
	.header-p-01-span{
		padding-right: 0.12rem;
	}
	.header-div-01{
		font-size: 0.14rem;
		line-height: 0.14rem;
		font-weight: bold;
		color: rgb(240,20,20);
		padding: 0 0.08rem 0.23rem 0;
	}
	.header-div-01 span{
		font-size: 0.1rem;
		font-weight: normal;
	}
	.header-div-02{
		font-size: 0.1rem;
		line-height: 0.14rem;
		text-decoration: line-through;
		font-weight: bold;
		color: rgb(147,153,159);
	}
	.header-div-02 span{
		font-weight: normal;
	}
	.addToCart{
		width: 0.74rem;
		height: 0.24rem;
		background: rgb(0,160,220);
		font-size: 0.1rem;
		line-height: 0.24rem;
		text-align: center;
		color: rgb(255,255,255);
		border-radius: 0.12rem;
		position: absolute;
		right: 0.18rem;
		bottom: 0.18rem;
	}
	.purchaseButton-wrapper{
		position: absolute;
		right: 0.18rem;
		bottom: 0.18rem;
	}
	.goods-intr{
		border-top: 1px solid rgba(7,17,27,0.1);
	}
	.goods-intr-h2{
		font-weight: normal;
	}
	.goods-intr-p{
		padding: 0.06rem 0.08rem 0.18rem;
		font-size: 0.12rem;
		line-height: 0.24rem;
		color: rgb(77,85,93);
	}
</style>