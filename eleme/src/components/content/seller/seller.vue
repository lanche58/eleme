<template>
	<div class="seller" ref="sellerScroll">
		<div class="seller-wrapper">
			<div class="seller-wrapper-header">
				<div class="seller-wrapper-header-inner">
					<h2 class="seller-name">{{seller.name}}</h2>
					<div class="seller-details clearfix">
						<star :size=36 :score="seller.score" class='fl'></star>
						<span class="fl seller-ratingcount">({{seller.ratingCount}})</span>
						<span class="fl seller-sellcount">月售{{seller.sellCount}}单</span>
					</div>
					<ul class="seller-ul clearfix">
						<li class="seller-li fl">
							<h2>起送价</h2>
							<p>{{seller.minPrice}}<span>元</span></p>
						</li>
						<li class="seller-li fl">
							<h2>商家配送</h2>
							<p>{{seller.deliveryPrice}}<span>元</span></p>
						</li>
						<li class="seller-li fl">
							<h2>平均配送时间</h2>
							<p>{{seller.deliveryTime}}<span>分钟</span></p>
						</li>
					</ul>
					<div class="favorite" @click="collect">
						<div class="icon-favorite" :class="{'isFavorite' : isFavorite}"></div>
						<div class="favorite-text" :class="{'isFavoriteText' : isFavorite}">{{favoriteText}}</div>
					</div>
				</div>
			</div>
			<div class="seller-wrapper-activity">
				<div class="seller-wrapper-activity-inner">
					<h2 class="seller-activity">公告与活动</h2>
					<p class="seller-bulletin">{{seller.bulletin}}</p>
					<ul class="seller-activity-ul">
						<li v-for="(item,index) in seller.supports" class="seller-activity-li clearfix" v-if="seller.supports" :key="item.index">
							<span :class="classMap[seller.supports[index].type]" class="discounts-icon fl"></span>
							<span class="seller-activity-li-text fl">{{seller.supports[index].description}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="seller-pics">
				<div class="seller-pics-inner">
					<h2 class="seller-img">商家实景</h2>
					<div class="swiper-container">
					    <div class="swiper-wrapper">
					        <div class="swiper-slide" v-for="item in seller.pics" :key='item.index'><img :src="item"/></div>
					    </div>
					</div>
				</div>
			</div>
			<div class="seller-info">
				<div class="seller-info-inner">
					<h2 class="seller-info-text">商家信息</h2>
					<ul class="seller-info-ul">
						<li v-for="item in seller.infos" :key='item.index' class="seller-info-li">
							<p>{{item}}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BetterScroll from 'better-scroll';
	import Star from '../../star/star';
	import Swiper from 'swiper';
	import 'swiper/dist/css/swiper.min.css';
	
	export default {
		name: 'Seller',
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
				isFavorite: false
			};
		},
		computed: {
			favoriteText() {
				if (!this.isFavorite){
					return '收藏';
				} else {
					return '已收藏';
				}
			}
		},
		created() {	
			this.classMap = ['discounts-icon-decrease','discounts-icon-discount','discounts-icon-special','discounts-icon-invoice','discounts-icon-guarantee'];
			this.$nextTick(() => {				
				this.sellerScroll = new BetterScroll(this.$refs.sellerScroll, {
		      		click: true
		    	});		    	
			});			
		},
		mounted() {
			this.$nextTick(() => {
				/* eslint-disable */
				setTimeout(() => {
					var mySwiper = new Swiper('.swiper-container',{
						slidesPerView : 3,
						spaceBetween : 5,
						loop : true,
						freeMode : true
					});
				},0);			
			});
		},
		components: {
			'star': Star
		},
		methods: {
			collect() {
				this.isFavorite = !this.isFavorite;
			}
		}
	};
</script>

