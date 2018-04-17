<template>
	<div class="purchaseButton clearfix">
		<transition name="move">
			<div class="decrease-button fl" v-show='food.count > 0' @click="removeFood">
				<div class="icon-remove_circle_outline roll" ></div>
			</div>						
		</transition>					
		<div class="countNum fl" v-show='food.count > 0'>{{food.count}}</div>
		<div class="increase-button icon-add_circle fl" @click="addFood"></div>
		<div class="balls-wrapper">
			<transition-group tag='div' name='drop' @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
				<div :key="index" class="ball" v-for="(ball,index) in balls" v-show="ball.show">
					<div class="ball-inner"></div>
				</div>
			</transition-group>
		</div>
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
		data() {
			return {
				balls: [
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					}
				],
				dropBalls: []
			};
		},
		methods: {
			addFood() {
				if (!this.food.count){
					Vue.set(this.food,'count',1);
				} else {
					this.food.count++;
				}
				this.submitData();
				let len = this.balls.length;
				for (let i = 0; i < len; i++) {
					let ball = this.balls[i];
					if (!ball.show){
						ball.show = true;
						ball.el = event.target;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			removeFood() {
				this.food.count--;
				this.submitData();
			},
			submitData() {
				Bus.$emit('val', this.food);
			},
			beforeEnter(el) {
				console.log(1);
				el.style.tranfrom = 'translate3d(0,300px,0)';
			},
			enter() {
				console.log(1);
			},
			afterEnter() {
				console.log(1);
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
	.move-enter-active,.move-leave-active,.roll,.drop-enter-active,.drop-leave-active,.ball-inner{
		transition: 0.5s linear;
	}
	.move-enter,.move-leave-to{
		opacity: 0;
		transform: translate3d(0.24rem,0,0);
	}
	.move-enter .roll,.move-leave-to .roll{
		transform: rotate(180deg);
	}
	.ball-inner{
		width: 0.16rem;
		height: 0.16rem;
		border-radius: 100%;
		background: rgb(0,160,220);
	}
	.ball{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
	}
</style>