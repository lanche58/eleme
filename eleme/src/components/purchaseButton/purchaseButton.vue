<template>
	<div class="purchaseButton clearfix">
		<transition name="move">
			<div class="decrease-button fl" v-show='food.count > 0' @click.stop="removeFood">
				<div class="icon-remove_circle_outline roll" ></div>
			</div>						
		</transition>					
		<div class="countNum fl" v-show='food.count > 0'>{{food.count}}</div>
		<div class="increase-button icon-add_circle fl" @click.stop="addFood"></div>
	</div>	
</template>

<script>
	import Vue from 'vue';
	import Bus from '../../common/js/bus.js';
	export default {
		name: 'PurchaseButton',
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addFood() {
				if (!this.food.count){
					Vue.set(this.food,'count',1);
				} else {
					this.food.count++;
				}
				this.submitData();
				console.log(event.target.getBoundingClientRect().left);
			},
			removeFood() {
				if (this.food.count === 0){
					return;
				}
				this.food.count--;
				this.submitData();
			},
			submitData() {
				Bus.$emit('val', this.food);
			}
		}
	};
</script>

<style scoped="scoped">
	@import url("../../common/css/style.css");
	
	.decrease-button,.increase-button{
		font-size: 0.24rem;
		line-height: 0.24rem;
		color: rgb(0,160,220);
	}
	.decrease-button{
		padding-right: 0.12rem;
	}
	.increase-button{
		padding-left: 0.12rem;
	}
	.countNum{
		font-size: 0.1rem;
		line-height: 0.24rem;
		color: rgb(147,153,159);
	}
	.move-enter-active,.move-leave-active,.roll{
		transition: 0.5s linear;
	}
	.move-enter,.move-leave-to{
		opacity: 0;
		transform: translate3d(0.24rem,0,0);
	}
	.move-enter .roll,.move-leave-to .roll{
		transform: rotate(180deg);
	}
</style>
