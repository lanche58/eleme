<template>
	<div class="header">
		<div class="subject-wrapper clearfix">
			<div class="logo fl">
				<img :src="seller.avatar" class="avatar"/>
			</div>
			<h1 class="name"><span class="brand"></span>{{seller.name}}</h1>
			<p class="delivery">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
			<p v-if="seller.supports" class="discounts"><span class="discounts-icon" :class="classMap[seller.supports[0].type]"></span>{{seller.supports[0].description}}</p>
			<div class="discounts-num" v-if="seller.supports" @click="showDetail">{{seller.supports.length}}个<span class="icon-keyboard_arrow_right"></span></div>
		</div>
		<div class="bulletin-wrapper clearfix" @click="showDetail">			
			<div class="bulletin-icon fl"></div>			
			<div class="icon-keyboard_arrow_right bulletin-arrow fr"></div>
			<p class="bulletin-text">{{seller.bulletin}}</p>
		</div>
		<div class="background">
			<img :src="seller.avatar"/>
		</div>
		<transition name='fade'>
			<div class="detail-wrapper" v-show="ifShow">
				<div class="detail-content">
					<h1 class="detail-content-name">{{seller.name}}</h1>
					<star :size=48 :score='seller.score'></star>
					<div class="banner-title">
						<div class="line"></div>
						<div class="title-name">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul class="offers-ul">
						<li v-for="(item,index) in seller.supports" class="offers-li" v-if="seller.supports" :key="item.index">
							<span :class="classMap[seller.supports[index].type]" class="discounts-icon"></span>
							<span class="offers-li-text">{{seller.supports[index].description}}</span>
						</li>
					</ul>
					<div class="banner-title">
						<div class="line"></div>
						<div class="title-name">商家公告</div>
						<div class="line"></div>
					</div>
					<p class="seller-announcement-text">
						{{seller.bulletin}}
					</p>
				</div>
				<div class="icon-close detail-close" @click="hideDetail"></div>
			</div>
		</transition>
		
	</div>
</template>

<script>
	import Star from '../star/star';
	export default {
		name: 'Header',
		data () {
			return {
				classMap: [],
				ifShow: false
			};
		},
		created () {
			this.classMap = ['discounts-icon-decrease','discounts-icon-discount','discounts-icon-special','discounts-icon-invoice','discounts-icon-guarantee'];
		},
		methods: {
			showDetail () {
				this.ifShow = true;
			},
			hideDetail () {
				this.ifShow = false;
			}
		},
		props: {
			seller: {
				type: Object
			}
		},
		components: {
			Star
		}
	};
</script>

