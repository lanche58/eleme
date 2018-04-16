<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul class="menu-wrapper-ul">
				<li v-for="(item,index) in goods" :key="item.index" class="menu-wrapper-li" :class="{'current': currentIndex === index}" @click='getCurrentIndex(index)'>
					<div class="menu-wrapper-li-div">
						<span class="menu-wrapper-li-span"><span class="menu-icon" v-show="item.type > 0" :class="classMap[item.type]"></span>{{item.name}}</span>
					</div>					
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul class="foods-wrapper-ul">
				<li v-for="item in goods" :key="item.index" class="foods-wrapper-li foods-wrapper-li-hook">
					<h1 class="foods-wrapper-li-h1">{{item.name}}</h1>
					<ul class="foods-wrapper-li-ul">
						<li v-for="food in item.foods" :key="food.index" class="foods-wrapper-li-li">
							<div class="foods-wrapper-li-li-left">
								<img :src="food.icon" class="foods-wrapper-li-li-icon" />
							</div>
							<div class="foods-wrapper-li-li-right">
								<h2 class="foods-wrapper-li-li-h2">{{food.name}}</h2>
								<p class="foods-wrapper-li-li-p-01" v-show="food.description">{{food.description}}</p>
								<p class="foods-wrapper-li-li-p-01"><span class="foods-wrapper-li-li-p-01-span">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span></p>
								<div class="foods-wrapper-li-li-div-01">
									<span>¥</span>{{food.price}}
								</div>
								<div class="foods-wrapper-li-li-div-02" v-show="food.oldPrice">
									<span>¥</span>{{food.oldPrice}}
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import BetterScroll from 'better-scroll';
	const NO_ERR = 0;
	export default {
		name: 'Goods',
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				goods: [],
				heightList: [],
				scrollY: 0
			};
		},
		computed: {
			currentIndex() {
				let height1;
				let height2;
				for (let i = 0; i < this.heightList.length; i++) {
					height1 = this.heightList[i];
					height2 = this.heightList[i + 1];
					if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i;
					}					
				}
				return 0;
			}
		},
		created() {
			this.getAjax();
			this.classMap = ['discounts-icon-decrease', 'discounts-icon-discount', 'discounts-icon-special', 'discounts-icon-invoice', 'discounts-icon-guarantee'];
			this.$nextTick(() => {
		      this.menuWrapper = new BetterScroll(this.$refs.menuWrapper, {
		      	click: true
		      });
		      this.foodsWrapper = new BetterScroll(this.$refs.foodsWrapper, {
		      	probeType: 3
		      });
		      this.foodsWrapper.on('scroll',(pos) => {
		      	this.scrollY = Math.abs(Math.round(pos.y));
		      	let menuWrapperOuterHeight = document.querySelector(".menu-wrapper").clientHeight;
		      	let menuWrapperHeight = document.querySelector(".menu-wrapper-ul").clientHeight;		      	
		      	let foodsWrapperHeight = document.querySelector(".foods-wrapper-ul").clientHeight;
		      	let shouldScrollHeight = -Math.round(this.scrollY/foodsWrapperHeight*(menuWrapperHeight-menuWrapperOuterHeight));
		      	this.menuWrapper.scrollTo(0,shouldScrollHeight,300);
		      });
		      var self = this;
		      setTimeout(function(){
		      	self.caculateHeight();
		      },0);	      
		    });
		},
		methods: {
			getAjax() {
				let successCallback = (response) => {
					response = response.body;
					if (response.errno === NO_ERR) {
						this.goods = response.data;
					}
				};
				let errorCallback = (response) => {
					console.log('server error');
				};
				this.$http.get('api/goods').then(successCallback, errorCallback);
			},
			caculateHeight() {				
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-wrapper-li-hook');
				let foodHeight = 0;
				this.heightList.push(foodHeight);
				for (let i = 0; i < foodList.length; i++) {
					foodHeight += foodList[i].clientHeight;
					this.heightList.push(foodHeight);
				}
			},
			getCurrentIndex(index) {
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-wrapper-li-hook');
				let el = foodList[index];
				this.foodsWrapper.scrollToElement(el,300);
			}
		}		
	};
</script>

