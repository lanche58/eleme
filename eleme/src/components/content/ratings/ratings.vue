<template>
	<div class="ratings" ref='ratings'>
		<div class="ratings-content">
			<div class="ratings-content-header">
				<div class="ratings-content-header-left">
					<p class="ratings-content-header-left-p-01">{{seller.score}}</p>
					<p class="ratings-content-header-left-p-02">综合评价</p>
					<p class="ratings-content-header-left-p-03">高于周边商家{{seller.rankRate}}%</p>
				</div>
				<div class="ratings-content-header-right">
					<p class="ratings-content-header-right-p-01 clearfix"><span class="p-span-01 fl">服务态度</span><star :size=36 :score='seller.serviceScore' class="fl"></star><span class="p-span-02 fl">{{seller.serviceScore}}</span></p>
					<p class="ratings-content-header-right-p-01 clearfix"><span class="p-span-01 fl">商品口味</span><star :size=36 :score='seller.foodScore' class="fl"></star><span class="p-span-02 fl">{{seller.foodScore}}</span></p>	
					<p class="ratings-content-header-right-p-01 clearfix"><span class="p-span-01 fl">送达时间</span><span class="p-span-03 fl">{{seller.deliveryTime}}分钟</span></p>	
				</div>
			</div>
			<div class="ratings-content-main">
				<comments :desc = 'desc' :ratings = 'ratings' ref="comments"></comments>
			</div>
		</div>
	</div>
</template>

<script>
	import BetterScroll from 'better-scroll';
	import Star from '../../star/star';
	import Comments from '../../comments/comments';
	
	const NO_ERR = 0;
	
	export default {
		name: 'Ratings',
		props: {
			seller: {
				type: Object,
				default() {
					return {}
				}
			},
			ratings: {
				type: Array,
				dafault() {
					return []
				}
			}
		},
		data() {
			return {
				desc: {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				}
			};
		},
		created() {		
			this.$nextTick(() => {
				this.ratings = new BetterScroll(this.$refs.ratings, {
		      		click: true
		    	});		    	
			});
		},
		components: {
			'star': Star,
			'comments': Comments
		}
	};
</script>

<style>	
	.ratings{
		position: absolute;
		left: 0;
		top: 1.72rem;
		bottom: 0.48rem;
		width: 100%;
		overflow: hidden;
		background: rgb(243,245,247);
	}
	.ratings-content-header{
		display: flex;
		background: white;
		margin-bottom: 0.18rem;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.ratings-content-header-left{
		flex: 0 0 1.38rem;
		width: 1.38rem;
		border-right: 1px solid rgba(7,17,27,0.1);
		text-align: center;
		margin: 0.18rem 0;
	}
	.ratings-content-header-left-p-01{
		font-size: 0.24rem;
		line-height: 0.28rem;
		color: rgb(255,153,0);
	}
	.ratings-content-header-left-p-02{
		font-size: 0.12rem;
		line-height: 0.12rem;
		color: rgb(7,17,27);
		margin-top: 0.06rem;
	}
	.ratings-content-header-left-p-03{
		font-size: 0.1rem;
		line-height: 0.1rem;
		color: rgb(147,153,159);
		margin: 0.08rem 0 0.06rem;
	}
	.ratings-content-header-right{
		flex: 1;
		margin: 0.18rem 0 0 0.24rem;
		font-size: 0.12rem;
		line-height: 0.18rem;
		color: rgb(7,17,27);
	}
	.p-span-01{
		margin-right: 0.12rem;
	}
	.p-span-02{
		margin-left: 0.12rem;
		color: rgb(255,153,0);
	}
	.p-span-03{
		color: rgb(147,153,159);
	}
	.ratings-content-main{
		background: white;
		padding: 0 0.18rem;
		border-top: 1px solid rgba(7,17,27,0.1);
	}
</style>