<style scoped="scoped">	
	@import url("../../common/css/style.css");
	.header{
		color: white;
		background: rgba(7,17,27,0.5);
		position: relative;
	}
	.subject-wrapper{
		position: relative;
	}
	.logo{
		width: 17.07%;
		padding: 0.24rem 0.16rem 0.18rem 0.24rem;
		border-radius: 0.2rem;
		overflow: hidden;
	}
	.avatar{
		border-radius: 2px;
	}
	.name{
		font-size: 0.16rem;
		line-height: 0.16rem;
		font-weight: bold;
		padding: 0.26rem 0 0.08rem;
	}
	.brand{
		width: 8%;
		height: 0.18rem;
		margin-right: 0.06rem;
		background-image: url(brand@2x.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin-bottom: -0.03rem;
	}
	.delivery{
		font-size: 0.12rem;
		line-height: 0.12rem;
		font-weight: 200;
		padding-bottom: 0.1rem;
	}
	.discounts{
		font-size: 0.1rem;
		line-height: 0.12rem;
		font-weight: 200;
	}
	.discounts .discounts-icon{
		width: 0.12rem;
		height: 0.12rem;
		margin-right: 0.04rem;
		vertical-align: top;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.discounts .discounts-icon-decrease{
		background-image: url(decrease_1@2x.png);
	}
	.discounts .discounts-icon-discount{
		background-image: url(discount_1@2x.png);
	}
	.discounts .discounts-icon-guarantee{
		background-image: url(guarantee_1@2x.png);
	}
	.discounts .discounts-icon-invoice{
		background-image: url(invoice_1@2x.png);
	}
	.discounts .discounts-icon-special{
		background-image: url(special_1@2x.png);
	}
	.offers-ul .discounts-icon-decrease{
		background-image: url(decrease_2@2x.png);
	}
	.offers-ul .discounts-icon-discount{
		background-image: url(discount_2@2x.png);
	}
	.offers-ul .discounts-icon-guarantee{
		background-image: url(guarantee_2@2x.png);
	}
	.offers-ul .discounts-icon-invoice{
		background-image: url(invoice_2@2x.png);
	}
	.offers-ul .discounts-icon-special{
		background-image: url(special_2@2x.png);
	}
	.offers-ul .discounts-icon{
		width: 0.16rem;
		height: 0.16rem;
		margin-right: 0.06rem;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		vertical-align: top;
	}
	.offers-ul{
		width: 74.4%;
		margin: 0 auto;
	}
	.offers-li{
		margin-bottom: 0.12rem;
		font-size: 0;
		text-align: initial;
	}
	.offers-li:last-child{
		margin-bottom: 0;
	}
	.offers-li-text{
		font-size: 0.12rem;
		line-height: 0.16rem;
		height: 0.16rem;
		font-weight: 200;
	}
	.discounts-num{
		font-size: 0.1rem;
		line-height: 0.24rem;
		font-weight: 200;
		height: 0.24rem;
		padding: 0 0.08rem;
		border-radius: 0.14rem;
		position: absolute;
		bottom: 0.14rem;
		right: 0.12rem;
		background: rgba(0,0,0,0.2);
		text-align: center;
	}
	.discounts-num span{
		vertical-align: middle;
		margin-left: 0.02rem;
		line-height: 0.24rem;
	}
	.bulletin-wrapper{
		height: 0.28rem;
		background: rgba(7,17,27,0.2);
	}
	.bulletin-text{
		font-size: 0.1rem;
		line-height: 0.28rem;
		font-weight: 200;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.bulletin-icon{
		width: 0.22rem;
		height: 0.12rem;
		background-image: url(bulletin@2x.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 0.08rem 0.04rem 0 0.12rem;
	}
	.bulletin-arrow{
		font-size: 0.1rem;
		margin: 0 0.15rem 0 0.04rem;
		line-height: 0.28rem;
	}
	.background{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		overflow: hidden;
	}
	.background img{
		transform: translateY(-30%);
	}
	.detail-wrapper{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;		
		display: flex;
		flex-direction: column;
		overflow: auto;
		text-align: center;	
		background: rgba(7,17,27,0.8);	
	}
	.fade-enter-active,.fade-leave-active{
		transition: 0.5s;		
	}
	.fade-leave-to,.fade-enter{
		opacity: 0;
		background: rgba(7,17,27,0);
	}
	.detail-content{
		flex: 1;
	}
	.detail-close{		
		font-size: 0.32rem;
		margin-bottom:0.32rem ;
		color: rgba(255,255,255,0.5);
	}
	.detail-content-name{
		font-size: 0.16rem;
		line-height: 0.16rem;
		font-weight: 700;
		margin: 0.64rem 0 0.16rem;
	}
	.banner-title{
		display: flex;
		width: 81%;
		margin: 0.28rem auto 0.24rem;		
	}
	.title-name{
		font-size: 0.14rem;
		line-height: 0.14rem;
		font-weight: 700;
		padding: 0 0.12rem;
	}
	.line{
		flex: 1;
		border-bottom: 1px solid rgba(255,255,255,0.2);
		position: relative;
		top: -0.07rem;
	}
	.seller-announcement-text{
		width: 74.4%;
		margin: 0 auto;
		font-size: 0.12rem;
		line-height: 0.24rem;
		font-weight: 200;
		text-align: initial;
	}
	@media only screen and (-webkit-min-device-pixel-ratio:3) and (min-device-pixel-ratio:3) {
		.brand{
			background-image: url(brand@3x.png);
		}
		.discounts .discounts-icon-decrease{
			background-image: url(decrease_1@3x.png);
		}
		.discounts .discounts-icon-discount{
			background-image: url(discount_1@3x.png);
		}
		.discounts .discounts-icon-guarantee{
			background-image: url(guarantee_1@3x.png);
		}
		.discounts .discounts-icon-invoice{
			background-image: url(invoice_1@3x.png);
		}
		.discounts .discounts-icon-special{
			background-image: url(special_1@3x.png);
		}
		.offers-ul .discounts-icon-decrease{
			background-image: url(decrease_2@3x.png);
		}
		.offers-ul .discounts-icon-discount{
			background-image: url(discount_2@3x.png);
		}
		.offers-ul .discounts-icon-guarantee{
			background-image: url(guarantee_2@3x.png);
		}
		.offers-ul .discounts-icon-invoice{
			background-image: url(invoice_2@3x.png);
		}
		.offers-ul .discounts-icon-special{
			background-image: url(special_2@3x.png);
		}
		.bulletin-icon{
			background-image: url(bulletin@3x.png);
		}		
	}
</style>
