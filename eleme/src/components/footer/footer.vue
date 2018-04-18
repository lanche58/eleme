<template>
	<div class="cart">
		<div class="cart-left">
			<div class="cart-logo-wrapper fl" @click="showCartDetails">
				<div class="cart-logo" :class="{'countActive': totalCount !== 0}">
					<div class="icon-shopping_cart cart-logo-svg"></div>
					<div class="countNum" v-show="totalCount !== 0">
						{{totalCount}}
					</div>
				</div>
			</div>
			<div class="currentPrice fl">
				¥{{totalPrice}}
			</div>
			<div class="deliveryPrice fl">
				另需配送费¥{{seller.deliveryPrice}}元
			</div>
		</div>
		<div class="cart-right">
			<div class="cart-right-p" :class="{'cart-right-p-02':(totalPrice >= seller.minPrice)&&(totalCount !== 0)}" @click="pay">{{currentPrice}}</div>
		</div>
		<transition name="fade">
			<div class="cart-details" v-show="isShowCom">				
				<div class="cart-details-header clearfix">
					<span class="cart-details-header-left fl">购物车</span>
					<span class="cart-details-header-right fr" @click="emptyCart">清空</span>
				</div>
				<div class="cart-details-content">
					<ul class="cart-details-content-ul">
						<li v-for="item in selectedFood" :key="item.index" class="cart-details-content-li clearfix" v-show="item.count !== 0">
							<div class="cart-details-content-li-left">{{item.name}}</div>
							<div class="cart-details-content-li-right">
								<div class="right-price fl">
									<span>¥</span>{{item.count * item.price}}
								</div>
								<div class="cartControl-wrapper fl">
									<purchasebutton :food='item'></purchasebutton>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition name='vanish'>
			<div class="mask" v-show="isShowCom" @click="fold = true"></div>
		</transition>		
	</div>
</template>

<script>
	import Bus from '../../common/js/bus.js';
	import PurchaseButton from '../purchaseButton/purchaseButton';	
	export default {
		name: 'Cart',
		props: {
			seller: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		data() {
			return {
				selectedFood: [],
				fold: true
			};
		},
		created() {
		    Bus.$on('val', (data) => {
		    	for (let i = 0; i < this.selectedFood.length; i++) {
		    		if (this.selectedFood[i].name === data.name){
		    			this.selectedFood.splice(i,1,data);
		    		}
		    	}
		    	let isName = this.selectedFood.every((item,index,arr) => {
		    		return item.name !== data.name;
		    	});
		    	if (isName){
		    		this.selectedFood.push(data);
		    	}
		    });
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectedFood.forEach((food) => {
					total += food.price * food.count;
				});
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectedFood.forEach((food) => {
					count += food.count;
				});
				return count;
			},
			currentPrice() {
				if (this.totalCount === 0){
					return '¥' + this.seller.minPrice + '起送';
				} else if ((this.totalPrice < this.seller.minPrice) && (this.totalCount !== 0)){
					return '还差¥' + (this.seller.minPrice - this.totalPrice) + '起送';
				} else if ((this.totalPrice >= this.seller.minPrice) && (this.totalCount !== 0)){
					return '去结算';
				}
			},
			isShowCom() {
				if (this.totalCount === 0){
					// eslint-disable-next-line
					this.fold = true;
					return false;
				}
				return !this.fold;
			}
		},
		methods: {
			showCartDetails() {				
				if (this.totalCount > 0){
					this.fold = !this.fold;
				}
			},
			emptyCart() {
				this.selectedFood.forEach((food) => {
					food.count = 0;
				});
				this.fold = false;
			},
			pay() {
				if ((this.totalPrice >= this.seller.minPrice) && (this.totalCount !== 0)){					
					alert('您已成功支付' + (this.totalPrice + 4) + '元!');
					this.emptyCart();
				}				
			}
		},
		components: {
			'purchasebutton': PurchaseButton
		}
	};
</script>