<style>
	.goods {
		display: flex;
		position: absolute;
		top: 1.72rem;
		bottom: 0.48rem;
		width: 100%;
		overflow: hidden;
	}
	
	.menu-wrapper {
		flex: 0 0 0.8rem;
		width: 0.8rem;
		background: #f3f5f7;
	}
	
	.foods-wrapper {
		flex: 1;
	}
	
	.menu-wrapper-li {
				
	}
	
	.menu-wrapper-li-div{
		height: 0.54rem;
		width: 70%;
		margin: 0 auto;
		font-size: 0;
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}
	
	.menu-wrapper-ul {
		width: 100%;
		overflow: auto;
	}
	
	.menu-wrapper-li-span {
		font-size: 0.12rem;
		line-height: 0.14rem;
	}
	
	.menu-icon {
		width: 0.12rem;
		height: 0.12rem;
		margin-right: 0.02rem;
		vertical-align: top;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		vertical-align: middle;
	}
	
	.menu-wrapper-li .discounts-icon-decrease {
		background-image: url(decrease_3@2x.png);
	}
	
	.menu-wrapper-li .discounts-icon-discount {
		background-image: url(discount_3@2x.png);
	}
	
	.menu-wrapper-li .discounts-icon-guarantee {
		background-image: url(guarantee_3@2x.png);
	}
	
	.menu-wrapper-li .discounts-icon-invoice {
		background-image: url(invoice_3@2x.png);
	}
	
	.menu-wrapper-li .discounts-icon-special {
		background-image: url(special_3@2x.png);
	}
	
	.foods-wrapper-li-h1 {
		font-size: 0.12rem;
		line-height: 0.26rem;
		color: rgb(147, 153, 159);
		background: #f3f5f7;
		border-left: 3px solid #d9dde1;
		padding-left: 0.12rem;
	}
	
	.foods-wrapper-li-ul {
		margin: 0 0.18rem;
	}
	
	.foods-wrapper-li-li {
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		font-size: 0;
		display: flex;
		width: 100%;
	}
	
	.foods-wrapper-li-li:last-child {
		border-bottom: none;
	}
	
	.foods-wrapper-li-li-left {
		flex: 0 0 0.67rem;
		width: 0.85rem;
	}
	
	.foods-wrapper-li-li-right {
		flex: 1;
	}
	
	.foods-wrapper-li-li-icon {
		width: 0.57rem;
		margin: 0.18rem 0.1rem 0 0;
	}
	
	.foods-wrapper-li-li-h2 {
		font-size: 0.14rem;
		line-height: 0.14rem;
		color: rgb(7, 17, 27);
		padding-top: 0.2rem;
	}
	
	.foods-wrapper-li-li-p-01 {
		font-size: 0.1rem;
		line-height: 0.12rem;
		color: rgb(147, 153, 159);
		padding-top: 0.08rem;
	}
	
	.foods-wrapper-li-li-p-01-span {
		padding-right: 0.12rem;
	}
	
	.foods-wrapper-li-li-div-01 {
		display: inline-block;
		font-size: 0.14rem;
		line-height: 0.24rem;
		font-weight: bold;
		color: rgb(240, 20, 20);
		margin-right: 0.08rem;
		padding-bottom: 0.18rem;
	}
	
	.foods-wrapper-li-li-div-01 span {
		font-size: 0.1rem;
		font-weight: normal;
	}
	
	.foods-wrapper-li-li-div-02 {
		display: inline-block;
		font-size: 0.1rem;
		line-height: 0.24rem;
		font-weight: bold;
		color: rgb(147, 153, 159);
		text-decoration: line-through;
	}
	
	.foods-wrapper-li-li-div-02 span {
		font-weight: normal;
	}
	
	.current{
		background: white;
		position: relative;
		top: -1px;
		z-index: 999;
	}
	
	.current div{
		border-bottom: none;		
	}	
	
	.current div .menu-wrapper-li-span{
		font-weight: bold;
	}
	
	@media only screen and (-webkit-min-device-pixel-ratio:3) and (min-device-pixel-ratio:3) {
		.menu-wrapper-li .discounts-icon-decrease {
			background-image: url(decrease_3@3x.png);
		}
		.menu-wrapper-li .discounts-icon-discount {
			background-image: url(discount_3@3x.png);
		}
		.menu-wrapper-li .discounts-icon-guarantee {
			background-image: url(guarantee_3@3x.png);
		}
		.menu-wrapper-li .discounts-icon-invoice {
			background-image: url(invoice_3@3x.png);
		}
		.menu-wrapper-li .discounts-icon-special {
			background-image: url(special_3@3x.png);
		}
	}
</style>
