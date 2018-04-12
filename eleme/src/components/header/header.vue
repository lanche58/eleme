<template>
	<div class="header">
		<div class="subject-wrapper clearfix">
			<div class="logo fl">
				<img :src="seller.avatar" class="avatar"/>
			</div>
			<h1 class="name"><span class="brand"></span>{{seller.name}}</h1>
			<p class="delivery">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
			<p v-if="seller.supports" class="discounts"><span class="discounts-icon" :class="classMap[seller.supports[0].type]"></span>{{seller.supports[0].description}}</p>
			<div class="discounts-num" v-if="seller.supports">{{seller.supports.length}}个<span class="icon-keyboard_arrow_right"></span></div>
		</div>
		<div class="bulletin-wrapper clearfix">			
			<div class="bulletin-icon fl"></div>			
			<div class="icon-keyboard_arrow_right bulletin-arrow fr"></div>
			<p class="bulletin-text">{{seller.bulletin}}</p>
		</div>
		<div class="background">
			<img :src="seller.avatar"/>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Header',
		data () {
			return {
				classMap: []		
			};
		},
		created () {
			this.classMap = ['discounts-icon-decrease','discounts-icon-discount','discounts-icon_special','discounts-icon-invoice','discounts-icon-guarantee'];
		},
		props: {
			seller: {
				type: Object
			}
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
	.discounts-icon{
		width: 0.12rem;
		height: 0.12rem;
		margin-right: 0.04rem;
		vertical-align: top;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.discounts-icon-decrease{
		background-image: url(decrease_1@2x.png);
	}
	.discounts-icon-discount{
		background-image: url(discount_1@2x.png);
	}
	.discounts-icon_guarantee{
		background-image: url(guarantee_1@2x.png);
	}
	.discounts-icon-invoice{
		background-image: url(invoice_1@2x.png);
	}
	.discounts-icon-special{
		background-image: url(special_1@2x.png);
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
	@media only screen and (-webkit-min-device-pixel-ratio:3) and (min-device-pixel-ratio:3) {
		.brand{
			background-image: url(brand@3x.png);
		}
		.discounts-icon-decrease{
			background-image: url(decrease_1@3x.png);
		}
		.discounts-icon-discount{
			background-image: url(discount_1@3x.png);
		}
		.discounts-icon_guarantee{
			background-image: url(guarantee_1@3x.png);
		}
		.discounts-icon-invoice{
			background-image: url(invoice_1@3x.png);
		}
		.discounts-icon-special{
			background-image: url(special_1@3x.png);
		}
		.bulletin-icon{
			background-image: url(bulletin@3x.png);
		}		
	}
</style>