<style scoped="scoped">
	@import url("../../common/css/style.css");
	.cart{
		position: fixed;
		bottom: 0;
		left: 0;
		height: 0.48rem;
		width: 100%;
		display: flex;
		z-index: 100;
	}
	.cart-left{
		flex: 1;
		background: rgb(20,29,39);
		margin-right: -1px;
	}
	.cart-right{
		flex: 0 0 1.05rem;
		width: 1.05rem;		
	}
	.cart-right-p{
		font-size: 0.12rem;
		line-height: 0.48rem;
		color: rgba(255,255,255,0.2);
		text-align: center;
		font-weight: bold;
		background: rgb(43,51,59);
	}
	.cart-right-p-02{
		background: rgb(0,180,60);
		color: white;
	}
	.cart-logo-wrapper{
		height: 0.56rem;
		width: 0.56rem;
		border-radius:100%;
		margin: 0 0.12rem;
		position: relative;
		top: -0.06rem;
		background: rgb(20,29,39);
		display: flex;
		align-items: center;
	}
	.cart-logo{
		height: 0.44rem;
		width: 0.44rem;
		border-radius:100%;
		background: rgb(43,52,60);
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.cart-logo-svg{
		color: rgb(128,133,138);
		font-size: 0.24rem;
	}
	.currentPrice{
		font-size: 0.16rem;
		line-height: 0.24rem;
		padding-right: 0.12rem;
		margin-top: 0.12rem;
		color: rgba(255,255,255,0.4);
		font-weight: bold;
		border-right: 1px solid rgba(255,255,255,0.1);
	}
	.deliveryPrice{
		font-size: 0.12rem;
		line-height: 0.24rem;
		margin-top: 0.12rem;
		color: rgba(255,255,255,0.4);
		margin-left: 0.12rem;
	}
	.countNum{
		width: 0.24rem;
		height: 0.16rem;
		border-radius: 12px;
		background: rgb(240,20,20);
		font-size: 0.09rem;
		line-height: 0.16rem;
		font-weight: bold;
		color: white;
		position: absolute;
		top: -0.08rem;
		right: -0.06rem;
		text-align: center;
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
	}
	.countActive{
		background: rgb(0,160,220)!important;
	}
	.countActive .cart-logo-svg{
		color: white;
	}
	.mask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -2;
		background: rgba(7,17,27,0.6);
	}
	.cart-details{
		width: 100%;
		position: absolute;
		bottom: 0.48rem;
		left: 0;		
		z-index: -1;
	}
	.cart-details-header{
		background: rgb(243,245,247);
		border-bottom: rgba(7,17,27,0.1);
	}
	.cart-details-header-left{
		font-size: 0.14rem;
		line-height: 0.4rem;
		color: rgb(7,17,27);
		padding-left: 0.18rem;
	}
	.cart-details-header-right{
		font-size: 0.12rem;
		line-height: 0.4rem;
		color: rgb(0,160,220);
		padding-right: 0.18rem;
	}
	.fade-enter-active,.fade-leave-active,.vanish-enter-active,.vanish-leave-active{
		transition: 0.5s;
	}
	.fade-enter,.fade-leave-to{
		transform: translate3d(0,100%,0);
	}
	.vanish-enter,.vanish-leave-to{
		opacity: 0;
	}
	.cart-details-content{
		max-height: 2.18rem;
		overflow: auto;
	}
	.cart-details-content-ul{
		padding-bottom: 0.22rem;
		background: white;
	}
	.cart-details-content-li{
		display: flex;		
		margin: 0 0.18rem;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.cart-details-content-li-left{
		font-size: 0.14rem;
		line-height: 0.48rem;
		color: rgb(7,17,27);
		flex: 1;
	}
	.cart-details-content-li-right{
		display: flex;
		align-items: center;
	}
	.right-price{
		font-size: 0.14rem;
		line-height: 0.48rem;
		color: rgb(240,20,20);
		font-weight: bold;
		padding-right: 0.12rem;
	}
	.right-price span{
		font-size: 0.1rem;
		font-weight: normal;
	}
</style>