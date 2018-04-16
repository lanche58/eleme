<template>
	<div class="cart">
		<div class="cart-left">
			<div class="cart-logo-wrapper fl">
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
			<div class="cart-right-p" :class="{'cart-right-p-02':(totalPrice > seller.minPrice)&&(totalCount !== 0)}">{{currentPrice}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Cart',
		props: {
			seller: {
				type: Object,
				default() {
					return {};
				}
			},
			selectedFood: {
				type: Array,
				default() {
					return [
						{
							price: 10,
							count: 1
						}
					];
				}
			}
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
				} else if ((this.totalPrice > this.seller.minPrice) && (this.totalCount !== 0)){
					return '去结算';
				}
			}
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
</style>