<style scoped="scoped">
	@import url("../../../common/css/style.css");
	.seller{
		position: absolute;
		left: 0;
		top: 1.75rem;
		bottom: 0.48rem;
		width: 100%;
		overflow: hidden;
		background: rgb(243,245,247);
	}
	.seller-wrapper-header-inner{
		position: relative;
	}
	.seller-wrapper-header,.seller-wrapper-activity,.seller-pics,.seller-info{
		background: white;
		border-bottom: 1px solid rgb(230,231,232);
		margin-bottom: 0.18rem;
	}
	.seller-wrapper-header-inner,.seller-wrapper-activity-inner,.seller-pics-inner,.seller-info-inner{
		margin: 0 0.18rem;
	}
	.seller-name,.seller-activity,.seller-img,.seller-info-text{
		font-size: 0.14rem;
		line-height: 0.14rem;
		color: rgb(7,17,27);
		padding: 0.18rem 0 0.08rem;
	}
	.seller-details{
		padding-bottom: 0.18rem;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.seller-details span{
		font-size: 0.1rem;
		line-height: 0.18rem;
		color: rgb(77,85,93);
	}
	.seller-ratingcount{
		margin-left: 0.08rem;
	}
	.seller-sellcount{
		margin-left: 0.12rem;
	}
	.seller-ul{
		display: flex;
	}
	.seller-li{
		margin: 0.18rem 0;
		border-right: 1px solid rgba(7,17,27,0.1);
		text-align: center;
		flex: 1;		
	}
	.seller-li:last-child{
		border-right: 0;
	}
	.seller-li h2{
		font-size: 0.1rem;
		line-height: 0.1rem;
		color: rgb(147,153,159);
		margin-bottom: 0.04rem;
	}
	.seller-li p{
		font-size: 0.24rem;
		line-height: 0.24rem;
		color: rgb(7,17,27);
		font-weight: lighter;
	}
	.seller-li p span{
		font-size: 0.1rem;
	}
	.seller-bulletin{
		padding: 0 0.12rem 0.16rem;
		font-size: 0.12rem;
		line-height: 0.24rem;
		color: rgb(240,20,20);
		font-weight: lighter;
	}
	.seller-activity-li{
		border-top: 1px solid rgba(7,17,27,0.1);
	}
	.seller-activity-li .discounts-icon-decrease{
		background-image: url(decrease_4@2x.png);
	}
	.seller-activity-li .discounts-icon-discount{
		background-image: url(discount_4@2x.png);
	}
	.seller-activity-li .discounts-icon-guarantee{
		background-image: url(guarantee_4@2x.png);
	}
	.seller-activity-li .discounts-icon-invoice{
		background-image: url(invoice_4@2x.png);
	}
	.seller-activity-li .discounts-icon-special{
		background-image: url(special_4@2x.png);
	}
	.seller-activity-li .discounts-icon{
		width: 0.16rem;
		height: 0.16rem;
		margin: 0.16rem 0.06rem 0.16rem 0.12rem;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.seller-activity-li-text{
		font-size: 0.12rem;
		line-height: 0.16rem;
		color: rgb(7,17,27);
		font-weight: lighter;
		margin-top: 0.16rem;
	}
	.seller-info-li{		
		border-top: 1px solid rgba(7,17,27,0.1);
	}
	.seller-info-li p{
		font-size: 0.12rem;
		line-height: 0.16rem;
		color: rgb(7,17,27);
		font-weight: lighter;
		padding: 0.16rem 0.12rem;
	}
	.swiper-container{
		width: 120%;
		margin-bottom: 0.18rem;
	}
	.swiper-slide{
		width: 1.2rem;
		height: 0.9rem;
	}
	.favorite{
		position: absolute;
		width: 0.5rem;
		top: 0.21rem;
		right: 0;
		text-align: center;	
	}
	.icon-favorite{
		font-size: 0.24rem;
		line-height: 0.24rem;
		color: rgb(212,214,217);			
	}
	.favorite-text{
		font-size: 0.1rem;
		line-height: 0.1rem;
		color: rgb(212,214,217);
		margin-top: 0.04rem;
	}
	.isFavorite{
		color: rgb(240,20,20);
	}
	.isFavoriteText{
		color: rgb(77,85,93);
	}
	@media only screen and (-webkit-min-device-pixel-ratio:3) and (min-device-pixel-ratio:3) {
		.seller-activity-li .discounts-icon-decrease{
			background-image: url(decrease_4@3x.png);
		}
		.seller-activity-li .discounts-icon-discount{
			background-image: url(discount_4@3x.png);
		}
		.seller-activity-li .discounts-icon-guarantee{
			background-image: url(guarantee_4@3x.png);
		}
		.seller-activity-li .discounts-icon-invoice{
			background-image: url(invoice_4@3x.png);
		}
		.seller-activity-li .discounts-icon-special{
			background-image: url(special_4@3x.png);
		}
	}		
</style>
